import express from 'express';
import { asyncHandler } from '../middleware/errorHandler.js';

const router = express.Router();

// @desc    Get notifications (placeholder)
// @route   GET /api/notifications
// @access  Private
router.get('/', asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Notifications route working - placeholder implementation',
    data: []
  });
}));

export default router;
