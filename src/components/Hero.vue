<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { t } from '@/i18n'
const show = ref(false)
onMounted(() => requestAnimationFrame(() => show.value = true))
</script>

<template>
  <section class="hero" :class="{ show }">
    <div class="hero-top">
      <div class="hero-top__grid">
        <img class="hero-top__menu" src="/menu.svg" alt="menu" />
        <img class="hero-top__logo" src="/logo.svg" alt="logo" />
      </div>
      <div class="hero-top__line" />
    </div>
    <video class="hero-bg" src="/UAE_Flag.mp4" loop autoplay muted playsinline></video>
    <div class="hero-overlay"></div>
    <div class="hero-inner">
      <p class="hero-kicker">{{ t('hero.kicker') }}</p>
      <h1 class="hero-title">{{ t('hero.titleLine1') }}<br>{{ t('hero.titleLine2') }}</h1>

      <div class="hero-timeline">
        <div class="tl-line"></div>
        <div class="tl-node" v-for="(node, i) in t('hero.timeline')" :key="node.yr" :style="{ transitionDelay: `${0.6 + i * 0.2}s` }">
          <div class="tl-dot"></div>
          <div class="tl-yr">{{ node.yr }}</div>
          <div class="tl-what">{{ node.what }}</div>
          <div class="tl-result">{{ node.result }}</div>
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
  padding: $sp-96 0;
  background: #0B0F1A;
  color: #F5F0E8;
  position: relative;
  overflow: hidden;
  @include mobile {
    padding: 25px 0;
    min-height: auto;
    flex-direction: column;
    }
}

.hero-top {
  @include container;
  position: absolute;
  top: 2rem;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  z-index: 3;
  padding-bottom: 5rem;
  &__grid {
    display: flex;
    justify-content: space-between;
  }
  &__line {
    width: 100%;
    height: 1px;
    margin-top: 4.5rem;
    background-color: #fff;
    @include mobile {
      margin-top: 3rem;
    }
  }
  @include mobile {
    position: static;
    transform: none;
    padding-bottom: 2rem;
  }
}

.hero-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  z-index: 0;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: rgba(#0B0F1A, 0.62);
  z-index: 1;
}

.hero-inner {
  @include container;
  width: 100%;
  position: relative;
  z-index: 2;
}

.hero-kicker {
  font-size: $type-h3;
  color: #8A8372;
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
  color: #F5F0E8;
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
  background: $bg-1;
  @include mobile {
    width: 2px;
    height: 100%;
    top: 5px;
    left: 6px;}
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
  background: #4a4c54;
  border: 3px solid $bg-1;
}

.tl-yr {

  @include mobile { top: 2px; }
}

.tl-yr {
  font-size: $type-label;
  font-weight: 800;
  color: $bg-1;
  letter-spacing: 0.05em;
  margin-bottom: $sp-4;

}

.tl-what {
  font-size: $type-h3;
  font-weight: 700;
  margin-bottom: $sp-8;
  line-height: 1.3;
  color: #F5F0E8;
}

.tl-result {
  font-size: $type-body;
  color: #C4BBA8;
  line-height: 1.6;
}
</style>
