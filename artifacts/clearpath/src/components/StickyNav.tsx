import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";

export function StickyNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/start", label: "Start Here" },
    { href: "/resources", label: "Resources" },
    { href: "/checklist", label: "Crisis Checklist" },
    { href: "/experts", label: "Find an Expert" },
    { href: "/about", label: "About" },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground group-hover:scale-105 transition-transform">
              <Leaf className="w-4 h-4" />
            </div>
            <span className="font-serif font-bold text-xl text-secondary">ClearPath</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  location === link.href ? "text-primary" : "text-secondary hover:text-primary"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Button 
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={() => {
                if (location !== "/") {
                  window.location.href = "/#checklist";
                } else {
                  document.getElementById("checklist")?.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              Get the Free Checklist
            </Button>
          </nav>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden p-2 text-secondary"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Nav Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-background md:hidden pt-16">
          <nav className="flex flex-col p-6 space-y-4">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`text-lg font-medium p-2 rounded-md ${
                  location === link.href ? "bg-secondary/5 text-primary" : "text-secondary"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-border">
              <Button 
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={() => {
                  setIsOpen(false);
                  if (location !== "/") {
                    window.location.href = "/#checklist";
                  } else {
                    document.getElementById("checklist")?.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                Get the Free Checklist
              </Button>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
