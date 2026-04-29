const Car = require('../models/Car');

// @desc    Fetch all cars with filters
// @route   GET /api/cars
// @access  Public
const getCars = async (req, res) => {
  const { brand, fuelType, transmission, search, available } = req.query;
  
  let query = {};
  
  if (brand) query.brand = brand;
  if (fuelType) query.fuelType = fuelType;
  if (transmission) query.transmission = transmission;
  if (available) query.available = available === 'true';
  
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { brand: { $regex: search, $options: 'i' } },
      { model: { $regex: search, $options: 'i' } },
    ];
  }

  const cars = await Car.find(query);
  res.json(cars);
};

// @desc    Fetch single car
// @route   GET /api/cars/:id
// @access  Public
const getCarById = async (req, res) => {
  const car = await Car.findById(req.params.id);

  if (car) {
    res.json(car);
  } else {
    res.status(404);
    throw new Error('Car not found');
  }
};

// @desc    Create a car
// @route   POST /api/cars
// @access  Private/Admin
const createCar = async (req, res) => {
  const {
    name, brand, model, year, pricePerDay, fuelType,
    seats, transmission, description, features, mileage, engineCapacity
  } = req.body;

  const images = req.files ? req.files.map(file => file.path) : [];

  const car = new Car({
    name, brand, model, year, pricePerDay, fuelType,
    seats, transmission, description, features: JSON.parse(features),
    mileage, engineCapacity, images, available: true
  });

  const createdCar = await car.save();
  res.status(201).json(createdCar);
};

// @desc    Update a car
// @route   PUT /api/cars/:id
// @access  Private/Admin
const updateCar = async (req, res) => {
  const {
    name, brand, model, year, pricePerDay, fuelType,
    seats, transmission, description, features, mileage, engineCapacity, available, existingImages
  } = req.body;

  const car = await Car.findById(req.params.id);

  if (car) {
    car.name = name || car.name;
    car.brand = brand || car.brand;
    car.model = model || car.model;
    car.year = year || car.year;
    car.pricePerDay = pricePerDay || car.pricePerDay;
    car.fuelType = fuelType || car.fuelType;
    car.seats = seats || car.seats;
    car.transmission = transmission || car.transmission;
    car.description = description || car.description;
    car.features = features ? JSON.parse(features) : car.features;
    car.mileage = mileage || car.mileage;
    car.engineCapacity = engineCapacity || car.engineCapacity;
    car.available = available !== undefined ? (available === 'true' || available === true) : car.available;

    let finalImages = existingImages ? (Array.isArray(existingImages) ? existingImages : JSON.parse(existingImages)) : [];
    
    if (req.files && req.files.length > 0) {
      finalImages = [...finalImages, ...req.files.map(file => file.path)];
    }

    if (finalImages.length > 0) {
      car.images = finalImages;
    } else {
       // if they deleted all images but provided none, maybe we should error out?
       // user requested "at least 1 image", we will enforce it on frontend.
       car.images = [];
    }

    const updatedCar = await car.save();
    res.json(updatedCar);
  } else {
    res.status(404);
    throw new Error('Car not found');
  }
};

// @desc    Delete a car
// @route   DELETE /api/cars/:id
// @access  Private/Admin
const deleteCar = async (req, res) => {
  const car = await Car.findById(req.params.id);

  if (car) {
    await car.deleteOne();
    res.json({ message: 'Car removed' });
  } else {
    res.status(404);
    throw new Error('Car not found');
  }
};

module.exports = {
  getCars,
  getCarById,
  createCar,
  updateCar,
  deleteCar,
};
