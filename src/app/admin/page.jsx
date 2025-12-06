'use client';

import React from 'react';
import { StatCard } from '../../Components/ui/StatCard';
import { Card } from '../../Components/ui/Card';
import {
  UsersIcon,
  ShoppingBagIcon,
  TrendingUpIcon,
  PackageIcon,
  SettingsIcon,
  FileTextIcon,
  ShieldCheckIcon,
  AlertTriangleIcon
} from 'lucide-react';
import Link from 'next/link';
import { mockOrders, mockLivestock, mockCrops } from '../../utils/mockData';

export default function Dashboard() {
  // Calculate stats
  const totalRevenue = mockOrders.reduce((acc, order) => acc + parseInt(order.total.replace(/,/g, '')), 0);
  const totalUsers = 1250; // Mock user count
  const totalProducts = mockLivestock.length + mockCrops.length;

  return (
    <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-1">
          System Overview and Management
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value={totalUsers.toLocaleString()}
          icon={UsersIcon}
          trend={{ value: 8, isPositive: true }}
        />
        <StatCard
          title="Total Revenue (KES)"
          value={totalRevenue.toLocaleString()}
          icon={TrendingUpIcon}
          trend={{ value: 15, isPositive: true }}
        />
        <StatCard
          title="Total Products"
          value={totalProducts}
          icon={PackageIcon}
        />
        <StatCard
          title="Pending Approvals"
          value="5"
          icon={ShieldCheckIcon}
        />
      </div>

      {/* Quick Actions */}
      <Card>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Management
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/admin/users" className="p-4 border border-gray-200 rounded-lg hover:border-emerald-500 hover:bg-emerald-50 transition-colors group">
            <div className="w-8 h-8 text-emerald-600 mb-2 group-hover:scale-110 transition-transform">
              <UsersIcon />
            </div>
            <h3 className="font-medium text-gray-900">Manage Users</h3>
            <p className="text-sm text-gray-600 mt-1">View and edit user accounts</p>
          </Link>

          <Link href="/admin/products" className="p-4 border border-gray-200 rounded-lg hover:border-emerald-500 hover:bg-emerald-50 transition-colors group">
            <div className="w-8 h-8 text-emerald-600 mb-2 group-hover:scale-110 transition-transform">
              <PackageIcon />
            </div>
            <h3 className="font-medium text-gray-900">Manage Products</h3>
            <p className="text-sm text-gray-600 mt-1">Approve or remove listings</p>
          </Link>

          <Link href="/admin/reports" className="p-4 border border-gray-200 rounded-lg hover:border-emerald-500 hover:bg-emerald-50 transition-colors group">
            <div className="w-8 h-8 text-emerald-600 mb-2 group-hover:scale-110 transition-transform">
              <FileTextIcon />
            </div>
            <h3 className="font-medium text-gray-900">System Reports</h3>
            <p className="text-sm text-gray-600 mt-1">View platform analytics</p>
          </Link>
        </div>
      </Card>

      {/* System Health */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Recent Registrations
          </h2>
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 font-bold mr-3">
                    U
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">New User #{i}</p>
                    <p className="text-sm text-gray-600">Registered 2 hours ago</p>
                  </div>
                </div>
                <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">
                  Active
                </span>
              </div>
            ))}
          </div>
          <Link href="/admin/users" className="block mt-4 text-center text-sm text-emerald-600 hover:text-emerald-700 font-medium">
            View all users →
          </Link>
        </Card>

        <Card>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            System Alerts
          </h2>
          <div className="space-y-3">
            <div className="flex items-start p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <AlertTriangleIcon className="w-5 h-5 text-yellow-600 mr-3 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900">
                  High Traffic Warning
                </p>
                <p className="text-sm text-gray-600">
                  Server load is higher than usual.
                </p>
              </div>
            </div>
            <div className="flex items-start p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <SettingsIcon className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900">
                  Scheduled Maintenance
                </p>
                <p className="text-sm text-gray-600">
                  System maintenance scheduled for Sunday 2 AM.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
