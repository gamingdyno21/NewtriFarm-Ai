# 🌾 NutriFarm AI Backend

A comprehensive, production-ready backend API for the NutriFarm AI platform - the future of smart farming.

## 🚀 Features

### Core Functionality
- **User Authentication & Management** - Secure JWT-based authentication with role-based access control
- **Farm Management** - Complete farm lifecycle management with multi-user support
- **Crop Management** - AI-powered crop monitoring, planning, and optimization
- **Weather Integration** - Real-time weather data and farming-specific recommendations
- **Inventory Management** - Supply tracking with automated alerts and reporting
- **Market Intelligence** - Crop pricing, market trends, and financial analysis
- **AI Services** - Machine learning models for crop diagnosis and yield prediction
- **Community Platform** - Farmer networking, knowledge sharing, and collaboration
- **Real-time Notifications** - WebSocket-based alerts and updates

### Technical Features
- **RESTful API** - Clean, well-documented REST endpoints
- **Real-time Communication** - Socket.IO for live updates
- **File Upload** - Image processing and cloud storage integration
- **Email System** - Beautiful HTML email templates with transactional emails
- **SMS Integration** - Twilio integration for critical alerts
- **Caching** - Redis-based caching for improved performance
- **Rate Limiting** - API protection against abuse
- **Security** - Helmet.js, CORS, input validation, and sanitization
- **Monitoring** - Comprehensive logging and error handling
- **Scalability** - Designed for horizontal scaling and microservices

## 🛠️ Tech Stack

- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT with bcrypt
- **Real-time**: Socket.IO
- **Email**: Nodemailer with HTML templates
- **File Upload**: Multer with Sharp image processing
- **Cloud Storage**: Cloudinary & AWS S3
- **Caching**: Redis
- **SMS**: Twilio
- **Validation**: Express-validator
- **Security**: Helmet.js, CORS, Rate limiting
- **Testing**: Jest with Supertest

## 📋 Prerequisites

- Node.js 18+ 
- MongoDB 5+
- Redis 6+
- SMTP email service (Gmail, SendGrid, etc.)
- Cloud storage account (Cloudinary, AWS S3)
- SMS service (Twilio) - optional

## 🚀 Quick Start

### 1. Clone and Install

```bash
cd crop-craft-ai-main/backend
npm install
```

### 2. Environment Setup

```bash
# Copy environment template
cp env.example .env

# Edit .env with your configuration
nano .env
```

### 3. Database Setup

```bash
# Start MongoDB (if local)
mongod

# Or use MongoDB Atlas (cloud)
# Update MONGODB_URI in .env
```

### 4. Start Development Server

```bash
npm run dev
```

The API will be available at `http://localhost:5000`

## 🔧 Configuration

### Environment Variables

```bash
# Server
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:5173

# Database
MONGODB_URI=mongodb://localhost:27017/nutrifarm_ai

# JWT
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=30d

# Email (Gmail example)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Cloud Storage
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# External APIs
OPENWEATHER_API_KEY=your-openweather-api-key
USDA_API_KEY=your-usda-api-key
```

## 📚 API Documentation

### Authentication Endpoints

```bash
POST /api/auth/register          # User registration
POST /api/auth/login            # User login
POST /api/auth/logout           # User logout
GET  /api/auth/me              # Get current user
PUT  /api/auth/updatedetails   # Update user profile
PUT  /api/auth/updatepassword  # Change password
POST /api/auth/forgotpassword  # Request password reset
PUT  /api/auth/resetpassword   # Reset password
GET  /api/auth/verify-email    # Verify email address
```

### Farm Management

```bash
GET    /api/farms              # Get user's farms
POST   /api/farms              # Create new farm
GET    /api/farms/:id          # Get farm details
PUT    /api/farms/:id          # Update farm
DELETE /api/farms/:id          # Delete farm
POST   /api/farms/:id/invite   # Invite user to farm
```

### Crop Management

```bash
GET    /api/crops              # Get farm crops
POST   /api/crops              # Add new crop
GET    /api/crops/:id          # Get crop details
PUT    /api/crops/:id          # Update crop
DELETE /api/crops/:id          # Delete crop
POST   /api/crops/:id/analyze  # AI crop analysis
```

