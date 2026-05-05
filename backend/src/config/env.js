import dotenv from 'dotenv';

dotenv.config();

const parseOrigins = (value) => (value || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

const requiredEnvVars = ['DATABASE_URL', 'JWT_SECRET'];
for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
}

export const env = Object.freeze({
  port: Number(process.env.PORT) || 3000,
  jwtSecret: process.env.JWT_SECRET,
  databaseUrl: process.env.DATABASE_URL,
  allowedOrigins: parseOrigins(process.env.ALLOWED_ORIGINS),
  jsonBodyLimit: process.env.JSON_BODY_LIMIT || '100kb'
});
