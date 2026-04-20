<script setup lang="ts">
import { ref, onMounted } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { t } from '@/i18n'

const mapEl = ref<HTMLElement | null>(null)

const routeGeo = [
  { from: [20.5, 78.9] as [number, number], pct: 22, color: '#D4A843' },
  { from: [48.8, 2.3] as [number, number], pct: 18, color: '#5B9FE4' },
  { from: [-15.8, -47.9] as [number, number], pct: 16, color: '#E8564A' },
  { from: [-25.3, 133.8] as [number, number], pct: 12, color: '#2ECC87' },
  { from: [1.3, 103.8] as [number, number], pct: 11, color: '#A77BCA' },
  { from: [-1.3, 36.8] as [number, number], pct: 8, color: '#8A8372' },
]
const routeTexts = t('foodMap.routes') as Array<{ label: string, products: string }>
const routes = routeGeo.map((g, i) => ({ ...g, label: routeTexts[i].label, products: routeTexts[i].products }))

const uae: [number, number] = [24.4, 54.5]

function bezierPoints(from: [number, number], to: [number, number], n = 40): [number, number][] {
  const midLat = (from[0] + to[0]) / 2
  const midLng = (from[1] + to[1]) / 2
  const dist = Math.sqrt((from[0] - to[0]) ** 2 + (from[1] - to[1]) ** 2)
  const angle = Math.atan2(to[1] - from[1], to[0] - from[0])
  const offset = dist * 0.2
  const ctrlLat = midLat + Math.cos(angle + Math.PI / 2) * offset
  const ctrlLng = midLng + Math.sin(angle + Math.PI / 2) * offset

  const pts: [number, number][] = []
  for (let i = 0; i <= n; i++) {
    const t = i / n
    const lat = (1 - t) ** 2 * from[0] + 2 * (1 - t) * t * ctrlLat + t ** 2 * to[0]
    const lng = (1 - t) ** 2 * from[1] + 2 * (1 - t) * t * ctrlLng + t ** 2 * to[1]
    pts.push([lat, lng])
  }
  return pts
}

onMounted(() => {
  if (!mapEl.value) return

  const isMobile = window.innerWidth < 768
  const map = L.map(mapEl.value, {
    center: isMobile ? [15, 54] : [20, 40],
    zoom: isMobile ? 1 : 2,
    minZoom: 1,
    zoomControl: false,
    attributionControl: false,
    scrollWheelZoom: false,
    dragging: false,
    doubleClickZoom: false,
    touchZoom: false,
    maxBounds: [[-60, -180], [75, 200]],
  })

  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png', {
    maxZoom: 6,
  }).addTo(map)

  // UAE pulsing dot
  L.circleMarker(uae, {
    radius: 6,
    fillColor: '#2ECC87',
    fillOpacity: 0.9,
    color: '#2ECC87',
    weight: 8,
    opacity: 0.2,
  }).addTo(map)

  // Routes
  routes.forEach((r) => {
    const from = r.from as [number, number]
    const pts = bezierPoints(from, uae)

    L.polyline(pts, {
      color: r.color,
      weight: 1.5,
      opacity: 0.5,
      dashArray: '6 4',
    }).addTo(map)

    // Origin dot — size proportional to share, fat and visible
    const radius = 6 + r.pct * 0.7
    L.circleMarker(from, {
      radius,
      fillColor: r.color,
      fillOpacity: 0.6,
      color: r.color,
      weight: 2,
      opacity: 0.3,
    }).bindTooltip(t('foodMap.tooltip', { label: r.label, pct: r.pct }), {
      permanent: !isMobile,
      direction: 'top',
      className: 'route-label',
      offset: [0, -radius - 2],
    }).bindPopup(`
      <div style="font-family: Inter, system-ui; min-width: 140px;">
        <div style="font-size: 14px; font-weight: 800;">${r.label}</div>
        <div style="font-size: 13px; color: ${r.color}; font-weight: 700;">${t('foodMap.popupPct', { pct: r.pct })}</div>
        <div style="font-size: 12px; color: #999;">${r.products}</div>
      </div>
    `, { className: 'route-popup' }).addTo(map)
  })
})
</script>

<template>
  <div class="food-map-wrap">
    <div ref="mapEl" class="food-map"></div>
  </div>
</template>

<style lang="scss">
.food-map-wrap {
  border-radius: $r-lg;
  overflow: hidden;
  border: 1px solid $border-1;
  margin-bottom: $sp-32;
}

.food-map {
  width: 100%;
  height: 480px;
  background: $bg-1;
  @include mobile { height: 320px; }
}

:deep(.route-label) {
  background: rgba($bg-0, 0.85) !important;
  border: 1px solid $border-2 !important;
  color: $text-2 !important;
  font-family: $font-body !important;
  font-size: 11px !important;
  font-weight: 600 !important;
  padding: 2px 8px !important;
  border-radius: 4px !important;
  box-shadow: none !important;

  &::before { display: none !important; }
}

:deep(.leaflet-container) {
  background: $bg-1 !important;
}

:deep(.route-popup .leaflet-popup-content-wrapper) {
  background: rgba($bg-0, 0.92) !important;
  color: $text-1 !important;
  border-radius: $r-md !important;
  border: 1px solid $border-2 !important;
  box-shadow: 0 8px 24px rgba(0,0,0,0.4) !important;
}

:deep(.route-popup .leaflet-popup-tip) {
  background: rgba($bg-0, 0.92) !important;
}
</style>
