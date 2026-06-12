# Task Plan

- [ ] **Configuración de Harness Engineering**
  - [x] Crear script `init.sh`
    - [x] Validar versión mínima de Node.js (>= 20.x).
    - [x] Validar existencia de NPM (o gestor de paquetes).
    - [x] Validar existencia de dependencias locales (`node_modules`), instando a correr `npm install` si falta.
    - [x] Validar estructura base (presencia de `package.json` y `vite.config.js`).
    - [x] Validar archivos core de Harness Engineering (`agents.md`, `memory.md`, `task.md`, `README.md`, `specs.md`).
    - [x] Validar arquitectura de carpetas Frontend (`src/assets/img`, `src/assets/icon`, `src/sass`).
    - [x] Validar punto de entrada de estilos (`src/sass/app.scss`).
- [ ] **Definición de Infraestructura (Runbook)**
  - [x] Crear documento `infrastructure.md` con contrato de contenedores, puertos y variables de entorno.
- [ ] **Desarrollo Frontend MVP**
  - [x] Inicializar base de estilos Sass según patrón 7-1 (Completado: Variables, Mixins, Reset, Tipografía y Temas Oscuro/Claro).
- [x] Configurar layout base y componentes UI genéricos (Header, Footer, Grid, Botones con micro-animaciones).
- [x] Construir catálogo visual de productos (Grid responsivo de tarjetas).
- [x] Implementar Responsive Design (CSS Grid fluido y Menú Hamburguesa).

---

## 🎨 Iteración Visual — Alineación a Identidad de Marca

> Objetivo: Alinear el diseño del sitio a la estética de la carta oficial de Massaro Sushi.
> Referencias: `template/productos1.jpg`, `template/productos2.jpg`, `template/logo_massaro.jpg`

### Paso 1 — Atmósfera y Fondo (Alto impacto)
- [x] Copiar imagen `bg-bamboo.png` a `src/assets/img/` ✅ (Hecho)
- [x] Aplicar fondo de bosque de bambú oscuro al `body` via CSS (con overlay semi-transparente)
- [x] Ajustar colores base del tema oscuro para reflejar los tonos verde-oscuro de la carta

### Paso 2 — Tipografía e Identidad Visual (Alto impacto)
- [x] Añadir fuente `Bebas Neue` (Google Fonts) para los encabezados de la marca
- [x] Reemplazar texto "MASSAROSUSHI" del header por el logo real (`logo_massaro.jpg`)
- [x] Aplicar nueva tipografía a títulos de secciones con efecto de borde/sombra

### Paso 3 — Cards Rediseñadas con Imágenes Reales (Alto impacto)
- [x] Usar las 4 imágenes premium generadas por IA (avocado-roll, ebi-tempura, furay-roll, sashimi-salmon)
- [x] Rediseñar el componente `.card` con glassmorphism oscuro (fondo translúcido)
- [x] Estilo del precio: chip amarillo sobre fondo oscuro (estilo carta Massaro)
- [x] Aumentar el tamaño de la imagen en la tarjeta para mayor impacto visual

### Paso 4 — Sección Hero (Nuevo)
- [x] Crear sección Hero sobre el catálogo con el logo grande y un CTA llamativo
- [x] Aplicar texto con sombra dramática sobre el fondo de bambú

### Assets generados
- [x] `src/assets/img/avocado-roll.webp` — Placeholder premium IA (convertido a WebP, -86%)
- [x] `src/assets/img/ebi-tempura.webp` — Placeholder premium IA (convertido a WebP, -88%)
- [x] `src/assets/img/furay-roll.webp` — Placeholder premium IA (convertido a WebP, -84%)
- [x] `src/assets/img/sashimi-salmon.webp` — Placeholder premium IA (convertido a WebP, -87%)
- [x] `src/assets/img/bg-bamboo.webp` — Fondo bosque bambú oscuro IA (convertido a WebP, -86%)
- [x] `src/assets/img/logo_massaro.jpg` — Logo oficial desde `template/`

