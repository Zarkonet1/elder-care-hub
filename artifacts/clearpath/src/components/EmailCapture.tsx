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
      <div className="bg-white p-8 rounded-xl shadow-sm border border-card-border text-center max-w-xl mx-auto">
        <div className="w-12 h-12 bg-sage-100 text-sage-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-6 h-6 text-accent" />
        </div>
        <h3 className="font-serif text-2xl font-semibold text-secondary mb-2">Check Your Inbox</h3>
        <p className="text-muted-foreground">
          We've sent the Eldercare Crisis Checklist to {email}. We hope it helps bring some clarity to your next steps.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-card p-8 rounded-xl shadow-sm border border-card-border max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <h3 className="font-serif text-2xl font-semibold text-secondary mb-2">Get the Free Eldercare Crisis Checklist</h3>
        <p className="text-muted-foreground">
          Know exactly what to do and who to call — delivered to your inbox instantly.
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
        />
        <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90">
          Send Me the Checklist
        </Button>
      </form>
      <p className="text-xs text-muted-foreground text-center mt-4">
        We respect your privacy. No spam, ever.
      </p>
    </div>
  );
}
