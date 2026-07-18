"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import {
  HiOutlineMenu,
  HiOutlineSearch,
  HiOutlineUser,
  HiOutlineHeart,
  HiOutlineShoppingBag,
} from "react-icons/hi";

import MegaMenu from "./MegaMenu";
import CartDrawer from "@/components/cart/CartDrawer";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const { cart } = useCart();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
  <>
    {/* TOP BAR */}

    <div className="fixed top-0 left-0 w-full z-[100] bg-black text-white text-center py-2 md:py-3 text-[10px] md:text-xs tracking-[2px] md:tracking-[6px]">
      FREE SHIPPING ON ALL ORDERS • PREMIUM STREETWEAR
    </div>

    {/* NAVBAR */}

    <header
      className={`fixed left-0 top-8 md:top-12 w-full z-[100] transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-xl shadow-lg"
          : "bg-white"
      }`}
    >
      <div className="max-w-[1700px] mx-auto h-16 md:h-24 px-4 md:px-10 flex items-center justify-between">

        {/* LEFT */}

        <div className="flex items-center gap-3 md:gap-8">

          {/* Hamburger */}

          <button
            onClick={() => setMenuOpen(true)}
            className="hover:scale-110 transition"
          >
            <HiOutlineMenu
              size={28}
              className="md:w-[34px] md:h-[34px] text-black"
            />
          </button>

          {/* Search */}

          <button
            onClick={() => setSearchOpen(true)}
            className="hover:scale-110 transition"
          >
            <HiOutlineSearch
              size={24}
              className="md:w-[30px] md:h-[30px] text-black"
            />
          </button>

          {/* Desktop Menu */}

          <div className="hidden lg:flex items-center gap-8">

            <Link
              href="/new-arrivals"
              className="font-semibold text-black hover:text-gray-500 transition"
            >
              NEW ARRIVALS
            </Link>

            <Link
              href="/products"
              className="font-semibold text-black hover:text-gray-500 transition"
            >
              SHOP
            </Link>

            <Link
              href="/sale"
              className="font-semibold text-black hover:text-gray-500 transition"
            >
              SALE
            </Link>

          </div>

        </div>

        {/* LOGO */}

        <Link href="/">
          <h1 className="text-xl sm:text-2xl md:text-4xl font-black tracking-[3px] md:tracking-[8px] text-black cursor-pointer whitespace-nowrap">
            VIVI-AURA
          </h1>
        </Link>

        {/* RIGHT */}

        <div className="flex items-center gap-3 md:gap-8">

          <Link href="/profile">
            <HiOutlineUser
              size={24}
              className="md:w-[28px] md:h-[28px] text-black cursor-pointer hover:scale-110 transition"
            />
          </Link>

          <Link href="/wishlist">
            <HiOutlineHeart
              size={24}
              className="md:w-[28px] md:h-[28px] text-black cursor-pointer hover:scale-110 transition"
            />
          </Link>

          <button
            onClick={() => setCartOpen(true)}
            className="relative hover:scale-110 transition"
          >
            <HiOutlineShoppingBag
              size={24}
              className="md:w-[28px] md:h-[28px] text-black"
            />

            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 md:-top-2 md:-right-2 w-4 h-4 md:w-5 md:h-5 rounded-full bg-red-500 text-white text-[10px] md:text-xs flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </button>

        </div>

      </div>
    </header>

    {/* SEARCH */}

    {searchOpen && (
      <div className="fixed inset-0 bg-black/60 z-[9998] p-4">

        <div className="bg-white max-w-3xl mx-auto mt-20 md:mt-32 rounded-3xl p-6 md:p-10">

          <div className="flex justify-between items-center">

            <h2 className="text-2xl md:text-3xl font-bold text-black">
              Search
            </h2>

            <button
              onClick={() => setSearchOpen(false)}
              className="text-4xl md:text-5xl text-black"
            >
              ×
            </button>

          </div>

          <input
            placeholder="Search products..."
            className="mt-6 md:mt-8 w-full border rounded-2xl p-4 md:p-5 text-lg md:text-xl outline-none text-black"
          />

        </div>

      </div>
    )}

    <MegaMenu
      open={menuOpen}
      onClose={() => setMenuOpen(false)}
    />

          <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
      />
    </>
  );
}