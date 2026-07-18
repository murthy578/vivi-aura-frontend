"use client";

import LoginForm from "@/components/Admin/LoginForm";

export default function AdminLoginPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0A] flex items-center justify-center px-6">

      <div className="w-full max-w-md">

        <div className="text-center mb-10">

          <h1 className="text-5xl font-black text-white">
            ADMIN PANEL
          </h1>

          <p className="text-gray-400 mt-4">
            Login to manage VIVI-AURA
          </p>

        </div>

        <LoginForm />

      </div>

    </main>
  );
}