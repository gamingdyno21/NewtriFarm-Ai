import express from 'express';
import { asyncHandler } from '../middleware/errorHandler.js';

const router = express.Router();

// @desc    Get community posts (placeholder)
// @route   GET /api/community
// @access  Private
router.get('/', asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Community route working - placeholder implementation',
    data: []
  });
}));

export default router;
