<script setup lang="ts">
import { useReveal } from '@/composables/useReveal'
import { t, tHtml } from '@/i18n'
import SourceTip from './SourceTip.vue'
import Sources from './Sources.vue'
const { el, revealed } = useReveal()
</script>

<template>
  <section ref="el" class="section" :class="{ revealed }">
    <div class="proof-wrap">

      <div class="proof-header">
        <p class="proof-label gl-label">{{ t('proof.label') }}</p>
        <h2>{{ t('proof.headlineLine1') }}<br>{{ t('proof.headlineLine2') }}</h2>
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
          <div class="et-big">{{ t('proof.expatBig') }}<SourceTip :sources="t('proof.expatSources')" /></div>
          <div class="et-label">{{ t('proof.expatLabel') }}</div>
          <p>{{ t('proof.expatP1') }}</p>
          <p v-html="tHtml('proof.expatP2')"></p>
        </div>
      </div>


      <div class="proof-kicker" v-html="tHtml('proof.kicker')"></div>

      <Sources :items="t('proof.sources')" />
    </div>
  </section>
</template>

<style lang="scss">
.proof-wrap { @include container; }

.proof-header {
  margin-bottom: $sp-48;
  @include reveal;
  .revealed & { opacity: 1; transform: none; }

  .proof-label {
    // color: $uae-gold;
    margin-bottom: $sp-8;
  }
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
  background: rgba($uae-green, 0.1);
  border: 1px solid rgba($uae-green, 0.08);
  border-radius: $r-md;
  strong { color: $text-1; }
}
</style>
