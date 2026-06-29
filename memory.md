# Memoria Persistente

**Última actualización:** 2026-06-27

## Decisiones Técnicas Consolidadas
- **Stack Inicial**: Vanilla JS + Vite + Sass 7-1.
- **Evolución**: React y TypeScript serán añadidos cuando exista necesidad real de manejo de estado complejo (ej. checkout).
- **Zonas de Reparto MVP**: Fijo para Quilicura.
- **Admin**: Ruta bajo `/admin` en el mismo frontend para el MVP.
- **Temas**: Soporte obligatorio desde el inicio para light y dark theme (`_light.scss`, `_dark.scss`). **Por defecto**, la aplicación carga en modo oscuro (vía `data-theme="dark"` en la etiqueta HTML) para resaltar la estética de la marca.
- **Layout vs Components**: Formularios (`_forms.scss`) clasificados correctamente como componentes, no layout.
- **Regla de Comentarios HTML/CSS**: Es obligatorio documentar la estructura visual y de estilos con comentarios simples, explicativos y en Español.
- **Arquitectura Visual Inicializada**: Variables base de la marca (rojo, amarillo, verde), reseteo CSS moderno, tipografía importada (`Inter` y `Outfit`) y temas (Claro/Oscuro) mapeados a CSS Custom Properties en `src/sass`.
- **Layout y UI Base**: Implementado el contenedor global (`_grid.scss`), un cabezal fijo con *glassmorphism* (`_header.scss`) y botones interactivos primarios/secundarios con micro-animaciones (`_buttons.scss`), todos debidamente importados en el orquestador `app.scss`.
- **Catálogo de Productos**: Implementada grilla responsiva móvil-first (`_catalog.scss`) y tarjetas individuales de producto (`_cards.scss`) con micro-animaciones de elevación al hacer hover. Estructura HTML poblada con 4 productos de muestra basados en la carta.
- **Navegación Responsiva**: Implementado menú Hamburguesa para móviles controlado vía Vanilla JS (`is-open`). Utiliza `opacity`, `visibility` y `transform: translateY` en lugar de `clip-path` para garantizar total compatibilidad con navegadores móviles.
- **Iteración Visual (Identidad de Marca)**: Analizada carta de referencia (`template/`). Plan de 4 pasos definido en `task.md` para alinear el sitio a la estética Massaro. Assets generados con IA y copiados a `src/assets/img/`: `avocado-roll.webp`, `ebi-tempura.webp`, `furay-roll.webp`, `sashimi-salmon.webp`, `bg-bamboo.webp` y `logo_massaro.jpg`.
- **Optimización de Imágenes**: Todas las imágenes PNG fueron convertidas a WebP con calidad 82 usando `sharp-cli`. Reducción total de 3.73 MB a ~519 kB (**-86% de peso**). Referencias actualizadas en `index.html` y `_reset.scss`. Build de producción validado correctamente tras la conversión.
- **Paso 1 completado**: Fondo de bosque de bambú aplicado al `body` con overlay semi-transparente negro al 65% y `background-attachment: fixed`. Tema oscuro ajustado a tonos verde-oscuro (`$color-green-dark: #0d1f15`). Se agregaron CSS custom properties `--color-primary`, `--color-secondary` y `--color-accent` al tema oscuro para que las use el header y otros componentes. Variables `$color-green-dark` añadida a `_variables.scss`.
- **Paso 2 completado**: Fuente `Bebas Neue` añadida como `$font-display` e importada desde Google Fonts. Logo real (`logo_massaro.jpg`) reemplazó al texto "MASSAROSUSHI" en el header. Creada clase `.section-title` con Bebas Neue (3rem), letter-spacing 2px y text-shadow rojo para los títulos de sección. Aplicado a "Nuestra Carta" en el catálogo. `--font-display` registrado como CSS custom property en ambos temas.
- **Paso 3 completado**: Cards rediseñadas con glassmorphism oscuro (`background: color-mix`, `backdrop-filter: blur(8px)`). Imágenes reales IA (`avocado-roll.png`, `ebi-tempura.png`, `furay-roll.png`, `sashimi-salmon.png`) reemplazaron placeholders emoji, con aspect-ratio 3/2 y zoom al hover. Precio con estilo chip amarillo (`--color-secondary` de fondo, texto negro, border-radius pill) usando `--font-display`.
- **Paso 4 completado**: Sección Hero creada sobre el catálogo con logo grande centrado (220px), título "Sushi Artesanal" en Bebas Neue (4rem) con sombra roja dramática (`text-shadow: 0 0 30px rgba(220, 38, 38, 0.8), 2px 2px 0 #7f1d1d`) para máximo contraste sobre el bambú, subtítulo descriptivo y botón CTA grande "Ver Menú". Archivo `_hero.scss` creado en `pages/` e importado en `app.scss`. Clase `.btn--large` añadida a `_buttons.scss`.
## Opción A — Carta Real Completa (2026-06-11)
- **Datos de Menú Estáticos**: Creado `src/data/menu.js` con la carta oficial completa (~40 productos en 7 categorías: Rolls a la Carta, Especiales, Hard Rolls, Al Plato, Tabla Massaro, Promos, Adicionales). Cada producto incluye `id`, `name`, `description`, `price`, `category`, `image`, `badges` y soporte para `variants` (relleno a elección) y `pieces` (promos). Estructura preparada para migrar a API REST.
- **Imágenes por Categoría (Corregido)**: Los placeholders SVG originales fueron reemplazados por 7 imágenes hiperrealistas generadas con IA, convertidas a WebP (calidad 82) en `src/assets/img/categories/`: `rolls-carta.webp` (136 kB), `especiales.webp` (90 kB), `hard-rolls.webp` (105 kB), `al-plato.webp` (95 kB), `tabla-massaro.webp` (210 kB), `promos.webp` (226 kB), `adicionales.webp` (123 kB). Rutas actualizadas en `menu.js` (`rolls.webp` → `rolls-carta.webp`). SVGs viejos eliminados.
- **Tabs de Filtro (Corregido)**: Implementado `src/sass/components/_tabs.scss` con diseño minimalista (sin fondo rojo de píldora). El tab activo ahora usa borde inferior rojo (`border-bottom-color: var(--color-primary)`) y texto amarillo (`--color-secondary`), y al hacer hover tiene un sutil fondo semi-transparente. Mantiene scroll horizontal fluido en móvil. Creado `src/js/catalog.js` con renderizado dinámico y filtrado por categoría. Importado desde `src/main.js`.
- **Tarjetas Enriquecidas**: Agregados badges superpuestos en la imagen (Popular, Recomendado, Premium y contador de piezas). Hint de variantes de relleno en color amarillo. Estilos en `_cards.scss`.
- **Sección Promos**: Diseño de lista ampliada (`.promo-card`) con layout horizontal, imagen lateral, nombre en Bebas Neue, descripción, chip de piezas rojo y precio chip amarillo grande. Estilos en `_catalog.scss`.
- **Footer Completo (Corregido)**: Verificado e implementado en `index.html` y `src/sass/layout/_footer.scss`. El diseño ahora muestra el logo y nombre de la marca (`Massaro Sushi` en blanco con letter-spacing) alineados al centro en la parte superior, separados por una sutil línea roja (`var(--color-primary)` con transparencia). Debajo, un grid responsivo de 3 columnas: Delivery (Quilicura $2.000, Lun-Dom), Contacto (WhatsApp +56 9 7237 7458) y Síguenos (Facebook, Instagram). Finaliza con el copyright centrado.
- **Espaciado Inferior (Corrección Visual)**: Se agregó `padding-bottom: 5rem` a `.catalog` en `src/sass/pages/_catalog.scss` para separar las tarjetas de los productos del inicio del footer, permitiendo un "respiro visual" y evitando cortes abruptos.
- **Espaciado Interno del Footer (Corrección Visual)**: Se agregó la variable faltante `--spacing-2xl: #{var.$spacing-2xl};` al archivo base `src/sass/themes/_light.scss`. Además, a petición del usuario, el padding superior e inferior de `.footer` se ajustó a `var(--spacing-xl)` (2rem o 32px), proporcionando un respiro más equilibrado sin ocupar demasiado espacio en pantalla.
- **Alturas Deformadas del Grid (Corrección Visual)**: Se solucionó un bug del CSS Grid en `src/sass/pages/_catalog.scss` donde el bloque de `.catalog__promos` estiraba verticalmente a las tarjetas adyacentes en la pestaña "Todo". Se añadió `grid-column: 1 / -1;` para aislar el contenedor en su propia fila completa.
- **Navegación Rápida Móvil (Feature)**: Se implementó una botonera flotante (`src/sass/components/_floating-nav.scss` integrada en `index.html`) visible solo en dispositivos móviles (`max-width: 767px`). Esta botonera con estilo glassmorphism ofrece enlaces rápidos de anclaje hacia el "Inicio" y el "Menú", resolviendo problemas de UX al evitar scroll excesivo. Además se activó `scroll-behavior: smooth` global.
- **Filtro Móvil Select Nativo (Feature UX)**: Para mejorar la accesibilidad móvil y eliminar la fricción del scroll horizontal, se ocultaron las pestañas (`.catalog__tabs`) en `max-width: 767px` y se reemplazaron por un menú desplegable `<select class="catalog__select">` nativo. En `src/js/catalog.js` se sincronizó bidireccionalmente el valor del `<select>` con los tabs. En `src/data/menu.js` se movió la categoría "Promos" al inicio del arreglo para que aparezca como segunda opción por defecto después de "Todo".
- **Correcciones Estructurales Sass**: 
  - `layout/_index.scss` — Removidos forwards rotos a `forms`, `navbar`, `sidebar` (archivos inexistentes o mal ubicados).
  - `themes/_index.scss` — Corregido `@forward './default'` por `@forward './dark'` y `'./light'`.
  - `components/_index.scss` — Agregados forwards a `cards` y `tabs`.
  - `pages/_index.scss` — Agregados forwards a `hero` y `catalog`.
- **Validación**: Build de Vite exitoso (508ms, 7 módulos). `./init.sh` con 14/14 checks pasados (ampliado posteriormente a 31 checks).
- **Fix Scroll Horizontal Móvil**: Aplicadas correcciones para eliminar scroll horizontal no deseado. `_reset.scss`: `overflow-x: hidden` + `position: relative` + `width: 100%` en body, `background-attachment: scroll` en móvil. `_grid.scss`: `width: 100%` + `max-width: 100%` + `overflow-x: hidden` en `.app-wrapper`; `box-sizing: border-box` en `.container`. `_hero.scss`: `width: 100%` + `max-width: 100%` + `overflow-x: hidden` en hero. `_tabs.scss`: `overflow-y: hidden` + `max-width: 100%`. `_catalog.scss`: `width: 100%` + `max-width: 100%` en promo-card, `min-width: 0` en `__content`, imágenes reducidas en móvil, `flex-wrap: wrap` en footer de promo.

### Infraestructura (VPS + EasyPanel)

- **Configuración DNS Inicial**: Se inició la Fase 1 del Runbook de Infraestructura. Se obtuvo la IP pública del VPS (`89.117.32.46`) desde Hostinger. Se crearon exitosamente 4 registros tipo A en la zona de `cystec.cloud` mediante la API de Hostinger: `massaro.cystec.cloud`, `api.massaro.cystec.cloud`, `admin.massaro.cystec.cloud`, y `status.massaro.cystec.cloud`.
- **Build de Producción**: Se ejecutó `npm run build` exitosamente en el entorno local. Se validó la generación de la carpeta `/dist`, obteniendo archivos estáticos altamente optimizados: el CSS final pesa ~3.57 kB comprimido, el JS ~3.39 kB, y las imágenes mantienen soporte WebP, dejando el frontend listo para su inyección en Nginx (EasyPanel).
- **Despliegue GitOps**: Se configuró el repositorio de GitHub para sincronización automática con EasyPanel. Se crearon archivos `Dockerfile` (multi-stage con Alpine Node y Nginx) y `nginx.conf` (con reglas de enrutamiento SPA y headers de caché). El código se desplegó y se encuentra corriendo bajo Nginx.
- **Configuración de Dominio**: El dominio `massaro.cystec.cloud` se vinculó exitosamente.

## Scripts de Inicialización
- **`init.sh`**: Script de validación de entorno expandido de 14 a **31 checks**. Verifica:
  - Entorno: Node.js >= 20, NPM, dependencias
  - Archivos base: `package.json`, `vite.config.js`, `index.html`, `Dockerfile`, `nginx.conf`, `.gitignore`
  - Harness: `agents.md`, `memory.md`, `task.md`, `README.md`, `specs.md`, `infrastructure.md` (existencia + verifica que NO esté en git por seguridad)
  - Estructura frontend: `src/`, `main.js`, `js/`, `data/`, `menu.js`, `assets/img/`, `assets/icon/`, `sass/`, `app.scss`
  - Assets públicos: `favicon.png`, `favicon-32x32.png`, `apple-touch-icon.png`
  - Build: `npm run build` automático + validación de `dist/` y `dist/index.html`
- Última ejecución: **39/39 checks pasados, 0 fallos, 0 advertencias**.

## Documentación y Control Operativo (Runbook)
- **`infrastructure.md`**: Actualizado con IP real del VPS, tabla de registros DNS, detalle del servicio frontend (Dockerfile, nginx.conf, deploy manual), sección de favicons, pipeline de despliegue paso a paso, y bugs de infraestructura. Archivo en `.gitignore` por seguridad.
- **`specs.md`**: Actualizado al 2026-06-12: estructura de archivos refleja el estado real, tabla de diferencias corregida, checklist de despliegue con items marcados como completados/pendientes, fases de implementación con progreso.
- **Enlace de Conocimiento**: `specs.md` fue modificado para apuntar obligatoriamente a `infrastructure.md` como paso previo a codificar API o manejar servidores.
- **`README.md`**: Documentado con objetivos del proyecto, estructura simplificada, secciones del sitio, tecnologías usadas (con badges) y autor.

### Favicon (Identidad de Pestaña)

- **Implementado 2026-06-11**: Se generaron 3 formatos de favicon desde `src/assets/img/logo_massaro.jpg` usando `sharp-cli` (logo es 320x320 cuadrado, solo resize):
  - `public/favicon-32x32.png` (3.1 kB) — fallback escritorio
  - `public/favicon.png` (91 kB, 192x192) — Android/Chrome
  - `public/apple-touch-icon.png` (80 kB, 180x180) — iOS
- Se eliminaron `public/favicon.svg` y `public/icons.svg` (íconos genéricos de Vite).
- `index.html` actualizado: removido `<link>` SVG, añadidos 3 links con `sizes` y `rel` correctos.
- Build de producción validado (716ms, sin errores).
- Deploy manual en EasyPanel exitoso (commit `5478350`, build completado en ~7s).

### Auditoría de `.gitignore` (2026-06-12)

- Se realizó auditoría completa del `.gitignore`:
  - **Añadido**: `/infrastructure.md` — contiene datos sensibles de deploy (puertos, variables de entorno)
  - **Añadido**: `/agents.md`, `/specs.md`, `/init.sh` — archivos efímeros de agente que no deben committearse
  - **Añadido**: `/requeriments/` — typo español del directorio `requirements/` existente en disco
