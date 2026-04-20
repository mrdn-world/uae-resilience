<script setup lang="ts">
import { useReveal } from '@/composables/useReveal'
import SourceTip from './SourceTip.vue'
import Sources from './Sources.vue'
const { el, revealed } = useReveal()
</script>

<template>
  <section ref="el" class="section" :class="{ revealed }">
    <div class="fin-wrap">

      <!-- HERO VIZ: proportional bar — GDP vs SWF -->
      <div class="fin-header">
        <p class="fin-label">FINANCIAL RESERVES</p>
        <h2>Imagine earning $100K a year — with $300K in the bank and zero debt.</h2>
        <p class="fin-sub">That's the UAE. Most countries owe more than they earn. The UAE <em>saved</em> 3x its economy.</p>
      </div>

      <div class="proportion-bar">
        <div class="pb-segment gdp" :style="{ flex: revealed ? 1 : 0 }">
          <span class="pb-val">$484B</span>
          <span class="pb-lbl">GDP — what the country earns in a year</span>
        </div>
        <div class="pb-segment swf" :style="{ flex: revealed ? 3 : 0 }">
          <span class="pb-val">$1.5T</span><SourceTip :sources="[{label:'SWF Institute',url:'https://www.swfinstitute.org/fund-rankings'}]" />
          <span class="pb-lbl">Sovereign wealth — what's saved up across three government investment funds</span>
        </div>
      </div>

      <div class="fin-grid">
        <!-- LEFT: The three funds -->
        <div class="funds">
          <h3>Three funds, three jobs</h3>
          <div class="fund">
            <div class="fund-bar" :style="{ width: revealed ? '100%' : '0' }"></div>
            <div class="fund-info">
              <span class="fund-val">~$1 Trillion</span>
              <span class="fund-name">Abu Dhabi Investment Authority</span>
              <span class="fund-desc">Owns real estate, stocks, and infrastructure in 30+ countries. Been saving since 1976 — that's 50 years of compounding.</span>
            </div>
          </div>
          <div class="fund">
            <div class="fund-bar med" :style="{ width: revealed ? '30%' : '0' }"></div>
            <div class="fund-info">
              <span class="fund-val">$300 Billion</span>
              <span class="fund-name">Mubadala</span>
              <span class="fund-desc">Bets on the future — AI, semiconductors, aerospace, healthcare. Strategic long-term plays across 50 countries.</span>
            </div>
          </div>
          <div class="fund">
            <div class="fund-bar sm" :style="{ width: revealed ? '20%' : '0' }"></div>
            <div class="fund-info">
              <span class="fund-val">$200 Billion</span>
              <span class="fund-name">ADQ</span>
              <span class="fund-desc">Owns the essentials: airports, seaports, hospitals, food companies, power plants. If it keeps the country running, ADQ probably owns it.</span>
            </div>
          </div>
        </div>

        <!-- RIGHT: Regional comparison + oil -->
        <div class="fin-right">
          <!-- Regional comparison — multi-bar -->
          <div class="regional">
            <h3>UAE vs its neighbors <SourceTip :sources="[{label:'IMD Rankings',url:'https://www.imd.org/centers/wcc/world-competitiveness-center/rankings/'}]" /></h3>
            <div class="reg-metrics">
              <div class="reg-metric" v-for="m in [
                { name: 'Economy not dependent on oil', bars: [{ c: 'UAE', w: 100, v: '75%' }, { c: 'Saudi', w: 67, v: '50%' }, { c: 'Qatar', w: 60, v: '45%' }, { c: 'Kuwait', w: 53, v: '40%' }] },
                { name: 'How modern is the infrastructure (Smart City Index)', bars: [{ c: 'UAE', w: 100, v: '#4' }, { c: 'Saudi', w: 6, v: '#68' }, { c: 'Qatar', w: 5, v: '#77' }] },
                { name: 'Global competitiveness (IMD ranking)', bars: [{ c: 'UAE', w: 100, v: '#5' }, { c: 'Qatar', w: 25, v: '#20' }, { c: 'Saudi', w: 21, v: '#24' }] },
              ]" :key="m.name">
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
            <p class="reg-note">#1 in the Middle East across every major global index.</p>
          </div>

          <!-- Oil price gauge — single bar with zones -->
          <div class="oil-gauge">
            <h3>Oil price safety margin <SourceTip :sources="[{label:'IMF Article IV',url:'https://www.imf.org/en/countries/are'}]" /></h3>
            <div class="og-bar">
              <div class="og-zone danger" :style="{ width: revealed ? '46%' : '0%' }">
                <span class="og-label">$0–60</span>
              </div>
              <div class="og-zone surplus" :style="{ width: revealed ? '33%' : '0%' }">
                <span class="og-label">+$43 surplus</span>
              </div>
              <div class="og-zone headroom" :style="{ width: revealed ? '21%' : '0%' }"></div>
            </div>
            <div class="og-markers">
              <div class="og-mark" style="left: 46%">
                <span class="og-mark-line"></span>
                <span class="og-mark-val">$60</span>
                <span class="og-mark-desc">breakeven</span>
              </div>
              <div class="og-mark" style="left: 79%">
                <span class="og-mark-line"></span>
                <span class="og-mark-val">$103</span>
                <span class="og-mark-desc">current price</span>
              </div>
            </div>
            <p class="og-note">Every barrel produces <strong>$43 of pure surplus</strong>. Oil could crash 40% and the budget would still work.</p>
          </div>

          <!-- Trust score -->
          <div class="trust">
            <h3>Can you trust this country with your money?</h3>
            <p>Three independent agencies grade every nation's finances. The UAE scores near-perfect — even during a war:</p>
            <div class="trust-row">
              <div class="trust-badge" v-for="r in [
                { g: 'AA', who: 'S&P' }, { g: 'Aa2', who: 'Moody\'s' }, { g: 'AA-', who: 'Fitch' }
              ]" :key="r.who">
                <span class="tb-grade">{{ r.g }}</span>
                <span class="tb-who">{{ r.who }}</span>
              </div>
            </div>
            <p class="trust-note">Only about 20 countries on Earth score this high.</p>
          </div>
        </div>
      </div>

      <div class="fin-context">
        <strong>Context:</strong> Most of these savings are locked in long-term investments — real estate, infrastructure, company stakes. Converting a skyscraper to cash takes time. And tourism still dips hard during crises: 80,000 hotel cancellations in 48 hours during the March 2026 strikes.
      </div>

      <Sources :items="[
        { label: 'SWF Institute', url: 'https://www.swfinstitute.org/fund-rankings' },
        { label: 'IMF — UAE', url: 'https://www.imf.org/en/countries/are' },
        { label: 'IMD Competitiveness', url: 'https://www.imd.org/centers/wcc/world-competitiveness-center/rankings/' },
        { label: 'S&P Global Ratings', url: 'https://www.spglobal.com/ratings/' },
      ]" />
    </div>
  </section>
