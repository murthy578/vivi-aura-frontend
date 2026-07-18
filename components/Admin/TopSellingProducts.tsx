"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface Product {
  id: number;
  product_name: string;
  image: string;
  sold: number;
  revenue: number;
}

export default function TopSellingProducts() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/dashboard/top-products"
      );

      const data = await response.json();

      setProducts(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-[#111] rounded-3xl p-8">

      <h2 className="text-3xl font-bold text-white mb-8">
        🏆 Top Selling Products
      </h2>

      <div className="space-y-5">

        {products.map((product, index) => (

          <div
            key={product.id}
            className="flex items-center justify-between bg-[#1A1A1A] rounded-2xl p-4"
          >

            <div className="flex items-center gap-4">

              <span className="text-2xl font-bold text-white w-8">
                #{index + 1}
              </span>

              <Image
                src={`http://localhost:5000/uploads/${product.image}`}
                alt={product.product_name}
                width={70}
                height={70}
                className="rounded-xl object-cover"
              />

              <div>

                <h3 className="text-white font-semibold">
                  {product.product_name}
                </h3>

                <p className="text-gray-400">
                  Sold: {product.sold}
                </p>

              </div>

            </div>

            <div className="text-right">

              <p className="text-green-400 text-xl font-bold">
                ₹{product.revenue}
              </p>

            </div>

          </div>

        ))}

        {products.length === 0 && (
          <div className="text-center text-gray-400 py-10">
            No sales data available.
          </div>
        )}

      </div>

    </div>
  );
}