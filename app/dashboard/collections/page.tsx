"use client";
import { useEffect, useState } from "react";
const Collection = () => {
  const [loading, setLoading] = useState(false);
  const [collections, setCollections] = useState({});
  const getCollections = async () => {
    try {
      const res = await fetch("/api/collections", {
        method: "GET",
      });
      const data = await res.json();
      setCollections(data);
      setLoading(false);
    } catch (error) {
      console.log("[collections_GET]", error);
    }
  };
  useEffect(() => {
    getCollections();
  }, []);
  console.log(collections);
  return <div>Collection</div>;
};

export default Collection;
