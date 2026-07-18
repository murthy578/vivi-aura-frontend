"use client";

import Link from "next/link";

const menus = [
  { name: "Dashboard", href: "/admin/dashboard" },
  { name: "Products", href: "/admin/products" },
  { name: "Categories", href: "/admin/categories" },
  { name: "Inventory", href: "/admin/inventory" },
  { name: "Orders", href: "/admin/orders" },
  { name: "Customers", href: "/admin/customers" },
  { name: "Coupons", href: "/admin/coupons" },
  { name: "Analytics", href: "/admin/analytics" },
  { name: "Settings", href: "/admin/settings" },
];

export default function AdminSidebar() {
  return (
    <aside className="fixed top-20 left-0 w-72 h-[calc(100vh-80px)] bg-[#111] border-r border-gray-800 p-6">

      <nav className="space-y-3">

        {menus.map((menu) => (
          <Link
            key={menu.href}
            href={menu.href}
            className="block px-5 py-4 rounded-xl text-gray-300 hover:bg-white hover:text-black transition"
          >
            {menu.name}
          </Link>
        ))}

      </nav>

    </aside>
  );
}