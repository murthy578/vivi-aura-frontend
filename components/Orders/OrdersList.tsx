"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Order {
  id: number;
  total: number;
  payment_method: string;
  payment_status: string;
  order_status: string;
  created_at: string;
}

export default function OrdersList() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await fetch(
        "http://localhost:5000/api/checkout/orders"
      );

      const data = await res.json();

      setOrders(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-white text-center py-20">
        Loading Orders...
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-3xl text-white font-bold">
          No Orders Found
        </h2>

        <p className="text-gray-400 mt-3">
          You haven't placed any orders yet.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {orders.map((order) => (
        <div
          key={order.id}
          className="bg-[#111] rounded-3xl p-8"
        >
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-white text-2xl font-bold">
                Order #{order.id}
              </h2>

              <p className="text-gray-400">
                {new Date(order.created_at).toLocaleString()}
              </p>
            </div>

            <span className="bg-green-600 text-white px-4 py-2 rounded-full">
              {order.order_status}
            </span>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <p className="text-gray-400">
                Payment Method
              </p>

              <p className="text-white font-semibold">
                {order.payment_method}
              </p>
            </div>

            <div>
              <p className="text-gray-400">
                Payment Status
              </p>

              <p className="text-white font-semibold">
                {order.payment_status}
              </p>
            </div>

            <div>
              <p className="text-gray-400">
                Total
              </p>

              <p className="text-white font-bold text-xl">
                ₹{order.total}
              </p>
            </div>
          </div>

          <Link
            href={`/orders/${order.id}`}
            className="inline-block mt-8 bg-white text-black px-8 py-3 rounded-full hover:bg-gray-200 transition"
          >
            View Details
          </Link>
        </div>
      ))}
    </div>
  );
}