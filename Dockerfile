# =====================================================
# Stage 1: Build — Compila el proyecto Vite + Sass
# =====================================================
FROM node:20-alpine AS builder

WORKDIR /app

# Copiar manifests de dependencias
COPY package.json package-lock.json ./

# Instalar dependencias (incluyendo devDependencies para el build)
RUN npm ci

# Copiar el resto del código fuente
COPY . .

# Compilar el proyecto (genera la carpeta /app/dist)
RUN npm run build

# =====================================================
# Stage 2: Serve — Nginx sirve los archivos estáticos
# =====================================================
FROM nginx:stable-alpine

# Copiar los archivos compilados al directorio de Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Copiar la configuración personalizada de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer el puerto 80 (estándar HTTP)
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
