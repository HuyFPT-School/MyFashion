"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const Collection = () => {
  const [collections, setCollections] = useState<CollectionType[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const res = await fetch("/api/collections", { cache: "no-store" });
        if (!res.ok) {
          throw new Error("Failed to load collections");
        }
        const data = await res.json();
        setCollections(data);
      } catch (error) {
        console.error("[collections_GET]", error);
        setHasError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchCollections();
  }, []);

  const renderBody = () => {
    if (loading) {
      return <p className="text-base font-medium">Loading collections…</p>;
    }

    if (hasError) {
      return (
        <p className="text-base font-medium text-red-500">
          Unable to load collections right now.
        </p>
      );
    }

    if (collections.length === 0) {
      return (
        <p className="text-base font-bold text-[30px]">No collection found</p>
      );
    }

    return (
      <div className="flex flex-wrap items-center justify-center gap-8">
        {collections.map((collection) => (
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
    );
  };

  return (
    <div className="flex flex-col items-center gap-10 py-8 px-5">
      <p className="text-[30px] text-base font-bold">Collections</p>
      {renderBody()}
    </div>
  );
};

export default Collection;
