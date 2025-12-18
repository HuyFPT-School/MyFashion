"use client";
import useCart from "@/lib/hooks/useCart";
import useWishlist from "@/lib/hooks/useWishlist";
import { UserButton, useUser } from "@clerk/nextjs";
import {
  CircleUserRound,
  Heart,
  Menu,
  Search,
  ShoppingCart,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useUser();
  const [dropdownMenu, setDropdownMenu] = useState(false);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [query, setQuery] = useState("");
  const cart = useCart();
  const wishlist = useWishlist();

  useEffect(() => {
    const fetchWishlist = async () => {
      if (user) {
        try {
          const res = await fetch("/api/users");
          const data = await res.json();
          wishlist.setWishlistCount(data.wishlist?.length || 0);
        } catch (error) {
          console.log("[wishlist_fetch]", error);
        }
      }
    };
    fetchWishlist();
  }, [user]);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (query.trim() !== "") {
        router.push(`/search/${query}`);
      }
    }
  };

  return (
    <div className="sticky top-0 z-10 py-2 px-10 flex gap-2 justify-between items-center bg-white max-sm:px-2">
      <Link href="/">
        <Image src="/MyFashion.png" alt="logo" height={100} width={100} />
      </Link>
      <div className="flex gap-4 text-base font-bold max-lg:hidden">
        <Link
          className={`font-bold ${pathname === "/" && "text-red-500"}`}
          href="/"
        >
          Trang chủ
        </Link>
        <Link
          className={`font-bold ${pathname === "/new" && "text-red-500"}`}
          href="/"
        >
          Sản phẩm mới
        </Link>
        <Link
          className={`font-bold ${pathname === "/ao" && "text-red-500"}`}
          href="/"
        >
          Áo
        </Link>
        <Link
          className={`font-bold ${pathname === "/quan" && "text-red-500"}`}
          href="/"
        >
          Quần
        </Link>
        <Link
          className={`font-bold ${pathname === "/phukien" && "text-red-500"}`}
          href="/"
        >
          Phụ kiện
        </Link>
        <Link
          className={`font-bold ${pathname === "/uudai" && "text-red-500"}`}
          href="/"
        >
          Ưu đãi
        </Link>
        <Link
          className={`font-bold ${
            pathname === "/thongtinthuonghieu" && "text-red-500"
          }`}
          href="/"
        >
          Thông tin thương hiệu
        </Link>
        <Link
          className={`font-bold ${
            pathname === "/order-history" && "text-red-500"
          }`}
          href="/order-history"
        >
          Kiểm tra đơn hàng
        </Link>
      </div>

      <div className="flex gap-3 items-center relative">
        <div className="relative">
          <button
            onClick={() => setShowSearchDropdown(!showSearchDropdown)}
            className="p-2 cursor-pointer"
          >
            <Search className="h-5 w-5 " />
          </button>

          {showSearchDropdown && (
            <div className="absolute right-0 top-12 bg-white border border-gray-200 rounded-lg shadow-lg p-4 w-80 max-sm:w-64">
              <div className="flex gap-2 items-center">
                <input
                  className="flex-1 outline-none border border-gray-200 px-3 py-2 rounded-lg focus:border-black-500"
                  placeholder="Tìm kiếm sản phẩm..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyPress}
                  autoFocus
                />
              </div>
            </div>
          )}
        </div>
        <Link href="/cart" className="relative flex items-center max-md:hidden">
          <ShoppingCart className="w-6 h-6" />
          <span className="absolute -top-2 -right-2 bg-red-700 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {cart.cartItems.length}
          </span>
        </Link>
        <Link href="/wishlist" className="relative flex items-center">
          <Heart className="w-6 h-6" />
          {wishlist.wishlistCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-700 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {wishlist.wishlistCount}
            </span>
          )}
        </Link>
        {user && (
          <Menu
            className="cursor-pointer lg:hidden"
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
