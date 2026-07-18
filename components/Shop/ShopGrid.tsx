"use client";

import Image from "next/image";
import { products } from "@/data/products";
import { HiHeart, HiOutlineHeart } from "react-icons/hi";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";

interface Props {
  search: string;
  sort: string;
  category: string;
}

export default function ShopGrid({
  search,
  sort,
  category,
}: Props) {

  const { wishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  let filtered = products.filter((product) => {

    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" ||
      product.category === category;

    return matchesSearch && matchesCategory;

  });

  if (sort === "low") {
    filtered.sort((a, b) => a.price - b.price);
  }

  if (sort === "high") {
    filtered.sort((a, b) => b.price - a.price);
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

      {filtered.length > 0 ? (

        filtered.map((product) => (

          <div
            key={product.id}
            className="bg-[#111] rounded-3xl overflow-hidden group"
          >

            {/* Product Image */}

            <div className="relative">

              <Image
                src={product.images[0]}
                alt={product.name}
                width={500}
                height={600}
                className="w-full h-[380px] object-cover group-hover:scale-105 transition duration-500"
              />

              {/* Wishlist */}

              <button
                onClick={() => toggleWishlist(product.id)}
                className="absolute top-4 right-4 bg-white rounded-full p-3 shadow-lg hover:scale-110 transition"
              >
                {wishlist.includes(product.id) ? (
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

            </div>

            {/* Details */}

            <div className="p-6">

              <h3 className="text-white text-2xl font-semibold">
                {product.name}
              </h3>

              <p className="text-gray-400 mt-2">
                {product.category}
              </p>

              <p className="text-white text-2xl font-bold mt-3">
                ₹{product.price}
              </p>

              <button
                onClick={() =>
                  addToCart({
                    id: product.id,
                    product_name: product.name,
                    image: product.images[0],
                    price: product.price,
                    size: "M",
                    quantity: 1,
                  })
                }
                className="w-full mt-6 bg-white text-black py-4 rounded-full hover:bg-black hover:text-white border transition"
              >
                ADD TO CART
              </button>

            </div>

          </div>

        ))

      ) : (

        <div className="col-span-full text-center py-20">

          <h2 className="text-3xl text-white font-bold">
            No Products Found
          </h2>

          <p className="text-gray-400 mt-3">
            Try another search or category.
          </p>

        </div>

      )}

    </div>
  );
}