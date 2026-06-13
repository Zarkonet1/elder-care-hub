import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ArrowRight, CheckCircle2, AlertTriangle, FileText, Phone, BookOpen, Users } from "lucide-react";

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

interface ResultPath {
  headline: string;
  introCopy: string;
  actionPlan: string[];
  documents: string[];
  whoToCall: { type: string; reason: string }[];
  resources: { title: string; href: string; desc: string }[];
  experts: string[];
}

const RESULT_PATHS: Record<string, ResultPath> = {
  loss: {
    headline: "Here's What to Do Now",
    introCopy: "The steps after a loved one passes can feel overwhelming — but they have an order, and following that order protects everyone. Here is what matters most right now.",
    actionPlan: [
      "Get 10–12 certified copies of the death certificate from the funeral home — you will need more than you expect.",
      "Notify Social Security immediately — call 1-800-772-1213. Any payments received after the date of death must be returned.",
      "Locate the will or trust — if you don't know where it is, contact the attorney who drafted it.",
      "Do NOT distribute any assets yet — even if the will seems straightforward, probate or legal steps must come first.",
      "Open an estate bank account to receive incoming funds and pay estate expenses.",
      "Identify and secure all property — change locks if needed and notify homeowner's insurance of the death.",
    ],
    documents: [
      "Will or trust document",
      "Certified death certificates (get at least 10–12)",
      "Social Security card",
      "Medicare and insurance cards",
      "Financial account statements (bank, investment, retirement)",
      "Property deeds and vehicle titles",
      "Life insurance policies",
      "Last 2 years of tax returns",
    ],
    whoToCall: [
      { type: "Estate or Probate Attorney", reason: "Required before distributing any assets" },
      { type: "Bank or Financial Institutions", reason: "To notify of death and understand next steps" },
      { type: "Life Insurance Companies", reason: "To file claims — there are deadlines" },
    ],
    resources: [
      { title: "After a Loved One Passes", href: "/resources/after-passing", desc: "Practical guidance for the steps that can't wait — and the ones that can." },
      { title: "Getting Affairs in Order", href: "/resources/estate-planning", desc: "Understanding wills, trusts, and estate documents in plain English." },
    ],
    experts: ["Probate Attorney", "Estate Planning Attorney"],
  },

  crisis: {
    headline: "Here's Where to Start — Right Now",
    introCopy: "You're dealing with something urgent, and that's exactly what this platform is built for. These steps are ordered by priority. Start at the top.",
    actionPlan: [
      "Find out if the hospital admission is classified as \"inpatient\" or \"observation status\" — ask the charge nurse directly. This affects Medicare coverage significantly.",
      "Ask to speak with the hospital's discharge planner or social worker today — don't wait for them to come to you.",
      "Locate the Medicare card and any supplemental insurance cards now.",
      "Find out if a Durable Power of Attorney exists and where it is.",
      "Designate one family member as the single point of contact for the medical team — multiple voices create confusion.",
      "Do not accept the first discharge plan presented without asking questions — you have the right to request more time and evaluate options.",
    ],
    documents: [
      "Medicare card and any Medicare Advantage or supplement plan information",
      "Durable Power of Attorney",
      "Healthcare Proxy / Healthcare Power of Attorney",
      "Advance Directive / Living Will",
      "List of current medications and dosages",
    ],
    whoToCall: [
      { type: "Hospital Social Worker", reason: "Ask for them by name — today" },
      { type: "Elder Law Attorney", reason: "If Medicaid, asset protection, or legal documents are a concern" },
      { type: "Geriatric Care Manager", reason: "For an independent advocate to evaluate care options quickly" },
    ],
    resources: [
      { title: "I'm In Crisis Right Now", href: "/resources/crisis", desc: "Immediate steps when a parent is hospitalized or urgent care is needed." },
      { title: "Understanding Medicare & Medicaid", href: "/resources/medicare-medicaid", desc: "Coverage basics for hospital stays and rehabilitation." },
    ],
    experts: ["Elder Law Attorney", "Geriatric Care Manager"],
  },

  ongoing: {
    headline: "Here's Your Path Forward",
    introCopy: "Managing ongoing care involves a lot of moving parts — coverage, cost, care quality, and legal protection. Here's where to focus your energy.",
    actionPlan: [
      "Request a written care plan from the current provider — if one doesn't exist, ask for it in writing.",
      "Understand exactly what Medicare is covering vs. what you are paying out of pocket — most families are surprised by the gaps.",
      "Research whether your loved one may qualify for Medicaid — even if they have assets, planning now protects more than waiting.",
      "Evaluate whether the current care setting is the right long-term fit given projected needs and costs.",
      "Confirm all legal documents are in place — Durable POA, Healthcare Proxy, and an up-to-date will.",
      "Create a contact list of all providers, insurers, and agencies involved in care — keep one copy at home and one digital.",
    ],
    documents: [
      "Current care agreements and care plan",
      "Medicare Summary Notices",
      "Insurance policies (Medicare supplement, long-term care)",
      "Durable Power of Attorney",
      "Financial account summary",
    ],
    whoToCall: [
      { type: "Geriatric Care Manager", reason: "For independent care coordination and options assessment" },
      { type: "Elder Law Attorney", reason: "For Medicaid planning before assets are spent down" },
      { type: "NJ SHIP Counselor (free)", reason: "For Medicare questions — call 1-800-792-8820" },
    ],
    resources: [
      { title: "We Need Ongoing Care", href: "/resources/ongoing-care", desc: "Managing home care, assisted living, or nursing home decisions." },
      { title: "Understanding Medicare & Medicaid", href: "/resources/medicare-medicaid", desc: "Making the most of your coverage for ongoing care." },
    ],
    experts: ["Geriatric Care Manager", "Elder Law Attorney", "Medicare Specialist"],
  },

  planning: {
    headline: "Here's Where to Begin",
    introCopy: "Getting affairs in order is one of the most valuable things you can do for your family. Here's a clear sequence — start with the most protective documents first.",
    actionPlan: [
      "Make sure a Durable Power of Attorney is in place — this is the single most important document if something unexpected happens.",
      "Complete a Healthcare Proxy / Healthcare Power of Attorney designating who makes medical decisions.",
      "Create or update a will — if there is a trust, make sure it is properly funded.",
      "Create a simple one-page document listing all accounts, policies, and where to find everything — leave it somewhere your family can find.",
      "Review all beneficiary designations on retirement accounts and life insurance — these override the will and are often outdated.",
      "Tell at least one trusted person where your important documents are kept.",
    ],
    documents: [
      "Durable Power of Attorney",
      "Healthcare Proxy / Healthcare POA",
      "Will or Trust (and confirm trust is funded)",
      "Beneficiary designation forms for all retirement accounts and life insurance",
      "Account and policy summary document",
    ],
    whoToCall: [
      { type: "Estate Planning Attorney", reason: "To draft or update documents" },
      { type: "Financial Advisor", reason: "To review and update beneficiary designations" },
    ],
    resources: [
      { title: "Getting Affairs in Order", href: "/resources/estate-planning", desc: "The five essential documents every adult needs, explained in plain English." },
      { title: "Planning Ahead", href: "/resources/plan-ahead", desc: "Essential conversations and preparations before a crisis arrives." },
    ],
    experts: ["Estate Planning Attorney", "Financial Planner"],
  },

  self: {
    headline: "Here's Your Starting Point",
    introCopy: "Planning for your own future care — while you can make your own decisions — is one of the most thoughtful things you can do for yourself and your family. Here is where to begin.",
    actionPlan: [
      "Understand your Medicare enrollment windows now — missing the Initial Enrollment Period results in permanent premium penalties.",
      "Research long-term care costs in your area — in New Jersey, nursing home care averages over $12,000/month.",
      "Evaluate whether long-term care insurance makes sense for your situation — it is far cheaper to buy at 60 than at 70.",
      "Make sure all legal documents are in place: Durable POA, Healthcare Proxy, will or trust.",
      "Have a direct conversation with family about your wishes, and make sure at least one person knows where your important documents are.",
      "Consider a free Medicare counseling session through NJ SHIP — call 1-800-792-8820.",
    ],
    documents: [
      "Durable Power of Attorney",
      "Healthcare Proxy / Healthcare POA",
      "Will or Trust",
      "Medicare card and current coverage summary",
      "Long-term care insurance policy (if you have one)",
    ],
    whoToCall: [
      { type: "Elder Law Attorney", reason: "For Medicaid planning and legal documents" },
      { type: "Medicare Specialist", reason: "To review current or upcoming coverage" },
      { type: "Financial Planner (eldercare)", reason: "To evaluate long-term care funding options" },
    ],
    resources: [
      { title: "Planning Ahead", href: "/resources/plan-ahead", desc: "Preparing for your own future care needs, on your terms." },
      { title: "Understanding Medicare & Medicaid", href: "/resources/medicare-medicaid", desc: "Enrollment windows, coverage options, and NJ-specific guidance." },
    ],
    experts: ["Elder Law Attorney", "Medicare Specialist", "Financial Planner"],
  },
};

