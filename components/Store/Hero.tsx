"use client";

import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative w-full h-[85vh] overflow-hidden">

      {/* Background Image */}

      <Image
        src="/banner.jpg"
        alt="VIVI-AURA"
        fill
        priority
        className="object-cover"
      />

      {/* Dark Overlay */}

      <div className="absolute inset-0 bg-black/30"></div>

      {/* Content */}

      <div className="absolute inset-0 flex items-center">

        <div className="max-w-7xl mx-auto px-6">

          <h1 className="text-6xl lg:text-8xl font-black text-white leading-tight">
            PREMIUM
            <br />
            T-SHIRTS
          </h1>

          <p className="mt-6 text-xl text-gray-200 max-w-xl">
            Discover premium oversized and luxury streetwear
            designed for everyday comfort.
          </p>

          <div className="mt-10 flex gap-5">

            <Link
              href="/products"
              className="bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-gray-200 transition"
            >
              Shop Now
            </Link>

            <Link
              href="/products"
              className="border border-white text-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-black transition"
            >
              Explore
            </Link>

          </div>

        </div>

      </div>

    </section>
  );
}