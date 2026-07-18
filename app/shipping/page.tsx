"use client";

import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

export default function ShippingPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#0A0A0A] pt-40 pb-24">
        <div className="max-w-5xl mx-auto px-10">

          <h1 className="text-6xl font-black text-white">
            SHIPPING POLICY
          </h1>

          <div className="mt-10 text-gray-300 space-y-5 leading-8">

            <p>• Free Shipping on prepaid orders.</p>

            <p>• Orders are shipped within 24–48 hours.</p>

            <p>• Delivery usually takes 2–7 business days.</p>

            <p>• Tracking details will be shared via email and SMS.</p>

          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}