import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Clock, Award, Star, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CarCard from '@/components/cars/CarCard';
import { mockCars } from '@/data/mockData';

const Index: React.FC = () => {
  const featuredCars = mockCars.slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-card" />
          <div className="absolute top-1/4 -right-64 w-[800px] h-[800px] rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute bottom-0 -left-64 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 animate-fade-in-up">
              <Star className="h-4 w-4 text-primary fill-primary" />
              <span className="text-sm text-primary font-medium">Premium Car Rental Experience</span>
            </div>

            {/* Heading */}
            <h1 className="font-display text-5xl md:text-7xl font-bold text-foreground mb-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              Drive Your Dreams
              <span className="block text-gradient-gold mt-2">In Style</span>
            </h1>

            {/* Subheading */}
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Experience luxury redefined. From elegant sedans to powerful sports cars, 
              find the perfect vehicle for every occasion.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <Link to="/cars">
                <Button variant="gold" size="xl" className="gap-2 group">
                  Explore Our Fleet
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="gold-outline" size="xl">
                  Create Account
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-20 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              {[
                { value: '50+', label: 'Premium Vehicles' },
                { value: '10K+', label: 'Happy Customers' },
                { value: '24/7', label: 'Customer Support' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-3xl md:text-4xl font-bold text-primary">{stat.value}</p>
                  <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
            <div className="w-1 h-2 rounded-full bg-primary animate-pulse" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold text-foreground mb-4">
              Why Choose <span className="text-primary">LuxuryDrives</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We deliver an unparalleled rental experience with attention to every detail.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: 'Fully Insured',
                description: 'Comprehensive insurance coverage on all vehicles for your peace of mind.',
              },
              {
                icon: Clock,
                title: 'Flexible Rentals',
                description: 'Rent by the hour, day, or week. We adapt to your schedule.',
              },
              {
                icon: Award,
                title: 'Premium Quality',
                description: 'Every vehicle is meticulously maintained and detailed before each rental.',
              },
            ].map((feature) => (
              <div key={feature.title} className="glass-card p-8 text-center group hover-lift">
                <div className="inline-flex p-4 rounded-2xl bg-primary/10 mb-6 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Cars */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="font-display text-4xl font-bold text-foreground mb-4">
                Featured <span className="text-primary">Vehicles</span>
              </h2>
              <p className="text-muted-foreground">
                Discover our handpicked selection of premium automobiles.
              </p>
            </div>
            <Link to="/cars">
              <Button variant="gold-outline" className="gap-2 hidden md:flex">
                View All Cars
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>

          <div className="mt-10 text-center md:hidden">
            <Link to="/cars">
              <Button variant="gold-outline" className="gap-2">
                View All Cars
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
              Ready to Experience <span className="text-primary">Luxury?</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-10">
              Join thousands of satisfied customers who trust LuxuryDrives for their premium transportation needs.
            </p>
            <Link to="/register">
              <Button variant="gold" size="xl" className="gap-2">
                Get Started Today
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
