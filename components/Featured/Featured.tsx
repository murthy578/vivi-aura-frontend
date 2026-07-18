"use client";

import Image from "next/image";
import { products } from "@/data/products";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

export default function Featured() {
  return (
    <section className="bg-[#050505] py-28">

      <div className="max-w-[1700px] mx-auto px-10">

        <div className="flex justify-between items-center mb-16">

          <h2 className="text-white text-5xl font-bold">
            FEATURED PRODUCTS
          </h2>

          <button className="text-white border border-white rounded-full px-7 py-3 hover:bg-white hover:text-black transition">
            VIEW ALL
          </button>

        </div>

        <Swiper
          modules={[Navigation, Autoplay]}
          navigation
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          spaceBetween={30}
          slidesPerView={4}
          loop={true}
          breakpoints={{
            320: {
              slidesPerView: 1.2,
            },
            768: {
              slidesPerView: 2,
            },
            1200: {
              slidesPerView: 4,
            },
          }}
        >
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <div className="bg-[#111] rounded-[30px] overflow-hidden">

                <Image
                  src={product.images[0]}
                  alt={product.name}
                  width={500}
                  height={600}
                  className="w-full h-[420px] object-cover hover:scale-110 transition duration-700"
                />

                <div className="p-6">

                  <h3 className="text-white text-2xl font-semibold">
                    {product.name}
                  </h3>

                  <p className="text-gray-400 mt-3">
                    ₹{product.price}
                  </p>

                  <button className="mt-6 w-full bg-white text-black py-4 rounded-full hover:bg-black hover:text-white border transition">
                    QUICK VIEW
                  </button>

                </div>

              </div>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>

    </section>
  );
}