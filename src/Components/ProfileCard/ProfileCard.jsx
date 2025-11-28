"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import ProfileImage from "../../assets/images/blank.png";
import { logout } from "../../reducers/Auth/authSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const user = useSelector((state) => state.auth.user);
  const role = useSelector((state) => state.auth.role);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = async () => {
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
    }
  };

  return (
    <div className="relative bg-gradient-to-br from-green-900 via-emerald-700 to-lime-500 shadow-xl px-6 py-8 rounded-[32px] flex flex-col md:flex-row items-center justify-between backdrop-blur-lg border border-green-400/30 overflow-hidden">
      <div className="absolute inset-0 rounded-[32px] bg-gradient-to-r from-lime-400 via-green-500 to-emerald-500 opacity-20 blur-lg pointer-events-none"></div>

      <h1 className="relative z-10 text-3xl md:text-4xl font-bold text-white drop-shadow-lg mb-4 md:mb-0">
        Welcome, {user?.username || "Guest"}!
      </h1>

      <div className="relative z-10 flex items-center gap-4">
        <Image
          src={ProfileImage}
          alt="Profile"
          height={60}
          width={60}
          className="rounded-full border-4 border-lime-300 shadow-lg group-hover:shadow-xl transition-shadow duration-300"
        />

        <div>
          <div className="flex items-center gap-3">
            <button
              onClick={toggleDropdown}
              id="dropdownDefaultButton"
              type="button"
              className="flex items-center text-base font-medium text-white hover:text-lime-300 transition"
            >
              {user?.username || "N"}
              <svg
                className={`w-4 h-4 ms-3 transform transition-transform ${
                  isDropdownOpen ? "rotate-180" : "rotate-0"
                }`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>

            <div
              id="dropdown"
              className={`${
                isDropdownOpen ? "visible opacity-100" : "invisible opacity-0"
              } absolute top-14 right-0 z-20 bg-white transition-opacity duration-300 divide-y divide-gray-100 rounded-lg shadow-lg w-32`}
            >
              <ul className="py-2 text-sm text-gray-700">
                <li>
                  <span
                    onClick={handleLogout}
                    className="block px-4 py-2 hover:bg-green-50 hover:text-green-600 cursor-pointer transition"
                  >
                    Logout
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <p className="text-sm font-normal text-lime-300 mt-1">
            {role || "Role not assigned"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
