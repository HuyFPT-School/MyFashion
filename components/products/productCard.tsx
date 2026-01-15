"use client";
import Image from "next/image";
import Link from "next/link";
import HeartFavourite from "../custom ui/heart";
interface ProductCardProps {
  product: ProductType;
  updateSignedInUser?: (updatedUser: UserType) => void;
}

const ProductCard = ({ product, updateSignedInUser }: ProductCardProps) => {
  return (
    <Link
      href={`/products/${product._id}`}
      className="w-[220px] flex flex-col gap-2"
    >
      <Image
        src={product.media[0]}
        alt={product.title}
        width={250}
        height={300}
        className="rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:scale-105"
      />
      <div>
        <p className="text-base font-bold">{product.title}</p>
        <p className="text-sm font-medium text-gray-500">{product.category}</p>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-body font-bold">${product.price}</p>
        <HeartFavourite
          product={product}
          updateSignedInUser={updateSignedInUser}
        />
      </div>
    </Link>
  );
};

export default ProductCard;
