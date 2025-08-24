import express from 'express';
import { asyncHandler } from '../middleware/errorHandler.js';

const router = express.Router();

// @desc    Get all crops (placeholder)
// @route   GET /api/crops
// @access  Private
router.get('/', asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Crops route working - placeholder implementation',
    data: []
  });
}));

export default router;
