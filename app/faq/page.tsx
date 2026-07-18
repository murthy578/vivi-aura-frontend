"use client";

import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

export default function FAQPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#0A0A0A] pt-40 pb-24">
        <div className="max-w-5xl mx-auto px-10">

          <h1 className="text-6xl font-black text-white">
            FAQs
          </h1>

          <div className="mt-10 space-y-8">

            <div>
              <h2 className="text-white text-2xl font-bold">
                How long does delivery take?
              </h2>

              <p className="text-gray-400 mt-3">
                Orders are usually delivered within 2–7 business days.
              </p>
            </div>

            <div>
              <h2 className="text-white text-2xl font-bold">
                Can I return my order?
              </h2>

              <p className="text-gray-400 mt-3">
                Yes, returns are accepted within 7 days if the product is unused.
              </p>
            </div>

          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}