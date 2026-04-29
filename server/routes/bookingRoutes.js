const express = require('express');
const router = express.Router();
const {
  createBooking,
  getMyBookings,
  getBookings,
  updateBookingStatus,
} = require('../controllers/bookingController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').get(protect, admin, getBookings).post(protect, createBooking);
router.get('/mybookings', protect, getMyBookings);
router.put('/:id/status', protect, admin, updateBookingStatus);

module.exports = router;
