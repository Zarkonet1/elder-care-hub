import { useEffect } from "react";
import { Link } from "wouter";
import { BookOpen, Clock, HeartHandshake, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const DIFFERENTIATORS = [
  {
    icon: BookOpen,
    iconBg: "bg-primary/15 text-primary",
    title: "No Jargon. Ever.",
    body: "Medicare, Medicaid, probate, power of attorney — we explain every term in plain English, every time. Because you shouldn't need a law degree to understand your options.",
  },
  {
    icon: Clock,
    iconBg: "bg-secondary/10 text-secondary",
    title: "Experts Who Are Actually Available",
    body: "Our network isn't just credentialed — it's responsive. Every expert commits to availability standards because a brilliant attorney booked six months out doesn't help a family in crisis today.",
  },
  {
    icon: HeartHandshake,
    iconBg: "bg-accent/20 text-accent",
    title: "Built By People Who've Been There",
    body: "This platform was created by someone who navigated the eldercare system for two parents in real time. That experience is in every piece of content, every resource, and every decision about how this platform works.",
  },
];

export default function About() {
  useEffect(() => {
    document.title = "About | ClearPath Elder Guide";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-secondary text-secondary-foreground py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 mix-blend-overlay pointer-events-none"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <h1 className="font-serif text-4xl md:text-6xl font-bold mb-6">Why We Built This</h1>
          <p className="text-lg md:text-xl text-secondary-foreground/80 leading-relaxed max-w-3xl mx-auto">
            This platform came out of personal experience — not a business school case study.
          </p>
        </div>
      </section>

      {/* Founder's Story */}
      <section className="py-20 md:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="font-serif text-3xl font-bold text-secondary mb-8">Why We Built This</h2>
          <div className="space-y-6 text-foreground leading-relaxed text-lg">
            <p>
              Over the past few years, our founder navigated the eldercare system for both parents within the same
              period. Two different situations. Two different sets of decisions. The same overwhelming feeling at
              every turn: <em>where do I even start?</em>
            </p>
            <p>
              The information existed — somewhere. But it was scattered across government websites, legal
              disclaimers, insurance fine print, and well-meaning but confusing advice from people who had been
              through pieces of it. Nothing brought it together in a way that actually helped someone in the middle
              of a crisis make sense of what was happening and what to do next.
            </p>
            <p>
              The professionals who could help were excellent — but finding the right one, understanding what
              questions to ask, and knowing which type of expert you needed for which problem? That knowledge
              wasn't available anywhere.
            </p>
            <p className="font-serif text-xl text-secondary italic border-l-4 border-primary pl-6 py-2 my-8">
              So we built the resource we wished had existed.
            </p>
            <p>
              ClearPath Elder Guide is for every family that has ever sat in a hospital waiting room with a phone
              in hand, searching for answers and finding only confusion. It's for the adult child trying to do
              right by their parent. For the aging individual who wants to maintain control over their own story.
              For the planner who knows that waiting is the one thing they can't afford to do.
            </p>
            <p>
              You deserve clear answers, real guidance, and access to people who can actually help. That's what
              we're here for.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 bg-secondary text-secondary-foreground">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-serif text-3xl font-bold mb-6">Our Mission</h2>
          <p className="text-xl md:text-2xl leading-relaxed text-secondary-foreground/90 font-serif italic">
            "To make one of life's most difficult transitions a little less overwhelming — by giving families the
            clear information, practical tools, and trusted professional connections they need to move forward
            with confidence."
          </p>
        </div>
      </section>

      {/* Why We're Different */}
      <section className="py-24 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl font-bold text-secondary mb-4">Why We're Different</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {DIFFERENTIATORS.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="bg-background border border-border p-8 rounded-2xl shadow-sm">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center mb-6 ${item.iconBg}`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-secondary mb-3">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Legal Disclaimer Panel */}
      <section className="py-16 bg-amber-50 border-y border-amber-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="font-serif text-2xl font-bold text-secondary mb-4">A Note on Our Content</h2>
          <p className="text-foreground leading-relaxed">
            ClearPath Elder Guide provides general educational information only. Nothing on this website constitutes
            legal, financial, or medical advice. Every family's situation is unique — the information here is a
            starting point, not a substitute for guidance from a qualified professional. Always consult a licensed
            attorney, financial advisor, or healthcare provider for advice specific to your circumstances.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-serif text-3xl font-bold text-secondary mb-6">Let us help you find your path.</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/start">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg h-14 px-8 w-full sm:w-auto"
              >
                Find Your Starting Point
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/resources">
              <Button
                size="lg"
                variant="outline"
                className="border-secondary text-secondary hover:bg-secondary/5 text-lg h-14 px-8 w-full sm:w-auto"
              >
                Browse Resources
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
