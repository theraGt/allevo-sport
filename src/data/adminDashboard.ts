export const atletasData = [
  {
    id: 1,
    nombre: 'Nathan Fino',
    disciplina: 'Muay Thai',
    imagen: '/assets/images/atletas/nathan-fino.webp',
    slug: 'nathan-fino',
    edad: 27,
    record: { victories: 32, defeats: 4, knockoutRate: 78 },
    ranking: 3,
    tier: 'ELITE',
    token: 'ALEV-NF-001',
    valorToken: 125.50,
    apyProyectado: 14.2,
    financiacion: { actual: 450000, meta: 500000, tokens: 4500 },
    proximoEvento: { fecha: '2026-11-12', lugar: 'Bangkok, Tailandia', titulo: true },
    contratos: 3,
    badges: ['EARLY_ADOPTER', 'TOP_10'],
    probabilidadVictoria: 78,
    instagram: 'https://instagram.com/gypsy.nate',
    status: 'ACTIVO'
  },
  {
    id: 2,
    nombre: 'Camilo Pinzón',
    disciplina: 'Fisicoculturismo',
    imagen: '/assets/images/atletas/camilo-pinzon.webp',
    slug: 'camilo-pinzon',
    edad: 29,
    record: { victories: 18, defeats: 2, knockoutRate: 0 },
    ranking: 5,
    tier: 'PREMIUM',
    token: 'ALEV-CR-002',
    valorToken: 98.20,
    apyProyectado: 11.8,
    financiacion: { actual: 280000, meta: 350000, tokens: 2800 },
    proximoEvento: { fecha: '2026-12-05', lugar: 'Miami, USA', titulo: false },
    contratos: 2,
    badges: ['CONSISTENT'],
    probabilidadVictoria: 65,
    instagram: 'https://instagram.com/camilofitness.11',
    status: 'ACTIVO'
  },
  {
    id: 3,
    nombre: 'Katherine Portt',
    disciplina: 'Kickboxing',
    imagen: '/assets/images/atletas/katherine-portt.webp',
    slug: 'katherine-portt',
    edad: 24,
    record: { victories: 22, defeats: 3, knockoutRate: 65 },
    ranking: 2,
    tier: 'ELITE',
    token: 'ALEV-MG-003',
    valorToken: 145.80,
    apyProyectado: 16.5,
    financiacion: { actual: 320000, meta: 300000, tokens: 3200 },
    proximoEvento: { fecha: '2026-10-28', lugar: 'Madrid, España', titulo: true },
    contratos: 4,
    badges: ['RISING_STAR', 'TOP_5'],
    probabilidadVictoria: 82,
    instagram: 'https://instagram.com/katherineportt',
    status: 'ACTIVO'
  },
  {
    id: 4,
    nombre: 'Mario Quino',
    disciplina: 'Kickboxing',
    imagen: '/assets/images/atletas/mario-quino.webp',
    slug: 'mario-quino',
    edad: 26,
    record: { victories: 28, defeats: 5, knockoutRate: 72 },
    ranking: 4,
    tier: 'ELITE',
    token: 'ALEV-JR-004',
    valorToken: 67.40,
    apyProyectado: 12.1,
    financiacion: { actual: 180000, meta: 250000, tokens: 1800 },
    proximoEvento: { fecha: '2026-11-20', lugar: 'Lima, Perú', titulo: false },
    contratos: 2,
    badges: ['KNOCKOUT_KING'],
    probabilidadVictoria: 71,
    instagram: 'https://instagram.com/the_shark_quino',
    status: 'ACTIVO'
  },
  {
    id: 5,
    nombre: 'Olivia Serrano',
    disciplina: 'Karate',
    imagen: '/assets/images/atletas/olivia-serrano.webp',
    slug: 'olivia-serrano',
    edad: 23,
    record: { victories: 15, defeats: 1, knockoutRate: 0 },
    ranking: 1,
    tier: 'ELITE',
    token: 'ALEV-RS-005',
    valorToken: 210.00,
    apyProyectado: 18.2,
    financiacion: { actual: 420000, meta: 400000, tokens: 4200 },
    proximoEvento: { fecha: '2026-12-15', lugar: 'Tokio, Japón', titulo: true },
    contratos: 5,
    badges: ['CHAMPION', 'UNDEFATED'],
    probabilidadVictoria: 89,
    instagram: 'https://instagram.com/olivv_.ss',
    status: 'ACTIVO'
  }
]

