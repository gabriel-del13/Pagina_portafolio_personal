# Stage 1: Build
FROM node:20-alpine AS build
WORKDIR /app

# Copiar archivos de configuración primero
COPY package*.json ./
COPY tailwind.config.js ./
COPY postcss.config.js ./

# Instalar dependencias
RUN npm ci --legacy-peer-deps

# Copiar el resto del código
COPY . .

# Limpiar y construir
RUN rm -rf dist .angular node_modules/.cache
RUN npm run build -- --configuration production --output-hashing=all

# Stage 2: Serve
FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

COPY --from=build /app/dist/frontend_angular18/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]