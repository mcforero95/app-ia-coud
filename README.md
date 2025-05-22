SaaS Generativo - Aplicación Angular

Este proyecto es una aplicación SaaS que permite optimizar documentos mediante IA. Desarrollado en Angular, con una arquitectura modular y pensado para ser desplegado en contenedores Docker.

🚀 Tecnologías Utilizadas

Angular (Frontend)

TypeScript

TailwindCSS (Para estilos)

Docker (Para contenedores)

Google Cloud Platform (GCP) (Para despliegue)

API Backend (Comunicación con FastAPI o Node.js)

📌 Requisitos Previos

Asegúrate de tener instalados:

Node.js (v18 o superior)

Angular CLI (npm install -g @angular/cli)

Docker (Para contenedores)

Cuenta en Google Cloud Platform (Para el despliegue en GCP, opcional)

📂 Estructura del Proyecto

📦 proyecto-angular
 ┣ 📂 src
 ┃ ┣ 📂 app
 ┃ ┃ ┣ 📂 components  # Componentes reutilizables
 ┃ ┃ ┣ 📂 pages       # Vistas principales (Login, Dashboard)
 ┃ ┃ ┗ 📂 services    # Servicios de conexión con la API
 ┃ ┣ 📂 assets        # Recursos estáticos (imágenes, estilos, etc.)
 ┃ ┗ 📜 main.ts       # Punto de entrada de Angular
 ┣ 📜 package.json    # Dependencias del proyecto
 ┣ 📜 angular.json    # Configuración de Angular
 ┣ 📜 Dockerfile      # Configuración para Docker
 ┗ 📜 README.md       # Documentación

🔧 Instalación y Configuración

1️⃣ Clonar el Repositorio:

git clone https://github.com/williamalarcon/app-ia-coud.git
cd app-ia-coud

2️⃣ Instalar Dependencias:

npm install

3️⃣ Ejecutar en Desarrollo:

ng serve --open

Esto abrirá la aplicación en http://localhost:4200/

🐳 Ejecutar con Docker

1️⃣ Construir la imagen Docker:

docker build -t frontent-ia .

2️⃣ Ejecutar el contenedor:

docker run -p 8080:80 frontent-ia

Accede a http://localhost:8080/

