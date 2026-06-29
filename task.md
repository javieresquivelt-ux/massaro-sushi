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
- [x] Revisión visual en móvil (iPhone XR viewport): tabs, cards y promos correctas
- [x] Revisión visual en desktop: grid de 3-4 columnas correcto
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

---

## 🛒 Fase 2: Interactividad, Carrito y Pedidos (MVP Funcional)

> **Objetivo**: Dotar a la página de la lógica necesaria para que los clientes puedan armar su pedido y enviarlo directamente al WhatsApp del local, minimizando la fricción y sin necesidad de un backend complejo en esta etapa inicial.

### Paso 1 — Lógica de Estado (Carrito)
- [x] Definir estructura de datos para el carrito (ítems, cantidades, opciones de relleno, subtotal).
- [x] Implementar funciones puras en JS para agregar, eliminar y modificar cantidades de productos.
- [x] Sincronizar el estado del carrito con `localStorage` para no perder el pedido al recargar la página.
- [x] Integrar botón "Agregar" con event delegation en `catalog.js`.
- [x] Emitir Custom Event `cart:updated` para comunicación desacoplada entre módulos.

### Paso 2 — Interfaz de Usuario (UI) del Carrito
- [x] Crear componente visual de "Carrito Lateral" (Drawer/Sidebar) deslizable.
- [x] Actualizar dinámicamente un contador de ítems numérico en el ícono del Header.
- [x] Diseñar las tarjetas de producto dentro del carrito (miniatura, título, variante elegida, +/- cantidad, precio total).

### Paso 2.5 — Refactorización UX: Adicionales y Costos Operativos
- [x] Eliminar la categoría "Adicionales" del catálogo visible y de los tabs de filtrado (`menu.js`).
- [x] Convertir "Cambio de relleno" en un modificador con recargo (+$1.000) dentro del flujo de selección de variantes. *(Implementado en Paso 4.11)*
- [x] Implementar "Salsas extras" como una sección de *upsell* (¿Algo más para tu pedido?) en el drawer del carrito antes del checkout. *(Implementado en Paso 4.11)*
- [x] Incorporar el "Despacho dentro de Quilicura" ($2.000) como una línea fija y automática en el resumen del pedido (subtotal + delivery = total). *(Ya implementado en cart.js y cart-ui.js)*

### Paso 3 — Flujo de Selección de Variantes
- [x] Crear modal de configuración para productos como los "Rolls a la carta", donde se debe elegir obligatoriamente el tipo de relleno antes de agregarlo al carro.
- [x] Gestionar validaciones visuales de campos requeridos en la UI.

### Paso 4 — Checkout y Envío a WhatsApp
- [x] Crear sección de "Checkout" solicitando: Nombre del cliente, Dirección de despacho (Quilicura) y Notas (ej. "sin palillos").
- [x] Calcular sumatoria final incluyendo automáticamente el ítem "Despacho ($2.000)".
- [x] Construir un formateador de strings que convierta el pedido en un texto ordenado para WhatsApp.
- [x] Programar el botón final para redirigir a `wa.me/56972377458?text=...` con el mensaje codificado en la URL.

### Paso 4.5 — Mejora UX: Retiro en Local vs Delivery

> **Objetivo**: Permitir al cliente elegir entre Delivery ($2.000) y Retiro en Local ($0) durante el checkout.
> **Decisiones acordadas**: Modo en `cart.js` (estado centralizado), no persiste en localStorage (siempre empieza en Delivery), drawer sincronizado via `cart:updated`.

#### Archivos a modificar:

- [x] **`src/js/cart.js`** — Agregar:
  - Variable `let deliveryMode = 'delivery'` (default)
  - Exportar `setDeliveryMode(mode)` — cambia modo y emite `cart:updated`
  - Exportar `getDeliveryMode()` — retorna modo actual
  - Modificar `getTotal()`: si `deliveryMode === 'pickup'`, retorna solo subtotal (sin `deliveryFee`)

- [x] **`index.html`** — Añadir contenedor para el segmented control en la sección checkout.
  - Añadida clase `checkout__field--address` al campo dirección para ocultarlo dinámicamente.
  - Añadida clase `checkout__summary-line--delivery` a la línea de despacho para ocultarla en Retiro.

- [x] **`src/sass/components/_checkout.scss`** — Agregar estilos para `.checkout__delivery-mode` y `.delivery-mode-btn` (dos botones lado a lado, estilo píldora, activo rojo con texto amarillo, inactivo oscuro translúcido).

- [x] **`src/js/checkout.js`** — Modificar:
  - `initDeliveryModeButtons()`: sincroniza botón activo, escucha clicks, llama a `setDeliveryMode()`
  - `toggleAddressField(mode)`: oculta campo dirección si `pickup`
  - `renderCheckoutSummary()`: oculta línea de despacho si `pickup`
  - `sendWhatsApp()`: solo valida dirección si `delivery`
  - `buildWhatsAppMessage()`: incluye `🛵 Delivery + dirección` o `🏪 Retiro en Local` según el modo

#### Flujo de datos:
```
checkout.js → setDeliveryMode('pickup')
            → cart.js: deliveryMode cambia
            → notifyCartChange() → cart:updated
            → cart-ui.js: updateBadge() + renderCartItems() (si drawer abierto, se sincroniza solo)
            → checkout.js: recalcula resumen + oculta dirección
```

#### Mensaje WhatsApp (nuevo formato):
- Delivery: `🛵 Delivery\n📍 Dirección: Los Olivos 123`
- Retiro: `🏪 Retiro en Local`

### Paso 4.6 — Mejora UX: Postergación del Costo de Despacho al Checkout
- [x] Eliminar la línea estática de "Despacho Quilicura" del `<div class="cart-drawer__summary">` en `index.html`.
- [x] Modificar `cart-ui.js` para que deje de inyectar `getTotal()` en el drawer y dependa exclusivamente de `getSubtotal()`.
- [x] Añadir una nota aclaratoria debajo del subtotal en el drawer que indique "Los costos de envío se calcularán en el checkout".

### Paso 4.7 — Mejora UX: Microcopy LatAm
- [x] Reemplazar el texto "Ir al Checkout" por "Continuar pedido" en el botón del carrito.
- [x] Reemplazar el texto "se calcularán en el checkout" por "se calcularán en el siguiente paso".

### Paso 4.8 — Mejora UX: Eliminación de Navegación Flotante
- [x] Eliminar el bloque `<nav class="floating-nav">` de `index.html`.
- [x] Eliminar la importación `@use 'components/floating-nav';` en `app.scss`.
- [x] Eliminar el archivo `src/sass/components/_floating-nav.scss`.

### Paso 4.9 — Mejora UX: Auto-cierre de Menú Hamburguesa
- [x] Modificar `main.js` para que el menú móvil (`.is-open`) se cierre automáticamente cuando el usuario haga click en cualquier enlace (ej. "Pedir Ahora").

### Paso 4.10 — Consolidación de Skills IA y Specs
- [x] Actualizar `agent/skill-07-responsive-design.md` con lecciones sobre UX Móvil (One-Page auto-cierre, redundancia de botonera, bugs de `overflow-x` y `sticky`).
- [x] Actualizar `agent/skill-11-design-tokens.md` con reglas de Microcopy para LatAm.
- [x] Actualizar `specs.md` para reflejar en el estado actual que se incluyeron optimizaciones UX Móvil.

### Paso 4.11 — Extras y Modificadores (Paso 2.5 final)

