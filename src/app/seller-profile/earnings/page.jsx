"use client";
import React, { useEffect, useState } from "react";
import Profile from "@/Components/ProfileCard/ProfileCard";
import { FaArrowUp, FaArrowDown, FaMoneyBillAlt } from "react-icons/fa";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useDispatch, useSelector } from "react-redux";
import { fetchSellerMonthlyStats } from "@/reducers/Order/orderSlice";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const Earnings = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { sellerMonthlyStats, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    if (user?.userId) {
      dispatch(fetchSellerMonthlyStats(user.userId));
    }
  }, [dispatch, user?.userId]);

  const stats = sellerMonthlyStats || {};
  const monthlyStats = Array.isArray(stats.monthly_stats) ? stats.monthly_stats : [];
  const yearlyStats = Array.isArray(stats.yearly_stats) ? stats.yearly_stats : [];

  const currentMonthRevenue = stats.current_month_revenue || 0;
  const currentYearRevenue = stats.current_year_revenue || 0;

  const labels = monthlyStats.map(stat => `${stat.month}-${stat.year}`);
  const earningsDataPoints = monthlyStats.map(stat => stat.total_revenue);

  const lastMonthStats = monthlyStats.length > 0 ? monthlyStats[monthlyStats.length - 1] : {};
  const prevMonthStats = monthlyStats.length > 1 ? monthlyStats[monthlyStats.length - 2] : {};

  const lastYearStats = yearlyStats.length > 0 ? yearlyStats[yearlyStats.length - 1] : {};
  const prevYearStats = yearlyStats.length > 1 ? yearlyStats[yearlyStats.length - 2] : {};

  const calculateGrowth = (current, previous) => {
    if (previous === 0 && current > 0) return 100;
    if (previous === 0) return 0;
    return ((current - previous) / previous) * 100;
  };

  const monthlyGrowth = calculateGrowth(currentMonthRevenue, prevMonthStats.total_revenue || 0);
  const yearlyGrowth = calculateGrowth(currentYearRevenue, prevYearStats.total_revenue || 0);

  const salesBreakdown = lastMonthStats.sales_breakdown || {
    Fruits: 0,
    Vegetables: 0,
    Grains: 0,
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: "Months",
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Revenue ($)",
        },
      },
    },
  };
  
  const recentTransactions = lastMonthStats.recent_transactions || [];

  const earningsData = {
    labels,
    datasets: [
      {
        label: "Earnings Over Time",
        data: earningsDataPoints,
        borderColor: "rgba(72, 217, 157, 1)",
        backgroundColor: "rgba(72, 217, 157, 0.2)",
        tension: 0.4,
      },
    ],
  };

  if (loading) return <p>Loading earnings data...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div
      className="relative h-screen overflow-auto p-4 md:px-8 lg:px-6 xl:px-8 2xl:px-12 py-4 md:py-5 lg:py-7 xl:py-10 2xl:py-12"
      style={{
        backgroundImage:
          "url('https://png.pngtree.com/thumb_back/fh260/background/20241115/pngtree-happy-vietnamese-farmers-planting-rice-paddy-in-lush-green-field-image_16603887.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative z-10">
        <Profile />
        <div className="py-8 px-6 bg-gradient-to-r from-green-700 via-green-600 to-emerald-500 text-white rounded-3xl shadow-lg my-4">
          <h2 className="text-3xl font-extrabold mb-2">Earnings Overview</h2>
          <p className="text-lg font-medium">
            See how your earnings and sales are growing.
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          <div className="bg-gradient-to-br from-emerald-500 to-green-700 px-6 py-8 rounded-3xl hover:scale-105 shadow-2xl transition-transform">
            <FaMoneyBillAlt className="text-4xl text-white mb-3" />
            <h4 className="text-2xl font-semibold text-white">
              Monthly Earnings
            </h4>
            <p className="text-3xl mt-3 font-bold text-white">${currentMonthRevenue.toLocaleString()}</p>
            <div className="flex items-center mt-4 text-white">
              {monthlyGrowth >= 0 ? <FaArrowUp className="mr-2" /> : <FaArrowDown className="mr-2" />}
              <span>{monthlyGrowth.toFixed(2)}% {monthlyGrowth >= 0 ? "Increase" : "Decrease"}</span>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-700 to-emerald-500 px-6 py-8 rounded-3xl hover:scale-105 shadow-2xl transition-transform">
            <FaMoneyBillAlt className="text-4xl text-white mb-3" />
            <h4 className="text-2xl font-semibold text-white">
              Yearly Earnings
            </h4>
            <p className="text-3xl mt-3 font-bold text-white">${currentYearRevenue.toLocaleString()}</p>
            <div className="flex items-center mt-4 text-white">
              {yearlyGrowth >= 0 ? <FaArrowUp className="mr-2" /> : <FaArrowDown className="mr-2" />}
              <span>{yearlyGrowth.toFixed(2)}% {yearlyGrowth >= 0 ? "Increase" : "Decrease"}</span>
            </div>
          </div>

          <div className="bg-gradient-to-br from-emerald-500 to-green-700 px-6 py-8 rounded-3xl hover:scale-105 shadow-2xl transition-transform">
  <FaMoneyBillAlt className="text-4xl text-white mb-3" />
  <h4 className="text-2xl font-semibold text-white">
    Completed Orders
  </h4>
  <p className="text-3xl mt-3 font-bold text-white">
    {lastMonthStats.completed_orders || 0}
  </p>
</div>

        </div>

        <div className="mt-10 bg-white p-8 rounded-3xl shadow-lg">
          <h3 className="text-2xl font-semibold text-green-800 mb-6">
            Earnings Over Time
          </h3>
          <Line data={earningsData} options={options} />

        </div>
      </div>
    </div>
  );
};

export default Earnings;
