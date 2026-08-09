import { NextRequest, NextResponse } from "next/server";

const SYSTEM_CONTEXT = `You explain software projects to visitors on a developer's portfolio site -- a mix of recruiters, potential clients, and other engineers.

Rules:
- Explain what the project does, the interesting technical decisions behind it, and why they matter -- not just a restatement of the description.
- 4-7 sentences, or a short paragraph plus a 3-4 point breakdown of the key technical pieces if that fits better.
- Assume the reader is smart but may not know the specific technologies -- briefly clarify jargon on first use (e.g. "ONNX (a format for running trained models efficiently)").
- Plain, direct language. No marketing fluff, no "this innovative project."
- Output only the explanation, nothing else.`;

export async function POST(req: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { explanation: "The AI explainer isn't connected yet. Add your GEMINI_API_KEY to .env.local." },
      { status: 200 }
    );
  }

  try {
    const { title, description, longDescription, tags, code } = await req.json();

    const prompt = `Project: ${title}
Tags: ${(tags ?? []).join(", ")}
Short description: ${description}
Longer description: ${longDescription}
Representative code snippet:
${code}

Explain this project.`;

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
      {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: SYSTEM_CONTEXT }] },
          contents: [{ role: "user", parts: [{ text: prompt }] }],
          generationConfig: {
            maxOutputTokens: 700,
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
        { explanation: "Something went wrong generating that explanation. Please try again shortly." },
        { status: 200 }
      );
    }

    const data = await response.json();
    const parts = data.candidates?.[0]?.content?.parts as { text?: string }[] | undefined;
    const explanation = parts?.map((p) => p.text ?? "").join("").trim();

    if (!explanation) {
      console.error("Gemini returned no text:", JSON.stringify(data));
      return NextResponse.json(
        { explanation: "Sorry, I couldn't generate an explanation just now. Please try again." },
        { status: 200 }
      );
    }

    return NextResponse.json({ explanation });
  } catch (err) {
    console.error("Explain-project route error:", err);
    return NextResponse.json(
      { explanation: "Something went wrong. Please try again shortly." },
      { status: 200 }
    );
  }
}
