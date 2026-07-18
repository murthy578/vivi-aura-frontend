"use client";

import Link from "next/link";
import { Search, Heart, ShoppingBag, User } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">

      <div className="max-w-7xl mx-auto flex items-center justify-between h-20 px-6">

        {/* Logo */}

        <Link
          href="/"
          className="text-3xl font-black tracking-widest"
        >
          VIVI-AURA
        </Link>

        {/* Menu */}

        <nav className="hidden lg:flex gap-10 font-semibold">

          <Link href="/">Home</Link>

          <Link href="/products">Shop</Link>

          <Link href="/wishlist">Wishlist</Link>

          <Link href="/orders">Orders</Link>

        </nav>

        {/* Icons */}

        <div className="flex items-center gap-6">

          <Search size={22} />

          <Heart size={22} />

          <ShoppingBag size={22} />

          <User size={22} />

        </div>

      </div>

    </header>
  );
}