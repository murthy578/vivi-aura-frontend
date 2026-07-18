"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { HiOutlineHeart } from "react-icons/hi";

interface Product {
  id: number;
  product_name: string;
  price: number;
  mrp: number;
  image: string;
  featured: number;
  stock: number;
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  // ==========================
  // Fetch Featured Products
  // ==========================

  const fetchProducts = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/products"
      );

      const data = await response.json();

      const featuredProducts = data.filter(
        (item: Product) => item.featured === 1
      );

      setProducts(featuredProducts);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // ==========================
  // Add to Wishlist
  // ==========================
const addToWishlist = async (productId: number) => {
  console.log("STEP 1");
  alert("Inside addToWishlist");

  try {
    console.log("STEP 2");

    const response = await fetch(
      "http://localhost:5000/api/wishlist",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: 1,
          product_id: productId,
        }),
      }
    );

    console.log("STEP 3", response.status);

    const data = await response.json();

    console.log("STEP 4", data);

    alert("Done");
  } catch (error) {
    console.error(error);
    alert("ERROR");
  }
};

  if (loading) {
    return (
      <section className="bg-[#0A0A0A] py-28">
        <div className="max-w-7xl mx-auto px-10 text-center text-white text-2xl">
          Loading Products...
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#0A0A0A] py-28">
      <div className="max-w-7xl mx-auto px-10">
        <div className="flex justify-between items-center mb-14">
          <h2 className="text-white text-5xl font-bold">
            BEST SELLERS
          </h2>

          <Link
            href="/products"
            className="text-white border border-white px-6 py-3 rounded-full hover:bg-white hover:text-black transition"
          >
            VIEW ALL →
          </Link>
        </div>

        {products.length === 0 ? (
          <div className="text-center text-gray-400 text-xl py-20">
            No Featured Products Found
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <motion.div
                key={product.id}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
                className="bg-[#111] rounded-[30px] overflow-hidden group"
              >
                <div className="relative">
                  <Link href={`/product/${product.id}`}>
                    <Image
                      src={`http://localhost:5000/uploads/${product.image}`}
                      alt={product.product_name}
                      width={500}
                      height={600}
                      className="w-full h-[360px] object-cover group-hover:scale-110 transition duration-700"
                    />
                  </Link>

                  {/* Wishlist */}
<button
  type="button"
  onClick={(e) => {
    e.preventDefault();
    e.stopPropagation();

    alert("Heart Clicked");

    addToWishlist(product.id);
  }}
  className="absolute top-5 right-5 z-50 bg-white rounded-full p-3 cursor-pointer hover:scale-110 transition"
>
  <HiOutlineHeart size={24} />
</button>

                  <span className="absolute left-5 top-5 bg-black text-white px-4 py-2 rounded-full text-sm">
                    FEATURED
                  </span>
                </div>

                <div className="p-6">
                  <h3 className="text-white text-2xl font-semibold">
                    {product.product_name}
                  </h3>

                  <div className="flex items-center gap-3 mt-4">
                    <p className="text-white text-3xl font-bold">
                      ₹{product.price}
                    </p>

                    {product.mrp > product.price && (
                      <p className="text-gray-500 line-through">
                        ₹{product.mrp}
                      </p>
                    )}
                  </div>

                  <p className="text-gray-400 mt-3">
                    Stock : {product.stock}
                  </p>

                  <button className="mt-6 w-full bg-white text-black py-4 rounded-full font-semibold hover:bg-black hover:text-white border transition">
                    ADD TO BAG
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}