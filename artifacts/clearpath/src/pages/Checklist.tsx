import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Printer, CheckSquare, Square, ArrowRight, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChecklistItem {
  id: string;
  text: string;
}

interface ChecklistSection {
  id: string;
  headline: string;
  items?: ChecklistItem[];
  links?: { text: string; href?: string }[];
}

const SECTIONS: ChecklistSection[] = [
  {
    id: "s1",
    headline: "In the First 24 Hours",
    items: [
      { id: "s1-1", text: "Find out if the hospital admission is inpatient or observation status — ask the nurse or charge nurse directly. This affects Medicare coverage." },
      { id: "s1-2", text: "Ask to speak with the hospital's discharge planner or social worker" },
      { id: "s1-3", text: "Locate Medicare and any supplemental insurance cards" },
      { id: "s1-4", text: "Find out if a Power of Attorney document exists — and where it is" },
      { id: "s1-5", text: "Identify one family point person to coordinate communication" },
    ],
  },
  {
    id: "s2",
    headline: "Documents to Find",
    items: [
      { id: "s2-1", text: "Medicare card and any Medicare Advantage or supplement plan information" },
      { id: "s2-2", text: "Medicaid card (if applicable)" },
      { id: "s2-3", text: "Durable Power of Attorney" },
      { id: "s2-4", text: "Healthcare Proxy / Healthcare Power of Attorney" },
      { id: "s2-5", text: "Advance Directive / Living Will" },
      { id: "s2-6", text: "Life insurance policies" },
      { id: "s2-7", text: "Will or Trust documents" },
      { id: "s2-8", text: "Current medication list" },
      { id: "s2-9", text: "Primary care physician contact information" },
    ],
  },
  {
    id: "s3",
    headline: "Questions to Ask the Hospital",
    items: [
      { id: "s3-1", text: "What are the discharge options and what is the expected timeline?" },
      { id: "s3-2", text: "Does my loved one qualify for Medicare-covered skilled nursing facility care?" },
      { id: "s3-3", text: "Is there a patient advocate or social worker assigned?" },
      { id: "s3-4", text: "What level of care will be needed at discharge?" },
    ],
  },
  {
    id: "s4",
    headline: "Who You May Need to Call",
    items: [
      { id: "s4-1", text: "Elder Law Attorney — if Medicaid, assets, or legal documents are a concern" },
      { id: "s4-2", text: "Geriatric Care Manager — if you need help assessing care options fast" },
      { id: "s4-3", text: "Medicare Helpline: 1-800-MEDICARE — for coverage questions" },
      { id: "s4-4", text: "NJ SHIP Program — free Medicare counseling for NJ residents" },
      { id: "s4-5", text: "Family members — identify roles and responsibilities early" },
    ],
  },
  {
    id: "s5",
    headline: "What Comes Next",
    links: [
      { text: "Visit ClearPath Navigator for full guidance on each of these areas" },
      { text: "Take the 5-minute assessment to get your personalized starting point", href: "/start" },
      { text: "Browse our expert network to find the right professional for your situation", href: "/experts" },
    ],
  },
];

