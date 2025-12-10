"use client";
import React, { useEffect } from 'react';
import { StatCard } from '../../Components/ui/StatCard';
import { Card } from '../../Components/ui/Card';
import { ShoppingBagIcon, SproutIcon, TrendingUpIcon, PackageIcon, AlertCircleIcon, BoxIcon, MessageSquare, DollarSign, Clock } from 'lucide-react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSellerStats, fetchSellerMonthlyStats, fetchSellerOrders } from '@/reducers/Order/orderSlice';
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

export default function Dashboard() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { sellerStats, sellerMonthlyStats, orders, loading } = useSelector((state) => state.orders);

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
  const lowStock = sellerStats?.LowStockAlerts || 0;
  const unreadMessages = sellerStats?.UnreadMessages || 0;

  // Chart Data Preparation
  const monthlyStats = Array.isArray(sellerMonthlyStats?.monthly_stats) ? sellerMonthlyStats.monthly_stats : [];
  // Take last 6 months for dashboard to keep it clean
  const recentMonths = monthlyStats.slice(-6);

  const chartData = {
    labels: recentMonths.map(stat => `${stat.month.slice(0, 3)}`),
    datasets: [
      {
        label: "Revenue",
        data: recentMonths.map(stat => stat.total_revenue),
        borderColor: "#10b981", // emerald-500
        backgroundColor: "rgba(16, 185, 129, 0.1)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#fff',
        titleColor: '#1f2937',
        bodyColor: '#1f2937',
        borderColor: '#e5e7eb',
        borderWidth: 1,
        padding: 10,
        displayColors: false,
        callbacks: {
          label: (context) => `KES ${context.parsed.y.toLocaleString()}`
        }
      }
    },
    scales: {
      x: { grid: { display: false } },
      y: {
        beginAtZero: true,
        grid: { borderDash: [2, 4] },
        ticks: { callback: (value) => `K${value / 1000}k` }
      }
    }
  };

  // Recent Orders (Top 5)
  const recentOrders = Array.isArray(orders) ? orders.slice(0, 5) : [];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Confirmed': return 'bg-blue-100 text-blue-800';
      case 'Shipped': return 'bg-purple-100 text-purple-800';
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-600 mt-1">
            Welcome back, {user?.username || 'Seller'}! Here's your store's performance.
          </p>
        </div>
        <Link href="/seller-profile/settings" className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors shadow-sm">
          Store Settings
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Revenue"
          value={`KES ${revenue.toLocaleString()}`}
          icon={DollarSign}
          className="bg-white"
          trend={null}
        />
        <StatCard
          title="Total Orders"
          value={totalOrders}
          icon={ShoppingBagIcon}
          className="bg-white"
        />
        <StatCard
          title="Active Orders"
          value={activeOrders}
          icon={PackageIcon}
          className="bg-white"
        />
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Unread Messages</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">{unreadMessages}</h3>
          </div>
          <div className={`p-3 rounded-full ${unreadMessages > 0 ? 'bg-red-100 text-red-600' : 'bg-green-50 text-emerald-600'}`}>
            <MessageSquare size={24} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart Area */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-gray-900">Revenue Analytics</h2>
            <select className="text-sm border-gray-200 rounded-md text-gray-500 focus:ring-emerald-500">
              <option>Last 6 Months</option>
            </select>
          </div>
          <div className="h-64">
            {monthlyStats.length > 0 ? (
              <Line data={chartData} options={chartOptions} />
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-gray-400">
                <TrendingUpIcon size={48} className="mb-2 opacity-20" />
                <p>No revenue data available yet.</p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions & Alerts Column */}
        <div className="space-y-6">
          {/* Alerts */}
          <Card>
            <h2 className="text-lg font-bold text-gray-900 mb-4">Store Health</h2>
            <div className="space-y-3">
              {lowStock > 0 ? (
                <div className="flex items-start p-3 bg-red-50 border border-red-100 rounded-lg">
                  <AlertCircleIcon className="w-5 h-5 text-red-600 mr-3 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">Low Stock Alert</p>
                    <p className="text-xs text-gray-600 mt-1">{lowStock} products are running low.</p>
                    <Link href="/seller-profile/inventory" className="text-xs font-semibold text-red-700 hover:underline mt-2 block">
                      Restock Now &rarr;
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="flex items-center p-3 bg-emerald-50 border border-emerald-100 rounded-lg">
                  <BoxIcon className="w-5 h-5 text-emerald-600 mr-3" />
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">Inventory Healthy</p>
                    <p className="text-xs text-green-700">Stock levels are optimal.</p>
                  </div>
                </div>
              )}
            </div>
          </Card>

          {/* Quick Actions */}
          <Card>
            <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <Link href="/seller-profile/add-product" className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors group">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                  <BoxIcon size={18} />
                </div>
                <div className="ml-3">
                  <p className="font-medium text-gray-900 text-sm">Add Product</p>
                  <p className="text-xs text-gray-500">List a new item for sale</p>
                </div>
              </Link>
              <Link href="/seller-profile/orders" className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors group">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <PackageIcon size={18} />
                </div>
                <div className="ml-3">
                  <p className="font-medium text-gray-900 text-sm">Manage Orders</p>
                  <p className="text-xs text-gray-500">View pending shipments</p>
                </div>
              </Link>
            </div>
          </Card>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-lg font-bold text-gray-900">Recent Orders</h2>
          <Link href="/seller-profile/orders" className="text-sm font-medium text-emerald-600 hover:text-emerald-700">
            View All Orders
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-500 uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-medium">Order ID</th>
                <th className="px-6 py-4 font-medium">Customer</th>
                <th className="px-6 py-4 font-medium">Product</th>
                <th className="px-6 py-4 font-medium">Total</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {recentOrders.length > 0 ? (
                recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900">#{order.id.toString().padStart(4, '0')}</td>
                    <td className="px-6 py-4 text-gray-600">{order.user_name || 'Customer'}</td>
                    <td className="px-6 py-4 text-gray-600">{order.product_name}</td>
                    <td className="px-6 py-4 font-medium text-gray-900">KES {order.total_price.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.order_status)}`}>
                        {order.order_status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500 flex items-center gap-2">
                      <Clock size={14} />
                      {new Date(order.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-gray-400">
                    <PackageIcon className="mx-auto mb-2 opacity-50" size={32} />
                    <p>No orders received yet.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
