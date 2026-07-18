"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import { useAuth } from "@/context/AuthContext";

interface WishlistContextType {
  wishlist: number[];
  toggleWishlist: (productId: number) => Promise<void>;
}

const WishlistContext = createContext<WishlistContextType | null>(null);

export function WishlistProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [wishlist, setWishlist] = useState<number[]>([]);

  const { user, isLoggedIn } = useAuth();

  // Load wishlist after login
  useEffect(() => {
    if (!isLoggedIn || !user) {
      setWishlist([]);
      return;
    }

    const fetchWishlist = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/wishlist/${user.id}`
        );

        const data = await res.json();

        const ids = data.map((item: any) => item.product_id);

        setWishlist(ids);
      } catch (error) {
        console.error("Wishlist Load Error:", error);
      }
    };

    fetchWishlist();
  }, [isLoggedIn, user]);

  // Add / Remove Wishlist
  const toggleWishlist = async (productId: number) => {
    if (!user) return;

    try {
      if (wishlist.includes(productId)) {
        const res = await fetch(
          `http://localhost:5000/api/wishlist/${user.id}/${productId}`,
          {
            method: "DELETE",
          }
        );

        if (res.ok) {
          setWishlist((prev) =>
            prev.filter((id) => id !== productId)
          );
        }
      } else {
        const res = await fetch(
          "http://localhost:5000/api/wishlist",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user_id: user.id,
              product_id: productId,
            }),
          }
        );

        if (res.ok) {
          setWishlist((prev) => [...prev, productId]);
        }
      }
    } catch (error) {
      console.error("Wishlist Error:", error);
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        toggleWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);

  if (!context) {
    throw new Error(
      "useWishlist must be used inside WishlistProvider"
    );
  }

  return context;
}