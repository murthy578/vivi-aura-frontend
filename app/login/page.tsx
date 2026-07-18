"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Login Failed");
        setLoading(false);
        return;
      }

      login(data.token, data.user);

alert("Login Successful!");

router.push("/profile");
    } catch (error) {
      console.error(error);
      alert("Server Error");
    }

    setLoading(false);
  };

  return (
    <>
      <Navbar />

      <main className="bg-[#0A0A0A] min-h-screen pt-40 pb-20">
        <div className="max-w-md mx-auto">

          <div className="bg-[#111] rounded-3xl p-10 shadow-2xl">

            <h1 className="text-5xl font-black text-white mb-2">
              Login
            </h1>

            <p className="text-gray-400 mb-10">
              Welcome back to VIVI-AURA
            </p>

            <form onSubmit={handleLogin} className="space-y-6">

              {/* Email */}

              <div>
                <label className="text-gray-300 block mb-2">
                  Email
                </label>

                <input
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-[#1A1A1A] border border-gray-700 rounded-xl px-5 py-4 text-white outline-none focus:border-white"
                />
              </div>

              {/* Password */}

              <div>
                <label className="text-gray-300 block mb-2">
                  Password
                </label>

                <input
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-[#1A1A1A] border border-gray-700 rounded-xl px-5 py-4 text-white outline-none focus:border-white"
                />
              </div>

              {/* Login Button */}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-white text-black rounded-xl py-4 font-bold text-lg hover:bg-gray-200 transition disabled:opacity-50"
              >
                {loading ? "Logging in..." : "Login"}
              </button>

            </form>

            <div className="text-center mt-8">

              <span className="text-gray-400">
                Don't have an account?
              </span>

              <Link
                href="/register"
                className="ml-2 text-white font-bold hover:text-gray-300"
              >
                Register
              </Link>

            </div>

          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}