<script setup lang="ts">
import { useReveal } from '@/composables/useReveal'
import WaterMap from './WaterMap.vue'
import SourceTip from './SourceTip.vue'
import Sources from './Sources.vue'
const { el, revealed } = useReveal()
</script>

<template>
  <section ref="el" class="section" :class="{ revealed }">
    <div class="water-wrap">

      <div class="water-header">
        <p class="water-label">WATER SECURITY</p>
        <h2>In one of the driest places on Earth,<br>every drop is manufactured.</h2>
      </div>

      <!-- UNIFIED: one table — consumption ↔ duration tradeoff -->
      <div class="water-tradeoff">
        <div class="wt-header">The less you use, the longer reserves last <SourceTip :sources="[{label:'UAE Water Strategy 2036',url:'https://u.ae/en/about-the-uae/strategies-initiatives-and-awards/strategies-plans-and-visions/environment-and-energy/the-uae-water-security-strategy-2036'}]" /></div>
        <div class="wt-table">
          <div class="wt-row" v-for="(r, i) in [
            { use: '550 L/day', means: '3 bathtubs — normal life', lasts: '2 days', usePct: 100, lastPct: 4, color: '#E8564A' },
            { use: '91 L/day', means: 'Rationing — short showers, no gardens', lasts: '16 days', usePct: 16.5, lastPct: 36, color: '#D4A843' },
            { use: '30 L/day', means: '2 buckets — drinking, cooking, that\'s it', lasts: '45+ days', usePct: 5.5, lastPct: 100, color: '#2ECC87' },
          ]" :key="r.use">
            <!-- Usage bar -->
            <div class="wtr-use">
              <div class="wtr-bar-bg">
                <div class="wtr-bar" :style="{ width: revealed ? r.usePct + '%' : '0%', background: r.color + '55', transitionDelay: `${i * 0.15}s` }"></div>
              </div>
              <span class="wtr-val" :style="{ color: r.color }">{{ r.use }}</span>
            </div>

            <!-- What it means -->
            <div class="wtr-means">{{ r.means }}</div>

            <!-- Arrow -->
            <div class="wtr-arrow">→</div>

            <!-- Duration bar -->
            <div class="wtr-lasts">
              <div class="wtr-bar-bg">
                <div class="wtr-bar" :style="{ width: revealed ? r.lastPct + '%' : '0%', background: r.color + '55', transitionDelay: `${0.3 + i * 0.15}s` }"></div>
              </div>
              <span class="wtr-val" :style="{ color: r.color }">{{ r.lasts }}</span>
            </div>
          </div>

          <!-- Column labels -->
          <div class="wt-labels">
            <span>Daily consumption per person</span>
            <span></span>
            <span></span>
            <span>How long reserves last</span>
          </div>
        </div>

        <div class="wt-underground">
          Plus: <strong>300 underground wells</strong> in Abu Dhabi store 26 million m³ of treated water beneath the desert — an additional 90-day backup.
        </div>
      </div>

      <!-- Desal + infrastructure -->
      <div class="water-grid">
        <div class="water-left">
          <h3>How the UAE makes water from ocean</h3>
          <div class="desal-flow">
            <div class="df-step">
              <div class="df-icon">🌊</div>
              <div class="df-text">Seawater intake from the Gulf</div>
            </div>
            <div class="df-arrow">→</div>
            <div class="df-step">
              <div class="df-icon">⚙</div>
              <div class="df-text">Pushed through membranes at extreme pressure (reverse osmosis) — salt and impurities are filtered out</div>
            </div>
            <div class="df-arrow">→</div>
            <div class="df-step">
              <div class="df-icon">💧</div>
              <div class="df-text">Clean drinking water. Piped to every home, office, and farm.</div>
            </div>
          </div>

          <!-- 70 plants as dot grid -->
          <div class="plants-viz">
            <div class="pv-header">~70 desalination plants along the coast</div>
            <div class="pv-dots">
              <div v-for="i in 70" :key="i" class="pv-dot" :style="{ animationDelay: `${i * 20}ms` }"></div>
            </div>
            <div class="pv-note">14% of all desalination on Earth — in a country smaller than South Carolina</div>
          </div>

          <!-- Taweelah -->
          <div class="taweelah">
            <div class="tw-name">Taweelah <SourceTip :sources="[{label:'EWEC',url:'https://www.ewec.ae/'}]" /></div>
            <div class="tw-title">World's largest reverse osmosis plant</div>
            <div class="tw-stat">909,200 m³ of clean water per day</div>
            <div class="tw-context">That fills an Olympic swimming pool every <strong>2.5 minutes</strong>. Non-stop.</div>
          </div>
        </div>

        <div class="water-right">
          <!-- 300 wells as dot grid -->
          <h3>Underground water reserves</h3>
          <div class="wells-viz">
            <div class="wv-dots">
              <div v-for="i in 60" :key="i" class="wv-dot" :style="{ animationDelay: `${i * 15}ms` }"></div>
            </div>
            <div class="wv-label">300 wells across Abu Dhabi (showing 1 dot per 5 wells)</div>
            <div class="wv-stat">
              <span class="wvs-val">26M m³</span>
              <span class="wvs-desc">of treated water stored underground — a 90-day emergency supply, banked beneath the desert</span>
            </div>
          </div>

          <div class="hassyan">
            <div class="hs-val">$920M</div>
            <div class="hs-name">Hassyan Solar Desal</div>
            <div class="hs-desc">Next-gen: solar-powered desalination. Opening 2027. Clean energy making clean water.</div>
          </div>
        </div>
      </div>

      <!-- Infrastructure map -->
      <WaterMap />

      <div class="water-context">
        <strong>Context:</strong> Groundwater depletes 20x faster than nature replenishes it. Desalination plants sit on the coast — physically vulnerable to attack. And 550 liters per day per person is one of the highest consumption rates on Earth. The infrastructure is impressive. The dependency on it is the risk.
      </div>

      <Sources :items="[
        { label: 'UAE Water Strategy 2036', url: 'https://u.ae/en/about-the-uae/strategies-initiatives-and-awards/strategies-plans-and-visions/environment-and-energy/the-uae-water-security-strategy-2036' },
        { label: 'EWEC', url: 'https://www.ewec.ae/' },
        { label: 'FAO AQUASTAT', url: 'https://www.fao.org/aquastat/en/' },
        { label: 'Bayanat.ae — Water', url: 'https://data.bayanat.ae/en_GB/group/water' },
      ]" />
    </div>
  </section>
