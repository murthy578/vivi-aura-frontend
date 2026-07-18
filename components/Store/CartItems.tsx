"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CartItems() {
  const { cart, removeFromCart } = useCart();

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <section className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Your Cart is Empty
          </h2>

          <Link
            href="/products"
            className="bg-white text-black px-8 py-4 rounded-full font-semibold"
          >
            Continue Shopping
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#0A0A0A] min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-6">

        <h1 className="text-5xl font-bold text-white mb-12">
          Shopping Bag
        </h1>

        <div className="grid lg:grid-cols-3 gap-10">

          <div className="lg:col-span-2 space-y-6">

            {cart.map((item) => (
              <div
                key={`${item.id}-${item.size}`}
                className="bg-[#111] rounded-3xl p-6 flex gap-6"
              >
                <Image
                src={item.image || "/images/no-image.png"}

                  alt={item.product_name || "Product"}
                  width={140}
                  height={160}
                  className="rounded-2xl object-cover"
                />

                <div className="flex-1">
                  <h2 className="text-white text-2xl font-bold">
                    {item.product_name}
                  </h2>

                  <p className="text-gray-400 mt-2">
                    Size: {item.size}
                  </p>

                  <p className="text-gray-400">
                    Quantity: {item.quantity}
                  </p>

                  <p className="text-white text-3xl font-bold mt-4">
                    ₹{item.price}
                  </p>

                  <button
                    onClick={() => removeFromCart(item.id, item.size)}
                    className="mt-5 text-red-500 font-semibold"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

          </div>

          <div className="bg-[#111] rounded-3xl p-8 h-fit sticky top-28">

            <h2 className="text-white text-3xl font-bold mb-8">
              Order Summary
            </h2>

            <div className="flex justify-between text-gray-300 text-lg">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>

            <div className="flex justify-between text-gray-300 text-lg mt-4">
              <span>Shipping</span>
              <span>FREE</span>
            </div>

            <hr className="border-gray-700 my-8" />

            <div className="flex justify-between text-white text-2xl font-bold">
              <span>Total</span>
              <span>₹{subtotal}</span>
            </div>

            <Link
              href="/checkout"
              className="block text-center mt-8 bg-white text-black py-4 rounded-full font-bold hover:bg-gray-200 transition"
            >
              Proceed to Checkout
            </Link>

          </div>

        </div>

      </div>
    </section>
  );
}