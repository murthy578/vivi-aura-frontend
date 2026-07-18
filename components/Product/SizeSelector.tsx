"use client";

import { useState } from "react";

export default function SizeSelector() {
  const [selectedSize, setSelectedSize] = useState("M");

  const sizes = ["S", "M", "L", "XL"];

  return (
    <div className="mt-10">

      <h3 className="text-white text-xl font-semibold mb-5">
        SELECT SIZE
      </h3>

      <div className="flex gap-4">

        {sizes.map((size) => (

          <button
            key={size}
            onClick={() => setSelectedSize(size)}
            className={`w-14 h-14 rounded-full border transition ${
              selectedSize === size
                ? "bg-white text-black border-white"
                : "border-gray-500 text-white hover:border-white"
            }`}
          >
            {size}
          </button>

        ))}

      </div>

    </div>
  );
}