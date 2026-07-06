const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Routes
const authRoutes = require('./routes/auth');
const studentRoutes = require('./routes/students');
const paymentRoutes = require('./routes/payments');
const courseRoutes = require('./routes/courses');
const activityRoutes = require('./routes/activity');
const dashboardRoutes = require('./routes/dashboard');

const API_VERSION = process.env.API_VERSION || 'v1';

// API root endpoint - list available endpoints
app.get(`/api/${API_VERSION}`, (req, res) => {
  res.json({
    success: true,
    message: 'Dues Collection System API',
    version: API_VERSION,
    department: 'Information Technology and Decision Sciences',
    endpoints: {
      auth: {
        login: `POST /api/${API_VERSION}/auth/login`,
        register: `POST /api/${API_VERSION}/auth/register`,
        me: `GET /api/${API_VERSION}/auth/me`
      },
      students: {
        list: `GET /api/${API_VERSION}/students`,
        create: `POST /api/${API_VERSION}/students`,
        get: `GET /api/${API_VERSION}/students/:id`,
        update: `PUT /api/${API_VERSION}/students/:id`,
        delete: `DELETE /api/${API_VERSION}/students/:id`
      },
      courses: {
        list: `GET /api/${API_VERSION}/courses`,
        create: `POST /api/${API_VERSION}/courses`,
        get: `GET /api/${API_VERSION}/courses/:id`,
        update: `PUT /api/${API_VERSION}/courses/:id`,
        delete: `DELETE /api/${API_VERSION}/courses/:id`
      },
      payments: {
        record: `POST /api/${API_VERSION}/payments/record`,
        list: `GET /api/${API_VERSION}/payments`,
        get: `GET /api/${API_VERSION}/payments/:id`,
        byStudent: `GET /api/${API_VERSION}/payments/student/:indexNumber`,
        statistics: `GET /api/${API_VERSION}/payments/statistics/summary`
      },
      dashboard: {
        admin: `GET /api/${API_VERSION}/dashboard/admin`,
        courseRep: `GET /api/${API_VERSION}/dashboard/course-rep`,
        hod: `GET /api/${API_VERSION}/dashboard/hod`
      },
      activity: {
        logs: `GET /api/${API_VERSION}/activity`
      }
    },
    health: '/health'
  });
});

app.use(`/api/${API_VERSION}/auth`, authRoutes);
app.use(`/api/${API_VERSION}/students`, studentRoutes);
app.use(`/api/${API_VERSION}/payments`, paymentRoutes);
app.use(`/api/${API_VERSION}/courses`, courseRoutes);
app.use(`/api/${API_VERSION}/activity`, activityRoutes);
app.use(`/api/${API_VERSION}/dashboard`, dashboardRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Dues Collection System API',
    version: '1.0.0',
    department: 'Information Technology and Decision Sciences',
    endpoints: {
      health: '/health',
      api: `/api/${API_VERSION}`
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 API available at http://localhost:${PORT}/api/${API_VERSION}`);
  console.log(`🏥 Health check: http://localhost:${PORT}/health`);
});

module.exports = app;