export const sponsorsData = [
  {
    id: 1,
    nombre: 'Marca Deportiva Total',
    logo: '/assets/images/sponsors/total.svg',
    tipo: 'ROPAS',
    contratoActivo: true,
    atletasPatrocinados: [1, 3],
    inversionTotal: 45000,
    roi: 12.4,
    alcance: { impresiones: 2500000, alcance: 180000 },
    propuestaPendiente: false,
    proximoPago: '2026-11-01',
    montoPago: 15000
  },
  {
    id: 2,
    nombre: 'Energy Drink Power',
    logo: '/assets/images/sponsors/power.svg',
    tipo: 'BEBIDAS',
    contratoActivo: true,
    atletasPatrocinados: [2, 4],
    inversionTotal: 28000,
    roi: 8.2,
    alcance: { impresiones: 1200000, alcance: 95000 },
    propuestaPendiente: true,
    proximoPago: '2026-11-15',
    montoPago: 8000
  },
  {
    id: 3,
    nombre: 'Gimnasios Elite',
    logo: '/assets/images/sponsors/elite.svg',
    tipo: 'EQUIPO',
    contratoActivo: true,
    atletasPatrocinados: [1, 2, 5],
    inversionTotal: 62000,
    roi: 15.7,
    alcance: { impresiones: 3800000, alcance: 220000 },
    propuestaPendiente: false,
    proximoPago: '2026-10-30',
    montoPago: 22000
  }
]

export const inversoresData = [
  {
    id: 1,
    wallet: '0x7a3...c9f2',
    nombre: 'Crypto Investor Pro',
    tokens: [
      { tokenId: 'ALEV-NF-001', cantidad: 48, precioPromedio: 112.40, valorActual: 6024, pnl: 628.80 },
      { tokenId: 'ALEV-MG-003', cantidad: 25, precioPromedio: 130.00, valorActual: 3645, pnl: 395.00 }
    ],
    distribucionesRecibidas: 803.04,
    totalInvertido: 12000,
    valorPortafolio: 15000,
    pnlTotal: 2503.04,
    pnlPorcentaje: 20.86
  },
  {
    id: 2,
    wallet: '0x4b2...d8e1',
    nombre: 'DeFi Whale',
    tokens: [
      { tokenId: 'ALEV-JR-004', cantidad: 100, precioPromedio: 55.00, valorActual: 6740, pnl: 1240.00 },
      { tokenId: 'ALEV-CR-002', cantidad: 60, precioPromedio: 85.00, valorActual: 5892, pnl: 892.00 }
    ],
    distribucionesRecibidas: 450.00,
    totalInvertido: 11000,
    valorPortafolio: 14082,
    pnlTotal: 2982.00,
    pnlPorcentaje: 27.11
  },
  {
    id: 3,
    wallet: '0x9c1...f3a5',
    nombre: 'Sport Investor',
    tokens: [
      { tokenId: 'ALEV-RS-005', cantidad: 30, precioPromedio: 180.00, valorActual: 6300, pnl: 900.00 }
    ],
    distribucionesRecibidas: 320.00,
    totalInvertido: 5400,
    valorPortafolio: 7200,
    pnlTotal: 1120.00,
    pnlPorcentaje: 20.74
  },
  {
    id: 4,
    wallet: '0x2d4...a7b8',
    nombre: 'Early Alpha',
    tokens: [
      { tokenId: 'ALEV-NF-001', cantidad: 15, precioPromedio: 95.00, valorActual: 1882, pnl: 457.50 },
      { tokenId: 'ALEV-MG-003', cantidad: 20, precioPromedio: 120.00, valorActual: 2916, pnl: 516.00 }
    ],
    distribucionesRecibidas: 280.00,
    totalInvertido: 3900,
    valorPortafolio: 5498,
    pnlTotal: 898.00,
    pnlPorcentaje: 23.03
  },
  {
    id: 5,
    wallet: '0x5e8...c2d1',
    nombre: 'Token Collector',
    tokens: [
      { tokenId: 'ALEV-CR-002', cantidad: 35, precioPromedio: 78.00, valorActual: 3437, pnl: 707.00 },
      { tokenId: 'ALEV-JR-004', cantidad: 45, precioPromedio: 52.00, valorActual: 3033, pnl: 693.00 }
    ],
    distribucionesRecibidas: 195.00,
    totalInvertido: 5100,
    valorPortafolio: 6470,
    pnlTotal: 1360.00,
    pnlPorcentaje: 26.67
  }
]