</template>

<style lang="scss">
.fin-wrap { @include container; }

.fin-header {
  margin-bottom: $sp-48;
  @include reveal;
  .revealed & { opacity: 1; transform: none; }

  .fin-label { font-size: $type-label; font-weight: 700; color: $uae-gold; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: $sp-8; }
  h2 { font-size: $type-h1; font-weight: 800; letter-spacing: -0.02em; line-height: 1.15; margin-bottom: $sp-12; }
  .fin-sub { font-size: $type-body; color: $text-2; max-width: 600px; em { color: $uae-green; font-style: normal; font-weight: 700; } }
}

// Proportional bar
.proportion-bar {
  display: flex;
  gap: 3px;
  height: 72px;
  margin-bottom: $sp-64;
  border-radius: $r-md;
  overflow: hidden;
}

.pb-segment {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 $sp-16;
  transition: flex $dur-slow $ease-out 0.3s;
  overflow: hidden;
  min-width: 0;

  &.gdp { background: rgba($data-1, 0.2); border-left: 4px solid $data-1; }
  &.swf { background: rgba($uae-gold, 0.12); border-left: 4px solid $uae-gold; }

  .pb-val { font-size: 22px; font-weight: 900; white-space: nowrap; }
  .pb-lbl { font-size: $type-small; color: $text-2; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    @include mobile { display: none; }
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
  h3 { font-size: $type-h3; font-weight: 700; margin-bottom: $sp-24; }
}

.fund {
  margin-bottom: $sp-16;

  .fund-bar {
    height: 6px;
    background: $uae-gold;
    border-radius: 3px;
    margin-bottom: $sp-8;
    transition: width 1.2s $ease-out 0.5s;

    &.med { background: $data-1; transition-delay: 0.7s; }
    &.sm { background: $uae-green; transition-delay: 0.9s; }
  }

  .fund-val { font-size: $type-h3; font-weight: 800; display: block; }
  .fund-name { font-size: $type-small; color: $text-2; font-weight: 600; display: block; margin-bottom: $sp-4; }
  .fund-desc { font-size: $type-small; color: $text-3; line-height: 1.6; }
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
  gap: $sp-24;
  margin: $sp-16 0;
}

.reg-metric {
  .rm-name { font-size: $type-small; font-weight: 700; color: $text-2; margin-bottom: $sp-8; }
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

.rm-country { font-size: $type-label; color: $text-3; text-align: right; }
.rm-bar-bg { height: 8px; background: rgba(255,255,255,0.04); border-radius: 4px; overflow: hidden; }
.rm-bar {
  height: 100%; border-radius: 4px; background: rgba(255,255,255,0.12);
  transition: width 0.8s $ease-out 0.3s;
  &.best { background: $uae-green; }
}
.rm-val {
  font-size: $type-label; color: $text-3; font-weight: 700;
  &.best { color: $uae-green; }
}

.reg-note { font-size: $type-small; color: $text-3; font-style: italic; }

// Oil gauge
.oil-gauge { margin-bottom: $sp-32; }

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
  &.headroom { background: rgba(255,255,255,0.03); }

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

.og-note { font-size: $type-small; color: $text-3; margin-top: $sp-8; strong { color: $uae-green; } }

// Trust
.trust { margin-bottom: $sp-16; }

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

.trust-note { font-style: italic; }

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
