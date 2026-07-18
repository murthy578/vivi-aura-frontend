"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative h-[85vh] sm:h-[90vh] lg:min-h-screen overflow-hidden">

      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/hero-video.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40"></div>

      {/* Glow */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
      w-[350px] h-[350px]
      md:w-[650px] md:h-[650px]
      lg:w-[900px] lg:h-[900px]
      rounded-full bg-white/5 blur-[140px]" />

      {/* Content */}
      <div className="relative z-10 max-w-[1700px] mx-auto h-full px-5 sm:px-8 lg:px-20 flex items-center">

        <motion.div
          initial={{ opacity: 0, x: -70 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9 }}
          className="max-w-3xl"
        >

          {/* Badge */}
          <p className="uppercase tracking-[4px] md:tracking-[10px] text-gray-300 text-xs sm:text-sm mb-5 md:mb-8">
            NEW DROP 2026
          </p>

          {/* Heading */}
          <h1 className="
            text-white
            font-black
            leading-[0.9]
            text-4xl
            sm:text-5xl
            md:text-7xl
            lg:text-8xl
          ">
            PREMIUM
            <br />
            STREETWEAR
          </h1>

          {/* Description */}
          <p className="
            mt-6
            md:mt-10
            text-gray-200
            text-sm
            sm:text-base
            md:text-lg
            leading-7
            md:leading-9
            max-w-xl
          ">
            Designed for confidence.
            <br />
            Crafted for everyday comfort.
            <br />
            Discover luxury oversized essentials from VIVI-AURA.
          </p>

          {/* Buttons */}
          <div className="mt-8 md:mt-12 flex flex-col sm:flex-row gap-4">

            <Link
              href="/products"
              className="
                w-full
                sm:w-auto
                text-center
                px-8
                py-4
                rounded-full
                bg-white
                text-black
                font-semibold
                hover:bg-gray-200
                transition
              "
            >
              SHOP NOW
            </Link>

            <Link
              href="/new-arrivals"
              className="
                w-full
                sm:w-auto
                text-center
                px-8
                py-4
                rounded-full
                border
                border-white
                text-white
                hover:bg-white
                hover:text-black
                transition
              "
            >
              NEW ARRIVALS
            </Link>

          </div>

        </motion.div>

      </div>

    </section>
  );
}