"use client";

import { useEffect, useState } from "react";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

interface Analytics {
  month: string;
  orders: number;
  revenue: number;
}

export default function AnalyticsChart() {
  const [data, setData] = useState<Analytics[]>([]);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/dashboard/analytics"
      );

      const result = await response.json();

      setData(result);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-[#111] rounded-3xl p-8 mt-10">

      <h2 className="text-3xl font-bold text-white mb-8">
        Sales Analytics
      </h2>

      <div className="w-full h-[420px]">

        <ResponsiveContainer width="100%" height="100%">

          <BarChart data={data}>

            <CartesianGrid strokeDasharray="3 3" stroke="#333" />

            <XAxis
              dataKey="month"
              stroke="#999"
            />

            <YAxis stroke="#999" />

            <Tooltip />

            <Legend />

            <Bar
              dataKey="orders"
              name="Orders"
              fill="#8B5CF6"
              radius={[8, 8, 0, 0]}
            />

            <Bar
              dataKey="revenue"
              name="Revenue"
              fill="#10B981"
              radius={[8, 8, 0, 0]}
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}