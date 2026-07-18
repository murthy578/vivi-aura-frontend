"use client";

import { useState } from "react";

export default function QuantitySelector() {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="mt-10">

      <h3 className="text-white text-xl font-semibold mb-5">
        QUANTITY
      </h3>

      <div className="flex items-center gap-6 bg-[#111] w-fit rounded-full px-6 py-3">

        <button
          onClick={() =>
            setQuantity(quantity > 1 ? quantity - 1 : 1)
          }
          className="text-3xl text-white hover:text-gray-300 transition"
        >
          −
        </button>

        <span className="text-2xl font-bold text-white w-8 text-center">
          {quantity}
        </span>

        <button
          onClick={() => setQuantity(quantity + 1)}
          className="text-3xl text-white hover:text-gray-300 transition"
        >
          +
        </button>

      </div>

    </div>
  );
}