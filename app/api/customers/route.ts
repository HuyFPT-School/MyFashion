import Customer from "@/lib/models/customer";
import connectToDB from "@/lib/mongoDB";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    await connectToDB();
    const { clerkId, name, email, orderId, phone, address } = await req.json();

    let customer = await Customer.findOne({ clerkId });

    if (customer) {
      customer.orders.push(orderId);
      customer.phone = phone;
      customer.address = address;
      customer.updatedAt = new Date();
      await customer.save();
    } else {
      customer = new Customer({
        clerkId,
        name,
        email,
        orders: [orderId],
        phone,
        address
      });
      await customer.save();
    }

    return NextResponse.json(customer, { status: 200 });
  } catch (err) {
    console.log("[customers_POST]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
export const GET = async (req: NextRequest) => {
  try {
    await connectToDB();
    const customer = await Customer.find().sort({ createdAt: "desc" });
    return NextResponse.json(customer, { status: 200 });
  } catch (error) {
    console.log("[customers_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
