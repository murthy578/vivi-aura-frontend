"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

export default function RegisterPage() {
  const router = useRouter();

  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("Male");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        "http://localhost:5000/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fullname,
            email,
            phone,
            gender,
            password,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Registration Failed");
        setLoading(false);
        return;
      }

      localStorage.setItem("token", data.token);

      alert("Registration Successful!");

      router.push("/profile");
    } catch (err) {
      console.error(err);
      alert("Server Error");
    }

    setLoading(false);
  };

  return (
    <>
      <Navbar />

      <main className="bg-[#0A0A0A] min-h-screen pt-40 pb-20">
        <div className="max-w-lg mx-auto">
          <div className="bg-[#111] rounded-3xl shadow-2xl p-10">

            <h1 className="text-5xl font-black text-white mb-2">
              Register
            </h1>

            <p className="text-gray-400 mb-10">
              Create your VIVI-AURA account
            </p>

            <form
              onSubmit={handleRegister}
              className="space-y-6"
            >

              {/* Full Name */}

              <div>
                <label className="block text-gray-300 mb-2">
                  Full Name
                </label>

                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                  required
                  className="w-full bg-[#1A1A1A] border border-gray-700 rounded-xl px-5 py-4 text-white outline-none focus:border-white"
                />
              </div>

              {/* Email */}

              <div>
                <label className="block text-gray-300 mb-2">
                  Email
                </label>

                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-[#1A1A1A] border border-gray-700 rounded-xl px-5 py-4 text-white outline-none focus:border-white"
                />
              </div>

              {/* Phone */}

              <div>
                <label className="block text-gray-300 mb-2">
                  Mobile Number
                </label>

                <input
                  type="tel"
                  placeholder="+91 9876543210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#1A1A1A] border border-gray-700 rounded-xl px-5 py-4 text-white outline-none focus:border-white"
                />
              </div>

              {/* Gender */}

              <div>
                <label className="block text-gray-300 mb-2">
                  Gender
                </label>

                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full bg-[#1A1A1A] border border-gray-700 rounded-xl px-5 py-4 text-white outline-none focus:border-white"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Password */}

              <div>
                <label className="block text-gray-300 mb-2">
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

              {/* Confirm Password */}

              <div>
                <label className="block text-gray-300 mb-2">
                  Confirm Password
                </label>

                <input
                  type="password"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full bg-[#1A1A1A] border border-gray-700 rounded-xl px-5 py-4 text-white outline-none focus:border-white"
                />
              </div>

              {/* Register Button */}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-white text-black rounded-xl py-4 font-bold text-lg hover:bg-gray-200 transition disabled:opacity-50"
              >
                {loading ? "Creating Account..." : "Create Account"}
              </button>

            </form>

            {/* Login Link */}

            <div className="text-center mt-8">
              <span className="text-gray-400">
                Already have an account?
              </span>

              <Link
                href="/login"
                className="ml-2 text-white font-bold hover:text-gray-300 transition"
              >
                Login
              </Link>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}