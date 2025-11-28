'use client';
import React, { useState } from 'react';
import { FaTruck, FaCog, FaSeedling, FaCogs, FaUserAlt, FaHome, FaWarehouse, FaBars, FaTimes,FaThLarge } from "react-icons/fa";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Logo from "../../assets/images/logo.png";
import { logout } from '../../reducers/Auth/authSlice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const AdminSidebar = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };
  const router = useRouter();

  const dispatch = useDispatch();

  const handleSignOut = async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);

    try {
      const result = await dispatch(logout()).unwrap();
      if (result) {
        toast.success("Logged out successfully!", {
          position: "top-right",
          autoClose: 3000,
        });

        setTimeout(() => {
          router.push('/login');
        }, 3000);
      }
    } catch (error) {
      console.error("Error during logout:", error);
      toast.error("Failed to log out. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setIsLoggingOut(false);
    }
  };
  const menuItems = [
    { label: "Categories", icon: <FaThLarge />, path: "/admin/categories" },
    { label: "Machines", icon: <FaCogs />, path: "/admin/machines" },
    { label: "Seeds", icon: <FaSeedling />, path: "/admin/seeds" },
    { label: "Fertilizers", icon: <FaWarehouse />, path: "/admin/fertilizer" },
    { label: "Pesticides", icon: <FaCog />, path: "/admin/pesticides" },
    { label: "Rentals", icon: <FaTruck />, path: "/admin/rentals" },
    { label: "Users", icon: <FaUserAlt />, path: "/admin/users" },
  ];

  return (
    <>
    
    <div className='md:hidden w-full h-[70px] z-30'></div>
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={toggleSidebar}
          className="p-2 text-white bg-green-600 rounded-md shadow-md hover:bg-green-700 transition-all"
        >
          {isSidebarVisible ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      <aside
        className={`fixed top-0 left-0 z-40 h-screen md:w-80 bg-gradient-to-b from-green-100 to-green-300 shadow-lg  transform transition-transform duration-300 ${
          isSidebarVisible ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0`}
      >
        <div className="py-6 px-4">
          <div className="flex items-center">
            <Image src={Logo} alt="logo" />
          </div>
        </div>

        <Link href="/admin" passHref>
          <div className="rounded-lg w-[90%] m-auto text-lg font-semibold py-4 px-4 flex items-center gap-4 bg-green-600 text-white hover:bg-green-700 transition-all duration-300 shadow-xl transform hover:scale-105">
            <FaHome className="text-2xl" />
            Dashboard
          </div>
        </Link>

        <nav className="flex-1 mt-4">
          <ul className="space-y-2 w-[90%] mx-auto">
            {menuItems.map((item) => (
              <li key={item.path} className="group">
                <Link href={item.path}>
                  <div className="flex items-center gap-3 px-6 py-2.5 rounded-lg bg-green-400 group-hover:bg-green-400 shadow-md transition-all duration-300">
                    <span className="flex items-center justify-center w-10 h-10 rounded-full bg-green-800 text-white group-hover:bg-green-600 transition-all">
                      {item.icon}
                    </span>
                    <span className="text-lg font-bold text-white group-hover:text-white transition-all">
                      {item.label}
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="absolute bottom-4 left-0 w-full flex justify-center">
          <button
           onClick={handleSignOut}
           disabled={isLoggingOut}
            className="flex items-center justify-center gap-4 p-4 w-[90%] rounded-lg bg-red-500 text-white hover:bg-red-700 transition-all duration-300 shadow-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 text-xl font-bold"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
              />
            </svg>
            <span className="text-xl font-bold">Sign Out</span>
          </button>
        </div>
      </aside>

      {isSidebarVisible && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

export default AdminSidebar;
