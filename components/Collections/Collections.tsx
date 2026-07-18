"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const collections = [
  {
    title: "Oversized T-Shirts",
    image: "/images/collections/oversized.jpg",
    link: "/products?category=T-Shirts&collection=Oversized",
  },
  {
    title: "Premium Hoodies",
    image: "/images/collections/hoodie.jpg",
    link: "/products?category=Hoodies",
  },
  {
    title: "Streetwear",
    image: "/images/collections/streetwear.jpg",
    link: "/products?collection=Streetwear",
  },
  {
    title: "New Arrivals",
    image: "/images/collections/new-arrivals.jpg",
    link: "/products?new_arrival=1",
  },
];

export default function Collections() {
  return (
    <section className="bg-[#0A0A0A] py-32">
      <div className="max-w-7xl mx-auto px-8 lg:px-10">
        <h2 className="text-white text-5xl font-black text-center mb-20 tracking-wide">
          SHOP BY COLLECTION
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {collections.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.4 }}
              className="relative overflow-hidden rounded-[35px] group"
            >
              <Image
                src={item.image}
                alt={item.title}
                width={900}
                height={900}
                className="w-full h-[450px] object-cover transition duration-700 group-hover:scale-110"
                priority={index < 2}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              <div className="absolute bottom-10 left-10 z-10">
                <h3 className="text-white text-4xl font-bold mb-5">
                  {item.title}
                </h3>

                <Link
                  href={item.link}
                  className="inline-flex items-center justify-center px-8 py-3 rounded-full border border-white text-white font-semibold hover:bg-white hover:text-black transition-all duration-300"
                >
                  Explore
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}