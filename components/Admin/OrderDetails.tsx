"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import OrderItems from "./OrderItems";

interface Order {
  id: number;
  fullname: string | null;
  email: string | null;
  phone: string | null;
  total: number;
  payment_method: string;
  payment_status: string;
  order_status: string;
  created_at: string;
}

export default function OrderDetails() {
  const { id } = useParams();

  const [order, setOrder] = useState<Order | null>(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetchOrder();
  }, []);

  const fetchOrder = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/orders/${id}`
      );

      const data = await response.json();

      setOrder(data);
      setStatus(data.order_status);
    } catch (error) {
      console.error(error);
    }
  };

  const updateStatus = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/orders/${id}/status`,
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

      const data = await response.json();

      alert(data.message);

      fetchOrder();
    } catch (error) {
      console.error(error);
      alert("Failed to update order status.");
    }
  };

  if (!order) {
    return (
      <div className="bg-[#111] rounded-3xl p-10 text-white">
        Loading Order...
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* Main Card */}

      <div className="bg-[#111] rounded-3xl p-8">

        <h2 className="text-3xl font-bold text-white mb-8">
          Order Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Customer */}

          <div className="bg-[#1A1A1A] rounded-2xl p-6">

            <h3 className="text-xl font-bold text-white mb-5">
              Customer Details
            </h3>

            <div className="space-y-3">

              <p className="text-gray-300">
                <span className="font-semibold text-white">
                  Name:
                </span>{" "}
                {order.fullname || "Guest User"}
              </p>

              <p className="text-gray-300">
                <span className="font-semibold text-white">
                  Email:
                </span>{" "}
                {order.email || "-"}
              </p>

              <p className="text-gray-300">
                <span className="font-semibold text-white">
                  Phone:
                </span>{" "}
                {order.phone || "-"}
              </p>

            </div>

          </div>

          {/* Order */}

          <div className="bg-[#1A1A1A] rounded-2xl p-6">

            <h3 className="text-xl font-bold text-white mb-5">
              Order Details
            </h3>

            <div className="space-y-3">

              <p className="text-gray-300">
                <span className="font-semibold text-white">
                  Order ID:
                </span>{" "}
                #{order.id}
              </p>

              <p className="text-gray-300">
                <span className="font-semibold text-white">
                  Total:
                </span>{" "}
                ₹{order.total}
              </p>

              <p className="text-gray-300">
                <span className="font-semibold text-white">
                  Payment Method:
                </span>{" "}
                {order.payment_method}
              </p>

              <p className="text-gray-300">
                <span className="font-semibold text-white">
                  Payment Status:
                </span>{" "}
                <span
                  className={`px-2 py-1 rounded-lg text-sm ${
                    order.payment_status === "Paid"
                      ? "bg-green-600 text-white"
                      : "bg-red-600 text-white"
                  }`}
                >
                  {order.payment_status}
                </span>
              </p>

              <p className="text-gray-300">
                <span className="font-semibold text-white">
                  Order Status:
                </span>{" "}
                <span
                  className={`px-2 py-1 rounded-lg text-sm ${
                    order.order_status === "Delivered"
                      ? "bg-green-600 text-white"
                      : order.order_status === "Processing"
                      ? "bg-yellow-500 text-black"
                      : order.order_status === "Cancelled"
                      ? "bg-red-600 text-white"
                      : "bg-blue-600 text-white"
                  }`}
                >
                  {order.order_status}
                </span>
              </p>

              <p className="text-gray-300">
                <span className="font-semibold text-white">
                  Order Date:
                </span>{" "}
                {new Date(order.created_at).toLocaleString()}
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* Update Status */}

      <div className="bg-[#111] rounded-3xl p-8">

        <h2 className="text-2xl font-bold text-white mb-6">
          Update Order Status
        </h2>

        <div className="flex flex-col md:flex-row gap-4">

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="bg-[#1A1A1A] text-white px-5 py-3 rounded-xl outline-none"
          >
            <option value="Processing">
              Processing
            </option>

            <option value="Shipped">
              Shipped
            </option>

            <option value="Delivered">
              Delivered
            </option>

            <option value="Cancelled">
              Cancelled
            </option>
          </select>

          <button
            onClick={updateStatus}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl text-white font-semibold transition"
          >
            Save Status
          </button>

        </div>

      </div>
<OrderItems orderId={String(id)} />
    </div>
  );
}