import ProductCard from "@/components/products/productCard";
import { getCollectionDetails } from "@/lib/actions";
import Image from "next/image";
import React from "react";

const CollectionDetals = async ({
  params,
}: {
  params: { collectionId: string };
}) => {
  const collectionDetails = await getCollectionDetails(params.collectionId);
  return (
    <div className="px-10 py-5 text-grey-200 flex flex-col items-center gap-8">
      <Image
        src={collectionDetails.image}
        width={1500}
        height={1000}
        alt="collection"
        className="w-full h-[400px] object-cover rounded-xl"
      />
      <p className="text-3xl text-grey-200 font-bold">{collectionDetails.title}</p>
      <p className="text-body text-grey-200 font-normal text-center max-w-[900px]">
        {collectionDetails.description}
      </p>
      <div className="flex flex-wrap gap-18 mx-auto">
        {collectionDetails.products.map((product: ProductType) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default CollectionDetals;
