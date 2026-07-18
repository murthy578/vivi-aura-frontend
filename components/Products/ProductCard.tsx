"use client";

import { useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Heart, ShoppingBag } from "lucide-react";

import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useAuth } from "@/context/AuthContext";

import SizeDrawer from "./SizeDrawer";
import LoginModal from "@/components/LoginModal";

import toast from "react-hot-toast";

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

interface Size {
  id: number;
  size: string;
  stock: number;
}

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const router = useRouter();

  const { isLoggedIn } = useAuth();

  const { addToCart } = useCart();

  const { wishlist, toggleWishlist } = useWishlist();

  const isWishlisted = wishlist.includes(product.id);

  const [drawerOpen, setDrawerOpen] = useState(false);

  const [sizes, setSizes] = useState<Size[]>([]);

  const [loadingSizes, setLoadingSizes] = useState(false);

  const [selectedSize, setSelectedSize] = useState("");

  const [showLoginModal, setShowLoginModal] = useState(false);

  // ==========================
  // Open Size Drawer
  // ==========================

  const openSizeDrawer = async () => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }

    setDrawerOpen(true);
    setLoadingSizes(true);

    try {
      const res = await fetch(
        `http://localhost:5000/api/product-sizes/${product.id}`
      );

      const data = await res.json();

      setSizes(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingSizes(false);
    }
  };

  // ==========================
  // Add To Cart
  // ==========================

  const handleAddToCart = async () => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }

    if (!selectedSize) {
      toast.error("Please select a size");
      return;
    }

    await addToCart({
      id: product.id,
      product_name: product.product_name,
      image: product.image,
      price: product.price,
      quantity: 1,
      size: selectedSize,
    });

    toast.success(`${product.product_name} added to bag`);

    setDrawerOpen(false);
    setSelectedSize("");
  };
    return (
    <>
      <div className="group bg-[#111111] rounded-2xl md:rounded-3xl overflow-hidden border border-[#222] hover:border-white transition-all duration-300 hover:-translate-y-2 h-full flex flex-col">

        {/* Product Image */}
        <div className="relative aspect-[3/4] md:aspect-[4/5] overflow-hidden">

          {/* Wishlist */}
          <button
            onClick={() => {
              if (!isLoggedIn) {
                setShowLoginModal(true);
                return;
              }

              toggleWishlist(product.id);
            }}
            className="absolute top-2 right-2 md:top-4 md:right-4 z-20 w-9 h-9 md:w-11 md:h-11 rounded-full bg-white/90 backdrop-blur flex items-center justify-center hover:scale-110 transition"
          >
            <Heart
              size={18}
              className={
                isWishlisted
                  ? "text-red-500 fill-red-500"
                  : "text-black"
              }
            />
          </button>

          {/* New Badge */}
          {product.new_arrival === 1 && (
            <div className="absolute top-2 left-2 md:top-4 md:left-4 bg-white text-black px-2 md:px-3 py-1 rounded-full text-[10px] md:text-xs font-bold z-20">
              NEW
            </div>
          )}

          {/* Sale Badge */}
          {product.bestseller === 1 && (
            <div className="absolute bottom-2 left-2 md:bottom-4 md:left-4 bg-red-600 text-white px-2 md:px-3 py-1 rounded-full text-[10px] md:text-xs font-bold z-20">
              SALE
            </div>
          )}

          <Link href={`/product/${product.id}`}>
            <Image
              src={`http://localhost:5000/uploads/${product.image}`}
              alt={product.product_name}
              fill
              className="object-cover group-hover:scale-110 transition duration-500"
            />
          </Link>

        </div>

        {/* Details */}
        <div className="p-3 md:p-6 flex flex-col flex-1">

          <p className="text-[10px] md:text-xs uppercase tracking-[2px] md:tracking-[3px] text-gray-500">
            {product.category_name}
          </p>

          <Link href={`/product/${product.id}`}>
            <h2 className="text-white text-sm md:text-xl font-bold mt-2 md:mt-3 line-clamp-2 hover:text-gray-300 transition min-h-[42px] md:min-h-[60px]">
              {product.product_name}
            </h2>
          </Link>

          <div className="flex items-center gap-2 md:gap-3 mt-3 md:mt-5">

            <span className="text-lg md:text-2xl font-black text-white">
              ₹{product.price}
            </span>

            {product.mrp > product.price && (
              <span className="text-xs md:text-base text-gray-500 line-through">
                ₹{product.mrp}
              </span>
            )}

          </div>

          {product.mrp > product.price && (
            <span className="text-green-500 text-xs md:text-sm mt-1">
              {Math.round(
                ((product.mrp - product.price) / product.mrp) * 100
              )}
              % OFF
            </span>
          )}

          <button
            onClick={openSizeDrawer}
            className="mt-auto w-full flex items-center justify-center gap-2 bg-white text-black py-2.5 md:py-3 rounded-xl md:rounded-2xl text-sm md:text-base font-bold hover:bg-gray-200 transition mt-5"
          >
            <ShoppingBag size={18} />
            Add to Cart
          </button>

        </div>

      </div>

      <SizeDrawer
        open={drawerOpen}
        onClose={() => {
          setDrawerOpen(false);
          setSelectedSize("");
        }}
        sizes={sizes}
        loading={loadingSizes}
        selectedSize={selectedSize}
        onSelectSize={setSelectedSize}
        onAddToCart={handleAddToCart}
      />

      <LoginModal
        open={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </>
  );
}