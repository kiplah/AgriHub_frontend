"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { logout } from "@/reducers/Auth/authSlice";
import { Bell, Search, LogOut, User, Settings, Menu } from "lucide-react";
import Link from "next/link";

const DashboardHeader = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { user, role } = useSelector((state) => state.auth);
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const handleLogout = async () => {
        await dispatch(logout());
        router.push("/login");
    };

    return (
        <header className="bg-white border-b border-gray-100 h-16 px-6 flex items-center justify-between sticky top-0 z-20 shadow-sm">
            {/* Left: Mobile Menu Trigger (Hidden on Desktop) & Search */}
            <div className="flex items-center gap-4">
                <button className="md:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-lg">
                    <Menu size={24} />
                </button>
                <div className="hidden md:flex items-center bg-gray-50 rounded-lg px-3 py-2 border-transparent focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20 transition-all border w-64">
                    <Search size={18} className="text-gray-400 mr-2" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="bg-transparent border-none outline-none text-sm w-full text-gray-700 placeholder-gray-400"
                    />
                </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-4">
                {/* Notifications */}
                <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
                    <Bell size={20} />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                </button>

                {/* Vertical Divider */}
                <div className="h-8 w-px bg-gray-200"></div>

                {/* User Profile */}
                <div className="relative">
                    <button
                        onClick={() => setDropdownOpen(!isDropdownOpen)}
                        className="flex items-center gap-3 hover:bg-gray-50 rounded-lg px-2 py-1 transition-colors"
                    >
                        <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold border border-emerald-200">
                            {user?.username?.charAt(0).toUpperCase() || "U"}
                        </div>
                        <div className="hidden md:block text-left">
                            <p className="text-sm font-semibold text-gray-800 leading-none">{user?.username || "User"}</p>
                            <p className="text-xs text-gray-500 mt-1 capitalize">{role || "Seller"}</p>
                        </div>
                    </button>

                    {/* Dropdown Menu */}
                    {isDropdownOpen && (
                        <>
                            <div
                                className="fixed inset-0 z-10"
                                onClick={() => setDropdownOpen(false)}
                            ></div>
                            <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-1 z-20 overflow-hidden animation-fade-in">
                                <Link
                                    href="/seller-profile/profile"
                                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
                                >
                                    <User size={16} /> Profile
                                </Link>
                                <Link
                                    href="/seller-profile/settings"
                                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
                                >
                                    <Settings size={16} /> Settings
                                </Link>
                                <div className="h-px bg-gray-100 my-1"></div>
                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                >
                                    <LogOut size={16} /> Logout
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

export default DashboardHeader;
