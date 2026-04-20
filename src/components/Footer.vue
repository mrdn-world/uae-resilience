<script setup lang="ts">
import { t } from '@/i18n'
</script>

<template>
  <footer class="footer">
    <div class="footer-inner">
      <h2>{{ t('footer.titleLine1') }}<br>{{ t('footer.titleLine2') }}</h2>
      <p>{{ t('footer.body') }}</p>
      <div class="footer-sources">
        <strong>{{ t('footer.sourcesLabel') }}</strong>{{ t('footer.sourcesText') }}
      </div>
      <div class="footer-bar">{{ t('footer.bar') }}</div>
    </div>
  </footer>
</template>

<style lang="scss">
.footer {
  padding: $sp-128 0 $sp-48;
  @include mobile { padding: $sp-64 0 $sp-32; }
}

.footer-inner {
  @include container;
  max-width: 680px;
  text-align: center;

  h2 {
    font-size: $type-h1;
    font-weight: 900;
    letter-spacing: -0.02em;
    margin-bottom: $sp-24;
    color: $uae-green;
  }

  p {
    font-size: $type-body;
    color: $text-2;
    line-height: 1.8;
    margin-bottom: $sp-48;
  }
}

.footer-sources {
  font-size: $type-small;
  color: $text-3;
  line-height: 1.7;
  padding: $sp-16;
  background: $bg-2;
  border-radius: $r-sm;
  margin-bottom: $sp-32;
  strong { color: $text-2; }
}

.footer-bar {
  font-size: $type-label;
  color: $text-3;
  padding-top: $sp-24;
  border-top: 1px solid $border-1;
}
</style>