### Optimización de Performance
- [x] Convertir imágenes PNG a WebP con `sharp-cli` (calidad 82) — Peso total: 3.73 MB → 519 kB (-86%)
- [x] Actualizar referencias en `index.html` y `_reset.scss`
- [x] Validar build de producción tras conversión (`npm run build` ✅)

---

## 🍱 Opción A — Carta Real Completa en el Frontend

> **Objetivo**: Reemplazar los 4 productos de ejemplo por la carta oficial completa de Massaro Sushi,
> estructurada por categorías, con imágenes IA por tipo de producto y un sistema de filtrado por tabs.
> Fuente de datos: sección "Catálogo de productos" en `specs.md`.

---

### Paso 1 — Datos del Menú en JavaScript

> Estrategia: crear un archivo de datos JS estático que replique la estructura que luego vendrá
> desde la API. Esto permite que la transición de "datos estáticos → API" sea solo un cambio de source.

- [x] Crear `src/data/menu.js` con la carta completa estructurada por categorías:
  - [x] **Rolls a la carta** (7 productos × precio base + variantes de relleno)
  - [x] **Especiales** (9 productos con precio fijo)
  - [x] **Hard Rolls** (5 variantes con precio)
  - [x] **Al plato** (5 productos)
  - [x] **Tabla Massaro** (1 producto con detalle de contenido)
  - [x] **Promos** (10 promos: piezas, contenido y precio)
  - [x] **Adicionales** (3 ítems: salsas, cambio relleno, despacho)
- [x] Cada producto debe incluir: `id`, `name`, `description`, `price`, `category`, `image`, `badges` (ej. "Nuevo", "Popular")

---

### Paso 2 — Imágenes IA por Categoría

> Estrategia: generar una imagen representativa por cada **tipo visual** de producto,
> no por cada producto individual (7 imágenes para ~40 productos).

- [x] Generar y optimizar a WebP imagen para **Rolls a la carta** (roll envuelto en salmón, clásico)
- [x] Generar y optimizar a WebP imagen para **Especiales** (sashimi/ceviche mixto)
- [x] Generar y optimizar a WebP imagen para **Hard Rolls** (roll pequeño frito)
- [x] Generar y optimizar a WebP imagen para **Al Plato** (camarón furay presentación plato)
- [x] Generar y optimizar a WebP imagen para **Tabla Massaro** (variedad de rolls en tabla)
- [x] Generar y optimizar a WebP imagen para **Promos** (conjunto de rolls variados, vista superior)
- [x] Generar y optimizar a WebP imagen para **Adicionales** (bowl de salsas)
- [x] Copiar todas las imágenes a `src/assets/img/categories/`

---

### Paso 3 — Componente de Tabs/Filtros por Categoría

> Permitirá al usuario filtrar el catálogo por categoría sin recargar la página.

- [x] Crear `src/sass/components/_tabs.scss` con estilos de los botones de filtro
  - [x] Estilo activo del tab con borde rojo inferior y color amarillo
  - [x] Scroll horizontal en móvil para los tabs (overflow-x: auto, scrollbar oculta)
  - [x] Micro-animación de transición al cambiar de categoría (fade)
- [x] Agregar HTML de los tabs en `index.html` (una sección `.catalog__tabs`)
- [x] Crear `src/js/catalog.js` con la lógica de filtrado:
  - [x] Renderizar tarjetas desde `menu.js` al cargar la página
  - [x] Filtrar y re-renderizar al hacer click en un tab
  - [x] Mantener el tab activo seleccionado visualmente
- [x] Importar `catalog.js` desde `main.js`

---

### Paso 4 — Tarjeta de Producto Enriquecida

> Adaptar el componente `.card` para soportar la complejidad real de la carta.

