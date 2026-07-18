"use client";

import AdminNavbar from "@/components/Admin/AdminNavbar";
import AdminSidebar from "@/components/Admin/AdminSidebar";
import DashboardCards from "@/components/Admin/DashboardCards";
import RecentProducts from "@/components/Admin/RecentProducts";
import SalesChart from "@/components/Admin/SalesChart";
import RecentOrders from "@/components/Admin/RecentOrders";
import AnalyticsChart from "@/components/Admin/AnalyticsChart";
import TopSellingProducts from "@/components/Admin/TopSellingProducts";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0A]">

      <AdminNavbar />

      <div className="flex">

        <AdminSidebar />

        <div className="flex-1 ml-72 p-10 pt-28">

          <h1 className="text-5xl font-black text-white mb-10">
            Dashboard
          </h1>

          <DashboardCards />
          <RecentProducts />
          <SalesChart />
          <RecentOrders />
          <AnalyticsChart />
          <TopSellingProducts />

        </div>

      </div>

    </main>
  );
}