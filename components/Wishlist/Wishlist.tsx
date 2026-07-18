"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";

interface WishlistItem {
  id: number;
  product_id: number;
  product_name: string;
  price: number;
  image: string;
}

export default function Wishlist() {
  const { user, isLoggedIn } = useAuth();

  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoggedIn || !user) {
      setWishlist([]);
      setLoading(false);
      return;
    }

    fetchWishlist();
  }, [user, isLoggedIn]);

  const fetchWishlist = async () => {
    if (!user) return;

    try {
      setLoading(true);

      const response = await fetch(
        `http://localhost:5000/api/wishlist/${user.id}`
      );

      const data = await response.json();

      setWishlist(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const removeWishlist = async (productId: number) => {
    if (!user) return;

    try {
      await fetch(
        `http://localhost:5000/api/wishlist/${user.id}/${productId}`,
        {
          method: "DELETE",
        }
      );

      fetchWishlist();
    } catch (error) {
      console.error(error);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="text-center py-24">
        <h2 className="text-white text-4xl font-bold">
          Please login to view your wishlist
        </h2>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="text-white text-xl">
        Loading Wishlist...
      </div>
    );
  }

  if (wishlist.length === 0) {
    return (
      <div className="text-center py-24">
        <h2 className="text-white text-4xl font-bold">
          Your Wishlist is Empty
        </h2>

        <p className="text-gray-400 mt-4">
          Save products you love.
        </p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {wishlist.map((item) => (
        <div
          key={item.id}
          className="bg-[#111] rounded-3xl overflow-hidden"
        >
          <Image
            src={`http://localhost:5000/uploads/${item.image}`}
            alt={item.product_name}
            width={500}
            height={600}
            className="w-full h-[350px] object-cover"
          />

          <div className="p-6">
            <h2 className="text-white text-2xl font-bold">
              {item.product_name}
            </h2>

            <p className="text-green-400 text-2xl mt-2">
              ₹{item.price}
            </p>

            <div className="flex gap-4 mt-6">
              <button className="flex-1 bg-white text-black py-3 rounded-full font-semibold">
                Add To Bag
              </button>

              <button
                onClick={() => removeWishlist(item.product_id)}
                className="flex-1 bg-red-600 text-white py-3 rounded-full"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}