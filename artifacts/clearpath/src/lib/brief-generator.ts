export interface AssessmentAnswers {
  situation: string;
  who: string;
  urgency: string;
  inPlace: string[];
  concerns: string[];
}

export interface IntakeAnswers {
  state: string;
  age: string;
  living: string;
  dementia: string;
  adlLevel: string;
  healthCondition: string;
  medicareStatus: string;
  assets: string;
  realEstate: string;
  propertyTitle: string;
  todDeed: string;
  mortgageStatus: string;
  propertyUse: string;
  retirement: string;
  veteran: string;
  ltcInsurance: string;
  legalDocs: string;
  poa: string;
  spouse: string;
  disputes: string;
  attorney: string;
}

export interface StateContext {
  medicaid?: {
    assetLimit: string;
    csra: string;
    incomeLimit: string;
    lookbackNote: string;
    assetComparison?: string;
    notes?: string;
  };
  probate?: {
    minWait: string;
    courtRequired: boolean;
    notes: string;
  };
  propertyTools?: {
    todDeed: string;
    todDeedNote: string;
  };
  disclaimer: string;
}

export interface ExecutorTask {
  timeframe: "immediate" | "first-week" | "first-month" | "ongoing";
  task: string;
  notes?: string;
}

export interface Brief {
  situationOverview: string;
  keyFacts: { label: string; value: string }[];
  legalInPlace: string[];
  legalMissing: string[];
  familyContext: string;
  whatNeeded: string;
  alreadyDone: string;
  priorityActions: string[];
  professionalMatch: { type: string; reason: string };
  redFlags: string[];
  healthContext: string | null;
  medicareContext: string | null;
  realPropertyContext: string | null;
  executorChecklist: ExecutorTask[] | null;
  stateContext: StateContext | null;
}

// ---------------------------------------------------------------------------
// State data — 2026 figures sourced from CMS / Medicaid Planning Assistance
// Medicaid: individual asset limit, community spouse resource allowance (CSRA),
// monthly income limit. Probate: minimum statutory waiting period.
// These are general reference figures, not legal advice.
// ---------------------------------------------------------------------------
interface StateInfo {
  assetLimit: string;      // Medicaid individual asset limit
  csra: string;            // What the community (non-applicant) spouse may keep
  incomeLimit: string;     // Monthly Medicaid income limit (approx.)
  probateWait: string;     // Minimum probate waiting period
  probateCourtReq: boolean;
  probateNotes: string;
  medicaidNotes?: string;
  todDeed: string;         // "Allowed" | "Lady Bird deed only" | "Not allowed" | "Not confirmed — verify locally"
}

