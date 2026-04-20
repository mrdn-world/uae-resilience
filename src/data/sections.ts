export interface Candid {
  strength: string
  caveat: string
}

export interface DefenseLayer {
  name: string
  range: string
  altitude: string
  role: string
  count: string
  origin: string
  color: string
  costPerShot?: string
}

// ─── Hero ──────────────────────────────────────────

export const stressTests = [
  { year: '2020', event: 'COVID-19 pandemic', result: '#8 Bloomberg Resilience Ranking. First Phase III vaccine trials on Earth.', icon: '🦠' },
  { year: '2024', event: 'April mega-floods', result: '2 years of rain in 24 hours. NCEMA prevented catastrophe.', icon: '🌊' },
  { year: '2026', event: 'Iranian missile strike', result: '96% interception. Markets recovered in 2 weeks.', icon: '🚀' },
]

// ─── Financial Reserves ────────────────────────────

export const financialData = {
  gdp: 484,
  nonOilShare: 75.5,
  netAssetsToGdp: 184,
  liquidAssetsToGdp: 210,
  nonOilRevenueGrowth: 113,
  ratings: [
    { agency: 'S&P', grade: 'AA', outlook: 'Stable' },
    { agency: "Moody's", grade: 'Aa2', outlook: 'Stable' },
    { agency: 'Fitch', grade: 'AA-', outlook: 'Stable' },
  ],
  swfs: [
    { name: 'ADIA', assets: 1000, note: 'Abu Dhabi Investment Authority — one of world\'s largest' },
    { name: 'Mubadala', assets: 300, note: 'Strategic diversified investments globally' },
    { name: 'ADQ', assets: 200, note: 'Abu Dhabi holding company, critical infrastructure' },
  ],
  swfTotal: 1500,
  swfToGdpRatio: 3,
  fiscalBreakeven: 60,
  oilPriceCurrent: 103,
  cbReserves: 190,
  nafisGrowth: 350,
  candid: [
    {
      strength: '$1.5 trillion across three sovereign wealth funds — 3x the entire GDP',
      caveat: 'Most SWF assets are long-term, illiquid investments. You can\'t sell a London skyscraper overnight',
    },
    {
      strength: 'Non-oil revenue grew 113% from 2016 baseline — diversification is real',
      caveat: 'Tourism and aviation still swing hard during crises: 80K hotel cancellations in 48 hours during March 2026',
    },
    {
      strength: 'Fiscal breakeven at ~$60/bbl. Oil is currently $103. Massive surplus cushion',
      caveat: 'Oil revenue is a buffer, not the plan. If it drops below breakeven, the model works differently',
    },
  ] as Candid[],
}

// ─── Food Security ─────────────────────────────────

