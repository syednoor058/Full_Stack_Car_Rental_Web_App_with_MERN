import React, { useState } from "react";
import { motion, type Variants } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const Contact: React.FC = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Message Sent Successfully",
        description: "Our concierge team will get back to you within 24 hours.",
      });
      (e.target as HTMLFormElement).reset();
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background overflow-hidden selection:bg-primary/30 selection:text-primary">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-24 x-padding overflow-hidden bg-[#0a0c10]">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/20 blur-[150px] rounded-full opacity-40 pointer-events-none" />
        
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="relative z-10 max-w-4xl mx-auto text-center"
        >
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 backdrop-blur-md">
            <MessageSquare className="h-4 w-4 text-primary" />
            <span className="text-sm text-primary font-medium">
              We're Here for You
            </span>
          </motion.div>
          <motion.h1
            variants={fadeInUp}
            className="font-display text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight"
          >
            Get In <span className="text-primary">Touch</span>
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Whether you have a specific request, need assistance with a booking, or simply want to inquire about our fleet, our dedicated team is at your service.
          </motion.p>
        </motion.div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-[#101318] relative x-padding z-10">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row gap-16 max-w-6xl mx-auto">
            
            {/* Contact Information */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="lg:w-1/3 space-y-10"
            >
              <div>
                <h3 className="font-display text-2xl font-bold text-foreground mb-6">Contact Details</h3>
                <p className="text-muted-foreground mb-8">
                  Reach out to us through any of the channels below. We assure prompt and professional responses.
                </p>
              </div>

              <div className="space-y-6">
                {[
                  {
                    icon: MapPin,
                    title: "Head Office",
                    details: ["Empire Heights, Tower A,", "Business Bay, Dubai, UAE"]
                  },
                  {
                    icon: Phone,
                    title: "Phone Support",
                    details: ["+971 58 956 4851", "Mon-Sun, 24/7 Available"]
                  },
                  {
                    icon: Mail,
                    title: "Email Address",
                    details: ["support.omniq@gmail.com", "concierge@omniq.com"]
                  },
                  {
                    icon: Clock,
                    title: "Working Hours",
                    details: ["24 Hours a day", "7 Days a week"]
                  }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 group">
                    <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors duration-300">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-foreground font-semibold mb-1">{item.title}</h4>
                      {item.details.map((detail, idx) => (
                        <p key={idx} className="text-sm text-muted-foreground">{detail}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="lg:w-2/3"
            >
              <div className="glass-card p-8 md:p-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] pointer-events-none" />
                <h3 className="font-display text-3xl font-bold text-foreground mb-2">Send us a Message</h3>
                <p className="text-muted-foreground mb-8">Fill out the form below and we will contact you shortly.</p>
                
                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" required placeholder="John" className="bg-background/50 border-white/10 focus:border-primary" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" required placeholder="Doe" className="bg-background/50 border-white/10 focus:border-primary" />
                    </div>
                  </div>
                  
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" required placeholder="john@example.com" className="bg-background/50 border-white/10 focus:border-primary" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" type="tel" placeholder="+971 50 123 4567" className="bg-background/50 border-white/10 focus:border-primary" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" required placeholder="How can we help you?" className="bg-background/50 border-white/10 focus:border-primary" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea 
                      id="message" 
                      required 
                      placeholder="Please provide any details relevant to your inquiry..." 
                      className="min-h-[150px] bg-background/50 border-white/10 focus:border-primary resize-none"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    variant="gold" 
                    size="xl" 
                    className="w-full sm:w-auto gap-2 group shadow-[0_0_20px_rgba(201,160,80,0.2)]"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                    {!isSubmitting && <Send className="h-4 w-4 group-hover:translate-x-1 transition-transform" />}
                  </Button>
                </form>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="h-[400px] w-full bg-[#0a0c10] relative filter grayscale hover:grayscale-0 transition-all duration-1000">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.1785507519967!2d55.27138381500908!3d25.18844888389771!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f682cfb8c5a4d%3A0xc07a4bd89280a97!2sEmpire%20Heights!5e0!3m2!1sen!2sbd!4v1655000000000!5m2!1sen!2sbd" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          title="Office Location"
          className="absolute inset-0"
        />
        {/* Overlay to prevent aggressive mouse wheel zooming and maintain dark theme feel initially */}
        <div className="absolute inset-0 bg-[#0a0c10]/40 pointer-events-none" />
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
