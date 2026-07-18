"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import ProductGrid from "@/components/Products/ProductGrid";

interface Product {
  id: number;
  product_name: string;
  product_description: string;
  price: number;
  mrp: number;
  image: string;
  category_name: string;
  featured: number;
  new_arrival: number;
  bestseller: number;
  trending: number;
}

export default function BestSellersPage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/products"
      );

      const data = await response.json();

      const bestSellers = data.filter(
        (item: Product) => item.bestseller === 1
      );

      setProducts(bestSellers);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#0A0A0A] pt-40 pb-24">
        <div className="max-w-7xl mx-auto px-10">
          <div className="mb-14">
            <h1 className="text-6xl font-black text-white">
              BEST SELLERS
            </h1>

            <p className="text-gray-400 mt-4">
              Explore our most loved products.
            </p>
          </div>

          <ProductGrid products={products} />
        </div>
      </main>

      <Footer />
    </>
  );
}