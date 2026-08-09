import { NextRequest, NextResponse } from "next/server";
import { site } from "@/data/site";

// Uses the Gemini API (the only AI provider key available for this project --
// see GEMINI_API_KEY in .env.local). Powers both this chat assistant and the
// Outreach Helper (src/app/api/outreach/route.ts).
const SYSTEM_PROMPT = `You are a helpful AI assistant embedded on ${site.name}'s personal portfolio website.
Answer questions about ${site.name}'s work, services, and expertise using the context below.
Be concise, friendly, and honest -- if you don't know something, say so and suggest they reach out directly at ${site.email}.

About ${site.name}:
${site.about.body}

Specialties: ${site.about.specialties.join(", ")}`;

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
