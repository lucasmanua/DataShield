import helmet from 'helmet';
import cors from 'cors';
import { env } from './env.js';

export const helmetMiddleware = helmet();

export const corsMiddleware = cors({
  origin: (origin, callback) => {
    if (!origin || env.allowedOrigins.length === 0 || env.allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Origin not allowed by CORS'));
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Authorization', 'Content-Type']
});
