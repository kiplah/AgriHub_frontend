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
  HelpCircle
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
          title: "OVERVIEW",
          items: [
            { label: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/seller-profile" },
            { label: "My Products", icon: <BoxIcon size={20} />, path: "/seller-profile/my-products" },
            { label: "Inventory", icon: <ClipboardList size={20} />, path: "/seller-profile/inventory" },
            { label: "Orders", icon: <ShoppingBag size={20} />, path: "/orders" },
            { label: "Messages", icon: <MessageSquare size={20} />, path: "/seller-profile/chats" },
            { label: "Wallet & Payouts", icon: <Wallet size={20} />, path: "/seller-profile/earnings" },
            { label: "Reviews", icon: <Star size={20} />, path: "/seller-profile/reviews" },
            { label: "Analytics", icon: <BarChart size={20} />, path: "/seller-profile/analytics" },
          ]
        },
        {
          title: "FARM MANAGEMENT",
          items: [
            { label: "Livestock", icon: <Tractor size={20} />, path: "/livestock" },
            { label: "Crops", icon: <Sprout size={20} />, path: "/crops" },
            { label: "Logistics", icon: <Truck size={20} />, path: "/logistics" },
          ]
        },
        {
          title: "SETTINGS & SUPPORT",
          items: [
            { label: "Store Profile", icon: <Store size={20} />, path: "/seller-profile/profile" },
            { label: "Settings", icon: <Settings size={20} />, path: "/seller-profile/settings" },
            { label: "Support", icon: <HelpCircle size={20} />, path: "/seller-profile/support" },
          ]
        },
        {
          title: "AI FEATURES",
          items: [
            { label: "Disease Detection", icon: <Activity size={20} />, path: "/disease-detection" },
            { label: "Growth Prediction", icon: <TrendingUp size={20} />, path: "/growth-prediction" },
            { label: "Soil Analysis", icon: <FlaskConical size={20} />, path: "/soil-analysis" },
            { label: "Yield Forecast", icon: <CloudSun size={20} />, path: "/yield-forecast" },
          ]
        }
      ];
    } else if (role === 'buyer') {
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

  const backgroundImages = {
    seller: `
      linear-gradient(
        rgba(0, 0, 0, 0.85), 
        rgba(20, 40, 30, 0.9)
      ),
      url('https://img.freepik.com/premium-photo/modern-agricultural-machine-with-data-connections-field-showcase-use-modern-technology-data-connections-agriculture_38013-10447.jpg')`,
    default: `
      linear-gradient(
        rgba(0, 0, 0, 0.85), 
        rgba(20, 40, 30, 0.9)
      ),
      url('https://media.gettyimages.com/id/1557452514/video/a-time-lapse-of-a-fern-plant-growing-concept-with-alpha-map-on-black-background.jpg?s=640x640&k=20&c=QZztVYhiYdHf7_JwyqwuOnNLuIdfuueXI0k-uvdCC_o=')`,
  };

  const backgroundImage =
    role === "seller" ? backgroundImages.seller : backgroundImages.default;

  return (
    <>
      <button
        aria-controls="sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-500"
        onClick={toggleSidebar}
      >
        <span className="sr-only">Open sidebar</span>
        <Menu className="w-6 h-6" />
      </button>

      <aside
        id="sidebar"
        className={`fixed top-0 left-0 z-40 h-screen flex flex-col transition-transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 w-[280px] py-6 px-4 text-white shadow-2xl border-r border-white/10 backdrop-blur-xl`}
        aria-label="Sidebar"
        style={{
          backgroundImage,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="flex items-center justify-center mb-10">
          <Image
            src={Logo}
            height={50}
            width={180}
            alt="Agro Mart Logo"
            className="hover:scale-105 transition-transform duration-300 drop-shadow-lg"
          />
        </div>

        <div className="flex-1 overflow-y-auto space-y-8 custom-scrollbar">
          {menuGroups.map((group, groupIndex) => (
            <div key={groupIndex}>
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 px-2">
                {group.title}
              </h3>
              <ul className="space-y-1">
                {group.items.map((item, index) => (
                  <li key={index}>
                    <Link href={item.path}>
                      <div
                        className={`flex items-center gap-3 p-2.5 rounded-lg transition-all duration-200 group ${typeof window !== "undefined" &&
                          window.location.pathname === item.path
                          ? "bg-emerald-600 text-white shadow-md"
                          : "text-gray-300 hover:bg-white/10 hover:text-white"
                          }`}
                      >
                        <div className={`${typeof window !== "undefined" && window.location.pathname === item.path ? "text-white" : "text-emerald-400 group-hover:text-emerald-300"
                          }`}>
                          {item.icon}
                        </div>
                        <span className="text-sm font-medium">{item.label}</span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 pt-4 mt-4">
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="flex items-center justify-center gap-3 p-3 w-full rounded-lg bg-red-500/20 text-red-200 hover:bg-red-500 hover:text-white transition-all duration-300 border border-red-500/30 hover:border-red-500"
          >
            <LogOut size={20} />
            <span className="text-sm font-medium">Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
