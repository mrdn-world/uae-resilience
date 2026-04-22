<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useReveal } from '@/composables/useReveal'
import { t, tHtml } from '@/i18n'
import SourceTip from './SourceTip.vue'
import Sources from './Sources.vue'
const { el, revealed } = useReveal()

// Mini missile canvas
const canvasRef = ref<HTMLCanvasElement | null>(null)
let raf = 0

onMounted(() => {
  const c = canvasRef.value
  if (!c) return
  const ctx = c.getContext('2d')!
  const dpr = devicePixelRatio || 1

  function resize() {
    const r = c!.getBoundingClientRect()
    c!.width = r.width * dpr; c!.height = r.height * dpr
    ctx.scale(dpr, dpr)
  }
  resize()
  window.addEventListener('resize', resize)

  interface Dot { x: number; y: number; vx: number; vy: number; alive: boolean }
  interface Spark { x: number; y: number; vx: number; vy: number; life: number }
  let missiles: Dot[] = []; let sparks: Spark[] = []; let frame = 0

  function loop() {
    const w = c!.getBoundingClientRect().width
    const h = c!.getBoundingClientRect().height
    ctx.clearRect(0, 0, w, h)
    frame++

    // Skyline
    ctx.fillStyle = '#1E2536'
    for (const [px, bh] of [[.08,50],[.15,80],[.22,40],[.3,100],[.38,60],[.45,110],[.53,45],[.6,85],[.68,70],[.75,95],[.83,55],[.9,75]]) {
      ctx.fillRect(px * w - 5, h - bh, 10, bh)
    }

    // Spawn
    if (frame % 8 === 0 && missiles.length < 80) {
      missiles.push({ x: w * (.5 + Math.random() * .5), y: -5, vx: -(1 + Math.random()), vy: 1.5 + Math.random(), alive: true })
    }

    for (const m of missiles) {
      if (!m.alive) continue
      m.x += m.vx; m.y += m.vy
      if (m.y > h * .25 + Math.random() * h * .3 && Math.random() < .07) {
        m.alive = false
        for (let j = 0; j < 6; j++) sparks.push({ x: m.x, y: m.y, vx: (Math.random()-.5)*3, vy: (Math.random()-.5)*3, life: 1 })
        continue
      }
      if (m.y > h - 15) { m.alive = false; continue }
      ctx.beginPath(); ctx.moveTo(m.x - m.vx * 5, m.y - m.vy * 5); ctx.lineTo(m.x, m.y)
      ctx.strokeStyle = 'rgba(232,86,74,0.3)'; ctx.lineWidth = 1; ctx.stroke()
      ctx.beginPath(); ctx.arc(m.x, m.y, 1.5, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(232,86,74,0.7)'; ctx.fill()
    }

    for (let i = sparks.length - 1; i >= 0; i--) {
      const s = sparks[i]
      s.x += s.vx; s.y += s.vy; s.vx *= .95; s.vy *= .95; s.life -= .03
      if (s.life <= 0) { sparks.splice(i, 1); continue }
      ctx.beginPath(); ctx.arc(s.x, s.y, s.life, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(46,204,135,${s.life * .6})`; ctx.fill()
    }

    if (frame % 100 === 0) { missiles = missiles.filter(m => m.alive); if (sparks.length > 200) sparks.length = 200 }
    raf = requestAnimationFrame(loop)
  }
  raf = requestAnimationFrame(loop)

  onUnmounted(() => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) })
})

const layers = t('defense.layers') as Array<{ name: string, alt: string, range: string, what: string, note: string, color: string }>
</script>

<template>
  <section ref="el" class="section" :class="{ revealed }">
    <div class="def-wrap">

      <div class="def-header">
        <p class="def-label gl-label">{{ t('defense.label') }}</p>
        <h2 class="header-h2">{{ t('defense.headlineLine1') }} {{ t('defense.headlineLine2') }}</h2>
      </div>

      <!-- Canvas sim + big result -->
      <div class="def-hero">
        <div class="sim-box">
          <canvas ref="canvasRef" class="sim-canvas"></canvas>
          <div class="sim-overlay">
            <div class="so-big">{{ t('defense.simBig') }}<SourceTip :sources="t('defense.simBigSources')" /></div>
            <div class="so-sub">{{ t('defense.simSub') }}</div>
          </div>
        </div>

        <!-- 137 missiles visualized as dots -->
        <div class="missile-dots">
          <div class="md-header">{{ t('defense.missileHeader') }}</div>
          <div class="md-grid">
            <div v-for="i in 200" :key="i" class="md-dot"
              :class="{ hit: i > 160 }"
              :style="{ animationDelay: `${i * 8}ms` }"
            ></div>
          </div>
          <div class="md-legend">
            <span class="mdl"><span class="mdl-dot good"></span>{{ t('defense.missileLegendGood') }}</span>
            <span class="mdl"><span class="mdl-dot bad"></span>{{ t('defense.missileLegendBad') }}</span>
          </div>
        </div>

      </div>


      <!-- Altitude layers — proportional height diagram -->
      <div class="layers">
        <h3>{{ t('defense.layersTitle') }}</h3>
        <div class="altitude-diagram">
          <div class="alt-scale">
            <span class="alt-mark" style="bottom: 100%">{{ t('defense.altMarks')[0] }}</span>
            <span class="alt-mark" style="bottom: 27%">{{ t('defense.altMarks')[1] }}</span>
            <span class="alt-mark" style="bottom: 17%">{{ t('defense.altMarks')[2] }}</span>
            <span class="alt-mark" style="bottom: 10%">{{ t('defense.altMarks')[3] }}</span>
            <span class="alt-mark" style="bottom: 0%">{{ t('defense.altMarks')[4] }}</span>
          </div>
          <div class="alt-bands">
            <div v-for="l in layers" :key="l.name" class="alt-band"
              :style="{
                height: `${Math.max(parseInt(l.alt) / 150 * 100, 8)}%`,
                background: `${l.color}15`,
                borderLeft: `4px solid ${l.color}`,
              }"
            >
              <span class="ab-name" :style="{ color: l.color }">{{ l.name }}</span>
              <span class="ab-what">{{ l.what }}</span>
              <span class="ab-note">{{ l.note }}</span>
            </div>
          </div>
        </div>
      </div>

      <Sources :items="t('defense.sources')" />
    </div>
  </section>
</template>

<style lang="scss">
.def-wrap { @include container; }

.def-header {
  margin-bottom: $sp-48;
  @include reveal;
  .revealed & { opacity: 1; transform: none; }

  .def-label {
    // color: $uae-red;
    margin-bottom: $sp-8;
  }
}

// Sim + results
.def-hero { margin-bottom: $sp-64; }

.sim-box {
  position: relative;
  height: 240px;
  border-radius: $r-lg;
  overflow: hidden;
  margin-bottom: $sp-16;
  background: $bg-1;
}

.sim-canvas { width: 100%; height: 100%; display: block; }

.sim-overlay {
  position: absolute;
  bottom: 114px;
  left: $sp-24;
  .so-big { font-size: 48px; font-weight: 900; color: $uae-green; letter-spacing: -0.03em; }
  .so-sub { font-size: $type-small; color: $text-2; }
}

// Missile dots
.missile-dots {
  margin-bottom: $sp-24;
  padding: $sp-24;
  background: $bg-2;
  border-radius: $r-md;
  border: 1px solid $border-1;

  .md-header { font-size: $type-small; font-weight: 700; color: $text-2; margin-bottom: $sp-12; }
}

.md-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-bottom: $sp-12;
  overflow: hidden;
}

.md-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: $uae-green;
  opacity: 0.6;
  animation: fadeInUp 0.3s $ease-out both;

  &.hit {
    background: $uae-red;
    opacity: 0.9;
    box-shadow: 0 0 6px rgba($uae-red, 0.5);
  }
}

.md-legend {
  display: flex;
  gap: $sp-16;
  flex-wrap: wrap;
  font-size: $type-small;
  color: $text-2;
}

.mdl { display: flex; align-items: center; gap: $sp-4; }
.mdl-dot {
  width: 8px; height: 8px; border-radius: 50%;
  &.good { background: $uae-green; }
  &.bad { background: $uae-red; }
}

// Drones
.drone-strip {
  display: flex;
  align-items: center;
  gap: $sp-16;
  margin-bottom: $sp-16;
  padding: $sp-16;
  background: rgba($uae-green, 0.03);
  border-radius: $r-sm;
  overflow: hidden;
  @include mobile { flex-direction: column; align-items: flex-start; }

  .drn-text { font-size: $type-small; color: $text-2; strong { color: $uae-green; font-size: $type-body; } }
}

.drn-dots {
  display: flex;
  flex-wrap: wrap;
  gap: 3px;
  max-width: 100%;
  overflow: hidden;
}

.drn-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: $uae-green;
  opacity: 0.4;
  animation: fadeInUp 0.2s $ease-out both;
}

// Comparison
.comparison {
  margin-bottom: $sp-48;
  h3 { font-size: $type-h3; font-weight: 700; margin-bottom: $sp-16; }
}

.comp-rows { display: flex; flex-direction: column; gap: $sp-12; margin-bottom: $sp-8; }

.comp-row {
  display: grid;
  grid-template-columns: 180px 1fr 50px;
  gap: $sp-16;
  align-items: center;
  @include mobile { grid-template-columns: 1fr 1fr 50px; }
}

.comp-sys { font-size: $type-small; font-weight: 600; color: $text-2; text-align: right; }
.comp-track { height: 10px; background: rgba(0,0,0,0.07); border-radius: 5px; overflow: hidden; }
.comp-bar { height: 100%; border-radius: 5px; transition: width 1.2s $ease-out; }
.comp-pct { font-size: $type-body; font-weight: 900; text-align: right; }
.comp-note { font-size: $type-small; color: $text-3; font-style: italic; }

// Layers
.layers {
  margin-bottom: $sp-48;
  h3 { font-size: $type-h3; font-weight: 700; margin-bottom: $sp-16; }
}

.altitude-diagram {
  display: grid;
  grid-template-columns: 60px 1fr;
  gap: $sp-8;
  position: relative;

  @include mobile { grid-template-columns: 1fr; }
}

.alt-scale {
  position: relative;
  font-size: 1rem;
  color: $text-3;

  @include mobile { display: none; }

  .alt-mark {
    position: absolute;
    right: 0;
    transform: translateY(50%);
    font-weight: 600;
    font-variant-numeric: tabular-nums;
  }
}

.alt-bands {
  display: flex;
  flex-direction: column-reverse;
  gap: 2px;
  min-height: 420px;
}

.alt-band {
  border-radius: 0 $r-sm $r-sm 0;
  padding: $sp-8 $sp-16;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 72px;
  overflow: visible;

  .ab-name { font-size: $type-small; font-weight: 800; line-height: 1.3; }
  .ab-what { font-size: 0.75rem; color: $text-2; line-height: 1.4; }
  .ab-note { font-size: 0.75rem; color: $text-3; line-height: 1.4; }
}

// Context
.def-context {
  font-size: $type-small;
  color: $text-3;
  line-height: 1.7;
  padding: $sp-16 $sp-24;
  border-left: 3px solid rgba($uae-red, 0.3);
  background: rgba($uae-red, 0.03);
  border-radius: 0 $r-sm $r-sm 0;
  strong { color: $text-2; }
}
</style>
