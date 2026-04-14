import { useEffect } from "react";
import { Link } from "wouter";
import { BookOpen, Users, HeartHandshake, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function About() {
  useEffect(() => {
    document.title = "About Us | ClearPath Elder Guide";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-secondary text-secondary-foreground py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 mix-blend-overlay pointer-events-none"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <h1 className="font-serif text-4xl md:text-6xl font-bold mb-6">Built by People Who've Been There</h1>
          <p className="text-lg md:text-xl text-secondary-foreground/80 leading-relaxed max-w-3xl mx-auto">
            ClearPath was created to be the guide we wish we had when we were navigating the eldercare system for our own families.
          </p>
        </div>
      </section>

      {/* The Story */}
      <section className="py-20 md:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="prose prose-slate md:prose-lg max-w-none text-foreground">
            <h2 className="font-serif text-3xl font-bold text-secondary mb-6">Our Story</h2>
            <p className="mb-6 leading-relaxed">
              This platform was born from personal experience. Over the past few years, our founder navigated the eldercare system for both parents — dealing with hospital discharges, finding memory care, applying for Medicaid, and navigating the probate court.
            </p>
            <p className="mb-6 leading-relaxed">
              And discovered firsthand how overwhelming, confusing, and isolating that experience can be.
            </p>
            <p className="mb-6 leading-relaxed">
              When you're sitting in a hospital waiting room trying to figure out if Medicare covers a nursing facility, or sitting at a kitchen table trying to decipher a Medicaid application, you don't need a corporate brochure or a directory of ads. You need plain-language guidance, clear next steps, and professionals you can trust.
            </p>
            <p className="text-xl font-serif text-secondary italic border-l-4 border-primary pl-6 my-8 py-2">
              ClearPath was created so no family has to figure this out alone.
            </p>
          </div>
        </div>
      </section>

      {/* Why We're Different */}
      <section className="py-24 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl font-bold text-secondary mb-4">Why We're Different</h2>
            <p className="text-lg text-muted-foreground">We built this to be a true guide, not just a directory.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-background border border-border p-8 rounded-2xl shadow-sm">
              <div className="w-12 h-12 bg-primary/20 text-primary rounded-full flex items-center justify-center mb-6">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-secondary mb-3">No Jargon</h3>
              <p className="text-muted-foreground leading-relaxed">
                We translate complex medical, legal, and financial concepts into plain language that makes sense when you're stressed.
              </p>
            </div>
            
            <div className="bg-background border border-border p-8 rounded-2xl shadow-sm">
              <div className="w-12 h-12 bg-secondary/10 text-secondary rounded-full flex items-center justify-center mb-6">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-secondary mb-3">Vetted Experts</h3>
              <p className="text-muted-foreground leading-relaxed">
                We don't just list anyone. We connect you with professionals who are highly rated, responsive, and specialize in exactly what you need.
              </p>
            </div>

            <div className="bg-background border border-border p-8 rounded-2xl shadow-sm">
              <div className="w-12 h-12 bg-accent/20 text-accent rounded-full flex items-center justify-center mb-6">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-secondary mb-3">Empathetic Approach</h3>
              <p className="text-muted-foreground leading-relaxed">
                We know you might be reading this on a phone in an emergency room. Our design and tone reflect the care you need right now.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-serif text-3xl font-bold text-secondary mb-6">Let us help you find your path.</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/start">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg h-14 px-8 w-full sm:w-auto">
                Find Your Starting Point
              </Button>
            </Link>
            <Link href="/resources">
              <Button size="lg" variant="outline" className="border-secondary text-secondary hover:bg-secondary/5 text-lg h-14 px-8 w-full sm:w-auto">
                Browse Resources
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
