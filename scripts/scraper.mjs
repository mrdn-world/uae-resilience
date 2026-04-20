/**
 * Парсер новостей по конфликту Иран–Израиль–США
 *
 * Использование:
 *   node scripts/scraper.mjs                    # парсить все фиды
 *   node scripts/scraper.mjs --query "iran"     # фильтр по ключевому слову
 *   node scripts/scraper.mjs --output json      # вывод JSON для копирования в events.js
 *
 * RSS-ленты можно добавлять/менять в массиве FEEDS ниже.
 */

import https from 'https'
import http from 'http'
import { writeFileSync, existsSync, readFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

// === НАСТРОЙКА ФИДОВ (легко добавлять новые) ===
const FEEDS = [
  {
    name: 'Al Jazeera — Middle East',
    url: 'https://www.aljazeera.com/xml/rss/all.xml',
    lang: 'en',
  },
  {
    name: 'Reuters — World',
    url: 'https://news.google.com/rss/search?q=iran+israel+war&hl=en-US&gl=US&ceid=US:en',
    lang: 'en',
  },
  {
    name: 'BBC — Middle East',
    url: 'https://feeds.bbci.co.uk/news/world/middle_east/rss.xml',
    lang: 'en',
  },
  {
    name: 'Google News — Iran Israel',
    url: 'https://news.google.com/rss/search?q=iran+israel+usa+war+2026&hl=en',
    lang: 'en',
  },
]

// Ключевые слова для фильтрации релевантных новостей
const KEYWORDS = [
  'iran', 'israel', 'tehran', 'idf', 'irgc', 'hezbollah',
  'houthi', 'hamas', 'nuclear', 'missile', 'strike', 'attack',
  'netanyahu', 'khamenei', 'trump', 'gulf', 'strait of hormuz',
  'true promise', 'shield of judah', 'epic fury',
  'dubai', 'abu dhabi', 'bahrain', 'qatar', 'kuwait',
  'иран', 'израиль', 'тегеран', 'хезболла', 'хамас',
  'ракет', 'удар', 'ядерн', 'хуситы',
]

// === HTTP FETCH ===
function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http
    client.get(url, { headers: { 'User-Agent': 'NewsParser/1.0' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetchUrl(res.headers.location).then(resolve).catch(reject)
      }
      let data = ''
      res.on('data', (chunk) => (data += chunk))
      res.on('end', () => resolve(data))
      res.on('error', reject)
    }).on('error', reject)
  })
}

// === ПРОСТОЙ XML-ПАРСЕР ===
function parseRSSItems(xml) {
  const items = []
  const itemRegex = /<item>([\s\S]*?)<\/item>/gi
  let match

  while ((match = itemRegex.exec(xml)) !== null) {
    const itemXml = match[1]
    const title = extractTag(itemXml, 'title')
    const link = extractTag(itemXml, 'link')
    const description = extractTag(itemXml, 'description')
    const pubDate = extractTag(itemXml, 'pubDate')

    items.push({
      title: cleanHtml(title),
      link,
      description: cleanHtml(description),
      pubDate: pubDate ? new Date(pubDate).toISOString() : null,
      date: pubDate ? new Date(pubDate).toISOString().split('T')[0] : null,
    })
  }

  return items
}

function extractTag(xml, tag) {
  const regex = new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>|<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'i')
  const m = xml.match(regex)
  return m ? (m[1] || m[2] || '').trim() : ''
}

function cleanHtml(text) {
  return text.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").trim()
}

// === ФИЛЬТРАЦИЯ ===
function isRelevant(item, extraQuery) {
  const text = `${item.title} ${item.description}`.toLowerCase()
  const matchesKeyword = KEYWORDS.some((kw) => text.includes(kw.toLowerCase()))

  if (extraQuery) {
    return matchesKeyword && text.includes(extraQuery.toLowerCase())
  }
  return matchesKeyword
}

// === ФОРМАТ ВЫВОДА ===
function formatAsEventJS(item, id) {
  return {
    id,
    date: item.date,
    title: item.title.slice(0, 100),
    description: item.description.slice(0, 500),
    category: guessCategory(item),
    lat: null, // Заполни координаты
    lng: null,
    location: '', // Заполни локацию
    sources: [item.link],
    // missiles: [], // Добавь ракетные траектории если есть
  }
}

function guessCategory(item) {
  const text = `${item.title} ${item.description}`.toLowerCase()
  if (text.includes('nuclear') || text.includes('ядерн') || text.includes('enrichment')) return 'nuclear'
  if (text.includes('hezbollah') || text.includes('houthi') || text.includes('hamas') || text.includes('proxy')) return 'proxy'
  if (text.includes('trump') || text.includes('us ') || text.includes('american') || text.includes('pentagon')) return 'us_iran'
  if (text.includes('strike') || text.includes('attack') || text.includes('missile') || text.includes('killed')) return 'pivotal'
  return 'iran_israel'
}

// === MAIN ===
async function main() {
  const args = process.argv.slice(2)
  const queryIdx = args.indexOf('--query')
  const query = queryIdx >= 0 ? args[queryIdx + 1] : null
  const outputFormat = args.includes('--output') ? args[args.indexOf('--output') + 1] : 'text'

  console.log('🔍 Парсинг новостей по конфликту Иран–Израиль–США...\n')

  const allItems = []

  for (const feed of FEEDS) {
    try {
      console.log(`📡 ${feed.name}...`)
      const xml = await fetchUrl(feed.url)
      const items = parseRSSItems(xml)
      const relevant = items.filter((item) => isRelevant(item, query))

      console.log(`   Найдено: ${items.length} всего, ${relevant.length} релевантных`)
      allItems.push(
        ...relevant.map((item) => ({
          ...item,
          source: feed.name,
        }))
      )
    } catch (err) {
      console.error(`   ❌ Ошибка: ${err.message}`)
    }
  }

  // Удалить дубликаты по заголовку
  const seen = new Set()
  const unique = allItems.filter((item) => {
    const key = item.title.toLowerCase().slice(0, 60)
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })

  // Сортировка по дате
  unique.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate))

  console.log(`\n📰 Итого уникальных: ${unique.length}\n`)

  if (outputFormat === 'json') {
    // Вывод как JS-объекты для вставки в events.js
    const events = unique.map((item, i) => formatAsEventJS(item, 100 + i))
    const outputPath = join(__dirname, '..', 'src', 'data', 'scraped-events.json')
    writeFileSync(outputPath, JSON.stringify(events, null, 2), 'utf8')
    console.log(`💾 Сохранено в ${outputPath}`)
    console.log('\n📋 Скопируй нужные события в src/data/events.js и заполни координаты.\n')
  } else {
    // Текстовый вывод
    unique.forEach((item, i) => {
      console.log(`${i + 1}. [${item.date}] ${item.title}`)
      console.log(`   ${item.description.slice(0, 150)}...`)
      console.log(`   🔗 ${item.link}`)
      console.log(`   📡 ${item.source}\n`)
    })
  }
}

main().catch(console.error)