export default function Checklist() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const allItems = SECTIONS.flatMap((s) => s.items ?? []);
  const totalItems = allItems.length;
  const checkedCount = Object.values(checked).filter(Boolean).length;

  useEffect(() => {
    document.title = "Eldercare Crisis Checklist | ClearPath Navigator";
    window.scrollTo(0, 0);
  }, []);

  const toggle = (id: string) => {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const resetAll = () => setChecked({});

  return (
    <>
      <style>{`
        @media print {
          .no-print { display: none !important; }
          .print-logo { display: flex !important; }
          .print-disclaimer { display: block !important; }
          body { background: white !important; }
          header, footer, nav { display: none !important; }
          .checklist-page { padding: 0 !important; }
          .checklist-card { box-shadow: none !important; border: none !important; }
          .checklist-section { break-inside: avoid; }
          @page { margin: 1in; size: letter; }
        }
        .print-logo { display: none; }
        .print-disclaimer { display: none; }
      `}</style>

      <div className="min-h-screen bg-background pb-24 checklist-page">

        {/* Print-only logo */}
        <div className="print-logo items-center gap-2 mb-6 border-b border-gray-200 pb-4">
          <div className="w-8 h-8 rounded-full bg-[#1B2A4A] flex items-center justify-center">
            <Leaf className="w-4 h-4 text-white" />
          </div>
          <span className="font-serif font-bold text-xl text-[#1B2A4A]">ClearPath Navigator</span>
        </div>

        {/* Page header */}
        <div className="bg-secondary text-secondary-foreground py-14 md:py-20 no-print">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">
              The Eldercare Crisis Checklist
            </h1>
            <p className="text-lg text-secondary-foreground/80 max-w-xl mx-auto leading-relaxed">
              What to do, who to call, and what to find — in the first 72 hours.
            </p>
          </div>
        </div>

        {/* Print-only header */}
        <div className="print-disclaimer mb-2">
          <h1 className="font-serif text-3xl font-bold text-[#1B2A4A] mb-1">The Eldercare Crisis Checklist</h1>
          <p className="text-base text-gray-600 mb-4">What to do, who to call, and what to find — in the first 72 hours.</p>
        </div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">

          {/* Action bar */}
          <div className="flex items-center justify-between mb-8 no-print">
            <div className="text-sm text-muted-foreground">
              {checkedCount > 0 ? (
                <span>
                  <span className="font-semibold text-secondary">{checkedCount} of {totalItems}</span> items completed
                </span>
              ) : (
                <span>Check off items as you complete them</span>
              )}
            </div>
            <div className="flex gap-3">
              {checkedCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={resetAll}
                  className="text-muted-foreground hover:text-secondary"
                >
                  Reset
                </Button>
              )}
              <Button
                variant="outline"
                size="sm"
                className="border-secondary text-secondary hover:bg-secondary/5"
                onClick={() => window.print()}
              >
                <Printer className="w-4 h-4 mr-2" />
                Print / Save as PDF
              </Button>
            </div>
          </div>

          {/* Progress bar */}
          {totalItems > 0 && checkedCount > 0 && (
            <div className="mb-8 no-print">
              <div className="h-2 bg-secondary/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-accent rounded-full transition-all duration-500"
                  style={{ width: `${(checkedCount / totalItems) * 100}%` }}
                />
              </div>
            </div>
          )}

          {/* Checklist card */}
          <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden checklist-card">
            {SECTIONS.map((section, si) => (
              <div
                key={section.id}
                className={`checklist-section ${si < SECTIONS.length - 1 ? "border-b border-border" : ""}`}
              >
                {/* Section header */}
                <div className="px-6 md:px-8 py-5 bg-secondary/5 border-b border-border/50">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-full bg-secondary text-secondary-foreground text-xs font-bold flex items-center justify-center flex-shrink-0">
                      {si + 1}
                    </span>
                    <h2 className="font-serif text-xl font-semibold text-secondary">{section.headline}</h2>
                  </div>
                </div>

                {/* Checkable items */}
                {section.items && (
                  <ul className="divide-y divide-border/40">
                    {section.items.map((item) => {
                      const isChecked = !!checked[item.id];
                      return (
                        <li key={item.id}>
                          <button
                            className={`w-full flex items-start gap-4 px-6 md:px-8 py-4 text-left transition-colors hover:bg-secondary/3 ${
                              isChecked ? "bg-accent/5" : "bg-card"
                            }`}
                            onClick={() => toggle(item.id)}
                            aria-checked={isChecked}
                            role="checkbox"
                          >
                            <span className="flex-shrink-0 mt-0.5 text-accent">
                              {isChecked
                                ? <CheckSquare className="w-5 h-5" />
                                : <Square className="w-5 h-5 text-secondary/30" />
                              }
                            </span>
                            <span className={`leading-relaxed text-sm md:text-base transition-all ${
                              isChecked
                                ? "line-through text-muted-foreground"
                                : "text-foreground"
                            }`}>
                              {item.text}
                            </span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                )}

                {/* Link items (Section 5) */}
                {section.links && (
                  <ul className="divide-y divide-border/40">
                    {section.links.map((link, li) => (
                      <li key={li} className="px-6 md:px-8 py-4 flex items-start gap-4">
                        <ArrowRight className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm md:text-base text-foreground leading-relaxed">
                          {link.href ? (
                            <Link href={link.href} className="text-primary underline underline-offset-2 hover:text-primary/80 transition-colors">
                              {link.text}
                            </Link>
                          ) : (
                            link.text
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          {/* Bottom disclaimer */}
          <div className="mt-10 text-xs text-muted-foreground leading-relaxed text-center border-t border-border pt-8">
            This checklist is for general informational purposes only and does not constitute legal, financial, or medical advice. ClearPath Navigator — clearpath-navigator.com
          </div>

          {/* Print disclaimer (same, always shown in print) */}
          <div className="print-disclaimer mt-6 text-xs text-gray-500 border-t border-gray-300 pt-4">
            This checklist is for general informational purposes only and does not constitute legal, financial, or medical advice. ClearPath Navigator — clearpath-navigator.com
          </div>

          {/* Bottom CTA */}
          <div className="mt-10 no-print bg-secondary/5 rounded-2xl border border-secondary/15 p-8 text-center">
            <h3 className="font-serif text-xl font-semibold text-secondary mb-2">Not sure what to do next?</h3>
            <p className="text-muted-foreground text-sm mb-5">
              Answer five quick questions and we'll show you exactly where to start for your situation.
            </p>
            <Link href="/start">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                Take the 5-Minute Assessment
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
