import express from 'express';
import { asyncHandler } from '../middleware/errorHandler.js';

const router = express.Router();

// @desc    Get inventory items (placeholder)
// @route   GET /api/inventory
// @access  Private
router.get('/', asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Inventory route working - placeholder implementation',
    data: []
  });
}));

export default router;
