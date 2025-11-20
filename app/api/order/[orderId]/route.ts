import Customer from "@/lib/models/customer";
import Order from "@/lib/models/order";
import connectToDB from "@/lib/mongoDB";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, {params}:{ params: {orderId: string}}) => {
    try {
        await connectToDB();
        const {orderId} = await params;
        const orderDetails = await Order.findById(orderId).populate("products.product","title price media")
        if (!orderDetails) {
            return new NextResponse(JSON.stringify({message: "Not Found"}), {status: 404})
        }
        const customer = await Customer.findOne({clerkId: orderDetails.customerClerkId})
        return NextResponse.json({orderDetails, customer}, {status: 200})

    } catch (error) {
        console.log("[orderId_GET]", error)
        return new NextResponse("Internal Server Error", {status: 500})
    }
}