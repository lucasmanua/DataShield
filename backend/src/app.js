import express from 'express';
import authRoutes from './routes/auth.routes.js';
import reportsRoutes from './routes/reports.routes.js';
import adminRoutes from './routes/admin.routes.js';
import prisma from './utils/prisma.js';
import { env } from './config/env.js';
import { helmetMiddleware, corsMiddleware } from './config/security.js';
import { globalErrorHandler, notFoundHandler } from './middleware/error.middleware.js';

const app = express();
app.disable('x-powered-by');
app.use(helmetMiddleware);
app.use(corsMiddleware);
app.use(express.json({ limit: env.jsonBodyLimit }));

app.use('/api/auth', authRoutes);
app.use('/api/reports', reportsRoutes);
app.use('/api/admin', adminRoutes);

app.use(notFoundHandler);
app.use(globalErrorHandler);

const server = app.listen(env.port, () => {
  console.log(`Server running on port ${env.port}`);
});

const shutdown = async (signal) => {
  console.log(`${signal} received. Closing server...`);
  server.close(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
};

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));