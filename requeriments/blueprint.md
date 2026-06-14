# Blueprint técnico: tienda online de comida rápida en Hostinger VPS + EasyPanel

## Objetivo

Este blueprint define una arquitectura práctica para una tienda online pequeña-mediana de comida rápida desplegada sobre Hostinger VPS con EasyPanel, priorizando operación estable, costos controlados, escalabilidad gradual y buena experiencia móvil. Hostinger permite usar EasyPanel sobre VPS y administrarlo desde el panel del servidor, mientras EasyPanel trabaja con proyectos y servicios desplegados en contenedores Docker.[cite:2][cite:1]

La solución propuesta asume una web app responsive, mobile-first y orientada a ecommerce local, con catálogo, carrito, checkout, pagos online, administración básica de pedidos y servicios internos separados. Mercado Pago documenta un flujo de Checkout API con notificaciones y pruebas antes de pasar a producción, lo que encaja bien con una API propia y un servicio worker para procesar eventos.[cite:74]

## Principios de diseño

La arquitectura se apoya en cinco principios: separar servicios críticos, exponer solo lo necesario a internet, usar PostgreSQL como fuente maestra de datos, usar Redis como acelerador operacional y respaldar bases de datos fuera del VPS mediante almacenamiento compatible con S3.[cite:42][cite:39][cite:78]

También se considera que EasyPanel publica dominios por servicio HTTP y administra SSL, por lo que el diseño evita exponer PostgreSQL o Redis al exterior. La documentación de EasyPanel y guías relacionadas indican que los puertos 80 y 443 deben quedar disponibles para proxy inverso y terminación SSL, mientras el panel administrativo utiliza el puerto 3000 durante el acceso inicial.[cite:73][cite:72][cite:2]

## Arquitectura objetivo

### Vista general

La plataforma queda dividida en servicios públicos y servicios internos.

**Servicios públicos**
- `frontend`: sitio público responsive para clientes.
- `api`: backend HTTP para catálogo, carrito, checkout, pedidos y webhooks.
- `admin`: panel interno protegido para operación del local.

**Servicios internos**
- `postgres`: base de datos principal.
- `redis`: caché, sesiones, rate limiting y cola ligera.
- `worker`: procesamiento asincrónico.
- `postgres-backup`: respaldo programado a S3 compatible, si se prefiere como app separada.[cite:45]

### Flujo lógico

1. El cliente entra a `www.tudominio.cl` y navega el menú responsive.
2. El frontend consulta `api.tudominio.cl` para catálogo, horarios, zonas y carrito.
3. La API persiste pedidos y pagos en PostgreSQL.[cite:42]
4. Redis se usa para caché, sesiones temporales, idempotencia y cola corta de trabajos.[cite:39]
5. La pasarela de pago redirige o procesa el pago según integración elegida, y notifica al backend por webhook o notification URL.[cite:74]
6. El worker consume eventos y ejecuta tareas de correo, conciliación, reintentos y avisos al local.

## Stack recomendado

### Opción recomendada

- **Frontend**: Next.js.
- **Backend API**: Fastify con Node.js.
- **Panel admin**: módulo dentro del mismo frontend o app separada ligera.
- **Base de datos**: PostgreSQL.[cite:42]
- **Cache y cola**: Redis.[cite:39]
- **Infraestructura**: Hostinger VPS + EasyPanel.[cite:1][cite:2]

Esta combinación equilibra velocidad de desarrollo, facilidad de despliegue en contenedores y mantenimiento razonable. EasyPanel documenta que las apps pueden construirse desde repositorios y Dockerfile, mientras Postgres y Redis están soportados como servicios propios dentro del panel.[cite:55][cite:44][cite:42][cite:39]

### Por qué no WordPress en este diseño

WordPress puede servir para salir rápido, pero este blueprint privilegia control operacional, separación clara de capas y evolución hacia automatizaciones y reglas de negocio más finas. La presencia de EasyPanel como capa de despliegue en un VPS favorece una arquitectura con servicios desacoplados en lugar de un monolito CMS.[cite:1][cite:2]

## Dominios y subdominios

Se recomienda esta estructura:

| Dominio/Subdominio | Uso | Exposición |
|---|---|---|
| `www.tudominio.cl` | Sitio público y flujo de compra | Público [cite:73] |
| `api.tudominio.cl` | API, checkout, webhooks | Público [cite:73] |
| `admin.tudominio.cl` | Panel interno de operación | Público pero protegido [cite:73] |
| `status.tudominio.cl` | Estado básico o health endpoint | Opcional [cite:73] |
| `postgres` | Base de datos | Solo interno [cite:42] |
| `redis` | Caché/cola/sesiones | Solo interno [cite:39] |

EasyPanel permite asociar dominios y configurar SSL por servicio expuesto, y su guía de SSL indica activar el dominio y exponer el puerto correcto detrás de Traefik con Let’s Encrypt o certificado personalizado.[cite:73]

## Servicios detallados

### Frontend

