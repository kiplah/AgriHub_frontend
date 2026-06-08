"use client";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaEye, FaEyeSlash, FaShoppingCart, FaStore, FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerUser, verifyEmail, resendVerificationCode, googleLoginUser } from "../../reducers/Auth/authSlice";

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
      email: formData.email.trim(),
      password: formData.password,
      username: formData.username || formData.email.split('@')[0],
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
      let errorMessage = "Registration failed. Please try again.";

      if (err?.username) {
        errorMessage = `Username: ${err.username[0]}`;
      } else if (err?.email) {
        errorMessage = `Email: ${err.email[0]}`;
      } else if (err?.password) {
        errorMessage = `Password: ${err.password[0]}`;
      } else if (err?.message) {
        errorMessage = err.message;
      } else if (typeof err === 'object') {
        // If it's a generic object, try to grab the first value
        const values = Object.values(err);
        if (values.length > 0 && Array.isArray(values[0])) {
          errorMessage = values[0][0];
        } else {
          errorMessage = JSON.stringify(err);
        }
      }

      toast.error(errorMessage, {
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

  const handleResendCode = async () => {
    try {
      await dispatch(resendVerificationCode(formData.email)).unwrap();
      toast.success("Verification code resent! Check your email.", {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (err) {
      console.error("Resend Failed:", err);
      toast.error(err?.message || "Failed to resend code.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const handleGoogleSignup = () => {
    if (!window.google) {
      toast.error("Google Identity Services script not loaded yet. Please try again.");
      return;
    }

    const role = activeForm === "buyer" ? "buyer" : "seller";
    
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
            const result = await dispatch(googleLoginUser({ accessToken, role })).unwrap();
            
            toast.success("Google registration successful! Redirecting...", {
              position: "top-right",
              autoClose: 3000,
            });
            
            const loggedInRole = result.role || role;
            const normalizedRole = loggedInRole.toLowerCase();
            
            if (normalizedRole === "admin") {
              router.push("/admin");
            } else if (normalizedRole === "buyer") {
              router.push("/buyer");
            } else if (normalizedRole === "seller") {
              router.push("/seller-profile");
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
                  className={`relative flex-1 px-4 py-2 rounded-full text-center font-semibold text-sm transition-all duration-300 ease-in-out transform flex items-center justify-center gap-2 ${activeForm === "buyer"
                    ? "bg-green-700 text-white shadow-lg scale-105"
                    : "bg-transparent text-white hover:bg-white/20"
                    }`}
                >
                  <FaShoppingCart size={20} />
                  <span>Buyer</span>
                </button>

                <button
                  onClick={() => setActiveForm("seller")}
                  className={`relative flex-1 px-4 py-2 rounded-full text-center text-sm transition-all font-bold duration-300 ease-in-out transform flex items-center justify-center gap-2 ${activeForm === "seller"
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
                      className="w-full bg-transparent text-white border-b-2 border-white shadow-4xl focus:py-2 focus:outline-none"
                      required
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
                      className="w-full bg-transparent text-white border-b-2 border-white shadow-4xl focus:py-2 focus:outline-none"
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
                      className="w-full bg-transparent text-white border-b-2 border-white shadow-4xl focus:py-2 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute bottom-2 right-3 text-white hover:text-green-700 focus:outline-none"
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
                      className="w-full bg-transparent text-white border-b-2 border-white shadow-4xl focus:py-2 focus:outline-none"
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

                <div className="relative flex py-2 items-center">
                  <div className="flex-grow border-t border-white/20"></div>
                  <span className="flex-shrink mx-4 text-white/50 text-sm font-medium">or</span>
                  <div className="flex-grow border-t border-white/20"></div>
                </div>

                <button
                  type="button"
                  onClick={handleGoogleSignup}
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
              <button onClick={handleResendCode} className="w-full mt-2 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300">
                Resend Code
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
