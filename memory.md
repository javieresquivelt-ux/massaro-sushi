# Memoria Persistente

**Última actualización:** 2026-06-11

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
- **Validación**: Build de Vite exitoso (508ms, 7 módulos). `./init.sh` con 14/14 checks pasados.
- **Fix Scroll Horizontal Móvil**: Aplicadas correcciones para eliminar scroll horizontal no deseado. `_reset.scss`: `overflow-x: hidden` + `position: relative` + `width: 100%` en body, `background-attachment: scroll` en móvil. `_grid.scss`: `width: 100%` + `max-width: 100%` + `overflow-x: hidden` en `.app-wrapper`; `box-sizing: border-box` en `.container`. `_hero.scss`: `width: 100%` + `max-width: 100%` + `overflow-x: hidden` en hero. `_tabs.scss`: `overflow-y: hidden` + `max-width: 100%`. `_catalog.scss`: `width: 100%` + `max-width: 100%` en promo-card, `min-width: 0` en `__content`, imágenes reducidas en móvil, `flex-wrap: wrap` en footer de promo.

### Infraestructura (VPS + EasyPanel)

- **Configuración DNS Inicial**: Se inició la Fase 1 del Runbook de Infraestructura. Se obtuvo la IP pública del VPS (`89.117.32.46`) desde Hostinger. Se crearon exitosamente 4 registros tipo A en la zona de `cystec.cloud` mediante la API de Hostinger: `massaro.cystec.cloud`, `api.massaro.cystec.cloud`, `admin.massaro.cystec.cloud`, y `status.massaro.cystec.cloud`.
- **Build de Producción**: Se ejecutó `npm run build` exitosamente en el entorno local. Se validó la generación de la carpeta `/dist`, obteniendo archivos estáticos altamente optimizados: el CSS final pesa ~3.57 kB comprimido, el JS ~3.39 kB, y las imágenes mantienen soporte WebP, dejando el frontend listo para su inyección en Nginx (EasyPanel).
- **Despliegue GitOps**: Se configuró el repositorio de GitHub para sincronización automática con EasyPanel. Se crearon archivos `Dockerfile` (multi-stage con Alpine Node y Nginx) y `nginx.conf` (con reglas de enrutamiento SPA y headers de caché). El código se desplegó y se encuentra corriendo bajo Nginx.
- **Configuración de Dominio**: El dominio `massaro.cystec.cloud` se vinculó exitosamente.

## Scripts de Inicialización
- **`init.sh`**: Script de validación de entorno (7 checks) creado y funcional. Verifica Node.js >= 20, NPM, dependencias, estructura base del proyecto, archivos Harness, carpetas frontend y punto de entrada Sass. Todos los 14 checks pasan correctamente.

## Documentación y Control Operativo (Runbook)
- **`infrastructure.md`**: Creado como fuente única de verdad para el despliegue. Define contenedores de EasyPanel, puertos obligatorios (API en 3000), variables de entorno `.env` permitidas y el uso de Trunk Based Development.
- **Enlace de Conocimiento**: `specs.md` fue modificado para apuntar obligatoriamente a `infrastructure.md` como paso previo a codificar API o manejar servidores.

### Favicon (Identidad de Pestaña)

- **Implementado 2026-06-11**: Se generaron 3 formatos de favicon desde `src/assets/img/logo_massaro.jpg` usando `sharp-cli` (logo es 320x320 cuadrado, solo resize):
  - `public/favicon-32x32.png` (3.1 kB) — fallback escritorio
  - `public/favicon.png` (91 kB, 192x192) — Android/Chrome
  - `public/apple-touch-icon.png` (80 kB, 180x180) — iOS
- Se eliminaron `public/favicon.svg` y `public/icons.svg` (íconos genéricos de Vite).
- `index.html` actualizado: removido `<link>` SVG, añadidos 3 links con `sizes` y `rel` correctos.
- Build de producción validado (716ms, sin errores).

## Bugs Conocidos y Gotchas
- **Bug de Menú Oculto en Móviles**: El uso de `clip-path` en contenedores con posicionamiento absoluto puede causar problemas de renderizado en algunos navegadores móviles (el menú no se muestra). *Solución*: Usar `opacity` y `visibility`.
- **Desplazamiento (Scroll) Horizontal No Deseado**: Las grillas o el padding de contenedores pueden empujar el viewport en móviles, cortando contenido a la izquierda. *Solución*: Mantener siempre `overflow-x: hidden` en el selector `body` (`_reset.scss`).
- **Bug de EasyPanel (Internal Server Error al agregar Dominio)**: Si se intenta agregar un dominio globalmente y la asociación falla, el registro queda parcialmente guardado (`_`) en la base de datos interna de EasyPanel, impidiendo agregarlo luego a un servicio específico de forma silenciosa (error 500 en tRPC). *Solución*: Ir a la lista global de "Dominios" en la barra lateral externa, eliminar el dominio fantasma conflictivo, y luego volver a crearlo desde dentro del menú del servicio específico.
- **Imágenes rotas en Producción (Assets Dinámicos de Vite)**: Si se referencian rutas de imágenes como simples cadenas de texto (ej. `'/src/assets/img/...'`) en archivos JS, el bundler de Vite las ignora en producción (Nginx) al no detectar una dependencia explícita. *Solución*: Utilizar `import imgName from '../assets/...'` al inicio del archivo JS y asignar esa variable, lo que obliga a Vite a hashear y empaquetar el asset en la carpeta `/dist/assets`.
- **Falso Positivo de Certificado Inválido (HTTPS-First)**: Al activar HTTPS en EasyPanel, el certificado de Let's Encrypt se emite correctamente para el dominio. Sin embargo, Traefik (proxy inverso) no fuerza la redirección de tráfico HTTP a HTTPS de manera predeterminada. Si un usuario (o el navegador por omisión) accede vía `http://`, se mostrará una advertencia de "Sitio No Seguro", aunque el panel del navegador indique "Certificate is valid". *Solución*: Configurar un Middleware de Redirección (HTTP a HTTPS) en EasyPanel o instruir a acceder siempre explícitamente con `https://`.