const STATE_DATA: Record<string, StateInfo> = {
  "Alabama":          { assetLimit: "$2,000",    csra: "$32,532–$162,660",  incomeLimit: "$2,982/mo",  probateWait: "6 months",    probateCourtReq: true,  probateNotes: "Full process typically 9–18 months.",                                                                                  todDeed: "Not allowed" },
  "Alaska":           { assetLimit: "$2,000",    csra: "$162,660",          incomeLimit: "$2,982/mo",  probateWait: "4–6 months",  probateCourtReq: true,  probateNotes: "Full process typically 6–12 months.",                                                                                  todDeed: "Allowed" },
  "Arizona":          { assetLimit: "$2,000",    csra: "$32,532–$162,660",  incomeLimit: "$2,982/mo",  probateWait: "4 months",    probateCourtReq: true,  probateNotes: "Small estates may use affidavit procedure. Full process 6–12 months.",                                                  todDeed: "Allowed" },
  "Arkansas":         { assetLimit: "$2,000",    csra: "$32,532–$162,660",  incomeLimit: "$2,982/mo",  probateWait: "6 months",    probateCourtReq: true,  probateNotes: "Statutory minimum before final distribution. Full process 9–15 months.",                                               todDeed: "Allowed" },
  "California":       { assetLimit: "$130,000",  csra: "$162,660",          incomeLimit: "~$1,800/mo", probateWait: "9–18 months", probateCourtReq: true,  probateNotes: "California probate is among the slowest and most expensive. Complex estates can exceed 2 years.",                      todDeed: "Allowed",                medicaidNotes: "California reimplemented asset limits effective 1/1/26. Asset limit for couples: $195,000." },
  "Colorado":         { assetLimit: "$2,000",    csra: "$162,660",          incomeLimit: "$2,982/mo",  probateWait: "5 months",    probateCourtReq: true,  probateNotes: "Petition and confirmation hearing required. Full process 6–12 months.",                                                 todDeed: "Allowed" },
  "Connecticut":      { assetLimit: "$1,600",    csra: "$50,000–$162,660",  incomeLimit: "$2,982/mo",  probateWait: "6 months",    probateCourtReq: true,  probateNotes: "Final settlement hearing required. Full process 9–15 months.",                                                          todDeed: "Not allowed",            medicaidNotes: "CT individual asset limit is $1,600. Minimum CSRA is $50,000." },
  "Delaware":         { assetLimit: "$2,000",    csra: "$32,532–$162,660",  incomeLimit: "$2,485/mo",  probateWait: "4 months",    probateCourtReq: true,  probateNotes: "Shorter if all parties consent. Full process 6–12 months.",                                                            todDeed: "Not confirmed — verify locally", medicaidNotes: "Delaware uses 250% FBR income limit ($2,485/mo), lower than most states." },
  "Florida":          { assetLimit: "$2,000",    csra: "$162,660",          incomeLimit: "$2,982/mo",  probateWait: "3 months",    probateCourtReq: true,  probateNotes: "Formal administration requires court order. Full process 6–12 months.",                                                 todDeed: "Lady Bird deed only" },
  "Georgia":          { assetLimit: "$2,000",    csra: "$162,660",          incomeLimit: "$2,982/mo",  probateWait: "6 months",    probateCourtReq: true,  probateNotes: "Duration depends on estate complexity. Full process 9–18 months.",                                                      todDeed: "Allowed" },
  "Hawaii":           { assetLimit: "$2,000",    csra: "$162,660",          incomeLimit: "$2,982/mo",  probateWait: "4–6 months",  probateCourtReq: true,  probateNotes: "Full process typically 6–12 months.",                                                                                  todDeed: "Allowed" },
  "Idaho":            { assetLimit: "$2,000",    csra: "$32,532–$162,660",  incomeLimit: "$2,982/mo",  probateWait: "2 months",    probateCourtReq: true,  probateNotes: "Small estates may bypass probate. Full process typically 4–9 months.",                                                  todDeed: "Not allowed" },
  "Illinois":         { assetLimit: "$17,500",   csra: "$135,648",          incomeLimit: "~$1,304/mo", probateWait: "6 months",    probateCourtReq: true,  probateNotes: "Probate petition and court confirmation required. Full process 9–18 months.",                                           todDeed: "Allowed",                medicaidNotes: "Illinois has a higher individual asset limit ($17,500) and a fixed CSRA of $135,648. Income limit is approximately 100% FPL." },
  "Indiana":          { assetLimit: "$2,000",    csra: "$32,532–$162,660",  incomeLimit: "$2,982/mo",  probateWait: "3 months",    probateCourtReq: true,  probateNotes: "Preliminary hearing required in most counties. Full process 6–12 months.",                                              todDeed: "Allowed" },
  "Iowa":             { assetLimit: "$2,000",    csra: "$32,532–$162,660",  incomeLimit: "$2,982/mo",  probateWait: "4 months",    probateCourtReq: true,  probateNotes: "Probate estate hearing required. Full process 6–12 months.",                                                            todDeed: "Not allowed" },
  "Kansas":           { assetLimit: "$2,000",    csra: "$32,532–$162,660",  incomeLimit: "$2,982/mo",  probateWait: "3 months",    probateCourtReq: true,  probateNotes: "Formal probate hearing required. Full process 6–12 months.",                                                            todDeed: "Allowed" },
  "Kentucky":         { assetLimit: "$2,000",    csra: "$32,532–$162,660",  incomeLimit: "$2,982/mo",  probateWait: "6 months",    probateCourtReq: true,  probateNotes: "Court oversees final accounting. Full process 9–15 months.",                                                            todDeed: "Not allowed" },
  "Louisiana":        { assetLimit: "$2,000",    csra: "$162,660",          incomeLimit: "$2,982/mo",  probateWait: "4 months",    probateCourtReq: true,  probateNotes: "Succession court confirms; longer if disputes. Full process 6–12 months.",                                              todDeed: "Not allowed" },
  "Maine":            { assetLimit: "$2,000",    csra: "$162,660",          incomeLimit: "$2,982/mo",  probateWait: "6 months",    probateCourtReq: true,  probateNotes: "Full process typically 9–15 months.",                                                                                  todDeed: "Not allowed" },
  "Maryland":         { assetLimit: "$2,500",    csra: "$32,532–$162,660",  incomeLimit: "$2,982/mo",  probateWait: "6 months",    probateCourtReq: true,  probateNotes: "Full process typically 9–15 months.",                                                                                  todDeed: "Not allowed",            medicaidNotes: "Maryland individual asset limit is $2,500." },
  "Massachusetts":    { assetLimit: "$2,000",    csra: "$32,532–$162,660",  incomeLimit: "$2,982/mo",  probateWait: "6 months",    probateCourtReq: true,  probateNotes: "Must wait for creditors to file claims. Full process 9–18 months.",                                                    todDeed: "Not allowed" },
  "Michigan":         { assetLimit: "$2,000",    csra: "$32,532–$162,660",  incomeLimit: "$2,982/mo",  probateWait: "4 months",    probateCourtReq: true,  probateNotes: "Notice period before confirmation. Full process 6–12 months.",                                                          todDeed: "Lady Bird deed only" },
  "Minnesota":        { assetLimit: "$3,000",    csra: "$162,660",          incomeLimit: "~$1,304/mo", probateWait: "6 months",    probateCourtReq: true,  probateNotes: "Formal and informal matters vary. Full process 9–15 months.",                                                           todDeed: "Allowed",                medicaidNotes: "Minnesota individual asset limit is $3,000. Income limit is approximately 100% FPL." },
  "Mississippi":      { assetLimit: "$4,000",    csra: "$162,660",          incomeLimit: "$2,982/mo",  probateWait: "6 months",    probateCourtReq: true,  probateNotes: "Court hearing required for distribution. Full process 9–15 months.",                                                    todDeed: "Allowed",                medicaidNotes: "Mississippi individual asset limit is $4,000 for couples." },
  "Missouri":         { assetLimit: "$2,000",    csra: "$32,532–$162,660",  incomeLimit: "$2,982/mo",  probateWait: "6 months",    probateCourtReq: true,  probateNotes: "Probate courts oversee final decree. Full process 9–15 months.",                                                        todDeed: "Allowed" },
  "Montana":          { assetLimit: "$2,000",    csra: "$32,532–$162,660",  incomeLimit: "$2,982/mo",  probateWait: "4–6 months",  probateCourtReq: true,  probateNotes: "Full process typically 6–12 months.",                                                                                  todDeed: "Allowed" },
  "Nebraska":         { assetLimit: "$4,000",    csra: "$32,532–$162,660",  incomeLimit: "~$1,304/mo", probateWait: "4–6 months",  probateCourtReq: true,  probateNotes: "Full process typically 6–12 months.",                                                                                  todDeed: "Allowed",                medicaidNotes: "Nebraska individual asset limit is $4,000. Income limit is approximately 100% FPL." },
  "Nevada":           { assetLimit: "$2,000",    csra: "$162,660",          incomeLimit: "$2,982/mo",  probateWait: "4–6 months",  probateCourtReq: true,  probateNotes: "Full process typically 6–12 months.",                                                                                  todDeed: "Allowed" },
  "New Hampshire":    { assetLimit: "$2,500",    csra: "$32,532–$162,660",  incomeLimit: "$2,982/mo",  probateWait: "6 months",    probateCourtReq: true,  probateNotes: "Full process typically 9–15 months.",                                                                                  todDeed: "Not allowed",            medicaidNotes: "New Hampshire individual asset limit is $2,500." },
  "New Jersey":       { assetLimit: "$2,000",    csra: "$32,532–$162,660",  incomeLimit: "$2,982/mo",  probateWait: "6 months",    probateCourtReq: true,  probateNotes: "Formal probate usually required. Full process 9–18 months.",                                                            todDeed: "Not confirmed — verify locally" },
  "New Mexico":       { assetLimit: "$2,000",    csra: "$32,532–$162,660",  incomeLimit: "$2,982/mo",  probateWait: "4–6 months",  probateCourtReq: true,  probateNotes: "Full process typically 6–12 months.",                                                                                  todDeed: "Allowed" },
  "New York":         { assetLimit: "$32,396",   csra: "$74,820–$162,660",  incomeLimit: "~$1,800/mo", probateWait: "6 months",    probateCourtReq: true,  probateNotes: "Creditors must be notified before final decree. Full process 9–18 months.",                                             todDeed: "Allowed",                medicaidNotes: "New York has a significantly higher individual asset limit ($32,396) and higher minimum CSRA ($74,820). Income limit is approximately 138% FPL." },
  "North Carolina":   { assetLimit: "$2,000",    csra: "$32,532–$162,660",  incomeLimit: "~$1,304/mo", probateWait: "5 months",    probateCourtReq: true,  probateNotes: "Letters testamentary issued; hearing if estate over $5k. Full process 6–12 months.",                                   todDeed: "Not allowed",            medicaidNotes: "North Carolina income limit is approximately 100% FPL." },
  "North Dakota":     { assetLimit: "$3,000",    csra: "$32,532–$162,660",  incomeLimit: "$2,982/mo",  probateWait: "4–6 months",  probateCourtReq: true,  probateNotes: "Full process typically 6–12 months.",                                                                                  todDeed: "Allowed",                medicaidNotes: "North Dakota individual asset limit is $3,000." },
  "Ohio":             { assetLimit: "$2,000",    csra: "$32,532–$162,660",  incomeLimit: "$2,982/mo",  probateWait: "6 months",    probateCourtReq: true,  probateNotes: "Journal entry for settlement; hearing if needed. Full process 9–15 months.",                                            todDeed: "Allowed" },
  "Oklahoma":         { assetLimit: "$2,000",    csra: "$32,532–$162,660",  incomeLimit: "$2,982/mo",  probateWait: "4–6 months",  probateCourtReq: true,  probateNotes: "Full process typically 6–12 months.",                                                                                  todDeed: "Not confirmed — verify locally" },
  "Oregon":           { assetLimit: "$2,000",    csra: "$32,532–$162,660",  incomeLimit: "$2,982/mo",  probateWait: "4–6 months",  probateCourtReq: true,  probateNotes: "Full process typically 6–12 months.",                                                                                  todDeed: "Allowed" },
  "Pennsylvania":     { assetLimit: "$2,400",    csra: "$32,532–$162,660",  incomeLimit: "$2,982/mo",  probateWait: "6 months",    probateCourtReq: true,  probateNotes: "Orphans' Court issues final decree. Full process 9–18 months.",                                                         todDeed: "Not allowed",            medicaidNotes: "Pennsylvania individual asset limit is $2,400." },
  "Rhode Island":     { assetLimit: "$4,000",    csra: "$32,532–$162,660",  incomeLimit: "$2,982/mo",  probateWait: "6 months",    probateCourtReq: true,  probateNotes: "Full process typically 9–15 months.",                                                                                  todDeed: "Not allowed",            medicaidNotes: "Rhode Island individual asset limit is $4,000." },
  "South Carolina":   { assetLimit: "$2,000",    csra: "$66,480",           incomeLimit: "$2,982/mo",  probateWait: "6 months",    probateCourtReq: true,  probateNotes: "Court confirmation required for estate completion. Full process 9–15 months.",                                          todDeed: "Not allowed",            medicaidNotes: "South Carolina uses a fixed CSRA of $66,480." },
  "South Dakota":     { assetLimit: "$2,000",    csra: "$32,532–$162,660",  incomeLimit: "$2,982/mo",  probateWait: "4–6 months",  probateCourtReq: true,  probateNotes: "Full process typically 6–12 months.",                                                                                  todDeed: "Allowed" },
  "Tennessee":        { assetLimit: "$2,000",    csra: "$32,532–$162,660",  incomeLimit: "$2,982/mo",  probateWait: "3–6 months",  probateCourtReq: true,  probateNotes: "Timeline depends on estate type and assets. Full process 6–12 months.",                                                 todDeed: "Not allowed" },
  "Texas":            { assetLimit: "$2,000",    csra: "$32,532–$162,660",  incomeLimit: "$2,982/mo",  probateWait: "4 months",    probateCourtReq: true,  probateNotes: "Court hearing to grant probate. Full process 6–12 months.",                                                            todDeed: "Allowed (also Lady Bird deed)" },
  "Utah":             { assetLimit: "$2,000",    csra: "$32,532–$162,660",  incomeLimit: "~$1,304/mo", probateWait: "4 months",    probateCourtReq: true,  probateNotes: "Court order required to close estate. Full process 6–12 months.",                                                       todDeed: "Allowed",                medicaidNotes: "Utah income limit is approximately 100% FPL." },
  "Vermont":          { assetLimit: "$2,000",    csra: "$162,660",          incomeLimit: "$2,982/mo",  probateWait: "4–6 months",  probateCourtReq: true,  probateNotes: "Full process typically 6–12 months.",                                                                                  todDeed: "Lady Bird deed only" },
  "Virginia":         { assetLimit: "$2,000",    csra: "$32,532–$162,660",  incomeLimit: "$2,982/mo",  probateWait: "5 months",    probateCourtReq: true,  probateNotes: "Estate settlement period before distribution. Full process 6–12 months.",                                               todDeed: "Allowed" },
  "Washington":       { assetLimit: "$2,000",    csra: "$72,529–$162,660",  incomeLimit: "$2,982/mo",  probateWait: "4–6 months",  probateCourtReq: true,  probateNotes: "Full process typically 6–12 months.",                                                                                  todDeed: "Allowed",                medicaidNotes: "Washington minimum CSRA is $72,529." },
  "Washington D.C.":  { assetLimit: "$4,000",    csra: "$162,660",          incomeLimit: "$2,982/mo",  probateWait: "6 months",    probateCourtReq: true,  probateNotes: "Full process typically 9–15 months.",                                                                                  todDeed: "Not confirmed — verify locally", medicaidNotes: "D.C. individual asset limit is $4,000." },
  "West Virginia":    { assetLimit: "$2,000",    csra: "$32,532–$162,660",  incomeLimit: "$2,982/mo",  probateWait: "6 months",    probateCourtReq: true,  probateNotes: "Full process typically 9–15 months.",                                                                                  todDeed: "Allowed (also Lady Bird deed)" },
  "Wisconsin":        { assetLimit: "$2,000",    csra: "$50,000–$162,660",  incomeLimit: "$2,982/mo",  probateWait: "4 months",    probateCourtReq: true,  probateNotes: "Formal probate hearing required. Full process 6–12 months.",                                                            todDeed: "Allowed",                medicaidNotes: "Wisconsin minimum CSRA is $50,000." },
  "Wyoming":          { assetLimit: "$2,000",    csra: "$162,660",          incomeLimit: "$2,982/mo",  probateWait: "4–6 months",  probateCourtReq: true,  probateNotes: "Full process typically 6–12 months.",                                                                                  todDeed: "Allowed" },
};

