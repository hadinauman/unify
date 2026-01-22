// Load environment variables FIRST before any other imports
import dotenv from 'dotenv';
import path from 'path';

// Try to load from backend .env first
dotenv.config(); // Backend .env

// Try to load from root .env.local (for GEMINI_API_KEY)
try {
  // __dirname is available in CommonJS
  const rootEnvPath = path.resolve(process.cwd(), '../.env.local');
  dotenv.config({ path: rootEnvPath, override: false }); // Don't override existing vars
} catch (e) {
  // .env.local might not exist, that's okay
}

import express from 'express';
import cors from 'cors';

// Import routes
import authRoutes from './routes/auth.routes';
import eventsRoutes from './routes/events.routes';
import searchRoutes from './routes/search.routes';
import chatRoutes from './routes/chat.routes';
import contactsRoutes from './routes/contacts.routes';
import organisationRoutes from './routes/organisation.routes';
import datasourcesRoutes from './routes/datasources.routes';
import briefingsRoutes from './routes/briefings.routes';
import syncRoutes from './routes/sync.routes';
import slackRoutes from './routes/slack.routes';

const app = express();
const PORT = process.env.PORT || 3002;

// CORS configuration
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Parse JSON bodies
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.path}`);
  next();
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    message: 'Unify backend is running',
    mode: 'demo',
    version: '1.0.0',
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventsRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/contacts', contactsRoutes);
app.use('/api/organisation', organisationRoutes);
app.use('/api/datasources', datasourcesRoutes);
app.use('/api/briefings', briefingsRoutes);
app.use('/api/sync', syncRoutes);
app.use('/api/slack', slackRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.method} ${req.path} not found`,
  });
});

// Error handler
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('❌ Error:', err.message);
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message,
  });
});

// Start server
app.listen(PORT, () => {
  console.log('');
  console.log('═══════════════════════════════════════════════');
  console.log('  🚀 Unify Backend Started');
  console.log('═══════════════════════════════════════════════');
  console.log(`  📡 Server:     http://localhost:${PORT}`);
  console.log(`  🏠 Frontend:   ${process.env.FRONTEND_URL || 'http://localhost:3000'}`);
  console.log(`  📊 Mode:       Demo (using mock data)`);
  console.log('');
  console.log('  Available Endpoints:');
  console.log('  ├─ GET  /health              Health check');
  console.log('  ├─ POST /api/auth/connect/google   Start OAuth');
  console.log('  ├─ POST /api/auth/callback/google  OAuth callback');
  console.log('  ├─ GET  /api/events          List events');
  console.log('  ├─ POST /api/search          AI-powered search');
  console.log('  ├─ GET  /api/contacts        List contacts');
  console.log('  ├─ GET  /api/organisation    Get org details');
  console.log('  ├─ GET  /api/datasources     Data source status');
  console.log('  ├─ POST /api/briefings/generate   Generate briefing');
  console.log('  ├─ POST /api/sync/trigger    Trigger ISOC/MSA sync');
  console.log('  └─ GET  /api/sync/status     Get sync status');
  console.log('');
  console.log('═══════════════════════════════════════════════');
  console.log('');
});

export default app;
