"use client";

import { use } from "react";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import CategoryProducts from "@/components/Products/CategoryProducts";

interface Props {
  params: Promise<{
    category: string;
  }>;
}

export default function CategoryPage({ params }: Props) {
  const { category } = use(params);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#0A0A0A] pt-40 pb-24">
        <div className="max-w-7xl mx-auto px-10">

          <div className="mb-14">
            <h1 className="text-6xl font-black text-white uppercase">
              {category}
            </h1>

            <p className="text-gray-400 mt-4">
              Browse our {category} collection.
            </p>
          </div>

          <CategoryProducts category={category} />

        </div>
      </main>

      <Footer />
    </>
  );
}