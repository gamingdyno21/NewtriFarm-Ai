import express from 'express';
import { asyncHandler } from '../middleware/errorHandler.js';

const router = express.Router();

// @desc    Get weather data (placeholder)
// @route   GET /api/weather
// @access  Private
router.get('/', asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Weather route working - placeholder implementation',
    data: {
      current: 'Sunny, 25°C',
      forecast: 'Clear skies for next 3 days'
    }
  });
}));

export default router;
