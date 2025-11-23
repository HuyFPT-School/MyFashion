import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json(null,{ headers: corsHeaders });
}
export async function POST(req: NextRequest) {
  try {
    const { cartItems, customer, provider } = await req.json();

    if (!cartItems || cartItems.length === 0 || !customer) {
      return new NextResponse("Not enough data to checkout", {
        status: 400,
        headers: corsHeaders,
      });
    }
    const amountNumber = cartItems.reduce(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (sum: number, ci: any) =>
        sum + (ci?.item?.price || 0) * (ci?.quantity || 0),
      0
    );
    const amounts = String(Math.max(1, Math.round(amountNumber)));
    // COD

    if (provider === "cod") {
      const orderId = "COD" + Date.now();
      return NextResponse.json(
        {
          url: `/payment_success?method=cod&orderId=${orderId}`,
          method: "cod",
        },
        { headers: corsHeaders }
      );
    }

    if (provider === "momo") {
      const accessKey = "F8BBA842ECF85";
      const secretKey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";
      const orderInfo = "Pay with MoMo";
      const partnerCode = "MOMO";
      const redirectUrl = `${process.env.ECOMMERCE_STORE_URL}/payment_success`;
      const ipnUrl = `${process.env.ECOMMERCE_STORE_URL}/api/webhook`;
      const requestType = "payWithMethod";
      const amount = amounts;
      const orderId = partnerCode + new Date().getTime();
      const requestId = orderId;
      const extraData = Buffer.from(JSON.stringify({
        customerId: customer.clerkId,
        cartItemsCount: cartItems.length
      })).toString('base64');
      const rawSignature =
        "accessKey=" +
        accessKey +
        "&amount=" +
        amount +
        "&extraData=" +
        extraData +
        "&ipnUrl=" +
        ipnUrl +
        "&orderId=" +
        orderId +
        "&orderInfo=" +
        orderInfo +
        "&partnerCode=" +
        partnerCode +
        "&redirectUrl=" +
        redirectUrl +
        "&requestId=" +
        requestId +
        "&requestType=" +
        requestType;
      //puts raw signature
      console.log("--------------------RAW SIGNATURE----------------");
      console.log(rawSignature);
      //signature

      const signature = crypto
        .createHmac("sha256", secretKey)
        .update(rawSignature)
        .digest("hex");
      console.log("--------------------SIGNATURE----------------");
      console.log(signature);

      //json object send to MoMo endpoint
      const requestBody = {
        partnerCode,
        accessKey,
        requestId,
        amount,
        orderId,
        orderInfo,
        redirectUrl,
        ipnUrl,
        lang: "vi",
        requestType,
        extraData,
        signature,
      };
      const momoEndpoint =
        process.env.MOMO_CREATE_ENDPOINT ||
        "https://test-payment.momo.vn/v2/gateway/api/create";

      console.log("--------------------RAW SIGNATURE----------------");
      console.log(rawSignature);
      console.log("--------------------SIGNATURE----------------");
      console.log(signature);
      console.log("Sending to MoMo: ", JSON.stringify(requestBody));

      const momoResponse = await fetch(momoEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      const raw = await momoResponse.text();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let momoResult: any = raw;
      if (raw) {
        try {
          momoResult = JSON.parse(raw);
          console.log(momoResult);
        } catch {
          momoResult = { raw };
        }
      } else if (!raw) {
        momoResult = { message: "Empty response body" };
      }

      // Trả về URL để client redirect
      const url =
        momoResult.payUrl || momoResult.deeplink || momoResult.shortLink;
      return NextResponse.json(
        { url, momo: momoResult },
        { headers: corsHeaders }
      );
    }

    return NextResponse.json(
      { error: "Unsupported provider" },
      { status: 400, headers: corsHeaders }
    );
  } catch (err) {
    console.log("[checkout_POST]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
