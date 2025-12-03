import React from "react";
import { Link } from "react-router-dom";
import {
  Car,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-card x-padding">
      <div className="pt-16 pb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-1.5 group">
              <div className="relative">
                <img
                  src="https://res.cloudinary.com/dicfxacdd/image/upload/v1764765485/Red_and_Black_Modern_Blockchain_Technology_Logo_Display_ylfhxm.png"
                  alt="logo"
                  className=" h-7 w-auto"
                />
              </div>
              <span className="font-display text-2xl font-bold text-foreground">
                Omni<span className="text-primary">Q</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Experience the pinnacle of automotive luxury. Premium vehicles for
              discerning clients who demand excellence.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="p-2 rounded-lg bg-secondary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {["Our Fleet", "How It Works", "Pricing", "FAQs"].map((link) => (
                <li key={link}>
                  <Link
                    to="/cars"
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-6">Support</h4>
            <ul className="space-y-3">
              {[
                "Contact Us",
                "Terms of Service",
                "Privacy Policy",
                "Cancellation Policy",
              ].map((link) => (
                <li key={link}>
                  <Link
                    to="/contact"
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5" />
                <span className="text-muted-foreground text-sm">
                  08 Tootpara Central Rd,
                  <br />
                  Khulna 9100, Bangladesh
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary" />
                <span className="text-muted-foreground text-sm">
                  +880 1234 567890
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary" />
                <span className="text-muted-foreground text-sm">
                  syednoor058@gmail.com
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row md:items-center justify-between gap-2">
          <p className="text-muted-foreground text-sm">
            © 2025 Syed Shaeduzzaman Noor. All rights reserved.
          </p>
          <p className="text-muted-foreground text-sm">
            Crafted with excellence for those who expect nothing less.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
