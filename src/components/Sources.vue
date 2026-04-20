<script setup lang="ts">
import { t } from '@/i18n'
defineProps<{
  items: Array<{ label: string, url: string }>
}>()
</script>

<template>
  <div class="sources">
    <span class="src-label">{{ t('common.sourcesLabel') }}</span>
    <a v-for="s in items" :key="s.url" :href="s.url" target="_blank" rel="noopener">{{ s.label }}</a>
  </div>
</template>

<style lang="scss">
.sources {
  margin-top: $sp-24;
  padding-top: $sp-12;
  border-top: 1px solid $border-1;
  font-size: 12px;
  line-height: 1.8;
  color: $text-3;

  .src-label {
    font-weight: 700;
    margin-right: $sp-4;
  }

  a {
    color: $text-3;
    text-decoration: underline;
    text-decoration-color: rgba($text-3, 0.3);
    text-underline-offset: 2px;
    margin-right: $sp-4;
    transition: color $dur-fast $ease-out;

    &:hover { color: $text-2; }
    &::after { content: ' · '; text-decoration: none; color: $text-3; opacity: 0.4; }
    &:last-child::after { content: ''; }
  }
}
</style>
