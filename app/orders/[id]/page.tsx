"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

interface Order {
  id: number;
  fullname: string;
  email: string;
  phone: string;
  total: number;
  payment_method: string;
  payment_status: string;
  order_status: string;
  created_at: string;
}

interface OrderItem {
  id: number;
  product_name: string;
  image: string;
  quantity: number;
  price: number;
  size: string;
}

export default function OrderDetailsPage() {

  const { id } = useParams();

  const [order, setOrder] = useState<Order | null>(null);
  const [items, setItems] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchOrder();
      fetchItems();
    }
  }, [id]);

  const fetchOrder = async () => {
    try {

      const token = localStorage.getItem("token");

      const res = await fetch(
        `http://localhost:5000/api/orders/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      setOrder(data);

    } catch (err) {
      console.error(err);
    }
  };

  const fetchItems = async () => {
    try {

      const token = localStorage.getItem("token");

      const res = await fetch(
        `http://localhost:5000/api/orders/${id}/items`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      setItems(data);

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />

        <main className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
          <h1 className="text-white text-3xl">
            Loading Order...
          </h1>
        </main>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="bg-[#0A0A0A] min-h-screen pt-40 pb-24">

        <div className="max-w-7xl mx-auto px-10">

          <h1 className="text-5xl font-black text-white">
            Order #{id}
          </h1>

          <p className="text-gray-400 mt-3">
            Premium Order Details
          </p>

          <div className="grid lg:grid-cols-3 gap-10 mt-12"></div>
          {/* ========================= */}
{/* Left Side - Products */}
{/* ========================= */}

<div className="lg:col-span-2">

  <div className="bg-[#111] rounded-3xl p-8">

    <h2 className="text-3xl font-bold text-white mb-8">
      Ordered Items
    </h2>

    {items.length === 0 ? (

      <p className="text-gray-400">
        No products found.
      </p>

    ) : (

      <div className="space-y-6">

        {items.map((item) => (

          <div
            key={item.id}
            className="flex gap-6 border-b border-gray-800 pb-6"
          >

            {/* Product Image */}

            <img
              src={`http://localhost:5000/uploads/${item.image}`}
              alt={item.product_name}
              className="w-36 h-36 rounded-2xl object-cover bg-[#1A1A1A]"
            />

            {/* Product Details */}

            <div className="flex-1">

              <h3 className="text-2xl font-bold text-white">
                {item.product_name}
              </h3>

              <div className="mt-4 space-y-2">

                <p className="text-gray-400">
                  Size:
                  <span className="text-white ml-2">
                    {item.size}
                  </span>
                </p>

                <p className="text-gray-400">
                  Quantity:
                  <span className="text-white ml-2">
                    {item.quantity}
                  </span>
                </p>

                <p className="text-gray-400">
                  Price:
                  <span className="text-white ml-2">
                    ₹{item.price}
                  </span>
                </p>

              </div>

            </div>

          </div>

        ))}

      </div>

    )}

  </div>

</div>

{/* ========================= */}
{/* Right Side */}
{/* ========================= */}

<div className="space-y-8">

  {/* Order Summary */}

  <div className="bg-[#111] rounded-3xl p-8">

    <h2 className="text-3xl font-bold text-white mb-6">
      Order Summary
    </h2>

    <div className="space-y-4">

      <div className="flex justify-between">

        <span className="text-gray-400">
          Order ID
        </span>

        <span className="text-white">
          #{order?.id}
        </span>

      </div>

      <div className="flex justify-between">

        <span className="text-gray-400">
          Total
        </span>

        <span className="text-white font-bold">
          ₹{order?.total}
        </span>

      </div>

      <div className="flex justify-between">

        <span className="text-gray-400">
          Payment
        </span>

        <span className="text-white">
          {order?.payment_method}
        </span>

      </div>

      <div className="flex justify-between">

        <span className="text-gray-400">
          Payment Status
        </span>

        <span className="text-green-400">
          {order?.payment_status}
        </span>

      </div>

      <div className="flex justify-between">

        <span className="text-gray-400">
          Order Status
        </span>

        <span className="text-yellow-400">
          {order?.order_status}
        </span>

      </div>

    </div>

  </div>
    {/* Shipping Details */}

  <div className="bg-[#111] rounded-3xl p-8">

    <h2 className="text-3xl font-bold text-white mb-6">
      Shipping Details
    </h2>

    <div className="space-y-4">

      <div>
        <p className="text-gray-400">
          Customer
        </p>

        <p className="text-white text-lg">
          {order?.fullname}
        </p>
      </div>

      <div>
        <p className="text-gray-400">
          Email
        </p>

        <p className="text-white">
          {order?.email}
        </p>
      </div>

      <div>
        <p className="text-gray-400">
          Phone
        </p>

        <p className="text-white">
          {order?.phone}
        </p>
      </div>

      <div>
        <p className="text-gray-400">
          Ordered On
        </p>

        <p className="text-white">
          {new Date(order!.created_at).toLocaleDateString()}
        </p>
      </div>

    </div>

  </div>

  {/* Action Buttons */}

  <div className="bg-[#111] rounded-3xl p-8">

    <h2 className="text-2xl font-bold text-white mb-6">
      Actions
    </h2>

    <div className="space-y-4">

      <button
        className="w-full bg-white text-black py-4 rounded-xl font-bold hover:bg-gray-200 transition"
      >
        Download Invoice
      </button>

      <button
        className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition"
      >
        Track Order
      </button>

      <button
        className="w-full bg-green-600 text-white py-4 rounded-xl font-bold hover:bg-green-700 transition"
      >
        Reorder
      </button>

      {order?.order_status !== "Delivered" && (
        <button
          className="w-full bg-red-600 text-white py-4 rounded-xl font-bold hover:bg-red-700 transition"
        >
          Cancel Order
        </button>
      )}

    </div>

  </div>

</div>

</div>

</main>

<Footer />

</>
);
}