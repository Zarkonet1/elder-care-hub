import { useState, useEffect } from "react";
import { Link } from "wouter";
import { ExpertCard } from "@/components/ExpertCard";
import { EXPERTS } from "@/lib/expert-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, ShieldCheck } from "lucide-react";

const AVAILABILITY_LEGEND = [
  {
    dot: "bg-green-500",
    label: "Responds Within 48 Hours",
    description: "For families who need timely guidance",
    value: "quick",
  },
  {
    dot: "bg-yellow-400",
    label: "Available Within 2 Weeks",
    description: "For planning and non-urgent matters",
    value: "standard",
  },
  {
    dot: "bg-blue-500",
    label: "Complex & Long-Term Cases",
    description: "Specialists for involved situations",
    value: "planning",
  },
];

export default function Experts() {
  const [searchTerm, setSearchTerm] = useState("");
  const [specialtyFilter, setSpecialtyFilter] = useState("all");
  const [availabilityFilter, setAvailabilityFilter] = useState("all");

  useEffect(() => {
    document.title = "Find an Expert | ClearPath Navigator";
    window.scrollTo(0, 0);
  }, []);

  const filteredExperts = EXPERTS.filter((expert) => {
    const matchesSearch =
      expert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expert.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = specialtyFilter === "all" || expert.specialty === specialtyFilter;
    const matchesAvailability = availabilityFilter === "all" || expert.availabilityType === availabilityFilter;
    return matchesSearch && matchesSpecialty && matchesAvailability;
  });

  const specialties = Array.from(new Set(EXPERTS.map((e) => e.specialty)));

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-secondary text-secondary-foreground py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Find the Right Expert</h1>
          <p className="text-lg text-secondary-foreground/80 max-w-2xl mx-auto leading-relaxed">
            Our network of vetted professionals covers every aspect of eldercare — from legal and financial planning to
            care management and Medicare guidance. Every expert is selected for their expertise, their communication,
            and their availability to actually help you.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Vetting Statement */}
        <div className="bg-secondary/5 border border-secondary/15 rounded-2xl p-6 md:p-8 mb-8 flex gap-4 items-start">
          <ShieldCheck className="w-7 h-7 text-accent flex-shrink-0 mt-0.5" />
          <p className="text-secondary leading-relaxed">
            <span className="font-semibold">Every expert in our network has been reviewed</span> for credentials,
            experience, and — critically — their commitment to responsiveness. Because an expert who can't see you
            for six months isn't the right expert for most families facing a crisis.
          </p>
        </div>

        {/* Availability Legend */}
        <div className="mb-8">
          <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
            Availability Key
          </p>
          <div className="flex flex-wrap gap-4">
            {AVAILABILITY_LEGEND.map((tier) => (
              <button
                key={tier.value}
                onClick={() =>
                  setAvailabilityFilter((prev) => (prev === tier.value ? "all" : tier.value))
                }
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-lg border text-sm transition-all cursor-pointer ${
                  availabilityFilter === tier.value
                    ? "border-secondary bg-secondary/10"
                    : "border-border bg-card hover:bg-secondary/5"
                }`}
                aria-pressed={availabilityFilter === tier.value}
              >
                <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${tier.dot}`}></span>
                <span className="font-medium text-secondary">{tier.label}</span>
                <span className="text-muted-foreground hidden sm:inline">— {tier.description}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Directory Intro Note */}
        <div className="bg-primary/8 border border-primary/20 rounded-xl px-5 py-4 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p className="text-secondary leading-relaxed text-sm">
            <span className="font-semibold">Not sure which type of expert you need?</span> Take our 5-minute
            assessment and we'll recommend the right match for your situation.
          </p>
          <Link href="/start" className="flex-shrink-0">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 text-sm whitespace-nowrap">
              Take the Assessment
            </Button>
          </Link>
        </div>

        {/* Filter Bar */}
        <div className="bg-card p-4 rounded-xl shadow-sm border border-border flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or town..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
              aria-label="Search experts"
            />
          </div>

          <div className="w-full md:w-56">
            <Select value={specialtyFilter} onValueChange={setSpecialtyFilter}>
              <SelectTrigger aria-label="Filter by specialty">
                <SelectValue placeholder="All Specialties" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Specialties</SelectItem>
                {specialties.map((spec) => (
                  <SelectItem key={spec} value={spec}>
                    {spec}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="w-full md:w-56">
            <Select value={availabilityFilter} onValueChange={setAvailabilityFilter}>
              <SelectTrigger aria-label="Filter by availability">
                <SelectValue placeholder="Any Availability" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any Availability</SelectItem>
                <SelectItem value="quick">Responds Within 48 Hours</SelectItem>
                <SelectItem value="standard">Available Within 2 Weeks</SelectItem>
                <SelectItem value="planning">Complex &amp; Long-Term Cases</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-5 text-sm text-muted-foreground">
          Showing {filteredExperts.length} professional{filteredExperts.length !== 1 ? "s" : ""}
        </div>

        {/* Expert Grid */}
        {filteredExperts.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-in fade-in duration-500">
            {filteredExperts.map((expert) => (
              <ExpertCard key={expert.id} expert={expert} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-card rounded-xl border border-border">
            <h3 className="font-serif text-2xl font-semibold text-secondary mb-2">No professionals found</h3>
            <p className="text-muted-foreground mb-6">Try adjusting your filters or search terms.</p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("");
                setSpecialtyFilter("all");
                setAvailabilityFilter("all");
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
