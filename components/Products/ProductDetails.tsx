"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

interface Product {
  id: number;
  product_name: string;
  product_description: string;
  price: number;
  mrp: number;
  brand: string;
  fabric: string;
  stock: number;
  image: string;
}

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [size, setSize] = useState("M");
  const [qty, setQty] = useState(1);

  const handleAddToCart = () => {
    if (!product) return;

    addToCart({
      id: product.id,
      product_name: product.product_name,
      image: product.image,
      price: product.price,
      size,
      quantity: qty,
    });

    alert("Product added to cart!");
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/products/${id}`
      );

      const data = await response.json();

      setProduct(data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-white text-lg animate-pulse">
          Loading Product...
        </p>
      </div>
    );
  }

  return (
    <section className="bg-[#0A0A0A] min-h-screen pt-24 pb-28">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">

          {/* Product Images */}

          <div className="space-y-5">

            <div className="overflow-hidden rounded-3xl bg-[#111]">

              <Image
                src={`http://localhost:5000/uploads/${product.image}`}
                alt={product.product_name}
                width={900}
                height={1100}
                priority
                className="w-full aspect-[4/5] object-cover hover:scale-105 transition duration-500"
              />

            </div>

            {/* Thumbnail Gallery */}

            <div className="flex gap-3 overflow-x-auto pb-2">

              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="w-20 h-24 rounded-xl overflow-hidden border border-gray-700 flex-shrink-0"
                >
                  <Image
                    src={`http://localhost:5000/uploads/${product.image}`}
                    alt={product.product_name}
                    width={120}
                    height={150}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}

            </div>

          </div>

          {/* Product Details */}

          <div className="flex flex-col"></div>

                    {/* Brand */}

            <p className="uppercase tracking-[4px] text-gray-400 text-sm">
              VIVI-AURA
            </p>

            {/* Product Name */}

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-3 leading-tight">
              {product.product_name}
            </h1>

            {/* Rating */}

            <div className="flex items-center gap-3 mt-5">

              <div className="flex text-yellow-400 text-lg">
                ★★★★★
              </div>

              <span className="text-gray-400 text-sm">
                4.8 (248 Reviews)
              </span>

            </div>

            {/* Price */}

            <div className="flex flex-wrap items-center gap-3 mt-8">

              <h2 className="text-3xl sm:text-4xl font-bold text-white">
                ₹{product.price}
              </h2>

              {product.mrp > product.price && (
                <>
                  <span className="text-xl text-gray-500 line-through">
                    ₹{product.mrp}
                  </span>

                  <span className="bg-red-600 px-3 py-1 rounded-full text-xs font-semibold text-white">
                    {Math.round(
                      ((product.mrp - product.price) /
                        product.mrp) *
                        100
                    )}
                    % OFF
                  </span>
                </>
              )}

            </div>

            {/* Delivery */}

            <div className="mt-10 bg-[#111] rounded-2xl p-5">

              <h3 className="text-white font-semibold mb-4">
                Check Delivery
              </h3>

              <div className="flex flex-col sm:flex-row gap-3">

                <input
                  placeholder="Enter Pincode"
                  className="flex-1 bg-[#181818] text-white rounded-xl px-5 py-4 outline-none border border-gray-700"
                />

                <button className="bg-white text-black rounded-xl px-6 py-4 font-semibold hover:bg-gray-200 transition">
                  Check
                </button>

              </div>

              <p className="text-green-400 text-sm mt-4">
                Estimated Delivery: 2–5 Business Days
              </p>

            </div>

            {/* Product Information */}

            <div className="mt-10 rounded-2xl border border-gray-800 overflow-hidden">

              <div className="flex justify-between px-5 py-4 border-b border-gray-800">

                <span className="text-gray-400">
                  Brand
                </span>

                <span className="text-white font-medium">
                  {product.brand || "-"}
                </span>

              </div>

              <div className="flex justify-between px-5 py-4 border-b border-gray-800">

                <span className="text-gray-400">
                  Fabric
                </span>

                <span className="text-white font-medium">
                  {product.fabric || "-"}
                </span>

              </div>

              <div className="flex justify-between px-5 py-4">

                <span className="text-gray-400">
                  Availability
                </span>

                <span
                  className={`font-semibold ${
                    product.stock > 0
                      ? "text-green-400"
                      : "text-red-500"
                  }`}
                >
                  {product.stock > 0
                    ? "In Stock"
                    : "Out of Stock"}
                </span>

              </div>

            </div>

            {/* Description */}

            <div className="mt-10">

              <h3 className="text-white text-xl font-semibold mb-4">
                Product Description
              </h3>

              <p className="text-gray-400 leading-8 text-sm sm:text-base">
                {product.product_description}
              </p>

            </div>
                        {/* Size Selection */}

            <div className="mt-10">

              <div className="flex items-center justify-between mb-4">

                <h3 className="text-white font-semibold text-lg">
                  Select Size
                </h3>

                <button className="text-sm text-gray-400 hover:text-white transition">
                  Size Guide
                </button>

              </div>

              <div className="grid grid-cols-4 gap-3">

                {["S", "M", "L", "XL"].map((item) => (

                  <button
                    key={item}
                    onClick={() => setSize(item)}
                    className={`h-14 rounded-xl border transition-all duration-300 font-semibold ${
                      size === item
                        ? "bg-white text-black border-white"
                        : "border-gray-600 text-white hover:border-white"
                    }`}
                  >
                    {item}
                  </button>

                ))}

              </div>

            </div>

            {/* Quantity */}

            <div className="mt-10">

              <h3 className="text-white font-semibold text-lg mb-4">
                Quantity
              </h3>

              <div className="inline-flex items-center rounded-xl border border-gray-700 overflow-hidden">

                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="w-12 h-12 bg-[#151515] text-white hover:bg-[#222] transition text-xl"
                >
                  −
                </button>

                <div className="w-14 text-center text-white font-semibold">
                  {qty}
                </div>

                <button
                  onClick={() => setQty(qty + 1)}
                  className="w-12 h-12 bg-[#151515] text-white hover:bg-[#222] transition text-xl"
                >
                  +
                </button>

              </div>

            </div>

            {/* Action Buttons */}

            <div className="mt-12 space-y-4">

              <button
                onClick={handleAddToCart}
                className="w-full bg-white text-black py-4 rounded-2xl font-bold text-lg hover:bg-gray-200 transition"
              >
                ADD TO BAG
              </button>

              <div className="grid grid-cols-2 gap-4">

                <button className="border border-white text-white py-4 rounded-2xl font-semibold hover:bg-white hover:text-black transition">
                  ♡ Wishlist
                </button>

                <button className="bg-[#1f1f1f] text-white py-4 rounded-2xl font-semibold hover:bg-[#2d2d2d] transition">
                  BUY NOW
                </button>

              </div>

            </div>

            {/* Extra Benefits */}

            <div className="mt-12 rounded-2xl bg-[#111] border border-gray-800 p-6">

              <div className="space-y-4">

                <div className="flex items-center gap-3">
                  <span className="text-green-400 text-xl">✓</span>
                  <p className="text-gray-300">
                    100% Original Product
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-green-400 text-xl">✓</span>
                  <p className="text-gray-300">
                    Easy 7 Days Return & Exchange
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-green-400 text-xl">✓</span>
                  <p className="text-gray-300">
                    Secure Online Payments
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-green-400 text-xl">✓</span>
                  <p className="text-gray-300">
                    Premium Quality Fabric
                  </p>
                </div>

              </div>

            </div>
                        {/* Product Information */}

            <div className="mt-12 border-t border-gray-800 pt-8 space-y-6">

              <details className="group border-b border-gray-800 pb-5">
                <summary className="flex justify-between items-center cursor-pointer list-none">
                  <span className="text-white font-semibold">
                    Product Details
                  </span>

                  <span className="text-gray-400 group-open:rotate-180 transition">
                    ▼
                  </span>
                </summary>

                <div className="mt-4 text-gray-400 leading-7">
                  {product.product_description}
                </div>

              </details>

              <details className="group border-b border-gray-800 pb-5">
                <summary className="flex justify-between items-center cursor-pointer list-none">
                  <span className="text-white font-semibold">
                    Shipping & Returns
                  </span>

                  <span className="text-gray-400 group-open:rotate-180 transition">
                    ▼
                  </span>
                </summary>

                <div className="mt-4 text-gray-400 leading-7">
                  Free shipping on prepaid orders.
                  <br />
                  Easy 7-day return & exchange.
                  <br />
                  Delivery usually takes 2–5 business days.
                </div>

              </details>

              <details className="group">

                <summary className="flex justify-between items-center cursor-pointer list-none">

                  <span className="text-white font-semibold">
                    Care Instructions
                  </span>

                  <span className="text-gray-400 group-open:rotate-180 transition">
                    ▼
                  </span>

                </summary>

                <div className="mt-4 text-gray-400 leading-7">

                  • Machine wash cold

                  <br />

                  • Wash with similar colors

                  <br />

                  • Do not bleach

                  <br />

                  • Iron inside out

                  <br />

                  • Do not tumble dry

                </div>

              </details>

            </div>

          </div>

        </div>

    

      {/* Mobile Sticky Add To Bag */}

      <div className="fixed bottom-0 left-0 right-0 bg-[#0A0A0A] border-t border-gray-800 p-4 lg:hidden z-50">

        <div className="flex items-center justify-between gap-4">

          <div>

            <p className="text-gray-400 text-xs">
              Total Price
            </p>

            <p className="text-white text-2xl font-bold">
              ₹{product.price * qty}
            </p>

          </div>

          <button
            onClick={handleAddToCart}
            className="flex-1 bg-white text-black py-4 rounded-2xl font-bold hover:bg-gray-200 transition"
          >
            ADD TO BAG
          </button>

        </div>

      </div>

    </section>
  );
}