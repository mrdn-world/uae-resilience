<script setup lang="ts">
import { useReveal } from '@/composables/useReveal'
import { t, tHtml } from '@/i18n'
import FoodMap from './FoodMap.vue'
import SourceTip from './SourceTip.vue'
import Sources from './Sources.vue'
const { el, revealed } = useReveal()
</script>

<template>
  <section ref="el" class="section" :class="{ revealed }">
    <div class="food-wrap">

      <div class="food-header">
        <p class="food-label">{{ t('food.label') }}</p>
        <h2>{{ t('food.headlineLine1') }}<br>{{ t('food.headlineLine2') }}</h2>
      </div>

      <!-- Key facts: compact, side by side -->
      <div class="food-facts">
        <div class="fact-import">
          <div class="fi-waffle">
            <div v-for="i in 50" :key="i" class="fw-cell" :class="{ imported: i <= 45 }"
              :style="{ transitionDelay: revealed ? `${i * 5}ms` : '0ms' }"></div>
          </div>
          <div class="fi-text">
            <strong>{{ t('food.importStrong') }}</strong><SourceTip :sources="t('food.importSources')" />{{ t('food.importText') }}
          </div>
        </div>
        <div class="fact-reserve">
          <div class="fr-number">{{ t('food.reserveNumber') }}</div>
          <div class="fr-text">
            {{ t('food.reserveText') }}
            <span class="fr-rank">{{ t('food.reserveRank') }}</span>
          </div>
        </div>
      </div>

      <!-- Import map with integrated legend -->
      <div class="sources-block">
        <h3>{{ t('food.sourcesTitle') }}</h3>
        <FoodMap />
        <p class="sources-note">{{ t('food.sourcesNote') }}</p>
      </div>

      <!-- Desert farming — not cards, inline descriptions -->
      <div class="farm-block">
        <h3>{{ t('food.farmTitle') }}</h3>
        <div class="farm-items">
          <div class="farm-item" v-for="f in t('food.farms')" :key="f.name">
            <span class="fi-name">{{ f.name }}</span>{{ f.desc }}
          </div>
        </div>
      </div>


      <Sources :items="t('food.sources')" />
    </div>
  </section>
</template>

<style lang="scss">
.food-wrap { @include container; }

.food-header {
  margin-bottom: $sp-48;
  @include reveal;
  .revealed & { opacity: 1; transform: none; }

  .food-label { font-size: $type-label; font-weight: 700; color: $uae-green; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: $sp-8; }
  h2 { font-size: $type-h1; font-weight: 800; letter-spacing: -0.02em; line-height: 1.15; }
}

// Food facts — compact
.food-facts {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: $sp-32;
  margin-bottom: $sp-48;
  @include mobile { grid-template-columns: 1fr; }
}

.fact-import {
  display: flex;
  gap: $sp-16;
  align-items: start;

  .fi-text {
    font-size: $type-body;
    color: $text-2;
    line-height: 1.7;
    strong { color: $uae-red; }
  }
}

.fi-waffle {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 2px;
  flex-shrink: 0;
  width: 80px;
}

.fw-cell {
  aspect-ratio: 1;
  border-radius: 2px;
  background: rgba($uae-green, 0.2);
  transition: background $dur-med $ease-out;

  &.imported {
    background: rgba($uae-red, 0.15);
    .revealed & { background: rgba($uae-red, 0.45); }
  }
  &:not(.imported) {
    .revealed & { background: rgba($uae-green, 0.5); }
  }
}

.fact-reserve {
  display: flex;
  gap: $sp-16;
  align-items: start;

  .fr-number {
    font-size: $type-h1;
    font-weight: 900;
    color: $uae-green;
    letter-spacing: -0.03em;
    line-height: 1;
    flex-shrink: 0;
    white-space: nowrap;
  }

  .fr-text {
    font-size: $type-body;
    color: $text-2;
    line-height: 1.7;
  }

  .fr-rank {
    display: block;
    margin-top: $sp-8;
    color: $uae-green;
    font-weight: 700;
    font-size: $type-small;
  }
}

// Sources
.sources-block {
  margin-bottom: $sp-48;

  h3 { font-size: $type-h3; font-weight: 700; margin-bottom: $sp-24; }
}

.sb-legend {
  display: flex;
  flex-wrap: wrap;
  gap: $sp-8 $sp-24;
  margin-bottom: $sp-12;
}

.sb-item {
  display: flex;
  align-items: center;
  gap: $sp-4;
  font-size: $type-small;
}

.sb-dot {
  width: 8px;
  height: 8px;
  border-radius: 2px;
  flex-shrink: 0;
}

.sb-label {
  color: $text-2;
  font-weight: 600;
  .sb-what { font-weight: 400; color: $text-3; }
}

.sources-note { font-size: $type-small; color: $text-3; font-style: italic; }

// Farm
.farm-block {
  margin-bottom: $sp-48;

  h3 { font-size: $type-h3; font-weight: 700; margin-bottom: $sp-16; }
}

.farm-items {
  display: flex;
  flex-direction: column;
  gap: $sp-12;
}

.farm-item {
  font-size: $type-body;
  color: $text-2;
  line-height: 1.7;
  padding-left: $sp-16;
  border-left: 3px solid $uae-green;

  .fi-name { color: $text-1; font-weight: 700; }
}

// Context
.food-context {
  font-size: $type-small;
  color: $text-3;
  line-height: 1.7;
  padding: $sp-16 $sp-24;
  border-left: 3px solid rgba($uae-gold, 0.3);
  background: rgba($uae-gold, 0.03);
  border-radius: 0 $r-sm $r-sm 0;

  strong { color: $text-2; }
}
</style>
