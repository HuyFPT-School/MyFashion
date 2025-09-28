import Collection from "@/lib/models/collection";
import connectToDB from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, {params}: {params: {collectionId: string}}) => {
  try {
    const {userId} = await auth()
    if (!userId) {
      return new NextResponse("Unauthorized", {status: 401})
    }
    await connectToDB()
    const {collectionId} = await params;
    const collection = await Collection.findById(collectionId);
    if(!collection) {
      return new NextResponse(JSON.stringify({message: "Collection not found"}), {status: 404})
    }
    return NextResponse.json(collection, {status: 200})
  } catch (err) {
    console.log("[collectionId_GET]",err)
    return new NextResponse("Internal error", {status: 500})
  }
}

export const POST = async (req:NextRequest, {params}: {params: {collectionId: string}}) => {
  try {
    const {userId} = await auth()
    if(!userId) {
      return new NextResponse("Unauthorized", {status: 401})
    }
    await connectToDB()
    const {collectionId} = await params;
    let collection = await Collection.findById(collectionId);
    if(!collection) {
      return new NextResponse("Collection not found", {status: 404})
    }

    const {title, description, image} = await req.json();
    if(!title || !image) {
      return new NextResponse("Title and image are required")
    }
    collection = await Collection.findByIdAndUpdate(collectionId, {title, description, image}, {new: true})
    await collection.save()
    return NextResponse.json(collection, {status: 200})
  } catch (err) {
    console.log("[collectionId_POST]", err)
    return new NextResponse("Internal error", {status: 500})
  }

}

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { collectionId: string } }
) => {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    await connectToDB();

    const { collectionId } = await params;

    await Collection.findByIdAndDelete(collectionId);
    return new NextResponse("Collection is deleted", { status: 200 });
  } catch (error) {
    console.log("[collectionId_DELETE]", error);
    return new NextResponse("Internal error", { status: 400 });
  }
};
