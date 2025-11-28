"use client";
import Profile from "@/Components/ProfileCard/ProfileCard";
import React,  { useEffect, useState }  from "react";
import { Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { saveAs } from "file-saver";
import { FaDownload, FaTractor, FaSeedling, FaChartLine ,FaArrowUp, FaArrowDown } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchSellerStats ,fetchSellerMonthlyStats} from "@/reducers/Order/orderSlice";
ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  ArcElement
);

const AnalyticsPage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { sellerStats, sellerMonthlyStats, loading, error } = useSelector((state) => state.orders);
  
  useEffect(() => {
    if (user?.userId) {
      dispatch(fetchSellerStats(user.userId));
      dispatch(fetchSellerMonthlyStats(user.userId));
    }
  }, [dispatch, user?.userId]);

 
  const monthlyStats = Array.isArray(sellerMonthlyStats?.monthly_stats) ? sellerMonthlyStats.monthly_stats : [];
  const yearlyStats = Array.isArray(sellerStats?.yearly_stats) ? sellerStats.yearly_stats : [];
  const labels = monthlyStats.map((stat) => `${stat.month}-${stat.year}`);
  const currentMonthRevenue = sellerMonthlyStats?.current_month_revenue || 0;
  const currentYearRevenue = sellerMonthlyStats?.current_year_revenue || 0;
  const revenueDataPoints = monthlyStats.map(stat => stat.total_revenue);
  const salesDataPoints = monthlyStats.map(stat => stat.total_orders);
  const revenueGrowthPoints = monthlyStats.map(stat => stat.revenue_growth_percentage);
  const orderGrowthPoints = monthlyStats.map(stat => stat.order_growth_percentage);
  const revenueData = {
    labels,
    datasets: [
      {
        label: "Revenue Growth",
        data: revenueDataPoints,
        borderColor: "#4caf50",
        backgroundColor: "rgba(76, 175, 80, 0.3)",
        tension: 0.4,
      },
    ],
  };

  const salesData = {
    labels,
    datasets: [
      {
        label: "Monthly Sales Trend",
        data: salesDataPoints,
        borderColor: "#ff9800",
        backgroundColor: "rgba(255, 152, 0, 0.3)",
        tension: 0.4,
      },
    ],
  };

  // ** Determine Last Month & Year Growth Stats **
  const lastMonthStats = monthlyStats[monthlyStats.length - 1] || {};
  const lastYearStats = yearlyStats[yearlyStats.length - 1] || {};

  const lastMonthGrowth = lastMonthStats.revenue_growth_percentage || 0;
  const lastYearGrowth = lastYearStats.revenue_growth_percentage || 0;

   const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Revenue ($)",
        },
      },
      x: {
        title: {
          display: true,
          text: "Months",
        },
      },
    },
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  const totalOrders = sellerStats?.TotalOrders || 0;
  const totalRevenue = sellerStats?.Revenue || 0;
  const activeOrders = sellerStats?.ActiveOrders || 0;
  const totalSales = sellerStats?.TotalSales || 0;


  const downloadReport = () => {
    const sellerName = user?.username || "Seller";
  
    const csvContent =
  `AgroMart Sales Report
  =======================
  Welcome, ${sellerName}!
  Thank you for being a valuable part of AgroMart.
  Below is your latest sales report:
  
  SUMMARY
  -------
  Total Orders: ${totalOrders}
  Total Revenue: $${totalRevenue}
  Active Orders: ${activeOrders}
  Total Sales: $${totalSales}
  
  
  Generated on: ${new Date().toLocaleString()}
  Powered by AgroMart
  =======================
  `;
  
    // Create a Blob and trigger file download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
    saveAs(blob, `AgroMart_Sales_Report_${sellerName}.csv`);
  };

  return (
    <div
      className="relative h-screen overflow-auto p-6"
      style={{
        backgroundImage:
          "url('https://png.pngtree.com/thumb_back/fh260/background/20241115/pngtree-happy-vietnamese-farmers-planting-rice-paddy-in-lush-green-field-image_16603887.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-green-600/80 to-green-900/80"></div>

      <div className="relative z-10 text-white">
        <Profile />

        <header className="bg-gradient-to-r from-green-500 to-green-700 shadow-lg mt-8 rounded-3xl p-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold flex items-center space-x-4">
            <FaTractor className="text-4xl" />
            <span>AgroMart Analytics Dashboard</span>
          </h1>
          <button
            onClick={downloadReport}
            className="bg-green-800 text-white px-6 py-3 rounded-full hover:bg-green-900 flex items-center space-x-2"
          >
            <FaDownload />
            <span>Download Report</span>
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {[
            {
              title: "Total Orders",
              value: totalOrders,
              colorFrom: "green-600",
              colorTo: "green-700",
              icon: <FaSeedling />,
              change: "+3% from last month",
            },
            {
              title: "Total Revenue",
              value: `$${totalRevenue.toLocaleString()}`,
              colorFrom: "yellow-600",
              colorTo: "yellow-700",
              icon: <FaTractor />,
              change: "-1% from last month",
            },
            {
              title: "Active Orders",
              value: activeOrders,
              colorFrom: "blue-600",
              colorTo: "blue-700",
              icon: <FaSeedling />,
              change: "+7% from last week",
            },
            {
              title: "Total Sales",
              value: `$${totalSales.toLocaleString()}`,
              colorFrom: "purple-600",
              colorTo: "purple-700",
              icon: <FaChartLine />,
              change: "+5% from last quarter",
            },
          ].map((card, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br from-${card.colorFrom} to-${card.colorTo} px-6 py-8 rounded-3xl shadow-xl hover:scale-105 transform transition duration-300`}
            >
              <div className="flex items-center space-x-3">
                <div className="text-3xl text-white">{card.icon}</div>
                <h2 className="text-xl font-semibold text-white">
                  {card.title}
                </h2>
              </div>
              <p className="text-4xl font-extrabold mt-3 text-white">
                {card.value}
              </p>
              <p className="text-sm text-white mt-1">{card.change}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          <div className="bg-white shadow-md rounded-3xl p-6">
            <h2 className="text-2xl font-bold text-green-800 mb-4">
              Last Month Revenue Growth
              <span className={`ml-2 ${lastMonthGrowth >= 0 ? "text-green-600" : "text-red-600"}`}>
                {lastMonthGrowth >= 0 ? <FaArrowUp /> : <FaArrowDown />} {lastMonthGrowth.toFixed(2)}%
              </span>
            </h2>
            <div className="h-64">
            <Line data={revenueData} options={options} />

            </div>
          </div>

          <div className="bg-white shadow-md rounded-3xl p-6">
            <h2 className="text-2xl font-bold text-green-800 mb-4">
              Last Year Revenue Growth
              <span className={`ml-2 ${lastYearGrowth >= 0 ? "text-green-600" : "text-red-600"}`}>
                {lastYearGrowth >= 0 ? <FaArrowUp /> : <FaArrowDown />} {lastYearGrowth.toFixed(2)}%
              </span>
            </h2>
            <div className="h-64">
            <Line data={salesData} options={options} />
            </div>
          </div>
      </div>
    </div>
    </div>
  );
};

export default AnalyticsPage;
