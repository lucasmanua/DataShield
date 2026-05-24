import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/auth.routes.js';
import reportsRoutes from './routes/reports.routes.js';
import adminRoutes from './routes/admin.routes.js';
import prisma from './utils/prisma.js';
import { env } from './config/env.js';
import { helmetMiddleware, corsMiddleware } from './config/security.js';
import { globalErrorHandler, notFoundHandler } from './middleware/error.middleware.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const frontendDir = path.resolve(__dirname, '../../frontend');

const app = express();
app.disable('x-powered-by');
app.use(helmetMiddleware);
app.use(corsMiddleware);
app.use(express.json({ limit: env.jsonBodyLimit }));

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/reports', reportsRoutes);
app.use('/api/admin', adminRoutes);

// Serve built React apps
app.use('/app', express.static(path.join(frontendDir, 'app/dist')));
app.use('/landing', express.static(path.join(frontendDir, 'landing/dist')));

// Serve standalone HTML files
app.use('/frontend/frontend.html', (req, res) => {
  res.sendFile(path.join(frontendDir, 'frontend.html'));
});
app.use('/frontend/dashboard.html', (req, res) => {
  res.sendFile(path.join(frontendDir, 'dashboard.html'));
});

// Root -> landing page
app.use('/', express.static(path.join(frontendDir, 'landing/dist')));

// SPA fallback: for /app routes, serve index.html
app.get('/app/{*path}', (req, res) => {
  res.sendFile(path.join(frontendDir, 'app/dist/index.html'));
});
// Also handle /app exactly
app.get('/app', (req, res) => {
  res.sendFile(path.join(frontendDir, 'app/dist/index.html'));
});

app.use(notFoundHandler);
app.use(globalErrorHandler);

const HOST = '0.0.0.0';
const server = app.listen(env.port, HOST, () => {
  console.log(`DataShield running on:`);
  console.log(`  Local:   http://localhost:${env.port}`);
  console.log(`  Red:     http://192.168.0.16:${env.port}`);
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