- No se detectaron `.env` ni secretos commiteados.
- `template/` y `agent/` correctamente ignorados (assets de referencia y skills IA).

## Bugs Conocidos y Gotchas
- **Bug de Menú Oculto en Móviles**: El uso de `clip-path` en contenedores con posicionamiento absoluto puede causar problemas de renderizado en algunos navegadores móviles (el menú no se muestra). *Solución*: Usar `opacity` y `visibility`.
- **Desplazamiento (Scroll) Horizontal No Deseado**: Las grillas o el padding de contenedores pueden empujar el viewport en móviles, cortando contenido a la izquierda. *Solución*: Mantener siempre `overflow-x: hidden` en el selector `body` (`_reset.scss`).
- **Bug de EasyPanel (Internal Server Error al agregar Dominio)**: Si se intenta agregar un dominio globalmente y la asociación falla, el registro queda parcialmente guardado (`_`) en la base de datos interna de EasyPanel, impidiendo agregarlo luego a un servicio específico de forma silenciosa (error 500 en tRPC). *Solución*: Ir a la lista global de "Dominios" en la barra lateral externa, eliminar el dominio fantasma conflictivo, y luego volver a crearlo desde dentro del menú del servicio específico.
- **Imágenes rotas en Producción (Assets Dinámicos de Vite)**: Si se referencian rutas de imágenes como simples cadenas de texto (ej. `'/src/assets/img/...'`) en archivos JS, el bundler de Vite las ignora en producción (Nginx) al no detectar una dependencia explícita. *Solución*: Utilizar `import imgName from '../assets/...'` al inicio del archivo JS y asignar esa variable, lo que obliga a Vite a hashear y empaquetar el asset en la carpeta `/dist/assets`.
- **Falso Positivo de Certificado Inválido (HTTPS-First)**: Al activar HTTPS en EasyPanel, el certificado de Let's Encrypt se emite correctamente para el dominio. Sin embargo, Traefik (proxy inverso) no fuerza la redirección de tráfico HTTP a HTTPS de manera predeterminada. Si un usuario (o el navegador por omisión) accede vía `http://`, se mostrará una advertencia de "Sitio No Seguro", aunque el panel del navegador indique "Certificate is valid". *Solución*: Configurar un Middleware de Redirección (HTTP a HTTPS) en EasyPanel o instruir a acceder siempre explícitamente con `https://`.

## Planificación de Próxima Fase (Fase 2)
- **Cierre de Fase 1**: Frontend estático, identidad visual (Favicon) y despliegue automatizado GitOps hacia EasyPanel/Hostinger finalizado exitosamente (2026-06-11).
- **Hacia el MVP Funcional**: Se estructuró en `task.md` la Fase 2, la cual dotará al sitio de comercio electrónico básico sin requerir desarrollo backend inicial. La arquitectura se basará en un Carrito Lateral de estado manejado con Vanilla JS (con soporte de `localStorage`), validación rigurosa de selección de componentes (ej: variante de relleno obligatorio en ciertos Rolls) y un motor de Checkout que consolide el pedido, calcule el recargo por despacho y dirija al usuario a un mensaje de WhatsApp preformateado. Se estableció un punto de control para evaluar si la complejidad de estado amerita migración a un framework declarativo (React/Vue).

---

## Sesión 2026-06-13 — Inicio de Fase 2: Carrito + Checkout WhatsApp

### Paso 1 — Módulo `cart.js` completado
- **Archivo creado**: `src/js/cart.js` (~100 líneas). Implementa:
  - Estado centralizado `{ items[], deliveryFee }` con funciones puras.
  - Persistencia en `localStorage` con clave `massaro-cart`.
  - Funciones: `initCart`, `getCart`, `addToCart`, `removeFromCart`, `updateQuantity`, `clearCart`, `getSubtotal`, `getTotal`, `getItemCount`.
  - Emisión de Custom Event `cart:updated` en cada cambio de estado.
  - En `addToCart`: si el producto ya existe con misma variante → incrementa cantidad.
- **`catalog.js`**: Integrado event delegation para botón "Agregar". Si el producto tiene `variants` → emite evento `modal:open-variant` (sin implementar aún). Si no → llama a `addToCart()` directo.
- **`main.js`**: Importado e inicializado `initCart()`.
- **Build**: ✅ `npm run build` exitoso (513ms, JS crece de 3.39 kB a 3.94 kB gzip).

### Paso 2 — UI del Carrito Lateral completado
- **Archivo creado**: `src/js/cart-ui.js`. Maneja:
  - Apertura/cierre del drawer con overlay (toggle body scroll).
  - Renderizado dinámico de items del carrito con botones +/- y eliminar.
  - Actualización del badge numérico en el header vía evento `cart:updated`.
  - Resumen con subtotal, despacho fijo ($2.000) y total.
- **Archivo creado**: `src/sass/components/_cart-drawer.scss`. Estilos glassmorphism para el drawer, items del carrito (imagen 64px, nombre, variante, controles de cantidad), resumen y botón checkout.
- **`index.html`**: Añadido ícono de carrito SVG con badge en header, overlay y estructura completa del drawer (cabecera, body scrollable, footer con resumen y botón).
- **`_header.scss`**: Añadidos estilos para `.cart-toggle` y `.cart-toggle__badge`.
- **`app.scss`**: Importado `@use 'components/cart-drawer'`.
- **Build**: ✅ `npm run build` exitoso (516ms, CSS 4.26 kB + JS 4.59 kB gzip).

### Paso 2.5 — Refactor UX: Adicionales eliminados del catálogo
- `menu.js`: Categoría `adicionales` eliminada del array `categories` (ya no aparece en tabs ni select móvil).
- Productos `salsas-extras`, `cambio-de-relleeno`, `despacho` marcados con `category: '_hidden'` para que no se rendericen en el catálogo.
- `getProductsByCategory()` modificada: cuando no hay filtro (vista "Todo"), excluye productos `_hidden`.
- Despacho ($2.000) ya está como línea fija en el resumen del carrito (Paso 2).

### Paso 3 — Modal de Selección de Variantes completado
- **Archivo creado**: `src/sass/components/_modal.scss`. Estilos glassmorphism dark, animación de escala, radio buttons con estilo `is-selected`, botón agregar deshabilitado visualmente si no hay selección.
- **Archivo creado**: `src/js/modal.js`. Escucha evento `modal:open-variant` (emitido por `catalog.js`), renderiza las variantes del producto, pre-selecciona la primera, y al confirmar llama a `addToCart(product, variantName)`.
- **HTML**: Modal añadido en `index.html` con overlay, header, body dinámico y footer con botón "Agregar al Carrito".
- Integrado en `main.js` via `initModal()`.
- Build: ✅ sin errores.

### Paso 4 — Checkout WhatsApp completado
- **Archivo creado**: `src/sass/components/_checkout.scss`. Panel centrado glassmorphism, formulario con inputs estilizados dark, resumen del pedido, línea de total con despacho incluido.
- **Archivo creado**: `src/js/checkout.js`. Funciones:
  - `openCheckout()` — oculta el drawer, muestra el panel de checkout con resumen del pedido.
  - `closeCheckout()` — cierra el panel y restaura scroll.
  - `buildWhatsAppMessage()` — formato markdown-style con items, subtotal, despacho, total, datos del cliente.
  - `sendWhatsApp()` — valida nombre y dirección requeridos, construye URL `wa.me/56972377458?text=...`, limpia carrito y abre WhatsApp.
- **HTML**: Sección checkout en `index.html` con resumen de items, formulario (nombre, dirección, notas), botón enviar.
- Integrado en `main.js` via `initCheckout()`.
- Build: ✅ sin errores (JS 5.60 kB gzip, CSS 4.91 kB gzip).

### Paso 5 — Deuda Técnica Evaluada
- **Veredicto**: No se requiere migración a React. Los 4 módulos JS se mantienen en ~85-145 líneas cada uno, la comunicación entre módulos es desacoplada via Custom Events, y no hay bugs de re-renderización. Vanilla JS + Custom Events es suficiente para el MVP.

### 🐛 Bug Detectado: Botones "Agregar" no funcionales (2026-06-13)
- **Reporte**: El usuario reportó que los botones "Agregar" de las Promos NO funcionan, y también los de productos desde "Ceviche Mixto" hasta "Tabla Massaro".
- **Diagnóstico** (análisis de código en `catalog.js`):
  - El event delegation (línea 162-170) usa: `const card = btn.closest('[data-product-id]')`.
  - Si `closest` no encuentra un ancestro con `data-product-id`, retorna `null` y la función termina sin hacer nada (línea 167).
  - Todos los productos que NO son promos se renderizan como `<article class="card" data-product-id="${product.id}">` → **funcionan correctamente**.
  - Las Promos se renderizan como `<article class="promo-card">` **sin** `data-product-id` → **no funcionan**.
  - Tras preguntar al usuario, confirmó que los productos regulares (Rolls a la Carta, Especiales, etc.) **sí funcionan en todas las vistas**. La confusión vino de que al no funcionar las Promos (que son las primeras en "Todo"), parecía que todo fallaba.
- **Causa raíz**: Omisión del atributo `data-product-id` en el template de `promo-card` dentro de `renderCatalog()` en `catalog.js` (línea 84).
- **Solución**: Añadir `data-product-id="${promo.id}"` al `<article class="promo-card">` en la línea 84.
- **Verificación en build**: El archivo compilado contiene `promo-card" data-product-id="${e.id}"` — confirmado.
- **Logs de debug agregados**: Se añadieron `console.log`/`console.warn` en `catalog.js` para rastrear el flujo del event delegation y `handleAddToCart` (luego removidos).
- **Corrección aplicada**: Se corrigieron 2 bugs:
  1. Promos no tenían `data-product-id` en `catalog.js` → añadido.
  2. El badge visual del carrito no se veía porque `position: absolute` se calculaba con coordenadas incorrectas debido al `position: sticky` del header. **Solución**: Eliminado `position: absolute` del badge, ahora usa flujo normal flexbox con `inline-flex` y borde contrastante.
  3. UX mejorada: al agregar un producto, el drawer del carrito se abre automáticamente (`openDrawer()` en el evento `cart:updated`), dando feedback inmediato al usuario.
- **Estado final**: Todos los productos (Promos, Rolls a la Carta, Especiales, Hard Rolls, Al Plato, Tabla Massara) agregan items al carrito correctamente. Build y checks 39/39 OK.

### Sesión 2026-06-13 — Documentación y Base de Skills

### Informe de Entendimiento del Proyecto
- **`informe_entendimiento.md`** creado en la raíz del proyecto. Documento Markdown que sintetiza el dominio del negocio, el estado actual del frontend, la arquitectura objetivo full-stack, las reglas del Harness Engineering, la infraestructura operativa (DNS, VPS, EasyPanel), los bugs conocidos, las fases de implementación y las próximas acciones prioritarias. Generado por Antigravity con base en la lectura completa de `README.md`, `agents.md`, `specs.md`, `infrastructure.md` y `memory.md`.

### Base de Skills IA — Carpeta `agent/` inicializada
- La carpeta `agent/` estaba **vacía**. Se crearon **11 skills** + 1 índice maestro (`README.md`), constituyendo la base de conocimiento operativo validado del proyecto para uso de agentes IA.

| Skill | Archivo | Contenido |
|---|---|---|
| Índice | `README.md` | Tabla de cuándo usar cada skill por tipo de tarea |
| 01 | `skill-01-sass-71-component.md` | Protocolo Sass 7-1: carpetas, `@forward`, Custom Properties, mobile-first, errores comunes |
| 02 | `skill-02-image-optimization.md` | sharp-cli WebP (calidad 82), import estático obligatorio en JS para Vite producción |
| 03 | `skill-03-deploy-easypanel.md` | Pipeline GitOps completo + 2 bugs EasyPanel con soluciones verificadas + checklist |
| 04 | `skill-04-menu-data-structure.md` | Estructura de objetos producto/promo, variantes, funciones utilitarias, typo conocido en ID |
| 05 | `skill-05-cart-architecture.md` | Arquitectura carrito Fase 2: estado, localStorage, validación variantes, WhatsApp checkout |
| 06 | `skill-06-dns-hostinger-mcp.md` | Registros DNS actuales + comandos MCP Hostinger para gestión de `cystec.cloud` |
| 07 | `skill-07-responsive-design.md` | Breakpoints, menú hamburguesa, tabs vs select móvil, fix scroll horizontal, grids |
| 08 | `skill-08-backend-api-fastify.md` | Stack backend, env vars exactas (contrato EasyPanel), servicios Docker, idempotencia |
| 09 | `skill-09-database-schema.md` | SQL completo 17 tablas PostgreSQL + seeds iniciales + convención de migraciones |
| 10 | `skill-10-js-module-pattern.md` | Módulos ES6, exports nombrados, Custom Events entre módulos, límite 200-300 líneas |
| 11 | `skill-11-design-tokens.md` | Paleta Massaro, tipografías, glassmorphism, text-shadow rojo, chips de precio, micro-animaciones |

- **Decisión de diseño**: Los skills están organizados por fase del proyecto. Los skills 01, 02, 03, 04, 07 y 11 son activos en la **Fase 1** (completada). Los skills 05 y 10 son los relevantes para la **Fase 2** (carrito). Los skills 08 y 09 son para la **Fase 3** (backend). El skill 06 es transversal (DNS/infraestructura).
- **Convención de naming**: `skill-NN-nombre-descriptivo.md` en kebab-case, numerados correlativamente para facilitar referencia cruzada.

### Refactorización UX de "Adicionales"
- **Diagnóstico**: La categoría "Adicionales" mezclaba ítems operacionales (Despacho, Cambio de relleno) y upsells (Salsas) en el mismo nivel visual que los productos comestibles, generando ruido cognitivo y fricción para el usuario.
- **Decisión de diseño**:
  1. Se acordó eliminar la categoría "Adicionales" del catálogo visual.
  2. El "Despacho Quilicura ($2.000)" pasará a ser una línea fija en el resumen del pedido.
  3. El "Cambio de relleno (+$1.000)" se implementará como modificador en el modal de variantes.
  4. Las "Salsas extras ($500)" se ofrecerán como *upsell* en el carrito.
- **Acción**: Se agregó el paso 2.5 en `task.md` para implementar estos cambios durante la Fase 2, ejecutándose justo después de haber construido el "esqueleto" visual del carrito.

