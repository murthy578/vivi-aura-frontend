"use client";

import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import NewArrivals from "@/components/Products/NewArrivals";

export default function NewArrivalsPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#0A0A0A] pt-40 pb-24">
        <div className="max-w-7xl mx-auto px-10">

          <div className="mb-14">
            <h1 className="text-6xl font-black text-white">
              NEW ARRIVALS
            </h1>

            <p className="text-gray-400 mt-4">
              Discover our latest arrivals.
            </p>
          </div>

          <NewArrivals />

        </div>
      </main>

      <Footer />
    </>
  );
}