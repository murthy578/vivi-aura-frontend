"use client";

import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import Wishlist from "@/components/Wishlist/Wishlist";

export default function WishlistPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#0A0A0A] pt-40 pb-24">
        <div className="max-w-7xl mx-auto px-10">

          <h1 className="text-6xl font-black text-white mb-10">
            MY WISHLIST
          </h1>

          <Wishlist />

        </div>
      </main>

      <Footer />
    </>
  );
}