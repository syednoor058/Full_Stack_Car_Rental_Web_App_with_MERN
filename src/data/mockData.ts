export interface Car {
  id: string;
  name: string;
  brand: string;
  model: string;
  year: number;
  pricePerDay: number;
  fuelType: 'Petrol' | 'Diesel' | 'Electric' | 'Hybrid';
  seats: number;
  transmission: 'Automatic' | 'Manual';
  images: string[];
  available: boolean;
  description: string;
  features: string[];
  mileage: string;
  engineCapacity: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  role: 'user' | 'admin';
  createdAt: string;
}

export interface Rental {
  id: string;
  userId: string;
  carId: string;
  car?: Car;
  user?: User;
  pickupDate: string;
  returnDate: string;
  totalAmount: number;
  status: 'active' | 'completed' | 'cancelled' | 'pending';
  createdAt: string;
}

export const mockCars: Car[] = [
  {
    id: '1',
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
    id: '2',
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
    id: '3',
    name: 'Porsche 911',
    brand: 'Porsche',
    model: '911 Carrera',
    year: 2024,
    pricePerDay: 650,
    fuelType: 'Petrol',
    seats: 2,
    transmission: 'Automatic',
    images: [
      'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800',
    ],
    available: true,
    description: 'An icon of sports car excellence. Pure driving pleasure awaits.',
    features: ['Sport Chrono Package', 'PASM Suspension', 'Sport Exhaust', 'Carbon Ceramic Brakes'],
    mileage: '7.8 km/l',
    engineCapacity: '3.0L Flat-6',
  },
  {
    id: '4',
    name: 'Range Rover',
    brand: 'Land Rover',
    model: 'Autobiography',
    year: 2024,
    pricePerDay: 500,
    fuelType: 'Diesel',
    seats: 5,
    transmission: 'Automatic',
    images: [
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800',
      'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800',
    ],
    available: false,
    description: 'The ultimate luxury SUV combining refinement with all-terrain capability.',
    features: ['Air Suspension', 'Terrain Response', 'Meridian Audio', 'Heated Steering'],
    mileage: '10.5 km/l',
    engineCapacity: '3.0L D300',
  },
  {
    id: '5',
    name: 'Tesla Model S',
    brand: 'Tesla',
    model: 'Plaid',
    year: 2024,
    pricePerDay: 380,
    fuelType: 'Electric',
    seats: 5,
    transmission: 'Automatic',
    images: [
      'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800',
      'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800',
    ],
    available: true,
    description: 'The future of driving. Incredible acceleration with zero emissions.',
    features: ['Autopilot', 'Gaming Computer', 'HEPA Filtration', '0-60 in 1.99s'],
    mileage: '600 km range',
    engineCapacity: 'Tri Motor',
  },
  {
    id: '6',
    name: 'Audi RS7',
    brand: 'Audi',
    model: 'RS7 Sportback',
    year: 2024,
    pricePerDay: 520,
    fuelType: 'Petrol',
    seats: 4,
    transmission: 'Automatic',
    images: [
      'https://images.unsplash.com/photo-1606664913246-d08ea2dbced3?w=800',
      'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=800',
    ],
    available: true,
    description: 'Performance meets elegance in this stunning four-door coupe.',
    features: ['Quattro AWD', 'RS Sport Suspension', 'Bang & Olufsen Sound', 'Carbon Package'],
    mileage: '8.0 km/l',
    engineCapacity: '4.0L V8',
  },
];

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Anderson',
    email: 'john@example.com',
    phone: '+1 234 567 8900',
    role: 'user',
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    name: 'Sarah Mitchell',
    email: 'sarah@example.com',
    phone: '+1 234 567 8901',
    role: 'user',
    createdAt: '2024-02-20',
  },
  {
    id: 'admin',
    name: 'Admin User',
    email: 'admin@luxurydrives.com',
    phone: '+1 234 567 8999',
    role: 'admin',
    createdAt: '2024-01-01',
  },
];

export const mockRentals: Rental[] = [
  {
    id: '1',
    userId: '1',
    carId: '1',
    pickupDate: '2024-12-01',
    returnDate: '2024-12-05',
    totalAmount: 1800,
    status: 'active',
    createdAt: '2024-11-28',
  },
  {
    id: '2',
    userId: '1',
    carId: '3',
    pickupDate: '2024-11-15',
    returnDate: '2024-11-18',
    totalAmount: 1950,
    status: 'completed',
    createdAt: '2024-11-10',
  },
  {
    id: '3',
    userId: '2',
    carId: '2',
    pickupDate: '2024-12-02',
    returnDate: '2024-12-08',
    totalAmount: 2520,
    status: 'active',
    createdAt: '2024-11-30',
  },
  {
    id: '4',
    userId: '2',
    carId: '5',
    pickupDate: '2024-10-20',
    returnDate: '2024-10-25',
    totalAmount: 1900,
    status: 'completed',
    createdAt: '2024-10-15',
  },
];

export const getCarById = (id: string): Car | undefined => mockCars.find(car => car.id === id);
export const getUserById = (id: string): User | undefined => mockUsers.find(user => user.id === id);
export const getRentalsByUserId = (userId: string): Rental[] => 
  mockRentals.filter(rental => rental.userId === userId).map(rental => ({
    ...rental,
    car: getCarById(rental.carId),
  }));

export const getAllRentalsWithDetails = (): Rental[] =>
  mockRentals.map(rental => ({
    ...rental,
    car: getCarById(rental.carId),
    user: getUserById(rental.userId),
  }));

// Analytics data
export const monthlyRevenue = [
  { month: 'Jan', revenue: 45000 },
  { month: 'Feb', revenue: 52000 },
  { month: 'Mar', revenue: 48000 },
  { month: 'Apr', revenue: 61000 },
  { month: 'May', revenue: 55000 },
  { month: 'Jun', revenue: 67000 },
  { month: 'Jul', revenue: 72000 },
  { month: 'Aug', revenue: 69000 },
  { month: 'Sep', revenue: 58000 },
  { month: 'Oct', revenue: 63000 },
  { month: 'Nov', revenue: 71000 },
  { month: 'Dec', revenue: 78000 },
];

export const rentalStats = {
  totalRevenue: 739000,
  totalRentals: 1847,
  activeRentals: 23,
  carsRentedToday: 8,
};
