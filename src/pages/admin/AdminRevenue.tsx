import React from 'react';
import { DollarSign, TrendingUp, Car, Users } from 'lucide-react';
import { rentalStats, monthlyRevenue, mockCars, mockUsers } from '@/data/mockData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area } from 'recharts';

import { useAdminStats } from '@/hooks/useAdminStats';
import { useAdminCars } from '@/hooks/useAdminCars';
import { useAdminRentals } from '@/hooks/useAdminRentals';

const AdminRevenue: React.FC = () => {
  const { data: statsData, isLoading: statsLoading } = useAdminStats();
  const { data: cars = [], isLoading: carsLoading } = useAdminCars();
  const { data: rentals = [] } = useAdminRentals();

  const stats = [
    {
      label: 'Total Revenue',
      value: `$${statsData?.totalRevenue.toLocaleString() || '0'}`,
      icon: DollarSign,
      change: '+12.5%',
    },
    {
      label: 'Total Rentals',
      value: statsData?.totalRentals.toLocaleString() || '0',
      icon: Car,
      change: '+8.2%',
    },
    {
      label: 'Total Customers',
      value: statsData?.totalUsers.toString() || '0',
      icon: Users,
      change: '+15.3%',
    },
    {
      label: 'Avg. Rental Value',
      value: `$${statsData?.totalRentals ? Math.round(statsData.totalRevenue / statsData.totalRentals).toLocaleString() : '0'}`,
      icon: TrendingUp,
      change: '+4.1%',
    },
  ];

  const brandRevenue = statsData?.revenueByBrand || [];

  if (statsLoading || carsLoading) {
    return <div className="p-8 text-center text-muted-foreground animate-pulse">Loading analytics...</div>;
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-display text-3xl font-bold text-foreground mb-2">Revenue Analytics</h1>
        <p className="text-muted-foreground">Track your business performance and financial metrics</p>
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
            <div className="flex items-center gap-1 mt-4 text-sm text-green-400">
              <TrendingUp className="h-4 w-4" />
              <span>{stat.change} from last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Monthly Revenue Chart */}
        <div className="glass-card p-6">
          <h2 className="font-display text-xl font-semibold text-foreground mb-6">Monthly Revenue</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={statsData?.monthlyRevenue || []}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(40 90% 55%)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(40 90% 55%)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 15% 20%)" />
                <XAxis 
                  dataKey="month" 
                  stroke="hsl(220 10% 55%)"
                  fontSize={12}
                />
                <YAxis 
                  stroke="hsl(220 10% 55%)"
                  fontSize={12}
                  tickFormatter={(value) => `$${value / 1000}k`}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(220 18% 10%)',
                    border: '1px solid hsl(220 15% 20%)',
                    borderRadius: '8px',
                    color: 'hsl(40 20% 95%)',
                  }}
                  formatter={(value: number) => [`$${value.toLocaleString()}`, 'Revenue']}
                />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="hsl(40 90% 55%)" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorRevenue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Revenue by Brand */}
        <div className="glass-card p-6">
          <h2 className="font-display text-xl font-semibold text-foreground mb-6">Revenue by Brand</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={brandRevenue} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 15% 20%)" />
                <XAxis 
                  type="number"
                  stroke="hsl(220 10% 55%)"
                  fontSize={12}
                  tickFormatter={(value) => `$${value / 1000}k`}
                />
                <YAxis 
                  type="category"
                  dataKey="brand" 
                  stroke="hsl(220 10% 55%)"
                  fontSize={12}
                  width={100}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(220 18% 10%)',
                    border: '1px solid hsl(220 15% 20%)',
                    borderRadius: '8px',
                    color: 'hsl(40 20% 95%)',
                  }}
                  formatter={(value: number) => [`$${value.toLocaleString()}`, 'Revenue']}
                />
                <Bar 
                  dataKey="revenue" 
                  fill="hsl(40 90% 55%)" 
                  radius={[0, 4, 4, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Top Performing Cars */}
      <div className="glass-card p-6">
        <h2 className="font-display text-xl font-semibold text-foreground mb-6">Top Performing Vehicles (This Month)</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Vehicle</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Price/Day</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Revenue Generated (This Month)</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {cars.map((car: any) => {
                const carRev = statsData?.revenueByCarThisMonth?.find((r: any) => r._id === car._id);
                return {
                  ...car,
                  revenueThisMonth: carRev ? carRev.revenue : 0
                };
              })
              .sort((a: any, b: any) => b.revenueThisMonth - a.revenueThisMonth)
              .slice(0, 5)
              .map((car: any) => (
                <tr key={car._id} className="border-b border-border/50">
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-8 rounded overflow-hidden">
                        <img src={car.images[0] || 'https://via.placeholder.com/150'} alt={car.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{car.name}</p>
                        <p className="text-sm text-muted-foreground">{car.brand}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-foreground">${car.pricePerDay}</td>
                  <td className="px-4 py-4 text-primary font-semibold">
                    ${car.revenueThisMonth.toLocaleString()}
                  </td>
                  <td className="px-4 py-4">
                    {(() => {
                      const isRented = rentals.some((r: any) => r.car?._id === car._id && r.status === 'active');
                      if (car.available) {
                        return (
                          <>
                            <span className="inline-block w-2 h-2 rounded-full mr-2 bg-green-400" />
                            <span className="text-foreground">Available</span>
                          </>
                        );
                      } else if (isRented) {
                        return (
                          <>
                            <span className="inline-block w-2 h-2 rounded-full mr-2 bg-red-400" />
                            <span className="text-foreground">Rented</span>
                          </>
                        );
                      } else {
                        return (
                          <>
                            <span className="inline-block w-2 h-2 rounded-full mr-2 bg-gray-400" />
                            <span className="text-foreground">Unavailable</span>
                          </>
                        );
                      }
                    })()}
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

export default AdminRevenue;
