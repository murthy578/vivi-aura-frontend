"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

export interface CartItem {
  id: number;
  product_name: string;
  image: string;
  price: number;
  size: string;
  quantity: number;
}
import { useAuth } from "@/context/AuthContext";
interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => Promise<void>;
  removeFromCart: (id: number, size: string) => Promise<void>;
  increaseQty: (id: number, size: string) => Promise<void>;
  decreaseQty: (id: number, size: string) => Promise<void>;
  clearCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({
  children,
}: {
  children: ReactNode;
}) {

  const [cart, setCart] = useState<CartItem[]>([]);



const { token } = useAuth();
useEffect(() => {
  if (token) {
    loadCart();
  }
}, [token]);

  // =========================
  // Load Cart
  // =========================

  const loadCart = async () => {

  if (!token) {

    const saved = localStorage.getItem("cart");

    if (saved) {
      setCart(JSON.parse(saved));
    }
useEffect(() => {
  console.log("CartProvider Mounted");
  loadCart();
}, []);
    return;
  }

  try {

    const res = await fetch(
      "http://localhost:5000/api/cart",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.ok) {

      localStorage.removeItem("token");

      const saved = localStorage.getItem("cart");

      if (saved) {
        setCart(JSON.parse(saved));
      } else {
        setCart([]);
      }

      return;
    }

    const data = await res.json();
    console.log("Cart API Response:", data);

    if (Array.isArray(data)) {
      setCart(data);
    }

  } catch (err) {

    console.error(err);

    const saved = localStorage.getItem("cart");

    if (saved) {
      setCart(JSON.parse(saved));
    }

  }

};

  // =========================
  // Add To Cart
  // =========================

  const addToCart = async (
    item: CartItem
  ) => {

    if (token) {

      try {

        await fetch(
  
          "http://localhost:5000/api/cart",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
              Authorization:
                `Bearer ${token}`,
            },
            body: JSON.stringify({
              product_id: item.id,
              quantity: item.quantity,
              size: item.size,
            }),
          }
        );
console.log("Product added");
await loadCart();
        await loadCart();

        return;

      } catch (err) {
        console.error(err);
      }

    }

    setCart((prev) => {

      const existing = prev.find(
        (p) =>
          p.id === item.id &&
          p.size === item.size
      );

      if (existing) {

        return prev.map((p) =>
          p.id === item.id &&
          p.size === item.size
            ? {
                ...p,
                quantity:
                  p.quantity +
                  item.quantity,
              }
            : p
        );

      }

      return [...prev, item];

    });

  };
    // =========================
  // Increase Quantity
  // =========================

  const increaseQty = async (
    id: number,
    size: string
  ) => {

    if (token) {

      const item = cart.find(
        (p) =>
          p.id === id &&
          p.size === size
      );

      if (!item) return;

      try {

        await fetch(
          `http://localhost:5000/api/cart/${item.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type":
                "application/json",
              Authorization:
                `Bearer ${token}`,
            },
            body: JSON.stringify({
              quantity:
                item.quantity + 1,
            }),
          }
        );

        await loadCart();

        return;

      } catch (err) {
        console.error(err);
      }

    }

    setCart((prev) =>
      prev.map((item) =>
        item.id === id &&
        item.size === size
          ? {
              ...item,
              quantity:
                item.quantity + 1,
            }
          : item
      )
    );

  };

  // =========================
  // Decrease Quantity
  // =========================

  const decreaseQty = async (
    id: number,
    size: string
  ) => {

    if (token) {

      const item = cart.find(
        (p) =>
          p.id === id &&
          p.size === size
      );

      if (!item) return;

      if (item.quantity <= 1) {
        await removeFromCart(id, size);
        return;
      }

      try {

        await fetch(
          `http://localhost:5000/api/cart/${item.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type":
                "application/json",
              Authorization:
                `Bearer ${token}`,
            },
            body: JSON.stringify({
              quantity:
                item.quantity - 1,
            }),
          }
        );

        await loadCart();

        return;

      } catch (err) {
        console.error(err);
      }

    }

    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id &&
          item.size === size
            ? {
                ...item,
                quantity:
                  item.quantity - 1,
              }
            : item
        )
        .filter(
          (item) =>
            item.quantity > 0
        )
    );

  };

  // =========================
  // Remove Item
  // =========================

  const removeFromCart = async (
    id: number,
    size: string
  ) => {

    if (token) {

      const item = cart.find(
        (p) =>
          p.id === id &&
          p.size === size
      );

      if (!item) return;

      try {

        await fetch(
          `http://localhost:5000/api/cart/${item.id}`,
          {
            method: "DELETE",
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

        await loadCart();

        return;

      } catch (err) {
        console.error(err);
      }

    }

    setCart((prev) =>
      prev.filter(
        (item) =>
          !(
            item.id === id &&
            item.size === size
          )
      )
    );

  };
    // =========================
  // Clear Cart
  // =========================

  const clearCart = async () => {

    if (token) {

      try {

        await fetch(
          "http://localhost:5000/api/cart",
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setCart([]);

        return;

      } catch (err) {
        console.error(err);
      }

    }

    setCart([]);

    localStorage.removeItem("cart");

  };

  // =========================
  // Provider
  // =========================

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// =========================
// useCart Hook
// =========================

export function useCart() {

  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used inside CartProvider"
    );
  }

  return context;
}