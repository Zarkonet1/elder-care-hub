import { Link } from "wouter";
import { Star, MapPin, Clock, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export interface Expert {
  id: string;
  name: string;
  title: string;
  specialty: "Elder Law" | "Geriatric Care" | "Medicare" | "Financial" | "Estate Planning" | "Probate";
  location: string;
  availability: string;
  availabilityType: "quick" | "standard" | "planning";
  rating: number;
  bio: string;
}

const specialtyColors = {
  "Elder Law": "bg-secondary text-secondary-foreground",
  "Geriatric Care": "bg-accent text-accent-foreground",
  "Medicare": "bg-blue-100 text-blue-800",
  "Financial": "bg-primary text-primary-foreground",
  "Estate Planning": "bg-amber-100 text-amber-800",
  "Probate": "bg-gray-200 text-gray-800"
};

const availabilityColors = {
  quick: "text-green-600 bg-green-50 border-green-200",
  standard: "text-yellow-600 bg-yellow-50 border-yellow-200",
  planning: "text-blue-600 bg-blue-50 border-blue-200"
};

export function ExpertCard({ expert }: { expert: Expert }) {
  return (
    <div className="bg-card rounded-xl border border-card-border p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-serif text-xl font-bold text-secondary">{expert.name}</h3>
          <p className="text-sm text-muted-foreground">{expert.title}</p>
        </div>
        <div className="flex items-center bg-gray-50 px-2 py-1 rounded text-sm font-medium">
          <Star className="w-4 h-4 text-primary fill-primary mr-1" />
          {expert.rating}
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-4">
        <Badge variant="secondary" className={specialtyColors[expert.specialty]}>
          {expert.specialty}
        </Badge>
      </div>

      <div className="space-y-2 mb-6 flex-1">
        <div className="flex items-center text-sm text-muted-foreground">
          <MapPin className="w-4 h-4 mr-2" />
          {expert.location}
        </div>
        <div className="flex items-center text-sm">
          <Clock className="w-4 h-4 mr-2 text-muted-foreground" />
          <span className={`px-2 py-0.5 rounded-full text-xs border ${availabilityColors[expert.availabilityType]}`}>
            {expert.availability}
          </span>
        </div>
      </div>

      <p className="text-sm text-secondary/80 mb-6 italic line-clamp-2">
        "{expert.bio}"
      </p>

      <div className="grid grid-cols-2 gap-3 mt-auto">
        <Link href={`/experts/${expert.id}`} className="w-full">
          <Button variant="outline" className="w-full">View Profile</Button>
        </Link>
        <Button 
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
          onClick={() => window.open('https://calendly.com', '_blank')}
        >
          Book Consult
        </Button>
      </div>
    </div>
  );
}
