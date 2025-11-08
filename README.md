# 🚀 Portafolio Personal - Full Stack

Un portafolio personal moderno y profesional desarrollado con Django REST Framework y Angular 18, diseñado para mostrar proyectos, habilidades y experiencia de manera elegante y eficiente.

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Tecnologías](#-tecnologías)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación](#-instalación)
- [Configuración](#-configuración)
- [Uso](#-uso)
- [Despliegue](#-despliegue)
- [API Endpoints](#-api-endpoints)
- [Contribuir](#-contribuir)
- [Licencia](#-licencia)

## ✨ Características

- **Frontend Moderno**: Interfaz desarrollada con Angular 18 y Tailwind CSS
- **API RESTful**: Backend robusto con Django REST Framework
- **Base de Datos**: PostgreSQL para almacenamiento de datos
- **Containerización**: Docker y Docker Compose para fácil despliegue
- **Gestión de Proyectos**: Sistema completo para mostrar proyectos con imágenes y detalles
- **Sistema de Habilidades**: Organización de habilidades por categorías (Frontend, Backend, DevOps, etc.)
- **Formulario de Contacto**: Sistema de contacto con notificaciones por email
- **Responsive Design**: Diseño adaptable a todos los dispositivos

## 🛠 Tecnologías

### Backend
- **Django 5.0.1**: Framework web de Python
- **Django REST Framework 3.14.0**: Construcción de APIs REST
- **PostgreSQL**: Base de datos relacional
- **Pillow**: Procesamiento de imágenes
- **Boto3**: Integración con AWS S3
- **Gunicorn**: Servidor WSGI para producción
- **WhiteNoise**: Servir archivos estáticos

### Frontend
- **Angular 18**: Framework de JavaScript
- **TypeScript**: Lenguaje de programación
- **Tailwind CSS 3.4**: Framework de CSS utility-first
- **RxJS**: Programación reactiva
- **Nginx**: Servidor web para producción

### DevOps
- **Docker**: Containerización
- **Docker Compose**: Orquestación de contenedores
- **Nginx**: Reverse proxy y servidor web
- **AWS**: Despliegue en la nube

## 📁 Estructura del Proyecto

```
Pagina_portafolio_personal/
├── backend_django/
│   └── portfolio_backend/
│       ├── api/                 # Aplicación API
│       │   ├── models.py        # Modelos de datos
│       │   ├── views.py         # Vistas/ViewSets
│       │   ├── serializers.py   # Serializadores
│       │   └── urls.py          # URLs de la API
│       ├── portfolio_backend/    # Configuración Django
│       │   ├── settings.py      # Configuración principal
│       │   └── urls.py          # URLs principales
│       ├── manage.py
│       ├── requirements.txt
│       └── Dockerfile
├── frontend_angular18/
│   ├── src/
│   │   └── app/
│   │       ├── components/      # Componentes Angular
│   │       ├── services/        # Servicios (API, Data)
│   │       └── models/          # Modelos TypeScript
│   ├── package.json
│   └── Dockerfile
├── nginx/
│   └── nginx.conf               # Configuración Nginx
└── docker-compose.yml           # Desarrollo
```

## 📦 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Python 3.10+**
- **Node.js 18+** y **npm**
- **Docker** y **Docker Compose**
- **Git**

## 🔧 Instalación

### Docker 

1. **Clonar el repositorio**
```bash
git clone <tu-repositorio>
cd Pagina_portafolio_personal
```

2. **Crear archivo `.env`**
```bash
ver ->.env.produccion.example
```

3. **Construir y levantar los contenedores**
```bash
docker-compose up -d --build
```

4. **Crear superusuario (si es necesario)**
```bash
docker-compose exec backend python manage.py createsuperuser
```

5. **Aplicar migraciones**
```bash
docker-compose exec backend python manage.py migrate
```

### Configuración de Angular

Edita `frontend_angular18/src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8000/api',
  enableLogging: true
};
```

## 🚀 Uso

### Desarrollo

1. **Iniciar servicios con Docker**
```bash
docker-compose up
```

2. **Acceder a la aplicación**
   - Frontend: http://localhost:80
   - Backend API: http://localhost:8000/api
   - Admin Django: http://localhost:8000/admin

### Producción

1. **Usar configuración de producción**
```bash
docker-compose -f docker-compose.prod.yml up -d --build
```

2. **Recopilar archivos estáticos**
```bash
docker-compose exec backend python manage.py collectstatic --noinput
```

## 📡 API Endpoints

### Perfil
- `GET /api/profile/current/` - Obtener perfil actual

### Habilidades
- `GET /api/skills/` - Listar todas las habilidades
- `GET /api/skills/by_category/` - Habilidades agrupadas por categoría
- `GET /api/skills/{id}/` - Detalle de una habilidad

### Proyectos
- `GET /api/projects/` - Listar todos los proyectos
- `GET /api/projects/featured/` - Proyectos destacados
- `GET /api/projects/{id}/` - Detalle de un proyecto

### Contacto
- `POST /api/contact/` - Enviar mensaje de contacto

## 🚢 Despliegue

### AWS EC2

1. **Comprimir archivo**
```bash
tar -czf portfolio.tar.gz \
  --exclude='.git' \
  --exclude='*.pem' \
  --exclude='postgres_data' \
  .
```
2. **Subir a EC2**
```bash
pscp -i "key.ppk" "portfolio.tar.gz" ubuntu@IP_ADDRESS:/home/ubuntu/
```
3. **Conectarse a EC2**
```bash
mkdir -p ~/portfolio
tar -xzf portfolio.tar.gz -C ~/portfolio
cd ~/portfolio
```
4. **Levantar contenedores**
```bash
cp .env.production .env
docker-compose -f docker-compose.ec2.yml up -d --build
```

## 📝 Modelos de Datos

### Profile
- Información personal, redes sociales, imagen de perfil, CV

### Skill
- Habilidades organizadas por categorías (Frontend, Backend, DevOps, etc.)
- Niveles de competencia (Principiante, Intermedio, Avanzado)

### Project
- Proyectos con descripción, tecnologías, imágenes, enlaces
- Estados: Completado, En Progreso, Planificado
- Proyectos destacados

### Contact
- Mensajes de contacto con notificaciones por email

## 👤 Autor

**Gabriel Del Cid**
- LinkedIn: https://www.linkedin.com/in/gabriel-delcid-13200x
- Email: gabriel13.dev@gmail.com

## 🙏 Agradecimientos

- Django y Django REST Framework
- Angular Team
- Tailwind CSS
- Comunidad de desarrolladores open source

---

⭐ Si te gusta este proyecto, ¡dale una estrella en GitHub!