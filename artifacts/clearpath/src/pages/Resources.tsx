import { useEffect, useState } from "react";
import { Link, useRoute } from "wouter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Search, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";

const SCENARIOS = [
  {
    id: "crisis",
    title: "Crisis",
    orientation: "When an unexpected hospitalization or sudden decline in health occurs, it's normal to feel panicked. The most important thing right now is stabilizing the situation and understanding your immediate discharge or care options.",
    keyThings: [
      "Hospital discharge planners are required to help you find a safe next step.",
      "Medicare covers up to 100 days of skilled nursing care after a qualifying 3-day hospital stay.",
      "Do not sign admission paperwork as a 'Responsible Party' without understanding personal financial liability.",
      "A sudden decline often requires quickly locating important documents like a Power of Attorney."
    ],
    questions: [
      "What is the expected discharge date and is it safe to return home?",
      "What specific type of care will be needed (skilled nursing, physical therapy, memory care)?",
      "Are we utilizing all available Medicare benefits for this transition?"
    ],
    steps: [
      "Locate healthcare proxy and financial power of attorney documents.",
      "Request an assessment from the hospital social worker.",
      "Consult a Geriatric Care Manager to coordinate the transition.",
      "Consult an Elder Law Attorney if long-term nursing care is likely and asset protection is a concern."
    ],
    experts: ["Geriatric Care Manager", "Elder Law Attorney"]
  },
  {
    id: "ongoing-care",
    title: "Ongoing Care",
    orientation: "Managing chronic conditions or age-related decline is a marathon, not a sprint. It often requires coordinating home aides, modifying living arrangements, and managing the emotional toll of caregiving.",
    keyThings: [
      "Caregiver burnout is real and common. Respite care is essential, not optional.",
      "Home modifications (ramps, grab bars) can significantly extend independence.",
      "Assisted living provides social engagement and daily help, but is usually private-pay.",
      "Medicaid (not Medicare) is the primary government payer for long-term custodial care."
    ],
    questions: [
      "How many hours of supervision are truly needed per day?",
      "Is the current living environment safe (fall risks, wandering)?",
      "What is the long-term financial plan to sustain this level of care?"
    ],
    steps: [
      "Conduct a home safety assessment.",
      "Research local home care agencies or assisted living facilities.",
      "Review finances to project how long private funds can cover care costs.",
      "Build a care team so the burden doesn't fall on one person."
    ],
    experts: ["Geriatric Care Manager", "Financial Planner"]
  },
  {
    id: "medicare-medicaid",
    title: "Medicare & Medicaid",
    orientation: "Understanding the difference between Medicare (healthcare for 65+) and Medicaid (assistance for those with limited assets) is crucial. They cover completely different types of care.",
    keyThings: [
      "Medicare pays for acute medical care (doctors, hospitals) and short-term rehab. It does NOT pay for long-term nursing home care.",
      "Medicaid pays for long-term custodial care, but has strict income and asset limits.",
      "There is a 5-year 'look-back' period for Medicaid. Giving away assets to qualify can result in severe penalties.",
      "Medicare Open Enrollment happens every fall—reviewing plans annually can save thousands."
    ],
    questions: [
      "What Medicare Supplement or Advantage plan offers the best coverage for current prescriptions?",
      "Are we at risk of needing Medicaid in the next five years?",
      "How can we protect a healthy spouse's assets if the other needs nursing home care?"
    ],
    steps: [
      "Review current Medicare coverage and out-of-pocket costs.",
      "Gather a complete list of all financial assets and income sources.",
      "Consult a specialist before making any large gifts or transferring property.",
      "Apply for benefits well before funds run out."
    ],
    experts: ["Medicare Specialist", "Elder Law Attorney"]
  },
  {
    id: "estate-planning",
    title: "Estate Planning",
    orientation: "Good estate planning is about much more than what happens after you die. It ensures your wishes are respected and your family has the legal authority to help you while you are still alive.",
    keyThings: [
      "A Will only takes effect after death. It does not help if someone becomes incapacitated.",
      "A Durable Power of Attorney allows someone to manage finances if the principal cannot.",
      "A Healthcare Proxy or Advance Directive allows someone to make medical decisions.",
      "Trusts can help avoid probate and protect assets from long-term care costs if done early enough."
    ],
    questions: [
      "Who is trusted to make financial and medical decisions if incapacity occurs?",
      "Are beneficiary designations on retirement accounts and life insurance up to date?",
      "Is a Trust appropriate for this specific family dynamic or financial situation?"
    ],
    steps: [
      "Identify the individuals who will serve as financial and healthcare agents.",
      "Take inventory of all major assets and how they are titled.",
      "Work with an attorney to draft or update the core legal documents.",
      "Store original documents safely and ensure the designated agents know where they are."
    ],
    experts: ["Estate Planning Attorney", "Elder Law Attorney"]
  },
  {
    id: "after-passing",
    title: "After a Loss",
    orientation: "Losing a loved one is overwhelming. The administrative and legal tasks that follow—often called probate or estate administration—don't all have to be done immediately. Take a breath.",
    keyThings: [
      "Not everything needs to go through probate. Assets with named beneficiaries or joint owners pass directly.",
      "Do not pay the deceased person's debts from your own pocket.",
      "You will need multiple original copies of the death certificate for banks and government agencies.",
      "The Executor or Administrator is legally obligated to follow the Will and state law, not personal preference."
    ],
    questions: [
      "Where is the original Will located?",
      "Did the deceased have a Trust, and who is the successor Trustee?",
      "What immediate bills (like a mortgage or utilities) need to be managed?"
    ],
    steps: [
      "Order 10-15 original death certificates from the funeral home.",
      "Locate the Will and contact a Probate Attorney to open the estate.",
      "Notify Social Security and pension providers.",
      "Secure property and forward mail."
    ],
    experts: ["Probate Attorney", "Estate Planning Attorney"]
  },
  {
    id: "plan-ahead",
    title: "Plan Ahead",
    orientation: "Planning before a crisis hits is the greatest gift you can give your family. It removes the burden of guesswork and often preserves more assets and options.",
    keyThings: [
      "Proactive planning allows you to choose your living arrangements and care preferences.",
      "Long-term care insurance is best purchased in your 50s or early 60s while still healthy.",
      "Having conversations with adult children early prevents conflict later.",
      "Legal and financial plans should be reviewed every 3-5 years or after a major life event."
    ],
    questions: [
      "What are the goals for aging (staying home vs. moving to a community)?",
      "Is the current home suitable for aging in place?",
      "Are all legal documents current and accessible to the right people?"
    ],
    steps: [
      "Schedule a family meeting to discuss wishes and plans.",
      "Review and update the core estate planning documents.",
      "Assess financial readiness for potential future care costs.",
      "Organize passwords, digital assets, and account information."
    ],
    experts: ["Estate Planning Attorney", "Financial Planner"]
  }
];

