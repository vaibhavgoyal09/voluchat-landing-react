import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, instagramHandle, name, whatsappNumber } = body;

    // Basic validation
    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    if (!name || typeof name !== "string") {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    if (!whatsappNumber || typeof whatsappNumber !== "string") {
      return NextResponse.json({ error: "WhatsApp number is required" }, { status: 400 });
    }

    // Simple email pattern check
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 },
      );
    }

    // Log to console (placeholder)
    console.log("Waitlist signup:", {
      email,
      name,
      whatsappNumber,
      instagramHandle: instagramHandle || "Not provided",
      timestamp: new Date().toISOString(),
    });

    // Return success
    return NextResponse.json({
      success: true,
      message: "Successfully joined the waitlist!",
    });
  } catch (error) {
    console.error("Waitlist error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
