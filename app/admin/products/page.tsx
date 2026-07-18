"use client";

import Link from "next/link";

import AdminNavbar from "@/components/Admin/AdminNavbar";
import AdminSidebar from "@/components/Admin/AdminSidebar";
import ProductTable from "@/components/Admin/ProductTable";

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0A]">

      <AdminNavbar />

      <div className="flex">

        <AdminSidebar />

        <div className="flex-1 ml-72 pt-28 p-10">

          <div className="flex justify-between items-center mb-10">

            <div>

              <h1 className="text-5xl font-black text-white">
                Products
              </h1>

              <p className="text-gray-400 mt-3">
                Manage all your store products.
              </p>

            </div>

            <Link
              href="/admin/products/add"
              className="bg-white text-black px-6 py-4 rounded-xl font-semibold hover:bg-gray-200 transition"
            >
              + Add Product
            </Link>

          </div>

          <ProductTable />

        </div>

      </div>

    </main>
  );
}