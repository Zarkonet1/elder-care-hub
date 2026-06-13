interface Brief {
  situationOverview: string;
  keyFacts: { label: string; value: string }[];
  legalInPlace: string[];
  legalMissing: string[];
  familyContext: string;
  whatNeeded: string;
  alreadyDone: string;
}

function formatBriefHtml(brief: Brief): string {
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

      <h2 style="margin:0 0 12px;color:#1a1a2e;font-size:16px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;border-bottom:2px solid #c9a84c;padding-bottom:8px">What's Already Been Done</h2>
      <p style="margin:0;color:#374151;line-height:1.65;font-size:15px">${brief.alreadyDone}</p>

    </div>

    <div style="background:#f9fafb;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 12px 12px;padding:16px 32px;text-align:center">
      <p style="margin:0;color:#9ca3af;font-size:12px">ClearPath Elder Guide · <a href="https://clearpath-elder-guide.vercel.app" style="color:#c9a84c;text-decoration:none">clearpath-elder-guide.vercel.app</a></p>
    </div>

  </div>
</body>
</html>`;
}

export default async function handler(
  req: { method: string; body: { brief: Brief } },
  res: { status: (code: number) => { json: (body: unknown) => void } }
) {
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
