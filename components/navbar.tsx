"use client";
import useCart from "@/lib/hooks/useCart";
import { UserButton, useUser } from "@clerk/nextjs";
import { CircleUserRound, Menu, Search, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useUser();
  const [dropdownMenu, setDropdownMenu] = useState(false);
  const [query, setQuery] = useState("");
  const cart = useCart();

  const handleSearch = () => {
    if (query.trim() !== "") {
      router.push(`/search/${query}`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };
  return (
    <div className="sticky top-0 z-10 py-2 px-10 flex gap-2 justify-between items-center bg-white max-sm:px-2">
      <Link href="/">
        <Image src="/MyFashion.png" alt="logo" height={100} width={100} />
      </Link>
      <div className="flex gap-4 text-base font-bold max-lg:hidden">
        <Link className={`font-bold ${pathname === "/" && "text-red-500"}`} href="/">
          Home
        </Link>
        <Link className={`font-bold ${pathname === "/wishlist" && "text-red-500"}`} href="/wishlist">
          Wishlist
        </Link>
        <Link className={`font-bold ${pathname === "/order-history" && "text-red-500"}`} href="/order-history">
          Orders
        </Link>
      </div>
      <div className="max-sm:max-w-[150px] flex gap-3 border border-grey-200 px-3 py-1 items-center rounded-lg">
        <input
          className="outline-none max-sm:max-w-[120px]"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button
          disabled={query === ""}
          onClick={handleSearch}
        >
          <Search className="cursor-pointer h-4 w-4 hover:text-red-100" />
        </button>
      </div>
      <div className="flex gap-3 items-center relative">
        <Link
          href="/cart"
          className="flex items-center gap-3 border rounded-lg px-2 py-1 hover:bg-black hover:text-white max-md:hidden"
        >
          <ShoppingCart />
          <p className="text-base font-bold ">Cart ({cart.cartItems.length})</p>
        </Link>
        {user && (
          <Menu className="cursor-pointer lg:hidden" onClick={() => setDropdownMenu(!dropdownMenu)} />
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