- [x] Agregar soporte para **badge de categoría** en la tarjeta (chip pequeño en la esquina de la imagen)
- [x] Agregar soporte para **variantes de relleno** (en Rolls a la carta): mostrar selector o texto descriptivo
- [x] Agregar soporte para **badge de piezas** en Promos (ej. "63 piezas" en esquina superior)
- [x] Actualizar `_cards.scss` para los nuevos elementos

---

### Paso 5 — Sección Especial de Promos

> Las Promos merecen un diseño propio dado su complejidad (10 promos, detalle de contenido y precio).

- [x] Crear subsección `.catalog__promos` con diseño de lista ampliada (no cards compactas)
- [x] Mostrar: nombre promo, cantidad de piezas, contenido descriptivo y precio destacado
- [x] Diseño inspirado en la carta (precio en chip grande amarillo, badge de piezas en rojo)
- [x] Agregar estilos en `_catalog.scss`

---

### Paso 6 — Footer con Información del Negocio

> Completar el footer vacío con datos reales del negocio (extraídos de `specs.md`).

- [x] Crear `src/sass/layout/_footer.scss`
- [x] Agregar en el HTML del footer:
  - [x] Logo y nombre del negocio
  - [x] Zona de reparto: "Quilicura — Despacho $2.000"
  - [x] Iconos de contacto: WhatsApp `+56 9 7237 7458`, Facebook `/MassaroQuilicura`, Instagram `@massaro_sushi`
  - [x] Copyright `© 2026 Massaro Sushi`
- [x] Importar `_footer.scss` en `app.scss`

---

### Paso 7 — Validación Final

- [x] Ejecutar `./init.sh` → todos los checks deben pasar
- [x] Ejecutar `npm run build` → build sin errores
- [ ] Revisión visual en móvil (iPhone XR viewport): tabs, cards y promos correctas
- [ ] Revisión visual en desktop: grid de 3-4 columnas correcto
- [x] Validar que todos los assets WebP cargan sin error 404

---

## 🔧 Iteración de Corrección Visual — Post-Evaluación

> **Contexto**: Evaluación visual del sitio detectó 4 deviaciones críticas respecto al plan aprobado.
> Estas correcciones deben ejecutarse en orden antes de avanzar a la Opción B (Infraestructura).

---

### Corrección 1 — Imágenes Premium por Categoría (Crítico)

> **Problema**: Las imágenes de los productos en las cards son placeholders SVG básicos
> con texto "Rolls Massaro Sushi" sobre fondo negro. Las imágenes hiperrealistas generadas
> con IA en pasos anteriores no se asociaron a las categorías del nuevo catálogo.

- [x] Generar con IA imagen hiperrealista para categoría **Rolls a la Carta** (roll en salmón, vista cenital)
- [x] Generar con IA imagen hiperrealista para categoría **Especiales** (sashimi + ceviche en plato oscuro)
- [x] Generar con IA imagen hiperrealista para categoría **Hard Rolls** (rolls fritos pequeños panko)
- [x] Generar con IA imagen hiperrealista para categoría **Al Plato** (camarón furay frito, 6 uds, plato oscuro)
- [x] Generar con IA imagen hiperrealista para categoría **Tabla Massaro** (tabla de madera con variedad de rolls)
- [x] Generar con IA imagen hiperrealista para categoría **Promos** (conjunto premium de rolls variados, vista aérea)
- [x] Generar con IA imagen hiperrealista para categoría **Adicionales** (bowl con salsas variadas)
- [x] Convertir todas a WebP (calidad 82) y guardar en `src/assets/img/categories/`
- [x] Actualizar rutas en `src/data/menu.js` para que cada categoría apunte al `.webp` correcto
- [x] Limpiar SVGs placeholder antiguos del directorio `categories/`

---

### Corrección 2 — Estilo de Tabs (UX/UI)

> **Problema**: El tab activo se muestra como botón rojo sólido (píldora completa), compitiendo
> visualmente con el botón "Agregar". El plan especificaba borde inferior rojo + texto amarillo.