function buildRealPropertyContext(a: AssessmentAnswers, i: IntakeAnswers): string | null {
  if (i.realEstate !== "Yes") return null;

  const lines: string[] = [];
  const state = i.state || "your state";

  if (a.situation === "loss") {
    if (i.todDeed === "Yes") {
      lines.push("A Transfer on Death deed or Lady Bird deed was in place. The property passes directly to the named beneficiary without probate. The beneficiary should record an affidavit and provide a certified death certificate to the county recorder to complete the transfer.");
    } else if (i.propertyTitle === "Joint tenancy with right of survivorship") {
      lines.push("The property was held in joint tenancy with right of survivorship. Title passes automatically to the surviving owner — probate is not required for this asset. The surviving owner should file an Affidavit of Surviving Joint Tenant with the county recorder to formally memorialize the transfer.");
    } else if (i.propertyTitle === "Tenants in common") {
      lines.push("The property was held as tenants in common. The deceased's share does NOT automatically pass to the surviving co-owner — it must go through probate. The deceased's share will be distributed according to the will, or by intestate succession laws if no will exists.");
    } else if (i.propertyTitle === "One person's name only") {
      lines.push("The property was titled in one person's name only. Probate is required to transfer the real estate to heirs. Without a trust or TOD deed in place, the court must authorize the transfer.");
    } else if (i.propertyTitle === "In a trust") {
      lines.push("The property is held in a trust. The trustee handles the transfer per the trust terms — probate is not required for this asset. The trustee should work with a real estate attorney to record the transfer to the beneficiary.");
    } else {
      lines.push(`How the property is titled determines whether probate is required. Confirm the exact form of ownership with the county recorder or a title company in ${state} before assuming the transfer path.`);
    }
    lines.push("Note: a deed does not change when a mortgage is paid off. The mortgage satisfaction is a separate recorded document that removes the lien — the original deed remains the operative ownership instrument.");
  }

  if (a.situation === "ongoing" || a.situation === "planning" || a.situation === "crisis") {
    const isRental = i.propertyUse?.startsWith("Rental");
    if (isRental) {
      lines.push("The property is a rental or investment property — unlike a primary residence, it is a countable asset for Medicaid eligibility purposes. This means its value is included when calculating whether the person qualifies for Medicaid. An elder law attorney should review options for handling this asset.");
    } else {
      lines.push(`The primary residence is exempt from Medicaid asset calculations while the person resides there. However, Medicaid Estate Recovery (MERP) allows the state to place a claim on the property after the person's death to recoup Medicaid benefits paid — this is one of the most overlooked risks in elder care planning.`);
    }
    if (i.todDeed === "Yes") {
      lines.push("A TOD or Lady Bird deed is in place. Depending on how it is structured, this may provide protection against MERP claims — confirm with an elder law attorney in " + state + ".");
    } else if (i.propertyTitle === "In a trust") {
      lines.push("The property is held in a trust, which may provide MERP protection depending on the trust type. An irrevocable trust generally offers stronger protection than a revocable one — confirm with an elder law attorney.");
    } else {
      lines.push(`Without a Transfer on Death deed, Lady Bird deed, or irrevocable trust, the home may be exposed to MERP recovery after the person's death. An elder law attorney can advise on protective strategies available in ${state}.`);
    }
  }

  if (a.situation === "self") {
    lines.push("Your primary residence is generally exempt from Medicaid asset counts while you reside there. However, Medicaid Estate Recovery (MERP) can claim the property after your death to recover benefits paid. Protective strategies include a Transfer on Death deed (where available in your state), a Lady Bird deed, or placing the home in an irrevocable trust before applying for Medicaid.");
    if (i.todDeed !== "Yes") {
      lines.push(`No TOD or Lady Bird deed was confirmed. This is worth reviewing with an elder law attorney — it is often one of the simplest and lowest-cost planning steps available.`);
    }
  }

  return lines.join(" ");
}

