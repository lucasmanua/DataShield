# DataShield Backend

## Required environment variables

Use `.env.example` as baseline:

- `DATABASE_URL`: PostgreSQL connection string.
- `JWT_SECRET`: secret for access token signing and verification.
- `ALLOWED_ORIGINS`: comma-separated list of frontend origins allowed by CORS.
- `EMAIL_HOST`, `EMAIL_PORT`, `EMAIL_USER`, `EMAIL_PASS`, `EMAIL_FROM`: optional email notifications config.

The API fails fast on startup if `DATABASE_URL` or `JWT_SECRET` are missing.

## Security controls in place

- Input validation via Zod for body/query payloads.
- Role escalation blocked on public register (role is server-enforced as `CITIZEN`).
- Auth route throttling via `express-rate-limit`.
- Security headers via `helmet`.
- CORS allowlist via `ALLOWED_ORIGINS`.
- Response payloads avoid leaking password fields.

## API contract highlights

- `POST /api/auth/register`: accepts only `{ email, password, name }`.
- `POST /api/auth/login`: returns `{ user, token }`.
- `GET /api/reports/search`: query validation includes bounded pagination:
  - `page` >= 1
  - `limit` in [1, 100]
- `GET /api/admin/reports`: supports `status`, `phoneNumber`, `email`, `page`, `limit`.

## Run

```bash
npm install
npm run dev
```

## Tests

```bash
npm test
```