### Weather Data

```bash
GET /api/weather/current       # Current weather
GET /api/weather/forecast      # Weather forecast
GET /api/weather/alerts        # Weather alerts
GET /api/weather/history       # Historical data
```

### Inventory Management

```bash
GET    /api/inventory          # Get inventory items
POST   /api/inventory          # Add inventory item
PUT    /api/inventory/:id      # Update item
DELETE /api/inventory/:id      # Delete item
GET    /api/inventory/alerts   # Low stock alerts
```

### Market Data

```bash
GET /api/market/prices         # Current crop prices
GET /api/market/trends         # Price trends
GET /api/market/news           # Market news
GET /api/market/analysis       # Market analysis
```

### AI Services

```bash
POST /api/ai/diagnose          # Crop health diagnosis
POST /api/ai/predict           # Yield prediction
POST /api/ai/recommend         # Farming recommendations
GET  /api/ai/models            # Available AI models
```

## 🗄️ Database Models

### User Model
- Authentication (email, password, JWT)
- Profile (name, bio, location, preferences)
- Farm relationships and permissions
- Subscription and billing information
- Statistics and activity tracking

### Farm Model
- Basic information (name, type, size)
- Location and climate data
- Soil information and infrastructure
- Financial data and certifications
- Management team and workers

### Crop Model
- Crop details (type, variety, planting date)
- Growth stages and health monitoring
- Yield tracking and predictions
- AI analysis results and recommendations

### Inventory Model
- Item details (name, category, quantity)
- Cost tracking and supplier information
- Expiry dates and low stock alerts
- Location and storage management

## 🔐 Security Features

- **JWT Authentication** - Secure token-based authentication
- **Password Hashing** - bcrypt with configurable rounds
- **Input Validation** - Comprehensive request validation
- **Rate Limiting** - API protection against abuse
- **CORS Protection** - Cross-origin request security
- **Helmet.js** - Security headers and protection
- **Role-based Access** - Granular permission control
- **Data Sanitization** - XSS and injection protection

## 📊 Performance Features

- **Database Indexing** - Optimized MongoDB queries
- **Redis Caching** - Fast data access and session storage
- **Compression** - Response compression for bandwidth
- **Connection Pooling** - Efficient database connections
- **Image Optimization** - Sharp.js for image processing
- **Lazy Loading** - Efficient data fetching

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

## 🚀 Deployment

### Production Build

```bash
npm run build
npm start
```

### Environment Variables for Production

```bash
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/nutrifarm_ai
JWT_SECRET=very-long-secure-secret-key
FRONTEND_URL=https://yourdomain.com
```

### Docker Deployment

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

### PM2 Process Management

```bash
npm install -g pm2
pm2 start server.js --name "nutrifarm-backend"
pm2 save
pm2 startup
```

## 📈 Monitoring & Logging

- **Request Logging** - Morgan HTTP request logger
- **Error Tracking** - Comprehensive error handling and logging
- **Performance Monitoring** - Response time tracking
- **Health Checks** - `/health` endpoint for monitoring
- **Real-time Metrics** - Socket.IO connection monitoring

## 🔄 WebSocket Events

### Client to Server
- `join-farm` - Join farm room for updates
- `weather-update` - Send weather updates
- `crop-alert` - Send crop alerts
- `inventory-alert` - Send inventory alerts

### Server to Client
- `weather-alert` - Weather notifications
- `crop-notification` - Crop health updates
- `inventory-notification` - Stock alerts
- `farm-update` - Farm status changes

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: [API Docs](docs/api.md)
- **Issues**: [GitHub Issues](https://github.com/your-repo/issues)
- **Email**: support@nutrifarm.ai
- **Discord**: [Join our community](https://discord.gg/nutrifarm)

## 🎯 Roadmap

- [ ] Machine Learning model training pipeline
- [ ] Advanced analytics and reporting
- [ ] Mobile app API endpoints
- [ ] Third-party integrations (ERP, accounting)
- [ ] Blockchain integration for supply chain
- [ ] IoT device integration
- [ ] Advanced weather modeling
- [ ] Predictive analytics dashboard

---

**Built with ❤️ for the future of farming**
