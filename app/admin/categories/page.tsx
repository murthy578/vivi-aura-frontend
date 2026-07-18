"use client";

import AdminNavbar from "@/components/Admin/AdminNavbar";
import AdminSidebar from "@/components/Admin/AdminSidebar";
import CategoryForm from "@/components/Admin/CategoryForm";
import CategoryTable from "@/components/Admin/CategoryTable";

export default function CategoriesPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0A]">

      <AdminNavbar />

      <div className="flex">

        <AdminSidebar />

        <div className="flex-1 ml-72 pt-28 p-10">

          <h1 className="text-5xl font-black text-white">
            Categories
          </h1>

          <p className="text-gray-400 mt-3 mb-10">
            Manage your store categories.
          </p>

          <CategoryForm />

          <div className="mt-12">

            <CategoryTable />

          </div>

        </div>

      </div>

    </main>
  );
}