- [x] Modificar `src/sass/components/_tabs.scss`:
  - [x] Tab inactivo: fondo transparente, borde sutil, texto blanco/gris
  - [x] Tab activo: **borde inferior rojo** (3-4px), texto en color amarillo (`--color-secondary`), sin fondo rojo sólido
  - [x] Hover: ligero fondo semi-transparente + texto amarillo
  - [x] Mantener scroll horizontal en móvil y micro-animación de transición

---

### Corrección 3 — Footer Completo con 3 Columnas

> **Problema**: El footer implementado es solo una barra con logo y texto. Falta toda la
> información de contacto, reparto y redes sociales definida en el plan.

- [x] Rediseñar el HTML del footer en `index.html` con estructura de 3 columnas:
  - [x] **Columna 1 — Delivery**: Zona Quilicura, despacho $2.000, horario de atención
  - [x] **Columna 2 — Contacto**: ícono WhatsApp + `+56 9 7237 7458`, email (si aplica)
  - [x] **Columna 3 — Redes Sociales**: Facebook `/MassaroQuilicura`, Instagram `@massaro_sushi`
- [x] Actualizar `src/sass/layout/_footer.scss`:
  - [x] Grid de 3 columnas en desktop, stack vertical en móvil
  - [x] Logo + nombre del negocio centrado sobre las columnas (top del footer)
  - [x] Separador superior fino con color de marca
  - [x] Copyright al fondo: `© 2026 Massaro Sushi — Todos los derechos reservados`

---

### Corrección 4 — Hero: Text-Shadow Dramático

> **Problema**: El título "SUSHI ARTESANAL" tiene una sombra oscura convencional.
> El plan especificaba `text-shadow` rojo para alinearse con la estética de la carta.

- [x] Actualizar `src/sass/pages/_hero.scss`: cambiar `text-shadow` del `.hero__title`
  a `text-shadow: 0 0 30px rgba(220, 38, 38, 0.8), 2px 2px 0 #7f1d1d`
- [x] Verificar visualmente que el efecto se lee bien sobre el fondo de bambú oscuro

---

### Corrección 5 — Espaciado Inferior del Catálogo (Nuevo)

> **Problema**: Las tarjetas del catálogo (en especial la sección Promos) quedan pegadas visualmente a la parte superior del pie de página (Footer), generando un corte brusco sin respiro visual.

- [x] Modificar `src/sass/pages/_catalog.scss`:
  - [x] Añadir `padding-bottom: var(--spacing-3xl);` o similar a la clase `.catalog` (o `margin-bottom`) para separar el final del grid del inicio del footer.
- [x] Ejecutar el cambio, validar y compilar.

---

### Corrección 6 — Espaciado Interno del Footer (Variables)

> **Problema**: El logotipo del footer y el texto del copyright quedan pegados a los bordes superior e inferior de la pantalla. Esto se debe a que la variable `var(--spacing-2xl)` usada en el padding del footer (`src/sass/layout/_footer.scss`) nunca fue mapeada a CSS en el archivo base `:root`, resultando en un padding de `0px`.

- [x] Modificar `src/sass/themes/_light.scss` (donde reside el `:root` global):
  - [x] Añadir la asignación faltante `--spacing-2xl: #{var.$spacing-2xl};` para que el espaciado surta efecto.
- [x] Modificar `src/sass/layout/_footer.scss`:
  - [x] Ajustar el padding a `var(--spacing-xl)` (2rem) para un respiro más equilibrado.
- [x] Ejecutar el cambio, compilar y validar que el footer tiene su padding correcto de `2rem` (32px) arriba y abajo.

---

### Corrección 7 — Altura Deformada de Cards en el Catálogo

> **Problema**: Al ver la pestaña "Todo", las tarjetas regulares (como Adicionales y Despacho) que quedan en la misma "fila" que el contenedor de Promociones (`.catalog__promos`) se estiran verticalmente de forma extrema. Esto ocurre porque el Grid de CSS iguala las alturas de todos los elementos en la misma fila, y el contenedor de promos es muy alto.

