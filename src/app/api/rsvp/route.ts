import { NextRequest, NextResponse } from "next/server";

// RSVP Submission API
// POST /api/rsvp
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { invitationId, guestName, rsvpStatus, rsvpCount } = body;

    // Validate required fields
    if (!invitationId || !guestName || !rsvpStatus) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate RSVP status
    if (!["attending", "not_attending"].includes(rsvpStatus)) {
      return NextResponse.json(
        { error: "Invalid RSVP status" },
        { status: 400 }
      );
    }

    // TODO: Save to Firestore
    // - Check if guest exists in guests collection
    // - If yes, update RSVP status
    // - If no, create new guest entry
    console.log("RSVP received:", {
      invitationId,
      guestName,
      rsvpStatus,
      rsvpCount: rsvpCount || 1,
    });

    return NextResponse.json({
      success: true,
      message: "RSVP berhasil disimpan",
    });
  } catch (error) {
    console.error("RSVP error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
