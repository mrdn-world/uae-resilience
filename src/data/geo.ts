import type { LatLngExpression } from 'leaflet'

export interface MapMarker {
  name: string
  pos: LatLngExpression
  type: 'nuclear' | 'desal' | 'port' | 'airport' | 'defense' | 'food' | 'rail'
  stat?: string
  detail?: string
  color: string
}

export interface ImportRoute {
  from: LatLngExpression
  to: LatLngExpression
  label: string
  products: string
  color: string
}

export const UAE_CENTER: LatLngExpression = [24.2, 54.5]
export const UAE_ZOOM = 7

export const markers: MapMarker[] = [
  // Nuclear
  { name: 'Barakah NPP', pos: [23.957, 52.257], type: 'nuclear', stat: '5,600 MW — 25% of UAE electricity', detail: 'First Arab nuclear plant. 4 reactors online.', color: '#F59E0B' },

  // Desalination
  { name: 'Taweelah RO', pos: [24.585, 54.633], type: 'desal', stat: '909,200 m³/day', detail: 'World\'s largest reverse osmosis plant', color: '#3B82F6' },
  { name: 'Jebel Ali Desal', pos: [25.02, 55.03], type: 'desal', stat: '2,276 MIGD', detail: 'DEWA MSF complex', color: '#3B82F6' },
  { name: 'Umm Al Nar', pos: [24.44, 54.55], type: 'desal', stat: '429,000 m³/day', detail: 'EWEC hybrid plant', color: '#3B82F6' },
  { name: 'Fujairah Desal', pos: [25.12, 56.30], type: 'desal', stat: '591,000 m³/day', detail: 'East coast supply', color: '#3B82F6' },
  { name: 'Hassyan (2027)', pos: [24.97, 55.08], type: 'desal', stat: '$920M solar-powered', detail: 'Next-gen clean desal', color: '#60A5FA' },

  // Ports
  { name: 'Jebel Ali Port', pos: [24.986, 55.027], type: 'port', stat: '15.5M TEU (2024)', detail: 'DP World flagship. JAFZA: $190B trade', color: '#14B8A6' },
  { name: 'Khalifa Port', pos: [24.533, 54.617], type: 'port', stat: '7.8M TEU capacity', detail: '#3 CPPI globally. AD Ports Group', color: '#14B8A6' },
  { name: 'Fujairah Port', pos: [25.116, 56.339], type: 'port', stat: '95M metric tons', detail: '#4 bunker hub globally. Oil bypass', color: '#14B8A6' },

  // Airports
  { name: 'DXB Dubai', pos: [25.253, 55.366], type: 'airport', stat: '92.3M passengers', detail: '#1 international airport — 11 years', color: '#A855F7' },
  { name: 'AUH Abu Dhabi', pos: [24.454, 54.651], type: 'airport', stat: '29.4M passengers', detail: 'All-time record (2024)', color: '#A855F7' },
  { name: 'DWC Al Maktoum', pos: [24.896, 55.161], type: 'airport', stat: 'AED 128B expansion', detail: 'Target: 260M pax capacity', color: '#A855F7' },

  // Defense
  { name: 'Al Dhafra Air Base', pos: [24.25, 54.55], type: 'defense', stat: 'THAAD + Patriot', detail: 'Primary air defense hub', color: '#EF4444' },
  { name: 'Abu Dhabi Air Defense', pos: [24.47, 54.37], type: 'defense', stat: 'Patriot PAC-3', detail: 'Capital protection', color: '#EF4444' },
  { name: 'Dubai Air Defense', pos: [25.07, 55.17], type: 'defense', stat: 'Multi-layered', detail: 'City defense umbrella', color: '#EF4444' },

  // Food
  { name: 'Bustanica', pos: [24.88, 55.15], type: 'food', stat: '30,000 m² vertical farm', detail: 'World\'s largest. 1M+ kg/year', color: '#00B847' },
  { name: 'Food Tech Valley', pos: [24.82, 55.20], type: 'food', stat: 'National R&D hub', detail: 'Autonomous farming, soil-free cultivation', color: '#00B847' },
]

export const importRoutes: ImportRoute[] = [
  { from: [20.5, 78.9], to: [24.5, 54.5], label: 'India & Pakistan', products: 'Rice, Spices, Fruits', color: '#F59E0B' },
  { from: [-15.8, -47.9], to: [24.5, 54.5], label: 'Brazil', products: 'Beef, Poultry, Sugar', color: '#EF4444' },
  { from: [-25.3, 133.8], to: [24.5, 54.5], label: 'Australia', products: 'Wheat, Dairy, Meat', color: '#14B8A6' },
  { from: [48.8, 2.3], to: [24.5, 54.5], label: 'Europe', products: 'Dairy, Wheat, Processed Food', color: '#3B82F6' },
  { from: [1.3, 103.8], to: [24.5, 54.5], label: 'Southeast Asia', products: 'Edible Oils, Rice', color: '#A855F7' },
  { from: [-1.3, 36.8], to: [24.5, 54.5], label: 'East Africa', products: 'Coffee, Vegetables, Meat', color: '#00B847' },
]

// ADCOP Pipeline
export const adcopPipeline: LatLngExpression[] = [
  [24.45, 54.40], // Abu Dhabi area
  [24.60, 54.80],
  [24.80, 55.30],
  [25.00, 55.80],
  [25.10, 56.20],
  [25.12, 56.34], // Fujairah
]

// Etihad Rail
export const etihadRail: LatLngExpression[] = [
  [24.09, 51.60], // Ruwais
  [23.96, 52.26], // near Barakah
  [24.05, 52.95],
  [24.20, 53.70],
  [24.42, 54.37], // Abu Dhabi
  [24.70, 54.90],
  [24.95, 55.10], // Dubai
  [25.20, 55.40],
  [25.30, 55.60],
  [25.35, 55.90],
  [25.28, 56.20],
  [25.12, 56.35], // Fujairah
]
