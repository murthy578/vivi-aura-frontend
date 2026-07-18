"use client";

import Link from "next/link";
import Image from "next/image";

import { X } from "lucide-react";

import { useCart } from "@/context/CartContext";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function CartDrawer({
  open,
  onClose,
}: Props) {

  const {
    cart,
    increaseQty,
    decreaseQty,
    removeFromCart,
  } = useCart();

  const subtotal = cart.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );

  if (!open) return null;

  return (
    <>

      {/* Overlay */}

      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[9998]"
      />

      {/* Drawer */}

      <div className="fixed top-0 right-0 h-screen w-full sm:w-[450px] bg-[#0E0E0E] border-l border-gray-800 shadow-2xl z-[9999] flex flex-col">

        {/* Header */}

        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-800">

          <div>

            <h2 className="text-3xl font-black text-white">
              Shopping Bag
            </h2>

            <p className="text-gray-400 mt-1">
              {cart.length} item(s)
            </p>

          </div>

          <button
            onClick={onClose}
            className="text-white hover:text-gray-400 transition"
          >
            <X size={30} />
          </button>

        </div>

        {/* Empty Cart */}

        {cart.length === 0 ? (

          <div className="flex-1 flex flex-col justify-center items-center px-10">

            <h3 className="text-3xl font-bold text-white">
              Your Cart is Empty
            </h3>

            <p className="text-gray-400 text-center mt-4">
              Add your favourite products and they'll appear here.
            </p>

            <Link
              href="/products"
              onClick={onClose}
              className="mt-8 bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-gray-200 transition"
            >
              Continue Shopping
            </Link>

          </div>

       ) : (

  <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">

    {cart.map((item) => (
  <div
    key={`${item.id}-${item.size}`}
    className="bg-[#181818] rounded-2xl p-4"
  >

    <div className="flex gap-4">

      {/* Product Image */}

      <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-[#222] flex-shrink-0">

        <Image
          src={`http://localhost:5000/uploads/${item.image}`}
          alt={item.product_name}
          fill
          className="object-cover"
        />

      </div>

      {/* Product Details */}

      <div className="flex-1">

        <h3 className="text-white font-bold text-lg line-clamp-2">
          {item.product_name}
        </h3>

        <p className="text-gray-400 mt-2">
          Size:
          <span className="text-white ml-2">
            {item.size}
          </span>
        </p>

        <p className="text-white font-bold text-xl mt-3">
          ₹{item.price}
        </p>

      </div>

    </div>

    {/* Quantity Controls */}

    <div className="flex items-center justify-between mt-5">

      <div className="flex items-center bg-[#242424] rounded-full overflow-hidden">

        <button
          onClick={() =>
            decreaseQty(item.id, item.size)
          }
          className="px-4 py-2 text-white hover:bg-[#333] transition"
        >
          −
        </button>

        <span className="px-5 text-white font-bold">
          {item.quantity}
        </span>

        <button
          onClick={() =>
            increaseQty(item.id, item.size)
          }
          className="px-4 py-2 text-white hover:bg-[#333] transition"
        >
          +
        </button>

      </div>

      <button
        onClick={() =>
          removeFromCart(item.id, item.size)
        }
        className="text-red-500 hover:text-red-400 transition font-semibold"
      >
        Remove
      </button>

    </div>

  </div>

))}
          </div>

        )}

        {/* Footer */}

        {cart.length > 0 && (

          <div className="border-t border-gray-800 p-6 bg-[#111]">

            <div className="flex justify-between items-center mb-3">

              <span className="text-gray-400">
                Subtotal
              </span>

              <span className="text-2xl font-bold text-white">
                ₹{subtotal}
              </span>

            </div>

            <p className="text-green-400 text-sm mb-6">
              🚚 Free shipping on orders above ₹999
            </p>

            <Link
              href="/cart"
              onClick={onClose}
              className="block w-full bg-white text-black text-center py-4 rounded-2xl font-bold text-lg hover:bg-gray-200 transition"
            >
              View Cart
            </Link>

            <Link
              href="/checkout"
              onClick={onClose}
              className="block w-full mt-4 bg-black border border-white text-white text-center py-4 rounded-2xl font-bold text-lg hover:bg-white hover:text-black transition"
            >
              Proceed to Checkout
            </Link>

            <button
              onClick={onClose}
              className="w-full mt-4 text-gray-400 hover:text-white transition"
            >
              Continue Shopping
            </button>

          </div>

        )}

      </div>

    </>
  );
}