"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FaBox,
  FaMoneyBill,
  FaChartLine,
  FaTruck,
  FaTools,
  FaSignOutAlt,
  FaTractor,
  FaHome,
  FaShippingFast,
  FaHistory,
  FaAddressBook,
  FaCog,
  FaComments,

} from "react-icons/fa";

import Logo from "../../assets/images/logo.png";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { logout } from "@/reducers/Auth/authSlice";
const Sidebar = ({ role }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const dispatch = useDispatch();

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
  

  const menuLists = {
    seller: [
      {
        label: "My Products",
        icon: <FaBox />,
        path: "/seller-profile/my-products",
      },
      { label: "Orders", icon: <FaTruck />, path: "/seller-profile/orders" },
      {
        label: "Earnings",
        icon: <FaMoneyBill />,
        path: "/seller-profile/earnings",
      },
      {
        label: "Analytics",
        icon: <FaChartLine />,
        path: "/seller-profile/analytics",
      },
      
      {
        label: "Support",
        icon: <FaTools />,
        path: "/seller-profile/support",
      },
    ],
    buyer: [
      { label: "Orders", icon: <FaTractor />, path: "/buyer/orders" },
      {
        label: "Order Tracking",
        icon: <FaShippingFast />,
        path: "/buyer/track-order",
      },
      {
        label: "Purchase History",
        icon: <FaHistory />,
        path: "/buyer/purchase-history",
      },
      {
        label: "Saved Addresses",
        icon: <FaAddressBook />,
        path: "/buyer/saved-addresses",
      },
      { label: "Support", icon: <FaCog />, path: "/buyer/support" },
    ],

  };

  const menuItems = menuLists[role] || [];

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
        rgba(0, 0, 0, 0.8), 
        rgba(34, 49, 63, 0.7)
      ),
      url('https://img.freepik.com/premium-photo/modern-agricultural-machine-with-data-connections-field-showcase-use-modern-technology-data-connections-agriculture_38013-10447.jpg')`,
    default: `
      linear-gradient(
        rgba(0, 0, 0, 0.8), 
        rgba(34, 49, 63, 0.7)
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
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-green-500"
        onClick={toggleSidebar}
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        id="sidebar"
        className={`fixed top-0 left-0 z-40 h-screen flex flex-col transition-transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 w-[300px] py-6 px-4  text-white shadow-lg border-r border-green-700 backdrop-blur-xl`}
        aria-label="Sidebar"
        style={{
          backgroundImage,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="flex items-center justify-center mb-8">
          <Image
            src={Logo}
            height={60}
            width={200}
            alt="Agro Mart Logo"
            className="hover:scale-110 transition-transform duration-300"
          />
        </div>

        <Link href="/" passHref>
          <div className="rounded-lg text-lg font-semibold py-4 px-4 flex items-center gap-4 bg-gradient-to-br from-green-600 via-yellow-500 to-brown-500 text-white hover:bg-gradient-to-tl hover:from-brown-500 hover:via-yellow-600 hover:to-green-700 transition-all duration-300 shadow-xl transform hover:scale-105">
            <FaHome className="text-2xl" />
            Dashboard
          </div>
        </Link>

        <ul className="space-y-4 mt-16">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link href={item.path}>
                <div
                  className={`flex items-center gap-4 p-4 rounded-lg transition-all duration-300 ${
                    typeof window !== "undefined" &&
                    window.location.pathname === item.path
                      ? "bg-green-500 text-yellow-200 shadow-lg"
                      : "bg-green-500 hover:bg-green-800 text-white"
                  }`}
                >
                  <div className="text-2xl">{item.icon}</div>
                  <span className="text-lg font-medium">{item.label}</span>
                  
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <div className="border-t border-green-700 my-4"></div>

        <div className="mt-auto">
          <button
           onClick={handleLogout}
           disabled={isLoggingOut}
            className="flex items-center justify-center gap-4 p-4 w-full rounded-lg bg-red-500 text-white hover:bg-red-700 transition-all duration-300 shadow-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
              />
            </svg>
            <span className="text-lg font-medium">Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
