"use client";

import { useEffect, useState } from "react";

import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import Link from "next/link";

export default function ProfilePage() {

  const [activeTab, setActiveTab] = useState("profile");

  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("Male");
const [orders, setOrders] = useState<any[]>([]);
  useEffect(() => {
    const handleSaveProfile = async () => {
  try {
    const fetchMyOrders = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch(
      "http://localhost:5000/api/orders/my-orders",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch orders");
    }

    const data = await res.json();
    setOrders(data);
  } catch (err) {
    console.error(err);
  }
};
    const token = localStorage.getItem("token");

    const res = await fetch(
      "http://localhost:5000/api/auth/profile",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          fullname,
          email,
          phone,
          gender,
        }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Failed to update profile");
      return;
    }

    // Update localStorage so the UI stays in sync
    const currentUser = JSON.parse(
      localStorage.getItem("user") || "{}"
    );

    const updatedUser = {
      ...currentUser,
      fullname,
      email,
      phone,
      gender,
    };

    localStorage.setItem(
      "user",
      JSON.stringify(updatedUser)
    );

    alert("Profile Updated Successfully!");
  } catch (err) {
    console.error(err);
    alert("Server Error");
  }
};

    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/login";
      return;
    }

    const user = localStorage.getItem("user");

    if (user) {

      const data = JSON.parse(user);

      setFullname(data.fullname || "");
      setEmail(data.email || "");
      setPhone(data.phone || "");
      setGender(data.gender || "Male");

    }

  }, []);