> **Nota**: El Paso 4.11 fue reemplazado por el Paso 4.11.10 tras una revisión de UX basada en el mercado real (Papa Johns, Domino's, PedidosYa). El diseño de "modificadores estructurados con checkbox" se descartó en favor de un flujo más flexible: texto libre para personalización + selector de salsas con cantidad. Ver detalle en Paso 4.11.10.

### Paso 4.11.10 — Refactor UX: Personalización, Salsas y Teléfono

> **Diseño validado contra Papa Johns, Domino's, PedidosYa y Justo (mercado LatAm)**.
> Filosofía: modal solo para variants obligatorias (Rolls a la Carta), personalización como texto libre en el carrito, salsas como selector con cantidad en el drawer, teléfono obligatorio en checkout.

#### Plan de implementación ejecutado:

- [x] **4.11.10.1 — `catalog.js`**: Revertido `handleAddToCart()` a la bifurcación original. Products con `variants` → abren modal. Products sin `variants` → `addToCart()` directo. Restaurado `import { addToCart }`.
- [x] **4.11.10.2 — `modal.js`**: Revertido a versión solo-variants. Eliminada toda la lógica de modifiers/checkbox. Solo renderiza radio buttons de relleno.
- [x] **4.11.10.3 — `cart.js`**: Limpiado código legacy (`arraysMatch()`, `getItemEffectivePrice()`). Restaurado `addToCart(product, variantName)`. Nuevo estado: `state.salsas[]` y `state.customizationNote`. Nuevas funciones: `addSalsa()`, `removeSalsa()`, `getSalsas()`, `getSalsaTotal()`, `setCustomizationNote()`, `getCustomizationNote()`. `getTotal()` suma: subtotal + salsas + deliveryFee + (customizationNote ? $1.000 : 0). Todo persiste en localStorage.
- [x] **4.11.10.4 — `menu.js`**: Reemplazado array `modifiers` por `salsaOptions` con 2 salsas base: Salsa de Soya ($500) y Salsa Agridulce ($500). Array extensible: el dueño puede agregar más salsas añadiendo objetos al array.
- [x] **4.11.10.5 — `cart-ui.js`**: Nuevo selector de salsas en el drawer (sección "🥫 Agregar salsas") con controles −/cantidad/+ por cada salsa. Botón "📝 Personalizar pedido (+$1.000)" que abre modal con textarea. Badge "📝 Personalizado" si hay nota activa. Eliminado listener legacy de `upsell-salsas-btn`.
- [x] **4.11.10.6 — `index.html`**: Nuevo modal de personalización con textarea y placeholder. Nuevos contenedores `#cart-salsas` y `#cart-customization` en el drawer. Nuevo campo 📱 Teléfono en checkout (después del nombre). Eliminado bloque legacy `upsell-salsas-btn`.
- [x] **4.11.10.7 — `_cart-drawer.scss`**: Nuevos estilos para `.cart-drawer__salsas-header`, `.cart-drawer__salsa-item`, `.cart-drawer__salsa-qty`, `.cart-drawer__salsa-price`, `.cart-drawer__customization`, `.cart-drawer__custom-badge`, `.cart-drawer__custom-note`.
- [x] **4.11.10.8 — `checkout.js`**: Validación de teléfono obligatorio. Mensaje WhatsApp incluye salsas ("🥫 Salsas: • 2x Salsa de Soya — $1.000"), personalización ("📝 Pedido personalizado: sin nori, ..."), y teléfono ("📞 +56 9 XXXX XXXX"). Resumen del checkout muestra salsas en la lista de items.
- [x] **4.11.10.9 — Limpieza legacy**: Verificadas 0 referencias a `modifiers` en `src/js/`. Eliminado intento de `.remove()` de `upsell-salsas-btn` en `cart-ui.js`.
- [x] **4.11.10.10 — `npm run build` + `./init.sh`**: Build exitoso (534ms, JS 6.70 kB gzip, CSS 5.05 kB gzip). 39/39 checks OK.

### Paso 4.11.11 — Totalización en tiempo real del carrito

> **Validado contra Papa Johns, Domino's, PedidosYa**: El carrito lateral debe mostrar el total parcial (productos + salsas + personalización) en tiempo real, difiriendo solo el costo de envío al checkout.

#### Plan de implementación ejecutado:

- [x] **4.11.11.1 — `index.html`**: Reemplazado el summary del drawer. Nuevas líneas: "Subtotal productos" (fijo), "Salsas: $X.XXX" (oculta si en 0), "Personalización: $1.000" (oculta si sin nota), "Total parcial: $XX.XXX" (suma de todo excepto envío). La nota "Los costos de envío se calcularán en el siguiente paso" se mantiene.
- [x] **4.11.11.2 — `cart-ui.js`**: Nueva función `updateSummary()` que calcula y renderiza las líneas dinámicas. Se llama desde: `cart:updated`, `renderCartItems()`, y al abrir el drawer. Sincronizada con cambios de salsas y personalización vía el evento `cart:updated`.
- [x] **4.11.11.3 — `npm run build` + `./init.sh`**: Build exitoso (550ms, JS 6.84 kB gzip). 39/39 checks OK.

### Paso 4.11.12 — Checkout: Reflejar salsas y personalización

> **Bug reportado por el usuario**: En la ventana "Finalizar Pedido" no se refleja el detalle de salsas ni personalización seleccionados en el drawer, generando confusión y ensuciando la UX.
> **Diagnóstico**: El checkout sí renderizaba salsas en la lista de items, pero no tenía líneas separadas en el summary (Subtotal no incluía salsas), no mostraba personalización, y el salto entre Subtotal y Total confundía al usuario.

#### Plan de implementación ejecutado:

- [x] **4.11.12.1 — `index.html`**: Agregadas 2 nuevas líneas en `checkout__summary`: "Salsas: $X.XXX" (`#checkout-salsas-line`, oculta si en 0) y "Personalización: $1.000" (`#checkout-custom-line`, oculta si sin nota), entre Subtotal y Despacho.
- [x] **4.11.12.2 — `checkout.js`**: `renderCheckoutSummary()` actualizado para mostrar/ocultar `#checkout-salsas-line` y `#checkout-custom-line` según el estado. Además, ahora renderiza la nota de personalización como un item especial en la lista: `📝 [nota] +$1.000`.
- [x] **4.11.12.3 — `npm run build` + `./init.sh`**: Build exitoso (540ms, JS 6.95 kB gzip). 39/39 checks OK.

### Paso 6 — Actualización de `init.sh` (39 → 44 checks)

> **Objetivo**: Expandir el script de validación `init.sh` para cubrir los nuevos archivos y funciones exportadas de la Fase 2 completa (salsas, personalización, teléfono).
> **Razonamiento**: Los pasos 4.11.10, 4.11.11 y 4.11.12 introdujeron nuevas estructuras de datos clave (`salsaOptions` en menu.js), funciones exportadas (`addSalsa`, `setCustomizationNote` en cart.js) y elementos HTML (`customization-modal-overlay`, `checkout-phone`) que deben validarse.

- [x] **`init.sh`**: Añadidos 5 nuevos checks sobre los anteriores 39:
  - [x] `salsaOptions en menu.js` — verifica que el array de salsas existe.
  - [x] `addSalsa exportada en cart.js` — verifica la función de salsas.
  - [x] `setCustomizationNote exportada en cart.js` — verifica la función de personalización.
  - [x] `customization-modal en index.html` — verifica que el modal de personalización existe.
  - [x] `checkout-phone en index.html` — verifica que el campo teléfono existe.
- [x] **Validación**: `./init.sh` → 53/53 checks pasados, 0 fallos, 0 advertencias.

### Paso 7 — Actualización de `specs.md` e `infrastructure.md` (Post-Fase 2 completa)

> **Objetivo**: Sincronizar la documentación técnica con el estado real del proyecto tras los pasos 4.11.10-4.11.12 y la expansión de `init.sh` a 44 checks.
> **Diagnóstico**: Ambos documentos estaban desactualizados. Faltaban salsas, personalización, teléfono obligatorio, totalización en tiempo real en drawer y checkout.

- [x] **`specs.md`** — 6 actualizaciones:
  - [x] Estado de implementación con salsas, personalización, teléfono, totalización.
  - [x] `init.sh`: 39 → 44 checks.
  - [x] Responsabilidades frontend: selector salsas, personalización, totalización, teléfono, resumen checkout.
  - [x] Funcionalidades Fase 2: +4 items (selector salsas, personalización, teléfono, totalización).
  - [x] Fase 2 checklist: expandido de 8 a 12 items.
  - [x] Checklist de despliegue Fase 2: de 7 a 12 items.

- [x] **`infrastructure.md`** — 4 actualizaciones:
  - [x] Módulos JS descripción con salsas y personalización.
  - [x] Checks: 39 → 44, características expandidas.
  - [x] Checklist QA: 44 checks.
  - [x] Checklist funcional Fase 2: de 6 a 9 items detallados.

### Paso 9 — Actualización de `README.md`

> **Objetivo**: Sincronizar el README principal del proyecto con las nuevas capacidades desarrolladas en Fase 2 (carrito, salsas, personalización, checkout WhatsApp).
> **Diagnóstico**: README.md mencionaba "botonera flotante" (eliminada en Paso 4.8), no listaba los módulos JS de Fase 2, y no documentaba las secciones de Carrito ni Checkout.

- [x] **Objetivos**: Reemplazado "botonera flotante" por "Carrito lateral", "Salsas y personalización", "Checkout WhatsApp".
- [x] **Estructura**: Ampliado `src/js/` con los 5 módulos reales (`cart.js`, `cart-ui.js`, `modal.js`, `checkout.js`).
- [x] **Secciones**: Agregadas "Carrito lateral" y "Checkout" a la lista de secciones del sitio.

### Paso 8 — Actualización de Skills IA en `agent/` (Post-Fase 2 completa)

> **Objetivo**: Sincronizar `agent/README.md` con las nuevas capacidades de salsas, personalización, teléfono y totalización.
> **Diagnóstico**: El índice no mencionaba `salsaOptions` en Skill 04 ni las nuevas funciones exportadas en Skill 10.

- [x] **`agent/README.md`** — 7 actualizaciones:
  - [x] Fecha: 2026-06-14.
  - [x] Nueva fila en tabla: "Agregar/modificar salsas → Skill 04".
  - [x] Skill 04: documenta `salsaOptions` (array extensible).
  - [x] Skill 05: documenta `addSalsa`, `removeSalsa`, `setCustomizationNote`, selector salsas, personalización texto libre, teléfono, totalización.
  - [x] Skill 10: documenta `updateSummary()`, `getSalsaTotal()`, `setCustomizationNote()`.
  - [x] Skill 11: documenta estilos selector salsas, modal personalización, resumen checkout dinámico.
  - [x] Fase 2: "Carrito + Salsas + Personalización + Checkout WhatsApp + Delivery/Retiro".

### Paso 5 — Revisión de Deuda Técnica
- [x] Evaluar la mantenibilidad del código en Vanilla JS tras implementar esta lógica de estado.
  - Módulos: `cart.js` (~100 líneas), `cart-ui.js` (~145 líneas), `modal.js` (~85 líneas), `checkout.js` (~95 líneas). Todos bajo el límite de 200-300 líneas.
  - Comunicación desacoplada via Custom Events (`cart:updated`, `modal:open-variant`).
  - Sin bugs de re-renderización identificados en pruebas manuales.
  - **Conclusión**: No se requiere migración a React/Vue en esta etapa. Vanilla JS + Custom Events es suficiente para el MVP.

### 🐛 Corrección — Botones "Agregar" no funcionales en Promos y ciertos productos
- [x] **Diagnóstico**: El event delegation en `catalog.js` busca `btn.closest('[data-product-id]')`. Las promos (`.promo-card`) **no tienen** `data-product-id`, por lo que el flujo se corta en la línea 166 y nunca llega a `handleAddToCart()`. Los productos regulares sí lo tienen en el `<article class="card">` y funcionan correctamente.
- [x] **Solución**: Añadido `data-product-id="${promo.id}"` al `<article class="promo-card">` en `renderCatalog()` de `catalog.js`.
- [x] **Bug real descubierto**: `updateBadge()` en `cart-ui.js` estaba dentro del bloque `if (isOpen)`. Al agregar un producto con el drawer cerrado, `isOpen = false`, por lo que el badge nunca se actualizaba. **Solución**: `updateBadge()` se ejecuta siempre, fuera del `if`.
- [x] **Bug badge invisible**: `position: absolute` del badge se calculaba incorrectamente por el `position: sticky` del header. **Solución**: Eliminado `position: absolute`, ahora usa flujo normal flexbox. El drawer se abre automáticamente al agregar un producto para dar feedback inmediato.

---

## 🛠️ Fase 3: Backend API — Fastify + PostgreSQL + Redis

> **Objetivo**: Instalar el motor de datos real en el VPS. Al finalizar, el frontend consultará el catálogo desde la BD y los pedidos se registrarán en PostgreSQL (historial) sin romper el flujo WhatsApp existente.
>
> **Decisiones de diseño aprobadas**:
> - Monorepo: el backend vive en `/api` dentro de `massaro-sushi`.
> - Enfoque híbrido: pedidos se persisten en PostgreSQL **y** se siguen enviando a WhatsApp.
> - Sin ORM: SQL directo con `pg` para control total y bajo overhead en VPS pequeño.
> - Sin pago online en esta fase: se implementa en Fase 5 (Transbank/Khipu).

---

### Paso 3.1 — Scaffolding del Backend (`/api`)

- [ ] Crear estructura de carpetas `/api/src/routes/`, `/api/src/db/migrations/`, `/api/src/services/`, `/api/src/plugins/`
- [ ] Crear `api/package.json` con dependencias: `fastify`, `@fastify/cors`, `@fastify/rate-limit`, `pg`, `ioredis`, `dotenv`
- [ ] Crear `api/src/app.js` — instancia Fastify + registro de plugins y rutas
- [ ] Crear `api/src/plugins/cors.js` — CORS restringido a `massaro.cystec.cloud`
- [ ] Crear `api/src/plugins/redis.js` — conexión ioredis + rate limit
- [ ] Crear `api/src/db/client.js` — Pool de `pg` usando `DATABASE_URL`
- [ ] Crear `api/.env.example` — plantilla de variables (commiteado)
- [ ] Crear `api/Dockerfile` — build multi-stage Node 20 Alpine
- [ ] Ejecutar `npm install` en `/api` y validar que levanta sin errores

### Paso 3.2 — Migraciones SQL (8 archivos)

> Basado en el esquema completo de `agent/skill-09-database-schema.md`.

- [ ] `api/src/db/migrations/001_create_categories.sql`
- [ ] `api/src/db/migrations/002_create_products.sql`
- [ ] `api/src/db/migrations/003_create_variants_modifiers.sql` — `product_variants`, `modifier_groups`, `modifiers`
- [ ] `api/src/db/migrations/004_create_combos.sql` — `combos`, `combo_items`
- [ ] `api/src/db/migrations/005_create_customers_orders.sql` — `customers`, `customer_addresses`, `orders`, `order_items`
- [ ] `api/src/db/migrations/006_create_payments.sql` — `payments`, `payment_events`
- [ ] `api/src/db/migrations/007_create_operational.sql` — `delivery_zones`, `store_hours`, `audit_logs`, `webhook_logs`
- [ ] `api/src/db/migrations/008_seeds_initial.sql` — Zona Quilicura, horarios, categorías y ~40 productos del menú
- [ ] Crear `api/src/db/migrate.js` — script para ejecutar migraciones en orden

### Paso 3.3 — Endpoints MVP

- [ ] `api/src/routes/health.js` — `GET /health` → `{ status: 'ok', timestamp }`
- [ ] `api/src/routes/categories.js` — `GET /categories` (con caché Redis 5 min)
- [ ] `api/src/routes/products.js` — `GET /products` + `GET /products/:id` (caché Redis 5 min)
- [ ] `api/src/routes/orders.js` — `POST /orders`:
  - [ ] Recibir carrito (ítems, salsas, personalización, modo entrega, datos cliente)
  - [ ] Recalcular total en el servidor (el frontend NO es fuente de verdad del precio)
  - [ ] Validar `idempotency_key` en Redis (TTL 24h) para evitar pedidos duplicados
  - [ ] Persistir en `orders` + `order_items` en PostgreSQL
  - [ ] Retornar `{ orderId, total, status: 'pending' }`
- [ ] `api/src/services/order.js` — lógica de negocio (cálculo de total, idempotencia)
- [ ] Pruebas manuales con `curl` de todos los endpoints

### Paso 3.4 — Integración Frontend → API

- [ ] Crear `.env` en raíz con `VITE_API_URL=http://localhost:3000` (desarrollo local)
- [ ] Modificar `src/js/catalog.js`:
  - [ ] Añadir `fetchCatalog()` que llame a `GET ${VITE_API_URL}/products`
  - [ ] Fallback automático: si la API falla → usar datos estáticos de `menu.js`
- [ ] Modificar `src/js/checkout.js`:
  - [ ] Antes de abrir WhatsApp, llamar `POST ${VITE_API_URL}/orders` para registrar el pedido
  - [ ] Si la API falla (timeout/error): continuar igualmente hacia WhatsApp (degradación elegante)
- [ ] Validar que el flujo completo funciona con la API encendida y apagada

### Paso 3.5 — Despliegue en EasyPanel

- [ ] Crear servicio `postgres` en EasyPanel (imagen `postgres:15-alpine`, solo red interna)
- [ ] Crear servicio `redis` en EasyPanel (imagen `redis:7-alpine`, solo red interna)
- [ ] Ejecutar migraciones contra el PostgreSQL de EasyPanel (`node api/src/db/migrate.js`)
- [ ] Crear servicio `api` en EasyPanel (desde `/api/Dockerfile`, rama `main`)
- [ ] Cargar variables de entorno en EasyPanel para el servicio `api` (según `infrastructure.md`)
- [ ] Vincular dominio `api.massaro.cystec.cloud` al servicio `api`
- [ ] Añadir variable `VITE_API_URL=https://api.massaro.cystec.cloud` al servicio `frontend`
- [ ] Validar: `curl https://api.massaro.cystec.cloud/health` → `{ status: 'ok' }`

### Paso 3.6 — Actualización de `init.sh` (44 → ~52 checks)

- [ ] Añadir checks: `api/package.json`, `api/src/app.js`, `api/src/db/client.js`, `api/src/db/migrations/`, `api/.env.example`, `api/Dockerfile`
- [ ] Validar: `./init.sh` → N/N checks pasados, 0 fallos

### Paso 3.7 — Documentación Post-Fase 3

- [ ] Actualizar `memory.md` con decisiones tomadas y lecciones aprendidas
- [ ] Actualizar `task.md` marcando todos los pasos completados
- [ ] Actualizar `specs.md` con estado de Fase 3 y nuevas responsabilidades del backend
- [ ] Actualizar `infrastructure.md` con servicios `postgres`, `redis`, `api`, variables de entorno reales y checklist QA de backend
- [ ] Actualizar `agent/skill-08-backend-api-fastify.md` con lecciones aprendidas del deploy real

---

## 🎨 Fase 2.5: Optimización UX Full-Stack (SPA Views + Sidebar Desktop)

> **Objetivo**: Elevar la UX en base a referencias del mercado (ej. niusushi.cl). La navegación pasará a ser una SPA pura (intercambio de vistas entre Hero y Catálogo). En Desktop se implementará un layout de Sidebar para las categorías. En Móvil se ocultará el catálogo por defecto y se utilizará un diseño de Acordeón Vertical (que cierra automáticamente los items inactivos).
> **Nota para el agente ejecutor**: Implementar estas instrucciones paso a paso de forma metódica, asegurándose de validar la UI sin romper el funcionamiento del carrito.

### Paso 1 — Estructura HTML y Controladores de Vista
- [x] En `index.html`, agregar la clase utilitaria para ocultar el menú al inicio: `<section id="menu" class="catalog d-none">` (o usar un atributo `style="display:none;"` / una clase específica `catalog--hidden`).
- [x] En `index.html`, reestructurar `<section id="menu">` añadiendo un contenedor interno `<div class="catalog__body container">` (reemplazando al antiguo `container` si es necesario). Este envolverá al `<aside class="catalog__sidebar">` (antiguo `catalog__tabs`) y a un `<div class="catalog__content">` (donde irá el `catalog__grid`).
- [x] En `index.html`, eliminar el bloque del `<select>` móvil (`<div class="catalog__filter-mobile">`), ya que será reemplazado por el Acordeón.
- [x] Asegurar que los botones "Menú" (en el Header) y "Ver Menú" (en el Hero) tengan IDs unificados o se capten correctamente para abrir la carta.
- [x] Asegurar que el Logo en el Header tenga un ID para volver al inicio (ej. `btn-show-hero`).

### Paso 2 — Lógica SPA (Intercambio de Vistas) en `main.js`
- [x] En `src/js/main.js`, capturar los botones del menú y del logo.
- [x] Crear lógica para alternar vistas:
  - Al hacer clic en "Menú" o "Ver Menú": Ocultar la sección `.hero` (`display: none`), Mostrar la sección `#menu` (`display: block`), y ejecutar `window.scrollTo({top: 0, behavior: 'smooth'})`.
  - Al hacer clic en el Logo: Ocultar la sección `#menu`, Mostrar la sección `.hero`, y ejecutar `window.scrollTo({top: 0, behavior: 'smooth'})`.

### Paso 3 — Refactorización CSS del Layout (`_catalog.scss`)
- [x] En `src/sass/pages/_catalog.scss`, definir el layout de `.catalog__body`:
  - Móvil (`max-width: 767px`): `display: flex; flex-direction: column;`
  - Desktop (`min-width: 768px`): `display: flex; flex-direction: row; gap: var(--spacing-xl);`
- [x] Convertir las antiguas clases de tabs (`.catalog__tabs`) a `.catalog__sidebar` (o mantener el nombre y cambiar estilos).
  - En Desktop: Ancho fijo (ej. `250px`), `flex-shrink: 0`, `position: sticky; top: 100px;` (para acompañar el scroll), menú vertical.
  - En Móvil: Ocultar el Sidebar (`display: none`).

### Paso 4 — Lógica de Acordeón y Renderizado en `catalog.js`
- [x] Reescribir la función `renderCatalog()`:
  - Iterar sobre el array `categories` e inyectar *todas* las categorías al DOM simultáneamente.
  - Envolver cada categoría en un `<div class="catalog__category-group" data-category-group="${cat.id}">`.
  - Dentro de cada grupo, insertar un botón de cabecera: `<button class="catalog__accordion-header"><span>${cat.name}</span><span class="icon">▼</span></button>`.
  - Añadir la clase `is-expanded` al grupo `promos` por defecto, para que sea el único desplegado al inicio en móvil.
  - Añadir la clase `is-active-tab` al grupo `promos` por defecto, para que sea el único visible al inicio en desktop.
- [x] En Desktop (Sidebar click): En lugar de re-renderizar, añadir un event listener al Sidebar que itere sobre los `.catalog__category-group` y aplique una clase `is-active-tab` al seleccionado (ocultando los demás por CSS).
- [x] En Móvil (Acordeón click): Añadir event delegation a la cuadrícula para escuchar clics en `.catalog__accordion-header`.
  - **Requisito Obligatorio**: Comportamiento de Acordeón clásico. Al abrir una categoría, buscar todas las demás que tengan `is-expanded` y removerles la clase. Luego, togglear `is-expanded` en la categoría clicada.
- [x] Actualizar CSS para que en Móvil el contenido se oculte a menos que el grupo tenga `is-expanded`. En Desktop, ocultar los headers del acordeón.

### Paso 5 — Verificación y Testing
- [x] Validar Vista Móvil: Solo se ve Hero. Al hacer clic en "Ver Menú", aparece la carta con Promos abierto y el resto colapsado. Al abrir otra categoría, Promos se cierra (cierre mutuo).
- [x] Validar Vista Desktop: Al abrir la carta, el Sidebar está a la izquierda y filtra las categorías a la derecha como un SPA instantáneo.
- [x] Verificar que agregar ítems al carrito sigue funcionando tras estos cambios en el HTML inyectado.

---

## 🧹 Mejora UX Footer: Hero sin Footer Cortado + Footer Compacto

> **Problema**: El hero con `flex: 1` ocupaba exactamente el viewport restante. En viewports donde el contenido del hero (logo + texto + botón) era más bajo que ese espacio, el borde superior del footer se asomaba detrás del hero, luciendo "cortado" y dando una sensación visual sucia.
>
> **Referencia de mercado**: niusushi.cl usa un hero con altura contenida (no forzada al 100% del viewport), con amplio espaciado interior y el footer visible solo al hacer scroll.
>
> **Decisión**: Combinar ambas alternativas del usuario: 1) reducir altura del hero para que no ocupe todo el viewport, dejando respiro natural antes del footer; 2) compactar la tipografía del footer para que se vea más limpio y apilado en paralelo.