export const transaccionesData = [
  {
    id: 1,
    entidad: 'Marca Deportiva',
    tipo: 'SPONSOR',
    categoria: 'ROPAS',
    fecha: '2026-10-15',
    estado: 'EJECUTADO',
    monto: 12500,
    icono: 'sponsor'
  },
  {
    id: 2,
    entidad: 'Bono Victoria Regional',
    tipo: 'VICTORIA',
    categoria: 'PREMIUN',
    fecha: '2026-08-22',
    estado: 'EJECUTADO',
    monto: 4200,
    icono: 'victoria'
  },
  {
    id: 3,
    entidad: 'Contrato Streaming',
    tipo: 'MEDIA',
    categoria: 'STREAMING',
    fecha: '2026-12-01',
    estado: 'PENDIENTE',
    monto: 8000,
    icono: 'media'
  },
  {
    id: 4,
    entidad: 'Bono Campeonato',
    tipo: 'VICTORIA',
    categoria: 'CAMPEONATO',
    fecha: '2026-11-28',
    estado: 'CONDICIONAL',
    monto: 25000,
    icono: 'trofeo'
  },
  {
    id: 5,
    entidad: 'Sponsor Gym',
    tipo: 'SPONSOR',
    categoria: 'EQUIPO',
    fecha: '2026-09-10',
    estado: 'EJECUTADO',
    monto: 8500,
    icono: 'sponsor'
  }
]

export const tickerData = [
  { sym: 'ALEV-NF-001', val: '$125.50', chg: '+2.4%', dir: 'up' },
  { sym: 'ALEV-CR-002', val: '$98.20', chg: '+1.1%', dir: 'up' },
  { sym: 'ALEV-MG-003', val: '$145.80', chg: '-0.8%', dir: 'down' },
  { sym: 'ALEV-JR-004', val: '$67.40', chg: '+5.2%', dir: 'up' },
  { sym: 'USDC/GTQ', val: '7.73', chg: '+0.02%', dir: 'neutral' },
  { sym: 'POLYGON GAS', val: '0.004 MATIC', chg: '', dir: 'neutral' },
  { sym: 'ALEV-INDEX', val: '109.4', chg: '+1.8%', dir: 'up' },
  { sym: 'ALEV-RS-005', val: '$210.00', chg: '+0.3%', dir: 'up' }
]

export const distributionData = {
  contratos: 55,
  victorias: 30,
  sponsor: 15
}

export const performanceData = {
  months: ['May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic', 'Ene', 'Feb', 'Mar', 'Abr'],
  values: [88, 92, 97, 103, 98, 110, 108, 115, 119, 113, 121, 125.50]
}

export const overviewStats = {
  totalInvertido: 1250000,
  valorTokenPromedio: 129.38,
  numAtletas: 5,
  numSponsors: 3,
  numInversores: 85,
  financiacionTotal: 1650000,
  financiacionMeta: 1800000,
  distribucionesMes: 45000,
  crecimientoMes: 12.4
}