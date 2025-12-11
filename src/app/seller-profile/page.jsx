"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSellerStats,
  fetchSellerMonthlyStats,
  fetchSellerOrders,
} from "@/reducers/Order/orderSlice";
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
  Filler,
} from "chart.js";
import Link from "next/link";
import Layout from "./Layout";
import { ArrowUpRight, ChevronRight } from "lucide-react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// Metric Card Component
const MetricCard = ({ title, value, subtext }) => (
  <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between h-32">
    <div>
      <p className="text-gray-500 text-sm font-medium">{title}</p>
      <h3 className="text-2xl font-bold text-gray-900 mt-2">{value}</h3>
    </div>
    {subtext && <p className="text-xs text-emerald-500 font-medium">{subtext}</p>}
  </div>
);

export default function SellerDashboardPage() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { sellerStats, sellerMonthlyStats, orders } = useSelector((state) => state.orders);

  useEffect(() => {
    if (user?.userId) {
      dispatch(fetchSellerStats(user.userId));
      dispatch(fetchSellerMonthlyStats(user.userId));
      dispatch(fetchSellerOrders(user.userId));
    }
  }, [dispatch, user?.userId]);

  const totalOrders = sellerStats?.TotalOrders || 0;
  const revenue = sellerStats?.Revenue || 0;
  const activeOrders = sellerStats?.ActiveOrders || 0;
  const productsCount = sellerStats?.Products || 0;

  // Chart Data Preparation
  const monthlyStats = Array.isArray(sellerMonthlyStats?.monthly_stats) ? sellerMonthlyStats.monthly_stats : [];
  const recentMonths = monthlyStats.length ? monthlyStats.slice(-6) : [
    { month: "Jan", total_revenue: 1200 },
    { month: "Feb", total_revenue: 1900 },
    { month: "Mar", total_revenue: 3000 },
    { month: "Apr", total_revenue: 5000 },
    { month: "May", total_revenue: 4500 },
    { month: "Jun", total_revenue: 6000 },
  ];

  const chartData = {
    labels: recentMonths.map((s) => s.month),
    datasets: [
      {
        label: "Revenue",
        data: recentMonths.map((s) => s.total_revenue),
        borderColor: "#16a34a",
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, "rgba(16, 163, 127, 0.18)");
          gradient.addColorStop(1, "rgba(16, 163, 127, 0)");
          return gradient;
        },
        tension: 0.3,
        fill: true,
        pointBackgroundColor: "#fff",
        pointBorderColor: "#16a34a",
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#111827",
        padding: 10,
        titleFont: { size: 12 },
        bodyFont: { size: 13 },
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          label: (context) => `KES ${context.parsed.y.toLocaleString()}`,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#6b7280", font: { size: 12 } },
      },
      y: {
        display: false,
        beginAtZero: true,
      },
    },
  };

  // Recent Orders (Top 4)
  const recentOrders = Array.isArray(orders) ? orders.slice(0, 6) : [];

  const getStatusBadge = (status) => {
    const styles = {
      Pending: "bg-yellow-50 text-yellow-700",
      Completed: "bg-emerald-50 text-emerald-700",
      Delivered: "bg-emerald-100 text-emerald-700",
      Cancelled: "bg-red-50 text-red-600",
      Processing: "bg-blue-50 text-blue-600",
    };
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${styles[status] || "bg-gray-100 text-gray-600"}`}>
        {status}
      </span>
    );
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Seller Dashboard</h1>
            <p className="text-sm text-gray-500 mt-1">Overview of store performance and recent activity</p>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/seller-profile/add-product" className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg shadow-sm text-sm">
              + Add Product
            </Link>
            <button className="px-3 py-2 border rounded-lg text-sm">Share Store</button>
            <button className="px-3 py-2 border rounded-lg text-sm">Settings</button>
          </div>
        </div>

        {/* KPI cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard title="Total Earnings" value={`KES ${Number(revenue).toLocaleString()}`} subtext="Last 30 days" />
          <MetricCard title="Pending Payout" value={`KES ${sellerStats?.PendingPayout?.toLocaleString ? sellerStats.PendingPayout.toLocaleString() : "24,000"}`} />
          <MetricCard title="Orders Today" value={activeOrders} />
          <MetricCard title="Products Listed" value={productsCount || 23} />
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Charts & Top Products */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">Sales Overview</h3>
                  <p className="text-xs text-gray-500 mt-1">Revenue trend for the last months</p>
                </div>
                <div className="text-sm text-emerald-600 font-semibold flex items-center gap-1">
                  <ArrowUpRight className="w-4 h-4" /> {sellerStats?.GrowthPercent ? `${sellerStats.GrowthPercent}%` : "+12%"}
                </div>
              </div>

              <div className="mt-4 h-56">
                <Line data={chartData} options={chartOptions} />
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Top Selling Products</h3>
                <Link href="/seller-profile/my-products" className="text-sm text-emerald-600">Manage</Link>
              </div>

              <ul className="space-y-3">
                {(sellerStats?.top_products || [
                  { name: "Maize - 90kg bag", sold: 120 },
                  { name: "Layer Chicks (20)", sold: 85 },
                  { name: "Organic Fertilizer - 50kg", sold: 60 },
                ]).map((p, idx) => (
                  <li key={idx} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-md bg-gray-50 flex items-center justify-center text-sm text-gray-600">Img</div>
                      <div>
                        <div className="font-medium text-gray-900">{p.name}</div>
                        <div className="text-xs text-gray-500">Sold: {p.sold}</div>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">View</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right: Recent Orders & Quick Actions */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-6 py-5 border-b flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">Recent Orders</h3>
                <Link href="/seller-profile/orders" className="text-sm text-emerald-600">View All</Link>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="text-xs text-gray-500 uppercase">
                    <tr>
                      <th className="px-4 py-3">Order</th>
                      <th className="px-4 py-3">Product</th>
                      <th className="px-4 py-3">Buyer</th>
                      <th className="px-4 py-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {recentOrders.length > 0 ? (
                      recentOrders.map((order) => (
                        <tr key={order.id} className="hover:bg-emerald-50/30 transition-colors">
                          <td className="px-4 py-3 font-medium">#{order.id}</td>
                          <td className="px-4 py-3">{order.product_name || "Product A"}</td>
                          <td className="px-4 py-3">{order.user_name || "John Doe"}</td>
                          <td className="px-4 py-3">{getStatusBadge(order.order_status || "Pending")}</td>
                        </tr>
                      ))
                    ) : (
                      [1001, 1002, 1003, 1004].map((id, i) => (
                        <tr key={id} className="hover:bg-emerald-50/30 transition-colors">
                          <td className="px-4 py-3 font-medium">#{id}</td>
                          <td className="px-4 py-3">{["Maize", "Chicken Eggs", "Potatoes", "Fertilizer"][i]}</td>
                          <td className="px-4 py-3">{["John Doe", "Jane Smith", "John Doe", "Sprayer"][i]}</td>
                          <td className="px-4 py-3">{getStatusBadge(["Completed", "Pending", "Pending", "Pending"][i])}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">Quick Actions</h3>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <Link href="/seller-profile/add-product" className="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium text-center transition-colors shadow-sm shadow-emerald-200">
                  Add Product
                </Link>
                <button className="py-2.5 px-3 rounded-xl border border-gray-200 hover:bg-gray-50 text-sm font-medium text-gray-700 transition-colors">
                  Bulk Upload
                </button>
                <button className="py-2.5 px-3 rounded-xl border border-gray-200 hover:bg-gray-50 text-sm font-medium text-gray-700 transition-colors">
                  Payout Request
                </button>
                <button className="py-2.5 px-3 rounded-xl border border-gray-200 hover:bg-gray-50 text-sm font-medium text-gray-700 transition-colors">
                  Promote Listing
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h3 className="font-semibold text-gray-900">Inventory Alerts</h3>
              <ul className="mt-3 text-sm space-y-2">
                <li className="flex justify-between"><span>Maize - 90kg bag</span><span className="text-red-600">Low (6)</span></li>
                <li className="flex justify-between"><span>Layer Chicks</span><span className="text-emerald-600">OK (120)</span></li>
                <li className="flex justify-between"><span>Organic Fertilizer</span><span className="text-yellow-600">Expiring Soon</span></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
