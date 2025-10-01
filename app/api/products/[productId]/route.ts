import Collection from "@/lib/models/collection";
import Product from "@/lib/models/product";
import connectToDB from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, {params} : {params : {productId: string}} ) => {
    try {
    const {userId} = await auth()
    if (!userId) {
      return new NextResponse("Unauthorized", {status: 401})
    }
    await connectToDB()
    const {productId} = await params;
    const product = await Product.findById(productId).populate({path: "collections", model: Collection});
    if(!product) {
      return new NextResponse(JSON.stringify({message: "Product not found"}), {status: 404})
    }
    return NextResponse.json(product, {status: 200})
  } catch (err) {
    console.log("[productId_GET]",err)
    return new NextResponse("Internal error", {status: 500})
  }
}