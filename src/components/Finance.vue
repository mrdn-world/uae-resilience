<script setup lang="ts">
import { useReveal } from '@/composables/useReveal'
import { t, tHtml } from '@/i18n'
import SourceTip from './SourceTip.vue'
import Sources from './Sources.vue'
const { el, revealed } = useReveal()
</script>

<template>
  <section ref="el" class="section" :class="{ revealed }">
    <div class="fin-wrap">

      <!-- HERO VIZ: proportional bar — GDP vs SWF -->
      <div class="fin-header">
        <p class="fin-label gl-label">{{ t('finance.label') }}</p>
        <h2>{{ t('finance.headline') }}</h2>
        <p class="fin-sub" v-html="tHtml('finance.sub')"></p>
      </div>

      <div class="proportion-bar">
        <div class="pb-segment gdp" :style="{ flex: revealed ? 1 : 0 }">
          <span class="pb-val">{{ t('finance.proportion.gdp.val') }}</span>
          <span class="pb-lbl">{{ t('finance.proportion.gdp.label') }}</span>
        </div>
        <div class="pb-segment swf" :style="{ flex: revealed ? 3 : 0 }">
          <span class="pb-val">{{ t('finance.proportion.swf.val') }}</span>
          <span class="pb-lbl">{{ t('finance.proportion.swf.label') }}</span>
        </div>
      </div>

      <div class="fin-grid">
        <!-- LEFT: The three funds -->
        <div class="funds">
          <h3>{{ t('finance.funds.title') }}</h3>
          <div class="fund" v-for="(f, i) in t('finance.funds.items')" :key="f.name">
            <span class="fund-name">{{ f.name }}</span>
            <div class="fund-bar" :class="{ med: i === 1, sm: i === 2 }" :style="{ width: revealed ? (i === 0 ? '100%' : i === 1 ? '30%' : '20%') : '0' }">
            <span class="fund-val">{{ f.val }}</span>
            </div>
            <div class="fund-info">
              <!-- <span class="fund-val">{{ f.val }}</span> -->
              <span class="fund-desc">{{ f.desc }}</span>
            </div>
          </div>
        </div>

        <!-- RIGHT: Regional comparison + oil -->
        <div class="fin-right">
          <!-- Regional comparison — multi-bar -->
          <div class="regional">
            <h3>{{ t('finance.regional.title') }} <SourceTip :sources="t('finance.regional.titleSources')" /></h3>
            <div class="reg-metrics">
              <div class="reg-metric" v-for="m in t('finance.regional.metrics')" :key="m.name">
                <div class="rm-name">{{ m.name }}</div>
                <div class="rm-bars">
                  <div v-for="(b, i) in m.bars" :key="b.c" class="rm-bar-row">
                    <span class="rm-country">{{ b.c }}</span>
                    <div class="rm-bar-bg">
                      <div class="rm-bar" :class="{ best: i === 0 }" :style="{ width: revealed ? b.w + '%' : '0%' }"></div>
                    </div>
                    <span class="rm-val" :class="{ best: i === 0 }">{{ b.v }}</span>
                  </div>
                </div>
              </div>
            </div>
            <p class="reg-note">{{ t('finance.regional.note') }}</p>
          </div>
        </div>
      </div>

      <div class="oil-trust-grid">
      <!-- Oil price gauge — single bar with zones -->
      <div class="oil-gauge">
        <h3>{{ t('finance.oil.title') }} <SourceTip :sources="t('finance.oil.titleSources')" /></h3>
        <div class="og-bar">
          <div class="og-zone danger" :style="{ width: revealed ? '46%' : '0%' }">
            <span class="og-label">{{ t('finance.oil.zoneDanger') }}</span>
          </div>
          <div class="og-zone surplus" :style="{ width: revealed ? '33%' : '0%' }">
            <span class="og-label">{{ t('finance.oil.zoneSurplus') }}</span>
          </div>
          <div class="og-zone headroom" :style="{ width: revealed ? '21%' : '0%' }"></div>
        </div>
        <div class="og-markers">
          <div class="og-mark" style="left: 46%">
            <span class="og-mark-line"></span>
            <span class="og-mark-val">{{ t('finance.oil.breakevenVal') }}</span>
            <span class="og-mark-desc">{{ t('finance.oil.breakevenDesc') }}</span>
          </div>
          <div class="og-mark" style="left: 79%">
            <span class="og-mark-line"></span>
            <span class="og-mark-val">{{ t('finance.oil.currentVal') }}</span>
            <span class="og-mark-desc">{{ t('finance.oil.currentDesc') }}</span>
          </div>
        </div>
        <p class="og-note" v-html="tHtml('finance.oil.note')"></p>
      </div>

      <!-- Trust score -->
      <div class="trust">
        <h3>{{ t('finance.trust.title') }}</h3>
        <p>{{ t('finance.trust.intro') }}</p>
        <div class="trust-row">
          <div class="trust-badge" v-for="r in t('finance.trust.ratings')" :key="r.who">
            <span class="tb-grade">{{ r.g }}</span>
            <span class="tb-who">{{ r.who }}</span>
          </div>
        </div>
        <p class="trust-note">{{ t('finance.trust.note') }}</p>
      </div>
      </div>

      <Sources :items="t('finance.sources')" />
    </div>
  </section>
