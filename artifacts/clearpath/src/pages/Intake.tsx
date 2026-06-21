import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ArrowRight } from "lucide-react";
import type { IntakeAnswers } from "@/lib/brief-generator";

const US_STATES = [
  "Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut",
  "Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa",
  "Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan",
  "Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire",
  "New Jersey","New Mexico","New York","North Carolina","North Dakota","Ohio",
  "Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota",
  "Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia",
  "Wisconsin","Wyoming","Washington D.C.",
];

interface Question {
  tier: 1 | 2;
  module: string;
  moduleNum: number;
  totalModules: number;
  key: keyof IntakeAnswers;
  question: string;
  type: "radio" | "dropdown";
  options?: string[];
  hint?: string;
  showIf?: (answers: IntakeAnswers, situation: string) => boolean;
}

const QUESTIONS: Question[] = [
  // ── Tier 1: Core (4 modules, 8 questions) ──────────────────────────────────
  {
    tier: 1, module: "Location", moduleNum: 1, totalModules: 4,
    key: "state", question: "What state are you in?", type: "dropdown",
  },
  {
    tier: 1, module: "About the person", moduleNum: 2, totalModules: 4,
    key: "age", question: "How old is the person who needs help?", type: "radio",
    options: ["Under 65","65–75","75–85","85 or older"],
  },
  {
    tier: 1, module: "About the person", moduleNum: 2, totalModules: 4,
    key: "living", question: "Where are they currently living?", type: "radio",
    options: [
      "At home, alone","At home with family",
      "Assisted living or independent living","Memory care facility",
      "Nursing home or rehab facility","Currently in the hospital",
    ],
  },
  {
    tier: 1, module: "Financial picture", moduleNum: 3, totalModules: 4,
    key: "assets",
    question: "Roughly, what is the total value of assets? (home, savings, investments, retirement accounts combined)",
    type: "radio",
    options: ["Under $100,000","$100,000 – $500,000","$500,000 – $1,000,000","Over $1,000,000","Not sure"],
  },
  {
    tier: 1, module: "Financial picture", moduleNum: 3, totalModules: 4,
    key: "realEstate", question: "Is there a home or other real estate involved?", type: "radio",
    options: ["Yes","No","Not sure"],
  },
  {
    tier: 1, module: "Legal & next steps", moduleNum: 4, totalModules: 4,
    key: "legalDocs", question: "Is there a will, a trust, or both?", type: "radio",
    options: ["Will only","Trust only","Both a will and a trust","Neither","Not sure"],
  },
  {
    tier: 1, module: "Legal & next steps", moduleNum: 4, totalModules: 4,
    key: "poa",
    question: "Is there a Power of Attorney for finances and a Healthcare Proxy?",
    type: "radio",
    options: ["Yes, both are in place","One exists but not the other","Neither exists","Not sure"],
  },
  {
    tier: 1, module: "Legal & next steps", moduleNum: 4, totalModules: 4,
    key: "attorney", question: "Has an attorney been contacted about this situation yet?", type: "radio",
    options: ["Yes, we've spoken with one","Not yet","Not sure"],
  },

  // ── Tier 2: Depth (3 modules, 11 questions) ────────────────────────────────
  {
    tier: 2, module: "Health & Care", moduleNum: 1, totalModules: 3,
    key: "dementia", question: "Is there a diagnosis of dementia or cognitive decline?", type: "radio",
    options: ["Yes","No","Not sure"],
  },
  {
    tier: 2, module: "Health & Care", moduleNum: 1, totalModules: 3,
    key: "adlLevel",
    question: "What level of daily assistance does the person currently need?",
    type: "radio",
    options: [
      "Independent — manages most daily tasks without help",
      "Some assistance — help needed with bathing, dressing, or meals",
      "Significant assistance — requires help with most daily activities",
      "Fully dependent — relies on others for all daily care",
      "Not sure",
    ],
    hint: "ADL (Activities of Daily Living) level is one of the most important factors in determining the appropriate care setting and cost range.",
    showIf: (_, situation) => situation !== "loss",
  },
  {
    tier: 2, module: "Health & Care", moduleNum: 1, totalModules: 3,
    key: "healthCondition",
    question: "What best describes the primary health condition?",
    type: "radio",
    options: [
      "Heart or cardiovascular condition",
      "Cancer (active or in treatment)",
      "Neurological condition (Parkinson's, ALS, MS, or stroke)",
      "Primarily mobility or fall risk",
      "Multiple chronic conditions",
      "No significant health conditions identified",
      "Not sure",
    ],
    hint: "This helps match the family with a professional who has relevant experience with the specific care challenges involved.",
    showIf: (_, situation) => situation !== "loss",
  },
  {
    tier: 2, module: "Health & Care", moduleNum: 1, totalModules: 3,
    key: "medicareStatus",
    question: "Is the person currently enrolled in Medicare?",
    type: "radio",
    options: [
      "Yes, currently enrolled in Medicare",
      "Not yet enrolled (under 65 or not yet applied)",
      "No",
      "Not sure",
    ],
    hint: "Medicare covers skilled nursing and rehabilitation after a qualifying hospital stay — but does not cover long-term custodial care.",
    showIf: (_, situation) => situation !== "loss",
  },
  {
    tier: 2, module: "Property & Finances", moduleNum: 2, totalModules: 3,
    key: "propertyTitle",
    question: "How is the real estate titled?",
    type: "radio",
    options: [
      "Joint tenancy with right of survivorship",
      "Tenants in common",
      "One person's name only",
      "In a trust",
      "Not sure",
    ],
    hint: "How a property is titled determines what happens to it at death — whether probate is required, and whether it passes automatically to a surviving owner.",
    showIf: (a) => a.realEstate === "Yes",
  },
  {
    tier: 2, module: "Property & Finances", moduleNum: 2, totalModules: 3,
    key: "todDeed",
    question: "Is there a Transfer on Death deed or Lady Bird deed on the property?",
    type: "radio",
    options: ["Yes","No","Not sure"],
    hint: "A Transfer on Death (TOD) or Lady Bird deed names a beneficiary who receives the property at death — without probate.",
    showIf: (a) => a.realEstate === "Yes",
  },
  {
    tier: 2, module: "Property & Finances", moduleNum: 2, totalModules: 3,
    key: "retirement",
    question: "Are there retirement accounts (IRA, 401k, pension) or business interests?",
    type: "radio",
    options: ["Yes","No","Not sure"],
  },
  {
    tier: 2, module: "Property & Finances", moduleNum: 2, totalModules: 3,
    key: "veteran",
    question: "Is the person (or their spouse) a U.S. military veteran?",
    type: "radio",
    options: ["Yes","No","Not sure"],
    hint: "Veterans may qualify for VA Aid & Attendance — a benefit that can cover $1,500–$2,300+/month in qualifying care costs.",
  },
  {
    tier: 2, module: "Property & Finances", moduleNum: 2, totalModules: 3,
    key: "ltcInsurance",
    question: "Is there long-term care insurance in place?",
    type: "radio",
    options: ["Yes","No","Not sure"],
    hint: "Long-term care insurance can significantly change the funding picture for home care, assisted living, or memory care.",
  },
  {
    tier: 2, module: "Family", moduleNum: 3, totalModules: 3,
    key: "spouse",
    question: "Is there a surviving spouse or domestic partner?",
    type: "radio",
    options: ["Yes","No"],
  },
  {
    tier: 2, module: "Family", moduleNum: 3, totalModules: 3,
    key: "disputes",
    question: "Are there any known family disagreements about care decisions or the estate?",
    type: "radio",
    options: ["Yes","No","Possibly"],
  },
];

