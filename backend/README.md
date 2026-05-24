# DataShield Backend

API del Sistema Comunitario de Registro de Fraudes Digitales para Paraguay.

## Requisitos

- Node.js 18+
- npm

## Instalación rápida

```bash
# 1. Clonar el repositorio
git clone https://github.com/lucasmanua/DataShield.git
cd DataShield/backend

# 2. Configurar variables de entorno
cp .env.example .env
# Editar .env si es necesario (por defecto usa SQLite local)

# 3. Instalar dependencias y preparar base de datos
npm run setup

# 4. Iniciar servidor
npm run dev
```

El servidor arrancará en `http://localhost:3000`.

## Scripts disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia el servidor con recarga automática (nodemon) |
| `npm start` | Inicia el servidor en producción |
| `npm test` | Ejecuta las pruebas unitarias |
| `npm run setup` | Instala dependencias, genera Prisma Client y crea la BD |
| `npm run db:setup` | Crea/actualiza la base de datos con Prisma migrations |
| `npm run db:generate` | Regenera Prisma Client |

## Base de datos

Por defecto usa **SQLite** (archivo `dev.db` en el proyecto) para desarrollo local.

Para producción, cambiar `DATABASE_URL` en `.env` a una base de datos PostgreSQL:

```env
DATABASE_URL=postgresql://usuario:password@localhost:5432/datashield
```

## Variables de entorno (`.env`)

| Variable | Obligatorio | Descripción |
|----------|-------------|-------------|
| `DATABASE_URL` | ✅ | URL de conexión a la BD |
| `JWT_SECRET` | ✅ | Secreto para firmar tokens JWT |
| `PORT` | ❌ | Puerto del servidor (por defecto: 3000) |
| `ALLOWED_ORIGINS` | ❌ | Orígenes permitidos por CORS |
| `EMAIL_HOST` | ❌ | Servidor SMTP para notificaciones |
| `EMAIL_PORT` | ❌ | Puerto SMTP |
| `EMAIL_USER` | ❌ | Usuario SMTP |
| `EMAIL_PASS` | ❌ | Contraseña SMTP |
| `EMAIL_FROM` | ❌ | Remitente de correos |

## Endpoints principales

### Auth
- `POST /api/auth/register` - Registro de usuario
- `POST /api/auth/login` - Inicio de sesión
- `GET /api/auth/profile` - Perfil del usuario (requiere token)

### Reportes
- `POST /api/reports` - Crear reporte (requiere token)
- `GET /api/reports/search` - Buscar reportes propios (requiere token)
- `GET /api/reports/:id` - Detalle de reporte (requiere token)
- `GET /api/reports/public/search` - Búsqueda pública (sin token)
- `GET /api/reports/stats` - Estadísticas públicas (sin token)

### Admin (requiere rol ADMIN o MODERATOR)
- `GET /api/admin/reports` - Listar todos los reportes
- `PUT /api/admin/reports/:id/validate` - Validar/rechazar/investigar reporte
- `GET /api/admin/reports/export` - Exportar reportes a CSV
- `GET /api/admin/alerts` - Alertas activas

## Seguridad

- Validación de entrada con Zod
- Rate limiting en rutas de autenticación
- Headers de seguridad con Helmet
- CORS con lista blanca
- Contraseñas hasheadas con bcrypt
- Tokens JWT con expiración de 7 días
