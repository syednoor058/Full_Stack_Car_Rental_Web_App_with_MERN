import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Fuel, Users, Settings, Gauge, Calendar, Check, Star } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { getCarById } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const CarDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  
  const [pickupDate, setPickupDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const car = getCarById(id || '');

  if (!car) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Car Not Found</h1>
          <Button variant="gold" onClick={() => navigate('/cars')}>
            Browse Cars
          </Button>
        </div>
      </div>
    );
  }

  const calculateTotalDays = () => {
    if (!pickupDate || !returnDate) return 0;
    const start = new Date(pickupDate);
    const end = new Date(returnDate);
    const diff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
  };

  const totalDays = calculateTotalDays();
  const totalAmount = totalDays * car.pricePerDay;

  const handleBooking = () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please login to book a car.",
        variant: "destructive",
      });
      navigate('/login');
      return;
    }

    if (!pickupDate || !returnDate || totalDays === 0) {
      toast({
        title: "Invalid Dates",
        description: "Please select valid pickup and return dates.",
        variant: "destructive",
      });
      return;
    }

    // Mock booking - in real app, this would call your MERN backend
    toast({
      title: "Booking Confirmed!",
      description: `Your ${car.name} has been booked for ${totalDays} days. Total: $${totalAmount}`,
    });
    setIsBookingOpen(false);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-28 pb-16">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <Button 
            variant="ghost" 
            onClick={() => navigate('/cars')}
            className="mb-6 gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Fleet
          </Button>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Images */}
            <div className="space-y-4">
              <div className="aspect-video rounded-2xl overflow-hidden glass-card">
                <img
                  src={car.images[0]}
                  alt={car.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {car.images.length > 1 && (
                <div className="grid grid-cols-3 gap-4">
                  {car.images.slice(0, 3).map((img, idx) => (
                    <div key={idx} className="aspect-video rounded-xl overflow-hidden glass-card">
                      <img
                        src={img}
                        alt={`${car.name} ${idx + 1}`}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Details */}
            <div className="space-y-8">
              {/* Header */}
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <Badge variant="gold">{car.brand}</Badge>
                  <Badge variant={car.available ? 'success' : 'destructive'}>
                    {car.available ? 'Available' : 'Rented'}
                  </Badge>
                </div>
                <h1 className="font-display text-4xl font-bold text-foreground mb-2">
                  {car.name}
                </h1>
                <p className="text-muted-foreground text-lg">{car.model} • {car.year}</p>
              </div>

              {/* Price */}
              <div className="glass-card p-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-primary">${car.pricePerDay}</span>
                  <span className="text-muted-foreground">/ day</span>
                </div>
                <div className="flex items-center gap-1 mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-primary fill-primary" />
                  ))}
                  <span className="text-sm text-muted-foreground ml-2">(128 reviews)</span>
                </div>
              </div>

              {/* Specs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { icon: Fuel, label: 'Fuel', value: car.fuelType },
                  { icon: Users, label: 'Seats', value: `${car.seats} Seats` },
                  { icon: Settings, label: 'Transmission', value: car.transmission },
                  { icon: Gauge, label: 'Mileage', value: car.mileage },
                ].map((spec) => (
                  <div key={spec.label} className="glass-card p-4 text-center">
                    <spec.icon className="h-6 w-6 text-primary mx-auto mb-2" />
                    <p className="text-xs text-muted-foreground">{spec.label}</p>
                    <p className="text-sm font-medium text-foreground">{spec.value}</p>
                  </div>
                ))}
              </div>

              {/* Description */}
              <div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-3">Description</h3>
                <p className="text-muted-foreground leading-relaxed">{car.description}</p>
              </div>

              {/* Features */}
              <div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-4">Features</h3>
                <div className="grid grid-cols-2 gap-3">
                  {car.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-primary" />
                      <span className="text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Book Now */}
              <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
                <DialogTrigger asChild>
                  <Button 
                    variant="gold" 
                    size="xl" 
                    className="w-full gap-2"
                    disabled={!car.available}
                  >
                    <Calendar className="h-5 w-5" />
                    {car.available ? 'Rent Now' : 'Currently Unavailable'}
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-card border-border">
                  <DialogHeader>
                    <DialogTitle className="font-display text-2xl">Book {car.name}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-6 pt-4">
                    <div className="space-y-2">
                      <Label>Pickup Date</Label>
                      <Input
                        type="date"
                        value={pickupDate}
                        onChange={(e) => setPickupDate(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        className="bg-secondary"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Return Date</Label>
                      <Input
                        type="date"
                        value={returnDate}
                        onChange={(e) => setReturnDate(e.target.value)}
                        min={pickupDate || new Date().toISOString().split('T')[0]}
                        className="bg-secondary"
                      />
                    </div>
                    
                    {totalDays > 0 && (
                      <div className="glass-card p-4 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Duration</span>
                          <span className="text-foreground">{totalDays} days</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Rate</span>
                          <span className="text-foreground">${car.pricePerDay}/day</span>
                        </div>
                        <div className="border-t border-border pt-2 flex justify-between font-semibold">
                          <span className="text-foreground">Total</span>
                          <span className="text-primary">${totalAmount}</span>
                        </div>
                      </div>
                    )}

                    <Button variant="gold" className="w-full" onClick={handleBooking}>
                      Confirm Booking
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CarDetails;
