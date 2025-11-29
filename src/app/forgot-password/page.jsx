"use client";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { forgotPassword } from "../../reducers/Auth/authSlice";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const dispatch = useDispatch();
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(forgotPassword(email.trim())).unwrap();
            toast.success("Password reset code sent! Check your email.", {
                position: "top-right",
                autoClose: 3000,
            });
            router.push("/reset-password");
        } catch (err) {
            console.error("Forgot Password Failed:", err);
            toast.error(err?.message || "Failed to send reset code.", {
                position: "top-right",
                autoClose: 3000,
            });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 relative overflow-hidden">
            <div
                className="absolute inset-0 bg-cover bg-center bg-fixed filter brightness-50"
                style={{
                    backgroundImage:
                        "url('https://images6.alphacoders.com/134/thumb-1920-1347850.png')",
                }}
            ></div>
            <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent via-green-800/30 to-black opacity-80"></div>

            <div className="relative z-20 bg-white/10 backdrop-blur-md p-8 rounded-lg shadow-lg max-w-md w-full border border-white/20">
                <h2 className="text-3xl font-bold text-white mb-6 text-center">Forgot Password</h2>
                <p className="text-gray-200 mb-6 text-center">Enter your email address to receive a password reset code.</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-white mb-1">Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-2 rounded bg-transparent border border-white/50 text-white focus:outline-none focus:border-green-400"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition duration-300 font-semibold"
                    >
                        Send Reset Code
                    </button>
                </form>
            </div>
        </div>
    );
}
