import User from "@/lib/models/user";
import connectToDB from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    await connectToDB();

    const user = await User.findOne({ clerkId: userId });

    const {productId} = await req.json();
    if (!productId) {
        return new NextResponse("Bad Request", {status: 400})
    }
    
    const isLiked = user.wishlist.includes(productId)
    if (isLiked) {
        // Dislike
        user.wishlist = user.wishlist.filter((id: string) => id !== productId)
    } else {
        // Like
        user.wishlist.push(productId)
    }
    await user.save()
    return NextResponse.json(user, { status: 200 });
  } catch (err) {
    console.log("[wishlist_POST]", err);
    return new NextResponse("Internal server Error", { status: 500 });
  }
};
