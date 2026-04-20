import "dotenv/config"
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import { execSync, spawn } from "child_process"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const PROJECT_ROOT = path.resolve(__dirname, "..")
const EVENTS_FILE = path.resolve(PROJECT_ROOT, "src/data/events.js")
const LOG_FILE = path.resolve(PROJECT_ROOT, "auto-update.log")
const INTERVAL_MS = 30 * 60 * 1000 // 30 minutes

function log(msg: string): void {
  const line = `[${new Date().toISOString()}] ${msg}`
  console.log(line)
  fs.appendFileSync(LOG_FILE, line + "\n")
}

function countEvents(): number {
  const code = fs.readFileSync(EVENTS_FILE, "utf-8")
  const matches = code.match(/^\s*id:\s*\d+/gm)
  return matches?.length ?? 0
}

function getEventsHash(): string {
  const stat = fs.statSync(EVENTS_FILE)
  return `${stat.size}_${stat.mtimeMs}`
}

function getLastEventsContext(): string {
  const code = fs.readFileSync(EVENTS_FILE, "utf-8")
  const lines = code.split("\n")
  const closingBracket = lines.findIndex(
    (l, i) => i > 20 && l.trim() === "]" && lines[i + 1]?.includes("escalationPhases")
  )
  if (closingBracket === -1) return "Could not parse events"
  const start = Math.max(0, closingBracket - 40)
  return lines.slice(start, closingBracket).join("\n")
}

function buildClaudePrompt(): string {
  const lastEvents = getLastEventsContext()

  return `Ты — автоматический обновлятор интерактивной карты-хронологии конфликта Иран–Израиль–США.

Проект находится в ${PROJECT_ROOT}.

ПОСЛЕДНИЕ СОБЫТИЯ В НАШЕЙ БАЗЕ (конец файла src/data/events.js):
${lastEvents}

ТВОЯ ЗАДАЧА:
1. Поищи в интернете НОВЫЕ события конфликта Иран–Израиль–США, которых ещё нет в нашей базе.
   Фокус: военные удары, ракетные атаки, дипломатия, ядерная программа, прокси-конфликты, санкции.

2. Если нашёл новые события — ДОБАВЬ их в src/data/events.js, сохраняя формат:
   {
     id: <следующий номер>,
     date: 'YYYY-MM-DDTHH:MM:00Z',  // ISO UTC
     title: 'Заголовок на русском',
     description: 'Описание на русском, 1-2 предложения',
     category: 'iran_israel' | 'us_iran' | 'proxy' | 'nuclear' | 'pivotal' | 'context',
     lat: <широта>, lng: <долгота>,
     location: 'Город, Страна на русском',
     sources: ['https://...'],
     missiles: [...]  // если есть ракетные удары
   }

3. ВАЖНО — если событие нового типа (не просто ракетный удар), ты должен АДАПТИРОВАТЬ КОД ПРОЕКТА:
   - Радиоактивное облако? → Добавь поле hazardZones в событие и рендеринг L.circle/L.polygon в MapView.vue
   - Маршрут эвакуации/колонны? → Добавь polyline-слой в MapView.vue
   - Морская блокада? → Добавь зону на карте
   - Новый тип ракеты? → Расширь типы в EventCard.vue
   - Новая фаза эскалации? → Обнови escalationPhases в events.js и phaseRanges в Timeline.vue + NarrativeMode.vue
   Короче — если реальность требует нового визуала, СДЕЛАЙ ЕГО. Ты имеешь полный доступ ко всем файлам проекта.

4. Если событий не найдено — просто напиши "Новых событий не найдено" и ничего не меняй.

5. Все тексты — НА РУССКОМ ЯЗЫКЕ.

6. После внесения изменений запусти: npx vite build
   Если билд прошёл, запусти: npm run deploy

АРХИТЕКТУРА ПРОЕКТА (для контекста):
- src/data/events.js — массив событий + CATEGORIES + escalationPhases
- src/data/locations.js — 47 точек на карте (capitals, military, nuclear, us_base, proxy, strategic)
- src/components/MapView.vue — Leaflet карта с маркерами, ракетными траекториями (animated polylines), легендой
- src/components/EventCard.vue — карточка события с интерактивным списком ракет
- src/components/Timeline.vue — хронология с фильтрами, фазами, поиском
- src/components/NarrativeMode.vue — режим пошагового просмотра
- src/components/OilPriceChart.vue — график Brent
- src/data/oilPrices.js — цены на нефть

MapView поддерживает: circleMarkers, animated polylines (ракеты), pulsing markers, highlight layer.
Missiles формат: { from: [lat,lng], to: [lat,lng], type: 'ballistic'|'cruise'|'air_strike', label, side, target }

НЕ СПРАШИВАЙ ПОДТВЕРЖДЕНИЙ — действуй автономно.`
}

