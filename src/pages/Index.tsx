import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Shield,
  Clock,
  Award,
  Star,
  ChevronRight,
  Mouse,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CarCard from "@/components/cars/CarCard";
import { mockCars } from "@/data/mockData";
import LoopVideo from "@/components/ui/loop-video";

const Index: React.FC = () => {
  const featuredCars = mockCars.slice(0, 6);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-20 x-padding">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="relative w-full h-full">
            <LoopVideo src="https://res.cloudinary.com/dicfxacdd/video/upload/v1764754786/car_rental_banner_video_xhrg5g.webm" className="absolute w-full h-full object-cover" />
          </div>
        </div>

        <div className="relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 animate-fade-in-up">
              <Star className="h-4 w-4 text-primary fill-primary" />
              <span className="text-sm text-primary font-medium">
                Premium Car Rental Experience
              </span>
            </div>

            {/* Heading */}
            <h1
              className="font-display text-4xl md:text-7xl font-bold text-foreground mb-6 animate-fade-in-up"
              style={{ animationDelay: "0.1s" }}
            >
              Drive the Experience
              <span className="block mt-2 text-gradient-gold">
                You Deserve.
              </span>
            </h1>

            {/* Subheading */}
            <p
              className="text-xl md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              Experience luxury redefined. From elegant sedans to powerful
              sports cars, find the perfect vehicle for every occasion.
            </p>

            {/* CTA Buttons */}
            <div
              className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up"
              style={{ animationDelay: "0.3s" }}
            >
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
            <div
              className="grid grid-cols-3 gap-8 mt-20 animate-fade-in-up"
              style={{ animationDelay: "0.4s" }}
            >
              {[
                { value: "50+", label: "Premium Vehicles" },
                { value: "10K+", label: "Happy Customers" },
                { value: "24/7", label: "Customer Support" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-3xl md:text-4xl font-bold text-primary">
                    {stat.value}
                  </p>
                  <p className="text-sm mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-0 w-full flex flex-row gap-2 justify-center items-center z-[5]">
          <div className="text-sm text-muted-foreground">Scroll Down</div>
          <div className="flex items-center justify-center animate-bounce">
            <Mouse className="text-primary" />
          </div>
          <div className="text-sm text-muted-foreground">Explore More.</div>
        </div>

        {/* Bottom Shade */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-t from-[#101318] to-[#101318]/0" />
        </div>
      </section>

      {/* Features Section */}
      <section className="pt-24 pb-20 bg-[#101318] x-padding">
        <div className="">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold text-foreground mb-4">
              Why Choose <span className="text-primary">OmniQ</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We deliver an unparalleled rental experience with attention to
              every detail.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {[
              {
                icon: Shield,
                title: "Fully Insured",
                description:
                  "Comprehensive insurance coverage on all vehicles for your peace of mind.",
              },
              {
                icon: Clock,
                title: "Flexible Rentals",
                description:
                  "Rent by the hour, day, or week. We adapt to your schedule you are comfortable with.",
              },
              {
                icon: Award,
                title: "Premium Quality",
                description:
                  "Every vehicle is meticulously maintained and highly secured before each rental.",
              },
              {
                icon: Award,
                title: "Transparent Pricing",
                description:
                  "No hidden fees, no surprises. Get honest pricing and flexible rental plans tailored to your needs.",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="glass-card p-6 text-center group hover-lift"
              >
                <div className="inline-flex p-4 rounded-full bg-primary/10 mb-6 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Cars */}
      <section className="py-20 x-padding">
        <div className="">
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
      <section className="py-20 relative overflow-hidden x-padding">
        <div className="absolute inset-0">
          <img src="https://res.cloudinary.com/dicfxacdd/image/upload/v1764762315/Untitled_design_2_hdjzpr.jpg"
          alt="CTA Background"
          className="w-full h-full object-cover object-top opacity-35" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
              Ready to Experience <span className="text-primary">Luxury?</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-10">
              Join thousands of satisfied customers who trust OmniQ for
              their premium transportation needs.
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