export const foodData = {
  reserveMonths: 6,
  importPercent: 90,
  categories: 18,
  sourcesPerCategory: 5,
  initiatives: 38,
  gfsiRank: 23,
  gfsiRegionRank: 1,
  targetYear: 2051,
  wastePerYear: 3.27,
  wasteCost: 3.5,
  wastePerCapita: 95,
  foodTech: [
    { name: 'Bustanica', stat: '30,000 m² indoor farm', detail: 'A building the size of 4 football fields, growing over 1 million kg of lettuce and herbs per year — without soil, in stacked trays, using 95% less water than traditional farming.' },
    { name: 'Pure Harvest Smart Farms', stat: '$180M invested', detail: 'A UAE company that builds climate-controlled greenhouses in the desert. Grows tomatoes, strawberries, and leafy greens year-round in 50°C heat. Supplies major supermarket chains across the Gulf.' },
    { name: 'Food Tech Valley', stat: 'Government R&D center', detail: 'A national research hub in Dubai where scientists develop robot-operated farms, soil-free growing systems, and AI that predicts crop yields. Part of the UAE\'s plan to grow 30% of fresh produce locally by 2030.' },
  ],
  importSources: [
    { product: 'Rice', from: 'India, Pakistan' },
    { product: 'Wheat & Dairy', from: 'Europe, Australia' },
    { product: 'Edible oils', from: 'Southeast Asia' },
    { product: 'Protein (meat)', from: 'Brazil, Africa, South America' },
    { product: 'Fruits & Vegetables', from: 'India, Egypt, Jordan, South Africa' },
  ],
  hopeConsortium: {
    coldStorage: 19000,
    doses: 120,
    temperature: -80,
    throughput: 6,
  },
  covidProof: 'March 2020: borders closed, flights halted. Supermarket shelves stayed full. Supply chains held.',
  candid: [
    {
      strength: '6 months of strategic reserves across 18 product categories, 3–5 supplier countries each',
      caveat: '90% imported. If Hormuz AND Red Sea are both closed for months, air freight costs 10–20x more than shipping',
    },
    {
      strength: 'Bustanica, Pure Harvest, Food Tech Valley — real production happening in the desert',
      caveat: 'Vertical farms cover leafy greens and herbs. You can\'t grow wheat or rice indoors at scale. Yet.',
    },
    {
      strength: 'HOPE Consortium — 19,000 m² cold chain, built for vaccines, now serves food logistics',
      caveat: '3.27M tons of food wasted annually ($3.5B). Strategic reserves exist alongside massive waste.',
    },
  ] as Candid[],
}

// ─── Water Security ────────────────────────────────

export const waterData = {
  emergencyDays: 45,
  crisisDays: 16,
  normalDays: 2,
  perCapitaLiters: 550,
  emergencyLiters: 30,
  globalAvgLiters: 150,
  europeAvgLiters: 120,
  globalDesalShare: 14,
  desalPlants: 70,
  reuseTarget: 95,
  reuseCurrent: 50,
  demandReduction: 21,
  savings: 74,
  co2Reduction: 100,
  perCapitaReduction: 50,
  taweelah: {
    capacity: 909200,
    type: 'Reverse Osmosis',
    note: 'World\'s largest RO desalination plant',
  },
  hassyan: {
    cost: 920,
    type: 'Solar-powered RO',
    launch: '2026–2027',
    note: 'Next-gen: desalination on clean energy',
  },
  abuDhabiASR: {
    wells: 300,
    stored: 26,
    emergencyDays: 90,
  },
  cloudSeeding: 'UAE runs one of the world\'s most active cloud seeding programs via NCM — making rain in a desert.',
  groundwaterTruth: 'Current groundwater consumption is 20x the natural replenishment rate. Aquifers are depleting.',
  candid: [
    {
      strength: '45+ days of emergency water at extreme rationing. Abu Dhabi ASR: 300 wells, 26M m³, 90-day supply',
      caveat: 'Normal consumption is 550L/person/day — one of the highest on Earth. Emergency is 30L. That gap is enormous.',
    },
    {
      strength: 'Taweelah: world\'s largest RO plant (909,200 m³/day). 14% of global desalination is in the UAE.',
      caveat: 'Desalination plants are coastal infrastructure — physically vulnerable. And 75% of energy still comes from gas.',
    },
    {
      strength: 'Cloud seeding, smart meters, 95% reuse target by 2036. Active innovation.',
      caveat: 'Groundwater depletes at 20x replenishment. The transition from mining aquifers to full desal isn\'t done.',
    },
  ] as Candid[],
}

// ─── Air Defense ───────────────────────────────────

