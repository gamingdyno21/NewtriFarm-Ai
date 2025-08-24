import express from 'express';
import { asyncHandler } from '../middleware/errorHandler.js';

const router = express.Router();

// @desc    Get all users (placeholder)
// @route   GET /api/users
// @access  Private
router.get('/', asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Users route working - placeholder implementation',
    data: []
  });
}));

export default router;
