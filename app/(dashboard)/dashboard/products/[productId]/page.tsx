"use client";

import Loader from "@/components/custom ui/loading";
import ProductForm from "@/components/products/productForm";
import React, { useEffect, useState, use } from "react";

const ProductDetails = ({
  params,
}: {
  params: Promise<{ productId: string }>;
}) => {
  const { productId } = use(params);

  const [loading, setLoading] = useState(true);
  const [productDetails, setProductDetails] = useState<ProductType | null>(
    null
  );

  const getProductDetails = async () => {
    try {
      const res = await fetch(`/api/products/${productId}`, {
        method: "GET",
      });
      const data = await res.json();
      setProductDetails(data);
      setLoading(false);
    } catch (err) {
      console.log("[productId_GET]", err);
    }
  };

  useEffect(() => {
    getProductDetails();
  }, []);

  return loading ? <Loader /> : <ProductForm initialData={productDetails} />;
};

export default ProductDetails;
