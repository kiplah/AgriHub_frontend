"use client";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { resetPassword } from "../../reducers/Auth/authSlice";

export default function ResetPasswordPage() {
    const [formData, setFormData] = useState({
        email: "",
        code: "",
        new_password: "",
        confirm_password: ""
    });

    const dispatch = useDispatch();
    const router = useRouter();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.new_password !== formData.confirm_password) {
            toast.error("Passwords do not match.", { position: "top-right" });
            return;
        }

        try {
            await dispatch(resetPassword({
                email: formData.email,
                code: formData.code,
                new_password: formData.new_password
            })).unwrap();

            toast.success("Password reset successful! You can now login.", {
                position: "top-right",
                autoClose: 3000,
            });
            router.push("/login");
        } catch (err) {
            console.error("Reset Password Failed:", err);
            toast.error(err?.message || "Failed to reset password.", {
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
                <h2 className="text-3xl font-bold text-white mb-6 text-center">Reset Password</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-white mb-1">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-2 rounded bg-transparent border border-white/50 text-white focus:outline-none focus:border-green-400"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-white mb-1">Reset Code</label>
                        <input
                            type="text"
                            name="code"
                            value={formData.code}
                            onChange={handleChange}
                            className="w-full p-2 rounded bg-transparent border border-white/50 text-white focus:outline-none focus:border-green-400"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-white mb-1">New Password</label>
                        <input
                            type="password"
                            name="new_password"
                            value={formData.new_password}
                            onChange={handleChange}
                            className="w-full p-2 rounded bg-transparent border border-white/50 text-white focus:outline-none focus:border-green-400"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-white mb-1">Confirm New Password</label>
                        <input
                            type="password"
                            name="confirm_password"
                            value={formData.confirm_password}
                            onChange={handleChange}
                            className="w-full p-2 rounded bg-transparent border border-white/50 text-white focus:outline-none focus:border-green-400"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition duration-300 font-semibold"
                    >
                        Reset Password
                    </button>
                </form>
            </div>
        </div>
    );
}