const handleSaveProfile = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch(
      "http://localhost:5000/api/auth/profile",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          fullname,
          email,
          phone,
          gender,
        }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Failed to update profile");
      return;
    }

    const updatedUser = {
      fullname,
      email,
      phone,
      gender,
    };

    localStorage.setItem("user", JSON.stringify(updatedUser));

    alert("Profile Updated Successfully!");
  } catch (err) {
    console.error(err);
    alert("Server Error");
  }
};
const fetchMyOrders = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch(
      "http://localhost:5000/api/orders/my-orders",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch orders");
    }

    const data = await res.json();

    setOrders(data);
  } catch (err) {
    console.error(err);
  }
};
  return (
    <>
      <Navbar />

      <main className="bg-[#0A0A0A] min-h-screen pt-40 pb-20">

        <div className="max-w-7xl mx-auto px-10">

          <h1 className="text-5xl font-black text-white mb-12">
            My Account
          </h1>

          <div className="grid lg:grid-cols-4 gap-10">

            {/* Sidebar */}

            <div className="bg-[#111] rounded-3xl p-8 h-fit sticky top-32">

              <h2 className="text-white text-2xl font-bold mb-8">
                Dashboard
              </h2>

              <div className="space-y-3">

                <button
                  onClick={() => setActiveTab("profile")}
                  className={`w-full text-left p-4 rounded-xl transition ${
                    activeTab === "profile"
                      ? "bg-white text-black"
                      : "text-gray-300 hover:bg-[#222]"
                  }`}
                >
                  👤 My Profile
                </button>

                <button
                  onClick={() => {
  setActiveTab("orders");
  fetchMyOrders();
}}
                  className={`w-full text-left p-4 rounded-xl transition ${
                    activeTab === "orders"
                      ? "bg-white text-black"
                      : "text-gray-300 hover:bg-[#222]"
                  }`}
                >
                  📦 My Orders
                </button>

                <button
                  onClick={() => setActiveTab("wishlist")}
                  className={`w-full text-left p-4 rounded-xl transition ${
                    activeTab === "wishlist"
                      ? "bg-white text-black"
                      : "text-gray-300 hover:bg-[#222]"
                  }`}
                >
                  ❤️ Wishlist
                </button>

                <button
                  onClick={() => setActiveTab("address")}
                  className={`w-full text-left p-4 rounded-xl transition ${
                    activeTab === "address"
                      ? "bg-white text-black"
                      : "text-gray-300 hover:bg-[#222]"
                  }`}
                >
                  📍 Addresses
                </button>

                <button
                  onClick={() => setActiveTab("coupons")}
                  className={`w-full text-left p-4 rounded-xl transition ${
                    activeTab === "coupons"
                      ? "bg-white text-black"
                      : "text-gray-300 hover:bg-[#222]"
                  }`}
                >
                  🎟 Coupons
                </button>

                <button
                  onClick={() => setActiveTab("settings")}
                  className={`w-full text-left p-4 rounded-xl transition ${
                    activeTab === "settings"
                      ? "bg-white text-black"
                      : "text-gray-300 hover:bg-[#222]"
                  }`}
                >
                  ⚙ Settings
                </button>

              </div>

            </div>

            {/* Right Content */}

            <div className="lg:col-span-3 bg-[#111] rounded-3xl p-10 min-h-[650px]">
                          {/* ========================= */}
              {/* Profile */}
              {/* ========================= */}

              {activeTab === "profile" && (
                <div>

                  <h2 className="text-4xl font-black text-white mb-8">
                    👤 My Profile
                  </h2>

                  <div className="grid md:grid-cols-2 gap-8">

                    {/* Full Name */}

                    <div>
                      <label className="block text-gray-400 mb-2">
                        Full Name
                      </label>

                      <input
                        type="text"
                        value={fullname}
                        onChange={(e) => setFullname(e.target.value)}
                        className="w-full bg-[#1A1A1A] border border-gray-700 rounded-xl p-4 text-white outline-none focus:border-white"
                      />
                    </div>

                    {/* Email */}

                    <div>
                      <label className="block text-gray-400 mb-2">
                        Email
                      </label>

                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-[#1A1A1A] border border-gray-700 rounded-xl p-4 text-white outline-none focus:border-white"
                      />
                    </div>

                    {/* Phone */}

                    <div>
                      <label className="block text-gray-400 mb-2">
                        Mobile Number
                      </label>

                      <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-[#1A1A1A] border border-gray-700 rounded-xl p-4 text-white outline-none focus:border-white"
                      />
                    </div>

                    {/* Gender */}

                    <div>
                      <label className="block text-gray-400 mb-2">
                        Gender
                      </label>

                      <select
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        className="w-full bg-[#1A1A1A] border border-gray-700 rounded-xl p-4 text-white outline-none focus:border-white"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                  </div>

                 <button
  onClick={handleSaveProfile}
  className="mt-10 bg-white text-black px-8 py-4 rounded-full font-semibold hover:bg-gray-200 transition"
>
  Save Profile
</button>

                </div>
              )}

              {/* ========================= */}
              {/* Orders */}
              {/* ========================= */}

              {activeTab === "orders" && (
  <div>

    <h2 className="text-4xl font-black text-white mb-8">
      📦 My Orders
    </h2>

    {orders.length === 0 ? (

      <p className="text-gray-400">
        No orders found.
      </p>

    ) : (

      <div className="space-y-6">

        {orders.map((order: any) => (

          <Link
            key={order.id}
            href={`/orders/${order.id}`}
            className="block bg-[#1A1A1A] rounded-2xl p-8 hover:bg-[#1c1c1c] transition duration-300"
          >

            <div className="flex justify-between items-center">

              <div>
                <h3 className="text-2xl font-bold text-white">
                  Order #{order.id}
                </h3>

                <p className="text-gray-400 mt-2">
                  ₹{order.total}
                </p>

                <p className="text-gray-500">
                  {order.payment_method}
                </p>
              </div>

              <div className="text-right">
                <p className="text-green-400 font-bold">
                  {order.order_status}
                </p>

                <p className="text-gray-500">
                  {new Date(order.created_at).toLocaleDateString()}
                </p>

                <p className="text-white mt-2">
                  View Details →
                </p>
              </div>

            </div>

          </Link>

        ))}

      </div>

    )}

  </div>
)}
              {/* ========================= */}
              {/* Wishlist */}
              {/* ========================= */}

              {activeTab === "wishlist" && (
                <div>

                  <h2 className="text-4xl font-black text-white mb-8">
                    ❤️ Wishlist
                  </h2>

                  <div className="bg-[#1A1A1A] rounded-2xl p-8">

                    <p className="text-gray-400 text-lg">
                      Your wishlist items will appear here.
                    </p>

                  </div>

                </div>
              )}

              {/* ========================= */}
              {/* Addresses */}
              {/* ========================= */}

              {activeTab === "address" && (
                <div>

                  <h2 className="text-4xl font-black text-white mb-8">
                    📍 Saved Addresses
                  </h2>

                  <div className="bg-[#1A1A1A] rounded-2xl p-8">

                    <button className="bg-white text-black px-6 py-3 rounded-full font-semibold mb-6">
                      + Add New Address
                    </button>

                    <p className="text-gray-400">
                      No addresses added yet.
                    </p>

                  </div>

                </div>
              )}
                            {/* ========================= */}
              {/* Coupons */}
              {/* ========================= */}

              {activeTab === "coupons" && (
                <div>

                  <h2 className="text-4xl font-black text-white mb-8">
                    🎟 Coupons
                  </h2>

                  <div className="grid md:grid-cols-2 gap-6">

                    <div className="bg-[#1A1A1A] rounded-2xl p-6 border border-dashed border-gray-600">

                      <h3 className="text-white text-2xl font-bold">
                        WELCOME10
                      </h3>

                      <p className="text-gray-400 mt-2">
                        Get 10% OFF on your first order.
                      </p>

                    </div>

                    <div className="bg-[#1A1A1A] rounded-2xl p-6 border border-dashed border-gray-600">

                      <h3 className="text-white text-2xl font-bold">
                        FREESHIP
                      </h3>

                      <p className="text-gray-400 mt-2">
                        Free Shipping on eligible orders.
                      </p>

                    </div>

                  </div>

                </div>
              )}

              {/* ========================= */}
              {/* Settings */}
              {/* ========================= */}

              {activeTab === "settings" && (
                <div>

                  <h2 className="text-4xl font-black text-white mb-8">
                    ⚙ Account Settings
                  </h2>

                  <div className="space-y-6">

                    <button className="w-full bg-[#1A1A1A] text-white p-5 rounded-2xl text-left hover:bg-[#222] transition">
                      Change Password
                    </button>

                    <button className="w-full bg-[#1A1A1A] text-white p-5 rounded-2xl text-left hover:bg-[#222] transition">
                      Notification Preferences
                    </button>

                    <button className="w-full bg-[#1A1A1A] text-white p-5 rounded-2xl text-left hover:bg-[#222] transition">
                      Privacy Settings
                    </button>

                    <button
                      onClick={() => {
                        localStorage.removeItem("token");
                        localStorage.removeItem("user");
                        window.location.href = "/login";
                      }}
                      className="w-full bg-red-600 text-white p-5 rounded-2xl hover:bg-red-700 transition"
                    >
                      Logout
                    </button>

                  </div>

                </div>
              )}

                       </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
