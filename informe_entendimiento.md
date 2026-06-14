# 🍣 Informe de Entendimiento — Massaro Sushi

> Generado por Antigravity · Basado en: `README.md`, `agents.md`, `specs.md`, `infrastructure.md`, `memory.md`  
> Fecha de revisión: 2026-06-13

---

## 1. Visión General del Proyecto

**Massaro Sushi** es un e-commerce SPA orientado a una tienda de comida rápida (sushi artesanal) ubicada en **Quilicura, Chile**. El objetivo central es construir una tienda online que permita a los clientes navegar el catálogo, armar su pedido y pagar online, con la menor fricción posible desde dispositivos móviles.

El proyecto está siendo desarrollado por **javieresquivelt-ux** bajo un flujo de trabajo asistido por IA (Harness Engineering), donde el agente opera bajo reglas operativas estrictas definidas en `agents.md`.

---

## 2. Dominio del Negocio

| Ítem | Detalle |
|---|---|
| **Tipo** | Tienda online de comida rápida (MVP de Sushi) |
| **Zona de despacho** | Quilicura ($2.000 CLP) |
| **Moneda** | Pesos chilenos (CLP) |
| **Contacto** | WhatsApp +56 9 7237 7458 |
| **Redes** | Facebook `/MassaroQuilicura` · Instagram `@massaro_sushi` |
| **Dominio público** | `massaro.cystec.cloud` |

### Catálogo de Productos (7 categorías, ~40 productos)

| Categoría | Rango de precio |
|---|---|
| Rolls a la carta | $4.500 – $5.000 |
| Especiales | $2.500 – $6.000 |
| Hard Rolls | $2.000 – $2.500 |
| Al plato | $3.500 – $5.500 |
| Tabla Massaro | $13.500 |
| Promos | $6.500 – $25.000 (13 a 72 piezas) |
| Adicionales | $500 – $2.000 |

---

## 3. Estado Actual del Proyecto

### Frontend — ✅ En Producción

El frontend está **desplegado y operativo** en `massaro.cystec.cloud`.

| Aspecto | Estado |
|---|---|
| Stack | Vanilla JS + Vite `^8.0.12` + Sass 7–1 |
| Arquitectura de estilos | Implementada (7 carpetas + `app.scss`) |
| Temas | Light / Dark (por defecto: modo oscuro vía `data-theme="dark"`) |
| Tipografía | `Inter`, `Outfit` (cuerpo) + `Bebas Neue` (display) |
| Imágenes | WebP optimizadas con `sharp-cli` (−86% de peso) |
| Despliegue | Docker multi-stage (Node 20 Alpine → Nginx) + EasyPanel |
| Build local | ✅ `31/31 checks` en `init.sh` · `npm run build` sin errores |

### Secciones implementadas

- **Hero** — Logo 220px, título en Bebas Neue, sombra roja dramática, CTA "Ver Menú"
- **Catálogo** — Grilla responsiva con filtros: tabs en desktop, `<select>` nativo en móvil
- **Promos** — Lista ampliada horizontal con imagen, badges de piezas y precios chip
- **Footer** — Delivery, contacto, redes sociales, copyright

### Componentes Sass implementados

```
abstracts/   _variables, _functions, _mixins, _placeholders
base/        _reset, _typography, _animations
components/  _buttons, _cards, _floating-nav, _forms, _tabs
layout/      _header, _footer, _grid
pages/       _catalog, _hero, _home
themes/      _light, _dark
vendors/     _vendors
```

### Pendiente del Frontend (Fase 2)

- **Carrito lateral** — Estado en Vanilla JS con soporte `localStorage`
- **Validación de variantes** — Selección obligatoria de relleno en ciertos rolls
- **Checkout vía WhatsApp** — Pedido consolidado + cálculo de despacho → mensaje preformateado
- **Punto de control**: evaluar si la complejidad amerita migrar a React/TypeScript

---

## 4. Arquitectura Objetivo (Full-Stack)

