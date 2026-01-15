import ProductCard from "@/components/products/productCard";
import { getCategoryProducts } from "@/lib/actions";
import React from "react";

export const dynamic = "force-dynamic";

const CategoryPage = async ({
  params,
}: {
  params: Promise<{ category: string }>;
}) => {
  const { category } = await params;
  const categoryProducts = await getCategoryProducts(category);
  const decodedCategory = decodeURIComponent(category);

  return (
    <div className="px-10 py-5 max-md:px-4">
      <p className="text-3xl font-bold my-10">{decodedCategory}</p>
      {!categoryProducts || categoryProducts.length === 0 ? (
        <p className="text-body-bold my-5">
          Không có sản phẩm nào trong danh mục này
        </p>
      ) : (
        <div className="flex flex-wrap justify-start gap-16">
          {categoryProducts.map((product: ProductType) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
