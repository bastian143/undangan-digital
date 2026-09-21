import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

// GET /api/payment/notification (Health check & Midtrans probe)
export async function GET() {
  return NextResponse.json({
    status: "ok",
    message: "Midtrans notification endpoint is active and ready",
    timestamp: new Date().toISOString(),
  });
}

// POST /api/payment/notification (Midtrans Payment Notification Webhook)
export async function POST(request: NextRequest) {
  try {
    let body: any = {};
    try {
      body = await request.json();
    } catch {
      // Body might be empty or form-encoded in some test probes
      return NextResponse.json({
        status: "ok",
        message: "Test ping received successfully",
      });
    }

    const {
      order_id,
      status_code,
      gross_amount,
      signature_key,
      transaction_status,
      fraud_status,
      payment_type,
    } = body || {};

    // 1. Handle Midtrans Dashboard "Test notification URL"
    const isTest =
      !order_id ||
      !signature_key ||
      String(order_id).toLowerCase().includes("test") ||
      String(body?.status_message || "").toLowerCase().includes("test");

    if (isTest) {
      console.log("Midtrans test notification received successfully:", body);
      return NextResponse.json({
        status: "ok",
        message: "Test notification received successfully",
      });
    }

    // 2. Verify signature for real transactions
    const serverKey = process.env.MIDTRANS_SERVER_KEY;
    if (!serverKey) {
      console.warn("MIDTRANS_SERVER_KEY not configured");
      return NextResponse.json({ status: "ok", message: "Server key missing" });
    }

    const expectedSignature = crypto
      .createHash("sha512")
      .update(`${order_id}${status_code}${gross_amount}${serverKey}`)
      .digest("hex");

    if (signature_key !== expectedSignature) {
      console.warn("Invalid signature from notification, skipping order update:", {
        orderId: order_id,
        receivedSignature: signature_key,
      });
      // Return 200 to acknowledge Midtrans receipt without updating order
      return NextResponse.json({ status: "ignored", reason: "Invalid signature" });
    }

    // 3. Process order status for verified transactions
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

    console.log("Valid Midtrans payment notification processed:", {
      orderId: order_id,
      status: orderStatus,
      transactionStatus: transaction_status,
      paymentType: payment_type,
      amount: gross_amount,
    });

    // TODO: Update order status in Firestore using Firebase Admin SDK
    // TODO: If paid, activate the invitation and set expiry date
    // TODO: Send confirmation email/notification to user

    return NextResponse.json({ status: "ok", orderStatus });
  } catch (error) {
    console.error("Notification handling error:", error);
    return NextResponse.json(
      { status: "error", message: "Error processed" },
      { status: 200 }
    );
  }
}
