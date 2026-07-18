"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Order {
  id: number;
  fullname: string | null;
  total: number;
  payment_method: string;
  payment_status: string;
  order_status: string;
  created_at: string;
}

export default function OrdersTable() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    let result = [...orders];

    if (search.trim()) {
      result = result.filter((order) =>
        (order.fullname || "Guest User")
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    if (statusFilter !== "All") {
      result = result.filter(
        (order) => order.order_status === statusFilter
      );
    }

    setFilteredOrders(result);
  }, [orders, search, statusFilter]);

  const fetchOrders = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/checkout/orders"
      );

      const data = await response.json();

      const list = Array.isArray(data) ? data : [];

      setOrders(list);
      setFilteredOrders(list);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (
    id: number,
    status: string
  ) => {
    try {
      await fetch(
        `http://localhost:5000/api/checkout/orders/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            order_status: status,
          }),
        }
      );

      fetchOrders();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="bg-[#111] rounded-3xl p-10 text-center text-white">
        Loading Orders...
      </div>
    );
  }

  return (
    <div className="bg-[#111] rounded-3xl overflow-hidden">

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 p-6 border-b border-gray-800">

        <input
          type="text"
          placeholder="Search customer..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-[#1A1A1A] text-white px-4 py-3 rounded-xl w-full md:w-80 outline-none"
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-[#1A1A1A] text-white px-4 py-3 rounded-xl outline-none"
        >
          <option value="All">All Orders</option>
          <option value="Processing">Processing</option>
          <option value="Packed">Packed</option>
          <option value="Shipped">Shipped</option>
          <option value="Out For Delivery">Out For Delivery</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>

      </div>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead className="bg-[#1A1A1A]">

            <tr>
              <th className="p-5 text-left text-gray-300">
                Order ID
              </th>

              <th className="p-5 text-left text-gray-300">
                Customer
              </th>

              <th className="p-5 text-left text-gray-300">
                Total
              </th>

              <th className="p-5 text-left text-gray-300">
                Payment
              </th>

              <th className="p-5 text-left text-gray-300">
                Payment Status
              </th>

              <th className="p-5 text-left text-gray-300">
                Order Status
              </th>

              <th className="p-5 text-left text-gray-300">
                Date
              </th>

              <th className="p-5 text-left text-gray-300">
                Action
              </th>
            </tr>

          </thead>

          <tbody>

            {filteredOrders.map((order) => (

              <tr
                key={order.id}
                className="border-t border-gray-800 hover:bg-[#1A1A1A]"
              >

                <td className="p-5 text-white">
                  #{order.id}
                </td>

                <td className="p-5 text-white">
                  {order.fullname || "Guest User"}
                </td>

                <td className="p-5 text-green-400">
                  ₹{order.total}
                </td>

                <td className="p-5 text-white">
                  {order.payment_method}
                </td>

                <td className="p-5">

                  <span
                    className={`px-3 py-1 rounded-full text-xs ${
                      order.payment_status === "Paid"
                        ? "bg-green-500 text-white"
                        : "bg-red-500 text-white"
                    }`}
                  >
                    {order.payment_status}
                  </span>

                </td>

                <td className="p-5">

                  <select
                    value={order.order_status}
                    onChange={(e) =>
                      updateStatus(order.id, e.target.value)
                    }
                    className="bg-[#1A1A1A] text-white px-3 py-2 rounded-lg"
                  >
                    <option value="Processing">
                      Processing
                    </option>

                    <option value="Packed">
                      Packed
                    </option>

                    <option value="Shipped">
                      Shipped
                    </option>

                    <option value="Out For Delivery">
                      Out For Delivery
                    </option>

                    <option value="Delivered">
                      Delivered
                    </option>

                    <option value="Cancelled">
                      Cancelled
                    </option>

                  </select>

                </td>

                <td className="p-5 text-gray-400">
                  {new Date(
                    order.created_at
                  ).toLocaleDateString()}
                </td>

                <td className="p-5">

                  <Link
                    href={`/admin/orders/${order.id}`}
                    className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white"
                  >
                    View
                  </Link>

                </td>

              </tr>

            ))}

            {filteredOrders.length === 0 && (

              <tr>

                <td
                  colSpan={8}
                  className="text-center text-gray-400 py-10"
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