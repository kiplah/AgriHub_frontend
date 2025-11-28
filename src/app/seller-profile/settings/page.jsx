"use client";
import Profile from "@/Components/ProfileCard/ProfileCard";
import React, { useState } from "react";
import {
  FaUser,
  FaMapMarkerAlt,
  FaCheckCircle,
  FaClipboard,
  FaTags,
  FaEdit,
  FaSave,
  FaCamera,
} from "react-icons/fa";

export default function CombinedDashboard() {
  const [isEditing, setIsEditing] = useState(false);

  const [sellerInfo, setSellerInfo] = useState({
    profilePicture: "https://via.placeholder.com/100",
    store_name: "Agro Mart",
    location: "Lahore",
    availible: "Available in Lahore",
    description: "We provide high-quality agricultural products.",
    category: ["Machines", "Crops", "Seeds", "Pesticides"],
  });

  const [editableInfo, setEditableInfo] = useState({ ...sellerInfo });

  // Icon Mapping
  const fieldIcons = {
    store_name: FaUser,
    location: FaMapMarkerAlt,
    availible: FaCheckCircle,
    description: FaClipboard,
    categories: FaTags,
  };

  const handleEditToggle = () => {
    if (isEditing) {
      setSellerInfo(editableInfo);
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
            <h3 className="text-2xl font-bold text-lime-200 mb-6">Store Information</h3>
            <div className="space-y-4">
              {["store_name", "location", "availible", "description"].map((field) => {
                const Icon = fieldIcons[field]; 
                return (
                  <div key={field}>
                    {isEditing ? (
                      <>
                        <label
                          htmlFor={field}
                          className="block text-lime-100 font-medium mb-1 capitalize flex items-center space-x-2"
                        >
                          <Icon className="text-emerald-400" />
                          <span>{field.replace("_", " ")}</span>
                        </label>
                        <input
                          type="text"
                          name={field}
                          value={editableInfo[field]}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 rounded-lg text-gray-800 border border-lime-300 focus:ring-2 focus:ring-lime-500"
                        />
                      </>
                    ) : (
                      <div className="flex items-center space-x-4">
                        <Icon className="text-emerald-400 text-xl" />
                        <div>
                          <p className="text-lime-200 font-medium capitalize">
                            {field.replace("_", " ")}
                          </p>
                          <p className="text-lime-100">{sellerInfo[field]}</p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}

              <div>
                <label
                  htmlFor="categories"
                  className="block text-lime-100 font-medium mb-1 capitalize flex items-center space-x-2"
                >
                  <FaTags className="text-emerald-400" />
                  <span>Categories</span>
                </label>
                {isEditing ? (
                  <textarea
                    name="categories"
                    value={editableInfo.category.join(", ")}
                    onChange={(e) =>
                      setEditableInfo({
                        ...editableInfo,
                        category: e.target.value.split(",").map((cat) => cat.trim()),
                      })
                    }
                    className="w-full px-4 py-2 rounded-lg text-gray-800 border border-lime-300 focus:ring-2 focus:ring-lime-500"
                    rows="3"
                  />
                ) : (
                  <div className="flex items-center space-x-4">
                    <FaTags className="text-emerald-400 text-xl" />
                    <div>
                      <ul className="list-disc list-inside text-lime-100">
                        {sellerInfo.category.map((cat, index) => (
                          <li key={index}>{cat}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>

          <div className="flex justify-end mt-6">
            <button
              className={`px-6 py-3 rounded-lg shadow-md font-medium flex items-center space-x-2 ${isEditing
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