function buildHealthContext(a: AssessmentAnswers, i: IntakeAnswers): string | null {
  if (a.situation === "loss") return null;
  if (!i.adlLevel && !i.healthCondition && !i.medicareStatus) return null;

  const lines: string[] = [];

  if (i.adlLevel && !i.adlLevel.startsWith("Not sure")) {
    if (i.adlLevel.startsWith("Fully dependent")) {
      lines.push("The person requires full-time care assistance for all daily activities — a care level consistent with skilled nursing or memory care facility placement, or intensive in-home care.");
    } else if (i.adlLevel.startsWith("Significant assistance")) {
      lines.push("The person requires significant daily assistance with most activities of daily living. This care level typically requires a home health aide, assisted living, or similar structured support.");
    } else if (i.adlLevel.startsWith("Some assistance")) {
      lines.push("The person needs some assistance with daily tasks such as bathing, dressing, or meal preparation — often manageable with family support or part-time home care.");
    } else if (i.adlLevel.startsWith("Independent")) {
      lines.push("The person is currently managing most daily tasks independently. Care planning should focus on anticipating future needs rather than addressing immediate gaps.");
    }
  }

  if (i.healthCondition && !i.healthCondition.startsWith("Not sure") && !i.healthCondition.startsWith("No significant")) {
    if (i.healthCondition.startsWith("Neurological")) {
      lines.push("A neurological condition (Parkinson's, ALS, MS, or stroke) typically involves progressive decline in mobility and independence — care planning should account for increasing needs over time.");
    } else if (i.healthCondition.startsWith("Cancer")) {
      lines.push("Active cancer or ongoing treatment affects care needs significantly and may involve transitions between acute care, rehabilitation, and hospice. An oncology-aware care coordinator can help navigate these transitions.");
    } else if (i.healthCondition.startsWith("Heart")) {
      lines.push("Cardiovascular conditions can result in rapid acute episodes (hospitalizations, rehab stays) alongside chronic care needs. Medicare Part A skilled nursing coverage is particularly relevant here.");
    } else if (i.healthCondition.startsWith("Multiple")) {
      lines.push("Multiple chronic conditions typically increase care complexity and coordination demands. A geriatric care manager or primary care team experienced with multimorbidity is especially valuable.");
    } else if (i.healthCondition.startsWith("Primarily mobility")) {
      lines.push("Mobility and fall risk are among the leading drivers of nursing home placement. Fall prevention programs, home modifications, and physical therapy are often covered by Medicare Part B.");
    }
  }

  return lines.length > 0 ? lines.join(" ") : null;
}

function buildMedicareContext(a: AssessmentAnswers, i: IntakeAnswers): string | null {
  if (a.situation === "loss") return null;
  if (!i.medicareStatus || i.medicareStatus === "No") return null;

  const notYetEnrolled = i.medicareStatus.startsWith("Not yet");
  const notSure = i.medicareStatus === "Not sure";
  const lines: string[] = [];

  if (notYetEnrolled) {
    lines.push("Medicare enrollment has not yet occurred. The Initial Enrollment Period opens 3 months before the 65th birthday and closes 3 months after — missing it creates a permanent 10% per-year penalty on Part B premiums. If the person currently has employer-sponsored coverage, a Special Enrollment Period applies when that coverage ends. Contact Social Security (1-800-772-1213) or a SHIP Medicare counselor (shipcenter.org) to review timing and options.");
    return lines.join(" ");
  }

  if (notSure) {
    lines.push("Medicare enrollment status should be confirmed. Call 1-800-MEDICARE or check Medicare.gov to verify which parts are active. This matters especially when evaluating what care costs are covered vs. what falls to private pay or Medicaid.");
    return lines.join(" ");
  }

  // Enrolled — care-setting-specific guidance
  const living = i.living?.toLowerCase() || "";
  const isHospital    = living.includes("hospital");
  const isSNF         = living.includes("nursing home") || living.includes("rehab");
  const isHome        = living.includes("at home");
  const isAL          = living.includes("assisted living") || living.includes("independent living");
  const isMemoryCare  = living.includes("memory care");

  if (isHospital) {
    lines.push("Medicare Part A covers inpatient hospital stays after the annual deductible. One critical distinction: confirm whether the person has been admitted as an inpatient vs. placed under 'observation status.' Observation is billed under Part B — and does not count toward the 3-day qualifying stay required to trigger Medicare's skilled nursing facility benefit.");
    lines.push("A qualifying 3-day inpatient admission unlocks up to 100 days of SNF coverage: days 1–20 at no cost, days 21–100 with a daily copay (approximately $200/day in 2025). Ask the hospital care coordinator to clarify admission status in writing before discharge planning begins.");
  } else if (isSNF) {
    lines.push("Medicare covers skilled nursing facility care for up to 100 days following a qualifying 3-day inpatient hospital stay. The benefit structure: days 1–20 are fully covered; days 21–100 carry a daily copay (~$200/day in 2025). Day 101 and beyond are not covered — costs shift to Medicaid (if eligible) or private pay at that point.");
    lines.push("Medicare coverage continues only while skilled services are medically necessary — nursing, physical therapy, occupational therapy, or speech therapy. If the care team determines the person has plateaued and no longer needs skilled care, Medicare stops paying even before the 100-day maximum. An appeal can be filed if you disagree with that determination; ask the facility for a written notice before coverage ends.");
  } else if (isHome) {
    lines.push("Medicare's home health benefit covers skilled nursing visits, physical therapy, occupational therapy, and speech therapy when the person is homebound and a physician has ordered skilled care. No copay and no prior hospitalization is required for home health coverage.");
    lines.push("What Medicare does not cover: custodial home care — the daily help with bathing, dressing, toileting, and meals that constitutes the majority of elder care cost. Custodial care must be funded privately, through long-term care insurance, or through Medicaid. A home health agency can identify which specific services are Medicare-billable vs. private pay.");
  } else if (isAL) {
    lines.push("Assisted living and independent living costs — room, board, and personal care — are not covered by Medicare. Medicare may cover skilled services delivered within the facility (visiting physical therapist, wound care nurse, durable medical equipment), but does not cover the facility itself.");
    lines.push("Residents typically continue using Medicare Part B for physician visits and outpatient services. If the person requires a higher care level and transfers to a skilled nursing facility after a hospital admission, Medicare's SNF benefit may apply at that point.");
  } else if (isMemoryCare) {
    lines.push("Memory care facility costs are not covered by Medicare. Medicare may reimburse skilled services delivered within the facility — physical therapy, occupational therapy, or skilled nursing visits — but not room, board, or dementia-specific care.");
    lines.push("Most memory care residents fund costs through private pay until Medicaid eligibility is established. Medicaid covers memory care through waiver programs in most states — an elder law attorney can advise on the spend-down process and application timeline.");
  } else {
    // Generic enrolled summary (no care setting known)
    lines.push("Medicare is active. Part A covers inpatient hospital care and skilled nursing facility stays after a qualifying hospital admission (up to 100 days). Part B covers physician visits, outpatient services, and home health. Neither Part A nor Part B covers custodial long-term care — the daily assistance with bathing, dressing, and meals that constitutes the majority of elder care costs at home or in a facility.");
  }

  // Hospice addendum for terminal or serious conditions
  const hasCancer      = i.healthCondition?.startsWith("Cancer");
  const hasNeurological = i.healthCondition?.startsWith("Neurological");
  if (hasCancer || hasNeurological) {
    lines.push("Medicare's hospice benefit is available when a physician certifies a terminal prognosis of 6 months or less and the patient elects comfort-focused care over curative treatment. Hospice covers nursing visits, aide services, medications for the terminal condition, chaplaincy, and family counseling — with no copay for covered services. Electing hospice does not mean giving up all medical care, only curative treatment for the terminal diagnosis.");
  }

  // High care need at home — custodial gap clarification if not already covered
  const highCare = i.adlLevel?.startsWith("Fully dependent") || i.adlLevel?.startsWith("Significant assistance");
  if (highCare && isHome && !lines.some(l => l.includes("custodial"))) {
    lines.push("Given the current level of daily care assistance needed, it is worth clarifying which specific services are Medicare-billable skilled care vs. custodial care that must be funded privately. A care manager or home health agency can help map services to coverage categories.");
  }

  return lines.length > 0 ? lines.join(" ") : null;
}