export const airDefenseData = {
  layers: [
    {
      name: 'THAAD',
      range: '200 km',
      altitude: '150 km',
      role: 'Exo-atmospheric ballistic missile kill',
      count: '2 batteries active',
      origin: 'USA (Lockheed Martin)',
      color: '#3B82F6',
      costPerShot: '~$12M per interceptor',
    },
    {
      name: 'Patriot PAC-3',
      range: '70 km',
      altitude: '40 km',
      role: 'Tactical ballistic missiles & aircraft',
      count: '9 batteries, 108 launchers',
      origin: 'USA (Raytheon)',
      color: '#14B8A6',
      costPerShot: '~$4M per interceptor',
    },
    {
      name: 'Cheongung-II',
      range: '40 km',
      altitude: '25 km',
      role: 'Medium-range air defense',
      count: '10 batteries (2 delivered)',
      origin: 'South Korea ($3.5B deal)',
      color: '#A855F7',
    },
    {
      name: 'Pantsir-S1',
      range: '20 km',
      altitude: '15 km',
      role: 'Short-range point defense + C-UAS',
      count: '~50 units',
      origin: 'Russia',
      color: '#EF4444',
    },
    {
      name: 'Barak-8',
      range: '100 km',
      altitude: '16 km',
      role: 'Naval & ground-based medium/long range',
      count: 'Deployed',
      origin: 'Israel / India',
      color: '#F59E0B',
    },
    {
      name: 'SkyKnight + Silent Hunter',
      range: '5 km',
      altitude: '2 km',
      role: 'C-UAS: laser (30kW) & kinetic drone kill',
      count: 'Deployed',
      origin: 'UAE (EDGE) / China',
      color: '#00B847',
    },
  ] as DefenseLayer[],
  marchResults: {
    intercepted: 132,
    total: 137,
    rate: 96,
    dronesDestroyed: 195,
    killed: 6,
    injured: 141,
  },
  jan2022: 'January 2022: THAAD performs the first-ever combat intercept in history — a Houthi ballistic missile over Abu Dhabi.',
  comparison: {
    uaeRate: 96,
    ironDomeRate: 90,
    gulfWarRate: 40,
  },
  firsts: [
    'First nation outside the US to deploy THAAD',
    'First GCC nation with Patriot PAC-3',
    'First-ever THAAD combat intercept (Jan 2022)',
  ],
  edge: {
    revenue: 4.9,
    backlog: 12.8,
    products: 201,
    countries: 91,
    idex2025: 6.8,
    localShare: 68,
  },
  budgetBillions: 25,
  candid: [
    {
      strength: '96% ballistic interception (132/137) — outperformed Iron Dome\'s ~90% rate',
      caveat: '5 missiles got through. 6 killed, 141 injured. No shield is 100%.',
    },
    {
      strength: '6 layers from 150 km altitude to close-range laser systems. True defense in depth.',
      caveat: 'THAAD and Patriot ammo is American-made. Resupply depends on US willingness during active conflict.',
    },
    {
      strength: 'EDGE Group: $4.9B revenue, 201 products, Top-25 globally. Real domestic capability.',
      caveat: 'Localization at ~25%. Target is 50%. Most advanced systems are still imported.',
    },
  ] as Candid[],
}

// ─── Proof Points (Cross-cutting) ──────────────────

export const proofPoints = {
  expatStayed: {
    expatPercent: 88,
    headline: '88% of the population is expatriate. They stayed.',
    detail: 'If the country wasn\'t resilient, people would leave. Expats overwhelmingly chose to stay during every crisis — COVID, floods, and the March 2026 strikes. That\'s a vote of confidence you can\'t fake.',
  },
  covid: {
    bloombergRank: 8,
    vaccineTrials: 'First Phase III trials globally (July 2020)',
    hopeCapacity: '6B+ doses logistics capacity (2021)',
    maskMandate: 'Mandatory masks before WHO recommended them',
  },
  floods2024: {
    rainfall: '2-year average in 24 hours',
    record: '254.8 mm/day (Al Ain), 200.8 mm/hr intensity',
    response: 'NCEMA activated, digital alerts, evacuations. No mass casualty.',
  },
  humanitarian: {
    rank: 3,
    amount: 1.46,
    globalShare: 7.2,
    gazaTons: 122000,
  },
  cyber: {
    ituRank: 5,
    criteriaScore: 100,
    initiatives: 60,
    pillars: 5,
  },
}
