import { useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ScenarioCard } from "@/components/ScenarioCard";
import { EmailCapture } from "@/components/EmailCapture";
import { Compass, Users, ArrowRight, ShieldCheck, HeartHandshake, BookOpen, Scale } from "lucide-react";

export default function Home() {
  useEffect(() => {
    document.title = "ClearPath Elder Guide | You Don't Have to Figure This Out Alone";
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-background overflow-hidden border-b border-border/50">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 mix-blend-overlay pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/5 to-transparent pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative z-10 flex flex-col items-center text-center">
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-secondary max-w-4xl tracking-tight leading-tight mb-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            You Don't Have to Figure This Out Alone
          </h1>
          <p className="text-lg md:text-xl text-secondary/80 max-w-2xl mb-10 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-150">
            Clear guidance for families navigating eldercare, Medicare, estate planning, and life's hardest transitions — whenever you need it most.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
            <Link href="/start">
              <Button size="lg" className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 text-lg h-14 px-8">
                Find Your Starting Point
              </Button>
            </Link>
            <Link href="/resources">
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-secondary text-secondary hover:bg-secondary/5 text-lg h-14 px-8">
                Browse Resources
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Strip */}
      <section className="bg-secondary text-secondary-foreground py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-sm md:text-base font-medium">
            <div className="flex items-center justify-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              Serving NJ & Tri-State Families
            </div>
            <div className="flex items-center justify-center gap-2 border-l border-secondary-foreground/20">
              <ShieldCheck className="w-4 h-4 text-primary" />
              Vetted Expert Network
            </div>
            <div className="flex items-center justify-center gap-2 border-l border-secondary-foreground/20">
              <BookOpen className="w-4 h-4 text-primary" />
              Plain-Language Guidance
            </div>
            <div className="flex items-center justify-center gap-2 border-l border-secondary-foreground/20">
              <Scale className="w-4 h-4 text-primary" />
              Clear Direction, No Jargon
            </div>
          </div>
        </div>
      </section>

      {/* How We Help */}
      <section className="py-24 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-secondary mb-4">How We Help</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We break down overwhelming situations into clear, manageable steps.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center flex flex-col items-center">
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mb-6">
                <Compass className="w-8 h-8 text-accent" />
              </div>
              <h3 className="font-serif text-2xl font-semibold text-secondary mb-3">Understand Your Options</h3>
              <p className="text-muted-foreground">
                We translate complex medical, legal, and financial jargon into plain language so you know exactly what choices you have.
              </p>
            </div>
            <div className="text-center flex flex-col items-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-serif text-2xl font-semibold text-secondary mb-3">Find the Right Expert</h3>
              <p className="text-muted-foreground">
                Connect with vetted elder law attorneys, care managers, and specialists who understand your specific situation.
              </p>
            </div>
            <div className="text-center flex flex-col items-center">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mb-6">
                <ArrowRight className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="font-serif text-2xl font-semibold text-secondary mb-3">Take the Next Step</h3>
              <p className="text-muted-foreground">
                Get actionable checklists and clear direction on what you need to do today, tomorrow, and next week.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Where Are You Right Now? */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-secondary mb-4">Where Are You Right Now?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Select the situation that best matches yours to find tailored guidance.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <ScenarioCard 
              title="I'm In Crisis Right Now"
              description="Parent hospitalized or urgent care needed"
              icon="🚨"
              href="/resources/crisis"
            />
            <ScenarioCard 
              title="We Need Ongoing Care"
              description="Managing long-term caregiving decisions"
              icon="👴"
              href="/resources/ongoing-care"
            />
            <ScenarioCard 
              title="Medicare & Medicaid"
              description="Understanding coverage and benefits"
              icon="📋"
              href="/resources/medicare-medicaid"
            />
            <ScenarioCard 
              title="Estate Planning"
              description="Getting important documents in order"
              icon="📝"
              href="/resources/estate-planning"
            />
            <ScenarioCard 
              title="After a Loved One Passes"
              description="Navigating next steps after a loss"
              icon="⚖️"
              href="/resources/after-passing"
            />
            <ScenarioCard 
              title="I Want to Plan Ahead"
              description="Proactive planning before a crisis"
              icon="🗺️"
              href="/resources/plan-ahead"
            />
          </div>
        </div>
      </section>

      {/* Email Capture */}
      <section id="checklist" className="py-24 bg-secondary/5 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <EmailCapture />
        </div>
      </section>
    </div>
  );
}

import { MapPin } from "lucide-react";
