import { NextRequest, NextResponse } from "next/server";
import { getAllWaitlistEntries } from "@/lib/waitlist-storage";

export async function GET(request: NextRequest) {
  try {
    // Basic authentication check (you can enhance this)
    const authHeader = request.headers.get('authorization');
    const expectedAuth = process.env.WAITLIST_ADMIN_KEY || 'voluchat-admin-secret';

    if (authHeader !== `Bearer ${expectedAuth}`) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const entries = await getAllWaitlistEntries();

    return NextResponse.json({
      success: true,
      count: entries.length,
      data: entries,
    });
  } catch (error) {
    console.error("Admin waitlist error:", error);
    return NextResponse.json(
      { error: "Failed to retrieve waitlist data" },
      { status: 500 },
    );
  }
}