"use client";

import { useState } from "react";
import {
  FaCreditCard,
  FaMoneyBillWave,
  FaUniversity,
  FaMobileAlt,
} from "react-icons/fa";

export default function PaymentMethod() {
  const [payment, setPayment] = useState("razorpay");

  const methods = [
    {
      id: "razorpay",
      title: "Razorpay",
      subtitle: "UPI, Cards, Net Banking & Wallets",
      icon: <FaCreditCard size={22} />,
    },
    {
      id: "upi",
      title: "UPI Payment",
      subtitle: "PhonePe, Google Pay, Paytm",
      icon: <FaMobileAlt size={22} />,
    },
    {
      id: "netbanking",
      title: "Net Banking",
      subtitle: "All Major Banks",
      icon: <FaUniversity size={22} />,
    },
    {
      id: "cod",
      title: "Cash on Delivery",
      subtitle: "Pay when your order arrives",
      icon: <FaMoneyBillWave size={22} />,
    },
  ];

  return (
    <div className="bg-[#111] rounded-3xl p-8">

      <h2 className="text-3xl font-bold text-white mb-8">
        Payment Method
      </h2>

      <div className="space-y-5">

        {methods.map((method) => (

          <label
            key={method.id}
            className={`flex items-center justify-between rounded-2xl p-5 border cursor-pointer transition ${
              payment === method.id
                ? "border-white bg-[#1A1A1A]"
                : "border-gray-700 hover:border-gray-500"
            }`}
          >

            <div className="flex items-center gap-4">

              <div className="text-white">
                {method.icon}
              </div>

              <div>

                <h3 className="text-white font-semibold text-lg">
                  {method.title}
                </h3>

                <p className="text-gray-400 text-sm">
                  {method.subtitle}
                </p>

              </div>

            </div>

            <input
              type="radio"
              checked={payment === method.id}
              onChange={() => setPayment(method.id)}
              className="w-5 h-5"
            />

          </label>

        ))}

      </div>

      <div className="mt-8">

        <button className="w-full bg-white text-black py-4 rounded-full font-bold text-lg hover:bg-gray-200 transition">
          Continue to Payment
        </button>

      </div>

    </div>
  );
}