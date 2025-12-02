import React from 'react';
import { Link } from 'react-router-dom';
import { Car, DollarSign, ClipboardList, TrendingUp, ArrowRight, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { rentalStats, mockCars, getAllRentalsWithDetails } from '@/data/mockData';

const AdminDashboard: React.FC = () => {
  const recentRentals = getAllRentalsWithDetails().slice(0, 5);

  const stats = [
    {
      label: 'Total Revenue',
      value: `$${rentalStats.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      change: '+12.5%',
      positive: true,
    },
    {
      label: 'Total Rentals',
      value: rentalStats.totalRentals.toLocaleString(),
      icon: ClipboardList,
      change: '+8.2%',
      positive: true,
    },
    {
      label: 'Active Rentals',
      value: rentalStats.activeRentals.toString(),
      icon: Car,
      change: '+3',
      positive: true,
    },
    {
      label: 'Rented Today',
      value: rentalStats.carsRentedToday.toString(),
      icon: Calendar,
      change: '-2',
      positive: false,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-display text-3xl font-bold text-foreground mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to the admin panel. Here's an overview of your business.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="glass-card p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-muted-foreground text-sm">{stat.label}</p>
                <p className="text-3xl font-bold text-foreground mt-2">{stat.value}</p>
              </div>
              <div className="p-3 rounded-xl bg-primary/10">
                <stat.icon className="h-6 w-6 text-primary" />
              </div>
            </div>
            <div className={`flex items-center gap-1 mt-4 text-sm ${stat.positive ? 'text-green-400' : 'text-red-400'}`}>
              <TrendingUp className={`h-4 w-4 ${!stat.positive && 'rotate-180'}`} />
              <span>{stat.change} from last month</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recent Rentals */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-xl font-semibold text-foreground">Recent Rentals</h2>
            <Link to="/admin/rentals">
              <Button variant="ghost" size="sm" className="gap-2">
                View All
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="space-y-4">
            {recentRentals.map((rental) => (
              <div key={rental.id} className="flex items-center gap-4 p-3 rounded-lg bg-secondary/50">
                <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                  {rental.car && (
                    <img
                      src={rental.car.images[0]}
                      alt={rental.car.name}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground truncate">{rental.car?.name}</p>
                  <p className="text-sm text-muted-foreground">{rental.user?.name}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-primary">${rental.totalAmount}</p>
                  <p className="text-xs text-muted-foreground">{rental.pickupDate}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fleet Overview */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-xl font-semibold text-foreground">Fleet Overview</h2>
            <Link to="/admin/cars">
              <Button variant="ghost" size="sm" className="gap-2">
                Manage Cars
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="p-4 rounded-lg bg-secondary/50 text-center">
              <p className="text-3xl font-bold text-foreground">{mockCars.length}</p>
              <p className="text-sm text-muted-foreground">Total Cars</p>
            </div>
            <div className="p-4 rounded-lg bg-secondary/50 text-center">
              <p className="text-3xl font-bold text-green-400">
                {mockCars.filter(c => c.available).length}
              </p>
              <p className="text-sm text-muted-foreground">Available</p>
            </div>
          </div>
          <div className="space-y-3">
            {mockCars.slice(0, 4).map((car) => (
              <div key={car.id} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={car.images[0]}
                    alt={car.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground text-sm">{car.name}</p>
                  <p className="text-xs text-muted-foreground">${car.pricePerDay}/day</p>
                </div>
                <div className={`w-2 h-2 rounded-full ${car.available ? 'bg-green-400' : 'bg-red-400'}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
