import { getCollections } from "@/lib/actions";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Collection = async () => {
  const collections = await getCollections();
  return (
    <div className="flex flex-col items-center gap-10 py-8 px-5">
      <p className="text-[30px] text-base font-bold">Collections</p>
      {!collections || collections.length === 0 ? (
        <p className="text-base font-bold text-[30px]">No collection found</p>
      ) : (
        <div className="flex items-center justify-center gap-8">
          {collections.map((collection: CollectionType) => (
            <Link key={collection._id} href={`/collections/${collection._id}`}>
              <Image
                src={collection.image}
                alt={collection.title}
                width={350}
                height={200}
                className="rounded-lg cursor-pointer shadow-lg"
              />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Collection;
