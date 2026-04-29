import React from "react";
import { motion, type Variants } from "framer-motion";
import { Shield, Award, Users, MapPin, Target, Sparkles } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

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

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-background overflow-hidden selection:bg-primary/30 selection:text-primary">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 x-padding overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute inset-0 bg-[#0a0c10]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/20 blur-[120px] rounded-full opacity-30 pointer-events-none" />
        
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="relative z-10 max-w-5xl mx-auto text-center"
        >
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 backdrop-blur-md">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm text-primary font-medium">
              Redefining Luxury Travel
            </span>
          </motion.div>
          <motion.h1
            variants={fadeInUp}
            className="font-display text-4xl md:text-7xl font-bold text-foreground mb-6 leading-tight"
          >
            Elevating Your Journey <br />
            <span className="text-gradient-gold">Beyond Expectations</span>
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            OmniQ was founded with a singular vision: to provide an unmatched automotive experience. We combine the world's most prestigious vehicles with white-glove service to create unforgettable moments.
          </motion.p>
        </motion.div>
      </section>

      {/* Story Section */}
      <section className="py-24 bg-[#101318] relative x-padding">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 to-transparent rounded-[2.5rem] blur-2xl opacity-50" />
              <img
                src="https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=2070&auto=format&fit=crop"
                alt="Our Fleet"
                className="relative rounded-[2rem] border border-white/10 shadow-2xl w-full h-[600px] object-cover"
              />
              
              {/* Floating Stat Card */}
              <motion.div 
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="absolute -bottom-8 -right-8 glass-card p-6 rounded-2xl w-64 shadow-2xl"
              >
                <div className="text-4xl font-display font-bold text-primary mb-2">10+</div>
                <div className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Years of Excellence</div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-6">
                Our <span className="text-primary">Story</span>
              </h2>
              <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
                <p>
                  What started as a small collection of luxury vehicles in Dubai has evolved into a premier automotive lifestyle brand. At OmniQ, we don't just rent cars; we curate experiences.
                </p>
                <p>
                  Every vehicle in our fleet is meticulously selected, maintained to pristine standards, and prepared with an obsessive attention to detail. We believe that the journey should be as magnificent as the destination itself.
                </p>
                <p>
                  Our dedicated concierge team operates around the clock, ensuring that your specific preferences are met with precision. From airport transfers to cross-country grand tours, we orchestrate perfection.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-8 mt-12 pt-12 border-t border-white/5">
                <div>
                  <h4 className="text-4xl font-display font-bold text-foreground mb-2">50+</h4>
                  <p className="text-sm text-muted-foreground uppercase tracking-widest font-medium">Premium Cars</p>
                </div>
                <div>
                  <h4 className="text-4xl font-display font-bold text-foreground mb-2">10k+</h4>
                  <p className="text-sm text-muted-foreground uppercase tracking-widest font-medium">Happy Clients</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-[#0a0c10] x-padding">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="container mx-auto"
        >
          <div className="text-center mb-16">
            <motion.h2 variants={fadeInUp} className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
              Core <span className="text-primary">Values</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-muted-foreground max-w-2xl mx-auto text-lg">
              The principles that drive our commitment to excellence.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Uncompromising Quality",
                description: "From our fleet selection to our customer interactions, we maintain the highest standards of quality and presentation."
              },
              {
                icon: Target,
                title: "Absolute Precision",
                description: "We understand that time is your most valuable asset. Our services are executed with flawless timing and reliability."
              },
              {
                icon: Users,
                title: "Client-Centricity",
                description: "Your desires dictate our actions. We offer highly personalized services tailored to your exact specifications."
              }
            ].map((value, i) => (
              <motion.div
                key={i}
                variants={scaleUp}
                whileHover={{ y: -10 }}
                className="glass-card p-8 group overflow-hidden relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="inline-flex p-4 rounded-2xl bg-primary/10 mb-6 group-hover:bg-primary group-hover:text-[#101318] transition-all duration-300">
                  <value.icon className="h-8 w-8 text-primary group-hover:text-[#101318]" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground mb-3">
                  {value.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Team/Locations Section */}
      <section className="py-24 bg-[#101318] x-padding">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-12 md:p-20 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
            <MapPin className="h-16 w-16 text-primary mx-auto mb-8 opacity-80" />
            <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-6">
              Global Presence, <br /> Local Expertise
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
              Headquartered in the vibrant heart of Dubai, our operations span across prime locations, ensuring you have access to extraordinary vehicles wherever your journey takes you.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
               <span className="px-6 py-3 rounded-full bg-secondary text-foreground text-sm font-medium tracking-wide uppercase">Dubai</span>
               <span className="px-6 py-3 rounded-full bg-secondary text-foreground text-sm font-medium tracking-wide uppercase opacity-50">London (Coming Soon)</span>
               <span className="px-6 py-3 rounded-full bg-secondary text-foreground text-sm font-medium tracking-wide uppercase opacity-50">Miami (Coming Soon)</span>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
