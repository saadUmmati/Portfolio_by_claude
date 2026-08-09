import { NextRequest, NextResponse } from "next/server";
import { site } from "@/data/site";
import { experience } from "@/data/experience";
import { services } from "@/data/services";
import { projects } from "@/data/projects";

// Uses the Gemini API (the only AI provider key available for this project --
// see GEMINI_API_KEY in .env.local). Powers both this chat assistant and the
// Outreach Helper (src/app/api/outreach/route.ts).

const experienceContext = experience
  .map((e) => `- ${e.role} at ${e.company} (${e.period}, ${e.location}): ${e.description}`)
  .join("\n");

const servicesContext = services
  .map((s) => `- ${s.title} (${s.category}): ${s.shortDescription}`)
  .join("\n");

const projectsContext = projects
  .map((p) => `- ${p.title}: ${p.description}`)
  .join("\n");

const SYSTEM_PROMPT = `You ARE ${site.name} -- you're not an assistant describing him, you're him, answering visitors' questions on your own portfolio site in the first person ("I built...", "my experience is...", not "he built..." or "${site.name} has...").

Bio:
${site.about.body}

Specialties: ${site.about.specialties.join(", ")}

Work experience:
${experienceContext}

Services I offer:
${servicesContext}

Projects I've built:
${projectsContext}

Rules:
- Answer as yourself, in first person, using the real details above. Be specific -- reference actual companies, projects, and technologies from the context rather than speaking in generalities.
- Be concise, warm, and direct -- a few sentences for most questions, longer only if the question genuinely needs it.
- If something's outside what's in the context above (e.g. availability for a specific date, exact pricing, personal opinions not reflected here), say you're not sure and suggest they reach out directly at ${site.email} or book a call -- don't invent details that aren't in the context.
- No markdown headers or heavy formatting -- this is a conversational chat, not a document. Occasional bold or a short list is fine if it genuinely helps.
- Stay in character as ${site.name} for the whole conversation, including follow-up questions.`;

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      {
        reply:
          "The chat assistant isn't connected yet. Add your GEMINI_API_KEY to .env.local to enable live responses.",
      },
      { status: 200 }
    );
  }

  try {
    const { messages }: { messages: ChatMessage[] } = await req.json();

    // Gemini's roles are "user" / "model", not "user" / "assistant".
    const contents = messages.map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey,
        },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
          contents,
          generationConfig: {
            maxOutputTokens: 800,
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
        { reply: "Something went wrong reaching the AI assistant. Please try again shortly." },
        { status: 200 }
      );
    }

    const data = await response.json();
    const parts = data.candidates?.[0]?.content?.parts as { text?: string }[] | undefined;
    const reply = parts?.map((p) => p.text ?? "").join("").trim();

    if (!reply) {
      const finishReason = data.candidates?.[0]?.finishReason;
      console.error("Gemini returned no text. finishReason:", finishReason, JSON.stringify(data));
      return NextResponse.json(
        { reply: "Sorry, I couldn't generate a response just now. Please try again." },
        { status: 200 }
      );
    }

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("Chat route error:", err);
    return NextResponse.json(
      { reply: "Something went wrong. Please try again shortly." },
      { status: 200 }
    );
  }
}
