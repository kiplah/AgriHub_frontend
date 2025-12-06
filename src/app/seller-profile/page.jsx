import React from 'react';
import { StatCard } from '../../Components/ui/StatCard';
import { Card } from '../../Components/ui/Card';
import { ShoppingBagIcon, SproutIcon, TrendingUpIcon, PackageIcon, AlertCircleIcon, BoxIcon } from 'lucide-react';
import Link from 'next/link';
import { mockOrders, mockLivestock, mockCrops } from '../../utils/mockData';

export default function Dashboard() {
  return (
    <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">
          Welcome back! Here's what's happening on your farm.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Livestock"
          value={mockLivestock.length}
          icon={BoxIcon}
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="Active Crops"
          value={mockCrops.length}
          icon={SproutIcon}
          trend={{ value: 8, isPositive: true }}
        />
        <StatCard
          title="Pending Orders"
          value={mockOrders.filter(o => o.status === 'pending').length}
          icon={PackageIcon}
        />
        <StatCard
          title="Revenue (KES)"
          value="125,400"
          icon={TrendingUpIcon}
          trend={{ value: 23, isPositive: true }}
        />
      </div>

      {/* Quick Actions */}
      <Card>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/livestock/add" className="p-4 border border-gray-200 rounded-lg hover:border-emerald-500 hover:bg-emerald-50 transition-colors group">
            <div className="w-8 h-8 text-emerald-600 mb-2 group-hover:scale-110 transition-transform">
              <BoxIcon />
            </div>
            <h3 className="font-medium text-gray-900">Add Livestock</h3>
            <p className="text-sm text-gray-600 mt-1">Register new animals</p>
          </Link>

          <Link href="/crops/add" className="p-4 border border-gray-200 rounded-lg hover:border-emerald-500 hover:bg-emerald-50 transition-colors group">
            <div className="w-8 h-8 text-emerald-600 mb-2 group-hover:scale-110 transition-transform">
              <SproutIcon />
            </div>
            <h3 className="font-medium text-gray-900">Add Crop</h3>
            <p className="text-sm text-gray-600 mt-1">Track new plantings</p>
          </Link>

          <Link href="/marketplace" className="p-4 border border-gray-200 rounded-lg hover:border-emerald-500 hover:bg-emerald-50 transition-colors group">
            <div className="w-8 h-8 text-emerald-600 mb-2 group-hover:scale-110 transition-transform">
              <ShoppingBagIcon />
            </div>
            <h3 className="font-medium text-gray-900">Browse Market</h3>
            <p className="text-sm text-gray-600 mt-1">Shop for supplies</p>
          </Link>
        </div>
      </Card>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Recent Orders
          </h2>
          <div className="space-y-3">
            {mockOrders.slice(0, 3).map(order => (
              <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Order #{order.id}</p>
                  <p className="text-sm text-gray-600">
                    {order.items.length} items
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">KES {order.total}</p>
                  <span className={`text-xs px-2 py-1 rounded-full ${order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                      order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                    }`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <Link href="/orders" className="block mt-4 text-center text-sm text-emerald-600 hover:text-emerald-700 font-medium">
            View all orders →
          </Link>
        </Card>

        <Card>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Health Alerts
          </h2>
          <div className="space-y-3">
            <div className="flex items-start p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <AlertCircleIcon className="w-5 h-5 text-yellow-600 mr-3 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900">
                  Livestock Checkup Due
                </p>
                <p className="text-sm text-gray-600">
                  3 animals need health inspection
                </p>
              </div>
            </div>
            <div className="flex items-start p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <AlertCircleIcon className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900">
                  Crop Watering Schedule
                </p>
                <p className="text-sm text-gray-600">
                  Tomato field needs watering today
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
