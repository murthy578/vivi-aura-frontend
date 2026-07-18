"use client";

import { useEffect, useState } from "react";
import Image from "next/image";


interface OrderItem {
  id: number;
  product_name: string;
  image: string;
  quantity: number;
  size: string;
  price: number;
}

export default function OrderItems({ orderId }: { orderId: string }) {
  const [items, setItems] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/orders/${orderId}/items`
      );

      const data = await response.json();

      setItems(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-[#111] rounded-3xl p-8 text-white mt-8">
        Loading Order Items...
      </div>
    );
  }

  return (
    <div className="bg-[#111] rounded-3xl p-8 mt-8">

      <h2 className="text-2xl font-bold text-white mb-6">
        Order Items
      </h2>

      {items.length === 0 ? (
        <div className="text-gray-400">
          No products found for this order.
        </div>
      ) : (
        <div className="space-y-4">

          {items.map((item) => (

            <div
              key={item.id}
              className="bg-[#1A1A1A] rounded-2xl p-5 flex items-center gap-5"
            >

              <Image
                src={`http://localhost:5000/uploads/${item.image}`}
                alt={item.product_name}
                width={80}
                height={80}
                className="rounded-xl object-cover"
              />

              <div className="flex-1">

                <h3 className="text-white font-bold text-lg">
                  {item.product_name}
                </h3>

                <p className="text-gray-400">
                  Size: {item.size}
                </p>

                <p className="text-gray-400">
                  Quantity: {item.quantity}
                </p>

              </div>

              <div className="text-green-400 text-xl font-bold">
                ₹{item.price}
              </div>

            </div>

          ))}

        </div>
      )}

    </div>
  );
}