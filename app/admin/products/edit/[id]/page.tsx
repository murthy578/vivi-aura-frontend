"use client";

import { useParams } from "next/navigation";

import AdminNavbar from "@/components/Admin/AdminNavbar";
import AdminSidebar from "@/components/Admin/AdminSidebar";
import ProductForm from "@/components/Admin/ProductForm";

export default function EditProductPage() {
  const params = useParams();

  return (
    <main className="min-h-screen bg-[#0A0A0A]">

      <AdminNavbar />

      <div className="flex">

        <AdminSidebar />

        <div className="flex-1 ml-72 pt-28 p-10">

          <h1 className="text-5xl font-black text-white">
            Edit Product
          </h1>

          <p className="text-gray-400 mt-3 mb-10">
            Product ID : {params.id}
          </p>

          <ProductForm />

        </div>

      </div>

    </main>
  );
}