### Paso 1 — Hero con altura natural (iterado → solución final)
- [x] `src/sass/pages/_hero.scss` — Cambiar `.hero` de `flex: 1` a altura natural con `padding` y `margin-bottom`. *(No funcionó, se restauró `flex: 1` en la solución final)*
- [x] Validar: hero mantiene contenido centrado, no ocupa todo el viewport, footer no se asoma detrás.

### Paso 2 — Footer compacto (tipografía y espaciado reducido)
- [x] `src/sass/layout/_footer.scss` — Reducir `padding` de `.footer` de `var(--spacing-xl)` a `var(--spacing-lg)`.
- [x] `src/sass/layout/_footer.scss` — Reducir `.footer__section-title` de `1rem` a `0.85rem` y `.footer__item` de `0.9rem` a `0.8rem`.
- [x] `src/sass/layout/_footer.scss` — Reducir `gap` de `.footer__info` de `var(--spacing-xl)` a `var(--spacing-lg)`.

### Paso 3 — Validación
- [x] `npm run build` → sin errores
- [x] Revisión visual: hero ocupa viewport sin espacios muertos, footer delgado con copyright pegado.
- [x] Revisión móvil: grid de footer se apila en 1 columna con textos más pequeños.
- [x] `./init.sh` → 53/53 checks pasados

