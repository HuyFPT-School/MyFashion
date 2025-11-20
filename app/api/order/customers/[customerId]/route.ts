import { NextRequest, NextResponse } from "next/server";
import Order from "@/lib/models/order";
import connectToDB from "@/lib/mongoDB";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ customerId: string }> }
) {
  try {
    await connectToDB();
    const { customerId } = await params;

    // Lấy tất cả orders của customer này
    const orders = await Order.find({ customerClerkId: customerId })
      .populate({
        path: "products.product",
        select: "title price media",
      })
      .sort({ createdAt: "desc" });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const formattedOrders = orders.map((order: any) => ({
      _id: order._id.toString(),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      products: order.products.map((item: any) => ({
        _id: item._id?.toString(),
        product: {
          _id: item.product._id.toString(),
          title: item.product.title,
          price: item.product.price,
          media: item.product.media,
        },
        color: item.color,
        size: item.size,
        quantity: item.quantity,
      })),
      totalAmount: order.totalAmount,
      shippingAddress: order.shippingAddress,
      shippingRate: order.shippingRate,
      paymentMethod: order.paymentMethod,
      paymentStatus: order.paymentStatus,
      orderStatus: order.orderStatus || "processing",
      paymentTransId: order.paymentTransId,
      paymentTime: order.paymentTime,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
    }));

    return NextResponse.json(formattedOrders, { status: 200 });
  } catch (err) {
    console.log("[customer_orders_GET]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
