"use client";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateUser, registerUser } from "../../reducers/Auth/authSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserModal = ({ showModal, setShowModal, user }) => {
  const dispatch = useDispatch();
  const [role, setRole] = useState(user?.role || "Buyer");
  const [email, setEmail] = useState(""); // For new user creation
  const [password, setPassword] = useState(""); // For new user creation
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      setRole(user.role || "Buyer");
    } else {
      setRole("Buyer");
      setEmail("");
      setPassword("");
    }
  }, [user]);

  const handleRoleChange = (e) => {
    setRole(e.target.value);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (user) {
        // Update existing user role
        await dispatch(
          updateUser({ userId: user.ID, userData: { role } })
        ).unwrap();
        toast.success("User role updated successfully!", {
          position: "top-right",
          autoClose: 3000,
        });
      } else {
        // Create new user
        if (!email || !password) {
          throw new Error("Email and password are required.");
        }
        await dispatch(registerUser({ email, password, role })).unwrap();
        toast.success("User created successfully!", {
          position: "top-right",
          autoClose: 3000,
        });
      }
      setShowModal(false);
    } catch (err) {
      console.error("Error:", err);
      toast.error(err.message || "An error occurred. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
      setError(err.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-all duration-300 ${
        showModal ? "opacity-100 visible" : "opacity-0 invisible"
      } z-50`}
      aria-live="assertive"
    >
      <form
        onSubmit={handleSubmit}
        className="relative max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 space-y-6 animate-fade-in"
        aria-label={user ? "Update User Role Form" : "Create User Form"}
      >
        <button
          type="button"
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
          onClick={() => setShowModal(false)}
        >
          X
        </button>

        <h2 className="text-2xl font-bold text-center">
          {user ? "Update User Role" : "Create New User"}
        </h2>

        {error && <p className="text-red-500 text-center">{error}</p>}

        {!user && (
          <div className="space-y-2">
            <label className="block text-sm font-semibold">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-gray-100 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
        )}

        {!user && (
          <div className="space-y-2">
            <label className="block text-sm font-semibold">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-gray-100 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
        )}

        <div className="space-y-2">
          <label className="block text-sm font-semibold">Role</label>
          <select
            value={role}
            onChange={handleRoleChange}
            className="w-full p-3 bg-gray-100 rounded-lg text-black border border-gray-300 outline-none focus:ring-2 focus:ring-green-500"
            required
          >
            <option className="bg-green-800" value="Buyer">
              Buyer
            </option>
            <option className="bg-green-800" value="Seller">
              Seller
            </option>
            <option className="bg-green-800" value="Admin">
              Admin
            </option>
          </select>
        </div>

        <div className="text-right">
          <button
            type="submit"
            className={`px-6 py-3 text-lg font-bold text-white rounded-lg ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600"
            } focus:ring-4 focus:ring-green-500 transition-all`}
            disabled={loading}
          >
            {loading ? "Processing..." : user ? "Update Role" : "Create User"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserModal;
