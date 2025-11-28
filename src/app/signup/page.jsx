"use client";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaEye, FaEyeSlash, FaShoppingCart, FaStore, FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerUser, verifyEmail } from "../../reducers/Auth/authSlice";

export default function SignupPage() {
  const [activeForm, setActiveForm] = useState("buyer");
  const [showPassword, setShowPassword] = useState(false);
  const [verificationStep, setVerificationStep] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const dispatch = useDispatch();
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCodeChange = (e) => {
    setVerificationCode(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const role = activeForm === "buyer" ? "buyer" : "seller";

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    const userData = {
      email: formData.email,
      password: formData.password,
      username: formData.username || null,
      role,
    };

    try {
      const result = await dispatch(registerUser(userData)).unwrap();
      console.log("Registration Success:", result);

      toast.success("Verification email sent! Enter the code to verify.", {
        position: "top-right",
        autoClose: 3000,
      });

      // Switch to verification step
      setVerificationStep(true);
    } catch (err) {
      console.error("Registration Failed:", err);
      toast.error(err?.message || "Registration failed. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const handleVerifyEmail = async (e) => {
    e.preventDefault();

    try {
      const result = await dispatch(verifyEmail({ email: formData.email, code: verificationCode })).unwrap();

      console.log("Email Verification Success:", result);

      toast.success("Email verified! Redirecting to login...", {
        position: "top-right",
        autoClose: 3000,
      });

      router.push("/login");
    } catch (err) {
      console.error("Verification Failed:", err);
      toast.error(err?.message || "Invalid code. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const formVariants = {
    initial: { opacity: 0, y: -50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 50 },
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

      <div className="relative">
        <div className="relative z-20 pt-[30px] my-8 flex flex-col items-center justify-center min-h-[80vh]">
          {!verificationStep ? (
            <>
              <div className="flex mb-4 bg-gradient-to-r from-white/10 to-transparent backdrop-blur-sm rounded-full p-1 shadow-md relative">
                <button
                  onClick={() => setActiveForm("buyer")}
                  className={`relative flex-1 px-4 py-2 rounded-full text-center font-semibold text-sm transition-all duration-300 ease-in-out transform flex items-center justify-center gap-2 ${
                    activeForm === "buyer"
                      ? "bg-green-700 text-white shadow-lg scale-105"
                      : "bg-transparent text-white hover:bg-white/20"
                  }`}
                >
                  <FaShoppingCart size={20} />
                  <span>Buyer</span>
                </button>

                <button
                  onClick={() => setActiveForm("seller")}
                  className={`relative flex-1 px-4 py-2 rounded-full text-center text-sm transition-all font-bold duration-300 ease-in-out transform flex items-center justify-center gap-2 ${
                    activeForm === "seller"
                      ? "bg-green-700 text-white shadow-lg scale-105"
                      : "bg-transparent text-white hover:bg-white/20"
                  }`}
                >
                  <FaStore size={20} />
                  <span>Seller</span>
                </button>
              </div>

              <motion.div
            className="bg-gradient-to-r from-white/10 to-transparent backdrop-blur-sm border border-white/18 rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] space-y-4 p-8 max-w-[500px] w-full text-center space-y-2 transform hover:shadow-xl transition-shadow"
            key={activeForm}
            variants={formVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <h2 className="text-4xl font-extrabold text-green-400">
              {activeForm === "buyer" ? "Join as a Buyer" : "Join as a Seller"}
            </h2>
                <form className="space-y-3" onSubmit={handleSubmit}>
              <div>
                <label className="block text-left text-white font-semibold mb-1">
                  User Name
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="w-full text-gray-800 bg-transparent text-white border-b-2 border-white shadow-4xl focus:py-2 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-left text-blue-100 font-semibold mb-1">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full text-gray-800 bg-transparent text-white border-b-2 border-white shadow-4xl focus:py-2 focus:outline-none"
                />
              </div>
              <div className="relative">
                <label className="block text-left text-white font-semibold mb-1">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full text-gray-800 bg-transparent text-white border-b-2 border-white shadow-4xl focus:py-2 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute top-4 right-3 text-white hover:text-green-700 focus:outline-none"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <FaEyeSlash size={24} />
                  ) : (
                    <FaEye size={24} />
                  )}
                </button>
              </div>
              <div>
                <label className="block text-left text-white font-semibold mb-1">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full text-gray-800 bg-transparent text-white border-b-2 border-white shadow-4xl focus:py-2 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-10 py-3 bg-green-500 text-white font-bold rounded-lg shadow-md hover:bg-green-700 transition-transform transform hover:scale-105"
              >
                {activeForm === "buyer"
                  ? "Sign Up as Buyer"
                  : "Sign Up as Seller"}
              </button>
            </form>
            <div className="flex justify-end items-center text-sm text-blue-200">
              <Link href="/login" className="hover:text-blue-100">
                Already have an account? Log in
              </Link>
            </div>
              </motion.div>
            </>
          ) : (
            <motion.div className="bg-white p-8 rounded-md shadow-lg">
              <h2 className="text-2xl font-semibold text-green-600">
                Enter Verification Code
              </h2>
              <input
                type="text"
                value={verificationCode}
                onChange={handleCodeChange}
                className="w-full p-2 border rounded-md"
                placeholder="Enter Code"
              />
              <button onClick={handleVerifyEmail} className="w-full mt-3 py-2 bg-green-500 text-white rounded-md">
                Verify Email
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
