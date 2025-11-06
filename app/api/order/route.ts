import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import Order from "../../../lib/models/order";
import connectToDB from "@/lib/mongoDB";
import Customer from "@/lib/models/customer";
import { format } from "date-fns";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return new NextResponse(null, { headers: corsHeaders });
}

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", {
        status: 401,
        headers: corsHeaders,
      });
    }

    await connectToDB();

    const { cartItems, customer, totalAmount, shippingAddress, paymentMethod } =
      await req.json();

    if (!cartItems || cartItems.length === 0) {
      return new NextResponse("No items in cart", {
        status: 400,
        headers: corsHeaders,
      });
    }

    // Tạo order mới
    const newOrder = await Order.create({
      customerClerkId: customer.clerkId,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      products: cartItems.map((item: any) => ({
        product: item.item._id,
        color: item.color || "",
        size: item.size || "",
        quantity: item.quantity,
      })),
      shippingAddress: shippingAddress || customer.address,
      shippingRate: customer.phone || "",
      totalAmount,
      paymentMethod: paymentMethod || "cod",
      paymentStatus: paymentMethod === "cod" ? "pending" : "pending",
    });

    return NextResponse.json(
      { success: true, orderId: newOrder._id },
      { status: 201, headers: corsHeaders }
    );
  } catch (err) {
    console.log("[orders_POST]", err);
    return new NextResponse("Internal Server Error", {
      status: 500,
      headers: corsHeaders,
    });
  }
}

export async function GET(req: NextRequest) {
  try {
    await connectToDB();

    const orders = await Order.find().sort({ createdAt: "desc" });
    const orderDetails = await Promise.all(
      orders.map(async (order) => {
        const customer = await Customer.findOne({
          clerkId: order.customerClerkId,
        });
        return {
          _id: order._id,
          customer: customer.name,
          products: order.products.length,
          totalAmount: order.totalAmount,
          createdAt: format(new Date(order.createdAt), "MMM do, yyyy"),
        };
      })
    );

    return NextResponse.json(orderDetails, { status: 200 });
  } catch (err) {
    console.log("[orders_GET]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