### 🐛 Fix final — Espaciado hero-footer en móvil
> **Problema**: Tras remover `flex: 1` del hero, `.main-content` con `flex-grow: 1` se estiraba llenando el viewport con espacio vacío entre el hero y el footer.
> **Solución**: Restaurar `flex: 1` en el hero, eliminar `margin-top: auto` del footer. El hero se estira exactamente entre header y footer.

- [x] `src/sass/layout/_grid.scss` — `.main-content` cambió de `flex-grow: 1` a `flex: 1`.
- [x] `src/sass/pages/_hero.scss` — `.hero` recuperó `flex: 1`.
- [x] `src/sass/layout/_footer.scss` — Eliminado `margin-top: auto`. Padding a `0` en móvil, `gap` a `0`, `padding-top` de `.footer__bottom` a `var(--spacing-xs)`.

---

## ✨ Fase 2.6: Pulido Premium UX/UI (Micro-interacciones)

> **Objetivo**: Elevar la percepción de calidad de la interfaz a un estándar "Premium". Implementar transiciones suaves de SPA, feedback no intrusivo (Toasts) y CTAs de alta conversión (FAB en móvil), eliminando saltos bruscos e interacciones invasivas (como auto-abrir el carrito al agregar ítems).
>
> **Razonamiento completo**: Documentado en `memory.md` → "Razonamiento Técnico — Pulido Premium UX/UI (Fase 2.6)".

### Paso 1 — Transiciones SPA (Fade-in + Slide-up)
- [x] `_animations.scss` — Verificar que existan keyframes `fadeIn`, `fadeInUp`, `fadeInDown`, `scaleIn`, `slideInRight`, `shimmer`, `pulse`.
- [x] Importar `_animations.scss` en `app.scss` (ya importado via `base/_index.scss`).
- [x] Aplicar `animation: fadeIn 0.35s ease` a `.catalog--active`, `.info-section--active`. Hero tiene `transition: opacity 0.3s` + `fadeIn`.
- [x] Cards y promos tienen `fadeInUp` escalonado con nth-child.

### Paso 2 — Toast de Retroalimentación (Componente) — *Reemplazado por Fase 2.8*
- [x] ~~Toast implementado~~ → **Eliminado en Fase 2.8**. Ver análisis de redundancia.
- [x] ~~toast.js, _toast.scss creados~~ → Archivos eliminados.

### Paso 3 — Integrar Toast en catálogo y modal — *Reemplazado por Fase 2.8*
- [x] ~~showToast en catalog.js y modal.js~~ → Llamadas eliminadas en Fase 2.8.
- [x] `src/js/cart-ui.js` — Eliminado `openDrawer()` automático del listener `cart:updated`. Eliminado toast legacy con productName.

### Paso 4 — FAB Móvil (Floating Action Button)
- [x] `index.html` — Agregado `<button id="fab-cart" class="fab" style="display:none;">🛒 Ver mi pedido ($0)</button>`.
- [x] Crear `src/sass/components/_fab.scss` — Fixed bottom-0 full-width, glassmorphism rojo, solo en móvil (max-width: 767px), z-index 997.
- [x] `src/sass/app.scss` — Importado `@use 'components/fab'`.
- [x] `src/js/cart-ui.js` — `updateFab()` actualiza texto con total y muestra/oculta según `getItemCount()`.

### Paso 5 — Acordeón Fluido (CSS Grid `0fr → 1fr`)
- [x] `.catalog__category-items` usa `display: grid; grid-template-rows: 0fr; transition: grid-template-rows 0.32s ease-out`. Cuando `is-expanded`: `grid-template-rows: 1fr`.
- [x] Nuevo `.catalog__category-items-inner` con `overflow: hidden; min-height: 0; padding-top: 0` (animado a `var(--spacing-md)`).
- [x] `catalog.js` envuelve contenido en `<div class="catalog__category-items-inner">`.

### Paso 6 — Flexbox Wrap en cards (Botón no se corta)
- [x] `_cards.scss` — `.card__footer` con `flex-wrap: wrap; gap: var(--spacing-sm);`. `.btn` con `flex-grow: 1; text-align: center;`.

### Paso 7 — Validación
- [x] `npm run build` → sin errores (591ms)
- [x] Revisión visual: transiciones suaves, toast aparece/desaparece, FAB visible con items, acordeón fluido, botones no cortados.
- [x] `./init.sh` → 53/53 checks pasados

---

## 🗣️ Fase 2.7: Microcopy Toast (Estandarización)

> **Objetivo**: Ajustar el texto del toast implementado en Fase 2.6 a la frase exacta solicitada por el negocio: `"✅ Tu selección se ha agregado al carrito"`.
>
> **Razonamiento completo**: Documentado en `memory.md` → "Fase 2.7: Estandarización de Microcopy (Toast)".

### Paso 1 — Mensaje toast estandarizado — *Reemplazado por Fase 2.8*
- [x] ~~Microcopy implementado~~ → **Toast eliminado en Fase 2.8** por redundancia con badge + FAB.

### Paso 2 — Validación
- [x] `npm run build` → sin errores
- [x] Verificar visualmente el texto del toast.
- [x] `./init.sh` → 53/53 checks pasados

---

## 📱 Mejora UX Móvil: Footer como Sección Independiente (Vista Información)

> **Problema**: En móvil, el footer con información del negocio (Delivery, Contacto, Redes) se ve debajo del hero. Como el hero es la carta de presentación, el footer compite visualmente y ensucia la experiencia limpia e impactante que debe tener la vista inicial.
>
> **Referencia de mercado (niusushi.cl)**: En móvil, niusushi.cl no muestra información del negocio en la pantalla de inicio. La información de contacto y delivery está en una sección aparte, accesible desde la navegación. Esto hace que el hero sea limpio, impactante y 100% enfocado en la marca y el CTA.
>
> **Decisión de diseño**: Convertir el footer en una **sección SPA independiente** (`#info-section`) accesible desde el menú hamburguesa. En móvil, el footer del layout principal desaparece. En desktop, el footer se mantiene igual (con información completa y copyright).

