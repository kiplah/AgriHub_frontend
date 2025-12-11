"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Menu, Home, Box, ShoppingCart, FileText, BarChart2, Wallet, MessageSquare, Settings, LogOut } from "lucide-react";

export default function Layout({ children, initialCollapsed = false }) {
  const [collapsed, setCollapsed] = useState(initialCollapsed);

  const menu = [
    { key: "overview", label: "Overview", href: "/seller-profile", icon: <Home className="w-5 h-5" /> },
    { key: "my-products", label: "Products", href: "/seller-profile/my-products", icon: <Box className="w-5 h-5" /> },
    { key: "orders", label: "Orders", href: "/seller-profile/orders", icon: <ShoppingCart className="w-5 h-5" /> },
    { key: "inventory", label: "Inventory", href: "/seller-profile/inventory", icon: <FileText className="w-5 h-5" /> },
    { key: "analytics", label: "Analytics", href: "/seller-profile/analytics", icon: <BarChart2 className="w-5 h-5" /> },
    { key: "payouts", label: "Payouts", href: "/seller-profile/earnings", icon: <Wallet className="w-5 h-5" /> },
    { key: "messages", label: "Messages", href: "/seller-profile/chats", icon: <MessageSquare className="w-5 h-5" /> },
    { key: "settings", label: "Settings", href: "/seller-profile/settings", icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className={`bg-white border-r transition-all duration-200 ease-in-out ${collapsed ? "w-20" : "w-64"} hidden md:flex flex-col`}>
        <div className="flex items-center justify-between px-4 py-4 border-b">
          <div className="flex items-center gap-2">
            <div className={`text-green-600 font-bold text-lg ${collapsed ? "hidden" : "block"}`}>AGRO MART</div>
            <div className={`w-8 h-8 rounded-full bg-green-100 flex items-center justify-center ${collapsed ? "mx-auto" : ""}`}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 2L12 22" stroke="#16a34a" strokeWidth="2" /></svg>
            </div>
          </div>

          <button
            onClick={() => setCollapsed(!collapsed)}
            aria-label="Toggle sidebar"
            className="p-1 rounded hover:bg-gray-100"
          >
            <Menu className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-2 py-4 space-y-1">
          {menu.map((m) => (
            <Link
              href={m.href}
              key={m.key}
              className={`flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-50 transition-colors ${collapsed ? "justify-center" : ""}`}
            >
              <span className="text-gray-600">{m.icon}</span>
              <span className={`text-sm text-gray-700 ${collapsed ? "hidden" : "block"}`}>{m.label}</span>
            </Link>
          ))}
        </nav>

        <div className="px-3 py-4 border-t">
          <div className={`flex items-center gap-3 ${collapsed ? "justify-center" : ""}`}>
            <div className="w-10 h-10 rounded-full bg-gray-100" />
            <div className={`${collapsed ? "hidden" : "block"}`}>
              <div className="text-sm font-semibold">Victor K.</div>
              <div className="text-xs text-gray-500">Seller</div>
            </div>
          </div>

          <div className={`mt-4 ${collapsed ? "hidden" : "block"}`}>
            <button className="w-full py-2 px-3 rounded-md bg-green-600 text-white text-sm">Add Product</button>
            <button className="w-full mt-2 py-2 px-3 rounded-md border text-sm">Upgrade</button>
          </div>
        </div>
      </aside>

      {/* Mobile header */}
      <div className="md:hidden w-full bg-white border-b">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <button onClick={() => setCollapsed(!collapsed)} className="p-2 rounded hover:bg-gray-100"><Menu className="w-5 h-5" /></button>
            <div className="font-bold text-green-600">AGRO MART</div>
          </div>
          <div className="flex items-center gap-3">
            <MessageSquare className="w-5 h-5 text-gray-600" />
            <div className="w-8 h-8 rounded-full bg-gray-100" />
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 min-h-screen">
        {/* Topbar */}
        <header className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="hidden md:block text-sm text-gray-500">Welcome back,</div>
              <div className="text-lg font-semibold text-gray-900">Victor Kiplangat</div>
              <div className="rounded-md border px-3 py-1 text-xs text-gray-500 hidden sm:inline">Seller Dashboard</div>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 border rounded px-3 py-1 bg-gray-50">
                <svg className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none"><path d="M21 21L15 15" stroke="#9CA3AF" strokeWidth="2" /></svg>
                <input placeholder="Search orders, products..." className="bg-transparent outline-none text-sm" />
              </div>

              <button className="p-2 rounded hover:bg-gray-100"><MessageSquare className="w-5 h-5 text-gray-600" /></button>
              <div className="flex items-center gap-2">
                <div className="text-sm text-gray-500">KES 24,000</div>
                <div className="w-8 h-8 rounded-full bg-gray-100" />
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {children}
        </main>
      </div>
    </div>
  );
}
