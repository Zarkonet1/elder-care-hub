import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ArrowRight } from "lucide-react";
import type { IntakeAnswers } from "@/lib/brief-generator";

const US_STATES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut",
  "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa",
  "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan",
  "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire",
  "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio",
  "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
  "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia",
  "Wisconsin", "Wyoming", "Washington D.C.",
];

interface Question {
  module: string;
  moduleNum: number;
  totalModules: number;
  key: keyof IntakeAnswers;
  question: string;
  type: "radio" | "dropdown";
  options?: string[];
  hint?: string;
}

const QUESTIONS: Question[] = [
  {
    module: "Location",
    moduleNum: 1,
    totalModules: 6,
    key: "state",
    question: "What state are you in?",
    type: "dropdown",
  },
  {
    module: "About the person",
    moduleNum: 2,
    totalModules: 6,
    key: "age",
    question: "How old is the person who needs help?",
    type: "radio",
    options: ["Under 65", "65–75", "75–85", "85 or older"],
  },
  {
    module: "About the person",
    moduleNum: 2,
    totalModules: 6,
    key: "living",
    question: "Where are they currently living?",
    type: "radio",
    options: [
      "At home, alone",
      "At home with family",
      "Assisted living or independent living",
      "Memory care facility",
      "Nursing home or rehab facility",
      "Currently in the hospital",
    ],
  },
  {
    module: "About the person",
    moduleNum: 2,
    totalModules: 6,
    key: "dementia",
    question: "Is there a diagnosis of dementia or cognitive decline?",
    type: "radio",
    options: ["Yes", "No", "Not sure"],
  },
  {
    module: "Financial picture",
    moduleNum: 3,
    totalModules: 6,
    key: "assets",
    question: "Roughly, what is the total value of assets? (home, savings, investments, retirement accounts combined)",
    type: "radio",
    options: ["Under $100,000", "$100,000 – $500,000", "$500,000 – $1,000,000", "Over $1,000,000", "Not sure"],
  },
  {
    module: "Financial picture",
    moduleNum: 3,
    totalModules: 6,
    key: "realEstate",
    question: "Is there a home or other real estate involved?",
    type: "radio",
    options: ["Yes", "No", "Not sure"],
  },
  {
    module: "Financial picture",
    moduleNum: 3,
    totalModules: 6,
    key: "retirement",
    question: "Are there retirement accounts (IRA, 401k, pension) or business interests?",
    type: "radio",
    options: ["Yes", "No", "Not sure"],
  },
  {
    module: "Financial picture",
    moduleNum: 3,
    totalModules: 6,
    key: "veteran",
    question: "Is the person (or their spouse) a U.S. military veteran?",
    type: "radio",
    options: ["Yes", "No", "Not sure"],
    hint: "Veterans may qualify for VA Aid & Attendance — a benefit that can cover $1,500–$2,300+/month in qualifying care costs.",
  },
  {
    module: "Financial picture",
    moduleNum: 3,
    totalModules: 6,
    key: "ltcInsurance",
    question: "Is there long-term care insurance in place?",
    type: "radio",
    options: ["Yes", "No", "Not sure"],
    hint: "Long-term care insurance can significantly change the funding picture for home care, assisted living, or memory care.",
  },
  {
    module: "Legal documents",
    moduleNum: 4,
    totalModules: 6,
    key: "legalDocs",
    question: "Is there a will, a trust, or both?",
    type: "radio",
    options: ["Will only", "Trust only", "Both a will and a trust", "Neither", "Not sure"],
  },
  {
    module: "Legal documents",
    moduleNum: 4,
    totalModules: 6,
    key: "poa",
    question: "Is there a Power of Attorney for finances and a Healthcare Proxy?",
    type: "radio",
    options: ["Yes, both are in place", "One exists but not the other", "Neither exists", "Not sure"],
  },
  {
    module: "Family",
    moduleNum: 5,
    totalModules: 6,
    key: "spouse",
    question: "Is there a surviving spouse or domestic partner?",
    type: "radio",
    options: ["Yes", "No"],
  },
  {
    module: "Family",
    moduleNum: 5,
    totalModules: 6,
    key: "disputes",
    question: "Are there any known family disagreements about care decisions or the estate?",
    type: "radio",
    options: ["Yes", "No", "Possibly"],
  },
  {
    module: "What's been done",
    moduleNum: 6,
    totalModules: 6,
    key: "attorney",
    question: "Has an attorney been contacted about this situation yet?",
    type: "radio",
    options: ["Yes, we've spoken with one", "Not yet", "Not sure"],
  },
];

const TOTAL = QUESTIONS.length;

const EMPTY_ANSWERS: IntakeAnswers = {
  state: "", age: "", living: "", dementia: "",
  assets: "", realEstate: "", retirement: "",
  veteran: "", ltcInsurance: "",
  legalDocs: "", poa: "", spouse: "", disputes: "", attorney: "",
};

export default function Intake() {
  const [, navigate] = useLocation();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<IntakeAnswers>(EMPTY_ANSWERS);
  const [noAssessment, setNoAssessment] = useState(false);

  useEffect(() => {
    document.title = "Get Matched with a Professional | ClearPath Elder Guide";
    window.scrollTo(0, 0);
    const saved = localStorage.getItem("clearpath_assessment");
    if (!saved) setNoAssessment(true);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

  const q = QUESTIONS[step];
  const currentValue = answers[q.key];
  const isValid = currentValue !== "";

  const handleSelect = (value: string) => {
    setAnswers((prev) => ({ ...prev, [q.key]: value }));
  };

  const handleNext = () => {
    if (step < TOTAL - 1) {
      setStep((s) => s + 1);
    } else {
      localStorage.setItem("clearpath_intake", JSON.stringify(answers));
      navigate("/brief");
    }
  };

  const handleBack = () => {
    if (step === 0) {
      navigate("/start");
    } else {
      setStep((s) => s - 1);
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
          <Button
            className="bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={() => navigate("/start")}
          >
            Go to Assessment
          </Button>
        </div>
      </div>
    );
  }

  const progressPct = ((step + 1) / TOTAL) * 100;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">

        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-secondary transition-colors mb-8"
        >
          <ChevronLeft className="w-4 h-4" />
          {step === 0 ? "Back to results" : "Back"}
        </button>

        <div className="mb-8">
          <div className="flex justify-between items-baseline mb-2">
            <span className="text-sm text-primary font-medium">
              Question {step + 1} of {TOTAL}
            </span>
            <span className="text-sm text-muted-foreground font-medium">{q.question.slice(0, 30)}...</span>
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
              <div>
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
              </div>
            ) : (
              <RadioGroup
                value={currentValue as string}
                onValueChange={handleSelect}
                className="space-y-3"
              >
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
                      <RadioGroupItem
                        value={opt}
                        id={opt}
                        className="text-primary border-border flex-shrink-0"
                      />
                      <Label
                        htmlFor={opt}
                        className="text-sm font-medium text-foreground cursor-pointer leading-snug"
                      >
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
            {step < TOTAL - 1 ? (
              <Button
                onClick={handleNext}
                disabled={!isValid}
                className="bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-40"
              >
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                disabled={!isValid}
                className="bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-40 px-6"
              >
                Generate My Brief
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6 leading-relaxed">
          Your answers are used only to prepare a summary for a professional. No personal identifying information is collected.
        </p>

      </div>
    </div>
  );
}
