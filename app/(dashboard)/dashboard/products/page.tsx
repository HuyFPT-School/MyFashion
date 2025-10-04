"use client";

import { DataTable } from "@/components/custom ui/dataTable";
import Loader from "@/components/custom ui/loading";
import { columns } from "@/components/products/productColumn";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const Products = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<ProductType[]>([]);
  const getProducts = async () => {
    try {
      const res = await fetch("/api/products", {
        method: "GET",
      });
      const data = await res.json();
      setProducts(data);
      setLoading(false);
    } catch (err) {
      console.log("[products_GET]", err);
    }
  };
  useEffect(() => {
    getProducts();
  }, []);
  return loading ? (
    <Loader />
  ) : (
    <div className="px-10 py-5">
      <div className="flex items-center justify-between">
        <p className="text-2xl font-bold">Products</p>
        <Link href={"/dashboard/products/new"}>
          <Button className="bg-sky-500 hover:bg-sky-700 ...">
            <Plus className="h-4 w-4 mr-2" />
            Create Products
          </Button>
        </Link>
      </div>
      <DataTable columns={columns} data={products} searchKey="title" />
    </div>
  );
};

export default Products;
