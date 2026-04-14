import { Link } from "wouter";
import { LucideIcon } from "lucide-react";

interface ScenarioCardProps {
  title: string;
  description: string;
  icon: LucideIcon | string;
  href: string;
}

export function ScenarioCard({ title, description, icon: Icon, href }: ScenarioCardProps) {
  return (
    <Link href={href}>
      <div className="group bg-card text-card-foreground border border-card-border p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 h-full flex flex-col items-center text-center cursor-pointer">
        <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
          {typeof Icon === "string" ? (
            <span className="text-2xl">{Icon}</span>
          ) : (
            <Icon className="w-6 h-6 text-secondary" />
          )}
        </div>
        <h3 className="font-serif font-semibold text-xl mb-2 text-secondary">{title}</h3>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
    </Link>
  );
}
