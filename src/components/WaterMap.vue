<script setup lang="ts">
import { ref, onMounted } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { t } from '@/i18n'

const mapEl = ref<HTMLElement | null>(null)

const plantGeo = [
  { pos: [24.585, 54.633] as [number, number], big: true },
  { pos: [25.02, 55.03] as [number, number], big: false },
  { pos: [24.44, 54.55] as [number, number], big: false },
  { pos: [25.12, 56.30] as [number, number], big: false },
  { pos: [24.97, 55.08] as [number, number], big: true },
  { pos: [24.10, 53.37] as [number, number], big: false },
  { pos: [24.15, 52.63] as [number, number], big: false },
  { pos: [25.38, 55.53] as [number, number], big: false },
]
const plantTexts = t('waterMap.plants') as Array<{ name: string, capacity: string, note: string }>
const desalPlants = plantGeo.map((g, i) => ({ ...g, ...plantTexts[i] }))

const asrWells = [
  [24.30, 54.20], [24.35, 54.40], [24.25, 54.60], [24.40, 54.10],
  [24.20, 54.35], [24.45, 54.50], [24.30, 54.70], [24.15, 54.45],
  [24.38, 54.30], [24.28, 54.55], [24.42, 54.65], [24.18, 54.25],
] as [number, number][]

// ADCOP pipeline
const pipeline = [
  [24.45, 54.40], [24.60, 54.80], [24.80, 55.30], [25.00, 55.80], [25.10, 56.20], [25.12, 56.34],
] as [number, number][]

onMounted(() => {
  if (!mapEl.value) return

  const map = L.map(mapEl.value, {
    center: [24.5, 54.8],
    zoom: 8,
    zoomControl: false,
    attributionControl: false,
    scrollWheelZoom: false,
  })

  L.control.zoom({ position: 'topright' }).addTo(map)

  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    maxZoom: 12,
  }).addTo(map)

  // ASR wells
  asrWells.forEach((pos) => {
    L.circleMarker(pos, {
      radius: 3,
      fillColor: '#2ECC87',
      fillOpacity: 0.4,
      color: '#2ECC87',
      weight: 1,
      opacity: 0.3,
    }).addTo(map)
  })

  // ADCOP pipeline
  L.polyline(pipeline, {
    color: '#D4A843',
    weight: 3,
    opacity: 0.6,
  }).bindTooltip(t('waterMap.pipelineLabel'), {
    direction: 'top',
    className: 'pipe-label',
  }).addTo(map)

  // Desal plants
  desalPlants.forEach((p) => {
    const marker = L.circleMarker(p.pos, {
      radius: p.big ? 8 : 5,
      fillColor: '#5B9FE4',
      fillOpacity: 0.8,
      color: '#5B9FE4',
      weight: p.big ? 6 : 3,
      opacity: 0.2,
    })

    marker.bindPopup(`
      <div style="font-family: Inter, system-ui; min-width: 160px;">
        <div style="font-size: 14px; font-weight: 800; margin-bottom: 4px;">${p.name}</div>
        <div style="font-size: 13px; color: #5B9FE4; font-weight: 700; margin-bottom: 4px;">${p.capacity}</div>
        <div style="font-size: 12px; color: #999;">${p.note}</div>
      </div>
    `, { className: 'desal-popup' })

    marker.addTo(map)
  })
})
</script>

<template>
  <div class="water-map-wrap">
    <div class="wm-header">
      <span class="wm-legend-item"><span class="wm-dot" style="background: #5B9FE4"></span>{{ t('waterMap.legendDesal') }}</span>
      <span class="wm-legend-item"><span class="wm-dot" style="background: #2ECC87"></span>{{ t('waterMap.legendWells') }}</span>
      <span class="wm-legend-item"><span class="wm-line" style="background: #D4A843"></span>{{ t('waterMap.legendPipeline') }}</span>
    </div>
    <div ref="mapEl" class="water-map"></div>
  </div>
</template>

<style lang="scss">
.water-map-wrap {
  border-radius: $r-lg;
  overflow: hidden;
  border: 1px solid $border-1;
  margin-bottom: $sp-32;
}

.wm-header {
  display: flex;
  gap: $sp-16;
  flex-wrap: wrap;
  padding: $sp-12 $sp-16;
  background: $bg-2;
  font-size: $type-label;
  color: $text-2;
}

.wm-legend-item {
  display: flex;
  align-items: center;
  gap: $sp-4;
}

.wm-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

.wm-line {
  width: 16px;
  height: 3px;
  border-radius: 2px;
  flex-shrink: 0;
}

.water-map {
  width: 100%;
  height: 400px;
  background: $bg-1;
  @include mobile { height: 300px; }
}

:deep(.desal-popup .leaflet-popup-content-wrapper) {
  background: rgba($bg-0, 0.92) !important;
  color: $text-1 !important;
  border-radius: $r-md !important;
  border: 1px solid $border-2 !important;
  box-shadow: 0 8px 32px rgba(0,0,0,0.4) !important;
}

:deep(.desal-popup .leaflet-popup-tip) {
  background: rgba($bg-0, 0.92) !important;
}

:deep(.pipe-label) {
  background: rgba($bg-0, 0.85) !important;
  border: 1px solid $border-2 !important;
  color: $text-2 !important;
  font-family: $font-body !important;
  font-size: 11px !important;
  font-weight: 600 !important;
  padding: 3px 10px !important;
  border-radius: 4px !important;
  box-shadow: none !important;
  &::before { display: none !important; }
}

:deep(.leaflet-container) { background: $bg-1 !important; }

:deep(.leaflet-control-zoom a) {
  background: $bg-2 !important;
  color: $text-1 !important;
  border: 1px solid $border-1 !important;
  &:hover { background: $bg-3 !important; }
}
</style>
