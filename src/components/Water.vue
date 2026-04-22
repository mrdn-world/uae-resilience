<script setup lang="ts">
import { useReveal } from '@/composables/useReveal'
import { t, tHtml } from '@/i18n'
import WaterMap from './WaterMap.vue'
import SourceTip from './SourceTip.vue'
import Sources from './Sources.vue'
const { el, revealed } = useReveal()

const tradeoffRowGeo = [
  { usePct: 100, lastPct: 4, color: '#E8564A' },
  { usePct: 16.5, lastPct: 36, color: '#D4A843' },
  { usePct: 5.5, lastPct: 100, color: '#039F4B' },
]
</script>

<template>
  <section ref="el" class="section" :class="{ revealed }">
    <div class="water-wrap">

      <div class="water-header">
        <p class="water-label gl-label">{{ t('water.label') }}</p>
        <h2 class="header-h2">{{ t('water.headlineLine1') }}<br>{{ t('water.headlineLine2') }}</h2>
      </div>

      <!-- Desal + infrastructure -->
      <div class="water-grid">
        <div class="water-left">
          <h3>{{ t('water.desal.title') }}</h3>
          <div class="desal-flow">
            <div class="df-step">
              <div class="df-icon">🌊</div>
              <div class="df-text">{{ t('water.desal.step1') }}</div>
            </div>
            <div class="df-arrow">→</div>
            <div class="df-step">
              <div class="df-icon">⚙</div>
              <div class="df-text">{{ t('water.desal.step2') }}</div>
            </div>
            <div class="df-arrow">→</div>
            <div class="df-step">
              <div class="df-icon">💧</div>
              <div class="df-text">{{ t('water.desal.step3') }}</div>
            </div>
          </div>

          <!-- 70 plants as dot grid -->
          <div class="plants-viz">
            <div class="pv-header">{{ t('water.desal.plantsHeader') }}</div>
            <div class="pv-dots">
              <div v-for="i in 70" :key="i" class="pv-dot" :style="{ animationDelay: `${i * 20}ms` }"></div>
            </div>
            <div class="pv-note">{{ t('water.desal.plantsNote') }}</div>
          </div>

          <!-- Taweelah -->
          <div class="taweelah">
            <div class="tw-name">{{ t('water.desal.taweelahName') }} <SourceTip :sources="t('water.desal.taweelahSources')" /></div>
            <div class="tw-title">{{ t('water.desal.taweelahTitle') }}</div>
            <div class="tw-stat">{{ t('water.desal.taweelahStat') }}</div>
            <div class="tw-context" v-html="tHtml('water.desal.taweelahContext')"></div>
          </div>
        </div>

        <div class="water-right">
          <!-- 300 wells as dot grid -->
          <h3>{{ t('water.wells.title') }}</h3>
          <div class="wells-viz">
            <div class="wv-dots">
              <div v-for="i in 60" :key="i" class="wv-dot" :style="{ animationDelay: `${i * 15}ms` }"></div>
            </div>
            <div class="wv-label">{{ t('water.wells.label') }}</div>
            <div class="wv-stat">
              <span class="wvs-val">{{ t('water.wells.statVal') }}</span>
              <span class="wvs-desc">{{ t('water.wells.statDesc') }}</span>
            </div>
          </div>

          <div class="hassyan">
            <div class="hs-val">{{ t('water.hassyan.val') }}</div>
            <div class="hs-name">{{ t('water.hassyan.name') }}</div>
            <div class="hs-desc">{{ t('water.hassyan.desc') }}</div>
          </div>
        </div>
      </div>

      <!-- Infrastructure map -->
      <WaterMap />

      <Sources :items="t('water.sources')" />
    </div>
  </section>
</template>


<style lang="scss">
.water-wrap { @include container; }

.water-header {
  margin-bottom: $sp-48;
  @include reveal;
  .revealed & { opacity: 1; transform: none; }

  .water-label {
    // color: $data-1;
    margin-bottom: $sp-8;
  }
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
    height: 1.5rem;
    background: rgba(0,0,0,0.07);
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
