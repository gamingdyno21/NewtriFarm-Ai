import express from 'express';
import { asyncHandler } from '../middleware/errorHandler.js';

const router = express.Router();

// @desc    Get market data (placeholder)
// @route   GET /api/market
// @access  Private
router.get('/', asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Market route working - placeholder implementation',
    data: {
      prices: 'Market data will be available soon'
    }
  });
}));

export default router;
