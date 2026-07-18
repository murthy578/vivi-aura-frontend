"use client";

import { useCart } from "@/context/CartContext";
import { useCheckout } from "@/context/CheckoutContext";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function OrderSummary() {
  const { cart, clearCart } = useCart();
  const { checkout } = useCheckout();
  const router = useRouter();

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const shipping = subtotal > 999 ? 0 : 99;
  const gst = Math.round(subtotal * 0.18);
  const total = subtotal + shipping + gst;

  const placeOrder = async () => {
    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    const payload = {
      user_id: null,
      total,
      payment_method: "COD",
      payment_status: "Pending",

      fullname: checkout.fullname,
      mobile: checkout.mobile,
      email: checkout.email,
      house: checkout.house,
      street: checkout.street,
      landmark: checkout.landmark,
      city: checkout.city,
      state: checkout.state,
      pincode: checkout.pincode,
      address_type: checkout.address_type,

      items: cart.map((item) => ({
        product_id: item.id,
        quantity: item.quantity,
        price: item.price,
        size: item.size,
      })),
    };

    try {
      const response = await fetch(
        "http://localhost:5000/api/checkout",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (data.success) {
        alert("Order Placed Successfully!");

        clearCart();

        router.push("/orders");
      } else {
        alert(data.message || "Order Failed");
      }
    } catch (err) {
      console.error(err);
      alert("Server Error");
    }
  };

  return (
    <>
      <div className="bg-[#111] border border-gray-800 rounded-3xl p-5 sm:p-6 lg:p-8">

        <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
          Order Summary
        </h2>

        {/* Products */}

        <div className="space-y-5 max-h-[420px] overflow-y-auto pr-1">

          {cart.map((item) => (

            <div
              key={`${item.id}-${item.size}`}
              className="flex gap-4 p-3 rounded-2xl bg-[#181818]"
            >

              <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">

                <Image
                  src={`http://localhost:5000/uploads/${item.image}`}
                  alt={item.product_name}
                  fill
                  className="object-cover"
                />

              </div>

              <div className="flex-1 min-w-0">

                <h3 className="text-white font-semibold text-sm sm:text-base line-clamp-2">
                  {item.product_name}
                </h3>

                <div className="flex flex-wrap gap-4 mt-2 text-xs sm:text-sm text-gray-400">

                  <span>
                    Size: <span className="text-white">{item.size}</span>
                  </span>

                  <span>
                    Qty: <span className="text-white">{item.quantity}</span>
                  </span>

                </div>

              </div>

              <div className="text-right">

                <p className="text-white font-bold whitespace-nowrap">
                  ₹{item.price * item.quantity}
                </p>

              </div>

            </div>

          ))}

        </div>

        {/* Price Details */}

        <div className="border-t border-gray-700 mt-8 pt-6 space-y-4">

          <div className="flex justify-between text-gray-300">

            <span>Subtotal</span>

            <span>₹{subtotal}</span>

          </div>

          <div className="flex justify-between text-gray-300">

            <span>Shipping</span>

            <span>

              {shipping === 0 ? (
                <span className="text-green-400 font-semibold">
                  FREE
                </span>
              ) : (
                `₹${shipping}`
              )}

            </span>

          </div>

          <div className="flex justify-between text-gray-300">

            <span>GST (18%)</span>

            <span>₹{gst}</span>

          </div>

          <hr className="border-gray-700" />

          <div className="flex justify-between items-center">

            <span className="text-xl font-bold text-white">
              Grand Total
            </span>

            <span className="text-2xl font-black text-green-400">
              ₹{total}
            </span>

          </div>

        </div>

        {/* Benefits */}

        <div className="mt-8 bg-[#181818] rounded-2xl p-4 space-y-3">

          <div className="flex items-center gap-2 text-sm text-gray-300">
            ✅ Secure Checkout
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-300">
            🚚 Fast Delivery
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-300">
            🔄 Easy Returns
          </div>

        </div>

        {/* Desktop Button */}

        <button
          onClick={placeOrder}
          className="hidden lg:block w-full mt-8 bg-white text-black py-4 rounded-2xl font-bold hover:bg-gray-200 transition"
        >
          Proceed to Payment
        </button>

      </div>

      {/* Mobile Sticky Bottom */}

      <div className="fixed bottom-0 left-0 right-0 lg:hidden bg-[#111] border-t border-gray-800 p-4 z-50">

        <div className="flex items-center justify-between gap-4">

          <div>

            <p className="text-xs text-gray-400">
              Grand Total
            </p>

            <p className="text-2xl font-bold text-green-400">
              ₹{total}
            </p>

          </div>

          <button
            onClick={placeOrder}
            className="bg-white text-black px-8 py-4 rounded-2xl font-bold"
          >
            Pay Now
          </button>

        </div>

      </div>
    </>
  );
}