### Paso 1 — HTML: Nueva sección de información y enlace en nav
- [x] `index.html` — Agregar enlace "Información" en `#main-nav` (después de "Nosotros").
- [x] `index.html` — Crear nueva `<section id="info-section">` con el contenido completo del footer (Delivery, Contacto, Redes, Copyright), copiado del footer actual.
- [x] `index.html` — Simplificar el `<footer>` del layout principal: en móvil solo muestra copyright con borde superior delgado.

### Paso 2 — Lógica SPA: Integrar vista de información
- [x] `src/main.js` — Agregar botón "Información" a la navegación SPA: al hacer click, oculta hero y catálogo, muestra `#info-section`. El logo del header vuelve al hero. Integrar en `initSpaNavigation()`.

### Paso 3 — CSS: Ocultar info del footer en móvil, estilos de la info-section
- [x] `src/sass/layout/_footer.scss` — En móvil (max-width: 767px), ocultar `.footer__info` (solo dejar copyright con borde superior). En desktop, mantener como está.
- [x] Crear `src/sass/pages/_info.scss` — Estilos para la sección `#info-section`: fondo oscuro, contenido centrado, tipografía compacta, espaciado vertical generoso, iconos y enlaces con color de marca.

### Paso 4 — Importar nuevo componente Sass
- [x] `src/sass/app.scss` — Agregar `@use 'pages/info';`

### Paso 5 — Validación
- [x] `npm run build` → sin errores
- [x] Revisión visual móvil: hero sin footer visible, al abrir menú hamburguesa y hacer click en "Información" se ve la sección con Delivery, Contacto, Redes y Copyright.
- [x] Revisión visual desktop: footer se mantiene igual que antes (info + copyright).
- [x] `./init.sh` → 53/53 checks pasados

---

## 🧭 Refactor Menú Hamburguesa: "Información" → "Nosotros" + "Pedir Ahora" funcional

> **Problema**: El menú hamburguesa tenía 4 elementos: "Menú" (funcional), "Nosotros" (sin acción, solo ancla `#nosotros` inexistente), "Información" (abría info-section) y "Pedir Ahora" (sin acción, `href="#"`). "Información" era redundante porque su contenido se solapaba con "Nosotros". "Pedir Ahora" no llevaba a ningún lado.
>
> **Decisión**: Eliminar el enlace "Información" y asignar su funcionalidad (abrir `#info-section`) al enlace "Nosotros". El botón "Pedir Ahora" ahora abre el catálogo (showMenu). Esto aplica tanto para móvil (menú hamburguesa) como desktop (nav horizontal).

### Paso 1 — HTML: Reasignar IDs en el nav
- [x] `index.html` — Eliminar `<a href="#info" id="btn-show-info">Información</a>` del `#main-nav`.
- [x] `index.html` — Agregar `id="btn-show-info"` al enlace `<a href="#nosotros">Nosotros</a>`.
- [x] `index.html` — Agregar `id="btn-order-now"` al botón `<a href="#" class="btn btn--primary">Pedir Ahora</a>`.

### Paso 2 — JS: Listener para "Pedir Ahora" + comportamiento desktop de "Nosotros"
- [x] `src/main.js` — Capturar `#btn-order-now` y asignarle `showMenu()` (abre el catálogo).
- [x] `src/main.js` — `showInfo()` ahora detecta el viewport: en desktop (≥768px) hace scroll suave al footer; en móvil abre la info-section como vista SPA.

### Paso 3 — Validación
- [x] `npm run build` → sin errores
- [x] Revisión visual: menú hamburguesa muestra "Menú", "Nosotros" (abre info-section), "Pedir Ahora" (abre catálogo). Desktop igual.
- [x] `./init.sh` → 53/53 checks pasados

---

## 🐛 Bugfix: Parpadeo al hacer clic en el logo del header (Desktop)

> **Problema**: Al hacer clic en el logo de Massaro en el header (versión desktop), la pantalla parpadea/blanquea momentáneamente antes de mostrar el hero. Esto ocurre porque el logo es un `<a href="/">` y el navegador intenta navegar a la raíz del sitio, causando una recarga parcial/redirección antes de que el listener JS de `btnShowHero` ejecute `showHero()`.
>
> **Diagnóstico**: El listener de `btnShowHero` no llama a `e.preventDefault()`, por lo que el comportamiento por defecto del enlace (navegar a `/`) se ejecuta antes o en paralelo con la lógica SPA. En un SPA servido con Nginx, navegar a `/` implica una petición HTTP que reinicia la aplicación, produciendo el parpadeo.

### Paso 1 — preventDefault en btnShowHero y otros enlaces nav
- [x] `src/main.js` — Todos los listeners de enlaces del nav (`btnShowMenu`, `btnShowHero`, `btnShowInfo`, `btnOrderNow`) ahora reciben el evento y llaman a `e.preventDefault()` para evitar navegación por defecto.

### Paso 2 — Validación
- [x] `npm run build` → sin errores
- [x] Revisión visual: clic en logo del header en desktop → transición suave a hero sin parpadeo.
- [x] `./init.sh` → 53/53 checks pasados

---

## 🐛 Bugfix: Scroll vertical innecesario en vista móvil (Hero + Footer)

> **Problema**: En algunos viewports móviles pequeños, el hero + footer sumaban más que 100dvh, obligando a hacer scroll vertical para ver todo el contenido. El hero con `padding: var(--spacing-2xl)` (~3rem arriba y abajo) y el gap interno `var(--spacing-lg)` entre logo, título y botón generaban demasiada altura vertical.

### Paso 1 — Reducir padding del hero en móvil
- [x] `src/sass/pages/_hero.scss` — `.hero` padding reducido de `var(--spacing-2xl)` a `var(--spacing-xl)`. En móviles ≤480px: `padding: 0 var(--spacing-md) var(--spacing-xs)` (sin padding superior, mínimo inferior simétrico al footer).
- [x] `src/sass/pages/_hero.scss` — Gap interno de `hero__inner` reducido a `var(--spacing-md)` en móviles ≤480px.

### Paso 2 — Validación
- [x] `npm run build` → sin errores
- [x] Revisión visual: hero ocupa justo el viewport sin scroll innecesario. Espaciado simétrico entre header-hero y hero-footer.

---

## 🗑️ Fase 2.8: Eliminación de Toast Redundante

> **Problema**: El toast "✅ Tu selección se ha agregado al carrito" es redundante con el badge del header (que se actualiza instantáneamente) y el FAB móvil (que aparece con el total). Las prácticas de mercado (PedidosYa, Rappi, UberEats, Cornershop) no usan toast para feedback de "agregado al carrito" — confían en badge + FAB.
>
> **Diagnóstico completo**: Documentado en `memory.md` → "Eliminación de Toast Redundante (Fase 2.8)".

### Paso 1 — Eliminar componente Toast
- [x] `src/js/toast.js` — Eliminado.
- [x] `src/sass/components/_toast.scss` — Eliminado.
- [x] `index.html` — Eliminado `<div id="toast-container">`.

### Paso 2 — Eliminar importaciones y referencias
- [x] `src/sass/app.scss` — Eliminado `@use 'components/toast'`.
- [x] `src/js/catalog.js` — Eliminados import y llamada `showToast()`.
- [x] `src/js/modal.js` — Eliminados import y llamada `showToast()`.
- [x] `src/js/cart-ui.js` — Eliminado `import { showToast }`.
- [x] `src/main.js` — Eliminado `import { showToast }`.

### Paso 3 — Actualizar Fase 2.6 y 2.7 en task.md
- [x] `task.md` — Fase 2.6 Paso 2 y Paso 3 marcados como reemplazados.
- [x] `task.md` — Fase 2.7 marcada como reemplazada.

### Paso 4 — Validación
- [x] `npm run build` → sin errores
- [x] Verificar que badge del header y FAB siguen funcionando sin el toast.
- [x] `./init.sh` → 53/53 checks pasados

---

## 🗑️ Fase 2.9: Eliminación del filtro "Todo" del sidebar

> **Problema**: El botón "Todo" en el sidebar del catálogo es redundante. Cuando el usuario entra a la carta, la categoría por defecto es Promos (la más relevante). "Todo" mezcla todas las categorías sin orden claro y crea una contradicción visual: el botón "Todo" aparece como activo pero solo se ve Promos. Las prácticas de mercado (niusushi.cl, PedidosYa, Rappi) no usan filtro "Todo".
>
> **Diagnóstico completo**: Documentado en `memory.md` → "Eliminación del filtro Todo (Fase 2.9)".

### Paso 1 — Eliminar botón "Todo" del sidebar
- [x] `src/js/catalog.js` — Eliminado bloque que crea el botón "Todo". Promos es el primer botón del sidebar y tiene `--active` por defecto.

### Paso 2 — Ajustar lógica de filtrado
- [x] `src/js/catalog.js` — Eliminada condición `if (!category)` en el click handler (ya no hay "Todo"). Simplificada la inicialización de desktop.

### Paso 3 — Validación
- [x] `npm run build` → sin errores (584ms)
- [x] Revisión visual: sidebar arranca con "Promos" activo, no aparece "Todo".
- [x] `./init.sh` → 53/53 checks pasados

---

## 🐛 Bugfix: FAB fantasma "mobile-fab" sin estilos en móvil

