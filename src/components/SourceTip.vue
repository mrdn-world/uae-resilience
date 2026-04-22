<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  sources: Array<{ label: string, url: string }>
}>()

const open = ref(false)
</script>

<template>
  <span class="src-tip" @click.stop="open = !open" @mouseleave="open = false">
    <span class="src-icon">i</span>
    <div class="src-popup" v-if="open" @click.stop>
      <a v-for="s in sources" :key="s.url" :href="s.url" target="_blank" rel="noopener">{{ s.label }}</a>
    </div>
  </span>
</template>

<style lang="scss">
.src-tip {
  position: relative;
  display: inline-flex;
  cursor: pointer;
  vertical-align: middle;
  margin-left: $sp-4;
  transform: translateY(-1rem);
}

.src-icon {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: rgba(0,0,0,0.07);
  color: $text-3;
  font-family: $font-body;
  font-size: 9px;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: background $dur-fast $ease-out;

  .src-tip:hover & { background: rgba(0,0,0,0.12); color: $text-2; }
}

.src-popup {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-bottom: $sp-8;
  padding: $sp-8 $sp-12;
  background: $bg-2;
  border: 1px solid $border-2;
  border-radius: $r-sm;
  box-shadow: 0 8px 24px rgba(0,0,0,0.4);
  min-width: 200px;
  max-width: 300px;
  font-family: $font-body;
  font-weight: 600;
  z-index: 100;
  display: flex;
  flex-direction: column;
  gap: $sp-4;

  a {
    font-size: 11px;
    color: $text-3;
    text-decoration: underline;
    text-decoration-color: rgba($text-3, 0.3);
    text-underline-offset: 2px;
    line-height: 1.6;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    &:hover { color: $text-1; }
  }
}
</style>