export default function Resources() {
  const [match, params] = useRoute("/resources/:id");
  const [searchTerm, setSearchTerm] = useState("");
  
  useEffect(() => {
    document.title = "Resources | ClearPath Elder Guide";
    window.scrollTo(0, 0);
  }, [match]);

  const activeTab = match && params?.id ? params.id : "crisis";

  // If a specific scenario is matched but not found, fallback to crisis
  const currentScenario = SCENARIOS.find(s => s.id === activeTab) || SCENARIOS[0];

  const filteredScenarios = SCENARIOS.filter(s => 
    s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.orientation.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.keyThings.some(k => k.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-secondary text-secondary-foreground py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6">Clear Guidance for Every Stage</h1>
          <p className="text-lg text-secondary-foreground/80 mb-8 max-w-2xl mx-auto">
            Plain-language explanations, checklists, and next steps for the most common eldercare challenges.
          </p>
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input 
              type="text" 
              placeholder="Search resources..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12 bg-background text-foreground border-none rounded-full"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        {searchTerm ? (
          // Search Results View
          <div className="space-y-8">
            <h2 className="font-serif text-2xl font-semibold text-secondary mb-6">
              Search Results ({filteredScenarios.length})
            </h2>
            {filteredScenarios.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6">
                {filteredScenarios.map(scenario => (
                  <Link key={scenario.id} href={`/resources/${scenario.id}`}>
                    <div className="bg-card border border-border p-6 rounded-xl hover:border-primary hover:shadow-md transition-all cursor-pointer h-full">
                      <h3 className="font-serif text-xl font-bold text-secondary mb-3">{scenario.title}</h3>
                      <p className="text-muted-foreground line-clamp-3">{scenario.orientation}</p>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No resources found matching "{searchTerm}".</p>
            )}
          </div>
        ) : (
          // Tabbed View
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar Navigation */}
            <div className="md:w-64 flex-shrink-0">
              <div className="sticky top-24 space-y-2">
                {SCENARIOS.map(scenario => (
                  <Link key={scenario.id} href={`/resources/${scenario.id}`}>
                    <Button 
                      variant="ghost" 
                      className={`w-full justify-start text-left font-medium rounded-lg h-12 ${
                        activeTab === scenario.id 
                          ? "bg-primary/10 text-primary hover:bg-primary/20" 
                          : "text-secondary hover:bg-secondary/5"
                      }`}
                    >
                      {scenario.title}
                    </Button>
                  </Link>
                ))}
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 min-w-0">
              <div className="bg-card border border-border rounded-2xl p-6 md:p-10 shadow-sm animate-in fade-in duration-500">
                <h2 className="font-serif text-3xl font-bold text-secondary mb-6">{currentScenario.title}</h2>
                <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
                  {currentScenario.orientation}
                </p>

                <div className="space-y-12">
                  <section>
                    <h3 className="font-serif text-2xl font-semibold text-secondary mb-4 flex items-center">
                      <div className="w-2 h-8 bg-primary rounded-full mr-3"></div>
                      Key Things to Understand
                    </h3>
                    <ul className="space-y-4">
                      {currentScenario.keyThings.map((item, i) => (
                        <li key={i} className="flex items-start">
                          <span className="text-primary mr-3 mt-1">•</span>
                          <span className="text-foreground leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </section>

                  <section className="bg-secondary/5 rounded-xl p-6 border border-secondary/10">
                    <h3 className="font-serif text-xl font-semibold text-secondary mb-4">
                      Questions to Ask Your Professional
                    </h3>
                    <ul className="space-y-3">
                      {currentScenario.questions.map((item, i) => (
                        <li key={i} className="flex items-start">
                          <ChevronRight className="w-5 h-5 text-accent mr-2 shrink-0 mt-0.5" />
                          <span className="text-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </section>

                  <section>
                    <h3 className="font-serif text-2xl font-semibold text-secondary mb-4 flex items-center">
                      <div className="w-2 h-8 bg-accent rounded-full mr-3"></div>
                      Next Steps
                    </h3>
                    <div className="space-y-4">
                      {currentScenario.steps.map((item, i) => (
                        <div key={i} className="flex">
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-background border border-border flex items-center justify-center font-medium text-secondary mr-4">
                            {i + 1}
                          </div>
                          <p className="text-foreground mt-1 leading-relaxed">{item}</p>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* CTA */}
                  <div className="mt-12 bg-primary/10 rounded-2xl p-8 border border-primary/20 text-center">
                    <h3 className="font-serif text-2xl font-semibold text-secondary mb-3">Need specific help?</h3>
                    <p className="text-muted-foreground mb-6">
                      Connect with a vetted professional who specializes in {currentScenario.title.toLowerCase()}.
                    </p>
                    <div className="flex flex-wrap justify-center gap-3 mb-6">
                      {currentScenario.experts.map((exp, i) => (
                        <span key={i} className="bg-background px-3 py-1 rounded-full text-sm font-medium border border-border">
                          {exp}
                        </span>
                      ))}
                    </div>
                    <Link href="/experts">
                      <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                        Find an Expert in NJ <ArrowRight className="w-4 h-4 ml-2" />
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
