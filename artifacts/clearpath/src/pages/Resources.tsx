import { useEffect, useState } from "react";
import { Link, useRoute } from "wouter";
import { Button } from "@/components/ui/button";
import { Search, ChevronRight, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";

interface QuestionGroup {
  label: string;
  items: string[];
}

interface Scenario {
  id: string;
  navLabel: string;
  title: string;
  orientation: string;
  keyThings: string[];
  questionGroups: QuestionGroup[];
  steps: string[];
  experts: string[];
}

const SCENARIOS: Scenario[] = [
  {
    id: "crisis",
    navLabel: "I'm In Crisis",
    title: "I'm In Crisis Right Now",
    orientation:
      "If something has just happened — a hospitalization, a sudden diagnosis, an urgent need for care — it can feel like the ground has shifted under you. You're being asked to make decisions you've never made before, about a system you've never had to understand, often while managing fear, grief, and exhaustion at the same time. This section tells you what to do first.",
    keyThings: [
      "The first 72 hours after a hospitalization are critical for understanding discharge options — hospitals begin discharge planning quickly, and you have the right to be part of that conversation",
      "Medicare covers short-term rehabilitation in a skilled nursing facility after a qualifying hospital stay of at least three nights — but the rules are specific and the window is time-sensitive",
      "Discharge planning is the process of figuring out where your loved one goes after the hospital — home with services, a rehab facility, or a longer-term care setting",
      "You do not have to accept the first plan a hospital presents — you have the right to ask questions, request more time, and involve a patient advocate",
      "A Geriatric Care Manager specializes in exactly this moment — they can assess needs, evaluate options, and guide your family through immediate decisions",
    ],
    questionGroups: [
      {
        label: "Questions to Ask the Hospital Social Worker",
        items: [
          "What are the discharge options being considered, and what is the timeline?",
          "Does my loved one qualify for Medicare-covered skilled nursing facility care?",
          "What is the difference between custodial care and skilled care — and which does my loved one need?",
          "Can we request more time before discharge to evaluate our options?",
          "Is there a patient advocate or social worker assigned to this case?",
        ],
      },
    ],
    steps: [
      "Ask to speak with the hospital's discharge planner or social worker today",
      "Find out whether the admission was classified as inpatient or observation status — this affects Medicare coverage significantly",
      "Gather key documents: insurance cards, Medicare and Medicaid information, power of attorney if one exists",
      "Connect with a Geriatric Care Manager or Elder Law Attorney if the situation is complex or moving quickly",
    ],
    experts: ["Geriatric Care Manager", "Elder Law Attorney"],
  },
  {
    id: "ongoing-care",
    navLabel: "Ongoing Care",
    title: "We Need Ongoing Care",
    orientation:
      "Once the immediate crisis has passed, a different set of decisions begins. What level of care does your loved one actually need? Can they stay at home with support? Is assisted living the right step? How do you evaluate a facility? And perhaps the question that weighs on most families — how are we going to pay for this? This section helps you understand your options clearly so you can make decisions with confidence.",
    keyThings: [
      "There is a wide spectrum of care settings between living independently and a nursing home — in-home aides, adult day programs, assisted living, memory care, and skilled nursing facilities each serve different needs",
      "The cost of long-term care in NJ is among the highest in the country — understanding what Medicaid covers and how to qualify is essential for most families",
      "Medicaid for long-term care is different from regular Medicaid — it has specific asset and income rules, and a 60-month look-back period that examines prior financial transfers",
      "You have the right to tour any licensed facility, review state inspection reports, and ask detailed questions about staffing and care practices",
      "Caregiver burnout is real — family members managing care need support and resources too",
    ],
    questionGroups: [
      {
        label: "Questions to Ask a Care Facility",
        items: [
          "What is the staff-to-resident ratio during day and night shifts?",
          "How do you handle residents with memory care or behavioral needs?",
          "What is included in the base monthly fee and what costs extra?",
          "How do you communicate with families and how often?",
          "What is your policy if a resident's care needs increase significantly?",
        ],
      },
    ],
    steps: [
      "Assess your loved one's care needs honestly — Activities of Daily Living are the standard framework professionals use",
      "Research the NJ Medicaid long-term care program if private funds are limited",
      "Tour at least three facilities before making any decision",
      "Consult an Elder Law Attorney before making significant financial moves — Medicaid planning requires professional guidance",
    ],
    experts: ["Geriatric Care Manager", "Elder Law Attorney"],
  },
  {
    id: "medicare-medicaid",
    navLabel: "Medicare & Medicaid",
    title: "Medicare & Medicaid",
    orientation:
      "Medicare and Medicaid are two entirely different programs that are endlessly confused with each other — and that confusion can cost families thousands of dollars and missed benefits. Medicare is federal health insurance primarily for people 65 and older. Medicaid is a joint federal-state program that pays for long-term care for those who qualify financially. Understanding the basics of both — and how they interact — is one of the most valuable things you can do for your family.",
    keyThings: [
      "Medicare has four parts: Part A covers hospital care, Part B covers medical services, Part C is Medicare Advantage, and Part D covers prescription drugs — each with its own costs and enrollment rules",
      "Missing Medicare enrollment windows can result in permanent premium penalties — the timelines matter",
      "Medicare does NOT cover long-term custodial care in a nursing home beyond a limited period — this surprises most families",
      "Medicaid in NJ has specific income and asset limits for long-term care coverage, and a 60-month look-back period for asset transfers",
      "Spend-down is the process of reducing assets to qualify for Medicaid — it must be done carefully and legally with professional guidance",
      "Medicare Savings Programs can help lower-income beneficiaries with premiums and costs — many eligible people don't know they exist",
    ],
    questionGroups: [
      {
        label: "Questions to Ask a Medicare Specialist",
        items: [
          "Am I enrolled in the right parts of Medicare for my situation?",
          "Am I approaching any enrollment deadlines I should know about?",
          "What is the difference between Original Medicare and Medicare Advantage for my specific needs?",
          "Are there programs that could help reduce my Medicare costs?",
        ],
      },
      {
        label: "Questions to Ask an Elder Law Attorney About Medicaid",
        items: [
          "Does my loved one currently qualify for Medicaid long-term care in NJ?",
          "What assets are counted and which are exempt?",
          "What is the look-back period and does it affect our situation?",
          "What steps can we legally take to protect assets while planning for care?",
        ],
      },
    ],
    steps: [
      "Confirm current Medicare enrollment status and which parts are active",
      "Review any upcoming enrollment windows",
      "If long-term care costs are a concern, consult an Elder Law Attorney about Medicaid planning — the earlier the better",
      "Check eligibility for Medicare Savings Programs through NJ's free SHIP counseling program",
    ],
    experts: ["Medicare Specialist", "Elder Law Attorney"],
  },
  {
    id: "estate-planning",
    navLabel: "Getting Affairs in Order",
    title: "Getting Affairs in Order",
    orientation:
      "Estate planning sounds like something only wealthy people need. It isn't. Every adult at every income level needs a small set of core documents that protect them and their family. Without them, the people you love may be unable to make decisions on your behalf, may face lengthy court processes, and may not know what you would have wanted. This section explains what you need, what each document does, and how to get started.",
    keyThings: [
      "There are five essential documents every adult should have: a Will, a Durable Power of Attorney, a Healthcare Proxy, an Advance Directive, and a HIPAA Authorization",
      "A Will determines what happens to your assets after you die — without one, NJ state law decides, which may not reflect your wishes",
      "A Durable Power of Attorney gives someone you trust legal authority to manage your finances if you are unable to — without it, your family may need to go to court",
      "A Healthcare Proxy designates who can make medical decisions on your behalf if you cannot speak for yourself",
      "An Advance Directive documents your wishes for end-of-life care — it removes an impossible burden from your family",
      "Estate planning documents should be reviewed after major life changes — marriage, divorce, death of a named person, or significant change in assets",
    ],
    questionGroups: [
      {
        label: "Questions to Ask an Estate Planning Attorney",
        items: [
          "Do my current documents reflect my wishes and current family situation?",
          "Is a trust appropriate for my situation, or is a will sufficient?",
          "How do I title my assets to ensure they pass as I intend?",
          "What happens to my estate in NJ if I die without a will?",
          "How do I have the conversation with my aging parent about getting these documents in place?",
        ],
      },
    ],
    steps: [
      "Inventory what documents currently exist — and find where they are stored",
      "If no documents exist, prioritize the Healthcare Proxy and Power of Attorney first — these protect living people",
      "Consult an Estate Planning Attorney — this is not an area for DIY documents when the stakes are real",
      "Store documents safely and make sure the right people know where they are",
    ],
    experts: ["Estate Planning Attorney", "Elder Law Attorney"],
  },
  {
    id: "after-passing",
    navLabel: "After a Loss",
    title: "A Loved One Just Passed",
    orientation:
      "Losing someone you love is one of the hardest things a person goes through. And yet in the days and weeks that follow, there are practical matters that cannot wait — notifications to make, accounts to manage, legal processes to begin. This section doesn't pretend that the practical and the emotional can be fully separated. It simply tries to give you a clear path through what needs to happen so you're not left guessing in an already impossible time.",
    keyThings: [
      "Probate is the legal process through which a deceased person's estate is administered — in NJ, not all assets go through probate. Accounts with named beneficiaries, jointly held property, and assets in a trust typically do not.",
      "The Executor named in the Will manages the estate through probate — if there is no will, the court appoints an Administrator",
      "NJ has an inheritance tax that applies to certain beneficiaries — a probate attorney can clarify what applies to your situation",
      "Time-sensitive tasks in the first 30 days include obtaining death certificates, notifying Social Security and Medicare, contacting financial institutions, and securing the deceased's property",
      "Grief and administrative burden are a difficult combination — it is appropriate to get professional help, both emotional and legal",
    ],
    questionGroups: [
      {
        label: "Questions to Ask a Probate Attorney",
        items: [
          "Does this estate need to go through probate in NJ?",
          "What is my role and responsibility as Executor?",
          "What are the deadlines I need to be aware of?",
          "Are there tax implications I should know about?",
          "How long does this process typically take?",
        ],
      },
    ],
    steps: [
      "Obtain multiple certified copies of the death certificate — you will need them for banks, insurance, Social Security, and more",
      "Notify the Social Security Administration — if the deceased was receiving benefits, payments must stop and surviving spouse benefits may be available",
      "Locate the Will and contact a probate attorney to begin the process",
      "Secure property and assets — do not distribute anything until you understand the legal requirements",
      "Notify Medicare and any private insurance carriers",
    ],
    experts: ["Probate Attorney", "Estate Planning Attorney"],
  },
  {
    id: "plan-ahead",
    navLabel: "Plan Ahead",
    title: "I Want to Plan Ahead",
    orientation:
      "The families who navigate eldercare most successfully almost always have one thing in common: they started before they had to. Getting the right documents in place, having honest conversations, understanding what care options exist and how to pay for them — none of it is easy, but all of it is far easier before a crisis than during one. If you're reading this section, you're already ahead of most people.",
    keyThings: [
      "A family care plan captures the aging person's wishes, medical information, key contacts, financial overview, and care preferences — creating one is the single most valuable planning exercise a family can do",
      "Long-term care is expensive and Medicare does not cover most of it — understanding your options before you need them is essential",
      "Powers of Attorney and Healthcare documents should be created while the person is legally competent — waiting too long can remove the option",
      "Having honest conversations with aging parents about their wishes is difficult but deeply important — it is far better to know what they want while they can tell you",
      "Financial planning for eldercare is a specialty — not all financial advisors understand Medicaid rules or elder-specific strategies",
    ],
    questionGroups: [
      {
        label: "Questions to Start With as a Family",
        items: [
          "If something happened tomorrow, does our family know what to do and where everything is?",
          "Does everyone have all five essential documents in place and up to date?",
          "Have we talked honestly about care preferences — home vs. facility, end-of-life wishes?",
          "Do we understand how we would pay for long-term care if needed?",
          "Who is the point person in our family for these decisions?",
        ],
      },
    ],
    steps: [
      "Start a Family Care Binder — a single place with all key documents, contacts, insurance information, and wishes",
      "Schedule a legal review with an Estate Planning or Elder Law Attorney",
      "Have the conversation — use our How to Talk to Your Parents About Planning guide as a starting point",
      "Meet with a financial advisor who specializes in eldercare to review long-term care funding options",
    ],
    experts: ["Estate Planning Attorney", "Financial Planner — Eldercare"],
  },
];

export default function Resources() {
  const [match, params] = useRoute("/resources/:id");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    document.title = "Resources & Guidance | ClearPath Elder Guide";
    window.scrollTo(0, 0);
  }, [match]);

  const activeId = match && params?.id ? params.id : "crisis";
  const currentScenario = SCENARIOS.find((s) => s.id === activeId) || SCENARIOS[0];

  const filteredScenarios = searchTerm
    ? SCENARIOS.filter(
        (s) =>
          s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          s.orientation.toLowerCase().includes(searchTerm.toLowerCase()) ||
          s.keyThings.some((k) => k.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : null;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-secondary text-secondary-foreground py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Resources &amp; Guidance</h1>
          <p className="text-lg text-secondary-foreground/80 mb-8 max-w-2xl mx-auto leading-relaxed">
            Plain-language guides organized around the situations real families face. Start with the section that matches where you are right now.
          </p>
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12 bg-background text-foreground border-none rounded-full"
              aria-label="Search resources"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        {filteredScenarios ? (
          /* Search Results */
          <div>
            <h2 className="font-serif text-2xl font-semibold text-secondary mb-6">
              {filteredScenarios.length} result{filteredScenarios.length !== 1 ? "s" : ""} for "{searchTerm}"
            </h2>
            {filteredScenarios.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6">
                {filteredScenarios.map((scenario) => (
                  <Link key={scenario.id} href={`/resources/${scenario.id}`} onClick={() => setSearchTerm("")}>
                    <div className="bg-card border border-border p-6 rounded-xl hover:border-primary hover:shadow-md transition-all cursor-pointer h-full">
                      <h3 className="font-serif text-xl font-bold text-secondary mb-3">{scenario.title}</h3>
                      <p className="text-muted-foreground line-clamp-3 leading-relaxed">{scenario.orientation}</p>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No resources found matching "{searchTerm}".</p>
            )}
          </div>
        ) : (
          /* Tabbed Layout */
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar */}
            <div className="md:w-56 flex-shrink-0">
              <div className="sticky top-24 space-y-1">
                {SCENARIOS.map((scenario) => (
                  <Link key={scenario.id} href={`/resources/${scenario.id}`}>
                    <Button
                      variant="ghost"
                      className={`w-full justify-start text-left font-medium rounded-lg h-auto py-3 px-4 leading-snug ${
                        activeId === scenario.id
                          ? "bg-primary/10 text-primary hover:bg-primary/15"
                          : "text-secondary hover:bg-secondary/5"
                      }`}
                    >
                      {scenario.navLabel}
                    </Button>
                  </Link>
                ))}
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              <div
                key={currentScenario.id}
                className="bg-card border border-border rounded-2xl p-6 md:p-10 shadow-sm animate-in fade-in duration-500"
              >
                <h2 className="font-serif text-3xl font-bold text-secondary mb-6">{currentScenario.title}</h2>
                <p className="text-lg text-muted-foreground mb-10 leading-relaxed">{currentScenario.orientation}</p>

                <div className="space-y-12">
                  {/* Key Things */}
                  <section>
                    <h3 className="font-serif text-2xl font-semibold text-secondary mb-5 flex items-center">
                      <div className="w-2 h-8 bg-primary rounded-full mr-3 flex-shrink-0"></div>
                      Key Things to Understand
                    </h3>
                    <ul className="space-y-4">
                      {currentScenario.keyThings.map((item, i) => (
                        <li key={i} className="flex items-start">
                          <span className="text-primary mr-3 mt-1 flex-shrink-0 font-bold">•</span>
                          <span className="text-foreground leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </section>

                  {/* Question Groups */}
                  {currentScenario.questionGroups.map((group, gi) => (
                    <section key={gi} className="bg-secondary/5 rounded-xl p-6 border border-secondary/10">
                      <h3 className="font-serif text-xl font-semibold text-secondary mb-4">{group.label}</h3>
                      <ul className="space-y-3">
                        {group.items.map((item, i) => (
                          <li key={i} className="flex items-start">
                            <ChevronRight className="w-5 h-5 text-accent mr-2 shrink-0 mt-0.5" />
                            <span className="text-foreground leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </section>
                  ))}

                  {/* Next Steps */}
                  <section>
                    <h3 className="font-serif text-2xl font-semibold text-secondary mb-5 flex items-center">
                      <div className="w-2 h-8 bg-accent rounded-full mr-3 flex-shrink-0"></div>
                      Next Steps
                    </h3>
                    <div className="space-y-4">
                      {currentScenario.steps.map((item, i) => (
                        <div key={i} className="flex items-start">
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-background border border-border flex items-center justify-center font-semibold text-secondary text-sm mr-4 mt-0.5">
                            {i + 1}
                          </div>
                          <p className="text-foreground leading-relaxed pt-1">{item}</p>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* CTA */}
                  <div className="bg-primary/10 rounded-2xl p-8 border border-primary/20 text-center">
                    <h3 className="font-serif text-2xl font-semibold text-secondary mb-3">
                      Need specific help?
                    </h3>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      Connect with a vetted expert who specializes in this area. Real availability. Real responsiveness.
                    </p>
                    <div className="flex flex-wrap justify-center gap-2 mb-6">
                      {currentScenario.experts.map((exp, i) => (
                        <span
                          key={i}
                          className="bg-background px-3 py-1.5 rounded-full text-sm font-medium border border-border text-secondary"
                        >
                          {exp}
                        </span>
                      ))}
                    </div>
                    <Link href="/experts">
                      <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                        Find an Expert in NJ
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
