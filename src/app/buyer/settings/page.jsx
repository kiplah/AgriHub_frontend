"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "@/reducers/Auth/authSlice";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Lock,
  Camera,
  Save,
  Edit3,
  Globe,
  DollarSign,
  Eye,
  EyeOff,
  CheckCircle2,
  Settings
} from "lucide-react";
import { toast } from 'react-toastify';

export default function SettingsPage() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Profile data state
  const [profileData, setProfileData] = useState({
    profilePicture: "",
    username: "",
    email: "",
    phone: "",
    address: "",
    language: "English",
    currency: "KES",
  });

  const [editableInfo, setEditableInfo] = useState({ ...profileData });

  // Sync Redux user details on mount/load
  useEffect(() => {
    if (user) {
      // Load local-only metadata from localStorage
      const localMeta = localStorage.getItem("buyer_profile_meta");
      let parsedMeta = {};
      if (localMeta) {
        try {
          parsedMeta = JSON.parse(localMeta);
        } catch (e) {
          console.error("Failed to parse local profile metadata:", e);
        }
      }

      const initialData = {
        profilePicture: parsedMeta.profilePicture || "",
        username: user.username || user.name || "",
        email: user.email || "",
        phone: parsedMeta.phone || "+254 700 000 000",
        address: parsedMeta.address || "Nairobi, Kenya",
        language: parsedMeta.language || "English",
        currency: parsedMeta.currency || "KES",
      };

      setProfileData(initialData);
      setEditableInfo(initialData);
    }
  }, [user]);

  const handleEditToggle = async () => {
    if (isEditing) {
      // Save changes
      try {
        const userId = user?.userId || user?.id || (typeof window !== "undefined" ? localStorage.getItem("userId") : null);
        if (userId) {
          // 1. Dispatch update to backend for user model fields
          await dispatch(updateUser({
            userId,
            userData: {
              username: editableInfo.username,
              email: editableInfo.email
            }
          })).unwrap();
        }

        // 2. Persist local-only fields to localStorage
        const localMeta = {
          profilePicture: editableInfo.profilePicture,
          phone: editableInfo.phone,
          address: editableInfo.address,
          language: editableInfo.language,
          currency: editableInfo.currency,
        };
        localStorage.setItem("buyer_profile_meta", JSON.stringify(localMeta));

        // 3. Update local state
        setProfileData(editableInfo);
        toast.success("Profile settings updated successfully.", {
          position: "top-right",
          autoClose: 3000,
        });
      } catch (err) {
        toast.error(err?.message || "Failed to update profile settings.");
        return;
      }
    }
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableInfo({ ...editableInfo, [name]: value });
  };

  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (readerEvent) => {
        setEditableInfo({ ...editableInfo, profilePicture: readerEvent.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const userInitials = (profileData.username || "Buyer")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="space-y-6">
      {/* Header section */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Settings className="text-emerald-600 w-6 h-6 animate-spin-slow" />
          Account Settings
        </h1>
        <p className="text-sm text-gray-500 mt-1">Manage your account information, preferences, and details</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Column 1: Profile Summary Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col items-center text-center h-full relative group">
            
            <div className="relative mt-4 mb-5">
              {editableInfo.profilePicture ? (
                <img
                  src={editableInfo.profilePicture}
                  alt="Profile"
                  className="w-28 h-28 rounded-full border-4 border-emerald-500/10 shadow-md object-cover bg-gray-50"
                />
              ) : (
                <div className="w-28 h-28 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-extrabold text-3xl border-4 border-emerald-500/10 shadow-md">
                  {userInitials}
                </div>
              )}
              
              {isEditing && (
                <label className="absolute bottom-1 right-1 bg-emerald-600 hover:bg-emerald-700 p-2.5 rounded-full shadow-md cursor-pointer transition-colors border-2 border-white">
                  <Camera size={14} className="text-white" />
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handlePictureChange}
                  />
                </label>
              )}
            </div>

            <h3 className="font-extrabold text-gray-900 text-lg">{profileData.username}</h3>
            <p className="text-xs text-gray-400 mt-0.5">{profileData.email}</p>

            <span className="mt-4 bg-emerald-50 text-emerald-700 border border-emerald-100 px-3.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5">
              <CheckCircle2 size={12} className="text-emerald-600" />
              Verified {user?.role || "Buyer"}
            </span>

            <div className="w-full border-t border-gray-100 mt-6 pt-5 space-y-3.5 text-left text-xs text-gray-500">
              <div className="flex justify-between">
                <span>Account ID:</span>
                <span className="font-mono text-gray-800 font-medium">#{user?.userId || user?.id || (typeof window !== "undefined" ? localStorage.getItem("userId") : null) || "N/A"}</span>
              </div>
              <div className="flex justify-between">
                <span>Registered:</span>
                <span className="text-gray-800 font-medium">Active Member</span>
              </div>
            </div>
          </div>
        </div>

        {/* Column 2: Edit Form Settings Card */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-6 h-full">
            
            {/* Account Information */}
            <div>
              <h3 className="font-bold text-gray-900 text-base mb-4 border-b pb-2">Account Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">Name / Username</label>
                  <div className="relative">
                    <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      name="username"
                      value={isEditing ? editableInfo.username : profileData.username}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-50 disabled:bg-gray-50/70 disabled:text-gray-500 transition-all text-gray-700 font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">Email Address</label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={isEditing ? editableInfo.email : profileData.email}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-50 disabled:bg-gray-50/70 disabled:text-gray-500 transition-all text-gray-700 font-medium"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <h3 className="font-bold text-gray-900 text-base mb-4 border-b pb-2">Contact Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">Phone Number</label>
                  <div className="relative">
                    <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      name="phone"
                      value={isEditing ? editableInfo.phone : profileData.phone}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-50 disabled:bg-gray-50/70 disabled:text-gray-500 transition-all text-gray-700 font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">Default Delivery Address</label>
                  <div className="relative">
                    <MapPin size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      name="address"
                      value={isEditing ? editableInfo.address : profileData.address}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-50 disabled:bg-gray-50/70 disabled:text-gray-500 transition-all text-gray-700 font-medium"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Preferences */}
            <div>
              <h3 className="font-bold text-gray-900 text-base mb-4 border-b pb-2">System Preferences</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">Preferred Language</label>
                  <div className="relative">
                    <Globe size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <select
                      name="language"
                      value={isEditing ? editableInfo.language : profileData.language}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-50 disabled:bg-gray-50/70 disabled:text-gray-500 transition-all text-gray-700 font-medium appearance-none cursor-pointer"
                    >
                      <option value="English">English</option>
                      <option value="Swahili">Swahili</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">Default Currency</label>
                  <div className="relative">
                    <DollarSign size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <select
                      name="currency"
                      value={isEditing ? editableInfo.currency : profileData.currency}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-50 disabled:bg-gray-50/70 disabled:text-gray-500 transition-all text-gray-700 font-medium appearance-none cursor-pointer"
                    >
                      <option value="KES">KES (Kenyan Shilling)</option>
                      <option value="USD">USD (US Dollar)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end pt-4 border-t mt-4">
              <button
                onClick={handleEditToggle}
                className={`flex items-center gap-1.5 py-3 px-6 rounded-xl text-sm font-semibold transition active:scale-95 shadow-sm text-white ${
                  isEditing ? "bg-lime-600 hover:bg-lime-700" : "bg-emerald-600 hover:bg-emerald-700"
                }`}
              >
                {isEditing ? (
                  <>
                    <Save size={15} />
                    Save Changes
                  </>
                ) : (
                  <>
                    <Edit3 size={15} />
                    Edit Settings
                  </>
                )}
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
