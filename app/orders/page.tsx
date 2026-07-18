"use client";

import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import OrdersList from "@/components/Orders/OrdersList";

export default function OrdersPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#0A0A0A] pt-40 pb-24">
        <div className="max-w-7xl mx-auto px-10">

          {/* Heading */}

          <div className="mb-14">

            <h1 className="text-6xl font-black text-white">
              MY ORDERS
            </h1>

            <p className="text-gray-400 mt-4 text-lg">
              Track all your previous purchases.
            </p>

          </div>

          {/* Orders */}

          <OrdersList />

        </div>
      </main>

      <Footer />
    </>
  );
}