import React from 'react';
import { Link } from 'react-router-dom';
import { Car, DollarSign, ClipboardList, TrendingUp, ArrowRight, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { rentalStats, mockCars, getAllRentalsWithDetails } from '@/data/mockData';

import { useAdminStats } from '@/hooks/useAdminStats';
import { useAdminRentals } from '@/hooks/useAdminRentals';

const AdminDashboard: React.FC = () => {
  const { data: statsData, isLoading: statsLoading } = useAdminStats();
  const { data: rentals = [], isLoading: rentalsLoading } = useAdminRentals();
  const recentRentals = rentals.slice(0, 5);

  const stats = [
    {
      label: 'Total Revenue',
      value: `$${statsData?.totalRevenue.toLocaleString() || '0'}`,
      icon: DollarSign,
      change: '+12.5%',
      positive: true,
    },
    {
      label: 'Total Rentals',
      value: statsData?.totalRentals.toLocaleString() || '0',
      icon: ClipboardList,
      change: '+8.2%',
      positive: true,
    },
    {
      label: 'Active Rentals',
      value: statsData?.activeRentals.toString() || '0',
      icon: Car,
      change: '+3',
      positive: true,
    },
    {
      label: 'Available Cars',
      value: statsData?.availableCars.toString() || '0',
      icon: Calendar,
      change: '',
      positive: true,
    },
  ];

  if (statsLoading || rentalsLoading) {
    return <div className="p-8 text-center text-muted-foreground animate-pulse">Loading dashboard...</div>;
  }

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
            {stat.change && (
                <div className={`flex items-center gap-1 mt-4 text-sm ${stat.positive ? 'text-green-400' : 'text-red-400'}`}>
                    <TrendingUp className={`h-4 w-4 ${!stat.positive && 'rotate-180'}`} />
                    <span>{stat.change} from last month</span>
                </div>
            )}
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
            {recentRentals.length > 0 ? recentRentals.map((rental: any) => (
              <div key={rental._id} className="flex items-center gap-4 p-3 rounded-lg bg-secondary/50">
                <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                  {rental.car && (
                    <img
                      src={rental.car.images[0] || 'https://via.placeholder.com/150'}
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
                  <p className="text-xs text-muted-foreground">{new Date(rental.pickupDate).toLocaleDateString()}</p>
                </div>
              </div>
            )) : (
              <p className="text-center text-muted-foreground py-4">No recent rentals.</p>
            )}
          </div>
        </div>

        {/* Fleet Overview */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-xl font-semibold text-foreground">Fleet Summary</h2>
            <Link to="/admin/cars">
              <Button variant="ghost" size="sm" className="gap-2">
                Manage Fleet
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="p-4 rounded-lg bg-secondary/50 text-center">
              <p className="text-3xl font-bold text-foreground">{statsData?.totalRentals || 0}</p>
              <p className="text-sm text-muted-foreground">Total Bookings</p>
            </div>
            <div className="p-4 rounded-lg bg-secondary/50 text-center">
              <p className="text-3xl font-bold text-green-400">
                {statsData?.availableCars || 0}
              </p>
              <p className="text-sm text-muted-foreground">Cars Available</p>
            </div>
          </div>
          <div className="text-center p-8 bg-secondary/30 rounded-xl">
             <p className="text-muted-foreground">Manage your car inventory and rental pricing directly from the car management tab.</p>
          </div>
        </div>
      </div>

      {/* Payment Transaction History */}
      <div className="glass-card overflow-hidden mt-8">
        <div className="p-6 border-b border-border/50 flex items-center justify-between">
          <h2 className="font-display text-xl font-semibold text-foreground">Payment Transaction History</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-secondary/50 border-b border-border">
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Transaction ID / Intent</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Customer</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Vehicle</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Date</th>
                <th className="px-6 py-4 text-right text-sm font-medium text-muted-foreground">Amount</th>
                <th className="px-6 py-4 text-center text-sm font-medium text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {rentals.slice(0, 10).map((rental: any) => (
                <tr key={rental._id} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-mono text-xs text-muted-foreground">{rental.paymentIntentId || rental._id}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-medium text-foreground">{rental.user?.name || 'Unknown'}</p>
                    <p className="text-xs text-muted-foreground">{rental.user?.email}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-foreground">{rental.car?.name || 'Unknown'}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-foreground">{new Date(rental.createdAt).toLocaleDateString()}</p>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="font-bold text-primary">${rental.totalAmount}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      rental.paymentStatus === 'paid' ? 'bg-green-400/10 text-green-400' : 'bg-red-400/10 text-red-400'
                    }`}>
                      {rental.paymentStatus?.toUpperCase() || 'PAID'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
