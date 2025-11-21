import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import connectToDB from "@/lib/mongoDB";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    const secretKey = process.env.MOMO_SECRET_KEY || "K951B6PE1waDMi640xX08PD3vg6EkVlz";
    
    const rawSignature = `accessKey=${body.accessKey}&amount=${body.amount}&extraData=${body.extraData}&message=${body.message}&orderId=${body.orderId}&orderInfo=${body.orderInfo}&orderType=${body.orderType}&partnerCode=${body.partnerCode}&payType=${body.payType}&requestId=${body.requestId}&responseTime=${body.responseTime}&resultCode=${body.resultCode}&transId=${body.transId}`;
    
    const signature = crypto.createHmac("sha256", secretKey).update(rawSignature).digest("hex");
    
    if (signature !== body.signature) {
      return NextResponse.json({ message: "Invalid signature" }, { status: 400 });
    }

    await connectToDB();

    if (body.resultCode === 0) {
      console.log("Payment successful:", body.orderId);
    } else {
      // Thanh toán thất bại
      console.log("Payment failed:", body.orderId, body.message);
    }

    return NextResponse.json({ message: "OK" }, { status: 200 });
  } catch (err) {
    console.log("[momo_webhook]", err);
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
}