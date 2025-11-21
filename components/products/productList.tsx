"use client";

import { useEffect, useState } from "react";
import ProductCard from "./productCard";

const ProductList = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products", { cache: "no-store" });
        if (!res.ok) {
          throw new Error("Failed to load products");
        }
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("[products_GET]", error);
        setHasError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const renderBody = () => {
    if (loading) {
      return <p className="text-base font-medium">Loading products…</p>;
    }

    if (hasError) {
      return (
        <p className="text-base font-medium text-red-500">
          Unable to load products right now.
        </p>
      );
    }

    if (products.length === 0) {
      return (
        <p className="text-base font-bold text-[30px]">No product found</p>
      );
    }

    return (
      <div className="flex flex-wrap justify-center gap-8">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center gap-10 py-8 px-5">
      <p className="text-[30px] text-base font-bold">Products</p>
      {renderBody()}
    </div>
  );
};

export default ProductList;