### Paso 4.5 — Mejora UX: Retiro en Local vs Delivery (Implementado)
- **Problema detectado**: El costo de despacho ($2.000) se sumaba de forma rígida y obligatoria a todos los pedidos, ignorando que un volumen importante de clientes de barrio prefiere la modalidad "Retiro en Local" (Pick-up) con costo de despacho $0.
- **Análisis de Mercado**: Basado en las mejores prácticas de plataformas LatAm (Justo, PedidosYa), la decisión de envío debe ser el *primer* paso del checkout mediante un control visual explícito.
- **Decisiones técnicas acordadas e implementadas**:
  1. `cart.js`: Variable `deliveryMode` ('delivery' default), `setDeliveryMode()`, `getDeliveryMode()`, `getTotal()` modificado.
  2. **No persiste en localStorage**: siempre empieza en Delivery al recargar.
  3. **Drawer sincronizado**: `setDeliveryMode()` emite `cart:updated`, cart-ui.js recalcula automáticamente.
  4. `checkout.js`: `initDeliveryModeButtons()` maneja el segmented control, `toggleAddressField()` oculta dirección en Retiro, `renderCheckoutSummary()` oculta línea de despacho, `sendWhatsApp()` solo valida dirección en Delivery.
  5. `buildWhatsAppMessage()`: incluye `🛵 Delivery + dirección` o `🏪 Retiro en Local`.
  6. `_checkout.scss`: estilos para el segmented control (píldora, activo rojo/amarillo, inactivo oscuro).
  7. `index.html`: contenedor del segmented control, clase `checkout__field--address` en campo dirección, clase `checkout__summary-line--delivery` en línea de despacho.
- **Archivos modificados**: `src/js/cart.js`, `src/js/checkout.js`, `index.html`, `src/sass/components/_checkout.scss`.
- **Build**: ✅ 534ms. Sin cambios en `cart-ui.js` (ya sincronizado via `cart:updated`).

### Paso 6 — Actualización de `init.sh` (31 → 39 checks) ✅
- **Diagnóstico**: El script `init.sh` fue creado durante la Fase 1 con 31 checks que validaban estructura base, archivos Harness y assets públicos. Tras la Fase 2, existen nuevos archivos fundamentales que no están cubiertos: módulos JS del carrito (`cart.js`, `cart-ui.js`, `modal.js`, `checkout.js`), componentes Sass del carrito (`_cart-drawer.scss`, `_modal.scss`, `_checkout.scss`) y el índice de skills IA (`agent/README.md`).
- **Decisión**: Expandir `init.sh` a 39 checks añadiendo 8 nuevas validaciones.
- **Nuevos checks añadidos**: `src/js/cart.js`, `src/js/cart-ui.js`, `src/js/modal.js`, `src/js/checkout.js`, `src/sass/components/_cart-drawer.scss`, `src/sass/components/_modal.scss`, `src/sass/components/_checkout.scss`, `agent/README.md`.
- **Validación**: `./init.sh` ejecutado → 39/39 checks pasados, 0 fallos, 0 advertencias.

### Paso 7 — Actualización de `specs.md` e `infrastructure.md` ✅ (Implementado)
- **Diagnóstico**: Auditados ambos archivos contra el estado real del proyecto. `specs.md` contenía estructura de archivos desactualizada (faltaban `src/js/`, `agent/`, `informe_entendimiento.md`), tabla de diferencias incompleta, contador de checks incorrecto (14→39), y checklist sin validaciones de Fase 2. `infrastructure.md` estaba mayormente correcto pero faltaba describir capacidades de carrito, checkout y Delivery/Retiro, y el checklist de QA no cubría los módulos JS de Fase 2.
- **Cambios en `specs.md`**:
  - Fecha de revisión actualizada a 2026-06-13.
  - Estructura de archivos reescrita con carpetas `src/js/` (4 módulos), `agent/` (skills IA) y `informe_entendimiento.md`.
  - Tabla de diferencias ampliada con módulos JS y componentes Sass de Fase 2.
  - Contador de `init.sh` corregido a 39 checks.
  - Sección Frontend reescrita: responsabilidades actuales con carrito, modal, checkout WhatsApp y selector Delivery/Retiro.
  - Fases de implementación reordenadas: Fase 2 ahora es "Frontend funcional" con 8 sub-tareas marcadas como completadas.
  - Checklist de despliegue dividido en sub-secciones: Infraestructura, Frontend (Fase 1), Frontend (Fase 2), Backend.
- **Cambios en `infrastructure.md`**:
  - Servicio Frontend: nueva tabla con stack, módulos JS, componentes Sass, características.
  - Checklist de QA: nueva sub-sección "Frontend — Funcional (Fase 2)" con 7 checks detallados.
- **Validación**: Archivos leídos y verificados contra estructura real del código.

### Paso 8 — Actualización de Skills IA en `agent/` ✅ (Implementado)
- **Diagnóstico**: Auditados 11 skills + `README.md` de `agent/` contra el estado actual del proyecto. Skills 01, 02, 04, 06, 07, 08, 09, 11 estaban actualizados. 3 skills necesitaban cambios por lecciones aprendidas en Fase 2, y 1 tenía un cambio menor.
- **Skills actualizados**:
  - **`agent/README.md`**: Fase 2 de "En progreso" a "Completada".
  - **`skill-05-cart-architecture.md`**: Agregado `deliveryMode`, `cart-ui.js` como módulo UI separado, `notifyCartChange()` y evento `cart:updated`, `modal.js` como módulo separado, y `buildWhatsAppMessage()` actualizado con modo Delivery/Retiro. También se actualizó la sección de validación de variantes para reflejar que `catalog.js` emite `modal:open-variant` en lugar de llamar directamente a un modal.
  - **`skill-10-js-module-pattern.md`**: Estructura de `src/js/` ahora incluye `cart-ui.js`. Ejemplo de `main.js` refleja los 5 módulos reales con orden de inicialización. Nuevo patrón de separación UI/Estado documentado. Tabla de eventos Custom Events agregada (`cart:updated`, `modal:open-variant`).
  - **`skill-03-deploy-easypanel.md`** (menor): "31/31 checks" → "39/39 checks".
- **Skills sin cambios**: 01 (Sass), 02 (imágenes), 04 (menú), 06 (DNS), 07 (responsive), 08 (backend), 09 (BD), 11 (design tokens).

### Mejora UX: Postergación del Costo de Despacho al Checkout
- **Problema detectado**: Tras implementar la selección Delivery/Retiro pre-seleccionada en Delivery, el carrito lateral ("Mini-Cart") comenzó a mostrar inmediatamente el ítem "Despacho $2.000" y a sumarlo al total antes de que el usuario siquiera entrara al checkout. Esto generaba sorpresa prematura y fricción, haciendo parecer que el cobro era obligatorio o escondido.
- **Decisión de Diseño**:
  1. El cajón lateral del carrito debe mostrar *exclusivamente* la suma de los productos (Subtotal puro).
  2. La línea de "Despacho" se elimina visualmente de esta etapa preliminar.
  3. Se añadirá un disclaimer sutil: "Los costos de envío se calcularán en el checkout".
  4. La sorpresa del costo (y el poder de elegir evadirlo seleccionando Retiro) queda confinada a la pantalla de Checkout, donde es el estándar en e-commerce.
- **Acción (Ejecutada)**: Se modificó `index.html` para dejar solo el Subtotal con la nota aclaratoria, y se removió la inyección de `getTotal()` en `cart-ui.js`. Paso 4.6 completado en `task.md`.

### 🐛 Bugfix: Header Sticky (2026-06-14)
- **Problema**: El header tenía `position: sticky; top: 0;` pero se desplazaba fuera de la pantalla al hacer scroll.
- **Diagnóstico**: La propiedad `position: sticky` falla cuando un ancestro tiene una propiedad `overflow` que corta el flujo (como `hidden`, `auto`, o `scroll`). En este caso, tanto `.app-wrapper` (en `_grid.scss`) como `body` (en `_reset.scss`) tenían `overflow-x: hidden;`. Esto hacía que el header se "pegara" al contenedor `.app-wrapper` en lugar de a la ventana del navegador (viewport).
- **Solución**: Se eliminó `overflow-x: hidden;` de `.app-wrapper` y `body`.
- **Resultado**: El header ahora es verdaderamente fijo al hacer scroll en todas las resoluciones, manteniendo el carrito siempre accesible. Build OK.

### Mejora UX: Microcopy LatAm (2026-06-14)
- **Problema**: El término "Ir al Checkout" y la mención de "checkout" en el texto de envío generaban fricción. En LatAm (especialmente en pedidos por WhatsApp), "checkout" es un término técnico ajeno que además puede dar a entender un pago obligatorio e inmediato con tarjeta.
- **Solución implementada**: 
  - Se reemplazó el botón principal del carrito lateral por **"Continuar pedido"** (estándar de la industria en LatAm como PedidosYa, indica que viene un paso posterior y no un pago forzado).
  - Se modificó la nota legal a: "Los costos de envío se calcularán en el siguiente paso".
- **Resultado**: Tono más amigable, local y claro. Paso 4.7 completado.

### Mejora UX: Eliminación de Navegación Flotante ✅
- **Problema detectado**: Con la reparación del header para que sea "sticky" de forma correcta (visible el 100% del tiempo), la botonera flotante inferior (`.floating-nav` con "Inicio" y "Menú") en móviles se volvió completamente redundante.
- **Análisis**: Esta redundancia generaba desperdicio de espacio vertical vital en pantallas pequeñas, tapando parte de las tarjetas de productos sin aportar valor extra, ya que el header superior ya contiene el ancla al inicio (logo) y acceso al menú de navegación.
- **Decisión de Diseño**: Eliminar de raíz la botonera flotante.
- **Ejecutado**: Eliminado bloque `<nav class="floating-nav">` de `index.html` y componente Sass. Paso 4.8 completado.

### Mejora UX: Auto-cierre del Menú Hamburguesa (2026-06-14)
- **Problema**: Al abrir el menú de hamburguesa en móvil y hacer clic en un ancla ("Pedir Ahora"), la pantalla se desplazaba al catálogo, pero el menú superpuesto no se cerraba, obligando al usuario a cerrarlo manualmente ("doble clic mental").
- **Solución implementada**: Se añadió un event listener a cada enlace `<a>` dentro de `mainNav` en `main.js`. Ahora, al hacer clic en cualquier enlace interno, la clase `.is-open` se remueve automáticamente.
- **Resultado**: Navegación fluida ("One-Page Experience"), donde el menú desaparece de inmediato tras la interacción. Paso 4.9 completado.

### Consolidación Documental y de Skills IA (2026-06-14)
- **Problema**: Las recientes lecciones de UX Móvil y Microcopy no estaban documentadas en los "skills" del agente, lo que podía llevar a futuros errores.
- **Acción (Ejecutada)**: Se aprobó y ejecutó el Plan Documental (Paso 4.10):
  1. Se actualizó `skill-07-responsive-design.md` documentando el bug de `overflow-x` afectando a `position: sticky`, la regla del auto-cierre del menú hamburguesa, y el principio de "Conservation of Real Estate" para evitar botoneras redundantes.
  2. Se actualizó `skill-11-design-tokens.md` incorporando la sección "Microcopy LatAm" (evitar la palabra Checkout, usar "Continuar pedido").
  3. Se actualizó `specs.md` para reflejar estas integraciones en la Fase 2.
- **Validación**: `init.sh` e `infrastructure.md` se mantuvieron sin cambios ya que no sufrieron alteraciones operativas. El Harness vuelve a estar 100% sincronizado.
- **Validación**: Build OK (542ms), `./init.sh` 39/39 checks OK.

### Paso 4.11 — Extras y Modificadores (2026-06-14) — ITERACIÓN COMPLETA

#### Fase 1: Diseño inicial (4.11) — Implementado y luego reemplazado

El primer diseño implementó un sistema de **modificadores estructurados** con array `modifiers` global en `menu.js`, modal genérico para todos los productos, checkbox "Cambio de relleno" en el modal, y buttons de modifiers por item en el carrito. Build: 556ms, 39/39 checks.

