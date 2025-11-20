import ProductCard from "@/components/products/productCard";
import { getSearchedProducts } from "@/lib/actions";
import React from "react";

const SearchPage = async ({ params }: { params: { query: string } }) => {
  const searchedProducts = await getSearchedProducts(params.query);
  const decodedQuery = decodeURIComponent(params.query)
  return (
    <div className="px-10 py-5">
      <p className="text-3xl font-bold my-10">Search results for {decodedQuery}</p>
      {!searchedProducts || searchedProducts.length === 0 && (<p className="text-body font-bold my-5">No result found</p>)}
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        <div className="flex flex-wrap justify-start gap-16">{searchedProducts.map((product: any) => (
            <ProductCard key={product._id} product={product}/>
        ))}</div>
    </div>
  );
};

export default SearchPage;
