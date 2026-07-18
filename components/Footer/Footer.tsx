"use client";

import Link from "next/link";
import {
  FaInstagram,
  FaFacebookF,
  FaYoutube,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-16 md:pt-24">

      <div className="max-w-[1700px] mx-auto px-5 sm:px-6 md:px-8 lg:px-10">

        {/* Logo */}

        <div className="text-center md:text-left">

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-[3px] md:tracking-[8px]">
            VIVI-AURA
          </h2>

          <p className="mt-5 text-gray-400 text-sm sm:text-base md:text-lg leading-7 max-w-2xl mx-auto md:mx-0">
            Luxury Streetwear for Men, Women & Kids.
            Crafted with premium fabrics for confidence,
            comfort and timeless style.
          </p>

        </div>

        {/* Footer Links */}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 md:gap-12 mt-12 md:mt-20">

          {/* SHOP */}

          <div>

            <h3 className="font-bold text-white text-sm md:text-base mb-4 md:mb-6">
              SHOP
            </h3>

            <ul className="space-y-2 md:space-y-3 text-gray-400 text-sm md:text-base">

              <li>
                <Link
                  href="/new-arrivals"
                  className="hover:text-white transition"
                >
                  New Arrivals
                </Link>
              </li>

              <li>
                <Link
                  href="/best-sellers"
                  className="hover:text-white transition"
                >
                  Best Sellers
                </Link>
              </li>

              <li>
                <Link
                  href="/products?gender=men"
                  className="hover:text-white transition"
                >
                  Men
                </Link>
              </li>

              <li>
                <Link
                  href="/products?gender=women"
                  className="hover:text-white transition"
                >
                  Women
                </Link>
              </li>

              <li>
                <Link
                  href="/products?gender=kids"
                  className="hover:text-white transition"
                >
                  Kids
                </Link>
              </li>

            </ul>

          </div>

          {/* MEN */}

          <div>

            <h3 className="font-bold text-white text-sm md:text-base mb-4 md:mb-6">
              MEN
            </h3>

            <ul className="space-y-2 md:space-y-3 text-gray-400 text-sm md:text-base">

              <li><Link href="/products?gender=men&category=T-Shirts">T-Shirts</Link></li>

              <li><Link href="/products?gender=men&category=Shirts">Shirts</Link></li>

              <li><Link href="/products?gender=men&category=Hoodies">Hoodies</Link></li>

              <li><Link href="/products?gender=men&category=Jackets">Jackets</Link></li>

              <li><Link href="/products?gender=men&category=Pants">Pants</Link></li>

            </ul>

          </div>

          {/* WOMEN */}

          <div>

            <h3 className="font-bold text-white text-sm md:text-base mb-4 md:mb-6">
              WOMEN
            </h3>

            <ul className="space-y-2 md:space-y-3 text-gray-400 text-sm md:text-base">

              <li>T-Shirts</li>

              <li>Shirts</li>

              <li>Hoodies</li>

              <li>Dresses</li>

              <li>Jeans</li>

            </ul>

          </div>

          {/* KIDS */}

          <div>

            <h3 className="font-bold text-white text-sm md:text-base mb-4 md:mb-6">
              KIDS
            </h3>

            <ul className="space-y-2 md:space-y-3 text-gray-400 text-sm md:text-base">

              <li>T-Shirts</li>

              <li>Shirts</li>

              <li>Hoodies</li>

              <li>Co-ord Sets</li>

              <li>Accessories</li>

            </ul>

          </div>

          {/* FABRICS */}

          <div>

            <h3 className="font-bold text-white text-sm md:text-base mb-4 md:mb-6">
              FABRICS
            </h3>

            <ul className="space-y-2 md:space-y-3 text-gray-400 text-sm md:text-base">

              <li>100% Cotton</li>

              <li>240 GSM</li>

              <li>280 GSM</li>

              <li>French Terry</li>

              <li>Premium Blend</li>

            </ul>

          </div>

          {/* SUPPORT */}

          <div>

            <h3 className="font-bold text-white text-sm md:text-base mb-4 md:mb-6">
              SUPPORT
            </h3>

            <ul className="space-y-2 md:space-y-3 text-gray-400 text-sm md:text-base">

              <li><Link href="/contact">Contact Us</Link></li>

              <li><Link href="/track-order">Track Order</Link></li>

              <li><Link href="/shipping">Shipping</Link></li>

              <li><Link href="/returns">Returns</Link></li>

              <li><Link href="/faq">FAQs</Link></li>

            </ul>

          </div>

        </div>
                {/* Trust Section */}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mt-14 md:mt-20 border-t border-gray-800 pt-10 md:pt-12">

          <div className="text-center">
            <div className="text-3xl md:text-4xl mb-3">🚚</div>

            <h4 className="font-semibold text-sm md:text-base">
              FREE SHIPPING
            </h4>

            <p className="text-gray-500 text-xs md:text-sm mt-2">
              On all prepaid orders.
            </p>
          </div>

          <div className="text-center">
            <div className="text-3xl md:text-4xl mb-3">🔄</div>

            <h4 className="font-semibold text-sm md:text-base">
              EASY RETURNS
            </h4>

            <p className="text-gray-500 text-xs md:text-sm mt-2">
              Hassle-free returns.
            </p>
          </div>

          <div className="text-center">
            <div className="text-3xl md:text-4xl mb-3">🔒</div>

            <h4 className="font-semibold text-sm md:text-base">
              SECURE PAYMENT
            </h4>

            <p className="text-gray-500 text-xs md:text-sm mt-2">
              Razorpay Protected.
            </p>
          </div>

          <div className="text-center">
            <div className="text-3xl md:text-4xl mb-3">⭐</div>

            <h4 className="font-semibold text-sm md:text-base">
              PREMIUM QUALITY
            </h4>

            <p className="text-gray-500 text-xs md:text-sm mt-2">
              Premium fabrics & craftsmanship.
            </p>
          </div>

        </div>

        <hr className="border-gray-800 my-8 md:my-12" />

        {/* Social Icons */}

        <div className="flex justify-center items-center gap-5 md:gap-8 text-2xl md:text-3xl flex-wrap">

          <a
            href="#"
            className="w-12 h-12 rounded-full bg-[#181818] flex items-center justify-center hover:bg-pink-600 transition"
          >
            <FaInstagram />
          </a>

          <a
            href="#"
            className="w-12 h-12 rounded-full bg-[#181818] flex items-center justify-center hover:bg-blue-600 transition"
          >
            <FaFacebookF />
          </a>

          <a
            href="#"
            className="w-12 h-12 rounded-full bg-[#181818] flex items-center justify-center hover:bg-red-600 transition"
          >
            <FaYoutube />
          </a>

          <a
            href="#"
            className="w-12 h-12 rounded-full bg-[#181818] flex items-center justify-center hover:bg-gray-700 transition"
          >
            <FaXTwitter />
          </a>

        </div>

        <hr className="border-gray-800 my-8 md:my-10" />

        {/* Bottom */}

        <div className="pb-8 md:pb-10 text-center">

          <p className="text-gray-400 text-xs sm:text-sm">
            © 2026 <span className="font-semibold text-white">VIVI-AURA</span>.
            All Rights Reserved.
          </p>

          <p className="mt-3 text-gray-500 text-xs sm:text-sm leading-6">
            Designed with ❤️ for the next generation of premium streetwear.
          </p>

        </div>

      </div>

    </footer>
  );
}