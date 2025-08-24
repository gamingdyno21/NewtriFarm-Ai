import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose'; // Added for health check

// Import routes
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import farmRoutes from './routes/farms.js';
import cropRoutes from './routes/crops.js';
import weatherRoutes from './routes/weather.js';
import inventoryRoutes from './routes/inventory.js';
import marketRoutes from './routes/market.js';
import aiRoutes from './routes/ai.js';
import communityRoutes from './routes/community.js';
import notificationRoutes from './routes/notifications.js';

// Import middleware
import { errorHandler } from './middleware/errorHandler.js';
import { authMiddleware } from './middleware/auth.js';
import { connectDB } from './config/database.js';

// Load environment variables
dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"]
  }
});

// Try to connect to database (but don't fail if it doesn't work)
connectDB().catch(err => {
  console.log('⚠️ Database connection failed, but server will continue running');
});

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});

// Middleware
app.use(helmet()); // Security headers
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true
}));
app.use(compression()); // Compress responses
app.use(morgan('combined')); // Logging
app.use(limiter); // Rate limiting
app.use(express.json({ limit: '10mb' })); // Parse JSON bodies
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'NutriFarm AI Backend is running',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', authMiddleware, userRoutes);
app.use('/api/farms', authMiddleware, farmRoutes);
app.use('/api/crops', authMiddleware, cropRoutes);
app.use('/api/weather', authMiddleware, weatherRoutes);
app.use('/api/inventory', authMiddleware, inventoryRoutes);
app.use('/api/market', authMiddleware, marketRoutes);
app.use('/api/ai', authMiddleware, aiRoutes);
app.use('/api/community', authMiddleware, communityRoutes);
app.use('/api/notifications', authMiddleware, notificationRoutes);

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Join farm room
  socket.on('join-farm', (farmId) => {
    socket.join(`farm-${farmId}`);
    console.log(`User ${socket.id} joined farm ${farmId}`);
  });

  // Handle weather updates
  socket.on('weather-update', (data) => {
    socket.broadcast.to(`farm-${data.farmId}`).emit('weather-alert', data);
  });

  // Handle crop alerts
  socket.on('crop-alert', (data) => {
    socket.broadcast.to(`farm-${data.farmId}`).emit('crop-notification', data);
  });

  // Handle inventory alerts
  socket.on('inventory-alert', (data) => {
    socket.broadcast.to(`farm-${data.farmId}`).emit('inventory-notification', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Error handling middleware
app.use(errorHandler);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    path: req.originalUrl
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Global error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';

server.listen(PORT, () => {
  console.log(`🚀 NutriFarm AI Backend running on port ${PORT}`);
  console.log(`🌍 Environment: ${NODE_ENV}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/health`);
  console.log(`📱 Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:5173'}`);
  console.log(`💡 Note: Some features may be limited without database connection`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('Process terminated');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  server.close(() => {
    console.log('Process terminated');
    process.exit(0);
  });
});

export { io };
