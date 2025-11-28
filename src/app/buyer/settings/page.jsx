"use client";
import Profile from "@/Components/ProfileCard/ProfileCard";
import React, { useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaPhone,
  FaMapMarkerAlt,
  FaEdit,
  FaSave,
  FaCamera,
  FaGlobe,
  FaMoneyBill,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

export default function CombinedDashboard() {
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [buyerInfo, setBuyerInfo] = useState({
    profilePicture: "https://via.placeholder.com/100",
    name: "John Doe",
    username: "johndoe",
    email: "john.doe@example.com",
    phone: "+1 234 567 890",
    address: "123 Main St, Springfield, USA",
    password: "********",
    language: "English",
    currency: "USD",
  });

  const [editableInfo, setEditableInfo] = useState({ ...buyerInfo });

  const handleEditToggle = () => {
    if (isEditing) {
      setBuyerInfo(editableInfo);
    }
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableInfo({ ...editableInfo, [name]: value });
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setEditableInfo({ ...editableInfo, profilePicture: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="bg-gradient-to-br from-green-900 via-emerald-700 to-lime-500 text-white min-h-screen p-6">
      <Profile />

      <div className="flex justify-center">
        <main className="w-full bg-gradient-to-br from-green-700 via-green-600 to-lime-600 shadow-xl rounded-xl p-8 mt-10 text-gray-100">
          <div className="text-center mb-8 relative">
            <img
              src={editableInfo.profilePicture}
              alt="Profile"
              className="w-28 h-28 mx-auto rounded-full border-4 border-emerald-400 shadow-lg"
            />
            {isEditing && (
              <label className="absolute top-2 right-1/2 transform translate-x-1/2 bg-emerald-500 p-2 rounded-full shadow-lg cursor-pointer hover:bg-emerald-600">
                <FaCamera className="text-white" />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleProfilePictureChange}
                />
              </label>
            )}
          </div>

          <section className="mb-8">
            <h3 className="text-2xl font-bold text-lime-200 mb-6">
              Account Information
            </h3>
            <div className="space-y-4">
              {isEditing
                ? ["name", "username", "email"].map((field) => (
                    <div key={field}>
                      <label
                        htmlFor={field}
                        className="block text-lime-100 font-medium mb-1 capitalize"
                      >
                        {field}
                      </label>
                      <input
                        type={field === "email" ? "email" : "text"}
                        name={field}
                        value={editableInfo[field]}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 rounded-lg text-gray-800 border border-lime-300 focus:ring-2 focus:ring-lime-500"
                      />
                    </div>
                  ))
                : ["name", "email"].map((field) => (
                    <div className="flex items-center space-x-4" key={field}>
                      <FaUser className="text-emerald-400 text-xl" />
                      <div>
                        <p className="text-lime-200 font-medium capitalize">
                          {field}
                        </p>
                        <p className="text-lime-100">{buyerInfo[field]}</p>
                      </div>
                    </div>
                  ))}
            </div>
          </section>

          <section className="mb-8">
            <h3 className="text-2xl font-bold text-lime-200 mb-6">
              Contact Information
            </h3>
            <div className="space-y-4">
              {isEditing
                ? ["phone", "address"].map((field) => (
                    <div key={field}>
                      <label
                        htmlFor={field}
                        className="block text-lime-100 font-medium mb-1 capitalize"
                      >
                        {field}
                      </label>
                      <input
                        type="text"
                        name={field}
                        value={editableInfo[field]}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 rounded-lg text-gray-800 border border-lime-300 focus:ring-2 focus:ring-lime-500"
                      />
                    </div>
                  ))
                : ["phone", "address"].map((field) => (
                    <div className="flex items-center space-x-4" key={field}>
                      <FaPhone className="text-emerald-400 text-xl" />
                      <div>
                        <p className="text-lime-200 font-medium capitalize">
                          {field}
                        </p>
                        <p className="text-lime-100">{buyerInfo[field]}</p>
                      </div>
                    </div>
                  ))}
            </div>
          </section>

          <section className="mb-8">
            <h3 className="text-2xl font-bold text-lime-200 mb-6">Security</h3>
            <div className="flex items-center space-x-4">
              <FaLock className="text-emerald-400 text-xl" />
              <div className="flex items-center w-full">
                <input
                  type={showPassword ? "text" : "password"}
                  value={buyerInfo.password}
                  readOnly
                  className="w-full px-4 py-2 rounded-lg bg-lime-200 text-gray-800"
                />
                <button
                  onClick={togglePasswordVisibility}
                  className="ml-2 text-lime-300 hover:text-lime-400"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
          </section>

          <div className="flex justify-end mt-6">
            <button
              className={`px-6 py-3 rounded-lg shadow-md font-medium flex items-center space-x-2 ${
                isEditing
                  ? "bg-lime-500 hover:bg-lime-600 text-white"
                  : "bg-emerald-500 hover:bg-emerald-600 text-white"
              }`}
              onClick={handleEditToggle}
            >
              {isEditing ? (
                <>
                  <FaSave />
                  <span>Save</span>
                </>
              ) : (
                <>
                  <FaEdit />
                  <span>Edit</span>
                </>
              )}
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