- [x] Modificar `src/sass/pages/_catalog.scss`:
  - [x] Añadir `grid-column: 1 / -1;` a la clase `.catalog__promos` para forzar que ocupe una fila completa por sí solo, evitando que deforme las tarjetas vecinas.
- [x] Ejecutar el cambio, compilar y validar.

---

### Feature 1 — Botonera Flotante de Navegación Rápida (UX Móvil)

> **Objetivo**: Mejorar la experiencia de usuario al navegar en el catálogo, especialmente en móviles, donde llegar al footer implica mucho scroll para regresar al inicio o al menú.
> **Decisión de diseño**: Siempre visible mediante `position: fixed` (CSS puro, sin JavaScript). Se oculta en desktop (≥ 768px). Estilo glassmorphism oscuro coherente con la identidad visual del sitio.

#### Archivos a modificar:

- [x] **`index.html`** — Añadir HTML de la botonera justo antes del cierre del `.app-wrapper`:
  ```html
  <nav class="floating-nav" aria-label="Navegación rápida">
    <a href="#" class="floating-nav__btn">⬆ Inicio</a>
    <a href="#menu" class="floating-nav__btn">🍣 Menú</a>
  </nav>
  ```

- [x] **`src/sass/base/_reset.scss`** — Añadir `scroll-behavior: smooth;` al selector `html` para animación de scroll suave.

- [x] **`src/sass/components/_floating-nav.scss`** — Crear nuevo componente con los siguientes estilos:
  - [x] `position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%);`
  - [x] Fondo glassmorphism: `background: rgba(0, 0, 0, 0.6); backdrop-filter: blur(12px);`
  - [x] Forma de píldora: `border-radius: var(--radius-pill);`
  - [x] Borde sutil rojo: `border: 1px solid rgba(230, 0, 18, 0.4);`
  - [x] Botones con fuente `--font-heading`, color blanco en reposo, amarillo (`--color-secondary`) al hover
  - [x] `display: none;` por defecto en desktop (`@media min-width: 768px`)
  - [x] `display: flex;` en móvil (`@media max-width: 767px`)
  - [x] `z-index: 999;` para mantenerse sobre el contenido
  - [x] Micro-animación de entrada: `animation: fadeInUp 0.3s ease;`

- [x] **`src/sass/app.scss`** — Añadir `@use 'components/floating-nav';`

---

### Feature 2 — Mejora UX: Filtro de Categorías Móvil (Dropdown Nativo)

> **Objetivo**: Mejorar la accesibilidad y usabilidad del filtrado de categorías en dispositivos móviles para usuarios no técnicos o de edad avanzada, eliminando el scroll horizontal oculto.
> **Decisión de diseño**: Mantener los "Tabs" horizontales en Desktop. En Móvil (≤ 767px), ocultar los Tabs y mostrar un `<select>` nativo estilizado como un botón premium ("Categoría: Todo ▼").

#### Archivos a modificar:

- [x] **`index.html`**:
  - [x] Añadir la estructura HTML del select dentro del `<header class="catalog__header">`, junto a los tabs:
    ```html
    <div class="catalog__filter-mobile">
      <label for="category-select" class="sr-only">Filtrar por categoría</label>
      <select id="category-select" class="catalog__select"></select>
    </div>
    ```

- [x] **`src/sass/components/_tabs.scss`**:
  - [x] Ocultar `.catalog__tabs` en vista móvil (`@media (max-width: 767px) { display: none; }`).
  - [x] Crear la clase `.catalog__filter-mobile` (oculta en desktop, visible en móvil).
  - [x] Dar estilos premium a `.catalog__select`: apariencia de botón oscuro, bordes redondeados, texto blanco, icono de flecha personalizado o nativo limpio.

