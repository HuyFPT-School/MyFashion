"use client";
import { columns } from "@/components/collections/collectionColumn";
import { DataTable } from "@/components/custom ui/dataTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
const Collection = () => {
  const [loading, setLoading] = useState(false);
  const [collections, setCollections] = useState([]);
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
  return (
    <div className="px-4 lg:px-6">
      <div className="flex items-center justify-between">
        <p className="text-2xl font-bold">Collections</p>
        <Link href={"/dashboard/collections/new"}>
          <Button className="bg-sky-500 hover:bg-sky-700 ...">
            <Plus className="h-4 w-4 mr-2" />
            Create Collections
          </Button>
        </Link>
      </div>
      <DataTable columns={columns} data={collections} searchKey="title" />
    </div>
  );
};

export default Collection;
