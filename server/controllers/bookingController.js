const Booking = require('../models/Booking');
const Car = require('../models/Car');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Private
const createBooking = async (req, res) => {
  const { carId, pickupDate, returnDate, totalAmount, paymentMethodId } = req.body;

  const car = await Car.findById(carId);

  if (!car) {
    res.status(404);
    throw new Error('Car not found');
  }

  if (!car.available) {
    res.status(400);
    throw new Error('Car is not available for the selected dates');
  }

  try {
    // Create Stripe Payment Intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(totalAmount * 100), // Stripe expects amount in cents
      currency: 'usd',
      payment_method: paymentMethodId,
      confirm: true,
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: 'never',
      },
    });

    const booking = new Booking({
      user: req.user._id,
      car: carId,
      pickupDate,
      returnDate,
      totalAmount,
      status: 'active',
      paymentStatus: 'paid',
      paymentIntentId: paymentIntent.id,
    });

    // Update car availability
    car.available = false;
    await car.save();

    const createdBooking = await booking.save();
    res.status(201).json(createdBooking);
  } catch (error) {
    res.status(400);
    throw new Error(`Payment failed: ${error.message}`);
  }
};

// @desc    Get user bookings
// @route   GET /api/bookings/mybookings
// @access  Private
const getMyBookings = async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id }).populate('car');
  res.json(bookings);
};

// @desc    Get all bookings
// @route   GET /api/bookings
// @access  Private/Admin
const getBookings = async (req, res) => {
  const bookings = await Booking.find({}).populate('user', 'id name email phone address').populate('car');
  res.json(bookings);
};

// @desc    Update booking status
// @route   PUT /api/bookings/:id/status
// @access  Private/Admin
const updateBookingStatus = async (req, res) => {
  const booking = await Booking.findById(req.params.id);

  if (booking) {
    booking.status = req.body.status || booking.status;
    
    if (req.body.status === 'completed' || req.body.status === 'cancelled') {
        const car = await Car.findById(booking.car);
        if (car) {
            car.available = true;
            await car.save();
        }
    }

    const updatedBooking = await booking.save();
    res.json(updatedBooking);
  } else {
    res.status(404);
    throw new Error('Booking not found');
  }
};

module.exports = {
  createBooking,
  getMyBookings,
  getBookings,
  updateBookingStatus,
};
