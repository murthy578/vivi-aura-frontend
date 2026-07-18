import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import "./globals.css";

import { WishlistProvider } from "@/context/WishlistContext";
import { CartProvider } from "@/context/CartContext";
import { CheckoutProvider } from "@/context/CheckoutContext";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/context/AuthContext";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  variable: "--font-heading",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "VIVI-AURA",
  description: "Luxury Streetwear",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} ${inter.variable}`}
      >
        <AuthProvider>
  <CartProvider>
    <WishlistProvider>
      <CheckoutProvider>
        {children}
      </CheckoutProvider>
    </WishlistProvider>
  </CartProvider>
</AuthProvider>

<Toaster
  position="top-right"
  toastOptions={{
    style: {
      background: "#111",
      color: "#fff",
      border: "1px solid #333",
    },
  }}
/>
      </body>
    </html>
  );
}