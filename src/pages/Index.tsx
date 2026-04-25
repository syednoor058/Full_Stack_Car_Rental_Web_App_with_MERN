import React, { useRef } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Shield,
  Clock,
  Award,
  Star,
  ChevronRight,
  Mouse,
  Search,
  CalendarCheck,
  Key,
  Apple,
  Play,
  Quote
} from "lucide-react";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CarCard from "@/components/cars/CarCard";
import { mockCars } from "@/data/mockData";
import LoopVideo from "@/components/ui/loop-video";

// Animation Variants
const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

const Index: React.FC = () => {
  const featuredCars = mockCars.slice(0, 6);
  const heroRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(heroProgress, [0, 1], ["0%", "50%"]);
  const heroOpacity = useTransform(heroProgress, [0, 0.8], [1, 0]);

  const { scrollYProgress: appProgress } = useScroll({
    target: appRef,
    offset: ["start end", "end start"],
  });
  const appY = useTransform(appProgress, [0, 1], ["20%", "-20%"]);

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <Navbar />

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center py-20 x-padding overflow-hidden">
        {/* Parallax Background */}
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0 z-0">
          <LoopVideo src="https://res.cloudinary.com/dicfxacdd/video/upload/v1764754786/car_rental_banner_video_xhrg5g.webm" className="absolute w-full h-full object-cover opacity-75" />
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="relative z-20 w-full max-w-5xl mx-auto text-center mt-12"
        >
          {/* Badge */}
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 backdrop-blur-md">
            <Star className="h-4 w-4 text-primary fill-primary" />
            <span className="text-sm text-primary font-medium">
              Premium Car Rental Experience
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={fadeInUp}
            className="font-display text-4xl md:text-7xl font-bold text-foreground mb-6 leading-none"
          >
            Drive the Experience
            <span className="block mt-2 text-gradient-gold">
              You Deserve.
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={fadeInUp}
            className="text-base md:text-lg text-white/60 max-w-2xl mx-auto mb-10"
          >
            Experience luxury redefined. From elegant sedans to powerful
            sports cars, find the perfect vehicle for every occasion.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-5"
          >
            <Link to="/cars">
              <Button variant="gold" size="xl" className="gap-2 group shadow-[0_0_40px_rgba(201,160,80,0.3)] hover:shadow-[0_0_60px_rgba(201,160,80,0.5)] transition-all duration-500">
                Explore Our Fleet
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1.5 transition-transform" />
              </Button>
            </Link>
            <Link to="/register">
              <Button variant="gold-outline" size="xl" className="backdrop-blur-sm bg-background/20 hover:bg-primary/10 hover:text-white">
                Get Started
              </Button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={fadeInUp}
            className="grid grid-cols-3 gap-8 mt-20 max-w-3xl mx-auto border-t border-white/10 pt-6"
          >
            {[
              { value: "50+", label: "Premium Vehicles" },
              { value: "10K+", label: "Happy Customers" },
              { value: "24/7", label: "Customer Support" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl md:text-5xl font-display font-bold text-primary mb-2">
                  {stat.value}
                </p>
                <p className="text-sm md:text-base text-muted-foreground font-medium uppercase tracking-wider">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>

          {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="bottom-0 w-full flex flex-row gap-7 justify-center items-center mt-14 text-lg text-white/60 leading-none font-light"
        >
          <span>Scroll</span>
          <motion.div
            animate={{ opacity: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="flex items-center justify-center p-2 rounded-full border border-primary/30 bg-primary/5 backdrop-blur-md"
          >
            <Mouse className="text-primary h-5 w-5" />
          </motion.div>
          <span>Down</span>
        </motion.div>
        </motion.div>

        

        <div className="absolute w-full h-xl bottom-0 inset-0 bg-gradient-to-t from-[#0a0c10] via-[#0a0c10]/60 to-transparent z-10" />
      </section>

      {/* Brand Marquee Section */}
      <section className="py-24 border-b border-white/5 bg-[#0a0c10] overflow-hidden">
        <div className="x-padding mb-6">
          <p className="text-center text-sm font-medium text-muted-foreground uppercase tracking-widest">Trusted by leading automotive brands</p>
        </div>
        <div className="relative flex overflow-x-hidden group">
          <div className="animate-marquee whitespace-nowrap flex items-center gap-24 py-4 px-12 group-hover:pause">
            {["PORSCHE", "MERCEDES-BENZ", "BMW", "AUDI", "TESLA", "BENTLEY", "ROLLS-ROYCE", "FERRARI"].map((brand, i) => (
              <span key={i} className="text-3xl md:text-4xl font-display font-bold text-white/10 hover:text-white/30 transition-colors duration-300">
                {brand}
              </span>
            ))}
          </div>
          <div className="absolute top-0 animate-marquee2 whitespace-nowrap flex items-center gap-24 py-4 px-12 group-hover:pause">
            {["PORSCHE", "MERCEDES-BENZ", "BMW", "AUDI", "TESLA", "BENTLEY", "ROLLS-ROYCE", "FERRARI"].map((brand, i) => (
              <span key={i} className="text-3xl md:text-4xl font-display font-bold text-white/10 hover:text-white/30 transition-colors duration-300">
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="pt-32 pb-24 bg-gradient-to-b from-[#0a0c10] to-[#101318] x-padding relative">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="container mx-auto"
        >
          <div className="text-center mb-20">
            <motion.h2 variants={fadeInUp} className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              How It <span className="text-primary">Works</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Rent your dream car in three simple steps. We've made the process seamless and hassle-free.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-10 relative">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-1/2 -translate-y-14 left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-transparent via-primary/30 to-transparent z-0" />

            {[
              {
                icon: Search,
                title: "1. Choose Location",
                description: "Select your pick-up and drop-off locations, dates, and times.",
                delay: 0.1
              },
              {
                icon: CalendarCheck,
                title: "2. Select Vehicle",
                description: "Browse our extensive fleet and choose the car that fits your needs.",
                delay: 0.3
              },
              {
                icon: Key,
                title: "3. Book & Drive",
                description: "Complete your reservation online and hit the road in style.",
                delay: 0.5
              },
            ].map((step, i) => (
              <motion.div
                key={step.title}
                variants={fadeInUp}
                className="relative z-10 flex flex-col items-center text-center group"
              >
                <div className="w-24 h-24 rounded-full bg-[#181C25] border border-white/5 flex items-center justify-center mb-8 relative shadow-lg shadow-black/50 group-hover:border-primary/50 transition-colors duration-500">
                  <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <step.icon className="h-10 w-10 text-primary relative z-10" />
                  <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-primary text-[#101318] font-bold flex items-center justify-center text-sm shadow-lg">
                    {i + 1}
                  </div>
                </div>
                <h3 className="font-display text-2xl font-bold text-foreground mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="pt-10 pb-24 bg-gradient-to-b from-[#101318] to-[#0a0c10] x-padding">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="container mx-auto"
        >
          <div className="text-center mb-16">
            <motion.h2 variants={fadeInUp} className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Why Choose <span className="text-primary">OmniQ</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-muted-foreground max-w-2xl mx-auto text-lg">
              We deliver an unparalleled rental experience with attention to
              every detail.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Shield,
                title: "Fully Insured",
                description: "Comprehensive insurance coverage on all vehicles for your peace of mind.",
              },
              {
                icon: Clock,
                title: "Flexible Rentals",
                description: "Rent by the hour, day, or week. We adapt to your schedule you are comfortable with.",
              },
              {
                icon: Award,
                title: "Premium Quality",
                description: "Every vehicle is meticulously maintained and highly secured before each rental.",
              },
              {
                icon: Star,
                title: "Transparent Pricing",
                description: "No hidden fees, no surprises. Get honest pricing and flexible rental plans.",
              },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                variants={scaleUp}
                whileHover={{ y: -10 }}
                className="glass-card p-8 text-center group hover-lift relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="inline-flex p-4 rounded-2xl bg-primary/10 mb-6 group-hover:bg-primary group-hover:text-[#101318] transition-all duration-300 relative z-10">
                  <feature.icon className="h-8 w-8 text-primary group-hover:text-[#101318]" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground mb-3 relative z-10">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed relative z-10">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Featured Cars Section */}
      <section className="py-24 bg-[#0a0c10] x-padding">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="container mx-auto"
        >
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <motion.h2 variants={fadeInUp} className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
                Featured <span className="text-primary">Vehicles</span>
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-muted-foreground text-lg">
                Discover our handpicked selection of premium automobiles designed to elevate your journey.
              </motion.p>
            </div>
            <motion.div variants={fadeInUp}>
              <Link to="/cars">
                <Button variant="gold-outline" className="gap-2 hidden md:flex hover:bg-primary hover:text-primary-foreground transition-all">
                  View All Cars
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCars.map((car, i) => (
              <motion.div key={car.id} variants={fadeInUp} custom={i}>
                <CarCard car={car} />
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center md:hidden">
            <Link to="/cars">
              <Button variant="gold-outline" size="lg" className="gap-2 w-full">
                View All Cars
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* App Download Section */}
      <section ref={appRef} className="py-20 bg-[#101318] x-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5" />
        <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-primary/20 blur-[150px] rounded-full opacity-30 pointer-events-none" />
        <div className="absolute left-0 bottom-0 w-[500px] h-[500px] bg-blue-500/10 blur-[150px] rounded-full opacity-30 pointer-events-none" />

        <div className="container mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
                <span className="text-sm font-medium">Download the OmniQ App</span>
              </div>
              <h2 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
                Luxury At Your <span className="text-primary">Fingertips</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-10 max-w-xl">
                Book, manage, and unlock your dream car directly from your smartphone. Experience the ultimate convenience with our award-winning mobile application.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-foreground text-background hover:bg-foreground/90 h-14 px-8 rounded-xl flex items-center gap-3">
                  <Apple className="w-6 h-6" />
                  <div className="text-left">
                    <div className="text-xs opacity-70">Download on the</div>
                    <div className="text-sm font-bold">App Store</div>
                  </div>
                </Button>
                <Button className="bg-foreground text-background hover:bg-foreground/90 h-14 px-8 rounded-xl flex items-center gap-3">
                  <Play className="w-5 h-5 fill-current" />
                  <div className="text-left">
                    <div className="text-xs opacity-70">GET IT ON</div>
                    <div className="text-sm font-bold">Google Play</div>
                  </div>
                </Button>
              </div>

              <div className="mt-12 flex items-center gap-6">
                <div className="flex -space-x-4">
                  {[1, 2, 3, 4].map((i) => (
                    <img key={i} src={`https://i.pravatar.cc/100?img=${i + 10}`} alt={`User ${i}`} className="w-12 h-12 rounded-full border-2 border-[#101318]" />
                  ))}
                </div>
                <div>
                  <div className="flex text-primary mb-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground font-medium">Over 50k+ active users</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              style={{ y: appY }}
              className="lg:w-1/2 relative"
            >
              <div className="relative w-[300px] md:w-[400px] mx-auto">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-blue-500/30 rounded-3xl blur-2xl transform rotate-6" />
                <img
                  src="/mobile-screenshot.png"
                  alt="App Preview"
                  className="relative z-10 w-full h-[562.5px] md:h-[750px] object-cover rounded-[2.5rem] border-[8px] border-black/60 shadow-2xl"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-[#0a0c10] x-padding">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              What Our <span className="text-primary">Clients Say</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Michael R.",
                role: "Business Executive",
                content: "The seamless experience from booking to dropping off the car is unmatched. The Porsche 911 was in pristine condition.",
                rating: 5,
                image: "https://i.pravatar.cc/150?img=11"
              },
              {
                name: "Sarah J.",
                role: "Travel Blogger",
                content: "OmniQ made my road trip across the coast absolutely unforgettable. The customer service is truly top-tier.",
                rating: 5,
                image: "https://i.pravatar.cc/150?img=5"
              },
              {
                name: "David T.",
                role: "Event Planner",
                content: "We use OmniQ for all our VIP guests. They are reliable, professional, and their fleet is simply breathtaking.",
                rating: 5,
                image: "https://i.pravatar.cc/150?img=68"
              }
            ].map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 0.6 }}
                className="glass-card p-8 relative group"
              >
                <Quote className="absolute top-6 right-6 w-10 h-10 text-primary/10 group-hover:text-primary/20 transition-colors" />
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, index) => (
                    <Star key={index} className="w-5 h-5 text-primary fill-primary" />
                  ))}
                </div>
                <p className="text-lg text-muted-foreground mb-8 italic">"{testimonial.content}"</p>
                <div className="flex items-center gap-4">
                  <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full border border-white/10" />
                  <div>
                    <h4 className="font-bold text-foreground">{testimonial.name}</h4>
                    <p className="text-sm text-primary">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden x-padding">
        <div className="absolute inset-0">
          <img src="https://res.cloudinary.com/dicfxacdd/image/upload/v1764762315/Untitled_design_2_hdjzpr.jpg"
            alt="CTA Background"
            className="w-full h-full object-cover object-center opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-4 relative z-10"
        >
          <div className="max-w-4xl mx-auto text-center p-12 rounded-3xl border border-gold-dark/25 relative overflow-hidden backdrop-blur-2xl">
            <div className="relative z-10">
              <h2 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-6">
                Ready to Experience <span className="text-primary">Luxury?</span>
              </h2>
              <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
                Join thousands of satisfied customers who trust OmniQ for
                their premium transportation needs.
              </p>
              <Link to="/register">
                <Button variant="gold" size="xl" className="gap-2 group shadow-[0_0_30px_rgba(201,160,80,0.3)]">
                  Get Started Today
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
