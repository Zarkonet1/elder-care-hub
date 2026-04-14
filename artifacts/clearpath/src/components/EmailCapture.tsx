import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle2, FileText } from "lucide-react";

const CHECKLIST_SECTIONS = [
  {
    number: "1",
    title: "In the First 24 Hours",
    items: [
      'Find out if the admission is "inpatient" or "observation status" — this affects Medicare coverage',
      "Ask to speak with the hospital's discharge planner or social worker",
      "Locate Medicare and any supplemental insurance cards",
      "Find out if a Power of Attorney document exists — and where it is",
      "Identify one family point person to coordinate communication",
    ],
  },
  {
    number: "2",
    title: "Documents to Find",
    items: [
      "Medicare card and any Medicare Advantage or supplement plan information",
      "Durable Power of Attorney",
      "Healthcare Proxy / Healthcare Power of Attorney",
      "Advance Directive / Living Will",
      "Will or Trust documents and life insurance policies",
    ],
  },
  {
    number: "3",
    title: "Questions to Ask the Hospital",
    items: [
      "What are the discharge options and what is the expected timeline?",
      "Does my loved one qualify for Medicare-covered skilled nursing facility care?",
      "Is there a patient advocate or social worker assigned?",
      "What level of care will be needed at discharge?",
    ],
  },
  {
    number: "4",
    title: "Who You May Need to Call",
    items: [
      "Elder Law Attorney — if Medicaid, assets, or legal documents are a concern",
      "Geriatric Care Manager — if you need help assessing care options fast",
      "NJ SHIP Program — free Medicare counseling for NJ residents",
    ],
  },
  {
    number: "5",
    title: "What Comes Next",
    items: [
      "Full guidance on every area — organized around your situation",
      "A 5-minute assessment to get your personalized starting point",
      "Our expert network to find the right professional for your situation",
    ],
  },
];

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
    <div className="max-w-4xl mx-auto">
      {/* Checklist Card */}
      <div className="bg-card rounded-2xl shadow-sm border border-card-border overflow-hidden">
        {/* Card Header */}
        <div className="bg-secondary text-secondary-foreground px-8 py-7">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
              <FileText className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-secondary-foreground/60 mb-1">
                Free Download — Branded PDF
              </p>
              <h3 className="font-serif text-xl md:text-2xl font-bold leading-snug">
                The Eldercare Crisis Checklist: What To Do, Who To Call, and What To Find in the First 72 Hours
              </h3>
              <p className="text-sm text-secondary-foreground/70 mt-2">
                From ClearPath Elder Guide — Plain-language guidance for NJ families
              </p>
            </div>
          </div>
        </div>

        {/* Checklist Preview */}
        <div className="px-8 py-6 border-b border-border">
          <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-5">
            What's Inside
          </p>
          <div className="grid sm:grid-cols-2 gap-6">
            {CHECKLIST_SECTIONS.map((section) => (
              <div key={section.number} className="space-y-2">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-6 h-6 rounded-full bg-primary/15 text-primary text-xs font-bold flex items-center justify-center flex-shrink-0">
                    {section.number}
                  </span>
                  <h4 className="font-semibold text-secondary text-sm">{section.title}</h4>
                </div>
                <ul className="space-y-1.5 pl-8">
                  {section.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground leading-relaxed">
                      <CheckCircle2 className="w-3.5 h-3.5 text-accent flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <div className="px-8 py-7">
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
            <Button
              type="submit"
              className="bg-primary text-primary-foreground hover:bg-primary/90 whitespace-nowrap"
            >
              Send Me the Free Checklist
            </Button>
          </form>
          <p className="text-xs text-muted-foreground text-center mt-3">
            No spam. Unsubscribe anytime. This checklist is for general informational purposes only and does not
            constitute legal, financial, or medical advice.
          </p>
        </div>
      </div>
    </div>
  );
}
