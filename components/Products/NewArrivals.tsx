"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface Product {
  id: number;
  product_name: string;
  price: number;
  mrp: number;
  image: string;
  stock: number;
}

export default function NewArrivals() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products/new-arrivals")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch(console.error);
  }, []);

  if (products.length === 0) {
    return (
      <div className="text-center text-gray-400 py-20">
        No New Arrivals Found
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
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
              className="w-full h-[350px] object-cover"
            />
          </Link>

          <div className="p-6">
            <h3 className="text-white text-2xl font-semibold">
              {product.product_name}
            </h3>

            <p className="text-3xl text-white font-bold mt-4">
              ₹{product.price}
            </p>

            <p className="text-gray-400 mt-2">
              Stock: {product.stock}
            </p>

            <Link
              href={`/product/${product.id}`}
              className="mt-6 block bg-white text-center text-black py-3 rounded-full font-semibold"
            >
              View Product
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}