> **Problema**: En la esquina inferior izquierda de la vista móvil aparece un elemento deforme sin diseño que dice "🛒 Ver mi pedido 0". Es un FAB legacy (`#mobile-fab`) creado por otro modelo IA que quedó en el HTML sin ningún estilo CSS asociado. No tiene clase `.fab`, ni `_mobile-fab.scss`, ni ningún estilo definido. Al no tener `display: none` funcional (usa clase `is-hidden` sin CSS de soporte), el navegador lo renderiza como un botón nativo feo.
>
> **Diagnóstico**: El HTML tiene DOS FABs: `#mobile-fab` (legacy, sin estilos) y `#fab-cart` (actual, con estilos en `_fab.scss`). `updateFab()` solo usa `#fab-cart`, pero `#mobile-fab` permanece en el DOM visible por falta de estilos.

### Paso 1 — Eliminar FAB legacy del HTML
- [x] `index.html` — Eliminado bloque `<button class="mobile-fab is-hidden" id="mobile-fab">` (líneas 315-319).

### Paso 2 — Validación
- [x] `npm run build` → sin errores
- [x] Revisión visual móvil: sin elementos deformes en la esquina inferior.
- [x] `./init.sh` → 53/53 checks pasados

---

## 🐛 Bugfix: FAB sin click listener — no abre el carrito

> **Problema**: La franja roja inferior (FAB) con el texto "🛒 Ver mi pedido — $X.XXX" se muestra correctamente cuando hay items en el carrito, pero al hacer clic sobre ella no abre el drawer del carrito. No hace nada. Esto contradice el estándar del mercado (PedidosYa, UberEats, Cornershop) donde el FAB siempre abre el carrito.
>
> **Diagnóstico**: La función `updateFab()` actualiza la visibilidad y el texto del FAB, pero nunca se le asigna un event listener `click` que llame a `openDrawer()`.

### Paso 1 — Agregar event listener al FAB
- [x] `src/js/cart-ui.js` — En initCartUI(), capturado #fab-cart y asignado fabBtn.addEventListener('click', openDrawer).

### Paso 2 — Validación
- [x] `npm run build` → sin errores
- [x] Prueba manual: agregar producto, hacer clic en el FAB → debe abrir el drawer.
- [x] `./init.sh` → 57/57 checks pasados

---

## ✨ Mejora UX: Diferenciar "Menú" (todo colapsado) vs "Pedir Ahora" (Promos abierto)

> **Problema**: Actualmente "Menú" (header/hero) y "Pedir Ahora" ejecutan `showMenu()` que abre la carta con Promos expandido. El usuario quiere que "Menú" abra la carta **con todas las categorías colapsadas** (móvil), mientras "Pedir Ahora" mantiene Promos expandido.
>
> **Comportamiento acordado**:
> | Acción | Móvil | Desktop |
> |---|---|---|
> | Menú / Ver Menú | Carta abierta, todas las categorías colapsadas | Igual que hoy (Promos visible) — sin cambios |
> | Pedir Ahora | Promos expandido (comportamiento actual) | Promos visible (comportamiento actual) |
>
> **Decisión**: En desktop se mantiene igual porque el sidebar muestra Promos por defecto y no tiene sentido mostrar un sidebar sin contenido visible.

### Archivos a modificar:
- `src/main.js` — Nueva función `showMenuCollapsed()` que llama a `renderCatalog()` y `initCatalogSidebar()` con parámetro para colapsar todo.
- `src/js/catalog.js` — `renderCatalog()` acepta parámetro `expandPromos` (default `true`). Si `false`, no agrega `is-expanded` ni `is-active-tab`. `initCatalogSidebar()` acepta `activeCategory` (default `'promos'`).

### Cambios específicos:

- [x] **`src/js/catalog.js`** — `renderCatalog()` añadir parámetro `expandPromos = true`. Si es `false`, no inyecta `is-expanded is-active-tab`.
- [x] **`src/js/catalog.js`** — `initCatalogSidebar()` acepta parámetro `activeCategory = 'promos'`. Si es `null`, ningún botón se marca activo.
- [x] **`src/main.js`** — Nueva función `showMenuCollapsed()`: re-renderiza el catálogo sin expandir y sidebar sin activo.
- [x] **`src/main.js`** — `btn-show-menu` y `btn-hero-menu` llaman a `showMenuCollapsed()`. `btn-order-now` mantiene `showMenu()`.

### Comportamiento detallado:
- **Móvil "Menú"**: El acordeón se renderiza **sin** `is-expanded` en ninguna categoría (todas colapsadas). El usuario toca cualquier categoría para expandirla.
- **Móvil "Pedir Ahora"**: Promos se expande.
- **Desktop**: sin cambios — Promos visible siempre.

### Validación:
- [x] `npm run build` → sin errores

---

## 🐛 Bugfix: showMenuCollapsed rompe acordeón en móvil + afecta desktop

> **Problema 1**: `showMenuCollapsed()` se aplicaba en desktop colapsando el sidebar.
> **Solución**: Guard condicional `if (window.innerWidth >= 768)` que deriva a `showMenu()`.
>
> **Problema 2**: `showMenuCollapsed()` llamaba a `initCatalogSidebar(null)` que duplicaba event listeners en `catalogContent`, causando que el acordeón dejara de responder.
> **Solución**: Eliminar la re-ejecución de `initCatalogSidebar()`. Los listeners por delegación sobre `catalogContent` ya funcionan con el nuevo HTML de `renderCatalog(false)`.

### Paso 1 — Guard condicional en showMenuCollapsed
- [x] `src/main.js` — Si desktop, deriva a `showMenu()`.

### Paso 2 — Eliminar re-asignación de sidebar/listeners
- [x] `src/main.js` — Eliminar `initCatalogSidebar(null)` y limpieza de botones.

### Paso 3 — Validación
- [x] `npm run build` → sin errores (583ms)
- [x] Desktop: Menú y Pedir Ahora → Promos visible
- [x] Móvil: clic "Menú" → todo colapsado, al tocar categoría se expande
- [x] Móvil: clic "Pedir Ahora" → Promos expandido
- [x] `./init.sh` → 57/57 checks pasados

---

## 🎨 Fase 2.11: Optimización de Contraste en Botones (UX/UI)

> **Objetivo**: Mejorar la legibilidad de los botones secundarios amarillos ("Personalizar pedido", chips de precios) asegurando que usen texto negro en lugar de blanco (que incumple normas WCAG de accesibilidad).

### Paso 1 — Definir variable CSS faltante
- [x] `src/sass/themes/_light.scss` — Añadir `--color-black: #{var.$color-black};`
- [x] `src/sass/themes/_dark.scss` — Añadir `--color-black: #{var.$color-black};`

### Paso 2 — Validación
- [x] `npm run build` → verificar compilación sin errores
- [x] `./init.sh` → validar que los checks de integridad pasen

---

## 🐛 Bugfix 2.11.5: Botón "Continuar pedido" entrecortado en Samsung A52 (Drawer Layout)

> **Problema**: En Samsung A52 con Chrome, al agregar Promo 1 al carrito y abrir el drawer, el botón "Continuar pedido" aparece clippeado/entrecortado. Causa raíz: `100vh` no descuenta barras del navegador en Android + footer/salsas/personalización fuera del scroll container.
>
> **Diagnóstico completo**: Documentado en `memory.md` → "Bugfix: Botón Continuar pedido entrecortado en Samsung A52".
>
> **Orden de ejecución**: Este bugfix se ejecutará **antes** que la Fase 2.12.

### Diagnóstico inicial
Se intentó la Opción A (mover footer/salsas dentro del body) pero `renderCartItems()` en `cart-ui.js` hace `body.innerHTML = ...` que pisotea los elementos HTML estáticos. Al agregar el primer item con el drawer cerrado (`isOpen = false`), `renderSalsas()` y `renderCustomizationBadge()` no se ejecutan, dejando salsas y footer invisibles.

### Decisión final — Opción B
Revertir estructura HTML a su estado original y mantener solo `100dvh` + `safe-area-inset-bottom`. Esto corrige el clipping real (causa raíz del bug en Samsung A52) sin introducir nuevos bugs.

### Paso 1 — Cambiar height del drawer a 100dvh
- [x] `src/sass/components/_cart-drawer.scss` — Cambiar `height: 100vh` → `height: 100dvh` en `.cart-drawer`.

### Paso 2 — Revertir estructura HTML a estado original
- [x] `index.html` — Revertir: `#cart-salsas`, `#cart-customization` y `#cart-drawer-footer` vuelven a estar **fuera** de `#cart-drawer-body`, manteniendo la estructura original.

### Paso 3 — Añadir safe-area-inset-bottom al footer
- [x] `src/sass/components/_cart-drawer.scss` — Añadir `padding-bottom: max(1.5rem, env(safe-area-inset-bottom, 1.5rem))` al `.cart-drawer__footer`.

### Paso 4 — Validación
- [x] `npm run build` → sin errores (565ms)
- [x] Verificar en Samsung A52 que el botón "Continuar pedido" se ve completo y no clippeado
- [x] Verificar que salsas, personalización y botón "Continuar pedido" funcionan correctamente
- [x] `./init.sh` → 57/57 checks pasados

---

## 🚀 Fase 2.12: Refactor UX/UI - Vistas de Catálogo Compactas

> **Objetivo**: Optimizar la velocidad de escaneo del catálogo en móvil ocultando imágenes y descripciones por defecto. Mostrar solo nombre, badges, precio y botón "Agregar". Al tocar la card se expande para revelar imagen, descripción y variantes.
>
> **Decisión de diseño**: Solo aplica en móvil (`max-width: 767px`). En desktop el comportamiento no cambia (todo visible siempre).

### Paso 1 — Refactor de templates en `src/js/catalog.js`
- [x] Modificar template de `card`: imagen-wrapper y descripción envueltos en `.card__compact-details`. Cabecera `.card__compact-header` con título, badges, precio, botón "Agregar" + `▼`.
- [x] Modificar template de `promo-card`: misma lógica. Cabecera con imagen, nombre, precio, pieces badge, botón "Agregar" + `▼`. Descripción colapsable en `.promo-card__compact-details`.
- [x] Añadir `data-action="toggle-details"` a la cabecera (`__compact-header`) en ambos templates.
- [x] En el event delegation de "Agregar", añadir `e.stopPropagation()`.

