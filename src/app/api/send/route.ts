import { NextResponse } from "next/server";
import { Resend } from "resend";
import { EmailTemplate } from "../../../components/EmailTemplate";
import React from "react";
import { env } from "~/env"; // Import env from the t3-env configuration

// Better error handling for API key
const apiKey = env.RESEND_API_KEY || process.env.RESEND_API_KEY;

// Get email address with fallback
const recipientEmail = env.EMAIL_ADDRESS || process.env.EMAIL_ADDRESS || "";

// Safely create Resend instance with proper error handling
let resend: Resend;
try {
  if (!apiKey) {
    console.error(
      "RESEND_API_KEY is missing. Please check your environment variables."
    );
  } else {
    resend = new Resend(apiKey);
  }
} catch (error) {
  console.error("Error initializing Resend:", error);
}

export async function POST(request: Request) {
  try {
    // Check if Resend is properly initialized
    if (!resend) {
      return NextResponse.json(
        { error: "Email service not configured properly" },
        { status: 500 }
      );
    }

    const { name, email, message } = await request.json();

    const data = await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>",
      to: [recipientEmail], // Use the recipient email with fallback
      subject: `New Contact Form Message from ${name}`,
      react: React.createElement(EmailTemplate, { name, email, message }),
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
