import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Import routes
import authRoutes from './routes/auth.routes';
import eventsRoutes from './routes/events.routes';
import searchRoutes from './routes/search.routes';
import contactsRoutes from './routes/contacts.routes';
import organizationRoutes from './routes/organization.routes';
import datasourcesRoutes from './routes/datasources.routes';
import briefingsRoutes from './routes/briefings.routes';

const app = express();
const PORT = process.env.PORT || 3001;

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
app.use('/api/contacts', contactsRoutes);
app.use('/api/organization', organizationRoutes);
app.use('/api/datasources', datasourcesRoutes);
app.use('/api/briefings', briefingsRoutes);

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
  console.log('  ├─ GET  /api/organization    Get org details');
  console.log('  ├─ GET  /api/datasources     Data source status');
  console.log('  └─ POST /api/briefings/generate   Generate briefing');
  console.log('');
  console.log('═══════════════════════════════════════════════');
  console.log('');
});

export default app;
