"use client";

import Link from "next/link";
import Image from "next/image";

import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

import { useCart } from "@/context/CartContext";

export default function CartPage() {

  const {
    cart,
    increaseQty,
    decreaseQty,
    removeFromCart,
    clearCart,
  } = useCart();

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const shipping = subtotal > 999 ? 0 : 99;

  const gst = Math.round(subtotal * 0.18);

  const grandTotal = subtotal + shipping + gst;

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#0A0A0A] pt-40 pb-24">

        <div className="max-w-7xl mx-auto px-8">

          <div className="flex justify-between items-center mb-12">

            <div>

              <h1 className="text-5xl font-black text-white">
                Shopping Bag
              </h1>

              <p className="text-gray-400 mt-3">
                {cart.length} item(s) in your cart
              </p>

            </div>

            {cart.length > 0 && (

              <button
                onClick={clearCart}
                className="bg-red-600 hover:bg-red-700 transition px-6 py-3 rounded-full text-white font-semibold"
              >
                Clear Cart
              </button>

            )}

          </div>

          {cart.length === 0 ? (

            <div className="bg-[#111] rounded-3xl p-20 text-center">

              <h2 className="text-4xl font-black text-white">
                Your cart is empty
              </h2>

              <p className="text-gray-400 mt-4">
                Looks like you haven't added anything yet.
              </p>

              <Link
                href="/products"
                className="inline-block mt-8 bg-white text-black px-10 py-4 rounded-full font-bold hover:bg-gray-200 transition"
              >
                Continue Shopping
              </Link>

            </div>

          ) : (
<div className="grid lg:grid-cols-3 gap-10">

  {/* ========================= */}
  {/* Cart Items */}
  {/* ========================= */}

<div className="lg:col-span-2 space-y-6">

  {cart.map((item) => (

    <div
      key={`${item.id}-${item.size}`}
      className="bg-[#111] rounded-3xl p-6 flex flex-col md:flex-row gap-6"
    >

      {/* Product Image */}

      <div className="relative w-full md:w-44 h-44 rounded-2xl overflow-hidden bg-[#1A1A1A]">

        <Image
          src={`http://localhost:5000/uploads/${item.image}`}
          alt={item.product_name}
          fill
          className="object-cover"
        />

      </div>

      {/* Product Details */}

      <div className="flex-1 flex flex-col justify-between">

        <div>

          <h2 className="text-2xl font-bold text-white">
            {item.product_name}
          </h2>

          <p className="text-gray-400 mt-3">
            Size:
            <span className="text-white ml-2">
              {item.size}
            </span>
          </p>

          <p className="text-gray-400 mt-2">
            Price:
            <span className="text-white ml-2">
              ₹{item.price}
            </span>
          </p>

        </div>

        {/* Quantity */}

        <div className="flex items-center justify-between mt-8">

          <div className="flex items-center bg-[#1A1A1A] rounded-full overflow-hidden">

            <button
              onClick={() =>
                decreaseQty(item.id, item.size)
              }
              className="px-5 py-3 text-white hover:bg-[#222] transition"
            >
              −
            </button>

            <span className="px-6 text-white font-bold">
              {item.quantity}
            </span>

            <button
              onClick={() =>
                increaseQty(item.id, item.size)
              }
              className="px-5 py-3 text-white hover:bg-[#222] transition"
            >
              +
            </button>

          </div>

          <button
            onClick={() =>
              removeFromCart(item.id, item.size)
            }
            className="text-red-500 hover:text-red-400 font-semibold transition"
          >
            Remove
          </button>

        </div>

      </div>

    </div>

  ))}

</div>

{/* ========================= */}
{/* Order Summary */}
{/* ========================= */}

<div className="bg-[#111] rounded-3xl p-8 h-fit sticky top-32">
  

  <h2 className="text-3xl font-bold text-white mb-8">
    Order Summary
  </h2>
    <div className="space-y-5">

    <div className="flex justify-between">
      <span className="text-gray-400">
        Subtotal
      </span>

      <span className="text-white">
        ₹{subtotal}
      </span>
    </div>

    <div className="flex justify-between">
      <span className="text-gray-400">
        Delivery Charges
      </span>

      <span className="text-white">
        {shipping === 0 ? "FREE" : `₹${shipping}`}
      </span>
    </div>

    <div className="flex justify-between">
      <span className="text-gray-400">
        GST (18%)
      </span>

      <span className="text-white">
        ₹{gst}
      </span>
    </div>

    <hr className="border-gray-700" />

    <div className="flex justify-between">

      <span className="text-2xl font-bold text-white">
        Grand Total
      </span>

      <span className="text-2xl font-black text-green-400">
        ₹{grandTotal}
      </span>

    </div>

  </div>

  <Link
  href="/checkout"
  className="block w-full mt-10 bg-white text-black py-4 rounded-2xl font-bold text-lg hover:bg-gray-200 transition text-center"
>
  Proceed to Checkout
</Link>

  <Link
    href="/products"
    className="block text-center mt-6 text-gray-400 hover:text-white transition"
  >
    Continue Shopping
  </Link>

</div>

</div>

)}

</div>

</main>

<Footer />

</>
);
}