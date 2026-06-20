import { NextRequest, NextResponse } from "next/server";

// Wire this up to MailerLite's free plan:
// 1. Create a free account at mailerlite.com
// 2. Go to Integrations > API and generate an API key
// 3. Create a Group for your subscribers and copy its Group ID
// 4. Add these to your Vercel project as environment variables:
//      MAILERLITE_API_KEY=your_key_here
//      MAILERLITE_GROUP_ID=your_group_id_here
// No other code changes needed, this route already handles the rest.

const MAILERLITE_API_KEY = process.env.MAILERLITE_API_KEY;
const MAILERLITE_GROUP_ID = process.env.MAILERLITE_GROUP_ID;

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { message: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    // If MailerLite isn't configured yet, accept the request gracefully
    // so the form still works visually during development.
    if (!MAILERLITE_API_KEY || !MAILERLITE_GROUP_ID) {
      console.log("[newsletter] MailerLite not configured. Email captured locally:", email);
      return NextResponse.json({
        message: "You're in. (Newsletter provider not yet connected, add your MailerLite keys in Vercel.)",
      });
    }

    const response = await fetch(
      `https://connect.mailerlite.com/api/subscribers`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${MAILERLITE_API_KEY}`,
        },
        body: JSON.stringify({
          email,
          groups: [MAILERLITE_GROUP_ID],
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("[newsletter] MailerLite error:", errorData);
      return NextResponse.json(
        { message: "Something went wrong on our end. Try again in a moment." },
        { status: 502 }
      );
    }

    return NextResponse.json({ message: "You're in. Check your inbox for a welcome note." });
  } catch (error) {
    console.error("[newsletter] Unexpected error:", error);
    return NextResponse.json(
      { message: "Something went wrong. Try again in a moment." },
      { status: 500 }
    );
  }
}
