# DataShield 🛡️

**Sistema Comunitario de Registro de Fraudes Digitales - Paraguay**

DataShield es una plataforma web que permite a los ciudadanos paraguayos consultar y reportar fraudes digitales de forma comunitaria. Antes de realizar una transferencia, podés verificar si un número de teléfono, correo electrónico o cuenta bancaria ya fue reportado como fraudulento.

## Estructura del proyecto

```
DataShield/
├── backend/          # API REST (Express + Prisma)
│   ├── src/          # Código fuente
│   ├── prisma/       # Esquema y migraciones de BD
│   └── tests/        # Pruebas unitarias
├── frontend/
│   ├── landing/      # Landing page (React + Vite + Tailwind)
│   └── app/          # Aplicación SPA (React + Vite + Tailwind + React Router)
└── README.md
```

## Requisitos

- Node.js 18+
- npm

## Inicio rápido

### 1. Backend (único comando necesario)

```bash
cd backend
cp .env.example .env
npm run setup    # Instala deps + crea BD automáticamente
npm run dev      # Servidor en http://localhost:3000
```

El backend ya sirve la app completa (API + frontend). Solo abrir:
- **App principal:** `http://localhost:3000/app/`
- **Landing page:** `http://localhost:3000/`
- **API:** `http://localhost:3000/api/...`

### 2. Modo desarrollo frontend (opcional)

Si quieres modificar el frontend con recarga en caliente:

```bash
# App SPA (dashboard, admin, consultas)
cd frontend/app
npm install
npm run dev    # http://localhost:5173

# Landing page
cd frontend/landing
npm install
npm run dev    # http://localhost:5174
```

## Base de datos

**Opción A - SQLite local (default, recomendado):**
Cada desarrollador tiene su propia BD. No necesita servidor. Ideal para desarrollo.

**Opción B - PostgreSQL compartido (todos ven los mismos datos):**
1. Crear cuenta gratis en [Neon](https://neon.tech) (500MB, sin tarjeta)
2. Copiar la URL de conexión
3. En `backend/.env` cambiar:
   ```env
   DATABASE_URL=postgresql://user:pass@ep-xxxx.neon.tech/datashield?sslmode=require
   ```
4. Ejecutar `npm run db:setup` para crear las tablas

## Tecnologías

| Capa | Tecnología |
|------|-----------|
| Backend | Node.js, Express 5, Prisma, JWT, Zod |
| Base de datos | SQLite (desarrollo) / PostgreSQL (producción) |
| Frontend App | React 18, React Router 6, Vite, Tailwind CSS |
| Landing | React 18, Vite, Tailwind CSS |
| Seguridad | Helmet, CORS, bcrypt, rate limiting |

## Funcionalidades

- ✅ Búsqueda pública de indicadores de fraude (teléfono, email, cuenta bancaria, URL)
- ✅ Reporte de fraudes con tipos específicos (phishing, marketplace, etc.)
- ✅ Registro de usuarios con departamento de Paraguay
- ✅ Panel de ciudadano con historial de reportes
- ✅ Panel de administración/moderación
- ✅ Validación de reportes (validar, rechazar, investigar)
- ✅ Estadísticas públicas por tipo de fraude y departamento
- ✅ Alertas automáticas cuando un indicador acumula 3+ reportes
- ✅ Reportes anónimos
- ✅ Exportación a CSV
- ✅ Diseño responsive
- ✅ Notificaciones por email

## Licencia

Proyecto académico - Análisis y Desarrollo de Sistemas Informáticos
Asunción, Paraguay - 2025