function buildStateContext(a: AssessmentAnswers, i: IntakeAnswers): StateContext | null {
  if (!i.state || !STATE_DATA[i.state]) return null;

  const s = STATE_DATA[i.state];
  const showMedicaid = ["ongoing", "planning", "self", "crisis"].includes(a.situation);
  const showProbate = a.situation === "loss";
  const hasSpouse = i.spouse === "Yes";

  // Asset comparison note
  let assetComparison: string | undefined;
  if (i.assets && i.assets !== "Not sure") {
    if (i.assets === "Under $100,000") {
      assetComparison = `Estimated assets of under $100,000 — may be at or near Medicaid eligibility threshold. An elder law attorney can confirm current eligibility.`;
    } else if (i.assets !== "Not sure") {
      assetComparison = `Estimated assets of ${i.assets.toLowerCase()} likely exceed the individual Medicaid limit of ${s.assetLimit}. Planning may be needed to protect assets while establishing or preserving eligibility.`;
    }
  }

  const showPropertyTools = i.realEstate === "Yes" && showMedicaid;
  let todDeedNote = "";
  if (s.todDeed === "Allowed" || s.todDeed === "Allowed (also Lady Bird deed)") {
    todDeedNote = `${i.state} allows a Transfer on Death deed — a simple, low-cost way to pass the property to a named beneficiary without probate and potentially outside MERP recovery. Consult a local attorney to confirm current requirements.`;
  } else if (s.todDeed === "Lady Bird deed only") {
    todDeedNote = `${i.state} does not have a standard TOD deed statute but does recognize the Lady Bird deed (enhanced life estate), which achieves a similar result — the owner retains full control during life and the property passes outside probate at death.`;
  } else if (s.todDeed === "Not allowed") {
    todDeedNote = `${i.state} does not currently allow Transfer on Death deeds or Lady Bird deeds. A revocable living trust is the primary alternative for passing real property outside probate and potentially protecting against MERP recovery.`;
  } else {
    todDeedNote = `TOD deed availability in ${i.state} is not confirmed — verify with a local attorney. A revocable living trust is a reliable alternative in any state.`;
  }

  return {
    medicaid: showMedicaid ? {
      assetLimit: s.assetLimit,
      csra: hasSpouse ? s.csra : "N/A — no spouse",
      incomeLimit: s.incomeLimit,
      lookbackNote: "Medicaid applies a 60-month (5-year) look-back period for asset transfers. Gifts or asset transfers made within this window can create a penalty period delaying eligibility.",
      assetComparison,
      notes: s.medicaidNotes,
    } : undefined,
    probate: showProbate ? {
      minWait: s.probateWait,
      courtRequired: s.probateCourtReq,
      notes: s.probateNotes,
    } : undefined,
    propertyTools: showPropertyTools ? {
      todDeed: s.todDeed,
      todDeedNote,
    } : undefined,
    disclaimer: `Reference data for ${i.state} (2026). These are general figures — your specific situation may differ based on asset types, marital status, prior transfers, and other factors. Confirm all figures with a licensed professional.`,
  };
}

// ---------------------------------------------------------------------------
// Existing builder functions
// ---------------------------------------------------------------------------

function urgencyLabel(urgency: string): string {
  switch (urgency) {
    case "extremely": return "Extremely urgent";
    case "soon": return "Some urgency — acting soon";
    case "not-urgent": return "Not urgent — planning ahead";
    default: return "Not specified";
  }
}

function buildSituationOverview(a: AssessmentAnswers, i: IntakeAnswers): string {
  const loc = i.state || "an unspecified state";

  const willTrustStatus =
    i.legalDocs === "Neither" ? "No will or trust has been located."
    : i.legalDocs === "Both a will and a trust" ? "Both a will and a trust are in place."
    : i.legalDocs === "Will only" ? "A will is in place."
    : i.legalDocs === "Trust only" ? "A trust is in place."
    : "The status of a will or trust is uncertain.";

  const poaStatus =
    i.poa === "Yes, both are in place" ? "Both a financial POA and Healthcare Proxy are in place."
    : i.poa === "Neither exists" ? "No Power of Attorney or Healthcare Proxy is currently in place."
    : i.poa === "One exists but not the other" ? "Only one of a financial POA or Healthcare Proxy exists."
    : "Legal document status requires follow-up.";

  const assetStr = i.assets ? `, with a total estimated value in the ${i.assets.toLowerCase()} range` : "";
  const realEstStr = i.realEstate === "Yes" ? " real estate" : "";
  const retStr = i.retirement === "Yes" ? (i.realEstate === "Yes" ? " and retirement accounts" : " retirement accounts") : "";
  const estateStr = (realEstStr || retStr) ? ` The estate includes${realEstStr}${retStr}${assetStr}.` : (i.assets ? ` Estimated estate value is in the ${i.assets.toLowerCase()} range.` : "");

  switch (a.situation) {
    case "loss":
      return `An adult child is managing the estate of a recently deceased parent in ${loc}. ${willTrustStatus}${estateStr}`;

    case "crisis": {
      const ageStr = i.age ? `a person aged ${i.age.toLowerCase()}` : "an elderly family member";
      const dementiaStr = i.dementia === "Yes" ? " and has a diagnosis of dementia or cognitive decline" : "";
      const livingStr = i.living ? `, currently ${i.living.toLowerCase()}` : "";
      return `A family is seeking urgent eldercare guidance for ${ageStr} in ${loc}${livingStr}${dementiaStr}. ${poaStatus}`;
    }

    case "ongoing": {
      const ageStr = i.age ? `${i.age.toLowerCase()} year-old` : "elderly";
      const dementiaStr = i.dementia === "Yes" ? " with a dementia diagnosis" : "";
      const livingStr = i.living ? `, currently ${i.living.toLowerCase()}` : "";
      const concernStr = a.concerns.length > 0 ? a.concerns.join(", ").toLowerCase() : "care coordination and financial planning";
      return `A family is managing ongoing care for a ${ageStr} family member in ${loc}${livingStr}${dementiaStr}. The family is seeking guidance on ${concernStr}.`;
    }

    case "planning":
      return `A family in ${loc} is getting legal and financial affairs in order. ${poaStatus}${i.assets ? ` Estimated assets are in the ${i.assets.toLowerCase()} range.` : ""}`;

    case "self": {
      const ageStr = i.age ? `${i.age.toLowerCase()}` : "unspecified age";
      const livingStr = i.living ? `, currently ${i.living.toLowerCase()}` : "";
      return `An aging individual (${ageStr}) in ${loc}${livingStr} is proactively planning for their own future care. They are seeking guidance on Medicare, long-term care options, and ensuring legal documents are current.`;
    }

    default:
      return `A family in ${loc} is seeking eldercare guidance and professional support.`;
  }
}

function buildLegalDocuments(a: AssessmentAnswers, i: IntakeAnswers): { inPlace: string[]; missing: string[] } {
  const inPlace: string[] = [];
  const missing: string[] = [];

  if (i.legalDocs === "Will only") {
    inPlace.push("Will");
    missing.push("Trust");
  } else if (i.legalDocs === "Trust only") {
    inPlace.push("Trust");
    missing.push("Will");
  } else if (i.legalDocs === "Both a will and a trust") {
    inPlace.push("Will", "Trust");
  } else if (i.legalDocs === "Neither") {
    missing.push("Will", "Trust");
  } else {
    missing.push("Will/Trust — status unknown");
  }

  if (i.poa === "Yes, both are in place") {
    inPlace.push("Durable Power of Attorney", "Healthcare Proxy");
  } else if (i.poa === "One exists but not the other") {
    inPlace.push("One legal document (POA or Healthcare Proxy)");
    missing.push("Missing counterpart (POA or Healthcare Proxy)");
  } else if (i.poa === "Neither exists") {
    missing.push("Durable Power of Attorney", "Healthcare Proxy");
  } else {
    missing.push("POA/Healthcare Proxy — status unknown");
  }

  if (a.inPlace.includes("advance-directive")) {
    inPlace.push("Advance Directive / Living Will");
  } else {
    missing.push("Advance Directive / Living Will");
  }

  return { inPlace, missing };
}

