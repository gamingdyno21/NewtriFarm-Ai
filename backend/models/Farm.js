import mongoose from 'mongoose';

const farmSchema = new mongoose.Schema({
  // Basic Information
  name: {
    type: String,
    required: [true, 'Farm name is required'],
    trim: true,
    maxlength: [100, 'Farm name cannot exceed 100 characters']
  },
  description: {
    type: String,
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  type: {
    type: String,
    enum: ['organic', 'conventional', 'mixed', 'hydroponic', 'aquaponic', 'vertical'],
    default: 'conventional'
  },
  size: {
    total: {
      value: { type: Number, required: true },
      unit: { type: String, enum: ['acres', 'hectares', 'sqft', 'sqm'], default: 'acres' }
    },
    cultivated: {
      value: { type: Number, default: 0 },
      unit: { type: String, enum: ['acres', 'hectares', 'sqft', 'sqm'], default: 'acres' }
    },
    irrigated: {
      value: { type: Number, default: 0 },
      unit: { type: String, enum: ['acres', 'hectares', 'sqft', 'sqm'], default: 'acres' }
    }
  },

  // Location
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      required: true,
      validate: {
        validator: function(v) {
          return v.length === 2 && v[0] >= -180 && v[0] <= 180 && v[1] >= -90 && v[1] <= 90;
        },
        message: 'Invalid coordinates'
      }
    },
    address: {
      street: String,
      city: String,
      state: String,
      country: String,
      zipCode: String
    },
    timezone: String
  },

  // Ownership and Management
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  managers: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    role: { type: String, enum: ['manager', 'supervisor', 'worker'] },
    permissions: [String],
    addedAt: { type: Date, default: Date.now }
  }],
  workers: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    role: String,
    startDate: Date,
    endDate: Date,
    isActive: { type: Boolean, default: true }
  }],

  // Soil and Climate
  soil: {
    type: { type: String, enum: ['clay', 'loam', 'sandy', 'silt', 'mixed'] },
    ph: { type: Number, min: 0, max: 14 },
    organicMatter: { type: Number, min: 0, max: 100 },
    texture: String,
    fertility: { type: String, enum: ['low', 'medium', 'high'] }
  },
  climate: {
    zone: String,
    averageTemperature: {
      min: Number,
      max: Number,
      unit: { type: String, enum: ['celsius', 'fahrenheit'], default: 'celsius' }
    },
    rainfall: {
      annual: Number,
      unit: { type: String, enum: ['mm', 'inches'], default: 'mm' }
    },
    humidity: {
      min: Number,
      max: Number
    }
  },

  // Infrastructure
  infrastructure: {
    irrigation: {
      type: { type: String, enum: ['drip', 'sprinkler', 'flood', 'none'] },
      coverage: { type: Number, min: 0, max: 100 },
      automation: { type: Boolean, default: false }
    },
    storage: {
      silos: { type: Number, default: 0 },
      warehouses: { type: Number, default: 0 },
      coldStorage: { type: Number, default: 0 }
    },
    equipment: [{
      name: String,
      type: String,
      quantity: Number,
      condition: { type: String, enum: ['excellent', 'good', 'fair', 'poor'] }
    }],
    buildings: [{
      name: String,
      type: String,
      size: Number,
      purpose: String
    }]
  },

  // Financial Information
  financial: {
    annualRevenue: { type: Number, default: 0 },
    annualExpenses: { type: Number, default: 0 },
    profitMargin: { type: Number, default: 0 },
    currency: { type: String, default: 'USD' },
    taxId: String,
    insurance: {
      provider: String,
      policyNumber: String,
      expiryDate: Date
    }
  },

  // Certifications and Compliance
  certifications: [{
    name: String,
    issuer: String,
    issueDate: Date,
    expiryDate: Date,
    status: { type: String, enum: ['active', 'expired', 'pending'] }
  }],
  compliance: {
    organic: { type: Boolean, default: false },
    gmp: { type: Boolean, default: false },
    haccp: { type: Boolean, default: false },
    iso: { type: Boolean, default: false }
  },

  // Status and Operations
  status: {
    type: String,
    enum: ['active', 'inactive', 'maintenance', 'seasonal'],
    default: 'active'
  },
  operationalSeason: {
    start: Date,
    end: Date,
    isYearRound: { type: Boolean, default: false }
  },

  // Statistics and Metrics
  stats: {
    totalCrops: { type: Number, default: 0 },
    activeCrops: { type: Number, default: 0 },
    totalHarvests: { type: Number, default: 0 },
    averageYield: { type: Number, default: 0 },
    lastHarvest: Date,
    nextHarvest: Date
  },

  // Settings and Preferences
  settings: {
    notifications: {
      weather: { type: Boolean, default: true },
      crops: { type: Boolean, default: true },
      inventory: { type: Boolean, default: true },
      market: { type: Boolean, default: true }
    },
    units: {
      area: { type: String, enum: ['acres', 'hectares'], default: 'acres' },
      weight: { type: String, enum: ['kg', 'lbs'], default: 'kg' },
      volume: { type: String, enum: ['liters', 'gallons'], default: 'liters' }
    }
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes
farmSchema.index({ 'location.coordinates': '2dsphere' });
farmSchema.index({ owner: 1 });
farmSchema.index({ status: 1 });
farmSchema.index({ type: 1 });

// Virtual for farm efficiency
farmSchema.virtual('efficiency').get(function() {
  if (this.size.total.value === 0) return 0;
  return Math.round((this.size.cultivated.value / this.size.total.value) * 100);
});

// Virtual for financial health
farmSchema.virtual('financialHealth').get(function() {
  if (this.financial.annualRevenue === 0) return 'unknown';
  const margin = this.financial.profitMargin;
  if (margin > 20) return 'excellent';
  if (margin > 10) return 'good';
  if (margin > 0) return 'fair';
  return 'poor';
});

// Pre-save middleware to calculate profit margin
farmSchema.pre('save', function(next) {
  if (this.financial.annualRevenue > 0) {
    this.financial.profitMargin = ((this.financial.annualRevenue - this.financial.annualExpenses) / this.financial.annualRevenue) * 100;
  }
  next();
});

// Static method to find farms by location
farmSchema.statics.findByLocation = function(coordinates, maxDistance = 50000) {
  return this.find({
    'location.coordinates': {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates: coordinates
        },
        $maxDistance: maxDistance
      }
    },
    status: 'active'
  });
};

// Static method to find farms by type
farmSchema.statics.findByType = function(type) {
  return this.find({ type, status: 'active' });
};

// Instance method to add manager
farmSchema.methods.addManager = function(userId, role, permissions) {
  const existingManager = this.managers.find(m => m.user.toString() === userId.toString());
  if (existingManager) {
    existingManager.role = role;
    existingManager.permissions = permissions;
  } else {
    this.managers.push({ user: userId, role, permissions });
  }
  return this.save();
};

// Instance method to remove manager
farmSchema.methods.removeManager = function(userId) {
  this.managers = this.managers.filter(m => m.user.toString() !== userId.toString());
  return this.save();
};

const Farm = mongoose.model('Farm', farmSchema);

export default Farm;
