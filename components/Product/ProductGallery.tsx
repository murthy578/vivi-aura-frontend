"use client";

import { useState } from "react";
import Image from "next/image";
import { HiHeart, HiOutlineHeart } from "react-icons/hi";
import { useWishlist } from "@/context/WishlistContext";

interface ProductGalleryProps {
  id: number;
  images: string[];
  name: string;
}

export default function ProductGallery({
  id,
  images,
  name,
}: ProductGalleryProps) {

  const [selectedImage, setSelectedImage] = useState(images[0]);

  const [liked, setLiked] = useState(false);

  const { toggleWishlist } = useWishlist();

  return (
    <div className="flex gap-6">

      {/* Thumbnails */}

      <div className="flex flex-col gap-4">

        {images.map((img, index) => (

          <button
            key={index}
            onClick={() => setSelectedImage(img)}
            className={`rounded-2xl overflow-hidden border-2 transition ${
              selectedImage === img
                ? "border-white"
                : "border-transparent"
            }`}
          >

            <Image
              src={img}
              alt={name}
              width={90}
              height={110}
              className="rounded-xl object-cover"
            />

          </button>

        ))}

      </div>

      {/* Main Image */}

      <div className="relative flex-1 overflow-hidden rounded-3xl">

        {/* NEW Badge */}

        <span className="absolute top-5 left-5 bg-black text-white px-5 py-2 rounded-full z-20">
          NEW
        </span>

        {/* Wishlist */}

        <button
          onClick={() => {
            setLiked(!liked);
            toggleWishlist(id);
          }}
          className="absolute top-5 right-5 bg-white rounded-full p-3 shadow-lg z-20 hover:scale-110 transition"
        >

          {liked ? (
            <HiHeart
              size={24}
              className="text-red-500"
            />
          ) : (
            <HiOutlineHeart
              size={24}
              className="text-black"
            />
          )}

        </button>

        <Image
          src={selectedImage}
          alt={name}
          width={700}
          height={850}
          priority
          className="rounded-3xl w-full object-cover hover:scale-105 transition duration-500"
        />

      </div>

    </div>
  );
}