function buildFamilyContext(i: IntakeAnswers): string {
  const spouseLine =
    i.spouse === "Yes" ? "A surviving spouse or domestic partner is present." :
    i.spouse === "No" ? "No surviving spouse or domestic partner." : "";
  const disputeLine =
    i.disputes === "Yes" ? "Family disagreements about care decisions or the estate have been noted — the professional should be aware." :
    i.disputes === "Possibly" ? "Potential family disagreements may exist and are worth discussing." :
    i.disputes === "No" ? "No known family disputes." : "";
  return [spouseLine, disputeLine].filter(Boolean).join(" ");
}

function buildWhatNeeded(a: AssessmentAnswers, i: IntakeAnswers): string {
  switch (a.situation) {
    case "crisis":
      return `The family needs immediate guidance on navigating care options and coverage.${i.poa === "Neither exists" ? " Establishing legal documents urgently is also a priority." : ""}`;
    case "loss":
      return "The family is seeking guidance on the probate process, asset distribution, and the required legal next steps.";
    case "ongoing":
      return `The family needs support with${i.dementia === "Yes" ? " dementia care planning," : ""} Medicaid eligibility review, and ongoing care coordination.`;
    case "planning":
      return "The family is seeking help drafting or updating legal documents and ensuring assets are properly protected.";
    case "self":
      return "The individual is seeking guidance on Medicare enrollment, long-term care funding options, and legal document preparation.";
    default:
      return "The family is seeking eldercare guidance and professional support.";
  }
}

function buildAlreadyDone(i: IntakeAnswers): string {
  switch (i.attorney) {
    case "Yes, we've spoken with one": return "An attorney has already been consulted about this situation.";
    case "Not yet": return "No attorney has been contacted yet.";
    case "Not sure": return "It is unclear whether an attorney has been consulted previously.";
    default: return "Attorney consultation status was not provided.";
  }
}

function buildPriorityActions(a: AssessmentAnswers, i: IntakeAnswers): string[] {
  const actions: string[] = [];

  switch (a.situation) {
    case "crisis":
      if (i.dementia === "Yes" && i.poa !== "Yes, both are in place") {
        actions.push("Consult an elder law attorney today about emergency Power of Attorney or guardianship — with cognitive decline present, this is time-critical");
      } else if (i.poa === "Neither exists") {
        actions.push("Consult an elder law attorney about establishing Power of Attorney and Healthcare Proxy as soon as possible");
      }
      if (i.living === "Currently in the hospital") {
        actions.push("Connect with the hospital social worker today — they coordinate discharge planning and can identify covered resources");
      }
      actions.push("Contact Medicare (1-800-MEDICARE) to understand what services and care settings are currently covered");
      actions.push("Gather all existing legal documents and have them ready before any professional consultation");
      if (i.veteran === "Yes") {
        actions.push("Contact a Veterans benefits counselor about VA Aid & Attendance — this benefit can provide $1,500–$2,300+/month toward care costs and is widely underutilized");
      }
      break;

    case "loss":
      if (i.legalDocs !== "Trust only" && i.legalDocs !== "Both a will and a trust") {
        actions.push("File for probate with the county court — required to transfer titled assets without a trust in place");
      }
      actions.push("Notify Social Security, pension providers, and financial institutions of the death");
      actions.push("Inventory all accounts, real estate, insurance policies, and titled assets");
      actions.push("Review beneficiary designations on life insurance and retirement accounts — these pass outside the will");
      actions.push("Consult an estate or probate attorney to understand state-specific timelines and creditor notification requirements");
      break;

    case "ongoing":
      actions.push("Schedule a Medicaid eligibility review with an elder law attorney before asset levels change");
      actions.push("Contact your local Area Agency on Aging at eldercare.acl.gov for free care coordination resources");
      if (i.dementia === "Yes") {
        actions.push("Consult a geriatric care manager for a formal assessment of current and future care needs");
      }
      if (i.poa !== "Yes, both are in place") {
        actions.push("Establish or update Power of Attorney and Healthcare Proxy while the person can still legally sign");
      }
      if (i.veteran === "Yes") {
        actions.push("Contact a Veterans benefits counselor about VA Aid & Attendance — this benefit can provide $1,500–$2,300+/month toward care costs and is widely underutilized");
      }
      break;

    case "planning":
      if (i.poa !== "Yes, both are in place") {
        actions.push("Draft or update Power of Attorney and Healthcare Proxy — these are foundational to any elder care plan");
      }
      actions.push("Review beneficiary designations on all accounts and insurance policies — these override the will");
      actions.push("Consult an elder law attorney to review Medicaid planning options before they're needed");
      if (i.legalDocs === "Neither" || i.legalDocs === "Will only") {
        actions.push("Consider a revocable living trust to avoid the probate process and allow for smoother asset transfer");
      }
      if (i.veteran === "Yes") {
        actions.push("Contact a Veterans benefits counselor to identify VA benefits available now and in the future");
      }
      break;

    case "self":
      if (i.poa !== "Yes, both are in place") {
        actions.push("Ensure a Durable Power of Attorney and Healthcare Proxy are drafted and current — these are essential if you become incapacitated");
      }
      actions.push("Review Medicare coverage and consider a supplemental (Medigap) plan if not already in place");
      if (i.ltcInsurance !== "Yes") {
        actions.push("Research long-term care insurance options — premiums are substantially lower when purchased earlier");
      }
      actions.push("Meet with an elder law attorney to review or create your will and explore trust options");
      if (i.veteran === "Yes") {
        actions.push("Contact a Veterans benefits counselor to understand what VA benefits are available to you now and as care needs evolve");
      }
      break;

    default:
      actions.push("Gather all existing legal documents for a professional review");
      actions.push("Contact a local elder law attorney for an initial consultation");
  }

  return actions.slice(0, 5);
}

