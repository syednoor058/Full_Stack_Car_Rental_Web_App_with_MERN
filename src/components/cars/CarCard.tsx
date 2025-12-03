import React from 'react';
import { Link } from 'react-router-dom';
import { Car } from '@/data/mockData';
import { Fuel, Users, Settings, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface CarCardProps {
  car: Car;
}

const CarCard: React.FC<CarCardProps> = ({ car }) => {
  return (
    <div className="group glass-card overflow-hidden hover-lift">
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={car.images[0]}
          alt={car.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        
        {/* Availability Badge */}
        <Badge 
          className={`absolute top-4 right-4 ${
            car.available 
              ? 'bg-green-500/90 text-green-50' 
              : 'bg-destructive/90 text-destructive-foreground'
          }`}
        >
          {car.available ? 'Available' : 'Rented'}
        </Badge>

        {/* Brand Badge */}
        <Badge className="absolute top-4 left-4 bg-card/80 backdrop-blur-sm text-foreground">
          {car.brand}
        </Badge>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <div>
          <h3 className="font-display text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
            {car.name}
          </h3>
          <p className="text-muted-foreground text-sm">{car.model} • {car.year}</p>
        </div>

        {/* Specs */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Fuel className="h-4 w-4 text-primary" />
            <span>{car.fuelType}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users className="h-4 w-4 text-primary" />
            <span>{car.seats} Seats</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Settings className="h-4 w-4 text-primary" />
            <span>{car.transmission}</span>
          </div>
        </div>

        {/* Price & Action */}
        <div className="flex items-center justify-between pt-4 border-t border-border/50">
          <div>
            <p className="text-2xl font-bold text-primary">${car.pricePerDay}</p>
            <p className="text-xs text-muted-foreground">per day</p>
          </div>
          <Link to={`/cars/${car.id}`}>
            <Button variant="gold" size="sm" className="gap-2">
              View Details
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
