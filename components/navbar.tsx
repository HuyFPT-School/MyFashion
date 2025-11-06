"use client";
import useCart from "@/lib/hooks/useCart";
import { UserButton, useUser } from "@clerk/nextjs";
import { CircleUserRound, Menu, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const Navbar = () => {
  const { user } = useUser();
  const [dropdownMenu, setDropdownMenu] = useState(false);
  const cart = useCart();
  return (
    <div className="sticky top-0 z-10 py-2 px-10 flex justify-between items-center bg-white">
      <Link href="/">
        <Image src="/MyFashion.png" alt="logo" height={100} width={100} />
      </Link>
      <div>
        <Link className="font-bold" href="/">
          Home
        </Link>
      </div>
      <div className="flex gap-3 items-center relative">
        <Link
          href="/cart"
          className="flex items-center gap-3 border rounded-lg px-2 py-1 hover:bg-black hover:text-white"
        >
          <ShoppingCart />
          <p className="text-base font-bold ">Cart ({cart.cartItems.length})</p>
        </Link>
        {user && (
          <Menu
            className="cursor-pointer"
            onClick={() => setDropdownMenu(!dropdownMenu)}
          />
        )}
        {user && dropdownMenu && (
          <div className="absolute flex flex-col gap-2 p-3 rounded-lg border bg-white text-base font-bold right-5 top-10">
            <Link href="/wishlist" className="hover:text-red-500">
              Wishlist
            </Link>
            <Link href="/order-history" className="hover:text-red-500">
              Orders
            </Link>
          </div>
        )}
        {user ? (
          <UserButton afterSignOutUrl="/sign-in" />
        ) : (
          <Link href="/sign-in">
            <CircleUserRound />
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