</template>


<style lang="scss">
.water-wrap { @include container; }

.water-header {
  margin-bottom: $sp-48;
  @include reveal;
  .revealed & { opacity: 1; transform: none; }

  .water-label { font-size: $type-label; font-weight: 700; color: $data-1; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: $sp-8; }
  h2 { font-size: $type-h1; font-weight: 800; letter-spacing: -0.02em; line-height: 1.15; }
}

// Water tradeoff — unified
.water-tradeoff {
  margin-bottom: $sp-64;
  padding: $sp-32;
  background: $bg-2;
  border-radius: $r-lg;
  border: 1px solid $border-1;
}

.wt-header {
  font-size: $type-h3;
  font-weight: 700;
  margin-bottom: $sp-24;
}

.wt-table {
  margin-bottom: $sp-24;
}

.wt-row {
  display: grid;
  grid-template-columns: 1fr 1.2fr auto 1fr;
  gap: $sp-16;
  align-items: center;
  padding: $sp-12 0;
  border-bottom: 1px solid $border-1;

  &:last-of-type { border-bottom: none; }

  @include mobile {
    grid-template-columns: 1fr auto 1fr;
    .wtr-means { display: none; }
  }
}

.wtr-use, .wtr-lasts {
  .wtr-bar-bg {
    height: 8px;
    background: rgba(255,255,255,0.04);
    border-radius: 4px;
    overflow: hidden;
    margin-bottom: $sp-4;
  }

  .wtr-bar {
    height: 100%;
    border-radius: 4px;
    transition: width 1s $ease-out;
  }

  .wtr-val {
    font-size: $type-body;
    font-weight: 800;
  }
}

.wtr-means {
  font-size: $type-small;
  color: $text-3;
  line-height: 1.5;
}

