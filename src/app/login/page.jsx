"use client";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginUser } from "../../reducers/Auth/authSlice";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const router = useRouter();

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Please fill in both email and password.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    const loginData = {
      email: formData.email.trim(),
      password: formData.password.trim(),
    };

    try {
      const result = await dispatch(loginUser(loginData)).unwrap();
      console.log("Login successful, response:", result);

      const { role } = result;
      toast.success("Login successful! Redirecting...", {
        position: "top-right",
        autoClose: 3000,
      });

      const normalizedRole = role.toLowerCase();
      if (normalizedRole === "admin") {
        router.push("/admin");
      } else if (normalizedRole === "buyer") {
        router.push("/buyer");
      } else if (normalizedRole === "seller") {
        router.push("/seller-profile");
      } else {
        toast.error("Unauthorized role. Please contact support.", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (err) {
      console.error("Login failed:", err);
      // Extract error message from backend response
      const errorMessage = err?.response?.data?.message || err?.message || "Login failed. Please check your credentials.";
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const formVariants = {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 50 },
  };

  return (
    <div className="min-h-screen relative overflow-hidden font-sans bg-gray-900">
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed filter brightness-50"
        style={{
          backgroundImage:
            "url('https://images6.alphacoders.com/134/thumb-1920-1347850.png')",
        }}
      ></div>
      <div className="absolute inset-0 z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-800/30 to-black opacity-80"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 to-transparent opacity-40 animate-gradient-x"></div>
      </div>

      <div className="relative z-20 pt-30 my-8 flex flex-col items-center justify-center min-h-[80vh]">
        <motion.div
          className="bg-gradient-to-r from-white/10 to-transparent backdrop-blur-sm border border-white/18 rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] p-8 max-w-[400px] w-full text-center space-y-8 transform hover:shadow-xl transition-shadow"
          variants={formVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <h2 className="text-3xl text-green-400 font-extrabold">Welcome Back!</h2>
          <p className="text-white">Log in to access your account.</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-left text-white font-medium mb-1">
                Email Address
              </label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full text-gray-800 bg-transparent border-b-2 border-white shadow-4xl focus:py-2 focus:outline-none"
              />
            </div>

            <div className="relative">
              <label className="block text-left text-white font-medium mb-1">
                Password
              </label>
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleInputChange}
                className="w-full text-gray-800 bg-transparent border-b-2 border-white shadow-3xl focus:py-2 focus:outline-none"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none"
                aria-label={showPassword ? "Hide Password" : "Show Password"}
              >
                {showPassword ? (
                  <FaEyeSlash size={24} color="white" />
                ) : (
                  <FaEye size={24} color="white" />
                )}
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-green-600 to-green-400 text-white font-semibold rounded-md shadow hover:bg-green-600 focus:ring-2 focus:ring-green-500 transition-transform transform hover:scale-105"
            >
              Log In
            </button>
          </form>

          <div className="flex justify-between items-center text-sm text-white">
            <Link href="#" className="hover:text-green-500">
              Forgot Password?
            </Link>
            <Link href="/signup" className="hover:text-green-500">
              Create an Account
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
