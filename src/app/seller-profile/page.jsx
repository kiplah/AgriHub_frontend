"use client";
import React, { useEffect } from 'react';
import { StatCard } from '../../Components/ui/StatCard';
import { Card } from '../../Components/ui/Card';
import { ShoppingBagIcon, SproutIcon, TrendingUpIcon, PackageIcon, AlertCircleIcon, BoxIcon, MessageSquare, DollarSign } from 'lucide-react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSellerStats } from '@/reducers/Order/orderSlice';

export default function Dashboard() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { sellerStats, loading } = useSelector((state) => state.orders);

  useEffect(() => {
    if (user?.userId) {
      dispatch(fetchSellerStats(user.userId));
    }
  }, [dispatch, user?.userId]);

  const totalOrders = sellerStats?.TotalOrders || 0;
  const revenue = sellerStats?.Revenue || 0;
  const activeOrders = sellerStats?.ActiveOrders || 0;
  const lowStock = sellerStats?.LowStockAlerts || 0;
  const unreadMessages = sellerStats?.UnreadMessages || 0;

  return (
    <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-600 mt-1">
            Welcome back, {user?.username || 'Seller'}! Here's your store's performance.
          </p>
        </div>
        <Link href="/seller-profile/settings" className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
          Store Settings
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Revenue"
          value={`KES ${revenue.toLocaleString()}`}
          icon={DollarSign}
          trend={{ value: 12, isPositive: true }} // Trend is mock for now
        />
        <StatCard
          title="Total Orders"
          value={totalOrders}
          icon={ShoppingBagIcon}
        />
        <StatCard
          title="Active Orders"
          value={activeOrders}
          icon={PackageIcon}
          className="bg-blue-50 border-blue-200"
        />
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Unread Messages</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">{unreadMessages}</h3>
          </div>
          <div className={`p-3 rounded-full ${unreadMessages > 0 ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'}`}>
            <MessageSquare size={24} />
          </div>
        </div>
      </div>

      {/* Quick Actions & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/seller-profile/add-product" className="p-4 border border-gray-200 rounded-lg hover:border-emerald-500 hover:bg-emerald-50 transition-colors group">
              <div className="w-8 h-8 text-emerald-600 mb-2 group-hover:scale-110 transition-transform">
                <BoxIcon />
              </div>
              <h3 className="font-medium text-gray-900">Add Product</h3>
              <p className="text-sm text-gray-600 mt-1">List new item</p>
            </Link>

            <Link href="/seller-profile/earnings" className="p-4 border border-gray-200 rounded-lg hover:border-emerald-500 hover:bg-emerald-50 transition-colors group">
              <div className="w-8 h-8 text-emerald-600 mb-2 group-hover:scale-110 transition-transform">
                <TrendingUpIcon />
              </div>
              <h3 className="font-medium text-gray-900">View Earnings</h3>
              <p className="text-sm text-gray-600 mt-1">Check Payouts</p>
            </Link>

            <Link href="/seller-profile/orders" className="p-4 border border-gray-200 rounded-lg hover:border-emerald-500 hover:bg-emerald-50 transition-colors group">
              <div className="w-8 h-8 text-emerald-600 mb-2 group-hover:scale-110 transition-transform">
                <ShoppingBagIcon />
              </div>
              <h3 className="font-medium text-gray-900">Manage Orders</h3>
              <p className="text-sm text-gray-600 mt-1">Process shipments</p>
            </Link>
          </div>
        </Card>

        <Card>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Alerts
          </h2>
          <div className="space-y-4">
            {lowStock > 0 ? (
              <div className="flex items-start p-3 bg-red-50 border border-red-200 rounded-lg">
                <AlertCircleIcon className="w-5 h-5 text-red-600 mr-3 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Low Stock Alert</p>
                  <p className="text-sm text-gray-600">{lowStock} products are running low.</p>
                  <Link href="/seller-profile/inventory" className="text-xs font-semibold text-red-700 hover:underline mt-1 block">
                    View Inventory
                  </Link>
                </div>
              </div>
            ) : (
              <div className="flex items-start p-3 bg-green-50 border border-green-200 rounded-lg">
                <BoxIcon className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Inventory Healthy</p>
                  <p className="text-sm text-gray-600">No low stock alerts.</p>
                </div>
              </div>
            )}

            {/* Additional alerts can be added here */}
            {unreadMessages > 0 && (
              <div className="flex items-start p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <MessageSquare className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">New Messages</p>
                  <p className="text-sm text-gray-600">You have {unreadMessages} unread messages.</p>
                  <Link href="/seller-profile/chats" className="text-xs font-semibold text-blue-700 hover:underline mt-1 block">
                    Go to Inbox
                  </Link>
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
