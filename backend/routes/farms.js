import express from 'express';
import { asyncHandler } from '../middleware/errorHandler.js';

const router = express.Router();

// @desc    Get all farms (placeholder)
// @route   GET /api/farms
// @access  Private
router.get('/', asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Farms route working - placeholder implementation',
    data: []
  });
}));

export default router;
