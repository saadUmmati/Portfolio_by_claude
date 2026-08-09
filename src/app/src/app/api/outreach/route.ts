import { NextRequest, NextResponse } from "next/server";
import { site } from "@/data/site";

// Uses the Gemini API. Set GEMINI_API_KEY in your .env.local (never expose it to the
// client -- this route runs server-side only, same pattern as /api/chat).
const SYSTEM_CONTEXT = `You write short, specific, recruiter-ready outreach messages on behalf of ${site.name}, ${site.title}.

About ${site.name}:
${site.about.body}

Specialties: ${site.about.specialties.join(", ")}

Rules:
- Write in first person, as ${site.name}.
- 3-5 sentences max. No greetings like "Dear Hiring Manager" -- write like a real, warm, direct LinkedIn/email message.
- Reference the specific company and role naturally, and connect 1-2 of ${site.name}'s real specialties to what that role likely needs.
- No generic filler ("I am writing to express my interest..."). No hashtags, no emojis, no markdown.
- End with a simple, low-pressure call to action (e.g. open to a quick chat).
- Output only the message text, nothing else.`;

export async function POST(req: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      {
        message:
          "The outreach helper isn't connected yet. Add your GEMINI_API_KEY to .env.local to enable it.",
      },
      { status: 200 }
    );
  }

  try {
    const { company, role } = await req.json();

    if (!company || !role) {
      return NextResponse.json(
        { message: "Add a company name and role title first." },
        { status: 200 }
      );
    }

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey,
        },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: SYSTEM_CONTEXT }] },
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: `Write the outreach message for company "${company}" and role "${role}".`,
                },
              ],
            },
          ],
          generationConfig: {
            maxOutputTokens: 600,
            temperature: 0.7,
            thinkingConfig: { thinkingBudget: 0 },
          },
        }),
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      console.error("Gemini API error:", errText);
      return NextResponse.json(
        { message: "Something went wrong generating that message. Please try again shortly." },
        { status: 200 }
      );
    }

    const data = await response.json();
    // Concatenate every part -- a response can be split across multiple parts, and
    // reading only the first one is a common cause of responses looking truncated.
    const parts = data.candidates?.[0]?.content?.parts as { text?: string }[] | undefined;
    const message = parts?.map((p) => p.text ?? "").join("").trim();

    if (!message) {
      const finishReason = data.candidates?.[0]?.finishReason;
      console.error("Gemini returned no text. finishReason:", finishReason, JSON.stringify(data));
      return NextResponse.json(
        { message: "Sorry, I couldn't generate a message just now. Please try again." },
        { status: 200 }
      );
    }

    return NextResponse.json({ message });
  } catch (err) {
    console.error("Outreach route error:", err);
    return NextResponse.json(
      { message: "Something went wrong. Please try again shortly." },
      { status: 200 }
    );
  }
}
