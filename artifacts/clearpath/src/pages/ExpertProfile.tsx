import { useEffect } from "react";
import { useRoute, Link } from "wouter";
import { EXPERTS } from "@/lib/expert-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, ChevronLeft, Calendar, Mail, Clock, ShieldCheck, Languages } from "lucide-react";
import NotFound from "./not-found";

const specialtyColors = {
  "Elder Law": "bg-secondary text-secondary-foreground",
  "Geriatric Care": "bg-accent text-accent-foreground",
  "Medicare": "bg-blue-100 text-blue-800",
  "Financial": "bg-primary text-primary-foreground",
  "Estate Planning": "bg-amber-100 text-amber-800",
  "Probate": "bg-gray-200 text-gray-800"
};

export default function ExpertProfile() {
  const [, params] = useRoute("/experts/:id");
  const id = params?.id;
  const expert = EXPERTS.find(e => e.id === id);

  useEffect(() => {
    if (expert) {
      document.title = `${expert.name} | ClearPath Elder Guide`;
    }
    window.scrollTo(0, 0);
  }, [expert]);

  if (!expert) return <NotFound />;

  // Mock extended data based on what's available
  const extendedBio = `${expert.bio} With years of experience serving families in the New Jersey area, ${expert.name.split(' ')[0]} provides compassionate, clear guidance during difficult transitions. They are committed to plain-language communication and practical solutions that protect their clients' dignity and assets.`;
  
  const areasOfExpertise = [
    expert.specialty,
    "Family Consultations",
    "Crisis Management",
    "Long-term Planning"
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Top Breadcrumb area */}
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
                    <Badge variant="secondary" className={specialtyColors[expert.specialty]}>
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

            {/* Reviews Placeholder */}
            <div className="bg-card rounded-2xl border border-border p-8 shadow-sm">
              <h3 className="font-serif text-2xl font-semibold text-secondary mb-6">Client Experiences</h3>
              <div className="space-y-6">
                <div className="border-b border-border pb-6 last:border-0 last:pb-0">
                  <div className="flex items-center mb-2">
                    <div className="flex text-primary">
                      {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-primary" />)}
                    </div>
                    <span className="ml-2 text-sm text-muted-foreground">Family Member</span>
                  </div>
                  <p className="text-foreground italic">"An absolute lifesaver. When my mother went into the hospital, we had no idea what to do. The guidance was clear, compassionate, and exactly what we needed during a crisis."</p>
                </div>
                <div className="border-b border-border pb-6 last:border-0 last:pb-0">
                  <div className="flex items-center mb-2">
                    <div className="flex text-primary">
                      {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-primary" />)}
                    </div>
                    <span className="ml-2 text-sm text-muted-foreground">Adult Child</span>
                  </div>
                  <p className="text-foreground italic">"Explained complex legal jargon in a way that our whole family could understand. Took so much stress off our shoulders."</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar / Action Area */}
          <div className="space-y-6">
            <div className="bg-card rounded-2xl border border-border p-6 shadow-sm sticky top-24">
              <h3 className="font-serif text-xl font-semibold text-secondary mb-4">Connect</h3>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-muted-foreground mr-3 mt-0.5" />
                  <span className="text-foreground">{expert.location}</span>
                </div>
                <div className="flex items-start">
                  <Clock className="w-5 h-5 text-muted-foreground mr-3 mt-0.5" />
                  <span className="text-foreground">{expert.availability}</span>
                </div>
                <div className="flex items-start">
                  <Languages className="w-5 h-5 text-muted-foreground mr-3 mt-0.5" />
                  <span className="text-foreground">English</span>
                </div>
                <div className="flex items-start">
                  <ShieldCheck className="w-5 h-5 text-muted-foreground mr-3 mt-0.5" />
                  <span className="text-foreground">Verified Credentials</span>
                </div>
              </div>

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
                  onClick={() => window.open(`mailto:info@clearpathelderguide.com?subject=Question for ${expert.name}`)}
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Ask a General Question
                </Button>
              </div>
              <p className="text-xs text-muted-foreground text-center mt-4">
                Consultations are typically 30-45 minutes.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