**Problema detectado**: El flujo no se alineaba con la experiencia de mercado de cadenas de comida rápida (Papa Johns, Domino's, PedidosYa). El modal al agregar interrumpía el flujo de compra para productos sin variants, y los checkboxes estructurados eran muy rígidos para la realidad artesanal de las sustituciones en tiendas de barrio.

#### Fase 2: Refactor UX (4.11.10) — Basado en mercado real

**Análisis de mercado vs. Papa Johns (referencia del usuario):**
- Papa Johns agrega directo al carrito, modal solo para selección obligatoria (masa/tamaño) — **adoptado**
- Papa Johns tiene "Instrucciones especiales" como texto libre en el checkout — **adoptado como modal en carrito**
- Papa Johns NO tiene botón "Personalizar" por item — **adoptado (personalización única por pedido)**
- Papa Johns requiere teléfono en checkout — **adoptado**

**Decisiones de diseño finales:**
1. **Modal solo para variants obligatorias** (Rolls a la Carta). Products sin variants → agregan directo.
2. **Selector de salsas en el drawer** con controles −/cantidad/+ para Salsa de Soya y Salsa Agridulce ($500 c/u). Array `salsaOptions` extensible en `menu.js`.
3. **Personalización como texto libre** mediante botón "📝 Personalizar pedido (+$1.000)" en el drawer que abre modal con textarea. Placeholder: `"sin nori", "cambiar tempura de kanikama por pollo", etc.`
4. **Cargo único de $1.000** por pedido si hay nota de personalización (no por producto).
5. **Teléfono obligatorio** en checkout para que el local pueda contactar al cliente ante cualquier problema con la personalización.
6. **Salsas y personalización son independientes**: salsas se cobran por unidad ($500 c/u), personalización es un cargo fijo ($1.000) si hay texto.

**Archivos modificados (9):**
- `catalog.js` — Revertida bifurcación original (variants → modal, no-variants → directo)
- `modal.js` — Revertido a solo-variants (eliminados modifiers)
- `cart.js` — Nuevo estado: salsas[], customizationNote. Funciones: addSalsa, removeSalsa, getSalsas, getSalsaTotal, setCustomizationNote, getCustomizationNote. getTotal() recalculado.
- `menu.js` — modifiers → salsaOptions (2 salsas base, extensible)
- `cart-ui.js` — Selector de salsas inline, botón personalizar, modal logic, customization badge
- `index.html` — Modal personalización, contenedores salsas/customization, campo teléfono
- `_cart-drawer.scss` — Estilos para salsas, textarea, badge de personalización
- `checkout.js` — Teléfono obligatorio, salsas en resumen, notas en WhatsApp
- `task.md` + `memory.md` — Documentación actualizada

**Validación final:**
- `npm run build`: ✅ 534ms, JS 6.70 kB gzip, CSS 5.05 kB gzip
- `./init.sh`: ✅ 39/39 checks pasados, 0 fallos, 0 advertencias

### Paso 4.11.11 — Totalización en tiempo real del carrito (2026-06-14) ✅

**Problema**: El subtotal del drawer no reflejaba salsas ni personalización en tiempo real. El cliente veía "+$500" al lado de cada salsa pero el subtotal no cambiaba.

**Solución**: Nueva función `updateSummary()` en `cart-ui.js` que renderiza dinámicamente las líneas de salsas y personalización en el summary del drawer. Se llama desde `cart:updated`, `renderCartItems()`, y al abrir el drawer.

**Archivos modificados**: `index.html` (nuevas líneas en summary), `cart-ui.js` (updateSummary).

**Validación**: Build 550ms, JS 6.84 kB gzip. 39/39 checks.

### Paso 4.11.12 — Checkout: Reflejar salsas y personalización (2026-06-14) ✅

**Bug reportado**: El checkout no mostraba líneas separadas de salsas ni personalización, generando confusión.

**Solución**: Agregadas líneas `#checkout-salsas-line` y `#checkout-custom-line` en el summary del checkout. `renderCheckoutSummary()` en `checkout.js` ahora muestra/oculta estas líneas según el estado, y renderiza la nota de personalización como un item en la lista.

**Fix adicional**: Se agregó `getSalsaTotal` al import de `checkout.js` (faltaba, causaba `ReferenceError`).

**Archivos modificados**: `index.html` (nuevas líneas HTML), `checkout.js` (renderCheckoutSummary + import fix).

**Validación**: Build 540ms, JS 6.95 kB gzip. 44/44 checks.

### Actualización de `init.sh` (39 → 44 checks)

**Diagnóstico**: Los pasos 4.11.10-4.11.12 introdujeron nuevas estructuras de datos y funciones que no estaban cubiertas por las validaciones existentes.

**Nuevos checks añadidos**:
1. `salsaOptions en menu.js` — verifica que el array de salsas existe
2. `addSalsa exportada en cart.js` — verifica que la función de agregar salsas está exportada
3. `setCustomizationNote exportada en cart.js` — verifica que la función de personalización está exportada
4. `customization-modal en index.html` — verifica que el modal de personalización existe en el DOM
5. `checkout-phone en index.html` — verifica que el campo teléfono existe en el checkout

**Total actual**: 44 checks. Build 525ms, JS 6.86 kB gzip.

### Actualización de `specs.md` e `infrastructure.md` (Post-Fase 2 completa) ✅

**Diagnóstico**: Tras los pasos 4.11.10-4.11.12 y la expansión de `init.sh` a 44 checks, ambos documentos estaban desactualizados. Faltaban las nuevas capacidades: selector de salsas en el drawer, personalización como texto libre, teléfono obligatorio, totalización en tiempo real, y líneas de salsas/personalización en el checkout.

**Cambios en `specs.md`** (6 actualizaciones):
1. Estado de implementación actualizado con salsas, personalización, teléfono y totalización.
2. Contador `init.sh`: 39 → 44 checks.
3. Responsabilidades del frontend: selector salsas, personalización, totalización, teléfono, resumen checkout.
4. Funcionalidades Fase 2: 4 nuevas capacidades documentadas.
5. Fase 2 checklist: de 8 a 12 items (selector salsas, personalización, teléfono, totalización).
6. Checklist de despliegue Fase 2: de 7 a 12 items detallados.

**Cambios en `infrastructure.md`** (4 actualizaciones):
1. Módulos JS descripción actualizada con salsas y personalización.
2. Checks: 39 → 44 checks, características expandidas.
3. Checklist QA: checks actualizados a 44.
4. Checklist funcional Fase 2: de 6 a 9 items detallados.

### Actualización de `README.md` (Post-Fase 2 completa) ✅

**Diagnóstico**: README.md mencionaba "botonera flotante" (eliminada en Paso 4.8), solo listaba `catalog.js` en `src/js/`, y no documentaba el carrito, salsas, personalización ni checkout.

**Cambios realizados** (3 actualizaciones):
1. **Objetivos**: Reemplazado "botonera flotante" por "Carrito lateral (localStorage, badge)", "Salsas y personalización (selector con cantidad, texto libre)", "Checkout WhatsApp (Delivery/Retiro, teléfono)".
2. **Estructura**: `src/js/` ampliado con los 5 módulos reales: `catalog.js`, `cart.js`, `cart-ui.js`, `modal.js`, `checkout.js`.
3. **Secciones del sitio**: Agregadas "Carrito lateral" (drawer con selector de salsas y personalización) y "Checkout" (formulario con nombre, teléfono, Delivery/Retiro y envío a WhatsApp).

### Actualización de `agent/README.md` (Skills IA) ✅

**Diagnóstico**: El índice de skills IA (`agent/README.md`) no mencionaba las nuevas capacidades de salsas, personalización, teléfono y totalización en la Fase 2. Tampoco referenciaba `salsaOptions` en Skill 04 ni las nuevas funciones exportadas en Skill 10.

**Cambios realizados** (6 actualizaciones):
1. **Fecha**: 2026-06-14.
2. **Tabla de consulta**: Nueva fila "Agregar/modificar opciones de salsas → Skill 04".
3. **Skill 04**: Ahora cubre `salsaOptions` (array extensible).
4. **Skill 05**: Ahora cubre `addSalsa`, `removeSalsa`, `setCustomizationNote`, selector de salsas, personalización texto libre, teléfono, totalización en tiempo real.
5. **Skill 10**: Ahora cubre funciones clave exportadas como `updateSummary()`, `getSalsaTotal()`, `setCustomizationNote()`.
6. **Skill 11**: Ahora cubre estilos del selector de salsas, modal de personalización, resumen checkout con líneas dinámicas.
7. **Fase 2**: Actualizada a "Carrito + Salsas + Personalización + Checkout WhatsApp + Delivery/Retiro".

### Cierre de Fase 2 — Estado final del proyecto

**Frontend operativo completo:**
- Catálogo con filtros por categoría (tabs desktop + select móvil)
- Carrito lateral persistente (localStorage, badge, drawer)
- Variantes obligatorias para Rolls a la Carta (modal)
- Selector de salsas en el drawer (Soya, Agridulce, extensible, $500 c/u)
- Personalización como texto libre (+$1.000 por pedido)
- Totalización en tiempo real en drawer y checkout
- Checkout WhatsApp con nombre, teléfono obligatorio, dirección (solo Delivery), notas
- Mensaje WhatsApp con detalle completo: items, salsas, personalización, teléfono, modo de entrega
- Selector Delivery/Retiro en Local

**Documentación sincronizada:**
- `specs.md` ✅ — Blueprint técnico actualizado con todas las capacidades Fase 2
- `infrastructure.md` ✅ — Runbook actualizado con 44 checks y características expandidas
- `agent/README.md` ✅ — Skills IA actualizados con salsas, personalización y totalización
- `task.md` ✅ — Todos los pasos planificados y ejecutados registrados
- `memory.md` ✅ — Memoria persistente con todas las decisiones y razonamientos
- `init.sh` ✅ — 44/44 checks validando entorno, estructura, funciones exportadas y elementos HTML clave

---

## Planificación de Fase 3 — Backend API (2026-06-14)

### Contexto y motivación
- **Problema**: Tras completar Fase 2, el frontend es funcional pero los pedidos no quedan registrados en ningún sistema. Todo depende de que el dueño responda WhatsApp. No hay historial, ni analytics, ni base para un panel admin.
- **Objetivo de Fase 3**: Instalar el motor de datos real en el VPS. Al finalizar, los pedidos se persisten en PostgreSQL para tener historial completo, sin romper el flujo WhatsApp que ya funciona y que el dueño conoce.

### Decisiones de diseño aprobadas por el usuario

#### 1. Monorepo (carpeta `/api` en `massaro-sushi`)
- **Aprobado**: ✅ (2026-06-14)
- **Razón**: Un solo `git push` sincroniza frontend y backend. EasyPanel puede construir imágenes Docker independientes desde subcarpetas del mismo repo usando el parámetro `Build Path`. Mantiene el contexto de negocio unificado y simplifica el Harness Engineering (un solo `task.md`, un solo `init.sh`).
- **Alternativa descartada**: Repo separado — añade complejidad operativa (dos tokens GitHub, dos pipelines, dos sets de documentación) sin beneficio en este tamaño de proyecto.

#### 2. Enfoque híbrido: PostgreSQL + WhatsApp
- **Aprobado**: ✅ (2026-06-14)
- **Razón**: El dueño ya tiene un flujo operativo real con WhatsApp que funciona. Romperlo requeriría entrenamiento, cambio de hábito y arriesgar pedidos. El enfoque híbrido agrega valor (historial, analytics) sin fricción operativa: los pedidos se persisten en BD **y** se envían a WhatsApp exactamente como hoy.
- **Implementación**: `checkout.js` llama primero a `POST /orders` (registra en BD), y si la llamada tiene éxito o falla, continúa igual hacia WhatsApp. Degradación elegante garantizada.

#### 3. Sin ORM — SQL directo con `pg`
- **Razón**: El VPS tiene 4 GB RAM compartidos entre todos los servicios. Un ORM como Prisma añade ~50-100 MB de overhead de runtime y complejidad de migrations innecesaria para ~10 endpoints bien definidos. Con SQL directo, el equipo tiene control total sobre los queries y los índices.

#### 4. Sin pago online en Fase 3
- **Razón**: La integración con Transbank/Khipu requiere certificados, cuenta comercial, ambiente sandbox y pruebas de integración que merecen una fase dedicada. En Quilicura el pago en efectivo o transferencia al momento de la entrega es el estándar del mercado. Se implementa en Fase 5.

### Arquitectura de la degradación elegante

```
Usuario presiona "Enviar pedido"
  │
  ├── 1. POST /orders (API)
  │     ├── Éxito → orderId guardado → continúa a WhatsApp
  │     └── Error/Timeout → ignora → continúa a WhatsApp igualmente
  │
  └── 2. Abre WhatsApp con mensaje preformateado (siempre ocurre)
```

Esta arquitectura garantiza que:
- Nunca se pierde un pedido por un problema de la API.
- Cuando la API funciona, el pedido queda registrado en PostgreSQL.
- El dueño no necesita saber si la API respondió: sigue usando WhatsApp.

### Principio de recalculación de precios en el servidor
El frontend calcula totales para mostrar al usuario, pero **la API recalcula el total de forma independiente** antes de persistir en BD. Esto evita manipulación de precios desde el cliente (ej. alguien que intercepte la petición y cambie el precio). El total del mensaje WhatsApp (del frontend) y el total en BD pueden diferir levemente si hay cambios de precios — el del servidor es el correcto.

### Próximos pasos (pendientes de ejecución)
- Pasos 3.1 al 3.7 registrados en `task.md` — **pendientes de ejecución, en espera de aprobación del usuario**.

---

### 🐛 Bugfix: Espaciado excesivo entre header, hero y footer (2026-06-27) — SOLUCIÓN FINAL

**Problema**: Tras múltiples iteraciones, el espacio entre el hero y el copyright del footer seguía siendo excesivo en móvil.

**Diagnóstico raíz (3er intento)**: El layout `.app-wrapper (flex column, min-height: 100dvh) > header + main-content + footer` combinaba `flex-grow: 1` en `.main-content` con `margin-top: auto` en `.footer`. Cuando el hero no tenía altura forzada (`flex: 1` removido), `.main-content` se estiraba con `flex-grow: 1` para llenar el viewport, pero el hero solo ocupaba su altura natural (~300-400px). El espacio restante dentro de `.main-content` quedaba vacío, y el footer con `border-top` quedaba muy por debajo del hero. Intentos previos (reducir margin/padding a 0) no funcionaban porque el culpable era el `flex-grow` estirando `.main-content`.

**Solución final**: Restaurar `flex: 1` en el hero para que sea él quien se estire dentro de `.main-content` y ocupe exactamente el espacio entre header y footer. Eliminar `margin-top: auto` del footer (ya no es necesario). El hero vuelve a llenar el viewport, pero ahora sin contenido del footer asomándose detrás porque en móvil `.footer__info` está oculto y el footer solo muestra el copyright con un `border-top` delgado y `padding-top: var(--spacing-xs)`.

**Archivos modificados**:
1. `src/sass/layout/_grid.scss` — `.main-content` cambió de `flex-grow: 1` a `flex: 1` (equivalente a `flex-grow: 1` + `flex-shrink: 1` + `flex-basis: 0`, más predecible en flex column).
2. `src/sass/pages/_hero.scss` — `.hero` recuperó `flex: 1` para estirarse dentro de main-content.
3. `src/sass/layout/_footer.scss` — Se eliminó `margin-top: auto` del footer. Padding en móvil a `0`, `gap` de `.footer__inner` a `0`, `padding-top` de `.footer__bottom` a `var(--spacing-xs)`. En desktop se mantienen los valores originales.

**Resultado final**: El hero ocupa exactamente el viewport menos el header y el footer delgado con copyright. Sin espacios muertos, sin footer cortado, sin scroll innecesario.

### Mejora UX Móvil: Footer como Sección Independiente — Vista Información (2026-06-27)

**Problema**: En móvil, el footer con información operativa (Delivery, Contacto, Redes) aparece justo debajo del hero. Aunque se redujo su tamaño, sigue compitiendo visualmente con el hero, que debería ser la carta de presentación limpia e impactante.

**Análisis de mercado (niusushi.cl)**: En la vista móvil de niusushi.cl, la información del negocio no está en el footer de la página principal. Está en una sección independiente accesible desde la navegación. El hero ocupa toda la pantalla sin distracciones, con solo la marca, un mensaje y un CTA.

**Decisión de diseño**: Eliminar el footer informativo del layout principal en móvil y convertirlo en una vista SPA independiente (`#info-section`) accesible desde el menú hamburguesa mediante un enlace "Información". Esto mantiene la coherencia con el patrón SPA ya implementado (hero ↔ catálogo ↔ información).

**Comportamiento resultante**:
- **Móvil — Hero**: Footer invisible. Solo hero con logo, título y CTA. Header sticky con logo, hamburguesa y carrito.
- **Móvil — Menú → "Información"**: Se oculta hero, se muestra `#info-section` con Delivery, Contacto, Redes y Copyright. Logo del header vuelve al hero.
- **Desktop**: Footer se mantiene exactamente igual que antes (info + copyright), visible siempre.

**Archivos a modificar**:
- `index.html` — Nuevo enlace "Información" en nav, nueva `#info-section`, footer simplificado en móvil.
- `src/main.js` — Lógica SPA para vista de información.
- `src/sass/layout/_footer.scss` — Ocultar `.footer__info` en móvil.
- Nuevo `src/sass/pages/_info.scss` — Estilos de la sección de información.
- `src/sass/app.scss` — Importar `info`.

### Mejora UX Footer: Hero sin Footer Cortado + Footer Compacto (2026-06-27)

**Problema**: Con el hero configurado con `flex: 1` entre header y footer, en viewports donde el contenido real del hero (logo 160px + título 2.8rem + subtítulo + botón) era más bajo que el espacio disponible, el footer se asomaba detrás del hero mostrando solo su borde superior. Esto daba una sensación visual "sucia" y poco profesional.

**Análisis de mercado (niusushi.cl)**: Los referentes del mercado no fuerzan el hero a ocupar el 100% del viewport. En su lugar, usan un hero con altura natural determinada por su contenido, con amplio padding interior, y el footer se ve completo solo al hacer scroll. Esto evita el problema del "footer cortado" y da una experiencia más limpia.

**Decisión de diseño**: Combinación de las dos alternativas del usuario:
1. **Hero con altura natural**: Cambiar de `flex: 1` a altura determinada por el contenido con `padding: var(--spacing-2xl)` vertical y `margin-bottom` para separar del footer. El hero se ve completo, centrado, y el footer queda debajo sin asomarse.
2. **Footer compacto**: Reducir la tipografía del footer (títulos de `1rem` a `0.85rem`, items de `0.9rem` a `0.8rem`) y el espaciado interno y entre columnas. Esto hace que el grid de 3 columnas (Delivery, Contacto, Síguenos) se vea más denso, alineado horizontalmente, y profesional.

**Archivos modificados**:
- `src/sass/pages/_hero.scss` — Hero pasa de `flex: 1` a altura natural con padding generoso.
- `src/sass/layout/_footer.scss` — Footer compactado: padding reducido, tipografía más pequeña, gap entre columnas reducido.

### 🐛 Bugfix: Parpadeo al hacer clic en el logo del header (2026-06-27)

**Problema**: En desktop, al hacer clic en el logo de Massaro del header, la pantalla parpadeaba/blanqueaba antes de mostrar el hero.

**Diagnóstico**: El logo es `<a href="/" id="btn-show-hero">`. El listener JS ejecutaba `showHero()` pero nunca llamaba a `e.preventDefault()`. El navegador, al detectar un clic en un `<a href="/">`, intentaba navegar a la raíz, lo que en un SPA servido con Nginx significaba una petición HTTP que reiniciaba la aplicación momentáneamente (parpadeo). Lo mismo aplicaba para `btnOrderNow` y otros enlaces del nav.

**Solución**: Agregar `e.preventDefault()` en todos los listeners de enlaces del nav (`btnShowMenu`, `btnShowHero`, `btnShowInfo`, `btnOrderNow`). La lógica SPA corre limpia, sin recarga.

**Archivos modificados**:
- `src/main.js` — Todos los listeners de enlaces ahora reciben el evento y llaman a `e.preventDefault()`.

### Scroll vertical innecesario en vista móvil — Hero padding reducido (2026-06-27)

**Problema**: En viewports móviles pequeños, el hero con `padding: var(--spacing-2xl)` (~3rem arriba y abajo) y gap interno `var(--spacing-lg)` sumaban demasiada altura vertical, superando los 100dvh y obligando al usuario a hacer scroll innecesario.

**Solución**: Reducir el padding del hero en móvil para que sea simétrico con el footer:
- En móviles ≤480px: `padding: 0 var(--spacing-md) var(--spacing-xs)` — sin padding superior (el contenido arranca justo debajo del header), mínimo padding inferior (`~0.25rem`) simétrico al `padding-top: var(--spacing-xs)` del copyright del footer.
- Gap interno de `hero__inner` reducido de `var(--spacing-lg)` a `var(--spacing-md)` en móviles pequeños.

**Archivos modificados**:
- `src/sass/pages/_hero.scss` — Padding del hero y gap interno ajustados para móvil.

### Actualización de Skills IA — Skill 07, Skill 10 y nuevo Skill 12 (2026-06-27)

**Diagnóstico**: Los cambios recientes (SPA con 3 vistas, preventDefault en enlaces, footer como sección independiente, sidebar desktop + acordeón móvil, espaciado simétrico hero-footer) no estaban documentados en ningún skill, lo que podía llevar a errores si otro agente IA intentaba modificar estos componentes sin contexto.

**Skills actualizados**:
- **Skill 07** (Responsive Design): Añadidas 3 nuevas secciones:
  1. "Footer como sección SPA independiente en móvil" — CSS para ocultar `.footer__info` en móvil, CSS para `#info-section` con clase `info-section--active`, y lógica JS con detección de viewport.
  2. "Espaciado simétrico hero-footer en móvil" — Regla de padding mínimo y simétrico, ejemplos de `_hero.scss` y `_footer.scss`.
  3. "Catálogo — Sidebar (Desktop) y Acordeón (Móvil)" — Layout del body, sidebar sticky, acordeón con cierre mutuo, ejemplos CSS completos.
- **Skill 10** (JS Module Pattern): Reescrito el ejemplo de `main.js` con el estado real del proyecto (incluye `renderCatalog`, `initCatalogSidebar`, `initSpaNavigation`). Nueva sección "Patrón SPA" con 5 reglas: `hideAllSections()`, `preventDefault()` obligatorio en enlaces `<a>`, detección de viewport, `scrollTo` smooth, auto-cierre del menú hamburguesa.
- **Skill 12** (Nuevo — Patrón SPA con Vanilla JS): Creado `skill-12-spa-vanilla-js.md` con la arquitectura completa de vistas intercambiables, clases CSS de activación (`d-none`, `catalog--active`, `info-section--active`), layout flex column, reglas críticas y checklist de navegación.
- **agent/README.md**: Fecha actualizada a 2026-06-27, nueva fila en tabla de consulta para Skill 12, descripción del nuevo skill, nueva fase 2.5 en tabla de fases.

### Expansión de init.sh (44 → 53 checks) — Auditoría de cobertura (2026-06-27)

**Diagnóstico**: Se realizó una auditoría completa del script `init.sh` comparando los 44 checks existentes contra la estructura real del proyecto. Se identificaron 9 archivos/componentes nuevos o preexistentes que no estaban cubiertos: `src/js/catalog.js`, `src/sass/components/_tabs.scss`, `src/sass/components/_cards.scss`, `src/sass/pages/_hero.scss`, `src/sass/pages/_catalog.scss`, `src/sass/pages/_info.scss`, `agent/skill-12-spa-vanilla-js.md`, y elementos HTML `info-section` y `btn-order-now`.

**Decisión**: Expandir `init.sh` a 53 checks añadiendo 9 nuevas validaciones. No se eliminó ningún check existente, todos siguen siendo válidos.

**Nuevos checks añadidos**:
1. `src/js/catalog.js existe` — Módulo core de renderizado del catálogo
2. `_tabs.scss existe` — Componente de tabs
3. `_cards.scss existe` — Componente de cards
4. `_hero.scss existe` — Página del hero
5. `_catalog.scss existe` — Página del catálogo
6. `_info.scss existe` — Nueva página de info-section
7. `info-section en index.html` — Elemento HTML de la sección de información
8. `btn-order-now en index.html` — Botón de navegación rápida al pedido
9. `agent/skill-12-spa-vanilla-js.md existe` — Nuevo skill 12

**Validación**: `./init.sh` ejecutado → 53/53 checks pasados, 0 fallos, 0 advertencias.

### Auditoría y actualización de specs.md e infrastructure.md (2026-06-27)

**Diagnóstico**: Se auditaron ambos documentos contra el estado real del proyecto tras la Fase 2.5. Ambos estaban desactualizados: no reflejaban la navegación SPA, el sidebar/acordeón, la info-section, el preventDefault, el espaciado simétrico hero-footer, ni la expansión de `init.sh` a 53 checks.

**Cambios en `specs.md`** (8 actualizaciones):
1. Estado de implementación actualizado a 2026-06-27, incluyendo Fase 2.5.
2. Estructura de archivos reescrita: eliminado `_floating-nav.scss`, `_home.scss`; agregados `_info.scss`, `skill-12`; descripción de `catalog.js` actualizada. Contador de skills: 11 → 12.
3. `app.scss`: eliminado `@use 'components/floating-nav'`, agregado `@use 'pages/info'`.
4. Punto de entrada JS: actualizado con `initSpaNavigation()`, `renderCatalog()`, `initCatalogSidebar()` y documentación de preventDefault.
5. `init.sh`: 44 → 53 checks.
6. Frontend responsabilidades: actualizadas con info-section, navegación SPA, sidebar/acordeón.
7. Nuevas funcionalidades Fase 2.5 documentadas (11 items).
8. Checklist de despliegue Fase 2: init.sh actualizado a 53 checks.

**Cambios en `infrastructure.md`** (5 actualizaciones):
1. Módulos JS: agregado `catalog.js` a la lista (5 módulos ahora).
2. Componentes Sass: lista completa con `_tabs.scss`, `_cards.scss`, `_hero.scss`, `_catalog.scss`, `_info.scss`.
3. Validación: 44/44 → 53/53 checks.
4. Características frontend: agregadas navegación SPA, sidebar, acordeón, info-section, espaciado simétrico.
5. Checklist QA: checks actualizados a 53, nueva sub-sección "Frontend — Funcional (Fase 2.5)" con 8 items detallados.

### Refactor Menú Hamburguesa: "Información" → "Nosotros" + "Pedir Ahora" funcional (2026-06-27)

**Problema**: El menú hamburguesa tenía "Información" como enlace redundante. "Nosotros" no hacía nada (ancla `#nosotros` inexistente). "Pedir Ahora" no llevaba a ningún lado (`href="#"`). Esto generaba confusión y dos elementos muertos en la navegación.

**Decisión**: Eliminar "Información" y asignar su listener (`showInfo`) al enlace "Nosotros". El botón "Pedir Ahora" ahora ejecuta `showMenu()` para abrir el catálogo. Tanto en móvil como en desktop.

**Archivos modificados**:
- `index.html` — Eliminado `<a href="#info" id="btn-show-info">Información</a>`. Agregado `id="btn-show-info"` a "Nosotros". Agregado `id="btn-order-now"` a "Pedir Ahora".
- `main.js` — Capturado `#btn-order-now` y asignado `showMenu()`.

**Resultado**:
- **Móvil — Menú**: Menú | Nosotros (abre info-section) | Pedir Ahora (abre catálogo)
- **Desktop**: Menú | Nosotros | [Pedir Ahora]

### Cierre de Fase 2.5 — Estado consolidado (2026-06-27)

**Hitos completados en esta sesión**:
1. **Fase 2.5 (SPA Views + Sidebar Desktop + Acordeón Móvil)**: Navegación SPA con 3 vistas intercambiables, sidebar sticky en desktop, acordeón con cierre mutuo en móvil. `renderCatalog()` ahora inyecta una sola vez.
2. **Footer como sección independiente**: Info del negocio movida a `#info-section`, oculta en móvil, accesible desde "Nosotros". En desktop "Nosotros" scrollea al footer.
3. **Refactor menú hamburguesa**: Eliminado "Información" redundante, "Nosotros" ahora funcional, "Pedir Ahora" abre catálogo.
4. **preventDefault en navegación**: Todos los enlaces del nav ahora usan `e.preventDefault()` para evitar recargas/parpadeo.
5. **Espaciado simétrico hero-footer**: Hero con `flex: 1`, padding mínimo en móvil, footer sin `margin-top: auto`.
6. **init.sh expandido**: 44 → 53 checks (agregados catalog.js, _tabs.scss, _cards.scss, _hero.scss, _catalog.scss, _info.scss, info-section HTML, btn-order-now, skill-12).
7. **Skills IA actualizados**: Skill 07 y Skill 10 extendidos. Nuevo Skill 12 (Patrón SPA).
8. **specs.md e infrastructure.md**: Auditados y actualizados con todos los cambios de Fase 2.5.

**Documentación actualizada**: `task.md` ✅ — `memory.md` ✅ — `specs.md` ✅ — `infrastructure.md` ✅ — `agent/README.md` ✅ — `init.sh` (53/53) ✅

### Ejecución Fase 2.6 — Pulido Premium UX (2026-06-27)

**Implementado**:
1. **Transiciones SPA**: keyframes `fadeIn`, `fadeInUp` en `_animations.scss`. Hero con `transition: opacity 0.3s` + `fadeIn`. Catalog e info-section con `fadeIn 0.35s`. Cards y promos con `fadeInUp` escalonado por nth-child.
2. **Toast**: Nuevo `src/js/toast.js` con `showToast()`. Nuevo `src/sass/components/_toast.scss` (glassmorphism, animación toastIn/toastOut). Integrado en `catalog.js` y `modal.js`. Auto-open del drawer desactivado.
3. **FAB Móvil**: Nuevo `src/sass/components/_fab.scss` (full-width, fixed bottom, glassmorphism rojo). Elemento `#fab-cart` en `index.html`. `updateFab()` en `cart-ui.js` muestra/oculta con total formateado.
4. **Acordeón Fluido**: CSS Grid `0fr → 1fr` con transición. Inner wrapper `catalog__category-items-inner` con `overflow: hidden; min-height: 0`.
5. **Flexbox Wrap**: `.card__footer` con `flex-wrap: wrap` y `flex-grow: 1` en botón.

**Archivos creados**: `src/js/toast.js`, `src/sass/components/_toast.scss`, `src/sass/components/_fab.scss`.

**Archivos modificados**: `index.html`, `src/sass/app.scss`, `src/js/catalog.js`, `src/js/modal.js`, `src/js/cart-ui.js`, `src/sass/components/_cards.scss`, `src/sass/pages/_catalog.scss`.

**Validación**: `npm run build` (591ms) ✅ — `./init.sh` (53/53) ✅

### Ejecución Fase 2.7 — Microcopy Toast (2026-06-27)

**Implementado**: Mensaje del toast estandarizado a `"✅ Tu selección se ha agregado al carrito"` en `catalog.js` y `modal.js`.

**Validación**: Build OK — init.sh 53/53 ✅

### Bugfix: FAB sin click listener — no abre el carrito (2026-06-27)

**Problema**: La franja roja inferior (FAB) con el total del pedido se mostraba correctamente al agregar productos, pero al hacer clic sobre ella no abría el drawer del carrito. No hacía nada.

**Diagnóstico**: La función `updateFab()` en `cart-ui.js` se encargaba de mostrar/ocultar el FAB y actualizar su texto, pero nunca se le asignó un event listener `click` que llamara a `openDrawer()`. El FAB era puramente decorativo.

**Análisis de mercado**: En PedidosYa, UberEats, Rappi y Cornershop, el FAB/banner inferior siempre abre el carrito al hacer clic. Es el comportamiento estándar: "Ver mi pedido" → lleva al resumen.

**Solución**: En `initCartUI()`, capturar `#fab-cart` y asignarle `fab.addEventListener('click', openDrawer)`.

**Archivos modificados**: `src/js/cart-ui.js` — Agregado event listener para abrir el drawer al hacer clic en el FAB.

**Validación**: `npm run build` ✅ — `./init.sh` 57/57 ✅

### Bugfix: FAB fantasma "mobile-fab" sin estilos (2026-06-27)

**Problema**: En la esquina inferior izquierda de la vista móvil aparecía un elemento deforme sin diseño con el texto "🛒 Ver mi pedido 0". Arruinaba la estética y desconfiguraba el layout móvil.

**Diagnóstico**: El HTML contenía dos FABs:
1. `#mobile-fab` (legacy del otro modelo IA) — sin estilos CSS, sin archivo `_mobile-fab.scss`, con clase `is-hidden` que no tenía definición CSS.
2. `#fab-cart` (FAB actual) — con estilos en `_fab.scss`, clase `.fab`, glassmorphism.

`updateFab()` en `cart-ui.js` solo usaba `#fab-cart`, pero `#mobile-fab` quedaba visible en el DOM renderizado como un botón nativo sin estilos.

**Solución**: Eliminar el bloque completo de `#mobile-fab` del `index.html` (4 líneas: button, icon, text, count).

**Archivos modificados**: `index.html` — Eliminado bloque legacy `#mobile-fab`.

### Eliminación del filtro "Todo" del sidebar (Fase 2.9 — 2026-06-27)

**Problema**: El sidebar del catálogo tenía un botón "Todo" como primera opción. Al cargar la página, "Todo" aparecía como botón activo pero la lógica de inicialización forzaba que solo la categoría "Promos" fuera visible. Esto generaba una contradicción visual (botón activo vs contenido visible) y confundía al usuario. Además, "Todo" mezclaba todas las categorías sin un orden claro, algo que las plataformas de referencia no hacen.

**Análisis de mercado**: niusushi.cl, PedidosYa y Rappi no tienen filtro "Todo". La categoría por defecto es la más relevante (Promos/Destacados), y el usuario navega por las categorías específicas.

**Decisión**: Eliminar el botón "Todo" del sidebar. Promos queda como la categoría activa por defecto, tanto en desktop (sidebar) como en móvil (acordeón expandido).

**Archivos modificados**: `src/js/catalog.js` — Eliminado bloque de creación del botón "Todo". Ahora el primer elemento del array `categories` (Promos) se crea con `--active`. Eliminada condición `!category` en el click handler. Simplificada inicialización de desktop.

**Validación**: `npm run build` (584ms) ✅ — `./init.sh` 53/53 ✅

### Eliminación de Toast Redundante (Fase 2.8 — 2026-06-27)

**Problema**: El toast de "agregado al carrito" resultó redundante con el badge del header (que se actualiza instantáneamente al hacer clic en "Agregar") y el FAB móvil (que aparece en la parte inferior con el total actualizado). Tres elementos de feedback para una misma acción: badge, FAB y toast.

**Análisis de mercado (referencia validada)**:
| Plataforma | Feedback al agregar al carrito |
|---|---|
| PedidosYa | Badge se actualiza + micro-animación. Sin toast |
| Rappi | Badge se actualiza. Sin toast |
| UberEats | Badge con rebote + FAB con total. Sin toast |
| Cornershop | Badge + FAB. Sin toast |

Ninguna de las plataformas líderes en Latinoamérica usa toast para este feedback. Confían en el badge (feedback visual inmediato en el header) y el FAB (feedback de conversión con el total).

**Decisión**: Eliminar el componente Toast por completo. Esto simplifica el código, elimina 3 archivos (toast.js, _toast.scss, contenedor HTML) y reduce el peso del bundle.

**Archivos eliminados**: `src/js/toast.js`, `src/sass/components/_toast.scss`.

**Archivos modificados**: `index.html` (eliminado toast-container), `src/sass/app.scss` (eliminado import), `src/js/catalog.js` (eliminado import y llamada), `src/js/modal.js` (eliminado import y llamada), `src/js/cart-ui.js` (eliminado import legacy).

**Validación**: `npm run build` ✅ — `./init.sh` 53/53 ✅

---

## Razonamiento Técnico — Optimización UX SPA y Acordeón (Fase 2.5)

### Contexto y Requerimiento
Tras evaluar la navegación inicial de la tienda móvil, se concluyó que mostrar el menú completo (`<section id="menu">`) bajo la portada obligaba a los usuarios a realizar un *scroll* excesivo e innecesario, sobrecargando la vista inicial. Referenciando el diseño de `niusushi.cl`, el usuario solicitó optimizar la UX móvil para mostrar primero el "Hero Section" de forma exclusiva y desplegar el catálogo bajo demanda. Posteriormente, al evaluar la versión de escritorio del mismo referente, se identificó que la navegación en 2 columnas (Sidebar + Contenido) era más eficiente que las pestañas (Tabs) superiores, lo cual derivó en una refactorización de layout full-stack.

### Decisiones de Diseño e Ingeniería

**1. Intercambio de Vistas (SPA Behavior)**
- **Problema:** En páginas estáticas sin router (como este MVP), cambiar visualmente de "Inicio" a "Catálogo" de manera abrupta suele hacerse con enlaces de ancla (anchor links) que hacen un scroll súbito.
- **Decisión:** Al presionar los botones "Ver Carta" o "Menú", se interceptará el evento para alternar la visibilidad entre el bloque `.hero` y `#menu` mediante CSS (`display: none` / `block`), además de realizar un `scrollTo(0,0)`. Esto imita el comportamiento ágil y sin fricción de una Single Page Application real, mejorando radicalmente la percepción de velocidad de la plataforma.

**2. Sidebar Layout (Desktop)**
- **Decisión:** Sustituir la navegación mediante pestañas (Tabs) por una barra lateral (`Sidebar`) a la izquierda.
- **Ventaja Técnica:** Los layouts de *Sidebar* escalan infinitamente frente a la cantidad de categorías. En un Tab Layout, si las categorías exceden el ancho de pantalla, se obliga a incorporar scroll horizontal (aumentando la fricción en Desktop). Con un Sidebar, la lista fluye libremente y se fija en pantalla (`position: sticky`) para acompañar la vista del catálogo.

**3. Acordeón Vertical Exclusivo (Móvil)**
- **Problema:** El selector nativo `<select>` en móviles no permitía previsualizar de un vistazo qué categorías existían sin interactuar primero.
- **Decisión:** Implementar un **Acordeón Clásico**. En este diseño, el código renderiza *todas* las categorías en el DOM bajo la forma de contenedores `<div class="catalog__category-group">`. El contenido se oculta vía CSS (`display: none`) salvo para el elemento que contiene la clase `.is-expanded`.
- **Lógica de Estado Mutuamente Excluyente:** Se ha estipulado (a petición explícita del usuario) que **solo una categoría pueda estar expandida a la vez en dispositivos móviles**. Si un grupo se expande, JS buscará activamente iterar y remover `.is-expanded` de todos los grupos inactivos, priorizando el estado compacto de la interfaz. La categoría "Promos" se define como el valor por defecto `.is-expanded` (producto top o *Best Seller*).

**4. Optimización de Renderizado (El fin de la re-renderización)**
- **Nuevo Paradigma (Fase 2.5):** Ahora, `renderCatalog()` se invoca **una sola vez** al inicio. Inyecta todas las categorías agrupadas en el DOM. El filtrado (tanto el Sidebar en Desktop como el Acordeón en Móvil) pasa a ser **puramente visual**: un evento añade la clase `.is-active-tab` o `.is-expanded` al grupo, y CSS dicta su visibilidad. Esto es muchísimo más ligero computacionalmente y libre de parpadeos.

---

## 🐛 Bugfix: Botón "Continuar pedido" entrecortado en Samsung A52 (2026-06-28)

### Reporte
En un Samsung A52 con Chrome, al agregar **Promo 1** al carrito y abrir el drawer, el botón "Continuar pedido" en el footer del carrito se ve entrecortado/clippeado. En otros viewports (iPhone XR, iPhone SE, inspector Chrome) no se reproduce. Inicialmente se pensó que era específico de Promo 1, pero el análisis reveló que es un bug de layout que se manifiesta con **1 solo item** en el carrito en viewports Android donde `100vh` > viewport real.

### Causa raíz (múltiple)

**Causa 1 — `height: 100vh` en el drawer** (`src/sass/components/_cart-drawer.scss:26`):
En Chrome para Android, `100vh` NO descuenta la barra de direcciones ni la barra de navegación inferior (~56-80px + ~48px). El drawer se renderiza más alto que el viewport real, y el footer queda clippeado en la parte inferior. La solución moderna es `100dvh` (dynamic viewport height, Chrome 108+).

**Causa 2 — Footer, salsas y personalización están FUERA del scroll container** (`index.html:285-311`):
La estructura HTML del drawer es:
```
cart-drawer (flex column, height: 100vh)
├── __header (fijo)
├── __body (flex: 1, overflow-y: auto) ← solo esto scrollea
├── #cart-salsas ← FUERA del body
├── #cart-customization ← FUERA del body
└── __footer ← FUERA del body
```
Cuando solo hay 1 item en el carrito, `__body` con `flex: 1` se estira ocupando todo el espacio disponible. Las secciones `#cart-salsas`, `#cart-customization` y `__footer` se empujan debajo del viewport. Como no hay scroll en esas secciones, el botón queda invisible/clippeado. Con múltiples items el body se llena más y el footer alcanza a verse.

**Causa 3 — Sin `env(safe-area-inset-bottom)`**: No hay padding para la zona de navegación gestual de Android.

**Causa 4 — `document.body.style.overflow = 'hidden'`** (`cart-ui.js:81`): Bloquea el scroll del body, pero el drawer no maneja correctamente el overflow del footer.

### Por qué solo con Promo 1
No es un bug de Promo 1 per se. Es que al tener **1 solo item** (Promo 1 recién agregada, sin salsas ni personalización aún), el `__body` tiene poca altura real y `flex: 1` lo estira al máximo, empujando el footer fuera de los límites del `100vh`. Con Promo 1 + salsas + personalización, o con otras promos que tienen descripciones más largas en el drawer (no, la descripción no aparece en el drawer, solo el nombre), el comportamiento sería el mismo si también se tiene 1 solo item.

### Solución planificada

**Paso 1 — Cambiar `100vh` a `100dvh`** en `_cart-drawer.scss:26`:
```diff
-  height: 100vh;
+  height: 100dvh;
```
`100dvh` descuenta dinámicamente las barras del navegador.

**Paso 2 — Reestructurar el drawer para que footer sea scrolleable**:
Mover `#cart-salsas`, `#cart-customization` y `__footer` DENTRO del `cart-drawer__body`. Todo el drawer scrollea como una unidad:
```
cart-drawer (flex column, 100dvh)
├── __header (flex-shrink: 0, fijo)
└── __body (flex: 1, overflow-y: auto)
    ├── cart items
    ├── #cart-salsas
    ├── #cart-customization
    └── __footer
```

**Paso 3 — Añadir `env(safe-area-inset-bottom)`** al footer para la zona de navegación gestual de Android:
```scss
padding-bottom: max(1.5rem, env(safe-area-inset-bottom, 1.5rem));
```

**Paso 4 — Ajustar estilos de `.cart-drawer__extras`** para que funcionen dentro del body como flujo normal.

**Archivos a modificar**:
- `index.html` — Mover salsas, customization y footer dentro de `#cart-drawer-body`
- `src/sass/components/_cart-drawer.scss` — Cambiar `100vh` → `100dvh`, añadir safe-area, ajustar estilos de extras para flujo inline

### Resultado final — Decisión: Opción B (Estructura original + 100dvh)

Al implementar el Paso 2 (mover footer/salsas dentro del body), se detectó un bug colateral: `renderCartItems()` en `cart-ui.js` hace `body.innerHTML = ...`, lo que pisotea los elementos HTML estáticos (#cart-salsas, #cart-customization, #cart-drawer-footer) ahora que están dentro del body. Aunque `renderSalsas()` y `renderCustomizationBadge()` se llaman después, cuando el drawer está cerrado y se agrega el primer item, `isOpen = false` y esas funciones no se ejecutan, dejando salsas y footer invisibles.

**Solución final (Opción B)**: Revertir la estructura HTML a su estado original (salsas, customization y footer fuera del body), manteniendo solo `100dvh` y `safe-area-inset-bottom`. Esto corrige el clipping (causa raíz del bug en Samsung A52) sin introducir nuevos bugs por el pisoteo del `innerHTML`.

**Cambios definitivos que quedan en el código**:
1. `src/sass/components/_cart-drawer.scss` — `height: 100vh` → `height: 100dvh` (`.cart-drawer`)
2. `src/sass/components/_cart-drawer.scss` — Footer padding con `safe-area-inset-bottom`
3. `index.html` — Sin cambios respecto a la estructura original

---
## Razonamiento Técnico — Pulido Premium UX/UI (Fase 2.6)

### Contexto y Requerimiento
Tras el éxito de la Fase 2.5 (SPA + Sidebar + Acordeón), la estructura de navegación era perfecta funcionalmente, pero carecía de "alma". Se percibía abrupta y utilitaria. El usuario aprobó un plan para implementar micro-interacciones (animaciones, toasts, FAB) para equiparar la experiencia a una app nativa premium como UberEats o PedidosYa.

### Decisiones de Diseño e Ingeniería

**1. Transiciones SPA (Animación de entrada CSS)**
- **Problema:** Cambiar vistas con `display: none` produce un salto instantáneo, violando el principio UX de continuidad espacial.
- **Decisión:** Implementar animaciones CSS (keyframes) tipo `fadeInSlideUp` cada vez que el `.hero`, `.catalog` o `.info-section` adquieren su clase activa. Es una solución de muy bajo costo computacional (100% GPU-accelerated) que mejora enormemente la percepción visual sin necesitar librerías complejas como Framer Motion o React Transition Group.

**2. Toasts vs Drawer Invasivo**
- **Problema:** En fases anteriores, agregar un producto abría automáticamente el carrito para dar feedback. Esto creaba fricción masiva para usuarios intentando agregar múltiples ítems de forma rápida.
- **Decisión:** Detener el auto-open del carrito. Reemplazarlo por un componente `Toast` asíncrono que entra y sale de pantalla por sí solo (3 segundos) informando éxito ("🍣 Agregado al pedido").
- **Flujo Especial:** Si el usuario está agregando un "Roll a la carta" (que requiere abrir modal para seleccionar relleno), el Toast aparece de forma confirmatoria una vez que el usuario presiona "Agregar" *dentro* de ese modal.

**3. FAB Móvil Full-Width (Conversión)**
- **Decisión:** En móvil, cuando el usuario hace scroll hacia abajo leyendo el catálogo en acordeón, el botón de carrito del header se vuelve distante para el pulgar de una sola mano. Un **FAB (Floating Action Button) dinámico** anclado al fondo (`bottom: 0`, full width) asegura que el Call To Action ("Ver mi pedido ($X)") sea ineludible e hiper-accesible siempre que haya >0 ítems. Este componente desaparece inmediatamente cuando el carrito se vacía.

**4. Acordeón Fluido con CSS Grid**
- **Problema:** El Acordeón móvil funcionaba cambiando el `display` del contenido. Provocaba que el alto saltara de 0 a X instantáneamente.
- **Decisión:** Evitar JavaScript complejo (calculando alturas variables) para animar el acordeón. En su lugar, se explotará el estándar CSS Grid con `grid-template-rows: 0fr -> 1fr`, que permite transicionar suavemente la altura de un contenedor desde `0` hasta su tamaño intrínseco (`auto`). Para esto se requiere un `div` interno extra (wrapper con `min-height: 0` y `overflow: hidden`), logrando una sensación nativa con puro CSS.

---

## Bugfix: Botones Cortados en Tarjetas (Flexbox Wrap)

### Análisis
Se reportó que en vistas medias (donde se generan 3-4 columnas), el ancho de cada `.card` se reduce a ~250px. Al tener un precio en chip y un botón "Agregar" en la misma fila bajo `justify-content: space-between` (sin `flex-wrap: wrap`), los elementos chocan y fuerzan al botón a empujar los límites. Debido a que `.card` tiene `overflow: hidden`, el botón resultaba mutilado visualmente.

### Decisión Técnica
En vez de recurrir a Media Queries complejas basadas en anchos de tarjeta, la solución adoptada usa las propiedades intrínsecas de Flexbox:
- **`flex-wrap: wrap`** y **`gap: var(--spacing-sm)`** en `.card__footer`.
- **`flex-grow: 1`** en `.btn`.
De esta forma, cuando el contenedor no tiene espacio para ambos elementos lado a lado, el botón salta a una nueva línea de forma natural. Al tener `flex-grow: 1`, el botón ocupará todo el ancho disponible, convirtiéndose en un CTA masivo altamente efectivo para dispositivos móviles (o grillas estrechas), sin mutilarse ni requerir cálculos matemáticos.

---

## Fase 2.7: Estandarización de Microcopy (Toast)

### Contexto y Requerimiento
El negocio solicitó evaluar la incorporación de un mensaje temporal de 3 segundos con la frase exacta: `"Tu selección se ha agregado al carrito"`. Como la infraestructura del componente Toast ya se implementó en la Fase 2.6, el esfuerzo se redujo únicamente a actualizar el *microcopy*.

### Decisión de Diseño (UX)
- Se optó por utilizar una frase estándar y tranquilizadora en lugar de concatenar dinámicamente el nombre del producto, lo que previene problemas visuales si el nombre del producto es excesivamente largo.
- Se incluyó el emoji `✅` (visto verde) al principio de la frase, ya que los indicadores visuales procesan la retroalimentación de éxito más rápido cognitivamente que el texto puro.

---

## Mejora UX: Diferenciar "Menú" (colapsado) vs "Pedir Ahora" (Promos abierto) — 2026-06-28

### Contexto
El usuario notó que tanto "Menú" (header/hero) como "Pedir Ahora" abren la carta con Promos expandido. Quiere que "Menú" muestre la carta con todas las categorías colapsadas para que el usuario decida qué explorar, mientras "Pedir Ahora" mantiene el comportamiento actual de mostrar Promos destacado.

### Análisis de comportamiento actual
Actualmente `showMenu()` es la única función para abrir el catálogo. `renderCatalog()` inyecta `is-expanded` y `is-active-tab` en la categoría `promos` por defecto (línea 14-16 de `catalog.js`). `initCatalogSidebar()` crea el primer botón del sidebar con `--active`. No hay manera de abrir el catálogo en estado "todo colapsado".

### Decisión de diseño
- **Móvil**: "Menú" abre carta colapsada (todas las categorías cerradas). "Pedir Ahora" abre con Promos expandido.
- **Desktop**: Se mantiene igual (Promos visible) porque el sidebar siempre muestra alguna categoría y tener el contenido vacío sería confuso.
- La diferencia real es en móvil, donde el acordeón permite ver todo colapsado como punto de partida neutral.

### Solución técnica
1. `renderCatalog()` recibe `expandPromos` (default `true`). Si es `false`, no asigna `is-expanded` ni `is-active-tab`.
2. `initCatalogSidebar()` recibe `activeCategory` (default `'promos'`). Si es `null`, ningún botón se marca activo.
3. Nueva función `showMenuCollapsed()` en `main.js` que re-renderiza el catálogo con ambos parámetros desactivados y luego refresca el sidebar.
4. `btn-show-menu` y `btn-hero-menu` usan `showMenuCollapsed()`. `btn-order-now` mantiene `showMenu()`.

### Archivos modificados
- `src/js/catalog.js` — `renderCatalog(expandPromos = true)`: si es `false`, no asigna `is-expanded` ni `is-active-tab`. `initCatalogSidebar(activeCategory = 'promos')`: si es `null`, ningún botón se marca activo.
- `src/main.js` — Nueva función `showMenuCollapsed()` que re-renderiza el catálogo vía `renderCatalog(false)` y sidebar vía `initCatalogSidebar(null)`. `btn-show-menu` y `btn-hero-menu` ahora usan `showMenuCollapsed()`. `btn-order-now` mantiene `showMenu()`.

### Ejecución inicial (con bug)
Build exitoso (559ms). Pero `showMenuCollapsed()` se aplicaba en desktop también, colapsando el sidebar y contenido en ambos viewports.

### Bugfix: showMenuCollapsed rompe acordeón en móvil + afecta desktop
**Problema 1**: `showMenuCollapsed()` se aplicaba en desktop colapsando el sidebar.

**Solución**: Agregar guard `if (window.innerWidth >= 768)` que deriva a `showMenu()`.

**Problema 2**: `showMenuCollapsed()` ejecutaba `initCatalogSidebar(null)` después de `renderCatalog(false)`. Esto duplicaba event listeners en `catalogContent` (el listener del acordeón y del sidebar se asignaban de nuevo), causando que el acordeón dejara de responder a los clics.

**Solución**: Eliminar la llamada a `initCatalogSidebar()` y la limpieza de botones del sidebar dentro de `showMenuCollapsed()`. Los event listeners por delegación sobre `catalogContent` ya funcionan correctamente con el nuevo HTML generado por `renderCatalog(false)`. No es necesario re-crear el sidebar ni re-asignar listeners.

**Archivo modificado**: `src/main.js` — Simplificado `showMenuCollapsed()`: solo llama a `renderCatalog(false)` y muestra la sección.

### Actualización de datos del footer (2026-06-28)

Se actualizaron los datos de contacto y dirección del negocio en ambas secciones del HTML (`footer__info` e `info-section`):

- **Dirección**: de "Quilicura — Despacho $2.000" a "Lo Ovalle 0305, Quilicura"
- **Horarios**: de "Lun — Dom, 12:00 — 22:00 hrs" a "Dom-Jue: 17:00-22:00 / Vie-Sáb: 17:00-23:00"
- **Email**: de "info@massaro.cl" a "vidalrodrigo2704@gmail.com"
- Se renombró la sección "Delivery" por "Dirección" en ambos bloques.

**Archivo modificado**: `index.html` — 2 bloques de información del negocio.

### Corrección Visual de Contraste (2026-06-28)

**Problema reportado**: El botón secundario amarillo ("Personalizar pedido") y los chips de precios presentaban texto blanco, lo cual tiene un contraste muy pobre sobre amarillo y ensucia la UX/UI, incumpliendo las normas de accesibilidad.

**Análisis Técnico**: En `_buttons.scss`, la clase `.btn--secondary` declaraba explícitamente `color: var(--color-black)`. Sin embargo, el token `--color-black` nunca fue inicializado en el `:root` (`_light.scss`) ni en el selector `[data-theme="dark"]` (`_dark.scss`). Debido a esta omisión, el navegador ignoraba la instrucción y aplicaba el color de texto por defecto que heredaba del body. En el modo oscuro, este color por defecto es blanco (`var(--text-color)`), lo que causaba el fallo visual.

**Decisión basada en Mercado**: Plataformas como PedidosYa o MercadoLibre utilizan fondos amarillos siempre con texto oscuro (negro/gris muy oscuro) para garantizar una legibilidad inmediata.

**Solución**: Se inyectó la variable `--color-black: #{var.$color-black};` tanto en `_light.scss` como en `_dark.scss`. Esto restauró el comportamiento esperado en `.btn--secondary`, volviendo el texto negro sin requerir hardcodeo en el componente.

**Validación**: `npm run build` exitoso (571ms) y `./init.sh` con 57/57 checks.

### Razonamiento Técnico — Fase 2.12: Vistas de Catálogo Compactas (2026-06-28)

**Problema**: El catálogo actual muestra imágenes grandes y descripciones largas por defecto para todas las cards y promos. En móvil esto genera mucho scroll vertical, fatiga visual, y ralentiza la toma de decisión para clientes recurrentes que ya conocen los productos.

**Benchmark de mercado**: UberEats, PedidosYa y Rappi en móvil usan listas compactas donde solo se ve nombre, precio y un CTA. La imagen y descripción se revelan al expandir o al entrar al detalle del producto. Esto permite mayor densidad de información en pantalla.

**Decisión de diseño**:
- **Móvil** (`max-width: 767px`): Cards y promos colapsadas por defecto. Cabecera visible con nombre, badges, precio, botón "Agregar" + indicador `▼`. Al tocar la cabecera se expande para mostrar imagen-wrapper, descripción y hint de variantes.
- **Desktop** (`min-width: 768px`): Sin cambios. Todo visible siempre, igual que hoy. El indicador `▼` se oculta y el contenedor de detalles siempre está expandido.

**Arquitectura**:
- **Templates JS** (`catalog.js`): Se reestructuran los templates de `card` y `promo-card` para incluir un contenedor `.card__compact-details` (o `.promo-card__compact-details`) que envuelve imagen-wrapper y descripción. La cabecera `.card__compact-header` siempre visible.
- **Toggle por JS**: Event delegation en `catalogContent` para capturar clics en `[data-action="toggle-details"]` o en la cabecera. Toggle de clase `.is-expanded` en el `<article>`. El botón "Agregar" usa `stopPropagation()` para no disparar el toggle accidentalmente.
- **Animación CSS**: Mismo patrón que el acordeón de categorías — CSS Grid `0fr → 1fr` con sub-contenedor `overflow: hidden`. En desktop se fuerza `grid-template-rows: 1fr` siempre.
- **Promos**: Misma lógica. `.promo-card__compact-details` colapsable en móvil. La card mantiene su layout horizontal (imagen a la izquierda, contenido a la derecha), pero la imagen se oculta hasta expandir.
- **Grid**: En móvil se mantiene `grid-template-columns: 1fr` (lista). Desktop sin cambios (grilla adaptativa 2-4 columnas).

**Riesgos y mitigaciones**:
| Riesgo | Mitigación |
|---|---|
| Botón "Agregar" no funciona por event propagation | `e.stopPropagation()` en el listener del botón |
| Animaciones conflictivas con el acordeón de categorías | El toggle por card usa una clase diferente (`.is-expanded` en el `<article>`) y es independiente del acordeón de categorías |
| Promos se ven raras al colapsar imagen en móvil | El diseño horizontal se mantiene, solo se oculta la imagen-wrapper. Al expandir, la imagen reaparece con transición suave |
| Desktop se ve afectado accidentalmente | Media query `min-width: 768px` fuerza siempre expandido y oculta el indicador |

**Archivos a modificar**:
- `src/js/catalog.js` — Templates de card y promo-card con estructura compacta, event delegation para toggle, stopPropagation en botón Agregar
- `src/sass/components/_cards.scss` — `.card__compact-header`, `.card__compact-details` con animación CSS Grid, reglas desktop
- `src/sass/pages/_catalog.scss` — `.promo-card__compact-details`, reglas desktop

**Validación**:
- `npm run build` → sin errores
- Revisión visual móvil: cards colapsadas, al tocar se expanden, botón "Agregar" funciona
- Revisión visual desktop: sin cambios respecto a hoy
- `./init.sh` → 57/57 checks

### Ejecución Fase 2.12 — Vistas de Catálogo Compactas (2026-06-28)

**Implementado**:

1. **Templates JS** (`catalog.js`): Reestructurados los templates de `card` y `promo-card`:
   - Cabecera `.card__compact-header` / `.promo-card__compact-header` con `data-action="toggle-details"` visible siempre en móvil, contiene: título, badges, precio, botón "Agregar" + indicador `▼`.
   - Detalles `.card__compact-details` / `.promo-card__compact-details` envuelven imagen-wrapper y descripción. Colapsables por defecto en móvil.
   - `e.stopPropagation()` en el listener del botón "Agregar" para no disparar el toggle.

2. **Lógica JS** (`catalog.js`): Nuevo event delegation para `[data-action="toggle-details"]` que togglea `.is-expanded` en el `<article>`. Independiente del acordeón de categorías.

3. **Estilos CSS Cards** (`_cards.scss`):
   - `.card__compact-header`: flexbox row con gap, cursor pointer en móvil.
   - `.card__toggle-icon`: indicador `▼` con rotate 180° al expandir. Oculto en desktop.
   - `.card__compact-details`: CSS Grid `0fr → 1fr` con sub-contenedor `overflow: hidden; min-height: 0`.
   - En desktop (`min-width: 768px`): `grid-template-rows: 1fr` siempre, toggle-icon oculto, cursor default.
   - `.card__price`: ahora como chip inline en la cabecera (sigue siendo el mismo estilo visual).
   - Eliminados estilos legacy: `__content`, `__footer` (ya no existen en el nuevo template).

4. **Estilos CSS Promos** (`_catalog.scss`):
   - `.promo-card`: cambiado de `flex-direction: row` a `column` para acomodar el colapso.
   - `.promo-card__compact-header`: flexbox con imagen 100px (móvil) / 200px (desktop), info, botón y toggle.
   - `.promo-card__compact-details`: mismo patrón CSS Grid colapsable.
   - Eliminados estilos legacy: `__content`, `__footer`.

**Validación**: `npm run build` (569ms) ✅ — `./init.sh` (57/57) ✅

---

## 🐛 Bugfix 2.12.1: Imagen de Promos no colapsa y toggle no expande detalles (2026-06-28)

### Reporte
El usuario reportó que en la vista móvil, las cards de Promos muestran la imagen siempre visible (no se colapsan). Al hacer clic en la cabecera el indicador `▼` gira pero no se ve ningún cambio en los detalles de la composición. Las cards de productos regulares (Rolls, Especiales, etc.) sí funcionan correctamente.

### Diagnóstico

**Bug 1 — Imagen fuera del contenedor colapsable** (`src/js/catalog.js:74-78`):
El template de `promo-card` tiene la imagen-wrapper dentro del `promo-card__compact-header` (cabecera siempre visible), NO dentro de `promo-card__compact-details` (contenido colapsable). Esto es un error de diseño del template: las cards regulares sí tienen la imagen dentro de `card__compact-details`, pero las promos no.

Estructura actual incorrecta:
```
promo-card
├── __compact-header (siempre visible)
│   ├── __image-wrapper ← IMAGEN AQUÍ (mal — siempre visible)
│   ├── __compact-header-info (nombre, precio, botón)
│   └── __toggle-icon ▼
└── __compact-details (colapsable)
    └── __compact-details-inner
        └── __desc ← solo descripción (no hay imagen para expandir)
```

Estructura correcta (cards regulares):
```
card
├── __compact-header (siempre visible)
│   ├── __compact-header-info (nombre, badges, precio)
│   ├── btn "Agregar"
│   └── __toggle-icon ▼
└── __compact-details (colapsable)
    └── __compact-details-inner
        ├── __image-wrapper ← IMAGEN AQUÍ (bien)
        └── __desc
```

**Bug 2 — Sin affordance visual de expansión**: La cabecera tiene `cursor: pointer` y `data-action="toggle-details"`, pero el toggle `▼` es pequeño y no hay suficiente indicación visual de que se puede hacer clic para expandir. Sin embargo, el toggle en sí funciona (gira 180°), pero como no hay contenido nuevo que mostrar (la imagen ya está visible arriba), el usuario no percibe cambio.

### Solución planificada

**Paso 1 — Mover imagen a detalles**: Reubicar `promo-card__image-wrapper` y `promo-card__pieces` dentro de `promo-card__compact-details / promo-card__compact-details-inner`. La cabecera se queda solo con nombre, precio, botón Agregar y toggle `▼`. El pieces badge se muestra inline en el nombre de la cabecera para que el usuario sepa las piezas sin expandir.

**Paso 2 — Ajustar CSS de image-wrapper**: Cuando la imagen está dentro de `__compact-details`, el `width: 100px` (móvil) / `200px` (desktop) heredado del selector existente no aplica. Debe ocupar el 100% del ancho disponible (como las cards regulares). Se anulará con un selector anidado dentro de `__compact-details-inner`.

**Archivos a modificar**:
- `src/js/catalog.js` — Template de promo-card: mover image-wrapper a detalles
- `src/sass/pages/_catalog.scss` — Resetear width de image-wrapper dentro de detalles

### Ejecución Bugfix 2.12.1 (2026-06-28)

**Implementado**:

1. **Template JS** (`catalog.js`): La imagen-wrapper (`promo-card__image-wrapper`) y el badge de pieces se movieron del `promo-card__compact-header` al `promo-card__compact-details / promo-card__compact-details-inner`. La cabecera ahora solo muestra nombre (con inline "— 13 pz."), precio, botón Agregar y toggle `▼`.

2. **CSS Promos** (`_catalog.scss`): Dentro de `__compact-details-inner`, el `__image-wrapper` ahora usa `width: 100%` con `aspect-ratio: 3/2` (mismo patrón que las cards regulares). El ancho fijo de 100px (móvil) / 200px (desktop) solo aplica cuando la imagen está en la cabecera (que ya no es el caso).

**Validación**: `npm run build` (575ms) ✅ — `./init.sh` (57/57) ✅

---

## 🐛 Bugfix 2.12.2: Toggle de promos no gira el icono ▼ ni expande detalles (2026-06-28)

### Reporte
Tras el Bugfix 2.12.1, la imagen de las promos ya se colapsa correctamente (no se ve en la cabecera). Sin embargo, al hacer clic en la cabecera de una promo, el icono ▼ no gira y el usuario no percibe que se hayan expandido los detalles. Las cards regulares sí funcionan perfectamente.

### Diagnóstico

**Causa raíz — Regla CSS de toggle-icon solo existe para `.card`, no para `.promo-card`**:

En `_cards.scss:87` existe la regla:
```scss
.card.is-expanded &__toggle-icon {
    transform: rotate(180deg);
}
```
Esto se compila a `.card.is-expanded .card__toggle-icon { transform: rotate(180deg); }`.

Esta regla funciona para `<article class="card">` (productos regulares) porque el selector `.card.is-expanded` coincide. Pero las promos usan `<article class="promo-card">`, donde `.card.is-expanded` NO coincide, por lo que el icono nunca gira.

Además, el usuario percibe que "no funciona" porque el único feedback visual del toggle es el giro del icono ▼. Sin ese giro, no hay indicación de que haya ocurrido algo, aunque el CSS de `promo-card.is-expanded .promo-card__compact-details { grid-template-rows: 1fr; }` sí se esté aplicando correctamente (la imagen y descripción se expanden, pero sin el icono girando el usuario no lo nota).

### Solución planificada

**Paso 1 — Añadir regla CSS para toggle-icon en promos**: En `_catalog.scss`, añadir:
```scss
.promo-card.is-expanded .card__toggle-icon {
    transform: rotate(180deg);
}
```

### Archivos a modificar
- `src/sass/pages/_catalog.scss` — Añadir regla de rotación para `.promo-card.is-expanded .card__toggle-icon`

### Ejecución Bugfix 2.12.2 (2026-06-28)

**Implementado**:

1. **CSS Promos** (`_catalog.scss`): Añadida la regla `.promo-card.is-expanded .card__toggle-icon { transform: rotate(180deg); }` justo después de la regla de expansión de detalles existente.

**Validación**: `npm run build` (626ms) ✅ — `./init.sh` (57/57) ✅

---

## 🐛 Bugfix 2.12.3: Toggle de promos no expande detalles — Solución final (2026-06-28)

### Reporte
Tras Bugfix 2.12.1 (imagen movida a detalles colapsables) y 2.12.2 (regla CSS para rotar ▼ en promos), el icono ▼ giraba correctamente al hacer clic pero los detalles (imagen + descripción) no se expandían. El usuario probó en Samsung A52 y el comportamiento persistía.

### Iteraciones de diagnóstico

**Iteración 1 — `data-action` con `closest`**: El listener buscaba `e.target.closest('[data-action="toggle-details"]')`. El `promo-card__compact-header` tenía `data-action="toggle-details"`, y `closest` desde cualquier hijo del header (nombre, precio, ▼) debería encontrarlo. Se verificó en el código compilado que el atributo y el listener existían. **No funcionó.**

**Iteración 2 — Selector por clase + `stopPropagation`**: Se cambió a `.promo-card__compact-header, .card__compact-header` como selector. Además se añadió `e.stopPropagation()` para evitar interferencia del listener del acordeón de categorías. Se verificó en el built JS que el código era correcto. **No funcionó.**

**Iteración 3 — Diagnóstico con `console.log`**: Se agregaron logs temporales para confirmar que el clic llegaba al `catalogContent`. El log confirmó que el evento SÍ llegaba. Se ejecutó `document.querySelector('.promo-card').classList.add('is-expanded')` manualmente en la consola y **tampoco expandía los detalles**, confirmando que el problema no era del JS sino del CSS.

### Causa raíz real

**CSS Grid `0fr → 1fr` no es fiable con contenedores anidados**. El patrón usado era:

```scss
&__compact-details {
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows 0.32s ease-out;
}
.promo-card.is-expanded &__compact-details {
    grid-template-rows: 1fr;
}
&__compact-details-inner {
    overflow: hidden;
    min-height: 0;
}
```

Este patrón requiere que **el contenedor padre NO tenga `overflow: hidden`** y que el contenido interno tenga `overflow: hidden` con `min-height: 0`. Sin embargo, múltiples niveles de anidación causan que el navegador no calcule correctamente la altura. En particular, `catalog__category-items` también usa el mismo patrón `grid-template-rows: 0fr → 1fr` para el acordeón de categorías, creando una anidación de grids que Chromium no resuelve correctamente en viewports móviles.

### Solución final

Se abandonó el patrón CSS Grid `0fr → 1fr` en favor de **`display: none / block` controlado por JS directamente**.

**Cambios en JS** (`catalog.js`):
- El listener se simplificó al máximo: captura cualquier clic dentro de `.promo-card, .card`, excluye clics en `.btn--primary` y `.catalog__accordion-header`, y ejecuta `card.classList.toggle('is-expanded')`.
- Además, **setea directamente** `details.style.display = 'block'` o `'none'` según el estado de `is-expanded`, sin depender de transiciones CSS.

**Cambios en CSS** (`_cards.scss` y `_catalog.scss`):
- `.card__compact-details` y `.promo-card__compact-details`: `display: none` (móvil) / `display: block` (desktop). Cuando el padre tiene `is-expanded`: `display: block`.
- Se eliminaron `display: grid`, `grid-template-rows`, y `transition` de estos contenedores.
- `__compact-details-inner`: `overflow: hidden` → `overflow: visible` (ya no es necesario).

### Decisión de diseño

Se priorizó **robustez sobre animación suave**. El patrón CSS Grid `0fr → 1fr` ofrecía una transición animada visualmente atractiva, pero resultó poco fiable en contextos de anidación de grids. `display: none/block` es bulletproof: funciona en todos los navegadores y contextos, aunque pierde la animación de transición. Para un e-commerce funcional, la confiabilidad es más importante que la estética de la animación.

### Archivos modificados

- `src/js/catalog.js` — Listener simplificado con exclusión de botón/acordeón + control directo de `display`
- `src/sass/components/_cards.scss` — `.card__compact-details`: `display: grid` → `display: none/block`. `__compact-details-inner`: `overflow: visible`
- `src/sass/pages/_catalog.scss` — `.promo-card__compact-details`: mismo cambio. `__compact-details-inner`: `overflow: visible`

### Validación
- `npm run build` (560ms) ✅
- Vista móvil: Promos colapsadas, al tocar se expanden con imagen + pieces + descripción ✅
- Botón "Agregar" funciona correctamente ✅
- Desktop: sin cambios ❌ **(se detectó bug: imágenes de promos muy grandes en desktop)**
- `./init.sh` (57/57) ✅

---

## 🐛 Bugfix 2.12.4: Imágenes de promos muy grandes en desktop (2026-06-28)

### Reporte
En desktop, las imágenes de las promos aparecen muy grandes, ocupando todo el ancho de la tarjeta con aspect-ratio 3/2. Esto rompe el layout visual que existía antes de la Fase 2.12, donde las promos tenían un diseño horizontal con imagen de 200px a la izquierda y el contenido (nombre, descripción, precio, botón) a la derecha.

### Causa raíz

Los cambios de Fase 2.12 (vistas compactas) modificaron la estructura HTML de las promos. Antes:

```
promo-card (flex-direction: row)
├── __image-wrapper (200px fijo)
└── __content (flex: 1)
    ├── __name
    ├── __desc
    └── __footer (precio + botón)
```

Después de Fase 2.12:

```
promo-card (flex-direction: column)
├── __compact-header (nombre + precio + botón + ▼)
└── __compact-details (display: block en desktop)
    └── __compact-details-inner
        ├── __image-wrapper (width: 100%, aspect-ratio: 3/2) ← MUY GRANDE
        └── __desc
```

El problema es que:
1. `promo-card` pasó de `flex-direction: row` a `column`, perdiendo el layout horizontal.
2. `__image-wrapper` dentro de `__compact-details-inner` tiene `width: 100%` con `aspect-ratio: 3/2`, lo que en desktop hace que la imagen ocupe todo el ancho de la card.
3. No hay un layout flex horizontal dentro de `__compact-details-inner` que ponga la imagen al lado de la descripción.

### Solución planificada

**Paso 1 — Restaurar layout horizontal en desktop** (`_catalog.scss`):
- `.promo-card` en `min-width: 768px`: `flex-direction: row`.
- `.promo-card__compact-details` en desktop: `display: flex; flex-direction: row` para que imagen y descripción estén en fila.
- `.promo-card__compact-details-inner` en desktop: `display: flex; flex-direction: row; gap: var(--spacing-md)`.
- `.promo-card__image-wrapper` dentro de `__compact-details-inner` en desktop: `width: 200px` en lugar de `width: 100%`.

Con esto, en desktop la promo tendrá:
- Cabecera con nombre, precio, botón y toggle ▼ (en una fila).
- Debajo, los detalles con imagen (200px) a la izquierda y descripción a la derecha.

**Archivos a modificar**:
- `src/sass/pages/_catalog.scss` — Ajustar layout de promo-card en desktop

**Validación**:
- Desktop: promos con imagen de 200px, layout horizontal
- Móvil: promos colapsadas, al expandir imagen + descripción
- `./init.sh` (57/57) ✅

### Ejecución Bugfix 2.12.4 (2026-06-28)

**Implementado**:

1. **CSS Promos** (`_catalog.scss`): Se restauró el layout horizontal de las promos en desktop:
   - `.promo-card` en `min-width: 768px`: `flex-direction: row` (vuelve al diseño horizontal original).
   - `__compact-header` en desktop: `flex: 1` para ocupar el espacio disponible con nombre, precio y botón.
   - `__compact-details` en desktop: `display: flex; flex-direction: row; align-items: flex-start` para que imagen y descripción estén en fila.
   - `__compact-details-inner` en desktop: `display: flex; flex-direction: row; gap: var(--spacing-lg); padding: var(--spacing-md)`.
   - `.promo-card__image-wrapper` dentro de detalles en desktop: `width: 200px; flex-shrink: 0; border-radius: var(--radius-md)` (vuelve al tamaño original de 200px).
   - `__desc` en desktop: `flex: 1; padding: 0` para que fluya al lado de la imagen.
   - Se eliminó el selector legacy `promo-card__image-wrapper` que estaba fuera de `__compact-details-inner` (ya no se usaba y podía causar confusión).

**Validación**: `npm run build` (567ms) ✅ — `./init.sh` (57/57) ✅

### Diagnóstico posterior — problema secundario detectado

La solución del Bugfix 2.12.4 (poner `promo-card` en `flex-direction: row` en desktop) resolvió el tamaño de la imagen pero introdujo un nuevo problema: el header (nombre + precio + botón) y los detalles (imagen + descripción) quedaron en la misma fila horizontal, deformando el texto. Ver Bugfix 2.12.5.

---

## 🐛 Bugfix 2.12.5: Layout de promos en desktop — header arriba, imagen+descripción abajo en fila (2026-06-28)

### Reporte
En desktop, las promos muestran el header (nombre + precio + botón) y los detalles (imagen + descripción) en la misma fila horizontal. Esto hace que el texto se vea deformado y desordenado, arruinando la UX/UI.

### Causa raíz

El Bugfix 2.12.4 puso `promo-card` en `flex-direction: row` en desktop. Esto era incorrecto porque:
- `promo-card ` tiene dos hijos directos: `__compact-header` y `__compact-details`
- Con `flex-direction: row`, ambos hijos se alinean en la misma fila horizontal
- El header (nombre + precio + botón) y los detalles (imagen + descripción) compiten por el espacio horizontal
- El resultado es que el texto del nombre se deforma al no tener suficiente ancho

Lo correcto es:
- `promo-card`: `flex-direction: column` (header arriba, detalles abajo)
- `__compact-details-inner`: `flex-direction: row` (imagen 200px a la izquierda, descripción a la derecha)

### Solución planificada

**Paso 1 — `promo-card` vuelve a `column` en desktop**:
Eliminar `flex-direction: row` del media query `min-width: 768px`. El valor por defecto `column` hace que header y detalles se apilen verticalmente.

**Paso 2 — `__compact-header` pierde `flex: 1` en desktop**:
El header debe ocupar su ancho natural (100%), no estirarse. El `flex: 1` se añadió en 2.12.4 como parte del layout horizontal pero ya no es necesario.

**Layout final en desktop:**
```
promo-card (flex-direction: column)
├── __compact-header (100% ancho)
│   ├── nombre + precio
│   └── botón Agregar + ▼ (oculto)
└── __compact-details (flex-direction: row en desktop)
    └── __compact-details-inner (flex-direction: row)
        ├── __image-wrapper (200px)
        └── __desc (flex: 1)
```

### Archivos a modificar
- `src/sass/pages/_catalog.scss` — 2 cambios: eliminar `flex-direction: row` de `promo-card` en desktop, eliminar `flex: 1` de `__compact-header` en desktop

### Validación
- Desktop: header arriba, imagen 200px a la izquierda, descripción a la derecha
- Móvil: sin cambios, promos colapsadas con toggle

### Ejecución Bugfix 2.12.5 (2026-06-28)

**Implementado**:

1. **CSS Promos** (`_catalog.scss`): Se eliminó `flex-direction: row` del media query `min-width: 768px` en `.promo-card`. Ahora `promo-card` usa `flex-direction: column` (valor por defecto), lo que apila el header arriba y los detalles abajo.

2. Se eliminó `flex: 1` de `__compact-header` en desktop. El header ahora ocupa su ancho natural (100%).

**Layout resultante en desktop:**
```
promo-card (flex-direction: column)
├── __compact-header (100% ancho)
│   ├── nombre + precio
│   └── botón Agregar + ▼ (oculto en desktop)
└── __compact-details (flex-direction: row)
    └── __compact-details-inner (flex-direction: row)
        ├── __image-wrapper (200px)
        └── __desc (flex: 1)
```

**Validación**: `npm run build` (584ms) ✅ — `./init.sh` (57/57) ✅