Responsabilidades:
- Catálogo y categorías.
- Página de producto.
- Carrito.
- Checkout responsive.
- Seguimiento de pedido.
- Páginas informativas: horarios, cobertura, contacto, términos.

Criterios UI:
- Mobile-first.
- Botones táctiles cómodos.
- Carrito persistente temporalmente.
- Flujo de pago con el menor número posible de pasos.

### API

Responsabilidades:
- Productos, categorías, modificadores y combos.
- Horarios de tienda.
- Zonas de despacho y tarifas.
- Creación de pedidos.
- Integración con pasarela.
- Recepción y validación de webhooks.
- Autenticación del panel admin.
- Reporte básico operativo.

La integración con Checkout API de Mercado Pago requiere crear la aplicación, configurar métodos de pago, notificaciones, pruebas y salida a producción, lo que refuerza la necesidad de una API propia bien delimitada.[cite:74]

### PostgreSQL

PostgreSQL será la fuente de verdad de la operación. EasyPanel documenta Postgres como servicio basado en la imagen oficial y orientado a ser administrado como base de datos de primera clase dentro de la plataforma.[cite:42][cite:44]

Tablas mínimas sugeridas:
- `products`
- `categories`
- `product_variants`
- `modifier_groups`
- `modifiers`
- `combos`
- `customers`
- `customer_addresses`
- `orders`
- `order_items`
- `payments`
- `payment_events`
- `delivery_zones`
- `delivery_fees`
- `store_hours`
- `audit_logs`
- `webhook_logs`

Campos prácticos recomendados:
- `orders.idempotency_key`
- `orders.status`
- `orders.payment_status`
- `payments.provider`
- `payments.provider_reference`
- `payment_events.payload_raw`
- `payment_events.signature_valid`

### Redis

Redis se incluye desde el inicio, no como base principal sino como acelerador y capa operacional. EasyPanel lo soporta como servicio propio basado en la imagen oficial de Redis.[cite:39]

Usos concretos:
- Caché de productos, categorías y horarios.
- Estado temporal del carrito invitado.
- Sesiones cortas.
- Rate limiting en endpoints sensibles.
- Locks breves para evitar doble confirmación de pedido.
- Cola liviana para correos, reintentos y notificaciones.[cite:39]

### Worker

Responsabilidades:
- Procesar eventos de pago.
- Enviar correo de confirmación.
- Notificar al local.
- Reintentar webhooks o tareas fallidas.
- Limpiar claves temporales en Redis.
- Registrar trazabilidad operacional.

Separar este servicio reduce el riesgo de que una tarea lenta afecte el tiempo de respuesta del checkout.

### Admin

El panel admin debería ofrecer solo lo necesario para el MVP:
- Ver pedidos nuevos.
- Cambiar estado de pedido.
- Revisar pagos.
- Editar productos y disponibilidad.
- Definir horarios y zonas.
- Ver incidencias básicas.

## Responsive y UX

La app debe construirse como web responsive desde el inicio, con estrategia mobile-first, porque el flujo de compra en comida rápida suele ocurrir desde teléfono. El diseño debe optimizar el camino “ver producto → agregar → pagar”, con tarjetas legibles, botones grandes y formularios breves.[cite:74]

Pautas mínimas:
- 375 px como ancho base de diseño.
- Navbar simplificado en móvil.
- Grid de productos de 1 columna en móvil, 2 en tablet y 3 o más en desktop.
- Checkout en pasos breves o una sola pantalla clara.
- Estado visible del carrito y total siempre accesible.

## Seguridad

### Exposición de red

Solo deben exponerse `frontend`, `api` y eventualmente `admin`. PostgreSQL y Redis deben permanecer en red privada del proyecto, sin puertos públicos.[cite:42][cite:39]

### Controles recomendados

- Variables sensibles gestionadas en EasyPanel, no en el repositorio.[cite:55]
- Validación de firma y de origen en webhooks de pasarela.[cite:74]
- Idempotencia para creación de pedidos y confirmación de pagos.
- Límite de intentos para login del panel admin usando Redis.[cite:39]
- Autenticación fuerte para el admin.
- Registro de auditoría de cambios importantes.
- TLS/SSL activo en todos los servicios web públicos.[cite:73]

### Operación segura

La guía de Hostinger para EasyPanel indica que el acceso inicial al panel parte por `http://IP:3000`, tras lo cual se crea la cuenta y se configuran proyectos y servicios. Eso refuerza la conveniencia de asegurar cuanto antes el acceso administrativo y luego concentrar las apps de negocio detrás de dominios con SSL.[cite:2]

## Backups

EasyPanel documenta respaldos de base de datos hacia proveedores compatibles con S3 y permite configurar recurrencia por servicio de base de datos.[cite:78] También existe una plantilla/app específica `postgres-backup-s3` para respaldar PostgreSQL de forma periódica a S3.[cite:45]

### Política recomendada

