"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { HiOutlineX } from "react-icons/hi";

interface Props {
  open: boolean;
  onClose: () => void;
}

interface Category {
  id: number;
  name: string;
}

export default function MegaMenu({ open, onClose }: Props) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!open) return;

    const fetchCategories = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/categories");
        const data = await res.json();

        if (Array.isArray(data)) {
          setCategories(data);
        } else if (data.success) {
          setCategories(data.categories || []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [open]);

  if (!open) return null;

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998]"
      />

      {/* Drawer */}
      <aside className="fixed left-0 top-0 h-screen w-[430px] bg-[#111] text-white z-[9999] shadow-2xl">

        {/* Header */}
        <div className="flex justify-between items-center p-8 border-b border-gray-800">
          <h2 className="text-3xl font-black tracking-[5px]">
            VIVI-AURA
          </h2>

          <button onClick={onClose}>
            <HiOutlineX size={32} />
          </button>
        </div>

        {/* Menu */}
        <div className="p-8 overflow-y-auto h-[calc(100vh-90px)]">

          <h3 className="uppercase text-sm tracking-[4px] text-gray-400 mb-6">
            Shop
          </h3>

          <div className="flex flex-col space-y-5">

  <Link
    href="/products"
    onClick={onClose}
    className="block text-xl hover:text-gray-300 transition"
  >
    Shop All
  </Link>

  <Link
    href="/new-arrivals"
    onClick={onClose}
    className="block text-xl hover:text-gray-300 transition"
  >
    New Arrivals
  </Link>

  <Link
    href="/sale"
    onClick={onClose}
    className="block text-xl hover:text-gray-300 transition"
  >
    Sale
  </Link>

</div>
          <div className="mt-12">

  <h3 className="uppercase tracking-[5px] text-sm text-gray-500 mb-8">
    Categories
  </h3>

  <div className="space-y-5">

    {categories.map((category) => (
      <Link
        key={category.id}
        href={`/category/${category.id}`}
        onClick={onClose}
        className="flex items-center justify-between group border-b border-[#222] pb-3"
      >
        <span className="text-lg group-hover:text-white transition">
          {category.name}
        </span>

        <span className="text-gray-600 group-hover:translate-x-2 transition">
          →
        </span>
      </Link>
    ))}

  </div>

</div>
<div className="mt-14 rounded-3xl overflow-hidden bg-[#181818]">

  <img
    src="/images/menu-banner.jpg"
    alt="Featured Collection"
    className="w-full h-52 object-cover"
  />

  </div>

          <div className="mt-12">

            <h3 className="uppercase text-sm tracking-[4px] text-gray-400 mb-6">
              Account
            </h3>

            <div className="flex flex-col space-y-4">

              <Link
  href="/profile"
  onClick={onClose}
  className="block text-lg hover:text-gray-300 transition"
>
  My Profile
</Link>

<Link
  href="/orders"
  onClick={onClose}
  className="block text-lg hover:text-gray-300 transition"
>
  My Orders
</Link>

<Link
  href="/wishlist"
  onClick={onClose}
  className="block text-lg hover:text-gray-300 transition"
>
  Wishlist
</Link>

<Link
  href="/contact"
  onClick={onClose}
  className="block text-lg hover:text-gray-300 transition"
>
  Contact Us
</Link>
            </div>

          </div>

        </div>
      </aside>
      <div className="mt-14 border-t border-[#222] pt-8">

  <h3 className="uppercase tracking-[4px] text-xs text-gray-500 mb-5">
    Follow Us
  </h3>

  <div className="flex gap-5 text-sm">

    <Link href="https://instagram.com" target="_blank">
      Instagram
    </Link>

    <Link href="https://facebook.com" target="_blank">
      Facebook
    </Link>

    <Link href="https://x.com" target="_blank">
      X
    </Link>

  </div>

</div>
    </>
  );
}