const DEFAULT_PATH: ResultPath = {
  headline: "Here's Where to Start",
  introCopy: "Based on what you told us, here are the most important things to focus on right now.",
  actionPlan: [
    "Review the resource sections that match your situation.",
    "Confirm that key legal documents are in place: Durable Power of Attorney, Healthcare Proxy, and a will.",
    "Connect with a vetted expert when you're ready for a real conversation.",
  ],
  documents: ["Power of Attorney", "Healthcare Proxy", "Will or Trust"],
  whoToCall: [{ type: "Elder Law Attorney", reason: "The most broadly useful first call for most eldercare situations" }],
  resources: [{ title: "Browse All Resources", href: "/resources", desc: "Explore all our eldercare guidance topics." }],
  experts: ["Elder Law Attorney"],
};

function Results({ answers }: { answers: any }) {
  const [, navigate] = useLocation();
  const path: ResultPath = RESULT_PATHS[answers.situation as string] ?? DEFAULT_PATH;

  const handleGetMatched = () => {
    localStorage.setItem("clearpath_assessment", JSON.stringify(answers));
    navigate("/intake");
  };
  const isUrgent = answers.urgency === "extremely";

  return (
    <div className="min-h-screen bg-background py-12 pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="text-center mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-accent/20 rounded-full mb-5">
            <CheckCircle2 className="w-7 h-7 text-accent" />
          </div>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-secondary mb-3">
            {path.headline}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {path.introCopy}
          </p>
        </div>

        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">

          {/* Urgent alert banner */}
          {isUrgent && (
            <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl px-5 py-4">
              <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-red-800 text-sm leading-relaxed font-medium">
                You indicated this is urgent. Start with Step 1 right now — everything else can follow.
              </p>
            </div>
          )}

          {/* 1. Action Plan */}
          <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
            <div className="bg-secondary px-7 py-5 flex items-center gap-3">
              <ArrowRight className="w-5 h-5 text-primary flex-shrink-0" />
              <h2 className="font-serif text-xl font-semibold text-secondary-foreground">Your Action Plan</h2>
            </div>
            <div className="px-7 py-6 space-y-4">
              {path.actionPlan.map((step, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center font-bold text-primary text-sm mt-0.5">
                    {i + 1}
                  </div>
                  <p className="text-foreground leading-relaxed pt-1">{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 2. Documents to Find */}
          <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
            <div className="bg-secondary/5 border-b border-border px-7 py-5 flex items-center gap-3">
              <FileText className="w-5 h-5 text-accent flex-shrink-0" />
              <h2 className="font-serif text-xl font-semibold text-secondary">Documents to Find</h2>
            </div>
            <ul className="px-7 py-6 space-y-2.5">
              {path.documents.map((doc, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 flex-shrink-0" />
                  <span className="text-foreground leading-relaxed">{doc}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Who to Call First */}
          <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
            <div className="bg-secondary/5 border-b border-border px-7 py-5 flex items-center gap-3">
              <Phone className="w-5 h-5 text-accent flex-shrink-0" />
              <h2 className="font-serif text-xl font-semibold text-secondary">Who to Call First</h2>
            </div>
            <div className="px-7 py-6 space-y-3">
              {path.whoToCall.map((contact, i) => (
                <div key={i} className="flex items-start gap-4 bg-background border border-border rounded-xl px-4 py-3.5">
                  <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-secondary text-sm">{contact.type}</p>
                    <p className="text-muted-foreground text-sm leading-relaxed">{contact.reason}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 4. Relevant Resources */}
          <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
            <div className="bg-secondary/5 border-b border-border px-7 py-5 flex items-center gap-3">
              <BookOpen className="w-5 h-5 text-accent flex-shrink-0" />
              <h2 className="font-serif text-xl font-semibold text-secondary">Relevant Resources</h2>
            </div>
            <div className="px-7 py-6 grid sm:grid-cols-2 gap-4">
              {path.resources.map((res, i) => (
                <Link key={i} href={res.href}>
                  <div className="border border-border rounded-xl p-5 hover:border-primary hover:shadow-md transition-all h-full group bg-background cursor-pointer">
                    <h3 className="font-serif font-semibold text-base text-secondary group-hover:text-primary transition-colors mb-1.5">
                      {res.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{res.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
            <div className="px-7 pb-6 text-center">
              <Link href="/resources">
                <Button variant="outline" size="sm" className="text-secondary border-secondary/30 hover:border-secondary">
                  Browse All Resources
                </Button>
              </Link>
            </div>
          </div>

          {/* 5. Experts Who Can Help */}
          <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
            <div className="bg-secondary/5 border-b border-border px-7 py-5 flex items-center gap-3">
              <Users className="w-5 h-5 text-accent flex-shrink-0" />
              <h2 className="font-serif text-xl font-semibold text-secondary">Experts Who Can Help</h2>
            </div>
            <div className="px-7 py-6">
              <p className="text-muted-foreground mb-5 text-sm leading-relaxed">
                When you're ready for a real conversation, these are the professionals to speak with first.
              </p>
              <div className="flex flex-wrap gap-3 mb-6">
                {path.experts.map((exp, i) => (
                  <div key={i} className="bg-secondary/10 text-secondary px-4 py-2 rounded-lg font-medium text-sm">
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

          {/* Get Matched CTA */}
          <div className="bg-[#FDF6E8] border border-primary/20 rounded-2xl px-7 py-8 text-center">
            <h2 className="font-serif text-2xl font-bold text-secondary mb-3">
              Want Personalized Help?
            </h2>
            <p className="text-muted-foreground leading-relaxed max-w-lg mx-auto mb-6">
              Answer a few more questions and we'll prepare a brief summary of your situation — so a professional already understands your case before you ever speak to them. No names required. Takes about 3 minutes.
            </p>
            <Button
              size="lg"
              onClick={handleGetMatched}
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 w-full sm:w-auto"
            >
              Get Matched with a Professional
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

        </div>
      </div>
    </div>
  );
}
