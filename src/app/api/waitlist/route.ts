import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Handles waitlist signup requests.
 * Validates email and sends notification via Resend.
 *
 * @param {Request} request - The incoming HTTP request
 * @returns {Promise<NextResponse>} JSON response with success or error message
 */
export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    // Validate email format
    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Add contact to Resend audience for waitlist management
    // Reason: Using contacts.create to store waitlist emails in Resend
    // You need to create an audience at https://resend.com/audiences
    // and add the audience ID to .env.local as RESEND_AUDIENCE_ID
    const { data, error } = await resend.contacts.create({
      email,
      audienceId:
        process.env.RESEND_AUDIENCE_ID ||
        "4f82bd55-c2ad-4a79-b5b4-5eea06a8c46f",
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to add to waitlist" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Successfully joined the waitlist!",
        data,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Waitlist API error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
