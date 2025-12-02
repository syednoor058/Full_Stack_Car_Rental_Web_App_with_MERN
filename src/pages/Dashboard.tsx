import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Phone, Calendar, Car, Clock, DollarSign, ArrowRight, LogOut } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { getRentalsByUserId, getCarById } from '@/data/mockData';

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null;
  }

  const rentals = getRentalsByUserId(user.id);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="success">Active</Badge>;
      case 'completed':
        return <Badge variant="secondary">Completed</Badge>;
      case 'cancelled':
        return <Badge variant="destructive">Cancelled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const calculateRemainingDays = (returnDate: string) => {
    const today = new Date();
    const end = new Date(returnDate);
    const diff = Math.ceil((end.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-28 pb-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar - Profile */}
            <aside className="lg:w-80 flex-shrink-0">
              <div className="glass-card p-6 space-y-6 sticky top-28">
                {/* Avatar */}
                <div className="text-center">
                  <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                    <User className="h-12 w-12 text-primary" />
                  </div>
                  <h2 className="font-display text-xl font-semibold text-foreground">{user.name}</h2>
                  <p className="text-muted-foreground text-sm">Member since {user.createdAt}</p>
                </div>

                {/* Profile Info */}
                <div className="space-y-4 pt-4 border-t border-border">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-primary" />
                    <span className="text-foreground text-sm">{user.email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-primary" />
                    <span className="text-foreground text-sm">{user.phone || 'Not provided'}</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">{rentals.length}</p>
                    <p className="text-xs text-muted-foreground">Total Rentals</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">
                      {rentals.filter(r => r.status === 'active').length}
                    </p>
                    <p className="text-xs text-muted-foreground">Active</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-2 pt-4 border-t border-border">
                  <Link to="/cars">
                    <Button variant="gold" className="w-full gap-2">
                      <Car className="h-4 w-4" />
                      Browse Cars
                    </Button>
                  </Link>
                  <Button 
                    variant="outline" 
                    className="w-full gap-2"
                    onClick={() => {
                      logout();
                      navigate('/');
                    }}
                  >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </Button>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 space-y-8">
              {/* Header */}
              <div>
                <h1 className="font-display text-3xl font-bold text-foreground mb-2">
                  Welcome back, {user.name.split(' ')[0]}!
                </h1>
                <p className="text-muted-foreground">
                  Manage your rentals and explore new vehicles.
                </p>
              </div>

              {/* Active Rentals */}
              <section>
                <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                  My Rentals
                </h2>
                
                {rentals.length === 0 ? (
                  <div className="glass-card p-12 text-center">
                    <Car className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-foreground mb-2">No Rentals Yet</h3>
                    <p className="text-muted-foreground mb-6">
                      Start your luxury experience by renting your first car.
                    </p>
                    <Link to="/cars">
                      <Button variant="gold" className="gap-2">
                        Browse Fleet
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {rentals.map((rental) => {
                      const car = rental.car || getCarById(rental.carId);
                      const remainingDays = rental.status === 'active' ? calculateRemainingDays(rental.returnDate) : 0;
                      
                      return (
                        <div key={rental.id} className="glass-card p-6">
                          <div className="flex flex-col md:flex-row gap-6">
                            {/* Car Image */}
                            {car && (
                              <div className="md:w-48 h-32 rounded-lg overflow-hidden flex-shrink-0">
                                <img
                                  src={car.images[0]}
                                  alt={car.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            )}

                            {/* Rental Info */}
                            <div className="flex-1 space-y-3">
                              <div className="flex items-start justify-between">
                                <div>
                                  <h3 className="font-display text-lg font-semibold text-foreground">
                                    {car?.name || 'Unknown Car'}
                                  </h3>
                                  <p className="text-muted-foreground text-sm">
                                    {car?.brand} • {car?.model}
                                  </p>
                                </div>
                                {getStatusBadge(rental.status)}
                              </div>

                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="flex items-center gap-2">
                                  <Calendar className="h-4 w-4 text-primary" />
                                  <div>
                                    <p className="text-xs text-muted-foreground">Pickup</p>
                                    <p className="text-sm text-foreground">{rental.pickupDate}</p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Calendar className="h-4 w-4 text-primary" />
                                  <div>
                                    <p className="text-xs text-muted-foreground">Return</p>
                                    <p className="text-sm text-foreground">{rental.returnDate}</p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <DollarSign className="h-4 w-4 text-primary" />
                                  <div>
                                    <p className="text-xs text-muted-foreground">Total</p>
                                    <p className="text-sm font-semibold text-primary">${rental.totalAmount}</p>
                                  </div>
                                </div>
                                {rental.status === 'active' && (
                                  <div className="flex items-center gap-2">
                                    <Clock className="h-4 w-4 text-primary" />
                                    <div>
                                      <p className="text-xs text-muted-foreground">Remaining</p>
                                      <p className="text-sm text-foreground">{remainingDays} days</p>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
