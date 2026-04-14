import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle2 } from "lucide-react";

export function EmailCapture() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-card p-8 rounded-xl shadow-sm border border-card-border text-center max-w-xl mx-auto">
        <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-6 h-6 text-accent" />
        </div>
        <h3 className="font-serif text-2xl font-semibold text-secondary mb-3">It's on its way.</h3>
        <p className="text-muted-foreground">
          Check your inbox — and know that you've just taken the most important step: deciding to be prepared.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-card p-8 md:p-12 rounded-xl shadow-sm border border-card-border max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h3 className="font-serif text-2xl md:text-3xl font-semibold text-secondary mb-3">
          Get the Free Eldercare Crisis Checklist
        </h3>
        <p className="text-muted-foreground leading-relaxed">
          When something happens, you won't have time to figure out where to start. This checklist tells you exactly what to do, who to call, and what documents to find — in the first 72 hours.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <Input
          type="email"
          placeholder="Your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="flex-1"
          aria-label="Email address"
        />
        <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90 whitespace-nowrap">
          Send Me the Free Checklist
        </Button>
      </form>
      <p className="text-xs text-muted-foreground text-center mt-4">
        No spam. Unsubscribe anytime. Used by NJ families navigating eldercare.
      </p>
    </div>
  );
}
