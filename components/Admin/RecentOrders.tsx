"use client";

import { useEffect, useState } from "react";

interface Order {
  id: number;
  fullname: string;
  total: number;
  payment_method: string;
  payment_status: string;
  order_status: string;
  created_at: string;
}

export default function RecentOrders() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/dashboard/recent-orders"
      );

      const data = await response.json();

console.log("Recent Orders API:", data);
console.log("Is Array:", Array.isArray(data));

setOrders(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-[#111] rounded-3xl p-6 mt-8">

      <h2 className="text-2xl font-bold text-white mb-6">
        Recent Orders
      </h2>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr className="border-b border-gray-700">

              <th className="text-left text-gray-400 py-3">
                Customer
              </th>

              <th className="text-left text-gray-400 py-3">
                Total
              </th>

              <th className="text-left text-gray-400 py-3">
                Payment
              </th>

              <th className="text-left text-gray-400 py-3">
                Status
              </th>

            </tr>

          </thead>

          <tbody>

            {orders.map((order) => (

              <tr
                key={order.id}
                className="border-b border-gray-800"
              >

                <td className="py-4 text-white">
{order.fullname || "Unknown Customer"}
                </td>

                <td className="py-4 text-green-400">
                  ₹{order.total}
                </td>

                <td className="py-4 text-gray-300">
                  {order.payment_method}
                </td>

                <td className="py-4">

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      order.order_status === "Delivered"
                        ? "bg-green-500 text-white"
                        : order.order_status === "Processing"
                        ? "bg-yellow-500 text-black"
                        : "bg-blue-500 text-white"
                    }`}
                  >
                    {order.order_status}
                  </span>

                </td>

              </tr>

            ))}

            {orders.length === 0 && (

              <tr>

                <td
                  colSpan={4}
                  className="text-center text-gray-400 py-8"
                >
                  No Orders Found
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}