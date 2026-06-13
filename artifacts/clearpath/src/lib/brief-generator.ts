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
      { label: "Urgency", value: urgencyLabel(assessment.urgency) },
    ],
    legalInPlace: legal.inPlace,
    legalMissing: legal.missing,
    familyContext: buildFamilyContext(intake),
    whatNeeded: buildWhatNeeded(assessment, intake),
    alreadyDone: buildAlreadyDone(intake),
  };
}