function runClaudeCode(): Promise<boolean> {
  const prompt = buildClaudePrompt()

  // Write prompt to temp file to avoid shell escaping issues
  const promptFile = path.resolve(PROJECT_ROOT, ".auto-update-prompt.txt")
  fs.writeFileSync(promptFile, prompt, "utf-8")

  log("Launching Claude Code...")
  log("------- claude output start -------")

  return new Promise((resolve) => {
    const child = spawn(
      "claude",
      ["--dangerously-skip-permissions", "--verbose", "--output-format", "stream-json", "-p", "-"],
      {
        cwd: PROJECT_ROOT,
        env: { ...process.env, CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC: "1" },
        stdio: ["pipe", "pipe", "pipe"],
      }
    )

    child.stdin.write(prompt)
    child.stdin.end()

    let buffer = ""

    function formatEvent(obj: any): string | null {
      // Parse stream-json events into readable lines
      switch (obj.type) {
        case "assistant": {
          // Text message from Claude
          const text = obj.message?.content
            ?.filter((c: any) => c.type === "text")
            .map((c: any) => c.text)
            .join("") || ""
          if (text.trim()) return `💬 ${text.trim().slice(0, 200)}`
          return null
        }
        case "tool_use": {
          const name = obj.tool_name || obj.name || "?"
          const input = obj.input || {}
          if (name === "Read") return `📖 Read: ${input.file_path || "?"}`
          if (name === "Write") return `✏️  Write: ${input.file_path || "?"}`
          if (name === "Edit") return `🔧 Edit: ${input.file_path || "?"}`
          if (name === "Bash") return `🖥️  Bash: ${(input.command || "?").slice(0, 120)}`
          if (name === "Grep") return `🔍 Grep: "${input.pattern}" in ${input.path || "."}`
          if (name === "Glob") return `📁 Glob: ${input.pattern}`
          if (name === "WebSearch") return `🌐 Search: "${input.query}"`
          if (name === "WebFetch") return `🌐 Fetch: ${input.url?.slice(0, 80)}`
          return `🔧 ${name}: ${JSON.stringify(input).slice(0, 100)}`
        }
        case "tool_result": {
          const ok = !obj.is_error
          return ok ? `   ✅ done` : `   ❌ error: ${String(obj.content || "").slice(0, 100)}`
        }
        case "result": {
          return `🏁 Finished (cost: $${obj.cost_usd?.toFixed(3) || "?"})`
        }
        default:
          return null
      }
    }

    child.stdout.on("data", (chunk: Buffer) => {
      buffer += chunk.toString()
      const lines = buffer.split("\n")
      buffer = lines.pop() || ""

      for (const line of lines) {
        if (!line.trim()) continue
        try {
          const obj = JSON.parse(line)
          const display = formatEvent(obj)
          if (display) {
            const ts = new Date().toISOString()
            console.log(`[${ts}] ${display}`)
            fs.appendFileSync(LOG_FILE, `[${ts}] ${display}\n`)
          }
        } catch {
          // Not JSON, print raw
          if (line.trim()) {
            console.log(line)
            fs.appendFileSync(LOG_FILE, `[${new Date().toISOString()}]   raw> ${line}\n`)
          }
        }
      }
    })

    child.stderr.on("data", (chunk: Buffer) => {
      const text = chunk.toString().trim()
      if (text) {
        console.error(`  stderr> ${text}`)
        fs.appendFileSync(LOG_FILE, `[${new Date().toISOString()}]   stderr> ${text}\n`)
      }
    })

    const timeout = setTimeout(() => {
      log("TIMEOUT: Claude Code exceeded 10 min, killing...")
      child.kill("SIGTERM")
    }, 10 * 60 * 1000)

    child.on("close", (code) => {
      clearTimeout(timeout)
      try { fs.unlinkSync(promptFile) } catch {}
      log(`------- claude output end (exit code: ${code}) -------`)
      resolve(code === 0)
    })

    child.on("error", (err) => {
      clearTimeout(timeout)
      log(`ERROR: Failed to spawn claude: ${err.message}`)
      resolve(false)
    })
  })
}

async function runOnce(): Promise<void> {
  log("=" .repeat(60))
  log("Starting update cycle")

  const eventsBefore = countEvents()
  const hashBefore = getEventsHash()
  log(`Events before: ${eventsBefore}`)

  const success = await runClaudeCode()

  const eventsAfter = countEvents()
  const hashAfter = getEventsHash()
  const fileChanged = hashBefore !== hashAfter
  const newEvents = eventsAfter - eventsBefore

  log(`Events after: ${eventsAfter}`)

  if (!success) {
    log("RESULT: Cycle FAILED")
  } else if (fileChanged && newEvents > 0) {
    log(`RESULT: +${newEvents} new event(s) added, deployed`)
  } else if (fileChanged) {
    log("RESULT: events.js modified (edits, not new events)")
  } else {
    log("RESULT: No changes")
  }

  log("=" .repeat(60))
}

let cycleCount = 0

async function main(): Promise<void> {
  // Verify claude CLI is available
  try {
    const ver = execSync("claude --version", { encoding: "utf-8" }).trim()
    log(`Claude Code version: ${ver}`)
  } catch {
    log("FATAL: 'claude' CLI not found")
    process.exit(1)
  }

  log("Iran-Israel-USA Timeline Auto-Updater")
  log(`Project: ${PROJECT_ROOT}`)
  log(`Events file: ${EVENTS_FILE}`)
  log(`Log file: ${LOG_FILE}`)
  log(`Interval: ${INTERVAL_MS / 1000 / 60} min`)
  log("")

  // Run immediately
  cycleCount++
  log(`--- Cycle #${cycleCount} ---`)
  await runOnce()

  // Loop
  log(`Next check in ${INTERVAL_MS / 1000 / 60} min...`)
  setInterval(async () => {
    cycleCount++
    log(`--- Cycle #${cycleCount} ---`)
    try {
      await runOnce()
    } catch (err) {
      log(`UNCAUGHT ERROR: ${err}`)
    }
    log(`Next check in ${INTERVAL_MS / 1000 / 60} min...`)
  }, INTERVAL_MS)
}

main().catch((err) => {
  log(`FATAL: ${err}`)
  process.exit(1)
})
