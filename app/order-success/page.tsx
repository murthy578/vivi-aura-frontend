"use client";

import Link from "next/link";
import { HiCheckCircle } from "react-icons/hi";

export default function OrderSuccessPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0A] flex items-center justify-center px-6">
      <div className="bg-[#111] rounded-3xl p-12 max-w-xl w-full text-center">

        <HiCheckCircle
          className="mx-auto text-green-500"
          size={90}
        />

        <h1 className="text-5xl font-black text-white mt-6">
          Order Placed!
        </h1>

        <p className="text-gray-400 mt-6 text-lg">
          Thank you for shopping with VIVI-AURA.
        </p>

        <p className="text-gray-500 mt-2">
          Your order has been placed successfully.
        </p>

        <div className="mt-10 space-y-4">

          <Link
            href="/shop"
            className="block w-full bg-white text-black py-4 rounded-full font-bold hover:bg-gray-200 transition"
          >
            Continue Shopping
          </Link>

          <Link
            href="/orders"
            className="block w-full border border-white text-white py-4 rounded-full font-bold hover:bg-white hover:text-black transition"
          >
            View My Orders
          </Link>

        </div>

      </div>
    </main>
  );
}