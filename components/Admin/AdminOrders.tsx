"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Order {
  id: number;
  fullname: string;
  mobile: string;
  total: number;
  payment_method: string;
  payment_status: string;
  order_status: string;
  created_at: string;
}

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/checkout/orders"
      );

      const data = await response.json();

      setOrders(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center text-white py-20">
        Loading Orders...
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="text-center text-white py-20">
        No Orders Found
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
          <div className="flex justify-between items-center">

            <div>
              <h2 className="text-2xl font-bold text-white">
                Order #{order.id}
              </h2>

              <p className="text-gray-400 mt-2">
                {new Date(order.created_at).toLocaleString()}
              </p>

              <p className="text-gray-400 mt-2">
                Customer :
                {" "}
                {order.fullname || "Guest User"}
              </p>

              <p className="text-gray-400">
                Mobile :
                {" "}
                {order.mobile || "-"}
              </p>
            </div>

            <div className="text-right">

              <h2 className="text-3xl font-bold text-white">
                ₹{order.total}
              </h2>

              <p className="text-green-400 mt-2">
                {order.payment_status}
              </p>

              <p className="text-yellow-400">
                {order.order_status}
              </p>

              <Link
                href={`/orders/${order.id}`}
                className="inline-block mt-5 bg-white text-black px-6 py-3 rounded-full hover:bg-gray-200 transition"
              >
                View Order
              </Link>

            </div>

          </div>
        </div>
      ))}
    </div>
  );
}