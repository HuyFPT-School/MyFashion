import Customer from "@/lib/models/customer";
import connectToDB from "@/lib/mongoDB";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ customerId: string }> }
) => {
  try {
    await connectToDB();
    const { customerId } = await params;
    const customer = await Customer.findOne({ clerkId: customerId });
    if (!customer) {
      return new NextResponse("Can not find customerID", { status: 400 });
    }
    return NextResponse.json(customer, { status: 200 });
  } catch (err) {
    console.log("[customerId_GET]:", err);
  }
};
