import Product from "@/lib/models/product";
import connectToDB from "@/lib/mongoDB";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ category: string }> }
) => {
  try {
    await connectToDB();

    const { category } = await params;
    const decodedCategory = decodeURIComponent(category);
    
    const products = await Product.find({
      category: { $regex: decodedCategory, $options: "i" },
    }).sort({ createdAt: "desc" });
    return NextResponse.json(products, { status: 200 });
  } catch (err) {
    console.log("[category_GET]", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
