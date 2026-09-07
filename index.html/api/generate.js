// Vercel Serverless Function
// Keeps your Anthropic API key on the server — never exposed to visitors.
// Also checks a simple shared access code so only paying customers can use it.

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { audience, service, result, accessCode } = req.body || {};

  // --- Access gating ---
  // Set ACCESS_CODE in your Vercel project's environment variables.
  // Give this same code to buyers after purchase (e.g. via Gumroad's
  // automatic "content delivered after purchase" email).
  if (!process.env.ACCESS_CODE || accessCode !== process.env.ACCESS_CODE) {
    return res.status(401).json({ error: "Invalid or missing access code." });
  }

  if (!audience || !service || !result) {
    return res.status(400).json({ error: "Missing required fields." });
  }

  // Basic length guard to control cost per request
  if (audience.length > 300 || service.length > 200 || result.length > 200) {
    return res.status(400).json({ error: "Please shorten your inputs." });
  }

  const prompt = `You are helping a freelancer write personalized cold outreach for this niche.

Target audience: ${audience}
Service offered: ${service}
Main result they help clients get: ${result}

Write three things, tailored specifically to this audience (use natural, non-salesy language, not overly formal):
1. A short cold email (with subject line) following this style: notices a specific gap this audience likely has, offers help, asks for a quick call. Use [Name] and [Business Name] as placeholders for the recipient.
2. A short LinkedIn/social DM opener (2-3 sentences), casual tone.
3. A day-3 follow-up message (friendly, low-pressure, 1-2 sentences).

Respond ONLY with valid JSON, no markdown fences, no preamble, in this exact shape:
{"email_subject": "...", "email_body": "...", "dm": "...", "followup": "..."}`;

  try {
    const anthropicRes = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 1000,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!anthropicRes.ok) {
      const errText = await anthropicRes.text();
      console.error("Anthropic API error:", errText);
      return res.status(502).json({ error: "Generation service failed. Please try again." });
    }

    const data = await anthropicRes.json();
    const textBlock = (data.content || []).find((b) => b.type === "text");
    if (!textBlock) {
      return res.status(502).json({ error: "No response generated. Please try again." });
    }

    let clean = textBlock.text
      .trim()
      .replace(/^```json/, "")
      .replace(/^```/, "")
      .replace(/```$/, "")
      .trim();

    let parsed;
    try {
      parsed = JSON.parse(clean);
    } catch (e) {
      console.error("JSON parse failed:", clean);
      return res.status(502).json({ error: "Could not parse the generated content. Please try again." });
    }

    return res.status(200).json(parsed);
  } catch (err) {
    console.error("Server error:", err);
    return res.status(500).json({ error: "Unexpected server error. Please try again." });
  }
}
