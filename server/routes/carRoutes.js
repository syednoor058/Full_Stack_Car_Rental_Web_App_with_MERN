const express = require('express');
const router = express.Router();
const {
  getCars,
  getCarById,
  createCar,
  updateCar,
  deleteCar,
} = require('../controllers/carController');
const { protect, admin } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.get('/', getCars);
router.get('/:id', getCarById);
router.post('/', protect, admin, upload.array('images', 5), createCar);
router.put('/:id', protect, admin, upload.array('images', 5), updateCar);
router.delete('/:id', protect, admin, deleteCar);

module.exports = router;
