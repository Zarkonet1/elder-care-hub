import { useState, useEffect } from "react";
import { Link } from "wouter";
import { ExpertCard } from "@/components/ExpertCard";
import { EXPERTS } from "@/lib/expert-data";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MapPin } from "lucide-react";

export default function Experts() {
  const [searchTerm, setSearchTerm] = useState("");
  const [specialtyFilter, setSpecialtyFilter] = useState("all");
  const [availabilityFilter, setAvailabilityFilter] = useState("all");

  useEffect(() => {
    document.title = "Find an Expert | ClearPath Elder Guide";
    window.scrollTo(0, 0);
  }, []);

  const filteredExperts = EXPERTS.filter(expert => {
    const matchesSearch = expert.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          expert.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = specialtyFilter === "all" || expert.specialty === specialtyFilter;
    const matchesAvailability = availabilityFilter === "all" || expert.availabilityType === availabilityFilter;
    
    return matchesSearch && matchesSpecialty && matchesAvailability;
  });

  const specialties = Array.from(new Set(EXPERTS.map(e => e.specialty)));

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-secondary text-secondary-foreground py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Vetted Eldercare Experts in NJ</h1>
          <p className="text-lg text-secondary-foreground/80 max-w-2xl mx-auto">
            Find trusted attorneys, care managers, and financial planners who specialize in guiding families through complex transitions.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 -mt-8 relative z-10">
        {/* Filter Bar */}
        <div className="bg-card p-4 rounded-xl shadow-md border border-border flex flex-col md:flex-row gap-4 mb-12">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search by name or town..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          
          <div className="w-full md:w-64">
            <Select value={specialtyFilter} onValueChange={setSpecialtyFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Specialties" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Specialties</SelectItem>
                {specialties.map(spec => (
                  <SelectItem key={spec} value={spec}>{spec}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="w-full md:w-64">
            <Select value={availabilityFilter} onValueChange={setAvailabilityFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Any Availability" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any Availability</SelectItem>
                <SelectItem value="quick">Responds quickly (48hrs)</SelectItem>
                <SelectItem value="standard">Available within 2 weeks</SelectItem>
                <SelectItem value="planning">Accepting planning cases</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results */}
        <div className="mb-6 flex justify-between items-center text-muted-foreground text-sm">
          <span>Showing {filteredExperts.length} professionals</span>
        </div>

        {filteredExperts.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-in fade-in duration-500">
            {filteredExperts.map(expert => (
              <ExpertCard key={expert.id} expert={expert} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-card rounded-xl border border-border">
            <h3 className="font-serif text-2xl font-semibold text-secondary mb-2">No professionals found</h3>
            <p className="text-muted-foreground">Try adjusting your filters or search terms.</p>
            <Button 
              variant="outline" 
              className="mt-6"
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
