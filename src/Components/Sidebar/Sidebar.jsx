"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  LayoutDashboard,
  Store,
  ShoppingBag,
  Tractor,
  Sprout,
  Truck,
  Activity,
  TrendingUp,
  FlaskConical,
  CloudSun,
  LogOut,
  Menu,
  Settings,
  User,
  Box as BoxIcon,
  MessageSquare,
  Wallet,
  Star,
  BarChart,
  ClipboardList,
  HelpCircle,
  Megaphone // Added for Marketing
} from "lucide-react";

import Logo from "../../assets/images/logo.png";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { logout } from "@/reducers/Auth/authSlice";
import { useRouter } from "next/navigation";

const Sidebar = ({ role }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);

    try {
      const result = await dispatch(logout()).unwrap();
      if (result) {
        toast.success("Logged out successfully!", {
          position: "top-right",
          autoClose: 3000,
        });
        router.push("/login");
      }
    } catch (err) {
      console.error("Error during logout:", err);
      toast.error("Failed to log out. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setIsLoggingOut(false);
    }
  };

  // Define menu structure based on role
  const getMenuStructure = (role) => {
    if (role === 'seller') {
      return [
        {
          items: [
            { label: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/seller-profile" },
            { label: "Products", icon: <BoxIcon size={20} />, path: "/seller-profile/my-products" },
            { label: "Orders", icon: <ShoppingBag size={20} />, path: "/seller-profile/orders" },
            { label: "Inventory", icon: <ClipboardList size={20} />, path: "/seller-profile/inventory" }, // "Inventory" in mockup
            { label: "Messages", icon: <MessageSquare size={20} />, path: "/seller-profile/chats" },
            { label: "Analytics", icon: <BarChart size={20} />, path: "/seller-profile/analytics" },
            { label: "Payouts", icon: <Wallet size={20} />, path: "/seller-profile/earnings" },
            { label: "Marketing", icon: <Megaphone size={20} />, path: "/seller-profile/marketing" }, // Mockup item
            { label: "Profile", icon: <User size={20} />, path: "/seller-profile/profile" },
            { label: "Settings", icon: <Settings size={20} />, path: "/seller-profile/settings" },
          ]
        }
      ];
    } else if (role === 'buyer') {
      // Keep buyer/admin styling simple or adapt later if requested. For now focusing on seller match.
      // Reverting to grouped structure for others or simplifying. Let's keep existing logic but styled light.
      return [
        {
          title: "OVERVIEW",
          items: [
            { label: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/buyer" },
            { label: "Marketplace", icon: <Store size={20} />, path: "/marketplace" },
            { label: "My Orders", icon: <ShoppingBag size={20} />, path: "/buyer/orders" },
          ]
        },
        {
          title: "ACCOUNT",
          items: [
            { label: "Track Order", icon: <Truck size={20} />, path: "/buyer/track-order" },
            { label: "Saved Addresses", icon: <User size={20} />, path: "/buyer/saved-addresses" },
          ]
        }
      ];
    } else if (role === 'admin') {
      return [
        {
          title: "ADMINISTRATION",
          items: [
            { label: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/admin" },
            { label: "Users", icon: <User size={20} />, path: "/admin/users" },
            { label: "Products", icon: <Store size={20} />, path: "/admin/products" },
          ]
        }
      ]
    }
    return [];
  };

  const menuGroups = getMenuStructure(role);

  useEffect(() => {
    const closeSidebarOnOutsideClick = (event) => {
      const sidebar = document.getElementById("sidebar");
      if (isSidebarOpen && sidebar && !sidebar.contains(event.target)) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener("click", closeSidebarOnOutsideClick);
    return () => {
      document.removeEventListener("click", closeSidebarOnOutsideClick);
    };
  }, [isSidebarOpen]);

  return (
    <>
      <button
        aria-controls="sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        onClick={toggleSidebar}
      >
        <span className="sr-only">Open sidebar</span>
        <Menu className="w-6 h-6" />
      </button>

      <aside
        id="sidebar"
        className={`fixed top-0 left-0 z-40 h-screen flex flex-col transition-transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 w-[280px] py-6 px-4 bg-white border-r border-gray-100 shadow-sm`}
        aria-label="Sidebar"
      >
        <div className="flex items-center justify-start px-4 mb-10">
          {/* Logo - assuming transparent png or adjusting styling */}
          <div className="flex items-center gap-2 font-bold text-2xl text-emerald-700">
            {/* Using text fallback if image doesn't fit white bg well, or assuming logo is improved */}
            {/* <Image src={Logo} height={40} width={40} alt="Logo" /> */}
            {/* User mockup shows text 'AGRO MART' with a leaf icon */}
            <Sprout className="text-emerald-600" size={28} />
            <span>AGRO MART</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto space-y-8 custom-scrollbar">
          {menuGroups.map((group, groupIndex) => (
            <div key={groupIndex}>
              {group.title && (
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 px-4">
                  {group.title}
                </h3>
              )}
              <ul className="space-y-1">
                {group.items.map((item, index) => (
                  <li key={index}>
                    <Link href={item.path}>
                      <div
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${typeof window !== "undefined" && window.location.pathname === item.path
                            ? "bg-emerald-600 text-white shadow-md font-medium"
                            : "text-gray-500 hover:bg-gray-50 hover:text-emerald-600"
                          }`}
                      >
                        <div className={typeof window !== "undefined" && window.location.pathname === item.path ? "text-white" : "text-gray-400 group-hover:text-emerald-600"}>
                          {item.icon}
                        </div>
                        <span className="text-sm">{item.label}</span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