function buildProfessionalMatch(a: AssessmentAnswers, i: IntakeAnswers): { type: string; reason: string } {
  const isVeteran = i.veteran === "Yes";
  const noLegalDocs = i.poa === "Neither exists" || i.legalDocs === "Neither";
  const hasDementia = i.dementia === "Yes";
  const highAssets = i.assets === "$500,000 – $1,000,000" || i.assets === "Over $1,000,000";
  const highCareNeeds = i.adlLevel?.startsWith("Fully dependent") || i.adlLevel?.startsWith("Significant assistance");
  const hasNeurological = i.healthCondition?.startsWith("Neurological");
  const hasCancer = i.healthCondition?.startsWith("Cancer");
  const vetNote = isVeteran ? " A Veterans benefits counselor should also be engaged to maximize VA Aid & Attendance benefits, which can significantly offset care costs." : "";
  const careNote = (highCareNeeds && !hasDementia) ? " Given the current care level, a geriatric care manager should also be engaged to assess care settings and coordinate support." : "";

  switch (a.situation) {
    case "loss":
      return {
        type: "Estate or Probate Attorney",
        reason: `A probate attorney handles the legal process of settling an estate — inventorying assets, notifying creditors, and distributing to beneficiaries according to the will or state law. They ensure compliance with ${i.state || "your state"}'s specific probate timelines and requirements.${vetNote}`,
      };

    case "crisis":
      if (noLegalDocs || hasDementia) {
        return {
          type: isVeteran ? "Elder Law Attorney + Veterans Benefits Counselor" : "Elder Law Attorney",
          reason: `An elder law attorney should be the first call. The combination of an urgent situation${hasDementia ? ", cognitive decline," : ""} and missing legal documents requires immediate legal intervention — establishing or challenging POA, exploring guardianship, and navigating Medicare coverage.${vetNote}${careNote}`,
        };
      }
      if (hasCancer) {
        return {
          type: isVeteran ? "Oncology Social Worker + Veterans Benefits Counselor" : "Oncology Social Worker",
          reason: `An oncology social worker specializes in navigating the care, financial, and emotional challenges of active cancer treatment — coordinating between oncology teams, identifying financial assistance programs, and planning for transitions in care.${vetNote}`,
        };
      }
      if (highCareNeeds || hasNeurological) {
        return {
          type: isVeteran ? "Geriatric Care Manager + Veterans Benefits Counselor" : "Geriatric Care Manager",
          reason: `A geriatric care manager specializes in navigating acute eldercare situations — evaluating care needs, coordinating with providers, and identifying the right level of care quickly${hasNeurological ? ", including specialists in neurological care settings" : ""}. They can often act within 24–48 hours.${vetNote}`,
        };
      }
      return {
        type: isVeteran ? "Geriatric Care Manager + Veterans Benefits Counselor" : "Geriatric Care Manager",
        reason: `A geriatric care manager specializes in navigating acute eldercare situations — evaluating care needs, coordinating with providers, and identifying the right level of care quickly. They can often act within 24–48 hours.${vetNote}`,
      };

    case "ongoing":
      if (highAssets || hasDementia) {
        return {
          type: isVeteran ? "Elder Law Attorney + Veterans Benefits Counselor" : "Elder Law Attorney",
          reason: `An elder law attorney is essential for Medicaid planning${hasDementia ? " and establishing legal authority given cognitive decline" : ""}. Without proactive planning, high assets can erode quickly once care costs begin.${vetNote}${careNote}`,
        };
      }
      if (hasCancer) {
        return {
          type: isVeteran ? "Oncology Social Worker + Veterans Benefits Counselor" : "Oncology Social Worker",
          reason: `An oncology social worker can coordinate between the medical team, family, and community resources — helping manage the practical and financial dimensions of ongoing cancer care.${vetNote}`,
        };
      }
      return {
        type: isVeteran ? "Geriatric Care Manager + Veterans Benefits Counselor" : "Geriatric Care Manager",
        reason: `A geriatric care manager can coordinate the ongoing care picture — evaluating care levels, researching facilities or in-home options, and serving as a consistent liaison between family and providers.${vetNote}`,
      };

    case "planning":
      return {
        type: isVeteran ? "Elder Law Attorney + Veterans Benefits Counselor" : "Elder Law Attorney",
        reason: `An elder law attorney covers the full planning picture — legal documents, Medicaid strategy, asset protection, and trust planning. Early planning gives the most options and typically the best outcomes.${vetNote}`,
      };

    case "self":
      return {
        type: isVeteran ? "Elder Law Attorney + Veterans Benefits Counselor" : "Elder Law Attorney",
        reason: `An elder law attorney helps individuals plan ahead — drafting legal documents, structuring assets to preserve future Medicaid eligibility, and addressing long-term care funding before a crisis occurs.${vetNote}`,
      };

    default:
      return {
        type: "Elder Law Attorney",
        reason: "An elder law attorney is typically the best first call — they can assess the full picture and refer to other specialists as needed.",
      };
  }
}

function buildRedFlags(a: AssessmentAnswers, i: IntakeAnswers): string[] {
  const flags: string[] = [];

  if (i.dementia === "Yes" && i.poa !== "Yes, both are in place") {
    flags.push("No legal authority in place for someone with cognitive decline — Power of Attorney must be established while the person can still legally sign. This is time-critical and may require expedited legal action.");
  }

  if ((i.assets === "$500,000 – $1,000,000" || i.assets === "Over $1,000,000") && (a.situation === "ongoing" || a.situation === "planning")) {
    flags.push("Assets may exceed Medicaid eligibility thresholds. Medicaid has a 5-year look-back period — waiting to plan costs real money. An elder law attorney should be consulted now.");
  }

  if (i.veteran === "Yes") {
    flags.push("Veteran identified — VA Aid & Attendance is a commonly overlooked benefit that can provide $1,500–$2,300+/month toward qualifying care costs. A Veterans benefits counselor should be engaged.");
  }

  if (i.disputes === "Yes") {
    flags.push("Known family disputes noted — the professional should be made aware before engaging with family members to avoid inadvertently taking sides or complicating the situation.");
  }

  if (a.situation === "loss" && (i.legalDocs === "Neither" || i.legalDocs === "Not sure")) {
    flags.push("No will or trust was confirmed — intestate succession laws will govern how assets are distributed, which may not align with the deceased's wishes.");
  }

  if (i.realEstate === "Yes" && (a.situation === "ongoing" || a.situation === "planning") && i.todDeed !== "Yes" && i.propertyTitle !== "In a trust") {
    if (i.propertyUse?.startsWith("Rental")) {
      flags.push("Rental or investment property is a countable asset for Medicaid purposes — unlike a primary residence, it cannot be excluded from eligibility calculations. An elder law attorney should advise on how to handle this asset in a Medicaid planning context.");
    } else {
      flags.push("Primary residence may be subject to Medicaid Estate Recovery (MERP) after death — the state can claim the home to recoup Medicaid benefits paid. No TOD deed or trust was confirmed. This is one of the most overlooked risks in elder care planning.");
    }
  }

  if (i.realEstate === "Yes" && a.situation === "loss" && i.propertyTitle === "Tenants in common") {
    flags.push("Property held as tenants in common does NOT automatically transfer to the surviving co-owner. The deceased's share requires probate — it does not pass like joint tenancy.");
  }

  const fullyDependent = i.adlLevel?.startsWith("Fully dependent") || i.adlLevel?.startsWith("Significant assistance");
  if (fullyDependent && i.poa !== "Yes, both are in place" && (a.situation === "ongoing" || a.situation === "crisis")) {
    if (i.dementia !== "Yes") {
      // dementia case already flagged above; this catches high ADL need without dementia
      flags.push("The person requires significant or full-time daily assistance but no confirmed Power of Attorney or Healthcare Proxy exists. Legal documents must be in place before a health crisis makes them impossible to execute.");
    }
  }

  if (i.medicareStatus === "Not yet enrolled (under 65 or not yet applied)" && (a.situation === "ongoing" || a.situation === "crisis")) {
    flags.push("Medicare enrollment has not occurred. If care is being provided without coverage in place, costs may be entirely out-of-pocket. Enrollment timing and options should be reviewed immediately.");
  }

  if (i.healthCondition?.startsWith("Cancer") && a.situation === "ongoing") {
    if (i.poa !== "Yes, both are in place") {
      flags.push("Active cancer with no confirmed Healthcare Proxy — decisions about treatment, hospitalization, and end-of-life care require this document. It should be prioritized immediately.");
    }
  }

  return flags;
}

