import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getAllRentalsWithDetails, Rental } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { useAdminRentals, useUpdateRentalStatus } from '@/hooks/useAdminRentals';

const AdminRentals: React.FC = () => {
  const { data: rentals = [], isLoading } = useAdminRentals();
  const updateStatusMutation = useUpdateRentalStatus();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const { toast } = useToast();

  const filteredRentals = rentals.filter((rental: any) => {
    const matchesSearch = 
      rental.car?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rental.user?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rental.user?.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || rental.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = async (rentalId: string, newStatus: string) => {
    try {
      await updateStatusMutation.mutateAsync({ id: rentalId, status: newStatus });
      toast({
        title: "Status Updated",
        description: `Rental status changed to ${newStatus}.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update status.",
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="success">Active</Badge>;
      case 'completed':
        return <Badge variant="secondary">Completed</Badge>;
      case 'cancelled':
        return <Badge variant="destructive">Cancelled</Badge>;
      case 'pending':
        return <Badge variant="warning">Pending</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-display text-3xl font-bold text-foreground mb-2">Rental Management</h1>
        <p className="text-muted-foreground">View and manage all rental records</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search by car, customer name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total', value: rentals.length, color: 'text-foreground' },
          { label: 'Active', value: rentals.filter(r => r.status === 'active').length, color: 'text-green-400' },
          { label: 'Completed', value: rentals.filter(r => r.status === 'completed').length, color: 'text-muted-foreground' },
          { label: 'Cancelled', value: rentals.filter(r => r.status === 'cancelled').length, color: 'text-destructive' },
        ].map((stat) => (
          <div key={stat.label} className="glass-card p-4 text-center">
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Rentals Table */}
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-secondary/50">
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Car</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Customer</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Dates</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Amount</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Status</th>
                <th className="px-6 py-4 text-right text-sm font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-muted-foreground">Loading rentals...</td>
                </tr>
              ) : filteredRentals.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-muted-foreground">No rentals found.</td>
                </tr>
              ) : filteredRentals.map((rental: any) => (
                <tr key={rental._id} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {rental.car && (
                        <div className="w-14 h-10 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={rental.car.images[0] || 'https://via.placeholder.com/150'}
                            alt={rental.car.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div>
                        <p className="font-medium text-foreground">{rental.car?.name}</p>
                        <p className="text-sm text-muted-foreground">{rental.car?.brand}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-foreground">{rental.user?.name}</p>
                      <p className="text-sm text-muted-foreground">{rental.user?.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-foreground text-sm">{new Date(rental.pickupDate).toLocaleDateString()}</p>
                      <p className="text-muted-foreground text-sm">to {new Date(rental.returnDate).toLocaleDateString()}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-semibold text-primary">${rental.totalAmount}</span>
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(rental.status)}
                  </td>
                  <td className="px-6 py-4">
                    <Select 
                      value={rental.status} 
                      onValueChange={(value: any) => handleStatusChange(rental._id, value)}
                    >
                      <SelectTrigger className="w-[130px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
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

export default AdminRentals;
