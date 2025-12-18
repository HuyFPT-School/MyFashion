"use client";
import { useUser } from "@clerk/nextjs";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import useWishlist from "@/lib/hooks/useWishlist";

interface HeartFavouriteProps {
  product: ProductType;
  updateSignedInUser?: (updatedUser: UserType) => void;
}

const HeartFavourite = ({
  product,
  updateSignedInUser,
}: HeartFavouriteProps) => {
  const router = useRouter();
  const { user } = useUser();
  const wishlist = useWishlist();
  const [loading, setLoading] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const getUser = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/users");
      const data = await res.json();
      setIsLiked(data.wishlist.includes(product._id));
      setLoading(false);
    } catch (error) {
      console.log("[users_GET]", error);
    }
  };

  useEffect(() => {
    if (user) {
      getUser();
    }
  }, [user]);

  const handleLike = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    try {
      if (!user) {
        router.push("/sign-in");
        return;
      }
      const res = await fetch("/api/users/wishlist", {
        method: "POST",
        body: JSON.stringify({ productId: product._id }),
      });
      const updatedUser = await res.json();
      const newIsLiked = updatedUser.wishlist.includes(product._id);

      // Update local state
      setIsLiked(newIsLiked);

      // Update global wishlist count
      if (newIsLiked && !isLiked) {
        // Added to wishlist
        wishlist.incrementWishlist();
      } else if (!newIsLiked && isLiked) {
        // Removed from wishlist
        wishlist.decrementWishlist();
      }

      updateSignedInUser?.(updatedUser);
    } catch (err) {
      console.log("[wishlist_POST]", err);
    }
  };
  return (
    <button onClick={handleLike}>
      <Heart
        fill={isLiked ? "red" : "none"}
        color={isLiked ? "red" : "gray"}
        className="w-5 h-5"
      />
    </button>
  );
};
export default HeartFavourite;
