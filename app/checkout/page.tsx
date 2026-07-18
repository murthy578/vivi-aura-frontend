"use client";

import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

import CheckoutForm from "@/components/Checkout/CheckoutForm";
import OrderSummary from "@/components/Checkout/OrderSummary";
import CouponBox from "@/components/Checkout/CouponBox";
import PaymentMethod from "@/components/Checkout/PaymentMethod";

export default function CheckoutPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#0A0A0A] pt-28 md:pt-40 pb-28">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Heading */}

          <div className="mb-10 md:mb-14">

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white">
              CHECKOUT
            </h1>

            <p className="text-gray-400 mt-3 text-sm sm:text-base lg:text-lg">
              Complete your purchase securely.
            </p>

          </div>

          {/* Layout */}

          <div className="grid grid-cols-1 xl:grid-cols-[2fr_1fr] gap-8 lg:gap-12">

            {/* Left */}

            <div className="space-y-6 md:space-y-8">

              <CheckoutForm />

              <CouponBox />

              <PaymentMethod />

            </div>

            {/* Right */}

            <div className="xl:sticky xl:top-32 h-fit">

              <OrderSummary />

            </div>

          </div>

        </div>

      </main>

      <Footer />

    </>
  );
}