import { useState, useEffect } from "react";
import { useLocation, Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  ArrowRight, CheckCircle2, Shield, FileText, Users, Lightbulb,
  ClipboardList, Phone, AlertTriangle, ListOrdered, UserCheck,
  MapPin, Home, HeartPulse, PlusCircle,
} from "lucide-react";
import { generateBrief, type Brief, type StateContext, type AssessmentAnswers, type IntakeAnswers } from "@/lib/brief-generator";

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

interface BriefSection {
  key: string;
  icon: React.ReactNode;
  label: string;
  content: React.ReactNode;
}

function KeyFactsGrid({ facts }: { facts: Brief["keyFacts"] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
      {facts.map((f) => (
        <div key={f.label} className="flex justify-between items-baseline border-b border-border pb-2">
          <span className="text-sm text-muted-foreground font-medium">{f.label}</span>
          <span className="text-sm text-foreground font-semibold text-right ml-3">{f.value}</span>
        </div>
      ))}
    </div>
  );
}

function LegalColumns({ inPlace, missing }: { inPlace: string[]; missing: string[] }) {
  return (
    <div className="grid sm:grid-cols-2 gap-4">
      <div>
        <p className="text-xs font-semibold tracking-wider text-accent uppercase mb-3">In Place</p>
        {inPlace.length === 0 ? (
          <p className="text-sm text-muted-foreground italic">None confirmed</p>
        ) : (
          <ul className="space-y-2">
            {inPlace.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-foreground">
                <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div>
        <p className="text-xs font-semibold tracking-wider text-red-500 uppercase mb-3">Missing or Unknown</p>
        {missing.length === 0 ? (
          <p className="text-sm text-muted-foreground italic">Nothing identified</p>
        ) : (
          <ul className="space-y-2">
            {missing.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-foreground">
                <span className="w-4 h-4 flex-shrink-0 mt-0.5 flex items-center justify-center">
                  <span className="w-2 h-2 rounded-full bg-red-400 mt-0.5" />
                </span>
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function PriorityActionList({ actions }: { actions: string[] }) {
  return (
    <ol className="space-y-3">
      {actions.map((action, i) => (
        <li key={i} className="flex items-start gap-4">
          <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary/10 text-primary text-sm font-bold flex items-center justify-center mt-0.5">
            {i + 1}
          </span>
          <span className="text-sm text-foreground leading-relaxed pt-1">{action}</span>
        </li>
      ))}
    </ol>
  );
}

function StateContextPanel({ ctx }: { ctx: StateContext }) {
  return (
    <div className="space-y-5">
      {ctx.medicaid && (
        <div>
          <p className="text-xs font-semibold tracking-wider text-accent uppercase mb-3">Medicaid Reference (2026)</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 mb-3">
            <div className="flex justify-between items-baseline border-b border-border pb-2">
              <span className="text-sm text-muted-foreground font-medium">Individual asset limit</span>
              <span className="text-sm font-semibold text-foreground">{ctx.medicaid.assetLimit}</span>
            </div>
            <div className="flex justify-between items-baseline border-b border-border pb-2">
              <span className="text-sm text-muted-foreground font-medium">Monthly income limit</span>
              <span className="text-sm font-semibold text-foreground">{ctx.medicaid.incomeLimit}</span>
            </div>
            {ctx.medicaid.csra !== "N/A — no spouse" && (
              <div className="flex justify-between items-baseline border-b border-border pb-2 sm:col-span-2">
                <span className="text-sm text-muted-foreground font-medium">Spouse may keep (CSRA)</span>
                <span className="text-sm font-semibold text-foreground">{ctx.medicaid.csra}</span>
              </div>
            )}
          </div>
          {ctx.medicaid.assetComparison && (
            <p className="text-sm text-amber-800 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 leading-relaxed mb-3">{ctx.medicaid.assetComparison}</p>
          )}
          <p className="text-xs text-muted-foreground leading-relaxed">{ctx.medicaid.lookbackNote}</p>
          {ctx.medicaid.notes && (
            <p className="text-xs text-muted-foreground leading-relaxed mt-2 italic">{ctx.medicaid.notes}</p>
          )}
        </div>
      )}
      {ctx.probate && (
        <div>
          <p className="text-xs font-semibold tracking-wider text-accent uppercase mb-3">Probate Reference</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 mb-3">
            <div className="flex justify-between items-baseline border-b border-border pb-2">
              <span className="text-sm text-muted-foreground font-medium">Minimum waiting period</span>
              <span className="text-sm font-semibold text-foreground">{ctx.probate.minWait}</span>
            </div>
            <div className="flex justify-between items-baseline border-b border-border pb-2">
              <span className="text-sm text-muted-foreground font-medium">Court confirmation</span>
              <span className="text-sm font-semibold text-foreground">{ctx.probate.courtRequired ? "Required" : "May not be required"}</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">{ctx.probate.notes}</p>
        </div>
      )}
      {ctx.propertyTools && (
        <div>
          <p className="text-xs font-semibold tracking-wider text-accent uppercase mb-3">Property Planning Tools</p>
          <div className="flex justify-between items-baseline border-b border-border pb-2 mb-3">
            <span className="text-sm text-muted-foreground font-medium">Transfer on Death deed</span>
            <span className={`text-sm font-semibold ${
              ctx.propertyTools.todDeed.startsWith("Allowed") ? "text-green-700" :
              ctx.propertyTools.todDeed === "Lady Bird deed only" ? "text-amber-700" :
              ctx.propertyTools.todDeed === "Not allowed" ? "text-red-600" :
              "text-muted-foreground"
            }`}>{ctx.propertyTools.todDeed}</span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">{ctx.propertyTools.todDeedNote}</p>
        </div>
      )}
      <p className="text-xs text-muted-foreground border-t border-border pt-3 italic leading-relaxed">{ctx.disclaimer}</p>
    </div>
  );
}

function RedFlagsBanner({ flags }: { flags: string[] }) {
  if (flags.length === 0) return null;
  return (
    <div className="bg-red-50 border border-red-200 rounded-2xl shadow-sm overflow-hidden">
      <div className="bg-red-100/70 border-b border-red-200 px-7 py-5 flex items-center gap-3">
        <AlertTriangle className="w-5 h-5 text-red-600" />
        <h2 className="font-serif text-lg font-semibold text-red-800">
          {flags.length === 1 ? "Important Note" : "Important Notes"}
        </h2>
      </div>
      <div className="px-7 py-6 space-y-3">
        {flags.map((flag, i) => (
          <div key={i} className="flex items-start gap-3">
            <span className="flex-shrink-0 w-2 h-2 rounded-full bg-red-500 mt-2" />
            <p className="text-sm text-red-900 leading-relaxed">{flag}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Situation config
// ---------------------------------------------------------------------------

interface SituationConfig {
  badge: string;
  title: string;
  subtitle: string;
  sectionOrder: string[];
}

function getSituationConfig(situation: string): SituationConfig {
  switch (situation) {
    case "loss":
      return {
        badge: "Estate & Executor Summary",
        title: "Estate Summary",
        subtitle: "A professional overview of the estate, asset inventory, and next steps for the executor.",
        sectionOrder: [
          "priority-actions",
          "situation-overview",
          "key-facts",
          "legal-documents",
          "real-property",
          "state-context",
          "family-context",
          "professional",
          "already-done",
        ],
      };

    case "crisis":
      return {
        badge: "Urgent Care Coordination",
        title: "Urgent Situation Summary",
        subtitle: "A professional overview prepared for immediate care coordination. Share this with whoever you speak with first.",
        sectionOrder: [
          "priority-actions",
          "professional",
          "situation-overview",
          "health-context",
          "legal-documents",
          "key-facts",
          "family-context",
          "what-needed",
          "state-context",
          "real-property",
          "already-done",
        ],
      };

    case "ongoing":
      return {
        badge: "Ongoing Care Management",
        title: "Care Management Summary",
        subtitle: "A professional overview of current care needs, planning priorities, and financial context.",
        sectionOrder: [
          "priority-actions",
          "situation-overview",
          "health-context",
          "key-facts",
          "legal-documents",
          "professional",
          "state-context",
          "real-property",
          "family-context",
          "what-needed",
          "already-done",
        ],
      };

    case "planning":
      return {
        badge: "Planning & Preparation",
        title: "Planning Summary",
        subtitle: "A professional overview prepared for proactive legal and financial planning.",
        sectionOrder: [
          "priority-actions",
          "situation-overview",
          "key-facts",
          "legal-documents",
          "state-context",
          "real-property",
          "professional",
          "family-context",
          "what-needed",
          "already-done",
        ],
      };

    case "self":
      return {
        badge: "Personal Care Planning",
        title: "Personal Planning Summary",
        subtitle: "A professional overview of your current situation, health context, and planning priorities.",
        sectionOrder: [
          "priority-actions",
          "situation-overview",
          "health-context",
          "key-facts",
          "legal-documents",
          "state-context",
          "real-property",
          "professional",
          "already-done",
        ],
      };

    default:
      return {
        badge: "Situation Summary",
        title: "Your Situation Summary",
        subtitle: "This is what a professional will see before speaking with you.",
        sectionOrder: [
          "priority-actions", "situation-overview", "key-facts", "legal-documents",
          "health-context", "professional", "real-property", "family-context",
          "what-needed", "state-context", "already-done",
        ],
      };
  }
}

// ---------------------------------------------------------------------------
// Section label overrides per situation
// ---------------------------------------------------------------------------

function getSectionLabel(key: string, situation: string): string {
  if (key === "what-needed" && situation === "crisis") return "What's Needed Right Now";
  if (key === "professional" && situation === "crisis") return "Recommended First Call";
  if (key === "already-done" && situation === "loss") return "What's Been Done So Far";
  return {
    "priority-actions": "Priority Action List",
    "situation-overview": "Situation Overview",
    "key-facts": "Key Facts",
    "legal-documents": "Legal Documents",
    "family-context": "Family Context",
    "what-needed": "What's Needed",
    "professional": "Recommended Professional",
    "health-context": "Health & Care Context",
    "real-property": "Real Property",
    "already-done": "What's Already Been Done",
    "state-context": "State Reference Data",
  }[key] ?? key;
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export default function BriefPage() {
  const [, navigate] = useLocation();
  const [brief, setBrief] = useState<Brief | null>(null);
  const [situation, setSituation] = useState("default");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [hasDepthAnswers, setHasDepthAnswers] = useState(false);

  useEffect(() => {
    document.title = "Your Situation Summary | ClearPath Elder Guide";
    window.scrollTo(0, 0);

    const rawAssessment = localStorage.getItem("clearpath_assessment");
    const rawIntake = localStorage.getItem("clearpath_intake");

    if (!rawAssessment || !rawIntake) {
      setError(true);
      return;
    }

    try {
      const assessment: AssessmentAnswers = JSON.parse(rawAssessment);
      const intake: IntakeAnswers = JSON.parse(rawIntake);
      const generated = generateBrief(assessment, intake);
      setBrief(generated);
      setSituation(assessment.situation || "default");

      const depth = intake.dementia || intake.adlLevel || intake.veteran || intake.spouse;
      setHasDepthAnswers(!!depth);

      fetch("/api/send-brief", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ brief: generated }),
      }).catch(() => {});
    } catch {
      setError(true);
    }
  }, []);

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <h1 className="font-serif text-2xl font-bold text-secondary mb-4">Something went wrong</h1>
          <p className="text-muted-foreground mb-6">
            We weren't able to load your summary. Please complete the assessment and intake first.
          </p>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90" onClick={() => navigate("/start")}>
            Start Over
          </Button>
        </div>
      </div>
    );
  }

  if (!brief) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground text-sm">Preparing your summary…</p>
        </div>
      </div>
    );
  }

  const config = getSituationConfig(situation);

  // Build the full section map
  const allSections: Record<string, BriefSection | null> = {
    "priority-actions": {
      key: "priority-actions",
      icon: <ListOrdered className="w-5 h-5 text-accent" />,
      label: getSectionLabel("priority-actions", situation),
      content: <PriorityActionList actions={brief.priorityActions} />,
    },
    "situation-overview": {
      key: "situation-overview",
      icon: <ClipboardList className="w-5 h-5 text-accent" />,
      label: getSectionLabel("situation-overview", situation),
      content: <p className="text-foreground leading-relaxed">{brief.situationOverview}</p>,
    },
    "key-facts": {
      key: "key-facts",
      icon: <FileText className="w-5 h-5 text-accent" />,
      label: getSectionLabel("key-facts", situation),
      content: <KeyFactsGrid facts={brief.keyFacts} />,
    },
    "legal-documents": {
      key: "legal-documents",
      icon: <Shield className="w-5 h-5 text-accent" />,
      label: getSectionLabel("legal-documents", situation),
      content: <LegalColumns inPlace={brief.legalInPlace} missing={brief.legalMissing} />,
    },
    "family-context": {
      key: "family-context",
      icon: <Users className="w-5 h-5 text-accent" />,
      label: getSectionLabel("family-context", situation),
      content: <p className="text-foreground leading-relaxed">{brief.familyContext}</p>,
    },
    "what-needed": {
      key: "what-needed",
      icon: <Lightbulb className="w-5 h-5 text-accent" />,
      label: getSectionLabel("what-needed", situation),
      content: <p className="text-foreground leading-relaxed">{brief.whatNeeded}</p>,
    },
    "professional": {
      key: "professional",
      icon: <UserCheck className="w-5 h-5 text-accent" />,
      label: getSectionLabel("professional", situation),
      content: (
        <div>
          <p className="text-sm font-semibold text-primary mb-2">{brief.professionalMatch.type}</p>
          <p className="text-foreground leading-relaxed text-sm">{brief.professionalMatch.reason}</p>
        </div>
      ),
    },
    "health-context": brief.healthContext ? {
      key: "health-context",
      icon: <HeartPulse className="w-5 h-5 text-accent" />,
      label: getSectionLabel("health-context", situation),
      content: <p className="text-foreground leading-relaxed">{brief.healthContext}</p>,
    } : null,
    "real-property": brief.realPropertyContext ? {
      key: "real-property",
      icon: <Home className="w-5 h-5 text-accent" />,
      label: getSectionLabel("real-property", situation),
      content: <p className="text-foreground leading-relaxed">{brief.realPropertyContext}</p>,
    } : null,
    "already-done": {
      key: "already-done",
      icon: <Phone className="w-5 h-5 text-accent" />,
      label: getSectionLabel("already-done", situation),
      content: <p className="text-foreground leading-relaxed">{brief.alreadyDone}</p>,
    },
    "state-context": brief.stateContext ? {
      key: "state-context",
      icon: <MapPin className="w-5 h-5 text-accent" />,
      label: getSectionLabel("state-context", situation),
      content: <StateContextPanel ctx={brief.stateContext} />,
    } : null,
  };

  // Order sections per situation, filtering out nulls
  const orderedSections = config.sectionOrder
    .map((key) => allSections[key])
    .filter((s): s is BriefSection => s !== null && s !== undefined);

  return (
    <div className="min-h-screen bg-background py-12 pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">

        {/* Hero — situation-specific */}
        <div className="text-center mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-accent/20 rounded-full mb-5">
            <CheckCircle2 className="w-7 h-7 text-accent" />
          </div>
          <p className="text-xs font-semibold tracking-widest text-primary uppercase mb-3">{config.badge}</p>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-secondary mb-3">{config.title}</h1>
          <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">{config.subtitle}</p>
        </div>

        <div className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">

          {brief.redFlags.length > 0 && <RedFlagsBanner flags={brief.redFlags} />}

          {orderedSections.map((section) => (
            <div key={section.key} className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
              <div className="bg-secondary/5 border-b border-border px-7 py-5 flex items-center gap-3">
                {section.icon}
                <h2 className="font-serif text-lg font-semibold text-secondary">{section.label}</h2>
              </div>
              <div className="px-7 py-6">
                {section.content}
              </div>
            </div>
          ))}

          {!hasDepthAnswers && (
            <div className="bg-primary/5 border border-primary/20 rounded-2xl px-7 py-6 mt-4">
              <div className="flex items-start gap-4">
                <PlusCircle className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h3 className="font-serif text-lg font-semibold text-secondary mb-1">Want a more complete picture?</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    Answer 8–11 more questions about health, property details, and family context. Your brief will update automatically — takes about 2 minutes.
                  </p>
                  <Button
                    onClick={() => navigate("/intake/refine")}
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary/5"
                  >
                    Add more detail
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          )}

          <div className="bg-card border border-border rounded-2xl shadow-sm px-7 py-8 mt-4">
            <p className="text-sm text-muted-foreground italic mb-6 leading-relaxed text-center max-w-lg mx-auto">
              Your name, address, and contact information are not included in this summary. You control what gets shared and when.
            </p>

            {!submitted ? (
              <div className="text-center">
                <Button
                  size="lg"
                  onClick={() => setSubmitted(true)}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 w-full sm:w-auto"
                >
                  Connect Me with a Professional
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            ) : (
              <div className="bg-accent/10 border border-accent/30 rounded-xl px-6 py-5 text-center max-w-xl mx-auto">
                <CheckCircle2 className="w-8 h-8 text-accent mx-auto mb-3" />
                <p className="text-secondary font-medium leading-relaxed">
                  Thank you — your brief has been submitted. A professional in your area will review it and reach out if they're a good fit. This feature is coming soon — check back shortly.
                </p>
              </div>
            )}
          </div>

          <div className="text-center pt-2">
            <Link href="/experts">
              <span className="text-sm text-primary hover:underline cursor-pointer">
                Or browse our expert directory directly →
              </span>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
