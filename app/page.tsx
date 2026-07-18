"use client";

import Navbar from "@/components/Navbar/Navbar";
import Hero from "@/components/Hero/Hero";
import Collections from "@/components/Collections/Collections";
import Products from "@/components/Products/Products";
import Featured from "@/components/Featured/Featured";
import Footer from "@/components/Footer/Footer";

export default function Home() {
  return (
    <>
      <Navbar />

      <Hero />

      <Collections />

      <Products />

      <Featured />

      <Footer />
    </>
  );
}