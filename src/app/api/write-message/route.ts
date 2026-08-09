import { NextRequest, NextResponse } from "next/server";
import { site } from "@/data/site";

const SYSTEM_CONTEXT = `You draft a short message on behalf of a visitor filling out the contact form on ${site.name}'s portfolio site. The visitor describes what they need in plain, rough terms -- your job is to turn that into a clear, polite, well-organized message addressed to ${site.name}.

Rules:
- Write in first person, as the VISITOR (not as ${site.name}) -- e.g. "I'm looking for..." not "You should...".
- 3-6 sentences. Clear and specific, not padded with filler.
- No greeting like "Dear Muhammad" and no sign-off/name at the end -- just the message body, since it goes directly into a form.
- Keep whatever concrete details the visitor gave (timeline, budget, project type) -- don't drop specifics.
- No markdown, no emojis.
- Output only the message text, nothing else.`;

export async function POST(req: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { message: "The AI writer isn't connected yet. Add your GEMINI_API_KEY to .env.local." },
      { status: 200 }
    );
  }

  try {
    const { brief } = await req.json();
    if (!brief || !brief.trim()) {
      return NextResponse.json(
        { message: "Describe what you need first." },
        { status: 200 }
      );
    }

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
      {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: SYSTEM_CONTEXT }] },
          contents: [
            { role: "user", parts: [{ text: `Here's what I need: ${brief}` }] },
          ],
          generationConfig: {
            maxOutputTokens: 400,
            temperature: 0.6,
            thinkingConfig: { thinkingBudget: 0 },
          },
        }),
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      console.error("Gemini API error:", errText);
      return NextResponse.json(
        { message: "Something went wrong drafting that. Please try again shortly." },
        { status: 200 }
      );
    }

    const data = await response.json();
    const parts = data.candidates?.[0]?.content?.parts as { text?: string }[] | undefined;
    const message = parts?.map((p) => p.text ?? "").join("").trim();

    if (!message) {
      console.error("Gemini returned no text:", JSON.stringify(data));
      return NextResponse.json(
        { message: "Sorry, I couldn't draft that just now. Please try again." },
        { status: 200 }
      );
    }

    return NextResponse.json({ message });
  } catch (err) {
    console.error("Write-message route error:", err);
    return NextResponse.json(
      { message: "Something went wrong. Please try again shortly." },
      { status: 200 }
    );
  }
}
