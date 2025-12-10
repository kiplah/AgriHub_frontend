"use client";
import React, { useState } from "react";
import Link from "next/link";
import { User, Lock, Bell, ChevronRight, Store, ShieldCheck } from "lucide-react";
import { Card } from "@/Components/ui/Card";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general');

  const sections = [
    {
      id: 'general',
      title: 'General Settings',
      icon: Store,
      description: 'Manage store profile and branding',
      link: '/seller-profile/profile' // Direct link to the profile page we made
    },
    {
      id: 'security',
      title: 'Security',
      icon: ShieldCheck,
      description: 'Password and authentication',
      action: 'change_password'
    },
    {
      id: 'notifications',
      title: 'Notifications',
      icon: Bell,
      description: 'Email and SMS preferences',
      action: 'notifications'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500">Manage your store preferences and account security.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Settings Navigation */}
        <Card className="col-span-1 h-fit">
          <nav className="space-y-1">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveTab(section.id)}
                className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium rounded-lg transition-colors ${activeTab === section.id
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'text-gray-700 hover:bg-gray-50'
                  }`}
              >
                <div className="flex items-center gap-3">
                  <section.icon size={18} />
                  {section.title}
                </div>
                <ChevronRight size={16} className={`text-gray-400 ${activeTab === section.id ? 'text-emerald-500' : ''}`} />
              </button>
            ))}
          </nav>
        </Card>

        {/* Content Area */}
        <div className="md:col-span-2 space-y-6">
          {activeTab === 'general' && (
            <Card>
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-emerald-100 text-emerald-600 rounded-full">
                  <Store size={24} />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900">Store Profile</h2>
                  <p className="text-sm text-gray-500">Update your store name, logo, and contact info.</p>
                </div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg flex items-center justify-between border border-gray-100">
                <div>
                  <p className="font-medium text-gray-900">Store Information</p>
                  <p className="text-sm text-gray-500">Visible to all customers on the marketplace.</p>
                </div>
                <Link
                  href="/seller-profile/profile"
                  className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-medium text-sm transition-colors"
                >
                  Edit Profile
                </Link>
              </div>
            </Card>
          )}

          {activeTab === 'security' && (
            <Card>
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-blue-100 text-blue-600 rounded-full">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900">Security</h2>
                  <p className="text-sm text-gray-500">Manage your password and account access.</p>
                </div>
              </div>

              <form className="space-y-4 max-w-md">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                  <input type="password" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                  <input type="password" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                  <input type="password" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" />
                </div>
                <div className="pt-2">
                  <button type="button" className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">
                    Update Password
                  </button>
                </div>
              </form>
            </Card>
          )}

          {activeTab === 'notifications' && (
            <Card>
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-amber-100 text-amber-600 rounded-full">
                  <Bell size={24} />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900">Notifications</h2>
                  <p className="text-sm text-gray-500">Choose how you want to be notified.</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">Email Notifications</p>
                    <p className="text-sm text-gray-500">Receive daily summaries and critical alerts via email.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">Marketplace Updates</p>
                    <p className="text-sm text-gray-500">Get notified about new features and tips.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                  </label>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
