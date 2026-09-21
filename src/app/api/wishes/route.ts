import { NextRequest, NextResponse } from "next/server";

// Wishes/Guestbook Submission API
// POST /api/wishes
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { invitationId, guestName, message, attendance } = body;

    // Validate required fields
    if (!invitationId || !guestName || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate attendance status
    const validStatuses = ["hadir", "tidak_hadir", "masih_ragu"];
    if (attendance && !validStatuses.includes(attendance)) {
      return NextResponse.json(
        { error: "Invalid attendance status" },
        { status: 400 }
      );
    }

    // Sanitize message (basic XSS prevention)
    const sanitizedMessage = message
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .trim()
      .substring(0, 500); // Max 500 characters

    // TODO: Save to Firestore
    console.log("Wish received:", {
      invitationId,
      guestName,
      message: sanitizedMessage,
      attendance: attendance || "hadir",
    });

    return NextResponse.json({
      success: true,
      message: "Ucapan berhasil dikirim",
    });
  } catch (error) {
    console.error("Wishes error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// GET /api/wishes?invitationId=xxx
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const invitationId = searchParams.get("invitationId");

    if (!invitationId) {
      return NextResponse.json(
        { error: "invitationId is required" },
        { status: 400 }
      );
    }

    // TODO: Fetch from Firestore
    // Return mock data for now
    const mockWishes = [
      {
        id: "1",
        guestName: "Ahmad Fauzi",
        message: "Selamat menempuh hidup baru! Semoga menjadi keluarga yang sakinah, mawaddah, warahmah. Aamiin 🤲",
        attendance: "hadir",
        createdAt: new Date().toISOString(),
      },
      {
        id: "2",
        guestName: "Siti Nurhaliza",
        message: "Barakallahu lakuma wa baraka 'alaikuma wa jama'a bainakuma fii khair 💕",
        attendance: "hadir",
        createdAt: new Date().toISOString(),
      },
      {
        id: "3",
        guestName: "Budi Santoso",
        message: "Happy wedding! Semoga langgeng dan bahagia selalu ya! 🎉",
        attendance: "masih_ragu",
        createdAt: new Date().toISOString(),
      },
    ];

    return NextResponse.json({
      wishes: mockWishes,
      total: mockWishes.length,
    });
  } catch (error) {
    console.error("Fetch wishes error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