```
Internet
   │
   ├── massaro.cystec.cloud         → [frontend] Nginx (Vite Build)
   ├── api.massaro.cystec.cloud     → [api]      Fastify (Node.js 20) · Puerto 3000
   └── massaro.cystec.cloud/admin   → [admin]    Ruta protegida en mismo frontend
                                                          │
                                        ┌────────────────┴────────────────┐
                                        │          Red Interna            │
                                   [postgres:5432]                  [redis:6379]
                                   PostgreSQL 15                    Redis 7
                                        │
                                   [worker]
                                   Node.js (tareas async)
```

### Stack Backend (Pendiente)

| Capa | Tecnología |
|---|---|
| Runtime | Node.js 20 |
| Framework API | Fastify |
| Base de datos | PostgreSQL 15 (fuente de verdad) |
| Caché / Colas | Redis 7 (caché, rate limit, locks, sesiones, cola liviana) |
| Worker | Node.js independiente |
| Backups | S3-compatible (externo al VPS) |
| Pasarela de pago | Por definir: Transbank/WebPay, Khipu, MercadoPago o Flow |

### Modelo de Datos (Tablas mínimas sugeridas)

`products`, `categories`, `product_variants`, `modifier_groups`, `modifiers`, `combos`, `customers`, `customer_addresses`, `orders`, `order_items`, `payments`, `payment_events`, `delivery_zones`, `delivery_fees`, `store_hours`, `audit_logs`, `webhook_logs`

---

## 5. Infraestructura Operativa

| Recurso | Valor |
|---|---|
| Proveedor VPS | Hostinger |
| IP Pública VPS | `89.117.32.46` |
| Panel operativo | EasyPanel (sobre Docker) |
| Dominio padre | `cystec.cloud` (hPanel Hostinger) |

### Registros DNS

| Subdominio | Estado |
|---|---|
| `massaro.cystec.cloud` | ✅ Vinculado + SSL Let's Encrypt |
| `api.massaro.cystec.cloud` | ⏳ DNS creado, servicio pendiente |
| `admin.massaro.cystec.cloud` | ⏳ DNS creado, servicio pendiente |
| `status.massaro.cystec.cloud` | ⏳ DNS creado, servicio pendiente |

### Pipeline de Despliegue (Frontend actual)

```
git push origin main
  → EasyPanel → Deploy manual (botón)
    → docker build (multi-stage)
      → Nginx sirve /dist
        → massaro.cystec.cloud ✅
```

> **Git Workflow**: Trunk Based Development — rama `main` siempre en estado desplegable.

---

## 6. Harness Engineering (Reglas Operativas del Agente IA)

Este proyecto implementa un sistema de **control de agente** muy bien definido. Antes de cualquier acción debo:

### Flujo de inicialización obligatorio

1. **Leer contexto** — Estructura del proyecto + archivos base
2. **Leer skills** — Carpeta `agent/` (habilidades técnicas validadas)
3. **Validar entorno** — `./init.sh` (actualmente 31 checks). **Si falla → STOP**
4. **Proponer** → **Planificar** (`task.md`) → **Esperar aprobación** → **Ejecutar**

### Reglas clave

| Regla | Detalle |
|---|---|
| **Lectura previa** | `agents.md` + `specs.md` + `memory.md` + carpeta `agent/` antes de proponer cambios |
| **Modificaciones destructivas** | Requieren autorización explícita (`rm -rf`, migraciones, reescritura de funciones core) |
| **Secretos** | Prohibido commitear `.env`, tokens o IPs reales (`.gitignore` estricto) |
| **Modularidad** | Archivos > 200–300 líneas deben refactorizarse |
| **Validación incremental** | `npm run build` frecuente para verificar integridad |
| **`task.md`** | Solo marcar `[x]` cuando esté **100% verificado** funcionalmente |
| **`memory.md`** | Solo actualizar cuando el usuario lo indique expresamente |

### Convenciones de código

- **Variables/funciones**: en **Inglés**
- **Documentación y UI visible**: en **Español**
- **Comentarios HTML/CSS**: obligatorios, simples, en Español
- **Assets**: `src/assets/img/` (rasterizados) · `src/assets/icon/` (vectoriales SVG)
- **Estilos**: siempre en el módulo Sass 7–1 correspondiente, nunca ad-hoc

