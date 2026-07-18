"use client";

import { useState } from "react";

export default function CouponBox() {
  const [coupon, setCoupon] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const applyCoupon = () => {
    const code = coupon.trim().toUpperCase();

    if (!code) {
      setSuccess(false);
      setMessage("Please enter a coupon code.");
      return;
    }

    // Temporary frontend coupons
    if (code === "VIVI10") {
      setSuccess(true);
      setMessage("🎉 Coupon Applied! 10% Discount");
    } else if (code === "WELCOME20") {
      setSuccess(true);
      setMessage("🎉 Coupon Applied! 20% Discount");
    } else {
      setSuccess(false);
      setMessage("❌ Invalid Coupon Code");
    }
  };

  return (
    <div className="bg-[#111] rounded-3xl p-8">

      <h2 className="text-2xl font-bold text-white mb-6">
        Coupon Code
      </h2>

      <div className="flex flex-col md:flex-row gap-4">

        <input
          type="text"
          value={coupon}
          onChange={(e) => setCoupon(e.target.value)}
          placeholder="Enter Coupon Code"
          className="flex-1 bg-[#1A1A1A] text-white rounded-xl px-5 py-4 outline-none border border-gray-700 focus:border-white"
        />

        <button
          onClick={applyCoupon}
          className="bg-white text-black px-8 py-4 rounded-xl font-semibold hover:bg-gray-200 transition"
        >
          APPLY
        </button>

      </div>

      {message && (
        <p
          className={`mt-5 text-sm font-medium ${
            success ? "text-green-400" : "text-red-400"
          }`}
        >
          {message}
        </p>
      )}

    </div>
  );
}