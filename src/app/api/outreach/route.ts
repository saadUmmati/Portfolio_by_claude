import { NextRequest, NextResponse } from "next/server";
import { site } from "@/data/site";

// Uses the Gemini API with Google Search grounding enabled, so the model looks up
// the actual company and role before writing -- not just templating around the name.
// Set GEMINI_API_KEY in your .env.local (server-only, never exposed to the client).
const SYSTEM_CONTEXT = `You write short, specific, recruiter-ready outreach messages on behalf of ${site.name}, ${site.title}.

About ${site.name}:
${site.about.body}

Specialties: ${site.about.specialties.join(", ")}

Before writing, use Google Search to find out what the given company actually does (industry, products, recent news or focus areas) and what the given role likely involves there. Use that research to make the message specific to THIS company and role, not generic.

Rules:
- Write in first person, as ${site.name}.
- 3-5 sentences max. No greetings like "Dear Hiring Manager" -- write like a real, warm, direct LinkedIn/email message.
- Reference something concrete and real about the company (what they build, their space, or a relevant recent focus) alongside 1-2 of ${site.name}'s real specialties that genuinely fit what that role needs.
- If search turns up nothing reliable about the company, don't invent details -- fall back to a solid message based on the role title and industry norms alone, without fabricating specifics.
- No generic filler ("I am writing to express my interest..."). No hashtags, no emojis, no markdown.
- End with a simple, low-pressure call to action (e.g. open to a quick chat).
- Output only the message text, nothing else -- no search notes, no preamble.`;

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
                  text: `Research the company "${company}" and write the outreach message for the role "${role}" there.`,
                },
              ],
            },
          ],
          tools: [{ google_search: {} }],
          generationConfig: {
            maxOutputTokens: 1200,
            temperature: 0.7,
            // Grounded requests need some room to reason about what to search and how
            // to use the results -- fully disabling thinking (as the non-grounded
            // routes do) tends to shortchange that. A capped budget avoids the
            // truncation issue while still leaving space for search + synthesis.
            thinkingConfig: { thinkingBudget: 500 },
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
