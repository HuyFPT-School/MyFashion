import Product from "@/lib/models/product";
import connectToDB from "@/lib/mongoDB";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest,{params}:{params:Promise<{query: string}>}) => {
    try {
        const {query} = await params;
        await connectToDB();
        const searchedProducts = await Product.find({
            $or: [{title: {$regex: query, $options:"i"}},
                {category: {$regex: query, $options:"i"}},
                {tags: {$in:[new RegExp(query,"i")]}}
            ]
        })
        return NextResponse.json(searchedProducts,{status: 200})
    } catch (err) {
        console.log("[search_GET]",err)
        return new NextResponse("Internal Server Error", {status: 500})
    }
}