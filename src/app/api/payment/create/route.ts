import { NextRequest, NextResponse } from "next/server";

// Midtrans Payment Creation API
// POST /api/payment/create
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { orderId, amount, customerName, customerEmail, itemName, planDuration } = body;

    // Validate required fields
    if (!orderId || !amount || !customerName || !customerEmail) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const serverKey = process.env.MIDTRANS_SERVER_KEY;
    if (!serverKey) {
      return NextResponse.json(
        { error: "Payment service not configured" },
        { status: 500 }
      );
    }

    const isProduction = process.env.NEXT_PUBLIC_MIDTRANS_IS_PRODUCTION === "true";
    const midtransUrl = isProduction
      ? "https://app.midtrans.com/snap/v1/transactions"
      : "https://app.sandbox.midtrans.com/snap/v1/transactions";

    // Create Midtrans transaction
    const payload = {
      transaction_details: {
        order_id: orderId,
        gross_amount: amount,
      },
      item_details: [
        {
          id: `plan-${planDuration}`,
          price: amount,
          quantity: 1,
          name: itemName || `Undangan Digital - Paket ${planDuration} Hari`,
        },
      ],
      customer_details: {
        first_name: customerName,
        email: customerEmail,
      },
      callbacks: {
        finish: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/orders?status=success`,
        error: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/orders?status=error`,
        pending: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/orders?status=pending`,
      },
    };

    const authString = Buffer.from(`${serverKey}:`).toString("base64");

    const response = await fetch(midtransUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Basic ${authString}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Midtrans error:", data);
      return NextResponse.json(
        { error: "Failed to create transaction", details: data },
        { status: response.status }
      );
    }

    return NextResponse.json({
      token: data.token,
      redirectUrl: data.redirect_url,
    });
  } catch (error) {
    console.error("Payment creation error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
