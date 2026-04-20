<script setup lang="ts">
import { useReveal } from '@/composables/useReveal'
import SourceTip from './SourceTip.vue'
import Sources from './Sources.vue'
const { el, revealed } = useReveal()
</script>

<template>
  <section ref="el" class="section" :class="{ revealed }">
    <div class="proof-wrap">

      <div class="proof-header">
        <p class="proof-label">THE PROOF</p>
        <h2>If it wasn't safe, why would<br>9 million foreigners stay?</h2>
      </div>

      <!-- Waffle: 100 people, 88 are expats -->
      <div class="expat-row">
        <div class="expat-waffle">
          <div
            v-for="i in 100"
            :key="i"
            class="ew-cell"
            :class="{ expat: i <= 88 }"
            :style="{ transitionDelay: revealed ? `${i * 6}ms` : '0ms' }"
          >
            <svg viewBox="0 0 10 16" class="person-icon">
              <circle cx="5" cy="3" r="2.5" />
              <path d="M2 7 Q5 6 8 7 L7.5 15 Q5 14.5 2.5 15 Z" />
            </svg>
          </div>
        </div>

        <div class="expat-text">
          <div class="et-big">88%<SourceTip :sources="[{label:'UAE Statistics',url:'https://fcsc.gov.ae/'}]" /></div>
          <div class="et-label">of everyone living in the UAE is a foreigner</div>
          <p>They have passports. They have options. They could leave. Through a pandemic, record floods, and missile strikes — they overwhelmingly chose to stay.</p>
          <p>When 9 million people with exit options choose not to use them, that's not government PR. <strong>That's a verdict.</strong></p>
        </div>
      </div>

      <!-- Three tests — compact, no grids of numbers -->
      <div class="tests">
        <h3>Three existential tests, three passes</h3>
        <div class="test" v-for="t in [
          { yr: '2020', name: 'COVID-19', key: 'Shelves stayed full while borders were closed. First country to run Phase III vaccine trials. Built 19,000 m² of ultra-cold vaccine storage from scratch.', color: '#2ECC87' },
          { yr: '2024', name: 'Record floods', key: 'Two years of average rainfall in a single day. Emergency systems activated within minutes. Digital alerts reached every phone. Zero mass casualties.', color: '#5B9FE4' },
          { yr: '2026', name: 'Missile strike', key: '137 ballistic missiles fired at UAE cities. 132 intercepted. 195 drones destroyed. Markets recovered in 14 days. GDP forecast held at +5.5%.', color: '#E8564A' },
        ]" :key="t.yr" :style="{ borderLeftColor: t.color }">
          <div class="test-head">
            <span class="test-yr" :style="{ color: t.color }">{{ t.yr }}</span>
            <span class="test-name">{{ t.name }}</span>
          </div>
          <p class="test-key">{{ t.key }}</p>
        </div>
      </div>

      <div class="proof-kicker">
        None of this happened by accident. Every system that held during these crises was designed, built, and tested years in advance. The UAE government has spent <strong>hundreds of billions of dollars over three decades</strong> on resilience infrastructure — not because a crisis was coming, but because they assumed one always is.
      </div>

      <Sources :items="[
        { label: 'FCSC — UAE Statistics', url: 'https://fcsc.gov.ae/' },
        { label: 'Bloomberg Resilience', url: 'https://www.bloomberg.com/graphics/covid-resilience-ranking/' },
        { label: 'NCEMA', url: 'https://www.ncema.gov.ae/en/about-ncema.aspx' },
        { label: 'HOPE Consortium', url: 'https://hopeconsortium.com/' },
        { label: 'ITU Cybersecurity Index', url: 'https://www.itu.int/en/ITU-D/Cybersecurity/Pages/global-cybersecurity-index.aspx' },
      ]" />
    </div>
  </section>
</template>

<style lang="scss">
.proof-wrap { @include container; }

.proof-header {
  margin-bottom: $sp-48;
  @include reveal;
  .revealed & { opacity: 1; transform: none; }

  .proof-label { font-size: $type-label; font-weight: 700; color: $uae-gold; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: $sp-8; }
  h2 { font-size: $type-h1; font-weight: 800; letter-spacing: -0.02em; line-height: 1.15; }
}

// Expat waffle + text
.expat-row {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: $sp-24;
  margin-bottom: $sp-64;
  align-items: center;
  @include mobile { grid-template-columns: 1fr; }
}

.expat-waffle {
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 2px;
  max-width: 200px;
}

.ew-cell {
  aspect-ratio: 0.6;

  svg {
    width: 100%;
    height: 100%;
    max-height: 14px;
    fill: rgba($uae-green, 0.15);
    transition: fill $dur-med $ease-out;
  }

  &.expat svg {
    .revealed & { fill: rgba($uae-gold, 0.55); }
  }

  &:not(.expat) svg {
    .revealed & { fill: rgba($uae-green, 0.5); }
  }
}

.expat-text {
  .et-big { font-size: $type-hero; font-weight: 900; color: $uae-gold; letter-spacing: -0.04em; line-height: 1; }
  .et-label { font-size: $type-h3; color: $text-2; font-weight: 600; margin-bottom: $sp-16; }
  p { font-size: $type-body; color: $text-2; line-height: 1.7; margin-bottom: $sp-12; strong { color: $text-1; } }
}

// Tests
.tests {
  margin-bottom: $sp-48;
  h3 { font-size: $type-h3; font-weight: 700; margin-bottom: $sp-24; }
}

.test {
  padding: $sp-16 $sp-16 $sp-16 $sp-24;
  border-left: 4px solid;
  margin-bottom: $sp-12;
  background: $bg-2;
  border-radius: 0 $r-sm $r-sm 0;

  .test-head { display: flex; align-items: baseline; gap: $sp-12; margin-bottom: $sp-8; }
  .test-yr { font-size: $type-body; font-weight: 900; letter-spacing: 0.05em; }
  .test-name { font-size: $type-body; font-weight: 700; }
  .test-key { font-size: $type-body; color: $text-2; line-height: 1.7; margin: 0; }
}

// Kicker
.proof-kicker {
  font-size: $type-body;
  color: $text-2;
  line-height: 1.8;
  text-align: center;
  max-width: 700px;
  margin: 0 auto;
  padding: $sp-32;
  background: rgba($uae-green, 0.03);
  border: 1px solid rgba($uae-green, 0.08);
  border-radius: $r-md;
  strong { color: $text-1; }
}
</style>
