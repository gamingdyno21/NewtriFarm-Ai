import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // Debug logging to see what's happening
    console.log('🔍 Debug: MONGODB_URI from env:', process.env.MONGODB_URI);
    console.log('🔍 Debug: NODE_ENV from env:', process.env.NODE_ENV);
    console.log('🔍 Debug: All env vars:', Object.keys(process.env).filter(key => key.includes('MONGODB')));
    
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/nutrifarm_ai', {
      // Modern MongoDB connection options
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      bufferCommands: false
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    
    // Handle connection events
    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('⚠️ MongoDB disconnected');
    });

    mongoose.connection.on('reconnected', () => {
      console.log('🔄 MongoDB reconnected');
    });

    // Graceful shutdown
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('MongoDB connection closed through app termination');
      process.exit(0);
    });

  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    // Don't exit process, just log the error
    console.log('⚠️ Continuing without database connection for now...');
  }
};

export { connectDB };