- PostgreSQL: backup diario automático.[cite:78]
- Backup adicional antes de despliegues riesgosos o migraciones.
- Retención inicial de 7 a 14 días.
- Copia externa a bucket S3-compatible, no solo almacenamiento local.[cite:78][cite:45]
- Prueba mensual de restauración.
- Redis con persistencia solo como apoyo operativo; no sustituye backup de la base principal.[cite:39]

## Recursos y sizing inicial

Como base para una tienda pequeña-mediana, la gama de EasyPanel VPS publicada por Hostinger parte en 1 vCPU y 4 GB RAM y escala hasta 8 vCPU y 32 GB RAM.[cite:1] Para este caso, el piso práctico recomendado es 2 vCPU y 4 GB RAM, dejando margen para sistema, proxy, builds y picos moderados.

Distribución orientativa:

| Servicio | RAM sugerida | Observación |
|---|---:|---|
| Frontend | 512 MB a 1 GB | Público |
| API | 512 MB a 1 GB | Público |
| Worker | 256 MB a 512 MB | Interno |
| PostgreSQL | 1 GB a 1.5 GB | Interno [cite:42] |
| Redis | 256 MB a 512 MB | Interno [cite:39] |
| Reserva sistema/proxy | 1 GB aprox. | Host + Traefik |

## Orden de implementación

### Fase 1: base de infraestructura

1. Revisar VPS, acceso root y estado de EasyPanel.[cite:2]
2. Crear proyecto productivo en EasyPanel.[cite:2]
3. Configurar dominios y DNS.
4. Confirmar disponibilidad de puertos 80 y 443 para publicación y SSL.[cite:72]

### Fase 2: datos y servicios internos

1. Crear servicio PostgreSQL.[cite:42]
2. Crear servicio Redis.[cite:39]
3. Configurar variables de entorno y secretos.
4. Preparar política de backups S3-compatible.[cite:78][cite:45]

### Fase 3: backend y frontend

1. Desplegar API desde repositorio o Dockerfile.[cite:55]
2. Ejecutar migraciones iniciales.
3. Desplegar frontend responsive.[cite:55]
4. Desplegar panel admin o módulo admin.

### Fase 4: pagos y automatización

1. Integrar pasarela de pago.
2. Configurar notificaciones/webhooks de pago.[cite:74]
3. Desplegar worker.
4. Probar creación de pedido, pago exitoso, rechazo, timeout y webhook duplicado.[cite:74]

### Fase 5: endurecimiento operativo

1. Configurar límites de recursos por contenedor.
2. Activar respaldos programados.[cite:78]
3. Crear health checks.
4. Preparar rollback básico.
5. Ejecutar pruebas manuales en móvil y escritorio.

## MVP recomendado

El MVP debe mantener alcance acotado para salir rápido y con menos riesgo:
- Catálogo y categorías.
- Modificadores y extras.
- Horarios.
- Zonas de despacho.
- Checkout con pago online.
- Confirmación básica por correo.
- Panel admin con estados de pedido.
- Redis para caché, rate limit y cola liviana.[cite:39]

Quedan fuera del MVP:
- Multi-sucursal.
- Programa de puntos.
- Promociones complejas.
- App móvil nativa.
- Integraciones ERP pesadas.

## Riesgos principales y mitigación

| Riesgo | Impacto | Mitigación |
|---|---|---|
| Un contenedor consume demasiada RAM | Puede afectar checkout y API | Asignar límites por servicio y evitar mezclar cargas pesadas |
| Redis o Postgres expuestos a internet | Riesgo de seguridad alto | Mantener ambos solo en red interna [cite:42][cite:39] |
| Webhook duplicado del medio de pago | Pedidos o cobros duplicados | Idempotencia, locks en Redis y tabla de eventos [cite:39][cite:74] |
| Backups solo locales | Pérdida de datos ante incidente del VPS | Backup externo a S3-compatible [cite:78][cite:45] |
| Panel admin demasiado abierto | Riesgo operacional | Proteger con auth fuerte, IP allowlist o capa adicional |

## Checklist de despliegue

- VPS operativo con EasyPanel accesible.[cite:2]
- Puertos 80 y 443 libres.[cite:72]
- Proyecto creado en EasyPanel.[cite:2]
- Servicios `postgres` y `redis` creados.[cite:42][cite:39]
- Variables de entorno cargadas.
- Dominio y subdominios resueltos por DNS.
- SSL activo por dominio.[cite:73]
- Backups configurados a S3-compatible.[cite:78]
- API desplegada y migrada.[cite:55]
- Frontend desplegado y responsive.
- Worker activo.
- Pasarela integrada y validada.[cite:74]
- Flujo completo probado en móvil y desktop.

## Siguiente entregable sugerido

El siguiente paso natural es bajar este blueprint a un documento de implementación con nombres reales de servicios, variables de entorno, puertos expuestos, dependencias, secuencia de despliegue y checklist de pruebas productivas. Ese documento puede usarse directamente como guía operativa dentro de EasyPanel y como base para pedir a un modelo de IA que implemente gran parte del proyecto con supervisión humana.[cite:55][cite:74]
