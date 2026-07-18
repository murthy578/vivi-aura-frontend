"use client";

import SizeSelector from "./SizeSelector";
import QuantitySelector from "./QuantitySelector";
import { useCart } from "@/context/CartContext";

interface ProductInfoProps {
  id: number;
  name: string;
  category: string;
  price: number;
  rating: number;
  image: string;
}

export default function ProductInfo({
  id,
  name,
  category,
  price,
  rating,
  image,
}: ProductInfoProps) {

  const { addToCart } = useCart();

  return (
    <div>

      <p className="text-gray-400 uppercase tracking-[6px]">
        {category}
      </p>

      <h1 className="text-6xl font-black mt-5">
        {name}
      </h1>

      <div className="mt-8 flex items-center gap-3">

        <span className="text-yellow-400 text-2xl">
          ★★★★★
        </span>

        <span className="text-gray-400">
          {rating} (126 Reviews)
        </span>

      </div>

      <h2 className="text-5xl font-black mt-6">
        ₹{price}
      </h2>

      <p className="text-gray-400 mt-10 leading-8">
        Premium quality streetwear crafted from
        high-quality fabrics designed for all-day comfort.
      </p>

      <SizeSelector />

      <QuantitySelector />

      <div className="mt-12 flex gap-5">

        <button
          onClick={() =>
            addToCart({
              id,
              product_name: name,
              image,
              price,
              size: "M",
              quantity: 1,
            })
          }
          className="flex-1 bg-white text-black py-5 rounded-full font-bold hover:bg-gray-200 transition"
        >
          ADD TO BAG
        </button>

        <button className="flex-1 border border-white py-5 rounded-full hover:bg-white hover:text-black transition">
          BUY NOW
        </button>

      </div>

    </div>
  );
}