### Paso 2 — Lógica de acordeón por card en `src/js/catalog.js`
- [x] Añadir event delegation en `catalogContent` para capturar clics en `[data-action="toggle-details"]`.
- [x] Al hacer clic, toggle `.is-expanded` en el `<article>` (`.card` o `.promo-card`).
- [x] Botón "Agregar" con `stopPropagation()` no activa el toggle.

### Paso 3 — Estilos CSS en `src/sass/components/_cards.scss`
- [x] `.card__compact-header`: flexbox row, cursor pointer en móvil.
- [x] `.card__compact-details`: CSS Grid `0fr → 1fr` con sub-contenedor `overflow: hidden`.
- [x] `.card.is-expanded .card__compact-details`: `grid-template-rows: 1fr`.
- [x] Indicador `▼` con rotate 180° al expandir. Oculto en desktop.
- [x] En desktop: `.card__compact-details` siempre `grid-template-rows: 1fr`.

### Paso 4 — Estilos CSS en `src/sass/pages/_catalog.scss` para promos
- [x] `.promo-card__compact-header`: flexbox con imagen 100px (móvil) / 200px (desktop).
- [x] `.promo-card__compact-details`: CSS Grid `0fr → 1fr` colapsable.
- [x] `.promo-card.is-expanded .promo-card__compact-details`: expandido. En desktop siempre visible.
- [x] Layout promo-card cambiado a `flex-direction: column` para acomodar el colapso.

### Paso 5 — Validación
- [x] `npm run build` → sin errores (569ms)
- [x] Revisión visual móvil: cards colapsadas con nombre+precio+Agregar, al tocar se expanden
- [x] Revisión visual desktop: todo visible, sin cambios respecto a hoy
- [x] Botón "Agregar" funciona tanto colapsado como expandido
- [x] `./init.sh` → 57/57 checks pasados

---

## 🐛 Bugfix 2.12.1: Imagen de Promos no se colapsa y toggle no expande detalles

> **Problema reportado**: Las cards de Promos muestran la imagen siempre visible (no minimizada). Al hacer clic en la cabecera el toggle no expande los detalles de la composición de la promo.
>
> **Diagnóstico completo**: Documentado en `memory.md` → "Bugfix 2.12.1".

### Causa raíz

**Bug 1 — Imagen fuera del contenedor colapsable**: En el template de `promo-card` (`catalog.js`), `promo-card__image-wrapper` y `promo-card__pieces` están dentro del `promo-card__compact-header`, NO dentro de `promo-card__compact-details`. La imagen siempre es visible aunque los detalles estén colapsados.

**Bug 2 — solo descripción en detalles**: El contenedor `promo-card__compact-details` solo contiene la descripción (`promo-card__desc`), no la imagen. Por eso al hacer clic en expandir no se ve cambio visual apreciable.

### Solución planificada

### Paso 1 — Mover imagen a detalles colapsables
- [x] `src/js/catalog.js` — Mover `promo-card__image-wrapper` y `promo-card__pieces` desde `promo-card__compact-header` a `promo-card__compact-details / promo-card__compact-details-inner`.
- [x] La cabecera se queda solo con: nombre (con inline pieces badge "13 pz."), precio, botón Agregar y toggle `▼`.

### Paso 2 — Ajustar CSS de image-wrapper dentro de detalles
- [x] `src/sass/pages/_catalog.scss` — Dentro de `__compact-details-inner`, el `__image-wrapper` ahora tiene `width: 100%` y `aspect-ratio: 3/2` (como las cards regulares), sin el ancho fijo de 100px.

### Paso 3 — Validación
- [x] `npm run build` → sin errores (575ms)
- [x] Vista móvil: Promos colapsadas (solo nombre + precio + botón + ▼). Al tocar se expanden con imagen + pieces + descripción
- [x] Botón "Agregar" funciona tanto colapsado como expandido
- [x] Desktop: sin cambios, todo visible
- [x] `./init.sh` → 57/57 checks pasados

---

## 🐛 Bugfix 2.12.2: Toggle de promos no gira el icono ▼ ni expande detalles

> **Problema reportado**: Tras el Bugfix 2.12.1, la imagen de las promos ya está colapsada (no se ve), pero al hacer clic en la cabecera de una promo (ej. Promo 1), el icono ▼ no gira y no se expanden los detalles (imagen + descripción). Las cards regulares sí funcionan.
>
> **Diagnóstico completo**: Documentado en `memory.md` → "Bugfix 2.12.2".

### Causa raíz

**Bug — Regla CSS de toggle-icon solo existe para `.card`, no para `.promo-card`**:

En `_cards.scss` línea 87:
```scss
.card.is-expanded &__toggle-icon {
    transform: rotate(180deg);
}
```
Esto se compila a `.card.is-expanded .card__toggle-icon`. Funciona para cards porque el `<article>` tiene clase `card`. Pero las promos usan `<article class="promo-card">`, por lo que esa regla CSS nunca se aplica. El usuario hace clic, el JS togglea `.is-expanded` en `promo-card`, pero el icono ▼ no gira y el usuario piensa que no funcionó.

Además, el colapso de `promo-card__compact-details` sí está correctamente definido en `_catalog.scss`:
```scss
.promo-card.is-expanded &__compact-details {
    grid-template-rows: 1fr;
}
```
Esto sí funciona, pero sin el feedback visual del icono girando, el usuario no percibe el cambio.

### Solución planificada

### Paso 1 — Añadir regla CSS para toggle-icon en promos
- [x] `src/sass/pages/_catalog.scss` — Añadida regla `.promo-card.is-expanded .card__toggle-icon { transform: rotate(180deg); }`

### Paso 2 — Validación
- [x] `npm run build` → sin errores (626ms)
- [x] Vista móvil: el icono ▼ gira pero no se expanden detalles (CSS Grid no funciona)
- [x] `./init.sh` → 57/57 checks pasados

---

## 🐛 Bugfix 2.12.3: Toggle de promos no expande detalles (CSS Grid no confiable)

> **Problema reportado**: Tras Bugfix 2.12.1 (imagen colapsada) y 2.12.2 (▼ gira), los detalles de las promos (imagen + descripción) aún no se expanden al hacer clic. El icono ▼ gira pero no hay contenido visible nuevo.
>
> **Diagnóstico completo**: Documentado en `memory.md` → "Bugfix 2.12.3".

### Causa raíz

**CSS Grid `0fr → 1fr` no fiable dentro de contenedores anidados**: El colapso de detalles usaba `display: grid; grid-template-rows: 0fr; transition: grid-template-rows 0.32s ease-out`. Cuando `is-expanded` se agregaba, cambiaba a `grid-template-rows: 1fr`. Sin embargo, este patrón CSS Grid no es 100% fiable cuando el contenedor está dentro de otro grid (`catalog__category-items` también usa `grid-template-rows: 0fr → 1fr` para el acordeón de categorías). La anidación de grids con `grid-template-rows` causa que el navegador no calcule correctamente la altura del contenedor interno.

Además, el truco del sub-contenedor con `overflow: hidden; min-height: 0` no siempre funciona cuando hay múltiples niveles de anidación con `display: grid`.

### Solución planificada (3 intentos)

**Intento 1 — `data-action` con `closest`** (`catalog.js`): El listener buscaba `e.target.closest('[data-action="toggle-details"]')`. El atributo sí estaba en el HTML, pero el evento de clic no siempre llegaba correctamente porque el span ▼ no está dentro de un elemento con ese atributo de forma directa — el span está dentro del header que tiene el atributo. Teóricamente debería funcionar, pero en la práctica no.

**Intento 2 — Selector por clase con `stopPropagation`** (`catalog.js`): Cambió a `.promo-card__compact-header, .card__compact-header` como selector, y añadió `e.stopPropagation()`. Seguía sin funcionar. El análisis del código compilado confirmó que el listener y los selectores eran correctos.

**Intento 3 — Simplificar al máximo: `display: none/block` + JS directo (solución final)**:
Se cambió el enfoque completamente:
- JS: busca cualquier clic dentro de `.promo-card, .card`, excluye botones y acordeón de categorías, y togglea `is-expanded`. Además, **directamente setea `details.style.display = 'block'/'none'`** según el estado, sin depender de transiciones CSS.
- CSS: `.card__compact-details` y `.promo-card__compact-details` usan `display: none` por defecto en móvil, `display: block` en desktop, y `display: block` cuando el padre tiene `is-expanded`.
- Se eliminaron `display: grid`, `grid-template-rows`, `transition`, y `overflow: hidden` de los contenedores de detalles.

### Archivos modificados

- `src/js/catalog.js` — Listener simplificado: captura clics en `.promo-card, .card`, excluye botón y acordeón, togglea clase Y setea `display` directo
- `src/sass/components/_cards.scss` — `.card__compact-details` cambió de `display: grid; grid-template-rows: 0fr` a `display: none`
- `src/sass/pages/_catalog.scss` — `.promo-card__compact-details` mismo cambio. `__compact-details-inner` cambió `overflow: hidden` → `overflow: visible`

### Validación
- [x] `npm run build` → sin errores (560ms)
- [x] Vista móvil: Promos colapsadas (solo nombre + precio + botón + ▼). Al tocar se expanden con imagen + pieces + descripción
- [x] Botón "Agregar" funciona tanto colapsado como expandido
- [x] Desktop: sin cambios, todo visible **(se detectó bug: imágenes de promos muy grandes en desktop — corregido en Bugfix 2.12.4)**
- [x] `./init.sh` → 57/57 checks pasados

---

## 🐛 Bugfix 2.12.4: Imágenes de promos muy grandes en desktop (layout roto)

> **Problema reportado**: En desktop, las imágenes de las promos aparecen con tamaño desproporcionado (ocupan todo el ancho de la card con aspect-ratio 3/2). Antes de la Fase 2.12, las promos tenían un diseño horizontal con imagen de 200px fijo y descripción al lado.
>
> **Diagnóstico completo**: Documentado en `memory.md` → "Bugfix 2.12.4".

