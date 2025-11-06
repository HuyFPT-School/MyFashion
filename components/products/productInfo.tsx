"use client";

import { useState } from "react";
import HeartFavourite from "../custom ui/heart";
import { MinusCircle, PlusCircle } from "lucide-react";
import useCart from "@/lib/hooks/useCart";

const ProductInfo = ({ productInfo }: { productInfo: ProductType }) => {
  const [selectedColor, setSelectedColor] = useState<string>(
    productInfo.colors[0]
  );
  const [selectedSizes, setSelectedSizes] = useState<string>(
    productInfo.sizes[0]
  );
  const [quantity, setQuantity] = useState<number>(1);
  const cart = useCart();
  return (
    <div className="max-w-[400px] flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <p className="text-2xl font-bold">{productInfo.title}</p>
        <HeartFavourite product={productInfo} />
      </div>

      <div className="flex gap-2">
        <p className="text-base font-medium text-gray-500">Category:</p>
        <p className="text-base font-bold">{productInfo.category}</p>
      </div>

      <p className="text-2xl font-bold">$ {productInfo.price}</p>

      <div className="flex gap-2 flex-col">
        <p className="text-base font-medium text-gray-500">Description:</p>
        <p className="text-base font-bold">{productInfo.description}</p>
      </div>

      {productInfo.colors.length > 0 && (
        <div className="flex flex-col gap-2">
          <p className="text-base font-medium text-gray-500">Colors:</p>
          <div className="flex gap-2">
            {productInfo.colors.map((color, index) => (
              <p
                key={index}
                className={`border border-black px-2 py-1 rounded-lg cursor-pointer ${
                  selectedColor === color && "bg-black text-white"
                }`}
                onClick={() => setSelectedColor(color)}
              >
                {color}
              </p>
            ))}
          </div>
        </div>
      )}

      {productInfo.sizes.length > 0 && (
        <div className="flex flex-col gap-2">
          <p className="text-base font-medium text-gray-500">Size:</p>
          <div className="flex gap-2">
            {productInfo.sizes.map((size, index) => (
              <p
                key={index}
                className={`border border-black px-2 py-1 rounded-lg cursor-pointer ${
                  selectedSizes === size && "bg-black text-white"
                }`}
                onClick={() => setSelectedSizes(size)}
              >
                {size}
              </p>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col gap-2">
        <p className="text-base font-medium text-gray-500">Quantity:</p>
        <div className="flex gap-4 items-center">
          <MinusCircle
            onClick={() => quantity > 1 && setQuantity(quantity - 1)}
          />
          <p className="text-body font-bold">{quantity}</p>
          <PlusCircle onClick={() => setQuantity(quantity + 1)} />
        </div>
      </div>
      <button
        onClick={() => {
          cart.addItem({
            item: productInfo,
            quantity,
            color: selectedColor,
            size: selectedSizes,
          });
        }}
        className="outline text-base font-bold py-3 rounded-lg border-2 border-black hover:bg-black hover:text-white transition-colors duration-200 cursor-pointer"
      >
        Add To Cart
      </button>
    </div>
  );
};

export default ProductInfo;
