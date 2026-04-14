import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ArrowRight, CheckCircle2 } from "lucide-react";

const STEPS = [
  { number: 1, label: "What's happening right now?" },
  { number: 2, label: "Who needs help?" },
  { number: 3, label: "How urgent is this?" },
  { number: 4, label: "What's already in place?" },
  { number: 5, label: "What concerns you most?" },
];

export default function Start() {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<any>({
    situation: "",
    who: "",
    urgency: "",
    inPlace: [],
    concerns: [],
  });

  useEffect(() => {
    document.title = "Find Your Starting Point | ClearPath Elder Guide";
    window.scrollTo(0, 0);
  }, [step]);

  const updateAnswer = (key: string, value: any) => {
    setAnswers({ ...answers, [key]: value });
  };

  const toggleArrayAnswer = (key: string, value: string) => {
    const current = answers[key] as string[];
    if (current.includes(value)) {
      setAnswers({ ...answers, [key]: current.filter((item) => item !== value) });
    } else {
      setAnswers({ ...answers, [key]: [...current, value] });
    }
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 6));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const isStepValid = () => {
    if (step === 1) return answers.situation !== "";
    if (step === 2) return answers.who !== "";
    if (step === 3) return answers.urgency !== "";
    if (step === 4) return answers.inPlace.length > 0;
    if (step === 5) return answers.concerns.length > 0;
    return true;
  };

  if (step === 6) {
    return <Results answers={answers} />;
  }

  const progress = ((step - 1) / 5) * 100;
  const currentStepLabel = STEPS[step - 1].label;

  return (
    <div className="min-h-screen bg-background flex flex-col pt-12 pb-24">
      <div className="max-w-2xl mx-auto w-full px-4 sm:px-6">

        {/* Back link */}
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="text-muted-foreground hover:text-secondary -ml-4">
              <ChevronLeft className="w-4 h-4 mr-2" /> Back to Home
            </Button>
          </Link>
        </div>

        {/* Page intro — shown only on step 1 */}
        {step === 1 && (
          <div className="mb-10">
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-secondary mb-3">
              Let's Find Your Starting Point
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Answer five quick questions and we'll point you to exactly what matters most for your situation. Takes less than two minutes.
            </p>
          </div>
        )}

        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-muted-foreground mb-2 font-medium">
            <span>Step {step} of 5 — {step < 5 ? "almost there" : "last one"}</span>
            <span className="text-secondary font-semibold">{currentStepLabel}</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question card */}
        <div className="bg-card rounded-2xl shadow-sm border border-border p-6 md:p-10 animate-in fade-in duration-500">

          {step === 1 && (
            <div className="space-y-6">
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-secondary">
                What's happening right now?
              </h2>
              <RadioGroup
                value={answers.situation}
                onValueChange={(v) => updateAnswer("situation", v)}
                className="space-y-3"
              >
                {[
                  { value: "crisis", label: "In a crisis and need immediate help" },
                  { value: "ongoing", label: "Managing ongoing care for a loved one" },
                  { value: "planning", label: "Planning ahead before anything urgent arises" },
                  { value: "loss", label: "I recently lost a loved one and need guidance" },
                  { value: "self", label: "I'm an aging individual planning for myself" },
                ].map((opt) => (
                  <div
                    key={opt.value}
                    className={`flex items-center space-x-3 border p-4 rounded-xl cursor-pointer transition-colors ${
                      answers.situation === opt.value
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                    onClick={() => updateAnswer("situation", opt.value)}
                  >
                    <RadioGroupItem value={opt.value} id={`sit-${opt.value}`} />
                    <Label htmlFor={`sit-${opt.value}`} className="flex-1 cursor-pointer text-base">
                      {opt.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-secondary">
                Who needs help?
              </h2>
              <RadioGroup
                value={answers.who}
                onValueChange={(v) => updateAnswer("who", v)}
                className="space-y-3"
              >
                {[
                  { value: "parent", label: "An aging parent" },
                  { value: "spouse", label: "A spouse or partner" },
                  { value: "self", label: "Myself" },
                  { value: "other", label: "Another family member" },
                ].map((opt) => (
                  <div
                    key={opt.value}
                    className={`flex items-center space-x-3 border p-4 rounded-xl cursor-pointer transition-colors ${
                      answers.who === opt.value
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                    onClick={() => updateAnswer("who", opt.value)}
                  >
                    <RadioGroupItem value={opt.value} id={`who-${opt.value}`} />
                    <Label htmlFor={`who-${opt.value}`} className="flex-1 cursor-pointer text-base">
                      {opt.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-secondary">
                How urgent is this?
              </h2>
              <RadioGroup
                value={answers.urgency}
                onValueChange={(v) => updateAnswer("urgency", v)}
                className="space-y-3"
              >
                {[
                  { value: "extremely", label: "Extremely urgent — days or less" },
                  { value: "soon", label: "Soon — within the next few weeks" },
                  { value: "not-urgent", label: "Not urgent — planning ahead" },
                ].map((opt) => (
                  <div
                    key={opt.value}
                    className={`flex items-center space-x-3 border p-4 rounded-xl cursor-pointer transition-colors ${
                      answers.urgency === opt.value
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                    onClick={() => updateAnswer("urgency", opt.value)}
                  >
                    <RadioGroupItem value={opt.value} id={`urg-${opt.value}`} />
                    <Label htmlFor={`urg-${opt.value}`} className="flex-1 cursor-pointer text-base">
                      {opt.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-secondary">
                What's already in place?
              </h2>
              <p className="text-muted-foreground">Select all that apply.</p>
              <div className="space-y-3">
                {[
                  { value: "medicare", label: "Medicare coverage" },
                  { value: "medicaid", label: "Medicaid coverage" },
                  { value: "poa", label: "Power of Attorney" },
                  { value: "will", label: "A will or trust" },
                  { value: "ltc", label: "Long-term care insurance" },
                  { value: "none", label: "None of the above" },
                  { value: "unsure", label: "I'm not sure" },
                ].map((opt) => {
                  const isChecked = answers.inPlace.includes(opt.value);
                  return (
                    <div
                      key={opt.value}
                      className={`flex items-center space-x-3 border p-4 rounded-xl cursor-pointer transition-colors ${
                        isChecked ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                      }`}
                      onClick={() => toggleArrayAnswer("inPlace", opt.value)}
                    >
                      <Checkbox
                        id={`inp-${opt.value}`}
                        checked={isChecked}
                        onCheckedChange={() => toggleArrayAnswer("inPlace", opt.value)}
                      />
                      <Label htmlFor={`inp-${opt.value}`} className="flex-1 cursor-pointer text-base font-normal">
                        {opt.label}
                      </Label>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-6">
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-secondary">
                What concerns you most?
              </h2>
              <p className="text-muted-foreground">Select all that apply.</p>
              <div className="space-y-3">
                {[
                  { value: "paying", label: "Finding and paying for care" },
                  { value: "medicare-medicaid", label: "Understanding Medicare or Medicaid" },
                  { value: "legal", label: "Legal documents and planning" },
                  { value: "after-passing", label: "What happens after a loved one passes" },
                  { value: "dont-know", label: "I don't know where to start" },
                ].map((opt) => {
                  const isChecked = answers.concerns.includes(opt.value);
                  return (
                    <div
                      key={opt.value}
                      className={`flex items-center space-x-3 border p-4 rounded-xl cursor-pointer transition-colors ${
                        isChecked ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                      }`}
                      onClick={() => toggleArrayAnswer("concerns", opt.value)}
                    >
                      <Checkbox
                        id={`con-${opt.value}`}
                        checked={isChecked}
                        onCheckedChange={() => toggleArrayAnswer("concerns", opt.value)}
                      />
                      <Label htmlFor={`con-${opt.value}`} className="flex-1 cursor-pointer text-base font-normal">
                        {opt.label}
                      </Label>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Navigation buttons */}
          <div className="flex justify-between mt-10 pt-6 border-t border-border">
            {step > 1 ? (
              <Button variant="outline" onClick={prevStep} className="text-secondary">
                <ChevronLeft className="w-4 h-4 mr-1" /> Previous
              </Button>
            ) : (
              <div />
            )}
            <Button
              onClick={nextStep}
              disabled={!isStepValid()}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {step === 5 ? "See My Results" : "Next"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Results({ answers }: { answers: any }) {
  const isCrisis = answers.situation === "crisis" || answers.urgency === "extremely";
  const isPlanner =
    answers.situation === "planning" ||
    answers.situation === "self" ||
    answers.urgency === "not-urgent";

  let resources: { title: string; href: string; desc: string }[] = [];
  let experts: string[] = [];

  switch (answers.situation) {
    case "crisis":
      resources = [
        {
          title: "Crisis Action Plan",
          href: "/resources/crisis",
          desc: "Immediate steps when a parent is hospitalized or urgent care is needed.",
        },
        {
          title: "Understanding Medicare & Medicaid",
          href: "/resources/medicare-medicaid",
          desc: "Coverage basics for hospital stays and rehabilitation.",
        },
      ];
      experts = ["Elder Law Attorney", "Geriatric Care Manager"];
      break;
    case "ongoing":
      resources = [
        {
          title: "Long-Term Care Guide",
          href: "/resources/ongoing-care",
          desc: "Managing home care, assisted living, or nursing home decisions.",
        },
        {
          title: "Understanding Medicare & Medicaid",
          href: "/resources/medicare-medicaid",
          desc: "Making the most of your coverage for ongoing care.",
        },
      ];
      experts = ["Geriatric Care Manager", "Medicare Specialist"];
      break;
    case "planning":
      resources = [
        {
          title: "Planning Ahead",
          href: "/resources/plan-ahead",
          desc: "Essential documents and conversations before a crisis arrives.",
        },
        {
          title: "Estate Planning Basics",
          href: "/resources/estate-planning",
          desc: "Wills, trusts, and powers of attorney — in plain English.",
        },
      ];
      experts = ["Estate Planning Attorney", "Financial Planner — Eldercare"];
      break;
    case "loss":
      resources = [
        {
          title: "After a Loved One Passes",
          href: "/resources/after-passing",
          desc: "Practical guidance for the steps that can't wait — and the ones that can.",
        },
      ];
      experts = ["Probate Attorney", "Estate Planning Attorney"];
      break;
    case "self":
      resources = [
        {
          title: "Planning Ahead",
          href: "/resources/plan-ahead",
          desc: "Preparing for your own future care needs, on your terms.",
        },
        {
          title: "Estate Planning",
          href: "/resources/estate-planning",
          desc: "Ensuring your wishes are clearly documented and legally protected.",
        },
      ];
      experts = ["Elder Law Attorney", "Financial Planner — Eldercare"];
      break;
    default:
      resources = [
        { title: "Browse All Resources", href: "/resources", desc: "Explore all our eldercare guidance topics." },
      ];
      experts = ["Elder Law Attorney"];
  }

  const introCopy = isCrisis
    ? "You're dealing with something urgent, and that's exactly what this platform is built for. Below are the resources most relevant to your situation — and the types of experts who can help when you're ready for specific guidance."
    : isPlanner
    ? "Planning ahead is the single most valuable thing a family can do — and you're already doing it. Here's a clear path through the things that matter most, in the order that makes sense."
    : "Based on what you told us, these are the most important things to focus on right now.";

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-accent/20 rounded-full mb-6">
            <CheckCircle2 className="w-7 h-7 text-accent" />
          </div>
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-secondary mb-4">
            Here's Where to Start
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {introCopy}
          </p>
        </div>

        <div className="grid gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">

          {/* Recommended resources */}
          <div className="bg-card border border-card-border rounded-2xl p-8 shadow-sm">
            <h2 className="font-serif text-2xl font-semibold text-secondary mb-2">
              Start With These Resources
            </h2>
            <p className="text-muted-foreground mb-6 text-sm">
              Selected based on what you told us.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {resources.map((res, i) => (
                <Link key={i} href={res.href}>
                  <div className="block border border-border rounded-xl p-5 hover:border-primary hover:shadow-md transition-all h-full group bg-background cursor-pointer">
                    <h3 className="font-serif font-semibold text-lg text-secondary group-hover:text-primary transition-colors mb-2">
                      {res.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{res.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-6 text-center">
              <Link href="/resources">
                <Button variant="outline" className="text-secondary border-secondary/30 hover:border-secondary">
                  Browse All Resources
                </Button>
              </Link>
            </div>
          </div>

          {/* Experts to consult */}
          <div className="bg-card border border-card-border rounded-2xl p-8 shadow-sm">
            <h2 className="font-serif text-2xl font-semibold text-secondary mb-2">
              Experts Who Can Help
            </h2>
            <p className="text-muted-foreground mb-6 text-sm">
              When you're ready for a real conversation, these are the professionals to speak with first.
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              {experts.map((exp, i) => (
                <div
                  key={i}
                  className="bg-secondary/10 text-secondary px-4 py-2 rounded-lg font-medium text-sm"
                >
                  {exp}
                </div>
              ))}
            </div>
            <div className="text-center">
              <Link href="/experts">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 w-full sm:w-auto">
                  Find an Expert in NJ
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
