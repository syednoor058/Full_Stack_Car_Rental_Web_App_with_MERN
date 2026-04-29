const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Car = require('./models/Car');
const Booking = require('./models/Booking');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const mockCars = [
  {
    name: 'Mercedes S-Class',
    brand: 'Mercedes-Benz',
    model: 'S 500',
    year: 2024,
    pricePerDay: 450,
    fuelType: 'Petrol',
    seats: 5,
    transmission: 'Automatic',
    images: [
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800',
      'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=800',
    ],
    available: true,
    description: 'Experience ultimate luxury with the Mercedes S-Class. Perfect for business executives and special occasions.',
    features: ['Leather Seats', 'Panoramic Roof', 'Massage Seats', 'Burmester Sound', 'Night Vision'],
    mileage: '8.5 km/l',
    engineCapacity: '3.0L V6',
  },
  {
    name: 'BMW 7 Series',
    brand: 'BMW',
    model: '740i',
    year: 2024,
    pricePerDay: 420,
    fuelType: 'Petrol',
    seats: 5,
    transmission: 'Automatic',
    images: [
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800',
      'https://images.unsplash.com/photo-1523983388277-336a66bf9bcd?w=800',
    ],
    available: true,
    description: 'The BMW 7 Series combines athletic performance with sophisticated luxury.',
    features: ['Executive Lounge', 'Sky Lounge Roof', 'Theater Screen', 'Bowers & Wilkins Audio'],
    mileage: '9.2 km/l',
    engineCapacity: '3.0L I6',
  },
  {
    name: 'Porsche 911',
    brand: 'Porsche',
    model: '911 Carrera',
    year: 2024,
    pricePerDay: 650,
    fuelType: 'Petrol',
    seats: 2,
    transmission: 'Automatic',
    images: [
      'https://res.cloudinary.com/dicfxacdd/image/upload/v1764760639/1_ncyvzl.jpg',
      'https://res.cloudinary.com/dicfxacdd/image/upload/v1764760634/3_orb9pr.jpg',
    ],
    available: true,
    description: 'An icon of sports car excellence. Pure driving pleasure awaits.',
    features: ['Sport Chrono Package', 'PASM Suspension', 'Sport Exhaust', 'Carbon Ceramic Brakes'],
    mileage: '7.8 km/l',
    engineCapacity: '3.0L Flat-6',
  }
];

const importData = async () => {
  try {
    await Booking.deleteMany();
    await Car.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.create([
      {
        name: 'Admin User',
        email: 'admin@luxurydrives.com',
        password: 'password123',
        role: 'admin',
      },
      {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        role: 'user',
      }
    ]);

    await Car.insertMany(mockCars);

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Booking.deleteMany();
    await Car.deleteMany();
    await User.deleteMany();

    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