- [x] **`src/data/menu.js`**:
  - [x] Reordenar el array `categories` para que la categoría "Promos" sea el primer elemento de la lista. Esto asegurará que, al generar los filtros, aparezca inmediatamente después de "Todo".

- [x] **`src/js/catalog.js`**:
  - [x] En la función `renderTabs()`, popular dinámicamente las opciones del `<select id="category-select">`. Añadir primero la opción estática `<option value="">Categoría: Todo</option>` como valor por defecto, y luego iterar sobre el array `categories`.
  - [x] Añadir un event listener `change` al selector para que al elegir una opción, llame a `renderCatalog()` filtrando la cuadrícula.
  - [x] Sincronizar el `<select>` con los clicks de los Tabs (si el usuario redimensiona la pantalla).

---

### Validación Post-Correcciones

- [x] `npm run build` → sin errores
- [x] Revisión visual desktop: imágenes cargando, tabs con borde inferior, footer 3 columnas, botonera flotante OCULTA
- [x] Revisión visual móvil (375px): botonera visible en parte inferior, clic "Inicio" sube con scroll suave, clic "Menú" baja al catálogo con scroll suave
- [x] Revisión UX móvil: filtro select visible (tabs ocultos), al cambiar categoría los productos se filtran correctamente

---

### Fase 1: Infraestructura y Despliegue (Hostinger VPS + EasyPanel)

> **Objetivo**: Llevar el proyecto Vite de entorno local a entorno de producción alojado en Hostinger VPS, orquestado por EasyPanel, tal como dicta el Runbook (`infrastructure.md`).

- [x] **1. Definición y Configuración de DNS**
  - [x] Obtener la IP pública del servidor VPS de Hostinger (`89.117.32.46`).
  - [x] Crear los registros DNS (`massaro`, `api.massaro`, `admin.massaro`, `status.massaro`) tipo A apuntando al VPS en la zona de `cystec.cloud` mediante la API de Hostinger.
- [x] **2. Build de Producción (Frontend)**
  - [x] Ejecutar `npm run build`.
  - [x] Validar generación de carpeta `/dist` (Vite, Sass, optimización de imágenes).
- [x] **3. Configuración en EasyPanel**
  - [x] Crear el servicio `frontend` tipo App en el proyecto EasyPanel.
  - [x] Configurar el dominio `massaro.cystec.cloud` resolviendo bug de tRPC interno.
- [x] **4. Despliegue de Código a EasyPanel**
  - [x] Crear `Dockerfile` multi-stage y `nginx.conf` en el repositorio para servir la SPA.
  - [x] Configurar pipeline automatizado desde GitHub (GitOps).

---

### Fase 1.5: Identidad de Pestaña (Favicon)

> **Objetivo**: Extraer un ícono del logotipo oficial de Massaro Sushi y configurarlo como Favicon en múltiples formatos para asegurar máxima compatibilidad en navegadores y dispositivos móviles.

- [x] **1. Procesamiento de Imagen Base**
  - [x] Usar `sharp-cli` para extraer una región cuadrada del logo oficial (`src/assets/img/logo_massaro.jpg`).
- [x] **2. Generación de Formatos**
  - [x] Generar `favicon-32x32.png` (32x32) para fallback escritorio.
  - [x] Generar `favicon.png` (192x192) para dispositivos Android / Chrome.
  - [x] Generar `apple-touch-icon.png` (180x180) para marcadores en iOS.
  - [x] Guardar todos los assets en el directorio `/public/` del proyecto.
- [x] **3. Actualización de HTML**
  - [x] Modificar el `<head>` de `index.html` para remover el ícono genérico de Vite.
  - [x] Añadir las etiquetas `<link>` correspondientes a los 3 nuevos formatos.
- [x] **4. Limpieza y Validación**
  - [x] Borrar los archivos `public/favicon.svg` y `public/icons.svg` residuales de Vite.
  - [x] Ejecutar `npm run build` → build sin errores (716ms).
