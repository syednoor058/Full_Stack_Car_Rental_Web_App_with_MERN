import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CarCard from '@/components/cars/CarCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { mockCars } from '@/data/mockData';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

const Cars: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [selectedFuel, setSelectedFuel] = useState<string>('all');
  const [selectedTransmission, setSelectedTransmission] = useState<string>('all');
  const [selectedSeats, setSelectedSeats] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<string>('all');
  const [availableOnly, setAvailableOnly] = useState(false);

  const brands = [...new Set(mockCars.map(car => car.brand))];
  const fuelTypes = [...new Set(mockCars.map(car => car.fuelType))];

  const filteredCars = useMemo(() => {
    return mockCars.filter(car => {
      const matchesSearch = car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.model.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesBrand = selectedBrand === 'all' || car.brand === selectedBrand;
      const matchesFuel = selectedFuel === 'all' || car.fuelType === selectedFuel;
      const matchesTransmission = selectedTransmission === 'all' || car.transmission === selectedTransmission;
      const matchesSeats = selectedSeats === 'all' || car.seats.toString() === selectedSeats;
      const matchesAvailability = !availableOnly || car.available;
      
      let matchesPrice = true;
      if (priceRange !== 'all') {
        const [min, max] = priceRange.split('-').map(Number);
        matchesPrice = car.pricePerDay >= min && (max ? car.pricePerDay <= max : true);
      }

      return matchesSearch && matchesBrand && matchesFuel && matchesTransmission && matchesSeats && matchesAvailability && matchesPrice;
    });
  }, [searchQuery, selectedBrand, selectedFuel, selectedTransmission, selectedSeats, priceRange, availableOnly]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedBrand('all');
    setSelectedFuel('all');
    setSelectedTransmission('all');
    setSelectedSeats('all');
    setPriceRange('all');
    setAvailableOnly(false);
  };

  const hasActiveFilters = selectedBrand !== 'all' || selectedFuel !== 'all' || 
    selectedTransmission !== 'all' || selectedSeats !== 'all' || priceRange !== 'all' || availableOnly;

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Brand Filter */}
      <div className="space-y-3">
        <Label className="text-foreground font-medium">Brand</Label>
        <Select value={selectedBrand} onValueChange={setSelectedBrand}>
          <SelectTrigger className="bg-secondary border-border">
            <SelectValue placeholder="All Brands" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Brands</SelectItem>
            {brands.map(brand => (
              <SelectItem key={brand} value={brand}>{brand}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Fuel Type Filter */}
      <div className="space-y-3">
        <Label className="text-foreground font-medium">Fuel Type</Label>
        <Select value={selectedFuel} onValueChange={setSelectedFuel}>
          <SelectTrigger className="bg-secondary border-border">
            <SelectValue placeholder="All Fuel Types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Fuel Types</SelectItem>
            {fuelTypes.map(fuel => (
              <SelectItem key={fuel} value={fuel}>{fuel}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Transmission Filter */}
      <div className="space-y-3">
        <Label className="text-foreground font-medium">Transmission</Label>
        <Select value={selectedTransmission} onValueChange={setSelectedTransmission}>
          <SelectTrigger className="bg-secondary border-border">
            <SelectValue placeholder="All Types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="Automatic">Automatic</SelectItem>
            <SelectItem value="Manual">Manual</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Seats Filter */}
      <div className="space-y-3">
        <Label className="text-foreground font-medium">Seats</Label>
        <Select value={selectedSeats} onValueChange={setSelectedSeats}>
          <SelectTrigger className="bg-secondary border-border">
            <SelectValue placeholder="Any" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any</SelectItem>
            <SelectItem value="2">2 Seats</SelectItem>
            <SelectItem value="4">4 Seats</SelectItem>
            <SelectItem value="5">5 Seats</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Price Range Filter */}
      <div className="space-y-3">
        <Label className="text-foreground font-medium">Price Range</Label>
        <Select value={priceRange} onValueChange={setPriceRange}>
          <SelectTrigger className="bg-secondary border-border">
            <SelectValue placeholder="Any Price" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any Price</SelectItem>
            <SelectItem value="0-400">Under $400/day</SelectItem>
            <SelectItem value="400-500">$400 - $500/day</SelectItem>
            <SelectItem value="500-1000">$500+/day</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Availability Filter */}
      <div className="flex items-center gap-3">
        <Checkbox 
          id="available" 
          checked={availableOnly}
          onCheckedChange={(checked) => setAvailableOnly(checked as boolean)}
        />
        <Label htmlFor="available" className="text-foreground cursor-pointer">
          Available Only
        </Label>
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <Button variant="outline" onClick={clearFilters} className="w-full gap-2">
          <X className="h-4 w-4" />
          Clear Filters
        </Button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Header */}
      <section className="pt-32 pb-12 bg-gradient-to-b from-card/50 to-background">
        <div className="container mx-auto px-4">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Our <span className="text-primary">Fleet</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Browse our collection of premium vehicles. Find the perfect car for your journey.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters - Desktop */}
            <aside className="hidden lg:block w-72 flex-shrink-0">
              <div className="glass-card p-6 sticky top-28">
                <h3 className="font-display text-lg font-semibold text-foreground mb-6">Filters</h3>
                <FilterContent />
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1">
              {/* Search & Mobile Filter */}
              <div className="flex gap-4 mb-8">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    placeholder="Search cars..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 h-12 bg-secondary"
                  />
                </div>
                
                {/* Mobile Filter Button */}
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="icon" className="lg:hidden h-12 w-12">
                      <SlidersHorizontal className="h-5 w-5" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="bg-card border-border">
                    <SheetHeader>
                      <SheetTitle className="font-display">Filters</SheetTitle>
                    </SheetHeader>
                    <div className="mt-6">
                      <FilterContent />
                    </div>
                  </SheetContent>
                </Sheet>
              </div>

              {/* Results Count */}
              <p className="text-muted-foreground mb-6">
                Showing <span className="text-foreground font-medium">{filteredCars.length}</span> vehicles
              </p>

              {/* Cars Grid */}
              {filteredCars.length > 0 ? (
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredCars.map((car) => (
                    <CarCard key={car.id} car={car} />
                  ))}
                </div>
              ) : (
                <div className="glass-card p-12 text-center">
                  <p className="text-muted-foreground text-lg">No cars found matching your criteria.</p>
                  <Button variant="gold-outline" onClick={clearFilters} className="mt-4">
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Cars;