</template>

<style lang="scss">
.fin-wrap { @include container; }

.fin-header {
  margin-bottom: $sp-48;
  @include reveal;
  .revealed & { opacity: 1; transform: none; }

  h2 { font-size: $type-h1; font-weight: 800; letter-spacing: -0.02em; line-height: 1.15; margin-bottom: $sp-12; }
  .fin-sub { font-size: $type-body; color: $text-2; max-width: 600px; em { color: $uae-green; font-style: normal; font-weight: 700; } }
}

// Proportional bar
.proportion-bar {
  display: flex;
  gap: 3px;
  height: 160px;
  margin-bottom: $sp-64;
  border-radius: $r-md;
  overflow: hidden;
  @include mobile {
    flex-direction: column;
    height: 320px;
  }
}

.pb-segment {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 $sp-16;
  transition: flex $dur-slow $ease-out 0.3s;
  overflow: hidden;
  min-width: 0;

  &.gdp { background: #039F4B; border-radius: 0.5rem; }
  &.swf { background: #FFB563; border-radius: 0.5rem; }

  .pb-val {
    font-size: 22px;
    font-weight: 900;
    white-space: nowrap;
  }
  .pb-lbl {
    font-size: $type-body;
    color: $text-2;
    // white-space: nowrap;
    // overflow: hidden;
    // text-overflow: ellipsis;
    max-width: 25rem;
    width: 100%;
  }
}

// Grid
.fin-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: $sp-48;
  margin-bottom: $sp-48;
  @include mobile { grid-template-columns: 1fr; }
}

// Funds
.funds {
  h3 {
    font-size: $type-h3;
    font-weight: 700;
    margin-bottom: $sp-24;
  }
}

.fund {
  margin-bottom: 2.5rem;
  @include mobile { margin-bottom: 1.5rem; }
  .fund-bar {
    height: 3rem;
    background: $uae-green;
    border-radius: 3px;
    margin-bottom: 0;
    transition: width 1.2s $ease-out 0.5s;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 0 0.5rem;
    margin-bottom: 0.6rem;

    &.med { background: $uae-green; transition-delay: 0.7s; }
    &.sm { background: $uae-green; transition-delay: 0.9s; }
  }

  .fund-val {
    font-size: 1.2rem;
    font-weight: 700;
    display: block;
    @include mobile { font-size: 1rem; }
  }
  .fund-name {
    font-size: $type-label;
    color: $text-2;
    font-weight: 600;
    display: block;
    margin-bottom: 12px;
    @include mobile { font-size: 1rem; }
  }
  .fund-desc {
    margin-top: 1rem;
    font-size: clamp(1rem, 0.95rem + 0.25vw, 1.125rem);
    color: $text-3;
    line-height: 120%;
  }
}

// Regional
.fin-right {
  h3 { font-size: $type-h3; font-weight: 700; margin-bottom: $sp-16; }
  p { font-size: $type-small; color: $text-2; line-height: 1.6; }
}

.regional { margin-bottom: $sp-32; }

.reg-metrics {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  margin: $sp-16 0;
}

.reg-metric {
  .rm-name {
    font-size: $type-label;
    font-weight: 700;
    color: $text-2;
    margin-bottom: 12px;
    @include mobile { font-size: 1rem; }
  }
}

.rm-bars {
  display: flex;
  flex-direction: column;
  gap: $sp-4;
}

.rm-bar-row {
  display: grid;
  grid-template-columns: 56px 1fr 36px;
  gap: $sp-8;
  align-items: center;
}

.rm-country { font-size: $type-small; line-height: 1rem; color: $text-3; text-align: right; }
.rm-bar-bg { height: 1.5rem; background: rgba(0,0,0,0.07); border-radius: 4px; overflow: hidden; }
.rm-bar {
  height: 100%; border-radius: 4px; background: rgba(0,0,0,0.40);
  transition: width 0.8s $ease-out 0.3s;
  &.best { background: $uae-green; }
}
.rm-val {
  font-size: $type-small; color: $text-3; font-weight: 700;
  &.best { color: $uae-green; }
}

.reg-note { font-size: $type-small; color: $text-3; font-style: italic; }

// Oil + Trust grid
.oil-trust-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: $sp-32;
  align-items: start;
  @include mobile { grid-template-columns: 1fr; }
}

