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
  stock: number;
}

interface Props {
  category: string;
}

export default function CategoryProducts({
  category,
}: Props) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, [category]);

  const fetchProducts = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/products/category/${category}`
      );

      const data = await response.json();

      setProducts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center text-white py-20 text-2xl">
        Loading Products...
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center text-gray-400 py-20 text-2xl">
        No Products Found
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

      {products.map((product) => (

        <div
          key={product.id}
          className="bg-[#111] rounded-3xl overflow-hidden hover:scale-[1.02] transition"
        >

          <Link href={`/product/${product.id}`}>

            <Image
              src={`http://localhost:5000/uploads/${product.image}`}
              alt={product.product_name}
              width={500}
              height={600}
              className="w-full h-[360px] object-cover"
            />

          </Link>

          <div className="p-6">

            <h2 className="text-white text-2xl font-bold">
              {product.product_name}
            </h2>

            <p className="text-gray-400 mt-2 line-clamp-2">
              {product.product_description}
            </p>

            <div className="flex items-center gap-3 mt-5">

              <span className="text-3xl font-bold text-white">
                ₹{product.price}
              </span>

              {product.mrp > product.price && (
                <span className="text-gray-500 line-through">
                  ₹{product.mrp}
                </span>
              )}

            </div>

            <p className="text-gray-400 mt-3">
              Stock: {product.stock}
            </p>

            <Link
              href={`/product/${product.id}`}
              className="block mt-6 bg-white text-center text-black py-3 rounded-full font-semibold hover:bg-gray-200 transition"
            >
              View Product
            </Link>

          </div>

        </div>

      ))}

    </div>
  );
}