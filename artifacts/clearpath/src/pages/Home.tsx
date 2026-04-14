import { useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ScenarioCard } from "@/components/ScenarioCard";
import { EmailCapture } from "@/components/EmailCapture";
import { Compass, Users, ArrowRight, ShieldCheck, BookOpen, MapPin, HeartHandshake } from "lucide-react";

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
          <p className="text-lg md:text-xl text-secondary/80 max-w-2xl mb-10 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-150 leading-relaxed">
            When a parent needs care, a loved one passes, or you're trying to plan ahead — the system is confusing, the information is overwhelming, and the stakes are high. We cut through all of it so you know exactly where to start.
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
              <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
              Serving NJ &amp; Tri-State Families
            </div>
            <div className="flex items-center justify-center gap-2 md:border-l border-secondary-foreground/20">
              <ShieldCheck className="w-4 h-4 text-primary flex-shrink-0" />
              Vetted Expert Network
            </div>
            <div className="flex items-center justify-center gap-2 md:border-l border-secondary-foreground/20">
              <BookOpen className="w-4 h-4 text-primary flex-shrink-0" />
              Plain-Language Guidance Only
            </div>
            <div className="flex items-center justify-center gap-2 md:border-l border-secondary-foreground/20">
              <HeartHandshake className="w-4 h-4 text-primary flex-shrink-0" />
              Built By People Who've Been There
            </div>
          </div>
        </div>
      </section>

      {/* How We Help */}
      <section className="py-24 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-secondary mb-4">How We Help</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center flex flex-col items-center">
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mb-6">
                <Compass className="w-8 h-8 text-accent" />
              </div>
              <h3 className="font-serif text-2xl font-semibold text-secondary mb-3">Understand What's Happening</h3>
              <p className="text-muted-foreground leading-relaxed">
                We translate Medicare, Medicaid, elder law, and estate planning into plain English. No jargon. No assumptions. Just clear answers to the questions you're actually asking.
              </p>
            </div>
            <div className="text-center flex flex-col items-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-6">
                <ArrowRight className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-serif text-2xl font-semibold text-secondary mb-3">Know What To Do Next</h3>
              <p className="text-muted-foreground leading-relaxed">
                Step-by-step guidance built around your specific situation — not generic checklists. Whether you're in a crisis today or planning for tomorrow, we show you the path forward.
              </p>
            </div>
            <div className="text-center flex flex-col items-center">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="font-serif text-2xl font-semibold text-secondary mb-3">Connect With the Right Expert</h3>
              <p className="text-muted-foreground leading-relaxed">
                When you need more than general guidance, our vetted network of elder law attorneys, care managers, Medicare specialists, and estate planners is ready to help — with real availability and real responsiveness.
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
              Start here. Tell us what's happening and we'll show you exactly where to begin.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <ScenarioCard
              title="I'm In Crisis Right Now"
              subtitle="Parent hospitalized or urgent care needed"
              body="Something happened and you need answers fast. Start here for immediate next steps."
              icon="🚨"
              href="/resources/crisis"
            />
            <ScenarioCard
              title="We Need Ongoing Care"
              subtitle="Managing long-term caregiving decisions"
              body="You're past the immediate crisis but facing decisions about care, costs, and family coordination."
              icon="👴"
              href="/resources/ongoing-care"
            />
            <ScenarioCard
              title="Understanding Medicare & Medicaid"
              subtitle="Coverage, benefits, and how to access them"
              body="The most confusing part of eldercare — decoded into plain language with NJ-specific guidance."
              icon="📋"
              href="/resources/medicare-medicaid"
            />
            <ScenarioCard
              title="Getting Affairs in Order"
              subtitle="Documents, planning, and peace of mind"
              body="The five things every family needs in place — and how to get started even if nothing exists yet."
              icon="📝"
              href="/resources/estate-planning"
            />
            <ScenarioCard
              title="A Loved One Just Passed"
              subtitle="What to do in the days and weeks ahead"
              body="Practical guidance for the steps that can't wait — and support for the ones that can."
              icon="⚖️"
              href="/resources/after-passing"
            />
            <ScenarioCard
              title="I Want to Plan Ahead"
              subtitle="Proactive planning before a crisis arrives"
              body="The best time to get organized is before you need to. Here's where to begin."
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
