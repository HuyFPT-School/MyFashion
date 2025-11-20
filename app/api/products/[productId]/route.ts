import Collection from "@/lib/models/collection";
import Product from "@/lib/models/product";
import connectToDB from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { productId: string } }
) => {
  try {
    await connectToDB();
    const { productId } = await params;
    const product = await Product.findById(productId).populate({
      path: "collections",
      model: Collection,
    });
    if (!product) {
      return new NextResponse(
        JSON.stringify({ message: "Product not found" }),
        { status: 404 }
      );
    }
    return NextResponse.json(product, { status: 200 });
  } catch (err) {
    console.log("[productId_GET]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const POST = async (
  req: NextRequest,
  { params }: { params: { productId: string } }
) => {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectToDB();

    const { productId } = await params;

    const product = await Product.findById(productId);

    if (!product) {
      return new NextResponse(
        JSON.stringify({ message: "Product not found" }),
        { status: 404 }
      );
    }

    const {
      title,
      description,
      media,
      category,
      collections,
      tags,
      sizes,
      colors,
      price,
      expense,
    } = await req.json();

    if (!title || !description || !media || !category || !price || !expense) {
      return new NextResponse("Not enough data to update product", {
        status: 400,
      });
    }

    const currentCollections = product.collections.map((id: string) =>
      id.toString()
    );
    const newCollections = collections || [];

    const addedCollections = newCollections.filter(
      (collectionId: string) => !currentCollections.includes(collectionId)
    );

    const removedCollections = currentCollections.filter(
      (collectionId: string) => !newCollections.includes(collectionId)
    );

    // Update collections
    await Promise.all([
      // Add product to new collections
      ...addedCollections.map((collectionId: string) =>
        Collection.findByIdAndUpdate(collectionId, {
          $addToSet: { products: product._id },
        })
      ),

      // Remove product from removed collections
      ...removedCollections.map((collectionId: string) =>
        Collection.findByIdAndUpdate(collectionId, {
          $pull: { products: product._id },
        })
      ),
    ]);

    // Update product
    const updatedProduct = await Product.findByIdAndUpdate(
      product._id,
      {
        title,
        description,
        media,
        category,
        collections,
        tags,
        sizes,
        colors,
        price,
        expense,
        updatedAt: new Date(),
      },
      { new: true }
    ).populate({ path: "collections", model: Collection });

    return NextResponse.json(updatedProduct, { status: 200 });
  } catch (err) {
    console.log("[productId_POST]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { productId: string } }
) => {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    await connectToDB();
    const { productId } = await params;
    const product = await Product.findById(productId);
    if (!product) {
      return new NextResponse(
        JSON.stringify({ message: "Product not found" }),
        { status: 404 }
      );
    }

    await Promise.all(
      product.collections.map((collectionId: string) =>
        Collection.findByIdAndUpdate(collectionId, {
          $pull: { products: product._id },
        })
      )
    );

    await Product.findByIdAndDelete(product._id);

    return new NextResponse(JSON.stringify({ message: "Product deleted" }), {
      status: 200,
    });
  } catch (error) {
    console.log("[productId_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
