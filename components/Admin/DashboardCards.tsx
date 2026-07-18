"use client";

import { useEffect, useState } from "react";

interface DashboardStats {
  totalProducts: number;
  totalCategories: number;
  featuredProducts: number;
  lowStock: number;
  totalOrders: number;
  revenue: number;
}

export default function DashboardCards() {
  const [stats, setStats] = useState<DashboardStats>({
  totalProducts: 0,
  totalCategories: 0,
  featuredProducts: 0,
  lowStock: 0,
  totalOrders: 0,
  revenue: 0,
});

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/dashboard"
      );

      const data = await response.json();

      setStats(data);
    } catch (error) {
      console.error(error);
    }
  };

  const cards = [
  {
    title: "Products",
    value: stats.totalProducts,
    color: "bg-blue-600",
    icon: "📦",
  },
  {
    title: "Categories",
    value: stats.totalCategories,
    color: "bg-green-600",
    icon: "📂",
  },
  {
    title: "Orders",
    value: stats.totalOrders,
    color: "bg-purple-600",
    icon: "🛒",
  },
  {
    title: "Revenue",
    value: `₹${Number(stats.revenue).toLocaleString()}`,
    color: "bg-emerald-600",
    icon: "💰",
  },
  {
    title: "Featured",
    value: stats.featuredProducts,
    color: "bg-yellow-500",
    icon: "⭐",
  },
  {
    title: "Low Stock",
    value: stats.lowStock,
    color: "bg-red-600",
    icon: "⚠️",
  },
];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

      {cards.map((card) => (
        <div
          key={card.title}
          className={`${card.color} rounded-2xl p-6 shadow-lg`}
        >
          <div className="flex items-center justify-between">
            <span className="text-4xl">
              {card.icon}
            </span>

            <h2 className="text-4xl font-black text-white">
              {card.value}
            </h2>
          </div>

          <p className="mt-6 text-white font-semibold text-lg">
            {card.title}
          </p>
        </div>
      ))}

    </div>
  );
}