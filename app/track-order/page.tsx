"use client";

import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

export default function TrackOrderPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#0A0A0A] pt-40 pb-24">
        <div className="max-w-5xl mx-auto px-10">

          <h1 className="text-6xl font-black text-white">
            TRACK ORDER
          </h1>

          <p className="text-gray-400 mt-5">
            Enter your Order ID to track your shipment.
          </p>

          <div className="mt-12 flex gap-4">

            <input
              type="text"
              placeholder="Order ID"
              className="flex-1 bg-[#161616] border border-[#333] rounded-xl px-5 py-4 text-white outline-none"
            />

            <button className="bg-white text-black px-10 rounded-xl font-bold hover:bg-gray-200 transition">
              Track
            </button>

          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}