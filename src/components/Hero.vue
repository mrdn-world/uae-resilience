<script setup lang="ts">
import { ref, onMounted } from 'vue'
const show = ref(false)
onMounted(() => requestAnimationFrame(() => show.value = true))
</script>

<template>
  <section class="hero" :class="{ show }">
    <div class="hero-inner">
      <p class="hero-kicker">While other countries plan for crises,</p>
      <h1 class="hero-title">the UAE already<br>survived three.</h1>

      <div class="hero-timeline">
        <div class="tl-line"></div>
        <div class="tl-node" v-for="(t, i) in [
          { yr: '2020', what: 'Global pandemic', result: 'Shelves stayed full. #8 resilience globally.' },
          { yr: '2024', what: 'Worst floods ever recorded', result: 'Two years of rain in one day. Zero mass casualties.' },
          { yr: '2026', what: '137 ballistic missiles', result: '96% shot down. President went to the mall.' },
        ]" :key="t.yr" :style="{ transitionDelay: `${0.6 + i * 0.2}s` }">
          <div class="tl-dot"></div>
          <div class="tl-yr">{{ t.yr }}</div>
          <div class="tl-what">{{ t.what }}</div>
          <div class="tl-result">{{ t.result }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: $sp-96 $sp-24;
  @include mobile { padding: $sp-64 $sp-16; min-height: auto; }
}

.hero-inner {
  @include container;
  width: 100%;
}

.hero-kicker {
  font-size: $type-h3;
  color: $text-3;
  font-weight: 500;
  opacity: 0;
  transform: translateY(12px);
  transition: all $dur-slow $ease-out 0.1s;
  .show & { opacity: 1; transform: none; }
}

.hero-title {
  font-size: $type-hero;
  font-weight: 900;
  letter-spacing: -0.03em;
  line-height: 1.05;
  margin: $sp-8 0 $sp-64;
  color: $text-1;
  opacity: 0;
  transform: translateY(16px);
  transition: all $dur-slow $ease-out 0.25s;
  .show & { opacity: 1; transform: none; }
}

.hero-timeline {
  display: flex;
  gap: $sp-48;
  position: relative;
  @include mobile { flex-direction: column; gap: $sp-32; }
}

.tl-line {
  position: absolute;
  top: 10px;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, $uae-green, $uae-gold, $uae-red);
  opacity: 0.3;
  @include mobile { width: 2px; height: 100%; top: 0; left: 10px; background: linear-gradient(180deg, $uae-green, $uae-gold, $uae-red); }
}

.tl-node {
  flex: 1;
  padding-top: $sp-24;
  position: relative;
  opacity: 0;
  transform: translateY(16px);
  transition: all $dur-slow $ease-out;
  .show & { opacity: 1; transform: none; }

  @include mobile { padding-left: $sp-32; padding-top: 0; }
}

.tl-dot {
  position: absolute;
  top: 4px;
  left: 0;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: $bg-0;
  border: 3px solid $uae-green;

  .tl-node:nth-child(3) & { border-color: $uae-gold; }
  .tl-node:nth-child(4) & { border-color: $uae-red; }
}

.tl-yr {
  .tl-node:nth-child(3) & { color: $uae-gold; }
  .tl-node:nth-child(4) & { color: $uae-red; }

  @include mobile { top: 2px; }
}

.tl-yr {
  font-size: $type-label;
  font-weight: 800;
  color: $uae-green;
  letter-spacing: 0.05em;
  margin-bottom: $sp-4;

  .tl-node:nth-child(3) & { color: $uae-gold; }
  .tl-node:nth-child(4) & { color: $uae-red; }
}

.tl-what {
  font-size: $type-h3;
  font-weight: 700;
  margin-bottom: $sp-8;
  line-height: 1.3;
}

.tl-result {
  font-size: $type-body;
  color: $text-2;
  line-height: 1.6;
}
</style>