---

## 7. Workflow de Desarrollo con IA

| Herramienta | Rol |
|---|---|
| **Antigravity** | IDE agent-first (modelo principal) |
| **Gemini** | Modelo principal en el IDE |
| **OpenCode** | Agente terminal-first para tareas controladas |
| **DeepSeek** | Modelo alternativo/complementario en OpenCode |
| **Hostinger MCP** | API de Hostinger para DNS, VPS y operaciones de infraestructura |

> ⚠️ La revisión humana es **obligatoria** en: seguridad, pasarela de pago, infraestructura y despliegue productivo.

---

## 8. Bugs Conocidos

| Bug | Solución |
|---|---|
| Menú móvil invisible con `clip-path` | Usar `opacity` + `visibility` + `transform: translateY` |
| Scroll horizontal no deseado en móvil | `overflow-x: hidden` en `body` + `_reset.scss` |
| EasyPanel Internal Server Error al agregar dominio | Eliminar dominio fantasma desde lista global, luego recrearlo dentro del servicio |
| Imágenes rotas en producción (assets dinámicos Vite) | Usar `import img from '../assets/...'` en lugar de strings de ruta |
| HTTPS no forzado por Traefik | Configurar Middleware HTTP→HTTPS en EasyPanel |

---

## 9. Fases de Implementación

| Fase | Descripción | Estado |
|---|---|---|
| **Fase 1** | Base de infraestructura + Frontend desplegado | ✅ Completada |
| **Fase 2** | Carrito + Checkout WhatsApp (Vanilla JS) | 🔄 Planificada |
| **Fase 3** | Backend API (Fastify) + PostgreSQL + Redis | ⏳ Pendiente |
| **Fase 4** | Pasarela de pago + Worker asincrónico | ⏳ Pendiente |
| **Fase 5** | Endurecimiento operativo + Backups + Admin | ⏳ Pendiente |
| **Futuro** | React + TypeScript (cuando el estado lo justifique) | ⏳ Planificado |

---

## 10. Próximas Acciones Prioritarias

> [!IMPORTANT]
> La **Fase 2** es la siguiente acción de desarrollo. El frontend funciona pero aún no tiene capacidad transaccional.

1. **Implementar Carrito Lateral** — Estado Vanilla JS + `localStorage` + validación de variantes
2. **Implementar Checkout WhatsApp** — Consolidación de pedido + mensaje preformateado
3. **Punto de control React** — Evaluar si la complejidad del estado justifica migración
4. **Crear proyecto en EasyPanel** — Para servicios `postgres`, `redis`, `api`, `worker`
5. **Configurar Middleware HTTP→HTTPS** — En EasyPanel (Traefik) para forzar SSL
6. **Definir pasarela de pago** — Transbank, Khipu, MercadoPago o Flow

---

## 11. Archivos Clave del Proyecto

* [README.md](file:///home/jet/proyectos_lnx/massaro-sushi/README.md)
* [agents.md](file:///home/jet/proyectos_lnx/massaro-sushi/agents.md)
* [specs.md](file:///home/jet/proyectos_lnx/massaro-sushi/specs.md)
* [infrastructure.md](file:///home/jet/proyectos_lnx/massaro-sushi/infrastructure.md)
* [memory.md](file:///home/jet/proyectos_lnx/massaro-sushi/memory.md)
* [src/data/menu.js](file:///home/jet/proyectos_lnx/massaro-sushi/src/data/menu.js)
* [src/js/catalog.js](file:///home/jet/proyectos_lnx/massaro-sushi/src/js/catalog.js)
* [src/sass/app.scss](file:///home/jet/proyectos_lnx/massaro-sushi/src/sass/app.scss)
* [vite.config.js](file:///home/jet/proyectos_lnx/massaro-sushi/vite.config.js)
* [Dockerfile](file:///home/jet/proyectos_lnx/massaro-sushi/Dockerfile)
* [nginx.conf](file:///home/jet/proyectos_lnx/massaro-sushi/nginx.conf)
* [init.sh](file:///home/jet/proyectos_lnx/massaro-sushi/init.sh)
