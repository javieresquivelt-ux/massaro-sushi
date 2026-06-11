// Datos estáticos del menú de Massaro Sushi
// Estructura preparada para migrar a API REST en el futuro
// Moneda: CLP — Zona de despacho: Quilicura ($2.000)

export const categories = [
  { id: 'promos', name: 'Promos' },
  { id: 'rolls-a-la-carta', name: 'Rolls a la Carta' },
  { id: 'especiales', name: 'Especiales' },
  { id: 'hard-rolls', name: 'Hard Rolls' },
  { id: 'al-plato', name: 'Al Plato' },
  { id: 'tabla-massaro', name: 'Tabla Massaro' },
  { id: 'adicionales', name: 'Adicionales' },
];

export const products = [
  // =============================================
  // Rolls a la Carta (7 productos + variantes)
  // =============================================
  {
    id: 'roll-envuelto-salmon',
    name: 'Roll envuelto en Salmón',
    description: 'Roll clásico envuelto en salmón fresco con los mejores cortes.',
    price: 5000,
    category: 'rolls-a-la-carta',
    image: '/src/assets/img/categories/rolls-carta.webp',
    badges: ['Popular'],
    variants: [
      { name: 'Pollo', price: 5000 },
      { name: 'Camarón', price: 5000 },
      { name: 'Kanikama', price: 5000 },
      { name: 'Salmón', price: 5000 },
      { name: 'Verdura', price: 5000 },
    ],
  },
  {
    id: 'roll-envuelto-palta',
    name: 'Roll envuelto en Palta',
    description: 'Suave y cremoso roll envuelto en palta fresca, relleno a elección.',
    price: 5000,
    category: 'rolls-a-la-carta',
    image: '/src/assets/img/categories/rolls-carta.webp',
    variants: [
      { name: 'Pollo', price: 5000 },
      { name: 'Camarón', price: 5000 },
      { name: 'Kanikama', price: 5000 },
      { name: 'Salmón', price: 5000 },
      { name: 'Verdura', price: 5000 },
    ],
  },
  {
    id: 'roll-envuelto-queso',
    name: 'Roll envuelto en Queso',
    description: 'Roll cubierto con queso gratinado, irresistible.',
    price: 5000,
    category: 'rolls-a-la-carta',
    image: '/src/assets/img/categories/rolls-carta.webp',
    variants: [
      { name: 'Pollo', price: 5000 },
      { name: 'Camarón', price: 5000 },
      { name: 'Kanikama', price: 5000 },
      { name: 'Salmón', price: 5000 },
      { name: 'Verdura', price: 5000 },
    ],
  },
  {
    id: 'roll-envuelto-masago',
    name: 'Roll envuelto en Masago',
    description: 'Roll bañado en masago (hueva de pez volador) con relleno a elección.',
    price: 5000,
    category: 'rolls-a-la-carta',
    image: '/src/assets/img/categories/rolls-carta.webp',
    variants: [
      { name: 'Pollo', price: 5000 },
      { name: 'Camarón', price: 5000 },
      { name: 'Kanikama', price: 5000 },
      { name: 'Salmón', price: 5000 },
      { name: 'Verdura', price: 5000 },
    ],
  },
  {
    id: 'roll-envuelto-sesamo',
    name: 'Roll envuelto en Sésamo',
    description: 'Roll tostado con sésamo, crujiente por fuera y suave por dentro.',
    price: 4500,
    category: 'rolls-a-la-carta',
    image: '/src/assets/img/categories/rolls-carta.webp',
    variants: [
      { name: 'Pollo', price: 4500 },
      { name: 'Camarón', price: 4500 },
      { name: 'Kanikama', price: 4500 },
      { name: 'Salmón', price: 4500 },
      { name: 'Verdura', price: 4500 },
    ],
  },
  {
    id: 'roll-envuelto-ciboullete',
    name: 'Roll envuelto en Ciboullete',
    description: 'Roll con ciboullete (cebollín) fresco, ligero y aromático.',
    price: 4500,
    category: 'rolls-a-la-carta',
    image: '/src/assets/img/categories/rolls-carta.webp',
    variants: [
      { name: 'Pollo', price: 4500 },
      { name: 'Camarón', price: 4500 },
      { name: 'Kanikama', price: 4500 },
      { name: 'Salmón', price: 4500 },
      { name: 'Verdura', price: 4500 },
    ],
  },
  {
    id: 'roll-tempura',
    name: 'Roll Tempura',
    description: 'Roll frito en tempura, crujiente dorado, relleno a elección.',
    price: 5000,
    category: 'rolls-a-la-carta',
    image: '/src/assets/img/categories/rolls-carta.webp',
    variants: [
      { name: 'Pollo', price: 5000 },
      { name: 'Camarón', price: 5000 },
      { name: 'Kanikama', price: 5000 },
      { name: 'Salmón', price: 5000 },
      { name: 'Verdura', price: 5000 },
    ],
  },

  // =============================================
  // Especiales (9 productos)
  // =============================================
  {
    id: 'sashimi-salmon',
    name: 'Sashimi de Salmón 5 cortes',
    description: '5 cortes gruesos de salmón fresco del sur, servidos con soya.',
    price: 5000,
    category: 'especiales',
    image: '/src/assets/img/categories/especiales.webp',
    badges: ['Popular'],
  },
  {
    id: 'ceviche-mixto',
    name: 'Ceviche Mixto',
    description: 'Ceviche fresco de camarón y reineta marinados en limón.',
    price: 6000,
    category: 'especiales',
    image: '/src/assets/img/categories/especiales.webp',
  },
  {
    id: 'roll-aceviochado',
    name: 'Roll Aceviochado',
    description: 'Salmón y camarón marinados al estilo ceviche, envueltos en arroz.',
    price: 6000,
    category: 'especiales',
    image: '/src/assets/img/categories/especiales.webp',
  },
  {
    id: 'ceviche-roll',
    name: 'Ceviche Roll',
    description: 'Camarón furay, queso palta y pequeña porción de ceviche.',
    price: 6000,
    category: 'especiales',
    image: '/src/assets/img/categories/especiales.webp',
  },
  {
    id: 'roll-estilo-grez',
    name: 'Roll estilo Grez',
    description: 'Sin arroz, base de palta y queso, relleno a elección.',
    price: 6000,
    category: 'especiales',
    image: '/src/assets/img/categories/especiales.webp',
  },
  {
    id: 'futomaki',
    name: 'Futomaki',
    description: 'Roll grande con variedad de ingredientes en su interior.',
    price: 5000,
    category: 'especiales',
    image: '/src/assets/img/categories/especiales.webp',
  },
  {
    id: 'futomaki-tempura',
    name: 'Futomaki Tempura',
    description: 'Futomaki frito en tempura, crujiente por fuera.',
    price: 5000,
    category: 'especiales',
    image: '/src/assets/img/categories/especiales.webp',
  },
  {
    id: 'hosamaki',
    name: 'Hosamaki',
    description: 'Roll pequeño de un solo ingrediente, sencillo y delicioso.',
    price: 2500,
    category: 'especiales',
    image: '/src/assets/img/categories/especiales.webp',
  },
  {
    id: 'gyosas',
    name: 'Gyosas 5 unidades',
    description: '5 gyosas rellenas, doradas y servidas con salsa agridulce.',
    price: 3000,
    category: 'especiales',
    image: '/src/assets/img/categories/especiales.webp',
  },

  // =============================================
  // Hard Rolls (5 productos)
  // =============================================
  {
    id: 'hard-roll-pollo',
    name: 'Hard Roll Pollo',
    description: 'Roll pequeño y frito relleno de pollo.',
    price: 2000,
    category: 'hard-rolls',
    image: '/src/assets/img/categories/hard-rolls.webp',
  },
  {
    id: 'hard-roll-verdura',
    name: 'Hard Roll Verdura',
    description: 'Roll pequeño y frito relleno de verduras frescas.',
    price: 2000,
    category: 'hard-rolls',
    image: '/src/assets/img/categories/hard-rolls.webp',
  },
  {
    id: 'hard-roll-kanikama',
    name: 'Hard Roll Kanikama',
    description: 'Roll pequeño y frito relleno de kanikama.',
    price: 2000,
    category: 'hard-rolls',
    image: '/src/assets/img/categories/hard-rolls.webp',
  },
  {
    id: 'hard-roll-camaron',
    name: 'Hard Roll Camarón',
    description: 'Roll pequeño y frito relleno de camarón.',
    price: 2500,
    category: 'hard-rolls',
    image: '/src/assets/img/categories/hard-rolls.webp',
  },
  {
    id: 'hard-roll-salmon',
    name: 'Hard Roll Salmón',
    description: 'Roll pequeño y frito relleno de salmón fresco.',
    price: 2500,
    category: 'hard-rolls',
    image: '/src/assets/img/categories/hard-rolls.webp',
  },

  // =============================================
  // Al Plato (5 productos)
  // =============================================
  {
    id: 'camaron-furay',
    name: 'Camarón Furay 6 unidades',
    description: '6 camarones fritos en panko, crujientes y dorados.',
    price: 3500,
    category: 'al-plato',
    image: '/src/assets/img/categories/al-plato.webp',
  },
  {
    id: 'pollo-crispy',
    name: 'Pollo Crispy 6 cortes',
    description: '6 cortes de pollo crispy, crujientes por fuera y jugosos por dentro.',
    price: 3500,
    category: 'al-plato',
    image: '/src/assets/img/categories/al-plato.webp',
  },
  {
    id: 'reineta-crispy',
    name: 'Reineta Crispy 6 cortes',
    description: '6 cortes de reineta empanizada, liviana y crujiente.',
    price: 4000,
    category: 'al-plato',
    image: '/src/assets/img/categories/al-plato.webp',
  },
  {
    id: 'salmon-crispy',
    name: 'Salmón Crispy 6 cortes',
    description: '6 cortes de salmón crispy, crocante por fuera y suave por dentro.',
    price: 5500,
    category: 'al-plato',
    image: '/src/assets/img/categories/al-plato.webp',
  },
  {
    id: 'gohan',
    name: 'Gohan',
    description: 'Arroz blanco con base de queso y palta.',
    price: 4500,
    category: 'al-plato',
    image: '/src/assets/img/categories/al-plato.webp',
  },

  // =============================================
  // Tabla Massaro (1 producto)
  // =============================================
  {
    id: 'tabla-massaro',
    name: 'Tabla Massaro',
    description: '5 Gyosas, 5 Calamar, 5 Camarón Furay, 5 Pollo Furay, 5 Reineta Furay — con variedad de salsas.',
    price: 13500,
    category: 'tabla-massaro',
    image: '/src/assets/img/categories/tabla-massaro.webp',
    badges: ['Recomendado'],
    pieces: 25,
  },

  // =============================================
  // Promos (10 promos)
  // =============================================
  {
    id: 'promo-1',
    name: 'Promo 1',
    description: '1 Roll Palta Camarón + 1 Porción Gyosas (5 uds) + 3 salsas',
    price: 6500,
    category: 'promos',
    image: '/src/assets/img/categories/promos.webp',
    pieces: 13,
  },
  {
    id: 'promo-2',
    name: 'Promo 2',
    description: '1 Roll Palta Pollo + 1 Tempura Kanikama + 3 salsas',
    price: 7500,
    category: 'promos',
    image: '/src/assets/img/categories/promos.webp',
    pieces: 16,
  },
  {
    id: 'promo-3',
    name: 'Promo 3',
    description: '1 Roll Palta Camarón + 1 Roll Sésamo Kanikama + 1 Roll Tempura Pollo (base queso, cebollín) + 3 salsas',
    price: 9500,
    category: 'promos',
    image: '/src/assets/img/categories/promos.webp',
    pieces: 24,
  },
  {
    id: 'promo-4',
    name: 'Promo 4 / Tono Frío',
    description: '1 Roll Palta Salmón + 1 Roll Salmón Camarón + 1 Roll Queso Pollo + 1 Roll Sésamo Vegetal + 1 Roll Ciboullete Kanikama + 4 salsas',
    price: 15000,
    category: 'promos',
    image: '/src/assets/img/categories/promos.webp',
    pieces: 40,
  },
  {
    id: 'promo-5',
    name: 'Promo 5',
    description: '1 Roll Palta Camarón + 1 Roll Palta Sésamo + 1 Roll Tempura Pollo + 1 Roll Tempura Kanikama + 4 salsas',
    price: 12000,
    category: 'promos',
    image: '/src/assets/img/categories/promos.webp',
    pieces: 32,
  },
  {
    id: 'promo-6',
    name: 'Promo 6',
    description: '1 Tempura Pollo + 1 Tempura Kanikama + 1 Tempura Camarón + 1 Tempura Vegetal + 4 salsas',
    price: 12500,
    category: 'promos',
    image: '/src/assets/img/categories/promos.webp',
    pieces: 32,
  },
  {
    id: 'promo-7',
    name: 'Promo 7',
    description: '1 Roll Palta Pollo + 1 Roll Kanikama (camarón palta) + 1 Roll Sésamo Vegetal + 1 Roll Tempura Pollo + 1 Roll Tempura Kamikaze + 4 salsas',
    price: 15000,
    category: 'promos',
    image: '/src/assets/img/categories/promos.webp',
    pieces: 40,
  },
  {
    id: 'promo-8',
    name: 'Promo 8',
    description: '1 Roll Palta Salmón + 1 Roll Salmón Camarón + 1 Roll Queso Pollo + 1 Roll Sésamo Vegetal + 1 Tempura Pollo + 1 Tempura Camarón + 1 Tempura Kanikama + 5 salsas',
    price: 19000,
    category: 'promos',
    image: '/src/assets/img/categories/promos.webp',
    pieces: 56,
  },
  {
    id: 'promo-premium',
    name: 'Promo Premium',
    description: '1 Futomaki Crispy + 1 Roll Queso (camarón furay) + 1 Roll Palta (salmón) + 1 Roll Palta (camarón) + 1 Roll Salmón (camarón) + 1 Roll Masago Reineta Furay + 1 Roll Ciboullete (champiñón) + 1 Hosamaki Queso + 5 Gyosas + 5 salsas',
    price: 25000,
    category: 'promos',
    image: '/src/assets/img/categories/promos.webp',
    badges: ['Premium'],
    pieces: 63,
  },
  {
    id: 'promo-9',
    name: 'Promo 9',
    description: '1 Roll Palta Pollo + 1 Roll Salmón Camarón + 1 Roll Queso Kanikama + 1 Roll Sésamo Vegetal + 1 Tempura Pollo + 1 Tempura Salmón + 1 Tempura Camarón + 1 Tempura Vegetal + 5 salsas',
    price: 24000,
    category: 'promos',
    image: '/src/assets/img/categories/promos.webp',
    pieces: 72,
  },

  // =============================================
  // Adicionales (3 productos)
  // =============================================
  {
    id: 'salsas-extras',
    name: 'Salsas extras',
    description: 'Porción adicional de salsa clásica Massaro.',
    price: 500,
    category: 'adicionales',
    image: '/src/assets/img/categories/adicionales.webp',
  },
  {
    id: 'cambio-de-relleeno',
    name: 'Cambio de relleno',
    description: 'Personaliza tu roll cambiando el relleno estándar.',
    price: 1000,
    category: 'adicionales',
    image: '/src/assets/img/categories/adicionales.webp',
  },
  {
    id: 'despacho',
    name: 'Despacho dentro de Quilicura',
    description: 'Delivery directo a tu hogar en Quilicura.',
    price: 2000,
    category: 'adicionales',
    image: '/src/assets/img/categories/adicionales.webp',
  },
];

export function getProductsByCategory(categoryId) {
  if (!categoryId) return products;
  return products.filter(p => p.category === categoryId);
}

export function getCategoryName(categoryId) {
  const cat = categories.find(c => c.id === categoryId);
  return cat ? cat.name : '';
}

export function formatPrice(price) {
  return `$${price.toLocaleString('es-CL')}`;
}