function buildExecutorChecklist(a: AssessmentAnswers, i: IntakeAnswers): ExecutorTask[] | null {
  if (a.situation !== "loss") return null;

  const tasks: ExecutorTask[] = [];
  const stateProbateWait = i.state && STATE_DATA[i.state] ? STATE_DATA[i.state].probateWait : "several months";

  // ── Immediate (24–72 hours) ────────────────────────────────────────────────
  tasks.push({
    timeframe: "immediate",
    task: "Obtain certified copies of the death certificate",
    notes: "Request 10–15 copies. Banks, courts, insurance companies, government agencies, and financial institutions each require an original certified copy — not a photocopy.",
  });
  tasks.push({
    timeframe: "immediate",
    task: "Locate the will and any trust documents",
    notes: "The original signed will is required for probate. Check home files, a safe deposit box, or with any attorney who may have prepared it.",
  });
  tasks.push({
    timeframe: "immediate",
    task: "Secure the property and collect the mail",
    notes: "If the home is now vacant, consider changing locks and forwarding mail to the executor's address to prevent missed bills or notices.",
  });
  tasks.push({
    timeframe: "immediate",
    task: "Notify the Social Security Administration",
    notes: "Call 1-800-772-1213. If the person received a payment for the month of death, it must be returned to SSA. Surviving spouses may be eligible for survivor benefits.",
  });
  if (i.veteran === "Yes") {
    tasks.push({
      timeframe: "immediate",
      task: "Notify the Department of Veterans Affairs",
      notes: "Call 1-800-827-1000. The VA may provide burial benefits and surviving spouse or dependent benefits. Have the person's DD-214 discharge paperwork available.",
    });
  }

  // ── First week ─────────────────────────────────────────────────────────────
  tasks.push({
    timeframe: "first-week",
    task: "Notify Medicare and any supplemental insurance carriers",
    notes: "Call 1-800-MEDICARE. Cancel supplemental (Medigap) coverage to stop ongoing premium charges. Request any outstanding claims be processed.",
  });
  tasks.push({
    timeframe: "first-week",
    task: "Notify banks and financial institutions",
    notes: "Bring certified death certificates. Ask to freeze individual accounts, identify any joint or POD (payable on death) accounts, and request date-of-death balances for inventory purposes.",
  });
  tasks.push({
    timeframe: "first-week",
    task: "Cancel credit cards and recurring subscriptions",
    notes: "Request account statements showing balances owed at the date of death — these become estate debts. Cancel automatic payments to avoid charges against the account.",
  });
  if (i.retirement === "Yes") {
    tasks.push({
      timeframe: "first-week",
      task: "Contact retirement account administrators (IRA, 401k, pension)",
      notes: "Retirement accounts pass directly to named beneficiaries outside the will and outside probate. Each administrator has its own transfer or distribution process — start this early.",
    });
  }
  tasks.push({
    timeframe: "first-week",
    task: "Consult a probate or estate attorney",
    notes: `In ${i.state || "your state"}, the probate waiting period is typically ${stateProbateWait}. An attorney will clarify which assets require probate, the court filing requirements, and the creditor notification process specific to your state.`,
  });

  // ── First month ────────────────────────────────────────────────────────────
  if (i.legalDocs !== "Trust only" && i.legalDocs !== "Both a will and a trust") {
    tasks.push({
      timeframe: "first-month",
      task: "File for probate with the county court",
      notes: "Required to transfer titled assets when no trust governs them. File promptly — delays can complicate real estate sales and account transfers. The court will issue Letters Testamentary authorizing you to act as executor.",
    });
    tasks.push({
      timeframe: "first-month",
      task: "Publish creditor notice as required by state law",
      notes: "Most states require formal creditor notification through publication in a local newspaper. This starts the clock on the creditor claim period — typically 3–6 months — after which late claims are barred.",
    });
  }
  tasks.push({
    timeframe: "first-month",
    task: "Open a dedicated estate bank account",
    notes: "All estate income (rent, dividends, refunds) and expenses (bills, attorney fees, court costs) must flow through a single estate account. Do not commingle estate funds with personal funds.",
  });
  tasks.push({
    timeframe: "first-month",
    task: "Complete a full inventory of all assets and their fair market value as of date of death",
    notes: "Include real estate, bank and investment accounts, retirement accounts, vehicles, personal property, business interests, and life insurance. This inventory is required for probate court and estate tax purposes.",
  });
  if (i.realEstate === "Yes") {
    tasks.push({
      timeframe: "first-month",
      task: "Order a title search on the real estate",
      notes: "Confirms ownership, identifies any liens or encumbrances, and determines the correct transfer path for the property — whether through affidavit, probate, or trust administration.",
    });
  }
  tasks.push({
    timeframe: "first-month",
    task: "Locate and file claims on all life insurance policies",
    notes: "Life insurance passes directly to named beneficiaries outside the will and outside probate. Contact each insurer with a certified death certificate. Most policies pay within 30–60 days of claim.",
  });

  // ── Ongoing ────────────────────────────────────────────────────────────────
  tasks.push({
    timeframe: "ongoing",
    task: "Pay valid estate debts from estate funds only",
    notes: "Do not pay debts from personal funds. Estate debts are paid in priority order: secured debts first, then taxes, then unsecured creditors. Paying in the wrong order can create personal liability.",
  });
  tasks.push({
    timeframe: "ongoing",
    task: "File the final federal income tax return (Form 1040)",
    notes: "Due April 15 of the year following death, or October 15 with extension. Covers income earned from January 1 through the date of death. A tax professional experienced with decedent returns is strongly advisable.",
  });
  if (i.assets === "$500,000 – $1,000,000" || i.assets === "Over $1,000,000") {
    tasks.push({
      timeframe: "ongoing",
      task: "Determine if a federal or state estate tax return is required",
      notes: "The federal estate tax exemption is $13.61 million (2024). Many states have lower thresholds — some as low as $1 million. Consult a tax attorney or CPA familiar with estate tax.",
    });
  }
  tasks.push({
    timeframe: "ongoing",
    task: "Distribute assets to beneficiaries per the will or state law",
    notes: "Do not distribute until all debts, taxes, and court requirements are fully satisfied. Premature distribution can create personal liability for the executor if valid claims remain unpaid.",
  });
  tasks.push({
    timeframe: "ongoing",
    task: "File the final accounting with the probate court and close the estate",
    notes: "Once all assets are distributed and debts paid, the executor files a final accounting. The court issues a formal order closing the estate and discharging the executor from further responsibility.",
  });

  return tasks;
}

export function generateBrief(assessment: AssessmentAnswers, intake: IntakeAnswers): Brief {
  const legal = buildLegalDocuments(assessment, intake);

  return {
    situationOverview: buildSituationOverview(assessment, intake),
    keyFacts: [
      { label: "State", value: intake.state || "Not specified" },
      { label: "Age range", value: intake.age || "Not specified" },
      { label: "Current setting", value: intake.living || "Not specified" },
      { label: "Cognitive decline", value: intake.dementia || "Not specified" },
      ...(intake.adlLevel ? [{ label: "Daily assistance level", value: intake.adlLevel.split(" —")[0] }] : []),
      ...(intake.healthCondition ? [{ label: "Primary health condition", value: intake.healthCondition.split(" (")[0] }] : []),
      ...(intake.medicareStatus ? [{ label: "Medicare status", value: intake.medicareStatus.split(",")[0] }] : []),
      { label: "Estimated assets", value: intake.assets || "Not specified" },
      { label: "Real estate involved", value: intake.realEstate || "Not specified" },
      ...(intake.realEstate === "Yes" ? [
        { label: "Property titling", value: intake.propertyTitle || "Not specified" },
        { label: "TOD / Lady Bird deed", value: intake.todDeed || "Not specified" },
        ...(intake.mortgageStatus ? [{ label: "Active mortgage", value: intake.mortgageStatus }] : []),
        ...(intake.propertyUse ? [{ label: "Property use", value: intake.propertyUse }] : []),
      ] : []),
      { label: "Retirement / business interests", value: intake.retirement || "Not specified" },
      { label: "Veteran status", value: intake.veteran || "Not specified" },
      { label: "Long-term care insurance", value: intake.ltcInsurance || "Not specified" },
      { label: "Urgency", value: urgencyLabel(assessment.urgency) },
    ],
    legalInPlace: legal.inPlace,
    legalMissing: legal.missing,
    familyContext: buildFamilyContext(intake),
    whatNeeded: buildWhatNeeded(assessment, intake),
    alreadyDone: buildAlreadyDone(intake),
    priorityActions: buildPriorityActions(assessment, intake),
    professionalMatch: buildProfessionalMatch(assessment, intake),
    redFlags: buildRedFlags(assessment, intake),
    healthContext: buildHealthContext(assessment, intake),
    medicareContext: buildMedicareContext(assessment, intake),
    realPropertyContext: buildRealPropertyContext(assessment, intake),
    executorChecklist: buildExecutorChecklist(assessment, intake),
    stateContext: buildStateContext(assessment, intake),
  };
}
