"use client";
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StatCard } from '../../Components/ui/StatCard';
import { Card } from '../../Components/ui/Card';
import { ShoppingBagIcon, PackageIcon, TrendingUpIcon, MapPinIcon, MessageSquareIcon, TruckIcon, UserIcon, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { mockOrders } from '../../utils/mockData';
import { getProducts } from '@/reducers/product/productSlice';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function Dashboard() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { products } = useSelector((state) => state.product);
  const [greeting, setGreeting] = useState('Welcome back');

  useEffect(() => {
    dispatch(getProducts());

    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 18) setGreeting('Good afternoon');
    else setGreeting('Good evening');
  }, [dispatch]);

  // Calculate stats from mock data
  const totalSpent = mockOrders.reduce((acc, order) => acc + parseInt(order.total.replace(/,/g, '')), 0);
  const activeOrders = mockOrders.filter(o => o.status !== 'delivered').length;

  // Chart Data
  const chartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Spending (KES)',
        data: [1200, 1900, 300, 500, 2000, 3000, 1500],
        fill: true,
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        borderColor: '#10b981',
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          borderDash: [2, 4],
          color: '#e5e7eb',
        },
        ticks: {
          callback: (value) => `KES ${value}`,
        },
      },
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    }
  };

  return (
    <div className="space-y-8 p-8 bg-gray-50 min-h-screen font-sans">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            {greeting}, <span className="text-emerald-600">{user?.username || 'Buyer'}</span>! 👋
          </h1>
          <p className="text-gray-500 mt-2 text-lg">
            Here's what's happening with your farm orders today.
          </p>
        </div>
        <div className="flex gap-3">
          <Link href="/marketplace">
            <button className="px-6 py-2.5 bg-emerald-600 text-white rounded-full font-medium shadow-lg shadow-emerald-200 hover:bg-emerald-700 hover:shadow-emerald-300 transition-all transform hover:-translate-y-0.5">
              Browse Market
            </button>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Orders"
          value={mockOrders.length}
          icon={ShoppingBagIcon}
          trend={{ value: 12, isPositive: true }}
          className="bg-white"
        />
        <StatCard
          title="Total Spent"
          value={`KES ${totalSpent.toLocaleString()}`}
          icon={TrendingUpIcon}
          trend={{ value: 8, isPositive: true }}
          className="bg-white"
        />
        <StatCard
          title="Active Orders"
          value={activeOrders}
          icon={PackageIcon}
          className="bg-white"
        />
        <StatCard
          title="Saved Addresses"
          value="3"
          icon={MapPinIcon}
          className="bg-white"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Spending Chart */}
        <div className="lg:col-span-2">
          <Card className="h-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Spending Overview</h2>
              <select className="bg-gray-50 border-none text-sm font-medium text-gray-500 focus:ring-0 cursor-pointer hover:text-gray-700">
                <option>This Week</option>
                <option>Last Week</option>
                <option>This Month</option>
              </select>
            </div>
            <div className="h-[300px] w-full">
              <Line data={chartData} options={chartOptions} />
            </div>
          </Card>
        </div>

        {/* Order Tracking */}
        <div className="lg:col-span-1">
          <Card className="h-full bg-gradient-to-br from-emerald-600 to-teal-700 text-white border-none">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <TruckIcon className="w-6 h-6" />
              Track Order
            </h2>

            <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-emerald-100 text-sm">Order #ORD-2024-001</p>
                  <h3 className="font-bold text-lg mt-1">Organic Fertilizer</h3>
                </div>
                <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-semibold">
                  In Transit
                </span>
              </div>

              <div className="relative pt-4 pb-2">
                <div className="flex mb-2 items-center justify-between text-xs font-semibold text-emerald-100">
                  <span>Shipped</span>
                  <span>Delivered</span>
                </div>
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-emerald-800/50">
                  <div style={{ width: "65%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-white"></div>
                </div>
                <p className="text-sm text-emerald-50">
                  Estimated delivery: <span className="font-bold text-white">Today, 4:00 PM</span>
                </p>
              </div>

              <button className="w-full mt-6 py-3 bg-white text-emerald-700 rounded-lg font-bold hover:bg-emerald-50 transition-colors">
                View Details
              </button>
            </div>
          </Card>
        </div>
      </div>

      {/* Featured Products */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">Featured for You</h2>
          <Link href="/marketplace" className="text-emerald-600 font-medium hover:text-emerald-700 flex items-center gap-1">
            View All <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.slice(0, 4).map((product) => (
            <Link key={product.id} href={`/Product/${product.id}`}>
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                <div className="relative h-48 bg-gray-100 overflow-hidden">
                  <img
                    src={`http://127.0.0.1:8000/${product.imagepath}`}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=2070&auto=format&fit=crop"; }}
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-semibold text-emerald-700 shadow-sm">
                    {product.category_name || 'Crop'}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 mb-1 truncate">{product.name}</h3>
                  <p className="text-emerald-600 font-bold">KES {product.price}</p>
                </div>
              </div>
            </Link>
          ))}
          {products.length === 0 && (
            [1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 animate-pulse">
                <div className="h-40 bg-gray-200 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

