# Usa una imagen de Node.js para construir la aplicación
FROM node:22 AS build

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de la aplicación
COPY . .

# Construye la aplicación para producción
RUN npm run build --prod

# Usa una imagen de Nginx para servir la aplicación
FROM nginx:alpine

# Copia los archivos construidos desde la etapa anterior
COPY --from=build /app/dist/frontent-ia /usr/share/nginx/html

# 🔧 Ajusta nginx para escuchar en el puerto requerido por Cloud Run
RUN sed -i 's/80;/8080;/g' /etc/nginx/conf.d/default.conf

# Expone el puerto 8080 como lo requiere Cloud Run
EXPOSE 8080

# Comando para ejecutar Nginx
CMD ["nginx", "-g", "daemon off;"]