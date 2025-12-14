import { Link } from "react-router-dom";
import { Mail, Instagram, Twitter, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="container py-12 md:py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <span className="text-xl font-bold">
                DEMAND<span className="text-primary-foreground/80">inss</span>
              </span>
            </Link>
            <p className="text-sm text-background/70">
              Curated gadgets for modern living. Smart solutions that make life easier.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-background/70 hover:text-background transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-background/70 hover:text-background transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-background/70 hover:text-background transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-semibold mb-4">Shop</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li><Link to="/collections" className="hover:text-background transition-colors">All Products</Link></li>
              <li><Link to="/collections?category=wellness" className="hover:text-background transition-colors">Wellness</Link></li>
              <li><Link to="/collections?category=home" className="hover:text-background transition-colors">Home Essentials</Link></li>
              <li><Link to="/collections?sale=true" className="hover:text-background transition-colors">Sale</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li><a href="#" className="hover:text-background transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Shipping Info</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Returns & Exchanges</a></li>
              <li><a href="#" className="hover:text-background transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold mb-4">Stay Updated</h4>
            <p className="text-sm text-background/70 mb-4">
              Get exclusive deals and product updates.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2 rounded-lg bg-background/10 border border-background/20 text-background placeholder:text-background/50 text-sm focus:outline-none focus:border-background/40"
              />
              <Button size="sm" className="bg-background text-foreground hover:bg-background/90">
                <Mail className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-background/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-background/60">
            © 2024 DEMANDinss. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-background/60">
            <a href="#" className="hover:text-background transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-background transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
