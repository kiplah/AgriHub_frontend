import React from 'react';
import { StatCard } from '../../Components/ui/StatCard';
import { Card } from '../../Components/ui/Card';
import { ShoppingBagIcon, PackageIcon, TrendingUpIcon, MapPinIcon, MessageSquareIcon, TruckIcon } from 'lucide-react';
import Link from 'next/link';
import { mockOrders } from '../../utils/mockData';

export default function Dashboard() {
  // Calculate stats from mock data
  const totalSpent = mockOrders.reduce((acc, order) => acc + parseInt(order.total.replace(/,/g, '')), 0);
  const activeOrders = mockOrders.filter(o => o.status !== 'delivered').length;

  return (
    <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">
          Welcome back! Track your orders and manage your account.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Orders"
          value={mockOrders.length}
          icon={ShoppingBagIcon}
          trend={{ value: 5, isPositive: true }}
        />
        <StatCard
          title="Total Spent (KES)"
          value={totalSpent.toLocaleString()}
          icon={TrendingUpIcon}
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="Active Orders"
          value={activeOrders}
          icon={PackageIcon}
        />
        <StatCard
          title="Saved Addresses"
          value="3"
          icon={MapPinIcon}
        />
      </div>

      {/* Quick Actions */}
      <Card>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/marketplace" className="p-4 border border-gray-200 rounded-lg hover:border-emerald-500 hover:bg-emerald-50 transition-colors group">
            <div className="w-8 h-8 text-emerald-600 mb-2 group-hover:scale-110 transition-transform">
              <ShoppingBagIcon />
            </div>
            <h3 className="font-medium text-gray-900">Browse Market</h3>
            <p className="text-sm text-gray-600 mt-1">Find fresh produce</p>
          </Link>

          <Link href="/buyer/orders" className="p-4 border border-gray-200 rounded-lg hover:border-emerald-500 hover:bg-emerald-50 transition-colors group">
            <div className="w-8 h-8 text-emerald-600 mb-2 group-hover:scale-110 transition-transform">
              <TruckIcon />
            </div>
            <h3 className="font-medium text-gray-900">Track Orders</h3>
            <p className="text-sm text-gray-600 mt-1">View shipment status</p>
          </Link>

          <Link href="/buyer/support" className="p-4 border border-gray-200 rounded-lg hover:border-emerald-500 hover:bg-emerald-50 transition-colors group">
            <div className="w-8 h-8 text-emerald-600 mb-2 group-hover:scale-110 transition-transform">
              <MessageSquareIcon />
            </div>
            <h3 className="font-medium text-gray-900">Support</h3>
            <p className="text-sm text-gray-600 mt-1">Get help with orders</p>
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
                    {order.items.join(', ')}
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
          <Link href="/buyer/orders" className="block mt-4 text-center text-sm text-emerald-600 hover:text-emerald-700 font-medium">
            View all orders →
          </Link>
        </Card>

        <Card>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Shopping Trends
          </h2>
          <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-100">
            <div className="flex items-start">
              <TrendingUpIcon className="w-5 h-5 text-emerald-600 mr-3 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900">
                  Vegetable Prices Dropping
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Prices for tomatoes and onions have dropped by 15% this week. Great time to stock up!
                </p>
                <Link href="/marketplace?category=vegetables" className="inline-block mt-3 text-sm font-medium text-emerald-700 hover:text-emerald-800">
                  Shop Vegetables →
                </Link>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
