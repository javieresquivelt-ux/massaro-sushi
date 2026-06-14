# Memoria Persistente

**Última actualización:** 2026-06-13

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
