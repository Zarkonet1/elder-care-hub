import { useEffect } from "react";
import { useRoute, Link } from "wouter";
import { EXPERTS } from "@/lib/expert-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, ChevronLeft, Calendar, Mail, Clock, ShieldCheck, Languages } from "lucide-react";
import NotFound from "./not-found";

const specialtyColors: Record<string, string> = {
  "Elder Law": "bg-secondary text-secondary-foreground",
  "Geriatric Care Management": "bg-accent text-accent-foreground",
  "Medicare": "bg-blue-100 text-blue-800",
  "Financial Planning": "bg-primary text-primary-foreground",
  "Estate Planning": "bg-amber-100 text-amber-800",
  "Probate": "bg-gray-200 text-gray-800"
};

export default function ExpertProfile() {
  const [, params] = useRoute("/experts/:id");
  const id = params?.id;
  const expert = EXPERTS.find(e => e.id === id);

  useEffect(() => {
    if (expert) {
      document.title = `${expert.name} | ClearPath Navigator`;
    }
    window.scrollTo(0, 0);
  }, [expert]);

  if (!expert) return <NotFound />;

  const extendedBio = `${expert.bio} With years of experience serving families in the New Jersey area, ${expert.name.split(' ')[0]} provides compassionate, clear guidance during difficult transitions. They are committed to plain-language communication and practical solutions that protect their clients' dignity and assets.`;

  const areasOfExpertise = [
    expert.specialty,
    "Family Consultations",
    "Crisis Management",
    "Long-term Planning"
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Breadcrumb */}
      <div className="bg-secondary/5 border-b border-border py-4">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <Link href="/experts">
            <Button variant="link" className="text-muted-foreground hover:text-secondary p-0 h-auto">
              <ChevronLeft className="w-4 h-4 mr-1" /> Back to Directory
            </Button>
          </Link>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8">

          {/* Main Info */}
          <div className="md:col-span-2 space-y-8">
            <div className="bg-card rounded-2xl border border-border p-8 shadow-sm">
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
                <div>
                  <h1 className="font-serif text-3xl sm:text-4xl font-bold text-secondary mb-2">{expert.name}</h1>
                  <p className="text-xl text-muted-foreground mb-4">{expert.title}</p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className={specialtyColors[expert.specialty] ?? "bg-gray-100 text-gray-800"}>
                      {expert.specialty}
                    </Badge>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      Accepting New Clients
                    </Badge>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <div className="flex items-center text-xl font-bold text-secondary mb-1">
                    <Star className="w-6 h-6 text-primary fill-primary mr-1" />
                    {expert.rating}
                  </div>
                  <span className="text-sm text-muted-foreground">Vetted Network Member</span>
                </div>
              </div>

              <div className="prose prose-slate max-w-none">
                <h3 className="font-serif text-xl font-semibold text-secondary">About</h3>
                <p className="text-lg text-foreground leading-relaxed">
                  {extendedBio}
                </p>
              </div>

              <div className="mt-8 pt-8 border-t border-border">
                <h3 className="font-serif text-xl font-semibold text-secondary mb-4">Areas of Expertise</h3>
                <div className="flex flex-wrap gap-2">
                  {areasOfExpertise.map(area => (
                    <span key={area} className="bg-secondary/5 border border-secondary/10 text-secondary px-3 py-1 rounded-full text-sm">
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-card rounded-2xl border border-border p-8 shadow-sm">
              <h3 className="font-serif text-2xl font-semibold text-secondary mb-6">What Families Are Saying</h3>
              <p className="text-muted-foreground leading-relaxed italic">
                Reviews from verified clients will appear here. Our experts are evaluated on expertise, communication, and responsiveness.
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-card rounded-2xl border border-border p-6 shadow-sm sticky top-24">
              <h3 className="font-serif text-xl font-semibold text-secondary mb-4">Connect</h3>

              <div className="space-y-4 mb-6">
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-muted-foreground mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">{expert.location}</span>
                </div>
                <div className="flex items-start">
                  <Clock className="w-5 h-5 text-muted-foreground mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground mb-0.5">Typical Response Time</p>
                    <span className="text-foreground">{expert.availability}</span>
                  </div>
                </div>
                <div className="flex items-start">
                  <Languages className="w-5 h-5 text-muted-foreground mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground mb-0.5">Languages Spoken</p>
                    <span className="text-foreground">English</span>
                  </div>
                </div>
                <div className="flex items-start">
                  <ShieldCheck className="w-5 h-5 text-muted-foreground mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground mb-0.5">Accepting New Clients</p>
                    <span className="text-foreground text-green-700 font-medium">Yes</span>
                  </div>
                </div>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                Ready to connect? Book a consultation directly — or send a general question and expect a response within the timeframe shown on this profile.
              </p>

              <div className="space-y-3">
                <Button
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-12 text-base"
                  onClick={() => window.open('https://calendly.com', '_blank')}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Book a Consultation
                </Button>
                <Button
                  variant="outline"
                  className="w-full h-12 text-base border-secondary text-secondary hover:bg-secondary/5"
                  onClick={() => window.open(`mailto:info@clearpath-navigator.com?subject=General Question via ClearPath Navigator — ${expert.name}`)}
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Ask a General Question
                </Button>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center border-t border-border pt-10">
          <p className="text-muted-foreground mb-2">Not sure this is the right expert for your situation?</p>
          <Link href="/start" className="text-primary font-medium hover:underline">
            Take our 5-minute assessment →
          </Link>
        </div>
      </div>
    </div>
  );
}
