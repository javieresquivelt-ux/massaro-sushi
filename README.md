<div align="center">
  <img src="src/assets/img/logo_massaro.jpg" alt="Massaro Sushi" width="120" />
  <h1>🍣 Massaro Sushi</h1>
  <p><em>E-commerce SPA — Tienda online de comida rápida</em></p>
</div>

---

## 🎯 Objetivos

Proyecto práctico que aplica conceptos de:

- **SPA con Vanilla JS** — Renderizado dinámico sin framework
- **Arquitectura Sass 7–1** — Estilos modulares y escalables
- **Vite** — Build tool moderno con HMR
- **Imágenes responsivas** — Formato WebP, optimización con sharp-cli
- **Mobile-first** — UX priorizando dispositivos móviles (navegación hamburguesa, botonera flotante, filtro select nativo)
- **Despliegue GitOps** — Docker multi-stage + EasyPanel + Nginx
- **Harness Engineering** — Flujo de trabajo asistido por IA con guards operativos

---

## 📁 Estructura (simplificada)

```
massaro-sushi/
├── index.html              ← Entrada HTML
├── vite.config.js          ← Configuración Vite
├── Dockerfile              ← Build multi-stage
├── nginx.conf              ← Config Nginx SPA
├── public/                 ← Assets estáticos (favicon)
├── src/
│   ├── main.js             ← Entry point JS
│   ├── assets/
│   │   ├── img/            ← Imágenes (webp, logo)
│   │   └── icon/           ← Iconos vectoriales
│   ├── data/
│   │   └── menu.js         ← Carta completa (~40 productos)
│   ├── js/
│   │   └── catalog.js      ← Lógica de filtrado y render
│   └── sass/               ← Arquitectura 7–1
│       ├── app.scss        ← Orquestador
│       ├── abstracts/
│       ├── base/
│       ├── components/
│       ├── layout/
│       ├── pages/
│       ├── themes/
│       └── vendors/
└── agent/                  ← Skills IA
```

---

## 🧭 Secciones del sitio

- **Hero** — Portada con logo, título y CTA
- **Catálogo** — Grid de productos con filtro por categoría (tabs desktop + select móvil)
- **Promos** — Lista ampliada con detalle de piezas y contenido
- **Footer** — Delivery, contacto y redes sociales

---

## 🛠️ Tecnologías

![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)
![Sass](https://img.shields.io/badge/Sass-CC6699?style=flat&logo=sass&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white)
![Nginx](https://img.shields.io/badge/Nginx-009639?style=flat&logo=nginx&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)
![Hostinger](https://img.shields.io/badge/Hostinger-673DE6?style=flat&logo=hostinger&logoColor=white)

---

## 👤 Autor

Proyecto elaborado por [**javieresquivelt-ux**](https://github.com/javieresquivelt-ux)

![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat&logo=github&logoColor=white)
