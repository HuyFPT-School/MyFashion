'use client'
import CollectionForm from "@/components/collections/collectionForm";
import Loader from "@/components/custom ui/loading";
import { useEffect, useState } from "react";

const CollectionDetals = ({ params }: { params: { collectionId: string } }) => {
  const [loading, setLoading] = useState(true);
  const [collectionDetails, setCollectionDetails] =
    useState<CollectionType | null>(null);
  const getCollectionDetails = async () => {
    try {
      const res = await fetch(`/api/collections/${params.collectionId}`, {
        method: "GET",
      });
      const data = await res.json();
      setCollectionDetails(data);
      setLoading(false);
    } catch (err) {
      console.log("[collectionId_GET]", err);
    }
  };
  useEffect(() => {
    getCollectionDetails();
  }, []);

  return loading ? <Loader /> : <CollectionForm initialData={collectionDetails} />;
};

export default CollectionDetals;
