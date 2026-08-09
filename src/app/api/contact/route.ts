import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { site } from "@/data/site";

// Sends contact form submissions straight to your inbox via Resend -- no mailto:
// link, no user action needed. Set RESEND_API_KEY in your .env.local.
//
// IMPORTANT: the "from" address below (onboarding@resend.dev) is Resend's shared
// sandbox sender -- it works immediately with zero setup, no domain verification
// needed. It just shows "via resend.dev" in some email clients. Once you verify
// your own domain in the Resend dashboard, swap FROM_ADDRESS to an address on
// your domain (e.g. "Portfolio <contact@yourdomain.com>") for a cleaner look.
const FROM_ADDRESS = "Portfolio Contact Form <onboarding@resend.dev>";

export async function POST(req: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      {
        message:
          "Email sending isn't connected yet. Add your RESEND_API_KEY to .env.local to enable it.",
      },
      { status: 200 }
    );
  }

  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { message: "Please fill in your name, email, and message." },
        { status: 200 }
      );
    }

    const resend = new Resend(apiKey);

    const { error } = await resend.emails.send({
      from: FROM_ADDRESS,
      to: [site.email],
      replyTo: email,
      subject: `New portfolio contact from ${name}`,
      html: `<p><strong>From:</strong> ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p><p>${escapeHtml(
        message
      ).replace(/\n/g, "<br/>")}</p>`,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { message: "Something went wrong sending your message. Please try again shortly." },
        { status: 200 }
      );
    }

    return NextResponse.json({ message: "sent" });
  } catch (err) {
    console.error("Contact route error:", err);
    return NextResponse.json(
      { message: "Something went wrong. Please try again shortly." },
      { status: 200 }
    );
  }
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
