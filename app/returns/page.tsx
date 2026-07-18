"use client";

import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

export default function ReturnsPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#0A0A0A] pt-40 pb-24">
        <div className="max-w-5xl mx-auto px-10">

          <h1 className="text-6xl font-black text-white">
            RETURNS & EXCHANGE
          </h1>

          <div className="mt-10 text-gray-300 space-y-5 leading-8">

            <p>• Easy 7-day return policy.</p>

            <p>• Product must be unused with original tags.</p>

            <p>• Refunds are processed after quality inspection.</p>

          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}