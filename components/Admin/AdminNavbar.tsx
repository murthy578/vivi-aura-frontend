"use client";

export default function AdminNavbar() {
  return (
    <header className="fixed top-0 left-0 right-0 h-20 bg-[#111] border-b border-gray-800 flex items-center justify-between px-8 z-50">

      <h1 className="text-white text-3xl font-black">
        VIVI-AURA ADMIN
      </h1>

      <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-xl">
        Logout
      </button>

    </header>
  );
}