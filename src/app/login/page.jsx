"use client";
import React, { useState, Suspense } from "react";
import { useDispatch } from "react-redux";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginUser, googleLoginUser } from "../../reducers/Auth/authSlice";

function LoginContent() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const searchParams = useSearchParams();

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
      password: formData.password,
    };

    try {
      const result = await dispatch(loginUser(loginData)).unwrap();
      console.log("Login successful, response:", result);

      const { role } = result;

      console.log("Login result:", result); // Debugging

      if (role) {
        toast.success("Login successful! Redirecting...", {
          position: "top-right",
          autoClose: 3000,
        });

        const redirectPath = searchParams.get("redirect");
        if (redirectPath) {
          router.push(redirectPath);
        } else {
          const normalizedRole = role.toLowerCase();
          if (normalizedRole === "admin") {
            router.push("/admin");
          } else if (normalizedRole === "buyer") {
            router.push("/buyer");
          } else if (normalizedRole === "seller") {
            router.push("/seller-profile");
          } else {
            toast.error(`Unknown role: ${role}`, {
              position: "top-right",
              autoClose: 3000,
            });
          }
        }
      } else {
        console.warn("Role is missing in login response:", result);
        toast.warning("Login successful, but user role is undefined. Redirecting to home.", {
          position: "top-right",
          autoClose: 3000,
        });
        router.push("/");
      }
    } catch (err) {
      console.error("Login failed:", err);
      // Extract error message from backend response
      const errorMessage = err?.message || "Login failed. Please check your credentials.";
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const handleGoogleLogin = () => {
    if (!window.google) {
      toast.error("Google Identity Services script not loaded yet. Please try again.");
      return;
    }
    
    const client = window.google.accounts.oauth2.initTokenClient({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      scope: "openid email profile",
      callback: async (response) => {
        if (response.error) {
          console.error("Google OAuth response error:", response.error);
          toast.error("Google authentication failed.");
          return;
        }
        
        const accessToken = response.access_token;
        if (accessToken) {
          try {
            const result = await dispatch(googleLoginUser({ accessToken, role: "buyer" })).unwrap();
            
            toast.success("Google Sign-In successful! Redirecting...", {
              position: "top-right",
              autoClose: 3000,
            });
            
            const { role } = result;
            const redirectPath = searchParams.get("redirect");
            if (redirectPath) {
              router.push(redirectPath);
            } else if (role) {
              const normalizedRole = role.toLowerCase();
              if (normalizedRole === "admin") {
                router.push("/admin");
              } else if (normalizedRole === "buyer") {
                router.push("/buyer");
              } else if (normalizedRole === "seller") {
                router.push("/seller-profile");
              } else {
                router.push("/");
              }
            } else {
              router.push("/");
            }
          } catch (err) {
            console.error("Google Sign-In error:", err);
            toast.error(err?.message || "Google Sign-In failed.");
          }
        }
      },
    });
    
    client.requestAccessToken();
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

          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-white/20"></div>
            <span className="flex-shrink mx-4 text-white/50 text-sm font-medium">or</span>
            <div className="flex-grow border-t border-white/20"></div>
          </div>

          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full py-3 px-4 flex items-center justify-center bg-white/10 hover:bg-white/15 text-white font-semibold rounded-md shadow-lg border border-white/20 backdrop-blur-md transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_15px_rgba(74,222,128,0.2)] focus:ring-2 focus:ring-green-400"
          >
            <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                fill="#EA4335"
              />
            </svg>
            Continue with Google
          </button>

          <div className="flex justify-between items-center text-sm text-white">
            <Link href="/forgot-password" className="hover:text-green-500">
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

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <p className="text-xl font-bold">Loading...</p>
      </div>
    }>
      <LoginContent />
    </Suspense>
  );
}
