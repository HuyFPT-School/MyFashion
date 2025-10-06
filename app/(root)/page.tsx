import Collection from "@/components/collections/collection";
import ProductList from "@/components/products/productList";
import Image from "next/image";
import React from "react";

const Home = () => {
  return (
    <>
      <Image src="/Banner.png" alt="Banner" width={2000} height={1000} className="w-screen" />
      <Collection />
      <ProductList />
    </>
  );
};
export default Home;
