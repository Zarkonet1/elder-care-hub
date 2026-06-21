import { useState, useEffect } from "react";
import { useLocation, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Shield, FileText, Users, Lightbulb, ClipboardList, Phone, AlertTriangle, ListOrdered, UserCheck, MapPin, Home, HeartPulse, PlusCircle } from "lucide-react";
import { generateBrief, type Brief, type StateContext, type AssessmentAnswers, type IntakeAnswers } from "@/lib/brief-generator";

interface BriefSection {
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

export default function Brief() {
  const [, navigate] = useLocation();
  const [brief, setBrief] = useState<Brief | null>(null);
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
      // Check if any tier 2 depth fields are filled
      const depth = intake.dementia || intake.adlLevel || intake.veteran || intake.spouse;
      setHasDepthAnswers(!!depth);

      // Fire-and-forget: email the brief silently
      fetch("/api/send-brief", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ brief: generated }),
      }).catch(() => {
        // Non-blocking — email failure doesn't affect the user experience
      });
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
          <Button
            className="bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={() => navigate("/start")}
          >
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

  const sections: BriefSection[] = [
    {
      icon: <ListOrdered className="w-5 h-5 text-accent" />,
      label: "Priority Action List",
      content: <PriorityActionList actions={brief.priorityActions} />,
    },
    {
      icon: <ClipboardList className="w-5 h-5 text-accent" />,
      label: "Situation Overview",
      content: <p className="text-foreground leading-relaxed">{brief.situationOverview}</p>,
    },
    {
      icon: <FileText className="w-5 h-5 text-accent" />,
      label: "Key Facts",
      content: <KeyFactsGrid facts={brief.keyFacts} />,
    },
    {
      icon: <Shield className="w-5 h-5 text-accent" />,
      label: "Legal Documents",
      content: <LegalColumns inPlace={brief.legalInPlace} missing={brief.legalMissing} />,
    },
    {
      icon: <Users className="w-5 h-5 text-accent" />,
      label: "Family Context",
      content: <p className="text-foreground leading-relaxed">{brief.familyContext}</p>,
    },
    {
      icon: <Lightbulb className="w-5 h-5 text-accent" />,
      label: "What's Needed",
      content: <p className="text-foreground leading-relaxed">{brief.whatNeeded}</p>,
    },
    {
      icon: <UserCheck className="w-5 h-5 text-accent" />,
      label: "Recommended Professional",
      content: (
        <div>
          <p className="text-sm font-semibold text-primary mb-2">{brief.professionalMatch.type}</p>
          <p className="text-foreground leading-relaxed text-sm">{brief.professionalMatch.reason}</p>
        </div>
      ),
    },
    ...(brief.healthContext ? [{
      icon: <HeartPulse className="w-5 h-5 text-accent" />,
      label: "Health & Care Context",
      content: <p className="text-foreground leading-relaxed">{brief.healthContext}</p>,
    }] : []),
    ...(brief.realPropertyContext ? [{
      icon: <Home className="w-5 h-5 text-accent" />,
      label: "Real Property",
      content: <p className="text-foreground leading-relaxed">{brief.realPropertyContext}</p>,
    }] : []),
    {
      icon: <Phone className="w-5 h-5 text-accent" />,
      label: "What's Already Been Done",
      content: <p className="text-foreground leading-relaxed">{brief.alreadyDone}</p>,
    },
    ...(brief.stateContext ? [{
      icon: <MapPin className="w-5 h-5 text-accent" />,
      label: "State Reference Data",
      content: <StateContextPanel ctx={brief.stateContext} />,
    }] : []),
  ];

  return (
    <div className="min-h-screen bg-background py-12 pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">

        <div className="text-center mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-accent/20 rounded-full mb-5">
            <CheckCircle2 className="w-7 h-7 text-accent" />
          </div>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-secondary mb-3">
            Your Situation Summary
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
            This is what a professional will see before speaking with you. No personal identifying information is included.
          </p>
        </div>

        <div className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">

          {brief.redFlags.length > 0 && (
            <RedFlagsBanner flags={brief.redFlags} />
          )}

          {sections.map((section, i) => (
            <div key={i} className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
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