### Causa raíz

Los cambios de Fase 2.12 (vistas compactas) movieron la imagen-wrapper de la cabecera (`promo-card__compact-header`) al contenedor de detalles (`promo-card__compact-details`). En mobile está bien porque los detalles están colapsados por defecto (`display: none`). Pero en desktop, donde los detalles están siempre visibles (`display: block`), la imagen se renderiza con `width: 100%` y `aspect-ratio: 3/2` (definido en `__compact-details-inner .promo-card__image-wrapper`).

Además, el layout de `promo-card` cambió de `flex-direction: row` a `column`, eliminando el diseño horizontal.

### Solución planificada

### Paso 1 — Restaurar layout horizontal en desktop
- [x] `src/sass/pages/_catalog.scss` — `.promo-card` en `min-width: 768px`: `flex-direction: row`.
- [x] `__compact-header` en desktop: `flex: 1` para que ocupe el espacio disponible.
- [x] `__compact-details` en desktop: `display: flex; flex-direction: row; align-items: flex-start`.
- [x] `__compact-details-inner` en desktop: `display: flex; flex-direction: row; gap: var(--spacing-lg); padding: var(--spacing-md)`.
- [x] `.promo-card__image-wrapper` dentro de detalles en desktop: `width: 200px; flex-shrink: 0`.
- [x] `__desc` en desktop: `flex: 1; padding: 0` para que fluya al lado de la imagen.
- [x] Eliminado selector legacy `promo-card__image-wrapper` fuera de `__compact-details-inner` (ya no se usa).

### Paso 2 — Validación
- [x] `npm run build` → sin errores (567ms)
- [x] Desktop: promos con imagen de 200px a la izquierda, descripción a la derecha **(se detectó bug: header e imagen en la misma fila, texto deformado — corregido en Bugfix 2.12.5)**
- [x] Móvil: promos colapsadas, al expandir se ve imagen + descripción
- [x] `./init.sh` → 57/57 checks pasados

---

## 🐛 Bugfix 2.12.5: Layout de promos en desktop — header arriba, imagen+descripción abajo en fila

> **Problema reportado**: En desktop, las promos muestran el header (nombre + precio + botón) y los detalles (imagen + descripción) en la misma fila horizontal, porque `promo-card` tiene `flex-direction: row`. Esto hace que el texto se vea deformado y desordenado.
>
> **Diagnóstico completo**: Documentado en `memory.md` → "Bugfix 2.12.5".

### Causa raíz

El Bugfix 2.12.4 cambió `promo-card` a `flex-direction: row` en desktop para que la imagen de 200px y la descripción estuvieran en fila. Pero este cambio hizo que **header y detalles** también quedaran en fila, porque son hijos directos de `promo-card`:
```
promo-card (flex-direction: row) ← ambos hijos en fila
├── __compact-header (flex: 1) ← nombre + precio + botón
└── __compact-details (flex row) ← imagen + descripción
```
Header y detalles deben estar en columna. Solo dentro de detalles, imagen y descripción deben estar en fila.

### Solución

### Paso 1 — Cambiar `promo-card` a `flex-direction: column` en desktop
- [x] `src/sass/pages/_catalog.scss` — Eliminado `flex-direction: row` del media query. `promo-card` queda en `column` (valor por defecto).

### Paso 2 — Ajustar `__compact-header` en desktop
- [x] `src/sass/pages/_catalog.scss` — Eliminado `flex: 1` de `__compact-header` en desktop. El header ocupa su ancho natural.

### Paso 3 — Validación
- [x] `npm run build` → sin errores (584ms)
- [x] Desktop: header arriba, imagen 200px a la izquierda + descripción a la derecha
- [x] Móvil: promos colapsadas, al expandir imagen + descripción
- [x] `./init.sh` → 57/57 checks pasados

---

## 🐛 Bugfix 2.12.6: Eliminar badge de piezas sobre imagen de promos

> **Problema reportado**: En la carta categoría Promos, hay un badge rojo con la cantidad de piezas (ej. "13 pz.") superpuesto sobre la imagen de cada promo. Esto no aporta a la UX/UI y ensucia visualmente la navegación.
>
> **Diagnóstico completo**: Documentado en `memory.md` → "Bugfix 2.12.6".

### Causa raíz

Existen **dos** elementos que muestran las piezas en cada promo:

1. **Cabecera** (`catalog.js:76`): `<h3>Promo 1 — 13 pz.</h3>` — inline en el nombre, visible siempre. **Este se mantiene.**
2. **Badge sobre imagen** (`catalog.js:88`): `<span class="promo-card__pieces">13 pz.</span>` — badge rojo superpuesto en la esquina de la imagen. **Este se elimina.**

El badge sobre la imagen es redundante porque la cabecera ya muestra la cantidad de piezas inline en el nombre. En desktop, al estar la imagen siempre visible, el badge duplica información innecesariamente. En móvil, al expandir la promo, el badge aparece sobre la imagen pero la información ya está en la cabecera.

### Solución

### Paso 1 — Eliminar badge del template
- [x] `src/js/catalog.js` — Eliminada línea `<span class="promo-card__pieces">${promo.pieces} pz.</span>` del template de promo-card.

### Paso 2 — Limpiar CSS no usado
- [x] `src/sass/pages/_catalog.scss` — El selector `.promo-card__pieces` ya no existe (fue eliminado en Bugfix 2.12.4). Sin cambios necesarios.

### Paso 3 — Validación
- [x] `npm run build` → sin errores (587ms)
- [x] Desktop: promos sin badge rojo sobre la imagen
- [x] Móvil: promos colapsadas con "Promo 1 — 13 pz." en cabecera, al expandir imagen sin badge
- [x] `./init.sh` → 57/57 checks pasados

---

## 🐛 Bugfix 2.12.7: Nombre de producto cortado en cards regulares (desktop)

> **Problema reportado**: En desktop, en todas las categorías excepto Promos (Rolls a la Carta, Especiales, Hard Rolls, Al Plato, Tabla Massaro), el nombre del producto aparece cortado — solo se ven los primeros 2-3 caracteres — porque el título, el precio chip y el botón "Agregar" están todos en una misma fila flex sin suficiente espacio.
>
> **Diagnóstico completo**: Documentado en `memory.md` → "Bugfix 2.12.7".

### Causa raíz

La cabecera de las cards regulares (`card__compact-header`) usa `display: flex; flex-direction: row` con tres elementos en fila:

1. `card__compact-header-info` (flex: 1): título + meta (badges + precio)
2. `btn--primary`: botón "Agregar" (~85px de ancho mínimo)
3. `card__toggle-icon`: "▼" (oculto en desktop)

En desktop, la grid de catálogo (`catalog__grid`) tiene 3-4 columnas (a partir de 900px y 1200px). Cada card mide ~250-300px de ancho. Con el botón (~85px) y el precio chip (~70px con padding), al título le quedan ~80-100px. A `font-size: 1.25rem` (~20px) con `white-space: nowrap`, solo entran 4-5 caracteres antes de que `text-overflow: ellipsis` corte el nombre.

Las Promos no sufren este problema porque usan un layout diferente (imagen en cabecera compacta + detalles debajo) y ocupan todo el ancho del contenedor.

### Solución

### Paso 1 — Mover botón "Agregar" dentro de `card__compact-header-meta`
- [x] `src/js/catalog.js` — Botón "Agregar" movido a `card__compact-header-meta`, después del precio.

### Paso 2 — Cambiar layout de cabecera a column en desktop
- [x] `src/sass/components/_cards.scss` — `card__compact-header` en `min-width: 768px`: `flex-direction: column; align-items: stretch`.
- [x] `card__title` en desktop: `white-space: normal; overflow: visible` (en móvil se mantiene `nowrap` con ellipsis).

### Paso 3 — Validación
- [x] `npm run build` → sin errores (552ms)
- [x] Desktop: nombre de producto completo visible, precio y botón en fila debajo
- [x] Móvil: sin cambios, cabecera compacta con todo en fila
- [x] `./init.sh` → 57/57 checks pasados

---

## 🐛 Bugfix 2.12.8: Texto amarillo desalineado en cards regulares desktop

> **Problema reportado**: En desktop, en la categoría "Rolls a la Carta", el texto amarillo "Relleno: Pollo · Camarón · Kanikama · Salmón · Verdura" (`.card__variant-hint`) aparece desalineado entre tarjetas vecinas. Como todas las cards tienen 2 líneas de variant-hint, deberían alinearse al fondo de cada tarjeta para mejorar la UX visual.
>
> **Diagnóstico completo**: Documentado en `memory.md` → "Bugfix 2.12.8".

### Causa raíz

`card__compact-details-inner` no tiene `display: flex`, por lo que los elementos internos (imagen, descripción, variant-hint) fluyen en bloque normal. La descripción (`card__desc`) tiene longitud variable entre productos, lo que hace que el `variant-hint` quede a diferentes alturas en cada card.

### Solución (solo desktop — sin cambios en móvil)

### Paso 1 — Hacer que `card__compact-details-inner` use flex column en desktop
- [x] `src/sass/components/_cards.scss` — En `min-width: 768px`: `display: flex; flex-direction: column; flex: 1`.

### Paso 2 — Descripción con flex-grow en desktop
- [x] `card__desc` en `min-width: 768px`: `flex-grow: 1` para que ocupe el espacio sobrante.

### Paso 3 — Variant-hint al fondo en desktop
- [x] `card__variant-hint` en `min-width: 768px`: `margin-top: auto` para que quede al fondo.

### Paso 4 — Validación
- [x] `npm run build` → sin errores (599ms)
- [ ] Desktop: texto amarillo "Relleno: ..." alineado al fondo de todas las cards
- [ ] Móvil: sin cambios, variant-hint visible al expandir
- [x] `./init.sh` → 57/57 checks pasados

