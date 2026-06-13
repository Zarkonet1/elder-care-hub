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
  assets: string;
  realEstate: string;
  retirement: string;
  veteran: string;
  ltcInsurance: string;
  legalDocs: string;
  poa: string;
  spouse: string;
  disputes: string;
  attorney: string;
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
}

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
  const vetNote = isVeteran ? " A Veterans benefits counselor should also be engaged to maximize VA Aid & Attendance benefits, which can significantly offset care costs." : "";

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
          reason: `An elder law attorney should be the first call. The combination of an urgent situation${hasDementia ? ", cognitive decline," : ""} and missing legal documents requires immediate legal intervention — establishing or challenging POA, exploring guardianship, and navigating Medicare coverage.${vetNote}`,
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
          reason: `An elder law attorney is essential for Medicaid planning${hasDementia ? " and establishing legal authority given cognitive decline" : ""}. Without proactive planning, high assets can erode quickly once care costs begin.${vetNote}`,
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

  return flags;
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
      { label: "Estimated assets", value: intake.assets || "Not specified" },
      { label: "Real estate involved", value: intake.realEstate || "Not specified" },
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
  };
}
