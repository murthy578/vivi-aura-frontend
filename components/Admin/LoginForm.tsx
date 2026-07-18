"use client";

import { useState } from "react";

export default function LoginForm() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    alert("Admin Login (Firebase will be connected later)");
  };

  return (
    <form
      onSubmit={handleLogin}
      className="bg-[#111] rounded-3xl p-10"
    >

      <div className="mb-6">

        <label className="block text-white mb-2">
          Email
        </label>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-[#1A1A1A] text-white rounded-xl p-4 outline-none"
          placeholder="admin@viviaura.com"
        />

      </div>

      <div className="mb-8">

        <label className="block text-white mb-2">
          Password
        </label>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-[#1A1A1A] text-white rounded-xl p-4 outline-none"
          placeholder="••••••••"
        />

      </div>

      <button
        type="submit"
        className="w-full bg-white text-black py-4 rounded-full font-bold hover:bg-gray-200 transition"
      >
        LOGIN
      </button>

    </form>
  );
}