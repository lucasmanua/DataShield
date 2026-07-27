# DataShield 🛡️

**Sistema Comunitario de Registro de Fraudes Digitales** — Paraguay

Plataforma para consultar y reportar fraudes digitales. Antes de transferir dinero, verificá si un número de teléfono, email o cuenta bancaria ya fue denunciado como fraudulento.

---

## Inicio rápido (30 segundos)

```bash
# 1. Clonar
git clone https://github.com/lucasmanua/DataShield.git
cd DataShield/backend

# 2. Un solo comando
npm run setup

# 3. Iniciar servidor
npm run dev
```

Abrir **http://localhost:3000** (landing page) o **http://localhost:3000/frontend/frontend.html** (portal ciudadano).

---

## Requisitos

Solo **Node.js 18+**. La base de datos es **SQLite local** — no necesita PostgreSQL, MySQL ni ningún servidor externo.

---

## Uso

### Portal ciudadano
- **Registrarse** con nombre, email y contraseña
- **Crear reporte** de fraude con datos del estafador (teléfono, email, cuenta bancaria, URL)
- **Buscar** indicadores para saber si ya fueron reportados

### Panel de moderación
Usar con rol `ADMIN` o `MODERATOR`:
- Ver todos los reportes
- Validar o rechazar reportes pendientes
- Los cambios de estado notifican al creador por email

> Para asignarte rol admin: registrate normalmente, luego ejecutá en la terminal:
> ```bash
> npx prisma db execute "UPDATE User SET role = 'ADMIN' WHERE email = 'tu@email.com';"
> ```

---

## API

| Método | Ruta | Auth | Descripción |
|--------|------|------|-------------|
| POST | `/api/auth/register` | ❌ | Registro |
| POST | `/api/auth/login` | ❌ | Login |
| POST | `/api/reports` | ✅ | Crear reporte |
| GET | `/api/reports/search` | ✅ | Buscar reportes |
| GET | `/api/reports/:id` | ✅ | Detalle |
| PUT | `/api/admin/reports/:id/validate` | ✅ Admin | Validar/rechazar |
| GET | `/api/admin/reports` | ✅ Admin | Todos los reportes |
| GET | `/api/stats` | ❌ | Estadísticas públicas |
| GET | `/api/reports/export` | ✅ Admin | Exportar CSV |

---

## Desarrollo frontend (React opcional)

El frontend principal usa React (Vite + Tailwind). Para desarrollar con recarga en caliente:

```bash
# App (dashboard, admin)
cd frontend/app
npm install && npm run dev    # http://localhost:5173

# Landing page
cd frontend/landing
npm install && npm run dev    # http://localhost:5174
```

Para construir la app React para producción:
```bash
cd frontend/app && npm run build
cd frontend/landing && npm run build
```

> El backend también sirve dos HTML estáticos sin React: `frontend/frontend.html` y `frontend/dashboard.html`, accesibles en `/frontend/frontend.html` y `/frontend/dashboard.html`.

---

## Variables de entorno

| Variable | Default | Descripción |
|----------|---------|-------------|
| `DATABASE_URL` | `file:./dev.db` | SQLite local o PostgreSQL |
| `JWT_SECRET` | *(requerido)* | Secreto para JWT |
| `PORT` | `3000` | Puerto del servidor |
| `ALLOWED_ORIGINS` | `http://localhost:5173,...` | CORS |
| `EMAIL_HOST` / `EMAIL_PORT` / `EMAIL_USER` / `EMAIL_PASS` / `EMAIL_FROM` | — | Email notificaciones (opcional) |

---

## Tecnologías

| Capa | Tecnología |
|------|-----------|
| Backend | Node.js + Express 5 + Prisma |
| BD | SQLite (dev) / PostgreSQL (prod) |
| Frontend | React 18 + Vite + Tailwind + React Router |
| Auth | JWT + bcrypt |
| Seguridad | Helmet + CORS + rate limiting |

---

## Proyecto académico

Análisis y Desarrollo de Sistemas Informáticos — Asunción, Paraguay — 2025
