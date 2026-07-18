"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";
import { useEffect, useState } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

interface Sale {
  month: number;
  revenue: number;
}

const months = [
  "",
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export default function SalesChart() {
  const [sales, setSales] = useState<Sale[]>([]);

  useEffect(() => {
    fetchSales();
  }, []);

  const fetchSales = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/dashboard/monthly-sales"
      );

      const data = await response.json();

      setSales(data);
    } catch (error) {
      console.error(error);
    }
  };

  const labels = sales.map((item) => months[item.month]);

  const values = sales.map((item) => Number(item.revenue));

  const data = {
    labels,
    datasets: [
      {
        label: "Revenue",
        data: values,
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="bg-[#111] rounded-3xl p-6 mt-8">

      <h2 className="text-2xl font-bold text-white mb-6">
        Sales Overview
      </h2>

      <Line data={data} />

    </div>
  );
}