.wtr-arrow {
  font-size: $type-h3;
  color: $text-3;
  text-align: center;
}

.wt-labels {
  display: grid;
  grid-template-columns: 1fr 1.2fr auto 1fr;
  gap: $sp-16;
  font-size: $type-label;
  color: $text-3;
  padding-top: $sp-8;

  @include mobile {
    grid-template-columns: 1fr auto 1fr;
    span:nth-child(2) { display: none; }
  }
}

.wt-underground {
  font-size: $type-body;
  color: $text-2;
  line-height: 1.7;
  padding-top: $sp-16;
  border-top: 1px solid $border-1;
  strong { color: $uae-green; }
}

// Grid
.water-grid {
  display: grid;
  grid-template-columns: 1.3fr 1fr;
  gap: $sp-48;
  margin-bottom: $sp-48;
  @include mobile { grid-template-columns: 1fr; }

  h3 { font-size: $type-h3; font-weight: 700; margin-bottom: $sp-16; }
}

// Desal flow
.desal-flow {
  display: flex;
  align-items: center;
  gap: $sp-8;
  margin-bottom: $sp-32;
  padding: $sp-16;
  background: $bg-2;
  border-radius: $r-md;
  @include mobile { flex-direction: column; }
}

.df-step {
  flex: 1;
  text-align: center;
  .df-icon { font-size: 28px; margin-bottom: $sp-4; }
  .df-text { font-size: $type-small; color: $text-2; line-height: 1.5; }
}

.df-arrow { font-size: 20px; color: $text-3; @include mobile { transform: rotate(90deg); } }

// Plants dot grid
.plants-viz {
  margin-bottom: $sp-24;
  .pv-header { font-size: $type-small; font-weight: 700; color: $text-2; margin-bottom: $sp-8; }
  .pv-note { font-size: $type-small; color: $text-3; margin-top: $sp-8; }
}

.pv-dots {
  display: flex;
  flex-wrap: wrap;
  gap: 3px;
}

.pv-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: $data-1;
  opacity: 0.5;
  animation: fadeInUp $dur-med $ease-out both;
}

// Taweelah
.taweelah {
  margin-bottom: $sp-16;
  padding: $sp-16;
  background: rgba($data-1, 0.04);
  border-radius: $r-sm;
  border: 1px solid rgba($data-1, 0.08);

  .tw-name { font-size: $type-h3; font-weight: 800; color: $data-1; }
  .tw-title { font-size: $type-small; color: $text-2; margin-bottom: $sp-8; }
  .tw-stat { font-size: $type-body; font-weight: 700; margin-bottom: $sp-4; }
  .tw-context { font-size: $type-small; color: $text-3; strong { color: $text-1; } }
}

// Wells dot grid
.wells-viz {
  margin-bottom: $sp-24;
  .wv-label { font-size: $type-label; color: $text-3; margin-top: $sp-8; margin-bottom: $sp-12; }
}

.wv-dots {
  display: flex;
  flex-wrap: wrap;
  gap: 3px;
}

.wv-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: $uae-green;
  opacity: 0.45;
  animation: fadeInUp $dur-med $ease-out both;
}

.wv-stat {
  padding: $sp-12;
  background: $bg-2;
  border-radius: $r-sm;

  .wvs-val { font-size: $type-h3; font-weight: 800; color: $uae-green; margin-right: $sp-8; }
  .wvs-desc { font-size: $type-small; color: $text-2; }
}

// Hassyan
.hassyan {
  padding: $sp-16;
  border-left: 3px solid $uae-gold;

  .hs-val { font-size: $type-h3; font-weight: 900; color: $uae-gold; }
  .hs-name { font-size: $type-body; font-weight: 700; margin-bottom: $sp-4; }
  .hs-desc { font-size: $type-small; color: $text-3; line-height: 1.5; }
}


// Context
.water-context {
  font-size: $type-small;
  color: $text-3;
  line-height: 1.7;
  padding: $sp-16 $sp-24;
  border-left: 3px solid rgba($data-1, 0.3);
  background: rgba($data-1, 0.03);
  border-radius: 0 $r-sm $r-sm 0;
  strong { color: $text-2; }
}
</style>
