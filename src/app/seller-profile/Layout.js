"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, Home, Box, ShoppingCart, FileText, BarChart2, Wallet, MessageSquare, Settings, LogOut } from "lucide-react";
import { useSelector, useDispatch } from "react-redux"; // Added useDispatch
import { logout } from "@/reducers/Auth/authSlice"; // Import logout action
import { useRouter } from "next/navigation"; // Import useRouter

export default function Layout({ children, initialCollapsed = false }) {
  const [collapsed, setCollapsed] = useState(initialCollapsed);
  const [profileOpen, setProfileOpen] = useState(false); // Dropdown state
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = async () => {
    await dispatch(logout());
    router.push("/login");
  };

  const userName = user?.username || user?.name || user?.email?.split('@')[0] || "Seller";
  // Create initials safely
  const userInitials = (userName || "Seller")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

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
      {/* Mobile Sidebar Overlay */}
      {collapsed === false && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setCollapsed(true)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          flex flex-col bg-white border-r transition-all duration-300 ease-in-out z-50 h-screen whitespace-nowrap
          fixed md:sticky top-0 left-0
          ${collapsed ? "-translate-x-full w-64 md:translate-x-0 md:w-20" : "translate-x-0 w-64"}
        `}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b h-16">
          <div className="flex items-center gap-2">
            <div className={`text-green-600 font-bold text-lg ${collapsed ? "md:hidden" : "block"}`}>AGRO MART</div>
            <div className={`w-8 h-8 rounded-full bg-green-100 flex items-center justify-center ${collapsed ? "md:mx-auto" : ""}`}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 2L12 22" stroke="#16a34a" strokeWidth="2" /></svg>
            </div>
          </div>

          <button
            onClick={() => setCollapsed(!collapsed)}
            aria-label="Toggle sidebar"
            className="p-1 rounded hover:bg-gray-100 hidden md:block"
          >
            <Menu className="w-5 h-5 text-gray-600" />
          </button>

          <button
            onClick={() => setCollapsed(true)}
            className="p-1 rounded hover:bg-gray-100 md:hidden"
          >
            <svg className="w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <nav className="overflow-y-auto overflow-x-hidden px-2 py-4 space-y-1 flex-1">
          {menu.map((m) => (
            <Link
              href={m.href}
              key={m.key}
              className={`flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-50 transition-colors ${collapsed ? "md:justify-center" : ""}`}
            >
              <span className="text-gray-600 shrink-0">{m.icon}</span>
              <span className={`text-sm text-gray-700 transition-opacity duration-200 ${collapsed ? "md:hidden opacity-0 w-0" : "block opacity-100"}`}>{m.label}</span>
            </Link>
          ))}
        </nav>

        <div className="px-3 py-4 border-t">
          <div className={`flex items-center gap-3 ${collapsed ? "md:justify-center" : ""}`}>
            <div className="w-10 h-10 rounded-full bg-gray-100 shrink-0 flex items-center justify-center text-gray-600 font-bold text-xs border">
              {userInitials}
            </div>
            <div className={`${collapsed ? "md:hidden" : "block"}`}>
              <div className="text-sm font-semibold truncate max-w-[120px]">{userName}</div>
              <div className="text-xs text-gray-500 capitalize">{user?.role || "Seller"}</div>
            </div>
          </div>

          <div className={`mt-4 ${collapsed ? "md:hidden" : "block"}`}>
            <Link href="/seller-profile/add-product" className="block w-full">
              <button className="w-full py-2 px-3 rounded-md bg-green-600 text-white text-sm hover:bg-green-700 transition">Add Product</button>
            </Link>
            <button className="w-full mt-2 py-2 px-3 rounded-md border text-sm hover:bg-gray-50 transition">Upgrade</button>
          </div>
        </div>
      </aside>

      {/* Main content wrapper */}
      <div className="flex-1 flex flex-col min-h-screen min-w-0">
        {/* Mobile header */}
        <div className="md:hidden w-full bg-white border-b sticky top-0 z-30">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
              <button onClick={() => setCollapsed(false)} className="p-2 rounded hover:bg-gray-100"><Menu className="w-5 h-5" /></button>
              <div className="font-bold text-green-600">AGRO MART</div>
            </div>
            <div className="flex items-center gap-3">
              <MessageSquare className="w-5 h-5 text-gray-600" />
              <button onClick={() => setProfileOpen(!profileOpen)} className="relative">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600 border">
                  {userInitials}
                </div>
              </button>
            </div>
          </div>
          {/* Mobile Profile Dropdown - simplified for mobile */}
          {profileOpen && (
            <div className="absolute right-2 top-14 w-48 bg-white border rounded-lg shadow-lg py-1 z-50">
              <div className="px-4 py-2 border-b">
                <p className="text-sm font-medium text-gray-900 truncate">{userName}</p>
                <p className="text-xs text-gray-500 truncate">{user?.email}</p>
              </div>
              <Link href="/seller-profile/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50" onClick={() => setProfileOpen(false)}>My Profile</Link>
              <Link href="/seller-profile/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50" onClick={() => setProfileOpen(false)}>Settings</Link>
              <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">Sign out</button>
            </div>
          )}
        </div>

        {/* Desktop Topbar */}
        <header className="bg-white border-b px-8 h-16 hidden md:flex items-center justify-between sticky top-0 z-10 transition-all">
          <div className="flex items-center gap-4">
            <div className="hidden md:block text-sm text-gray-500">Welcome back,</div>
            <div className="text-lg font-semibold text-gray-900">{userName}</div>
            <div className="rounded-md border px-3 py-1 text-xs text-gray-500 hidden sm:inline">Seller Dashboard</div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 border rounded-full px-4 py-1.5 bg-gray-50/50 focus-within:bg-white focus-within:ring-2 ring-emerald-100 transition-all w-64">
              <svg className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none"><path d="M21 21L15 15" stroke="#9CA3AF" strokeWidth="2" /></svg>
              <input placeholder="Search orders..." className="bg-transparent outline-none text-sm w-full" />
            </div>

            <button className="p-2 rounded-full hover:bg-gray-100 relative">
              <MessageSquare className="w-5 h-5 text-gray-600" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </button>
            <div className="h-8 w-[1px] bg-gray-200 mx-1"></div>

            {/* Desktop User Dropdown */}
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 hover:bg-gray-50 rounded-full p-1 pr-2 transition-colors"
              >
                <div className="text-right hidden sm:block">
                  <div className="text-sm font-medium text-gray-900">KES 24,000</div>
                  <div className="text-xs text-emerald-600 font-medium">Verified Seller</div>
                </div>
                <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold border border-emerald-200">
                  {userInitials}
                </div>
              </button>

              {profileOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-gray-100 rounded-xl shadow-lg py-2 z-50 animate-in fade-in zoom-in-95 duration-200">
                  <div className="px-4 py-3 border-b border-gray-100 mb-1">
                    <p className="text-sm font-semibold text-gray-900 truncate">{userName}</p>
                    <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                  </div>

                  <div className="px-2 space-y-1">
                    <Link
                      href="/seller-profile/settings"
                      className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                      onClick={() => setProfileOpen(false)}
                    >
                      <Settings className="w-4 h-4 text-gray-400" />
                      Settings
                    </Link>
                    <Link
                      href="/seller-profile/settings"
                      className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                      onClick={() => setProfileOpen(false)}
                    >
                      <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                      Profile
                    </Link>
                  </div>

                  <div className="border-t border-gray-100 mt-2 hover:bg-red-50">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-5 py-3 text-sm text-red-600 font-medium transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="p-4 md:p-8 w-full flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
