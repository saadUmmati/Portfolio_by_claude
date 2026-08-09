import { NextRequest, NextResponse } from "next/server";

const SYSTEM_CONTEXT = `You summarize technical blog posts for busy readers.

Rules:
- 3-5 sentences, or a short 4-6 bullet list if the post covers several distinct points -- pick whichever format serves the specific post better.
- Capture the actual argument or takeaway, not just the topic ("this post explains X" is not a summary).
- Plain, direct language. No "In this post, the author discusses..." framing.
- Output only the summary itself, nothing else.`;

export async function POST(req: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { summary: "The summarizer isn't connected yet. Add your GEMINI_API_KEY to .env.local." },
      { status: 200 }
    );
  }

  try {
    const { title, text } = await req.json();
    if (!text) {
      return NextResponse.json({ summary: "Nothing to summarize." }, { status: 200 });
    }

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
      {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: SYSTEM_CONTEXT }] },
          contents: [
            {
              role: "user",
              parts: [{ text: `Summarize this blog post titled "${title}":\n\n${text}` }],
            },
          ],
          generationConfig: {
            maxOutputTokens: 500,
            temperature: 0.5,
            thinkingConfig: { thinkingBudget: 0 },
          },
        }),
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      console.error("Gemini API error:", errText);
      return NextResponse.json(
        { summary: "Something went wrong summarizing this post. Please try again shortly." },
        { status: 200 }
      );
    }

    const data = await response.json();
    const parts = data.candidates?.[0]?.content?.parts as { text?: string }[] | undefined;
    const summary = parts?.map((p) => p.text ?? "").join("").trim();

    if (!summary) {
      console.error("Gemini returned no text:", JSON.stringify(data));
      return NextResponse.json(
        { summary: "Sorry, I couldn't summarize this just now. Please try again." },
        { status: 200 }
      );
    }

    return NextResponse.json({ summary });
  } catch (err) {
    console.error("Summarize route error:", err);
    return NextResponse.json(
      { summary: "Something went wrong. Please try again shortly." },
      { status: 200 }
    );
  }
}
