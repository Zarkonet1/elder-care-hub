import { Link } from "wouter";
import { PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FloatingHelp() {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Link href="/start">
        <Button size="lg" className="rounded-full shadow-lg h-14 px-6 bg-secondary text-secondary-foreground hover:bg-secondary/90 hover:-translate-y-1 transition-transform">
          <PhoneCall className="w-5 h-5 mr-2" />
          Need Help Now?
        </Button>
      </Link>
    </div>
  );
}
