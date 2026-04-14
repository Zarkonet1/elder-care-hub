import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ArrowRight, CheckCircle2 } from "lucide-react";

export default function Start() {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<any>({
    situation: "",
    who: "",
    urgency: "",
    inPlace: [],
    concerns: []
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
      setAnswers({ ...answers, [key]: current.filter(item => item !== value) });
    } else {
      setAnswers({ ...answers, [key]: [...current, value] });
    }
  };

  const nextStep = () => setStep(prev => Math.min(prev + 1, 6));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

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

  return (
    <div className="min-h-screen bg-background flex flex-col pt-12 pb-24">
      <div className="max-w-2xl mx-auto w-full px-4 sm:px-6">
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="text-muted-foreground hover:text-secondary -ml-4">
              <ChevronLeft className="w-4 h-4 mr-2" /> Back to Home
            </Button>
          </Link>
        </div>

        <div className="mb-8">
          <div className="flex justify-between text-sm text-muted-foreground mb-2 font-medium">
            <span>Step {step} of 5</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="bg-card rounded-2xl shadow-sm border border-border p-6 md:p-10 animate-in fade-in duration-500">
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-secondary">What best describes your situation right now?</h2>
              <RadioGroup value={answers.situation} onValueChange={(v) => updateAnswer("situation", v)} className="space-y-3">
                {[
                  { value: "crisis", label: "In a crisis and need immediate help" },
                  { value: "ongoing", label: "Managing ongoing care for a loved one" },
                  { value: "planning", label: "Planning ahead before anything urgent arises" },
                  { value: "loss", label: "I recently lost a loved one and need guidance" },
                  { value: "self", label: "I'm an aging individual planning for myself" },
                ].map(opt => (
                  <div key={opt.value} className={`flex items-center space-x-3 border p-4 rounded-xl cursor-pointer transition-colors ${answers.situation === opt.value ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}>
                    <RadioGroupItem value={opt.value} id={`sit-${opt.value}`} />
                    <Label htmlFor={`sit-${opt.value}`} className="flex-1 cursor-pointer text-base">{opt.label}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-secondary">Who needs help?</h2>
              <RadioGroup value={answers.who} onValueChange={(v) => updateAnswer("who", v)} className="space-y-3">
                {[
                  { value: "parent", label: "An aging parent" },
                  { value: "spouse", label: "A spouse or partner" },
                  { value: "self", label: "Myself" },
                  { value: "other", label: "Another family member" },
                ].map(opt => (
                  <div key={opt.value} className={`flex items-center space-x-3 border p-4 rounded-xl cursor-pointer transition-colors ${answers.who === opt.value ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}>
                    <RadioGroupItem value={opt.value} id={`who-${opt.value}`} />
                    <Label htmlFor={`who-${opt.value}`} className="flex-1 cursor-pointer text-base">{opt.label}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-secondary">How urgent is your situation?</h2>
              <RadioGroup value={answers.urgency} onValueChange={(v) => updateAnswer("urgency", v)} className="space-y-3">
                {[
                  { value: "extremely", label: "Extremely urgent — days or less" },
                  { value: "soon", label: "Soon — within the next few weeks" },
                  { value: "not-urgent", label: "Not urgent — planning ahead" },
                ].map(opt => (
                  <div key={opt.value} className={`flex items-center space-x-3 border p-4 rounded-xl cursor-pointer transition-colors ${answers.urgency === opt.value ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}>
                    <RadioGroupItem value={opt.value} id={`urg-${opt.value}`} />
                    <Label htmlFor={`urg-${opt.value}`} className="flex-1 cursor-pointer text-base">{opt.label}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-secondary">What's already in place?</h2>
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
                ].map(opt => {
                  const isChecked = answers.inPlace.includes(opt.value);
                  return (
                    <div key={opt.value} className={`flex items-center space-x-3 border p-4 rounded-xl cursor-pointer transition-colors ${isChecked ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}>
                      <Checkbox 
                        id={`inp-${opt.value}`} 
                        checked={isChecked}
                        onCheckedChange={() => toggleArrayAnswer("inPlace", opt.value)}
                      />
                      <Label htmlFor={`inp-${opt.value}`} className="flex-1 cursor-pointer text-base font-normal">{opt.label}</Label>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-6">
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-secondary">What concerns you most right now?</h2>
              <p className="text-muted-foreground">Select all that apply.</p>
              <div className="space-y-3">
                {[
                  { value: "paying", label: "Finding and paying for care" },
                  { value: "medicare-medicaid", label: "Understanding Medicare or Medicaid" },
                  { value: "legal", label: "Legal documents and planning" },
                  { value: "after-passing", label: "What happens after a loved one passes" },
                  { value: "dont-know", label: "I don't know where to start" },
                ].map(opt => {
                  const isChecked = answers.concerns.includes(opt.value);
                  return (
                    <div key={opt.value} className={`flex items-center space-x-3 border p-4 rounded-xl cursor-pointer transition-colors ${isChecked ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}>
                      <Checkbox 
                        id={`con-${opt.value}`} 
                        checked={isChecked}
                        onCheckedChange={() => toggleArrayAnswer("concerns", opt.value)}
                      />
                      <Label htmlFor={`con-${opt.value}`} className="flex-1 cursor-pointer text-base font-normal">{opt.label}</Label>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="flex justify-between mt-10 pt-6 border-t border-border">
            {step > 1 ? (
              <Button variant="outline" onClick={prevStep}>Previous</Button>
            ) : <div></div>}
            
            <Button 
              onClick={nextStep} 
              disabled={!isStepValid()}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {step === 5 ? "See Your Guide" : "Next Step"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Results({ answers }: { answers: any }) {
  // Simple mapping logic
  let startingPoint = "";
  let resources = [];
  let experts = [];

  switch(answers.situation) {
    case "crisis":
      startingPoint = "Crisis Management";
      resources = [
        { title: "Crisis Action Plan", href: "/resources/crisis", desc: "Immediate steps to stabilize the situation." },
        { title: "Understanding Medicare & Medicaid", href: "/resources/medicare-medicaid", desc: "Coverage basics for hospital stays and rehab." }
      ];
      experts = ["Elder Law Attorney", "Geriatric Care Manager"];
      break;
    case "ongoing":
      startingPoint = "Ongoing Care Coordination";
      resources = [
        { title: "Long-Term Care Guide", href: "/resources/ongoing-care", desc: "Managing home care, assisted living, or nursing homes." }
      ];
      experts = ["Geriatric Care Manager"];
      break;
    case "planning":
      startingPoint = "Proactive Planning";
      resources = [
        { title: "Planning Ahead Checklist", href: "/resources/plan-ahead", desc: "Essential documents and conversations." },
        { title: "Estate Planning Basics", href: "/resources/estate-planning", desc: "Wills, trusts, and powers of attorney." }
      ];
      experts = ["Estate Planning Attorney", "Financial Planner"];
      break;
    case "loss":
      startingPoint = "Navigating a Loss";
      resources = [
        { title: "After a Loved One Passes", href: "/resources/after-passing", desc: "Immediate steps and probate process." }
      ];
      experts = ["Probate Attorney", "Estate Planning Attorney"];
      break;
    case "self":
      startingPoint = "Self-Planning";
      resources = [
        { title: "Planning Ahead", href: "/resources/plan-ahead", desc: "Preparing for your own future care needs." },
        { title: "Estate Planning", href: "/resources/estate-planning", desc: "Ensuring your wishes are documented." }
      ];
      experts = ["Elder Law Attorney", "Financial Planner"];
      break;
    default:
      startingPoint = "Getting Started";
      resources = [{ title: "General Resources", href: "/resources", desc: "Browse all guides." }];
      experts = ["Elder Law Attorney"];
  }

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="inline-flex items-center justify-center p-3 bg-green-100 text-green-700 rounded-full mb-6">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-secondary mb-4">Your Personalized Guide</h1>
          <p className="text-lg text-muted-foreground">Based on your answers, here is your clear path forward.</p>
        </div>

        <div className="grid gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
          <div className="bg-card border border-card-border rounded-2xl p-8 shadow-sm">
            <h2 className="font-serif text-2xl font-semibold text-secondary mb-6 flex items-center border-b pb-4">
              <span className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm mr-3">1</span>
              Recommended Reading
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {resources.map((res, i) => (
                <Link key={i} href={res.href}>
                  <div className="block border border-border rounded-xl p-5 hover:border-primary hover:shadow-md transition-all h-full group bg-background">
                    <h3 className="font-medium text-lg text-secondary group-hover:text-primary transition-colors mb-2">{res.title}</h3>
                    <p className="text-sm text-muted-foreground">{res.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-6 text-center">
              <Link href="/resources">
                <Button variant="outline" className="text-secondary">Browse All Resources</Button>
              </Link>
            </div>
          </div>

          <div className="bg-card border border-card-border rounded-2xl p-8 shadow-sm">
            <h2 className="font-serif text-2xl font-semibold text-secondary mb-6 flex items-center border-b pb-4">
              <span className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm mr-3">2</span>
              Experts to Consult
            </h2>
            <p className="text-muted-foreground mb-6">We recommend speaking with these professionals for your specific situation:</p>
            <div className="flex flex-wrap gap-3 mb-8">
              {experts.map((exp, i) => (
                <div key={i} className="bg-secondary/10 text-secondary px-4 py-2 rounded-lg font-medium">
                  {exp}
                </div>
              ))}
            </div>
            <div className="text-center">
              <Link href="/experts">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 w-full sm:w-auto">
                  Find an Expert in NJ
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