const EMPTY_ANSWERS: IntakeAnswers = {
  state: "", age: "", living: "", dementia: "",
  adlLevel: "", healthCondition: "", medicareStatus: "",
  assets: "", realEstate: "", propertyTitle: "", todDeed: "",
  retirement: "", veteran: "", ltcInsurance: "",
  legalDocs: "", poa: "", spouse: "", disputes: "", attorney: "",
};

function shouldSkip(
  index: number,
  answers: IntakeAnswers,
  situation: string,
  mode: "core" | "refine"
): boolean {
  const q = QUESTIONS[index];
  if (mode === "core" && q.tier !== 1) return true;
  if (mode === "refine" && q.tier !== 2) return true;
  if (q.showIf && !q.showIf(answers, situation)) return true;
  return false;
}

function getNextStep(current: number, answers: IntakeAnswers, situation: string, mode: "core" | "refine"): number {
  let next = current + 1;
  while (next < QUESTIONS.length && shouldSkip(next, answers, situation, mode)) next++;
  return next;
}

function getPrevStep(current: number, answers: IntakeAnswers, situation: string, mode: "core" | "refine"): number {
  let prev = current - 1;
  while (prev >= 0 && shouldSkip(prev, answers, situation, mode)) prev--;
  return prev;
}

function visibleCount(answers: IntakeAnswers, situation: string, mode: "core" | "refine"): number {
  return QUESTIONS.filter((_, i) => !shouldSkip(i, answers, situation, mode)).length;
}

