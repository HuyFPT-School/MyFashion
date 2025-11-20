"use client";
import Image from "next/image";
import Link from "next/link";
import HeartFavourite from "../custom ui/heart";
interface ProductCardProps {
  product: ProductType;
  updateSignedInUser?: (updatedUser : UserType) => void
}

const ProductCard = ({product,updateSignedInUser}: ProductCardProps) => {
  return (
    <Link
      href={`/products/${product._id}`}
      className="w-[220px] flex flex-col gap-2"
    >
      <Image
        src={product.media[0]}
        alt="product"
        width={250}
        height={300}
        className="h-[250px] rounded-lg object-cover shadow-lg"
      />
      <div>
        <p className="text-base font-bold">{product.title}</p>
        <p className="text-sm font-medium text-gray-500">{product.category}</p>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-body font-bold">${product.price}</p>
        <HeartFavourite product={product} updateSignedInUser={updateSignedInUser} />
      </div>
    </Link>
  );
};

export default ProductCard;