// Oil gauge
.oil-gauge { margin-bottom: 0; }

.og-bar {
  display: flex;
  height: 40px;
  border-radius: $r-sm;
  overflow: hidden;
  margin-bottom: $sp-48;
  gap: 2px;
}

.og-zone {
  display: flex;
  align-items: center;
  justify-content: center;
  transition: width 1s $ease-out 0.3s;
  min-width: 0;
  overflow: hidden;

  &.danger { background: rgba($uae-red, 0.12); }
  &.surplus { background: rgba($uae-green, 0.2); }
  &.headroom { background: rgba(0,0,0,0.04); }

  .og-label {
    font-size: $type-label;
    font-weight: 700;
    white-space: nowrap;
    color: $text-2;
  }

  &.danger .og-label { color: $text-3; }
  &.surplus .og-label { color: $uae-green; }
}

.og-markers {
  position: relative;
  height: 50px;
  margin-bottom: $sp-16;
}

.og-mark {
  position: absolute;
  transform: translateX(-50%);
  text-align: center;

  .og-mark-line {
    display: block;
    width: 1px;
    height: 12px;
    background: $text-3;
    margin: 0 auto $sp-4;
  }
  .og-mark-val { display: block; font-size: $type-body; font-weight: 800; }
  .og-mark-desc { display: block; font-size: $type-label; color: $text-3; }
}

.og-note {
  font-size: $type-small;
  color: $text-3;
  margin-top: 90px;
  strong { color: $uae-green; }
  @include mobile {
    margin-top: 75px;
  }
}

// Trust
.trust { margin-bottom: 0; }

.trust-row {
  display: flex;
  gap: $sp-12;
  margin: $sp-16 0 $sp-8;
}

.trust-badge {
  flex: 1;
  text-align: center;
  padding: $sp-12;
  background: rgba($uae-gold, 0.06);
  border-radius: $r-sm;

  .tb-grade { display: block; font-size: 26px; font-weight: 900; color: $uae-gold; }
  .tb-who { font-size: $type-label; color: $text-3; }
}

.trust-note {
  font-size: $type-small;
  color: $text-3;
  margin-top: 60px;
  strong { color: $uae-green; }
  @include mobile {
    margin-top: 25px;
    }
  }

// Context
.fin-context {
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