function visibleIndex(step: number, answers: IntakeAnswers, situation: string, mode: "core" | "refine"): number {
  let count = 0;
  for (let i = 0; i <= step; i++) {
    if (!shouldSkip(i, answers, situation, mode)) count++;
  }
  return count;
}

interface IntakeProps {
  mode?: "core" | "refine";
}

export default function Intake({ mode = "core" }: IntakeProps) {
  const [, navigate] = useLocation();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<IntakeAnswers>(EMPTY_ANSWERS);
  const [noAssessment, setNoAssessment] = useState(false);
  const [situation, setSituation] = useState("");

  useEffect(() => {
    document.title = mode === "refine"
      ? "Add More Detail | ClearPath Elder Guide"
      : "Get Started | ClearPath Elder Guide";
    window.scrollTo(0, 0);

    const savedAssessment = localStorage.getItem("clearpath_assessment");
    if (!savedAssessment) {
      setNoAssessment(true);
      return;
    }

    try {
      const assessment = JSON.parse(savedAssessment);
      setSituation(assessment.situation || "");
    } catch {}

    // In refine mode, pre-load tier 1 answers so showIf conditions work correctly
    if (mode === "refine") {
      const savedIntake = localStorage.getItem("clearpath_intake");
      if (savedIntake) {
        try {
          setAnswers({ ...EMPTY_ANSWERS, ...JSON.parse(savedIntake) });
        } catch {}
      }
      // Start at first visible tier 2 question
      const firstTier2 = QUESTIONS.findIndex((q) => q.tier === 2);
      setStep(firstTier2);
    }
  }, [mode]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

  const q = QUESTIONS[step];
  const currentValue = answers[q.key];
  const isValid = currentValue !== "";
  const totalVisible = visibleCount(answers, situation, mode);
  const currentVisible = visibleIndex(step, answers, situation, mode);
  const progressPct = (currentVisible / totalVisible) * 100;
  const isLastVisible = getNextStep(step, answers, situation, mode) >= QUESTIONS.length;

  const handleSelect = (value: string) => {
    setAnswers((prev) => ({ ...prev, [q.key]: value }));
  };

  const handleNext = () => {
    const next = getNextStep(step, answers, situation, mode);
    if (next < QUESTIONS.length) {
      setStep(next);
    } else {
      // Merge with any existing answers (important in refine mode to preserve tier 1)
      const existing = (() => {
        try { return JSON.parse(localStorage.getItem("clearpath_intake") || "{}"); } catch { return {}; }
      })();
      localStorage.setItem("clearpath_intake", JSON.stringify({ ...existing, ...answers }));
      navigate("/brief");
    }
  };

  const handleBack = () => {
    const prev = getPrevStep(step, answers, situation, mode);
    if (prev < 0 || (mode === "refine" && QUESTIONS[prev]?.tier === 1)) {
      navigate(mode === "refine" ? "/brief" : "/start");
    } else {
      setStep(prev);
    }
  };

  if (noAssessment) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <h1 className="font-serif text-2xl font-bold text-secondary mb-4">Start with the assessment first</h1>
          <p className="text-muted-foreground mb-6">
            Complete the 5-question assessment so we can tailor this intake to your situation.
          </p>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90" onClick={() => navigate("/start")}>
            Go to Assessment
          </Button>
        </div>
      </div>
    );
  }

  const modeLabel = mode === "refine" ? "Adding detail" : "Getting started";

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">

        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-secondary transition-colors mb-8"
        >
          <ChevronLeft className="w-4 h-4" />
          {mode === "refine" ? "Back to my brief" : "Back to results"}
        </button>

        {mode === "refine" && currentVisible === 1 && (
          <div className="bg-primary/5 border border-primary/20 rounded-2xl px-6 py-5 mb-6">
            <p className="text-sm text-secondary font-medium mb-1">Adding depth to your brief</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              These questions give your professional more context on health, property, and family. Your brief will update automatically when you finish.
            </p>
          </div>
        )}

        <div className="mb-8">
          <div className="flex justify-between items-baseline mb-2">
            <span className="text-sm text-primary font-medium">
              {modeLabel} — question {currentVisible} of {totalVisible}
            </span>
          </div>
          <Progress value={progressPct} className="h-1.5 bg-secondary/10" />
        </div>

        <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-3 duration-500">

          <div className="px-7 pt-6 pb-3 border-b border-border bg-secondary/5">
            <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase mb-0.5">
              Module {q.moduleNum} of {q.totalModules} — {q.module}
            </p>
          </div>

          <div className="px-7 py-7">
            <h2 className="font-serif text-xl md:text-2xl font-semibold text-secondary mb-3 leading-snug">
              {q.question}
            </h2>

            {q.hint && (
              <p className="text-sm text-muted-foreground bg-secondary/5 border border-border rounded-xl px-4 py-3 mb-5 leading-relaxed">
                {q.hint}
              </p>
            )}

            {q.type === "dropdown" ? (
              <select
                value={answers.state}
                onChange={(e) => handleSelect(e.target.value)}
                className="w-full border border-border rounded-xl px-4 py-3 text-foreground bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
              >
                <option value="">Select a state…</option>
                {US_STATES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            ) : (
              <RadioGroup value={currentValue as string} onValueChange={handleSelect} className="space-y-3">
                {q.options!.map((opt) => {
                  const isSelected = currentValue === opt;
                  return (
                    <div
                      key={opt}
                      onClick={() => handleSelect(opt)}
                      className={`flex items-center gap-4 border rounded-xl px-5 py-4 cursor-pointer transition-all ${
                        isSelected
                          ? "border-primary bg-primary/5 shadow-sm"
                          : "border-border bg-background hover:border-primary/40"
                      }`}
                    >
                      <RadioGroupItem value={opt} id={opt} className="text-primary border-border flex-shrink-0" />
                      <Label htmlFor={opt} className="text-sm font-medium text-foreground cursor-pointer leading-snug">
                        {opt}
                      </Label>
                    </div>
                  );
                })}
              </RadioGroup>
            )}
          </div>

          <div className="px-7 pb-7 flex justify-between items-center">
            <button
              onClick={handleBack}
              className="text-sm text-muted-foreground hover:text-secondary transition-colors flex items-center gap-1"
            >
              <ChevronLeft className="w-3.5 h-3.5" /> Back
            </button>
            <Button
              onClick={handleNext}
              disabled={!isValid}
              className="bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-40 px-6"
            >
              {isLastVisible ? (mode === "refine" ? "Update My Brief" : "Generate My Brief") : "Next"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6 leading-relaxed">
          Your answers are used only to prepare a summary for a professional. No personal identifying information is collected.
        </p>

      </div>
    </div>
  );
}
