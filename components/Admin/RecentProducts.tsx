"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface Product {
  id: number;
  product_name: string;
  price: number;
  image: string | null;
  created_at: string;
}

export default function RecentProducts() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchRecentProducts();
  }, []);

  const fetchRecentProducts = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/dashboard/recent-products"
      );

      const data = await response.json();

      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-[#111] rounded-3xl p-6 mt-8">

      <h2 className="text-2xl font-bold text-white mb-6">
        Recent Products
      </h2>

      <div className="space-y-4">

        {products.map((product) => (
          <div
            key={product.id}
            className="flex items-center justify-between bg-[#1A1A1A] rounded-xl p-4"
          >
            <div className="flex items-center gap-4">

              {product.image ? (
                <img
  src={`http://localhost:5000/uploads/${product.image}`}
  alt={product.product_name}
  className="w-[70px] h-[70px] rounded-xl object-cover"
/>
              ) : (
                <div className="w-[60px] h-[60px] rounded-lg bg-gray-700 flex items-center justify-center text-xs text-gray-400">
                  No Image
                </div>
              )}

              <div>
                <h3 className="text-white font-semibold">
                  {product.product_name}
                </h3>

                <p className="text-green-400">
                  ₹{product.price}
                </p>
              </div>

            </div>

            <span className="text-gray-400 text-sm">
              {new Date(product.created_at).toLocaleDateString()}
            </span>

          </div>
        ))}

        {products.length === 0 && (
          <p className="text-gray-400">
            No recent products.
          </p>
        )}

      </div>

    </div>
  );
}