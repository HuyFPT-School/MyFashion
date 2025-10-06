import { getProducts } from "@/lib/actions";
import React from "react";
import ProductCard from "./productCard";

const ProductList = async () => {
  const products = await getProducts();
  return (
    <div className="flex flex-col items-center gap-10 py-8 px-5">
      <p className="text-[30px] text-base font-bold">Products</p>
      {!products || products.length === 0 ? (
        <p className="text-base font-bold text-[30px]">No product found</p>
      ) : (
        <div className="flex items-center justify-center gap-8">
          {products.map((product: ProductType) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
