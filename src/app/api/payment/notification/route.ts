import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

// Midtrans Payment Notification Webhook
// POST /api/payment/notification
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      order_id,
      status_code,
      gross_amount,
      signature_key,
      transaction_status,
      fraud_status,
      payment_type,
    } = body;

    // Verify signature
    const serverKey = process.env.MIDTRANS_SERVER_KEY;
    if (!serverKey) {
      return NextResponse.json(
        { error: "Server key not configured" },
        { status: 500 }
      );
    }

    const expectedSignature = crypto
      .createHash("sha512")
      .update(`${order_id}${status_code}${gross_amount}${serverKey}`)
      .digest("hex");

    if (signature_key !== expectedSignature) {
      console.error("Invalid signature");
      return NextResponse.json(
        { error: "Invalid signature" },
        { status: 403 }
      );
    }

    // Determine payment status
    let orderStatus: string;

    if (transaction_status === "capture") {
      orderStatus = fraud_status === "accept" ? "paid" : "pending";
    } else if (transaction_status === "settlement") {
      orderStatus = "paid";
    } else if (
      transaction_status === "cancel" ||
      transaction_status === "deny" ||
      transaction_status === "expire"
    ) {
      orderStatus = "cancelled";
    } else if (transaction_status === "pending") {
      orderStatus = "pending";
    } else {
      orderStatus = "pending";
    }

    // Here we would update the order in Firestore
    // Since this is a server-side API route, we'd use Firebase Admin SDK
    // For now, we'll log the notification and return success
    // In production, implement Firebase Admin SDK here
    console.log("Payment notification received:", {
      orderId: order_id,
      status: orderStatus,
      transactionStatus: transaction_status,
      paymentType: payment_type,
      amount: gross_amount,
    });

    // TODO: Update order status in Firestore using Firebase Admin SDK
    // TODO: If paid, activate the invitation and set expiry date
    // TODO: Send confirmation email/notification to user

    return NextResponse.json({ status: "ok" });
  } catch (error) {
    console.error("Notification handling error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
