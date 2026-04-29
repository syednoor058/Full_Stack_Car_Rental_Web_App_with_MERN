const Booking = require('../models/Booking');
const Car = require('../models/Car');
const User = require('../models/User');

// @desc    Get dashboard statistics
// @route   GET /api/stats
// @access  Private/Admin
const getStats = async (req, res) => {
  try {
    const totalRevenue = await Booking.aggregate([
      { $match: { paymentStatus: 'paid' } },
      { $group: { _id: null, total: { $sum: '$totalAmount' } } },
    ]);

    const totalRentals = await Booking.countDocuments();
    const activeRentals = await Booking.countDocuments({ status: 'active' });
    const availableCars = await Car.countDocuments({ available: true });
    const totalUsers = await User.countDocuments({ role: 'user' });

    // Monthly revenue for the last 12 months
    const monthlyRevenue = await Booking.aggregate([
      { $match: { paymentStatus: 'paid' } },
      {
        $group: {
          _id: {
            month: { $month: '$createdAt' },
            year: { $year: '$createdAt' },
          },
          revenue: { $sum: '$totalAmount' },
        },
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } },
      { $limit: 12 },
    ]);

    const formattedMonthlyRevenue = monthlyRevenue.map((item) => {
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      return {
        month: monthNames[item._id.month - 1],
        revenue: item.revenue,
      };
    });

    // Revenue by brand
    const revenueByBrand = await Booking.aggregate([
      { $match: { paymentStatus: 'paid' } },
      {
        $lookup: {
          from: 'cars',
          localField: 'car',
          foreignField: '_id',
          as: 'carDetails',
        },
      },
      { $unwind: '$carDetails' },
      {
        $group: {
          _id: '$carDetails.brand',
          revenue: { $sum: '$totalAmount' },
        },
      },
      { $project: { brand: '$_id', revenue: 1, _id: 0 } },
      { $sort: { revenue: -1 } },
    ]);

    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const endOfMonth = new Date();
    endOfMonth.setMonth(endOfMonth.getMonth() + 1);
    endOfMonth.setDate(0);
    endOfMonth.setHours(23, 59, 59, 999);

    const revenueByCarThisMonth = await Booking.aggregate([
      {
        $match: {
          paymentStatus: 'paid',
          createdAt: { $gte: startOfMonth, $lte: endOfMonth }
        }
      },
      {
        $group: {
          _id: '$car',
          revenue: { $sum: '$totalAmount' }
        }
      }
    ]);

    res.json({
      totalRevenue: totalRevenue.length > 0 ? totalRevenue[0].total : 0,
      totalRentals,
      activeRentals,
      availableCars,
      totalUsers,
      monthlyRevenue: formattedMonthlyRevenue,
      revenueByBrand,
      revenueByCarThisMonth,
    });
  } catch (error) {
    res.status(500);
    throw new Error(`Stats calculation failed: ${error.message}`);
  }
};

module.exports = { getStats };
