"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

import ProductSearch from "@/components/Products/ProductSearch";
import CategoryFilter from "@/components/Products/CategoryFilter";
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

interface Category {
  id: number;
  name: string;
}

export default function ProductsContent() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const searchParams = useSearchParams();

  const gender = searchParams.get("gender");
  const category = searchParams.get("category");
  const fabricType = searchParams.get("fabric_type");
  const collection = searchParams.get("collection");
  const featured = searchParams.get("featured");
  const bestseller = searchParams.get("bestseller");
  const trending = searchParams.get("trending");
  const newArrival = searchParams.get("new_arrival");

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [
    gender,
    category,
    fabricType,
    collection,
    featured,
    bestseller,
    trending,
    newArrival,
  ]);

  useEffect(() => {
    let result = [...products];

    if (selectedCategory !== "All") {
      result = result.filter(
        (item) =>
          item.category_name.toLowerCase() ===
          selectedCategory.toLowerCase()
      );
    }

    if (search.trim() !== "") {
      result = result.filter((item) =>
        item.product_name.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredProducts(result);
  }, [products, search, selectedCategory]);

  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/products");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/categories");
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#0A0A0A] pt-40 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-gray-500 uppercase tracking-[8px]">
              VIVI-AURA
            </p>

            <h1 className="text-6xl font-black text-white mt-4">
              Premium Collection
            </h1>

            <p className="text-gray-400 mt-6 max-w-2xl mx-auto">
              Discover premium oversized streetwear crafted for everyday comfort.
            </p>
          </div>

          <ProductSearch search={search} setSearch={setSearch} />

          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />

          {loading ? (
            <div className="flex justify-center py-32">
              <div className="w-16 h-16 border-4 border-gray-700 border-t-white rounded-full animate-spin" />
            </div>
          ) : (
            <ProductGrid products={filteredProducts} />
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}