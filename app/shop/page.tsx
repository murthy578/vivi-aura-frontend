"use client";

import { useState } from "react";

import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import Sidebar from "@/components/Shop/Sidebar";
import Toolbar from "@/components/Shop/Toolbar";
import ShopGrid from "@/components/Shop/ShopGrid";
export default function ShopPage() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("new");
  const [category, setCategory] = useState("All");

  return (
    <>
      <Navbar />

      <main className="pt-36 bg-[#0A0A0A] min-h-screen">

        {/* Header */}
        <section className="max-w-[1700px] mx-auto px-10 py-12">

          <h1 className="text-white text-6xl font-black">
            SHOP
          </h1>

          <p className="text-gray-400 mt-4 text-lg">
            Discover premium streetwear collections.
          </p>

        </section>

        {/* Content */}
        <div className="max-w-[1700px] mx-auto px-10 pb-24 flex gap-10">


<Sidebar
  category={category}
  setCategory={setCategory}
/>

          <div className="flex-1">

            <Toolbar
              search={search}
              setSearch={setSearch}
              sort={sort}
              setSort={setSort}
              total={5}
            />

            <ShopGrid
  search={search}
  sort={sort}
  category={category}
/>


          </div>

        </div>

      </main>

      <Footer />
    </>
  );
}