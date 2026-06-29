import { useState, useEffect } from "react";
import { useLocation, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ArrowRight, CheckCircle2, Shield, FileText, Users, Lightbulb,
  ClipboardList, Phone, AlertTriangle, ListOrdered, UserCheck,
  MapPin, Home, HeartPulse, Activity, PlusCircle, Link2, Check,
  ExternalLink, Printer, BookOpen,
} from "lucide-react";
import { generateBrief, type Brief, type StateContext, type ExecutorTask, type ResourceLink, type AssessmentAnswers, type IntakeAnswers } from "@/lib/brief-generator";

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

const TIMEFRAME_LABELS: Record<ExecutorTask["timeframe"], string> = {
  "immediate": "Within 24–72 Hours",
  "first-week": "First Week",
  "first-month": "First Month",
  "ongoing": "Ongoing (Months 2–12)",
};

function ExecutorChecklist({ tasks }: { tasks: ExecutorTask[] }) {
  const grouped = tasks.reduce<Record<string, ExecutorTask[]>>((acc, t) => {
    if (!acc[t.timeframe]) acc[t.timeframe] = [];
    acc[t.timeframe].push(t);
    return acc;
  }, {});

  const order: ExecutorTask["timeframe"][] = ["immediate", "first-week", "first-month", "ongoing"];

  return (
    <div className="space-y-6">
      {order.filter((tf) => grouped[tf]?.length).map((tf) => (
        <div key={tf}>
          <p className="text-xs font-semibold tracking-wider text-accent uppercase mb-3">
            {TIMEFRAME_LABELS[tf]}
          </p>
          <div className="space-y-3">
            {grouped[tf].map((task, i) => (
              <div key={i} className="flex items-start gap-3 bg-secondary/5 border border-border rounded-xl px-4 py-3">
                <span className="flex-shrink-0 w-5 h-5 rounded border-2 border-border mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-foreground leading-snug">{task.task}</p>
                  {task.notes && (
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{task.notes}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// Render text with phone numbers and URLs as clickable links
function renderWithLinks(text: string): React.ReactNode {
  const pattern = /(\b1-\d{3}-\d{3}-\d{4}\b|\bhttps?:\/\/\S+\b|\b(?:www\.)\S+\b)/g;
  const parts = text.split(pattern);
  return parts.map((part, i) => {
    if (/^1-\d{3}-\d{3}-\d{4}$/.test(part)) {
      return <a key={i} href={`tel:${part.replace(/-/g, "")}`} className="text-primary underline hover:text-primary/80 font-medium">{part}</a>;
    }
    if (/^https?:\/\//.test(part) || /^www\./.test(part)) {
      const href = part.startsWith("http") ? part : `https://${part}`;
      return <a key={i} href={href} target="_blank" rel="noopener noreferrer" className="text-primary underline hover:text-primary/80">{part}</a>;
    }
    return <span key={i}>{part}</span>;
  });
}

function ResourceLinksPanel({ links }: { links: ResourceLink[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {links.map((link, i) => (
        <a
          key={i}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col gap-1 border border-border rounded-xl px-4 py-3 hover:border-primary/40 hover:bg-primary/3 transition-colors no-underline"
        >
          <div className="flex items-center justify-between gap-2">
            <span className="text-sm font-semibold text-primary group-hover:underline">{link.label}</span>
            <ExternalLink className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
          </div>
          <span className="text-xs text-muted-foreground leading-relaxed">{link.description}</span>
          {link.phone && (
            <a
              href={`tel:${link.phone.replace(/-/g, "")}`}
              onClick={(e) => e.stopPropagation()}
              className="text-xs text-primary font-medium mt-0.5 hover:underline w-fit"
            >
              {link.phone}
            </a>
          )}
        </a>
      ))}
    </div>
  );
}

function PrintableChecklist({ tasks }: { tasks: ExecutorTask[] }) {
  const grouped = tasks.reduce<Record<string, ExecutorTask[]>>((acc, t) => {
    if (!acc[t.timeframe]) acc[t.timeframe] = [];
    acc[t.timeframe].push(t);
    return acc;
  }, {});
  const order: ExecutorTask["timeframe"][] = ["immediate", "first-week", "first-month", "ongoing"];

  const handlePrint = () => {
    const win = window.open("", "_blank");
    if (!win) return;
    const html = `<!DOCTYPE html><html><head><title>Executor Checklist — ClearPath Navigator</title>
    <style>
      body { font-family: Arial, sans-serif; max-width: 720px; margin: 40px auto; color: #374151; }
      h1 { font-size: 22px; color: #1a1a2e; border-bottom: 3px solid #c9a84c; padding-bottom: 8px; margin-bottom: 24px; }
      h2 { font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: .06em; color: #4b6bfb; margin: 24px 0 10px; }
      .item { display: flex; gap: 12px; margin-bottom: 10px; padding: 10px 14px; border: 1px solid #e5e7eb; border-radius: 8px; background: #f9fafb; }
      .checkbox { width: 18px; height: 18px; border: 2px solid #d1d5db; border-radius: 3px; flex-shrink: 0; margin-top: 2px; }
      .task { font-size: 14px; font-weight: 600; color: #1a1a2e; margin-bottom: 4px; }
      .notes { font-size: 12px; color: #6b7280; line-height: 1.5; }
      .footer { margin-top: 40px; font-size: 11px; color: #9ca3af; border-top: 1px solid #e5e7eb; padding-top: 12px; }
      @media print { body { margin: 20px; } }
    </style></head><body>
    <h1>Executor Checklist</h1>
    ${order.filter(tf => grouped[tf]?.length).map(tf => `
      <h2>${TIMEFRAME_LABELS[tf]}</h2>
      ${grouped[tf].map(t => `
        <div class="item">
          <div class="checkbox"></div>
          <div>
            <div class="task">${t.task}</div>
            ${t.notes ? `<div class="notes">${t.notes}</div>` : ""}
          </div>
        </div>`).join("")}
    `).join("")}
    <div class="footer">Generated by ClearPath Navigator · clearpath-families.netlify.app · © 2026 ClearPath Navigator</div>
    </body></html>`;
    win.document.write(html);
    win.document.close();
    win.print();
  };

  return (
    <div>
      <div className="flex justify-end mb-4">
        <button
          onClick={handlePrint}
          className="inline-flex items-center gap-2 text-sm border border-border rounded-xl px-4 py-2 text-muted-foreground hover:text-secondary hover:border-secondary/40 transition-colors bg-card"
        >
          <Printer className="w-4 h-4" />
          Print / Download Checklist
        </button>
      </div>
      <div className="space-y-6">
        {order.filter((tf) => grouped[tf]?.length).map((tf) => (
          <div key={tf}>
            <p className="text-xs font-semibold tracking-wider text-accent uppercase mb-3">{TIMEFRAME_LABELS[tf]}</p>
            <div className="space-y-3">
              {grouped[tf].map((task, i) => (
                <div key={i} className="flex items-start gap-3 bg-secondary/5 border border-border rounded-xl px-4 py-3">
                  <span className="flex-shrink-0 w-5 h-5 rounded border-2 border-border mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-foreground leading-snug">{task.task}</p>
                    {task.notes && (
                      <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                        {renderWithLinks(task.notes)}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
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
          "executor-checklist",
          "situation-overview",
          "key-facts",
          "legal-documents",
          "real-property",
          "state-context",
          "family-context",
          "professional",
          "already-done",
          "resources",
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
          "medicare-context",
          "legal-documents",
          "key-facts",
          "family-context",
          "what-needed",
          "state-context",
          "real-property",
          "already-done",
          "resources",
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
          "medicare-context",
          "key-facts",
          "legal-documents",
          "professional",
          "state-context",
          "real-property",
          "family-context",
          "what-needed",
          "already-done",
          "resources",
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
          "medicare-context",
          "state-context",
          "real-property",
          "professional",
          "family-context",
          "what-needed",
          "already-done",
          "resources",
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
          "medicare-context",
          "key-facts",
          "legal-documents",
          "state-context",
          "real-property",
          "professional",
          "already-done",
          "resources",
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
    "medicare-context": "Medicare Coverage",
    "real-property": "Real Property",
    "already-done": "What's Already Been Done",
    "state-context": "State Reference Data",
    "resources": "Helpful Resources",
  }[key] ?? key;
}

// ---------------------------------------------------------------------------
// UUID + storage helpers
// ---------------------------------------------------------------------------

const BRIEF_TTL_MS = 90 * 24 * 60 * 60 * 1000; // 90 days

function generateUUID(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
}

function saveBrief(uuid: string, assessment: AssessmentAnswers, intake: IntakeAnswers) {
  const payload = {
    assessment,
    intake,
    createdAt: Date.now(),
    expiresAt: Date.now() + BRIEF_TTL_MS,
  };
  try {
    localStorage.setItem(`clearpath_brief_${uuid}`, JSON.stringify(payload));
  } catch {
    // localStorage quota exceeded — graceful no-op
  }
}

function loadBrief(uuid: string): { assessment: AssessmentAnswers; intake: IntakeAnswers } | null {
  try {
    const raw = localStorage.getItem(`clearpath_brief_${uuid}`);
    if (!raw) return null;
    const payload = JSON.parse(raw);
    if (payload.expiresAt && Date.now() > payload.expiresAt) {
      localStorage.removeItem(`clearpath_brief_${uuid}`);
      return null;
    }
    return { assessment: payload.assessment, intake: payload.intake };
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

interface BriefPageProps {
  id?: string;
}

export default function BriefPage({ id }: BriefPageProps) {
  const [, navigate] = useLocation();
  const [brief, setBrief] = useState<Brief | null>(null);
  const [situation, setSituation] = useState("default");
  const [briefId, setBriefId] = useState<string | null>(id ?? null);
  const [submitted, setSubmitted] = useState(false);
  const [connectName, setConnectName] = useState("");
  const [connectEmail, setConnectEmail] = useState("");
  const [connectSending, setConnectSending] = useState(false);
  const [connectError, setConnectError] = useState(false);
  const [error, setError] = useState(false);
  const [expired, setExpired] = useState(false);
  const [hasDepthAnswers, setHasDepthAnswers] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    document.title = "Your Situation Summary | ClearPath Navigator";
    window.scrollTo(0, 0);

    // ── Loading an existing brief by UUID ──────────────────────────────────
    if (id) {
      const saved = loadBrief(id);
      if (!saved) {
        setExpired(true);
        return;
      }
      const generated = generateBrief(saved.assessment, saved.intake);
      setBrief(generated);
      setSituation(saved.assessment.situation || "default");
      const depth = saved.intake.dementia || saved.intake.adlLevel || saved.intake.veteran || saved.intake.spouse;
      setHasDepthAnswers(!!depth);
      return;
    }

    // ── Generating a new brief ─────────────────────────────────────────────
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

      // Save and navigate to UUID URL
      const uuid = generateUUID();
      saveBrief(uuid, assessment, intake);
      setBriefId(uuid);
      navigate(`/brief/${uuid}`, { replace: true });

      fetch("/api/send-brief", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ brief: generated }),
      }).catch(() => {});
    } catch {
      setError(true);
    }
  }, [id]);

  const handleCopyLink = () => {
    const url = `${window.location.origin}/brief/${briefId}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  if (expired) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <h1 className="font-serif text-2xl font-bold text-secondary mb-4">This brief has expired</h1>
          <p className="text-muted-foreground mb-6">
            Briefs are saved for 90 days on the device where they were created. This one is no longer available — but you can generate a new one in just a few minutes.
          </p>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90" onClick={() => navigate("/start")}>
            Create a New Brief
          </Button>
        </div>
      </div>
    );
  }

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
    "medicare-context": brief.medicareContext ? {
      key: "medicare-context",
      icon: <Activity className="w-5 h-5 text-accent" />,
      label: getSectionLabel("medicare-context", situation),
      content: <p className="text-foreground leading-relaxed">{brief.medicareContext}</p>,
    } : null,
    "real-property": brief.realPropertyContext ? {
      key: "real-property",
      icon: <Home className="w-5 h-5 text-accent" />,
      label: getSectionLabel("real-property", situation),
      content: <p className="text-foreground leading-relaxed">{brief.realPropertyContext}</p>,
    } : null,
    "executor-checklist": brief.executorChecklist ? {
      key: "executor-checklist",
      icon: <ClipboardList className="w-5 h-5 text-accent" />,
      label: "Executor Checklist",
      content: <PrintableChecklist tasks={brief.executorChecklist} />,
    } : null,
    "resources": brief.resourceLinks.length > 0 ? {
      key: "resources",
      icon: <BookOpen className="w-5 h-5 text-accent" />,
      label: getSectionLabel("resources", situation),
      content: <ResourceLinksPanel links={brief.resourceLinks} />,
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
          <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed mb-5">{config.subtitle}</p>
          {briefId && (
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-2 text-sm border border-border rounded-xl px-4 py-2 text-muted-foreground hover:text-secondary hover:border-secondary/40 transition-colors bg-card"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-accent" />
                  Link copied
                </>
              ) : (
                <>
                  <Link2 className="w-4 h-4" />
                  Copy shareable link
                </>
              )}
            </button>
          )}
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
            {!submitted ? (
              <>
                <h2 className="font-serif text-xl font-bold text-secondary mb-2 text-center">Connect Me with a Professional</h2>
                <p className="text-sm text-muted-foreground leading-relaxed text-center max-w-lg mx-auto mb-6">
                  Enter your name and email and we'll forward your brief to a professional in your area. They'll review it before reaching out — so they already understand your situation when you speak.
                </p>
                <form
                  className="max-w-sm mx-auto space-y-4"
                  onSubmit={async (e) => {
                    e.preventDefault();
                    setConnectSending(true);
                    setConnectError(false);
                    try {
                      const res = await fetch("/api/send-brief", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          brief,
                          contact: { name: connectName, email: connectEmail },
                        }),
                      });
                      if (!res.ok) throw new Error("send failed");
                      setSubmitted(true);
                    } catch {
                      setConnectError(true);
                    } finally {
                      setConnectSending(false);
                    }
                  }}
                >
                  <div className="space-y-1.5">
                    <Label htmlFor="connect-name" className="text-sm font-medium text-secondary">First name</Label>
                    <Input
                      id="connect-name"
                      type="text"
                      placeholder="Your first name"
                      value={connectName}
                      onChange={(e) => setConnectName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="connect-email" className="text-sm font-medium text-secondary">Email address</Label>
                    <Input
                      id="connect-email"
                      type="email"
                      placeholder="you@example.com"
                      value={connectEmail}
                      onChange={(e) => setConnectEmail(e.target.value)}
                      required
                    />
                  </div>
                  {connectError && (
                    <p className="text-sm text-red-600 text-center">Something went wrong — please try again.</p>
                  )}
                  <Button
                    type="submit"
                    size="lg"
                    disabled={connectSending}
                    className="bg-primary text-primary-foreground hover:bg-primary/90 w-full"
                  >
                    {connectSending ? "Sending…" : "Send My Brief"}
                    {!connectSending && <ArrowRight className="w-4 h-4 ml-2" />}
                  </Button>
                  <p className="text-xs text-muted-foreground text-center">
                    Your contact info is only shared when you submit this form. No spam.
                  </p>
                </form>
              </>
            ) : (
              <div className="text-center">
                <CheckCircle2 className="w-10 h-10 text-accent mx-auto mb-4" />
                <h3 className="font-serif text-xl font-bold text-secondary mb-2">You're all set, {connectName}.</h3>
                <p className="text-muted-foreground leading-relaxed max-w-md mx-auto">
                  Your brief has been sent. A professional will review your situation and reach out to {connectEmail} if they're a good fit.
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

          <div className="border-t border-border pt-6 mt-2">
            <p className="text-xs text-muted-foreground leading-relaxed text-center max-w-2xl mx-auto">
              <span className="font-semibold text-secondary">Disclaimer:</span> ClearPath provides educational guidance only. Nothing in this brief constitutes legal, financial, medical, or professional advice. Information about Medicare, Medicaid, estate planning, and probate is general in nature and may not reflect your state's current laws or your specific circumstances. Always consult a qualified attorney, financial advisor, or healthcare professional before making decisions.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
