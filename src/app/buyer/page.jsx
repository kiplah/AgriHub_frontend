"use client";
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StatCard } from '../../Components/ui/StatCard';
import { ShoppingBagIcon, PackageIcon, TrendingUpIcon, MapPinIcon, TruckIcon, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { getProducts } from '@/reducers/product/productSlice';
import { fetchBuyerStats } from '@/reducers/Order/orderSlice';
import { API_BASE_URL } from '@/axios/config';
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
  const { buyerStats } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(getProducts());
    if (user?.userId) {
      dispatch(fetchBuyerStats(user.userId));
    }
  }, [dispatch, user?.userId]);

  // Read stats from backend database state
  const totalOrders = buyerStats?.TotalOrders || 0;
  const totalSpent = buyerStats?.TotalSpent || 0;
  const activeOrders = buyerStats?.ActiveOrders || 0;
  const savedAddresses = buyerStats?.SavedAddresses || 0;
  const spendingByDay = buyerStats?.SpendingByDay || [0, 0, 0, 0, 0, 0, 0];

  const getProductImage = (product) => {
    if (!product.imagepath) {
      return "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=2070&auto=format&fit=crop";
    }
    if (product.imagepath.startsWith("http")) {
      return product.imagepath;
    }
    const cleanPath = product.imagepath.replace(/^\/+/, "");
    return `${API_BASE_URL}/${cleanPath}`;
  };
  const trackingOrder = buyerStats?.TrackingOrder || null;

  // Chart Data
  const chartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Spending (KES)',
        data: spendingByDay,
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Buyer Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Overview of your farm orders, spending trends, and active deliveries</p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <Link href="/buyer/marketplace" className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg shadow-sm text-sm whitespace-nowrap hover:bg-emerald-700 transition">
            Browse Marketplace
          </Link>
          <Link href="/buyer/orders" className="px-3 py-2 border border-emerald-200 bg-emerald-50 text-emerald-700 rounded-lg text-sm whitespace-nowrap hover:bg-emerald-100 transition font-medium">
            View My Orders
          </Link>
          <Link href="/buyer/settings" className="px-3 py-2 border border-gray-200 text-gray-700 rounded-lg text-sm whitespace-nowrap hover:bg-gray-50 transition font-medium">
            Account Settings
          </Link>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <StatCard
          title="Total Orders"
          value={totalOrders}
          icon={ShoppingBagIcon}
          trend={{ value: 12, isPositive: true }}
          className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 md:p-5 h-full"
        />
        <StatCard
          title="Total Spent"
          value={`KES ${totalSpent.toLocaleString()}`}
          icon={TrendingUpIcon}
          trend={{ value: 8, isPositive: true }}
          className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 md:p-5 h-full"
        />
        <StatCard
          title="Active Orders"
          value={activeOrders}
          icon={PackageIcon}
          className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 md:p-5 h-full"
        />
        <StatCard
          title="Saved Addresses"
          value={savedAddresses}
          icon={MapPinIcon}
          className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 md:p-5 h-full"
        />
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Spending Chart */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 md:p-6 h-full">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="font-semibold text-gray-900">Spending Overview</h3>
                <p className="text-xs text-gray-500 mt-1">Detailed spending trends over the recent period</p>
              </div>
              <select className="bg-gray-50 border-none text-sm font-medium text-gray-500 focus:ring-0 cursor-pointer hover:text-gray-700 rounded-lg p-1.5 px-3">
                <option>This Week</option>
                <option>Last Week</option>
                <option>This Month</option>
              </select>
            </div>
            <div className="h-[250px] w-full">
              <Line data={chartData} options={chartOptions} />
            </div>
          </div>
        </div>

        {/* Order Tracking */}
        <div className="lg:col-span-1">
          <div className="bg-gradient-to-br from-emerald-600 to-teal-700 text-white rounded-2xl p-6 shadow-sm flex flex-col justify-between h-full min-h-[300px]">
            {trackingOrder ? (
              <>
                <div>
                  <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <TruckIcon className="w-6 h-6" />
                    Track Order
                  </h2>

                  <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="text-emerald-100 text-sm">Order #ORD-{trackingOrder.id}</p>
                        <h3 className="font-bold text-base mt-1 truncate max-w-[150px]">{trackingOrder.product_name}</h3>
                      </div>
                      <span className="bg-white/20 px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize">
                        {trackingOrder.status}
                      </span>
                    </div>

                    <div className="relative pt-2">
                      <div className="flex mb-2 items-center justify-between text-xs font-semibold text-emerald-100">
                        <span>Shipped</span>
                        <span>Delivered</span>
                      </div>
                      <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-emerald-800/50">
                        <div 
                          style={{ width: trackingOrder.status === 'delivered' ? '100%' : trackingOrder.status === 'shipped' ? '65%' : '20%' }} 
                          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-white"
                        ></div>
                      </div>
                      <p className="text-xs text-emerald-50">
                        Estimated delivery: <span className="font-bold text-white">Today, 4:00 PM</span>
                      </p>
                    </div>
                  </div>
                </div>

                <Link href={`/buyer/orders`} className="w-full">
                  <button className="w-full mt-4 py-3 bg-white text-emerald-700 rounded-xl font-bold hover:bg-emerald-50 transition-colors shadow-sm text-sm">
                    View Details
                  </button>
                </Link>
              </>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-4">
                <TruckIcon className="w-12 h-12 text-emerald-100 mb-4 animate-bounce" />
                <h3 className="font-bold text-lg">No Active Orders</h3>
                <p className="text-sm text-emerald-100 mt-2">Browse the marketplace to buy fresh farm products.</p>
                <Link href="/marketplace" className="mt-6 w-full">
                  <button className="w-full py-3 bg-white text-emerald-700 rounded-xl font-bold hover:bg-emerald-50 transition-colors shadow-sm text-sm">
                    Go to Shop
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-semibold text-gray-900">Featured for You</h3>
            <p className="text-xs text-gray-500 mt-1">Recommended agricultural items and supplies</p>
          </div>
          <Link href="/buyer/marketplace" className="text-emerald-600 font-medium hover:text-emerald-700 flex items-center gap-1 text-sm">
            View All <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.slice(0, 4).map((product) => (
            <Link key={product.id} href={`/Product/${product.id}`}>
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                <div className="relative h-44 bg-gray-100 overflow-hidden">
                  <img
                    src={getProductImage(product)}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=2070&auto=format&fit=crop"; }}
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-semibold text-emerald-700 shadow-sm">
                    {product.category_name || 'Crop'}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 mb-1 truncate text-sm">{product.name}</h3>
                  <p className="text-emerald-600 font-bold text-sm">KES {product.price}</p>
                </div>
              </div>
            </Link>
          ))}
          {products.length === 0 && (
            [1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 animate-pulse">
                <div className="h-36 bg-gray-200 rounded-lg mb-4"></div>
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
