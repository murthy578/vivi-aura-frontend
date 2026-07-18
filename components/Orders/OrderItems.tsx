"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface OrderItem {
  id: number;
  product_name: string;
  image: string;
  quantity: number;
  price: number;
  size: string;
}

interface Props {
  orderId: string;
}

export default function OrderItems({ orderId }: Props) {
  const [items, setItems] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrderItems();
  }, [orderId]);

  const fetchOrderItems = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/checkout/orders/${orderId}`
      );

      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-white text-center py-20">
        Loading...
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-3xl text-white font-bold">
          No Products Found
        </h2>

        <p className="text-gray-400 mt-3">
          This order doesn't contain any items.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {items.map((item) => (
        <div
          key={item.id}
          className="bg-[#111] rounded-3xl p-8 flex gap-6 items-center"
        >
          <Image
            src={`http://localhost:5000/uploads/${item.image}`}
            alt={item.product_name}
            width={120}
            height={120}
            className="rounded-2xl object-cover"
          />

          <div className="flex-1">
            <h2 className="text-2xl text-white font-bold">
              {item.product_name}
            </h2>

            <p className="text-gray-400 mt-2">
              Size: {item.size}
            </p>

            <p className="text-gray-400">
              Quantity: {item.quantity}
            </p>
          </div>

          <div className="text-right">
            <p className="text-3xl text-white font-bold">
              ₹{item.price}
            </p>

            <p className="text-gray-400 mt-2">
              Total ₹{item.price * item.quantity}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}