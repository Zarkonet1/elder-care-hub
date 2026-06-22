function formatBriefHtml(brief) {
  const keyFactsRows = brief.keyFacts
    .map(
      (f) =>
        `<tr>
          <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;color:#6b7280;font-size:14px">${f.label}</td>
          <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;font-weight:600;font-size:14px;text-align:right">${f.value}</td>
        </tr>`
    )
    .join("");

  const inPlaceItems =
    brief.legalInPlace.length > 0
      ? brief.legalInPlace
          .map((item) => `<li style="color:#15803d;margin-bottom:6px">✓ ${item}</li>`)
          .join("")
      : `<li style="color:#9ca3af;font-style:italic">None confirmed</li>`;

  const missingItems =
    brief.legalMissing.length > 0
      ? brief.legalMissing
          .map((item) => `<li style="color:#dc2626;margin-bottom:6px">✗ ${item}</li>`)
          .join("")
      : `<li style="color:#9ca3af;font-style:italic">Nothing identified</li>`;

  const priorityActionsHtml =
    brief.priorityActions && brief.priorityActions.length > 0
      ? brief.priorityActions
          .map(
            (action, i) =>
              `<tr>
                <td style="padding:10px 0;vertical-align:top;width:32px">
                  <span style="display:inline-flex;align-items:center;justify-content:center;width:24px;height:24px;border-radius:50%;background:#f0f4ff;color:#4b6bfb;font-size:12px;font-weight:700">${i + 1}</span>
                </td>
                <td style="padding:10px 0 10px 12px;font-size:14px;color:#374151;line-height:1.5;border-bottom:1px solid #f3f4f6">${action}</td>
              </tr>`
          )
          .join("")
      : `<tr><td colspan="2" style="color:#9ca3af;font-style:italic;padding:8px 0">No specific actions identified</td></tr>`;

  const redFlagsHtml =
    brief.redFlags && brief.redFlags.length > 0
      ? `
    <div style="background:#fef2f2;border:1px solid #fecaca;border-radius:8px;padding:20px 24px;margin-bottom:28px">
      <p style="margin:0 0 12px;font-size:12px;font-weight:700;color:#dc2626;text-transform:uppercase;letter-spacing:0.08em">⚠ Important Notes</p>
      ${brief.redFlags
        .map(
          (flag) =>
            `<p style="margin:0 0 10px;font-size:14px;color:#7f1d1d;line-height:1.55">• ${flag}</p>`
        )
        .join("")}
    </div>`
      : "";

  const professionalMatchHtml = brief.professionalMatch
    ? `
      <p style="margin:0 0 6px;font-size:15px;font-weight:700;color:#4b6bfb">${brief.professionalMatch.type}</p>
      <p style="margin:0;font-size:14px;color:#374151;line-height:1.6">${brief.professionalMatch.reason}</p>`
    : `<p style="color:#9ca3af;font-style:italic">Not specified</p>`;

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif">
  <div style="max-width:620px;margin:32px auto">

    <div style="background:#1a1a2e;padding:28px 32px;border-radius:12px 12px 0 0">
      <p style="margin:0 0 4px;color:#c9a84c;font-size:12px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase">ClearPath Elder Guide</p>
      <h1 style="margin:0;color:#ffffff;font-size:26px;font-weight:700">New Intake Brief</h1>
      <p style="margin:8px 0 0;color:#94a3b8;font-size:14px">Generated just now — no personal identifying information included</p>
    </div>

    <div style="background:#ffffff;padding:32px;border-left:1px solid #e5e7eb;border-right:1px solid #e5e7eb">

      ${redFlagsHtml}

      <h2 style="margin:0 0 12px;color:#1a1a2e;font-size:16px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;border-bottom:2px solid #c9a84c;padding-bottom:8px">Priority Action List</h2>
      <table style="width:100%;border-collapse:collapse;margin-bottom:28px">
        ${priorityActionsHtml}
      </table>

      ${brief.executorChecklist && brief.executorChecklist.length > 0 ? `
      <h2 style="margin:0 0 12px;color:#1a1a2e;font-size:16px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;border-bottom:2px solid #c9a84c;padding-bottom:8px">Executor Checklist</h2>
      ${["immediate","first-week","first-month","ongoing"].map((tf) => {
        const timeframeLabels = { immediate: "Within 24–72 Hours", "first-week": "First Week", "first-month": "First Month", ongoing: "Ongoing (Months 2–12)" };
        const group = brief.executorChecklist.filter(t => t.timeframe === tf);
        if (!group.length) return "";
        return `
          <p style="margin:16px 0 8px;font-size:11px;font-weight:700;color:#4b6bfb;text-transform:uppercase;letter-spacing:0.08em">${timeframeLabels[tf]}</p>
          ${group.map(t => `
            <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;padding:10px 14px;margin-bottom:8px">
              <p style="margin:0 0 ${t.notes ? "4px" : "0"};font-size:14px;font-weight:600;color:#1a1a2e">☐ ${t.task}</p>
              ${t.notes ? `<p style="margin:0;font-size:12px;color:#6b7280;line-height:1.5">${t.notes}</p>` : ""}
            </div>
          `).join("")}
        `;
      }).join("")}
      <div style="margin-bottom:28px"></div>
      ` : ""}

      <h2 style="margin:0 0 12px;color:#1a1a2e;font-size:16px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;border-bottom:2px solid #c9a84c;padding-bottom:8px">Situation Overview</h2>
      <p style="margin:0 0 28px;color:#374151;line-height:1.65;font-size:15px">${brief.situationOverview}</p>

      <h2 style="margin:0 0 12px;color:#1a1a2e;font-size:16px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;border-bottom:2px solid #c9a84c;padding-bottom:8px">Key Facts</h2>
      <table style="width:100%;border-collapse:collapse;margin-bottom:28px">
        ${keyFactsRows}
      </table>

      <h2 style="margin:0 0 12px;color:#1a1a2e;font-size:16px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;border-bottom:2px solid #c9a84c;padding-bottom:8px">Legal Documents</h2>
      <table style="width:100%;margin-bottom:28px"><tr>
        <td style="vertical-align:top;width:50%;padding-right:16px">
          <p style="margin:0 0 8px;font-size:11px;font-weight:700;color:#15803d;text-transform:uppercase;letter-spacing:0.08em">In Place</p>
          <ul style="margin:0;padding-left:18px;list-style:none">${inPlaceItems}</ul>
        </td>
        <td style="vertical-align:top;width:50%;padding-left:16px;border-left:1px solid #e5e7eb">
          <p style="margin:0 0 8px;font-size:11px;font-weight:700;color:#dc2626;text-transform:uppercase;letter-spacing:0.08em">Missing or Unknown</p>
          <ul style="margin:0;padding-left:18px;list-style:none">${missingItems}</ul>
        </td>
      </tr></table>

      <h2 style="margin:0 0 12px;color:#1a1a2e;font-size:16px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;border-bottom:2px solid #c9a84c;padding-bottom:8px">Family Context</h2>
      <p style="margin:0 0 28px;color:#374151;line-height:1.65;font-size:15px">${brief.familyContext}</p>

      <h2 style="margin:0 0 12px;color:#1a1a2e;font-size:16px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;border-bottom:2px solid #c9a84c;padding-bottom:8px">What's Needed</h2>
      <p style="margin:0 0 28px;color:#374151;line-height:1.65;font-size:15px">${brief.whatNeeded}</p>

      <h2 style="margin:0 0 12px;color:#1a1a2e;font-size:16px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;border-bottom:2px solid #c9a84c;padding-bottom:8px">Recommended Professional</h2>
      <div style="margin-bottom:28px">${professionalMatchHtml}</div>

      ${brief.healthContext ? `
      <h2 style="margin:0 0 12px;color:#1a1a2e;font-size:16px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;border-bottom:2px solid #c9a84c;padding-bottom:8px">Health &amp; Care Context</h2>
      <p style="margin:0 0 28px;color:#374151;line-height:1.65;font-size:15px">${brief.healthContext}</p>
      ` : ""}

      ${brief.realPropertyContext ? `
      <h2 style="margin:0 0 12px;color:#1a1a2e;font-size:16px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;border-bottom:2px solid #c9a84c;padding-bottom:8px">Real Property</h2>
      <p style="margin:0 0 28px;color:#374151;line-height:1.65;font-size:15px">${brief.realPropertyContext}</p>
      ` : ""}

      <h2 style="margin:0 0 12px;color:#1a1a2e;font-size:16px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;border-bottom:2px solid #c9a84c;padding-bottom:8px">What's Already Been Done</h2>
      <p style="margin:0 0 28px;color:#374151;line-height:1.65;font-size:15px">${brief.alreadyDone}</p>

      ${brief.stateContext ? `
      <h2 style="margin:0 0 12px;color:#1a1a2e;font-size:16px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;border-bottom:2px solid #c9a84c;padding-bottom:8px">State Reference Data</h2>
      ${brief.stateContext.medicaid ? `
        <p style="margin:0 0 8px;font-size:11px;font-weight:700;color:#4b6bfb;text-transform:uppercase;letter-spacing:0.08em">Medicaid Reference (2026)</p>
        <table style="width:100%;border-collapse:collapse;margin-bottom:12px">
          <tr>
            <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;color:#6b7280;font-size:13px">Individual asset limit</td>
            <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;font-weight:600;font-size:13px;text-align:right">${brief.stateContext.medicaid.assetLimit}</td>
          </tr>
          <tr>
            <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;color:#6b7280;font-size:13px">Monthly income limit</td>
            <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;font-weight:600;font-size:13px;text-align:right">${brief.stateContext.medicaid.incomeLimit}</td>
          </tr>
          ${brief.stateContext.medicaid.csra !== "N/A — no spouse" ? `
          <tr>
            <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;color:#6b7280;font-size:13px">Spouse may keep (CSRA)</td>
            <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;font-weight:600;font-size:13px;text-align:right">${brief.stateContext.medicaid.csra}</td>
          </tr>` : ""}
        </table>
        ${brief.stateContext.medicaid.assetComparison ? `<p style="margin:0 0 8px;font-size:13px;color:#92400e;background:#fffbeb;border:1px solid #fde68a;border-radius:6px;padding:10px 12px;line-height:1.5">${brief.stateContext.medicaid.assetComparison}</p>` : ""}
        <p style="margin:0 0 4px;font-size:12px;color:#6b7280;line-height:1.5">${brief.stateContext.medicaid.lookbackNote}</p>
        ${brief.stateContext.medicaid.notes ? `<p style="margin:4px 0 0;font-size:12px;color:#6b7280;font-style:italic;line-height:1.5">${brief.stateContext.medicaid.notes}</p>` : ""}
      ` : ""}
      ${brief.stateContext.probate ? `
        <p style="margin:16px 0 8px;font-size:11px;font-weight:700;color:#4b6bfb;text-transform:uppercase;letter-spacing:0.08em">Probate Reference</p>
        <table style="width:100%;border-collapse:collapse;margin-bottom:8px">
          <tr>
            <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;color:#6b7280;font-size:13px">Minimum waiting period</td>
            <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;font-weight:600;font-size:13px;text-align:right">${brief.stateContext.probate.minWait}</td>
          </tr>
          <tr>
            <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;color:#6b7280;font-size:13px">Court confirmation</td>
            <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;font-weight:600;font-size:13px;text-align:right">${brief.stateContext.probate.courtRequired ? "Required" : "May not be required"}</td>
          </tr>
        </table>
        <p style="margin:0 0 8px;font-size:12px;color:#6b7280;line-height:1.5">${brief.stateContext.probate.notes}</p>
      ` : ""}
      ${brief.stateContext.propertyTools ? `
        <p style="margin:16px 0 8px;font-size:11px;font-weight:700;color:#4b6bfb;text-transform:uppercase;letter-spacing:0.08em">Property Planning Tools</p>
        <table style="width:100%;border-collapse:collapse;margin-bottom:8px">
          <tr>
            <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;color:#6b7280;font-size:13px">Transfer on Death deed</td>
            <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;font-weight:600;font-size:13px;text-align:right">${brief.stateContext.propertyTools.todDeed}</td>
          </tr>
        </table>
        <p style="margin:0 0 8px;font-size:12px;color:#6b7280;line-height:1.5">${brief.stateContext.propertyTools.todDeedNote}</p>
      ` : ""}
      <p style="margin:12px 0 0;font-size:11px;color:#9ca3af;font-style:italic;border-top:1px solid #f3f4f6;padding-top:8px">${brief.stateContext.disclaimer}</p>
      ` : ""}

    </div>

    <div style="background:#f9fafb;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 12px 12px;padding:16px 32px;text-align:center">
      <p style="margin:0;color:#9ca3af;font-size:12px">ClearPath Elder Guide · <a href="https://clearpath-elder-guide.vercel.app" style="color:#c9a84c;text-decoration:none">clearpath-elder-guide.vercel.app</a></p>
    </div>

  </div>
</body>
</html>`;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "Email service not configured" });
  }

  const brief = req.body?.brief;
  if (!brief) {
    return res.status(400).json({ error: "Missing brief" });
  }

  try {
    const resendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "ClearPath <onboarding@resend.dev>",
        to: ["tom.zarcone@mac.com"],
        subject: "New ClearPath Brief Generated",
        html: formatBriefHtml(brief),
      }),
    });

    if (!resendRes.ok) {
      const err = await resendRes.text();
      console.error("Resend error:", err);
      return res.status(502).json({ error: "Email failed" });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Handler error:", err);
    return res.status(500).json({ error: "Internal error" });
  }
}
