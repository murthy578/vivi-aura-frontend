"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface Product {
  id: number;
  product_name: string;
  product_description: string;
  price: number;
  mrp: number;
  image: string;
}

export default function SaleProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSaleProducts();
  }, []);

  const fetchSaleProducts = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/products/sale"
      );

      const data = await response.json();

      setProducts(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center text-white py-20">
        Loading Sale Products...
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center text-white py-20">
        No Sale Products Found
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-[#111] rounded-3xl overflow-hidden"
        >
          <Link href={`/product/${product.id}`}>
            <Image
              src={`http://localhost:5000/uploads/${product.image}`}
              alt={product.product_name}
              width={500}
              height={600}
              className="w-full h-[360px] object-cover hover:scale-105 transition"
            />
          </Link>

          <div className="p-6">
            <h2 className="text-white text-2xl font-bold">
              {product.product_name}
            </h2>

            <p className="text-gray-400 mt-2">
              {product.product_description}
            </p>

            <p className="text-white text-3xl font-bold mt-4">
              ₹{product.price}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}