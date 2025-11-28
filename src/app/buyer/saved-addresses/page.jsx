"use client";
import React, { useState } from "react";
import Profile from "@/Components/ProfileCard/ProfileCard";
import { FaRegEdit, FaTrashAlt, FaTimes } from "react-icons/fa";

export default function SavedAddresses() {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [newAddress, setNewAddress] = useState({
    id: null,
    name: "",
    addressLine: "",
    city: "",
    state: "",
    zipCode: "",
    phone: "",
  });

  const handleSave = () => {
    if (selectedAddress) {
      setAddresses((prev) =>
        prev.map((address) =>
          address.id === selectedAddress.id ? { ...newAddress } : address
        )
      );
    } else {
      setAddresses((prev) => [...prev, { ...newAddress, id: prev.length + 1 }]);
    }
    closePopup();
  };

  const closePopup = () => {
    setSelectedAddress(null);
    setPopupVisible(false);
    setNewAddress({
      id: null,
      name: "",
      addressLine: "",
      city: "",
      state: "",
      zipCode: "",
      phone: "",
    });
  };

  const handleDelete = (id) => {
    setAddresses(addresses.filter((address) => address.id !== id));
  };

  const handleEdit = (address) => {
    setSelectedAddress(address);
    setNewAddress(address);
    setPopupVisible(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAddress((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-gradient-to-br from-green-900 via-emerald-700 to-lime-500 min-h-screen p-6 text-white">
      <Profile />

      <div className="text-center mt-8">
        <h1 className="text-4xl font-bold text-lime-100">Saved Addresses</h1>
        <p className="text-lg text-lime-300 mt-2">
          Manage your saved delivery addresses for seamless order delivery.
        </p>
      </div>

      {addresses.length === 0 ? (
        <div className="text-lime-100 text-center mt-10">
          <p className="text-xl">You have no saved addresses yet.</p>
          <button
            className="bg-lime-600 text-white py-3 px-6 mt-6 rounded-full hover:bg-lime-700 shadow-lg transition"
            onClick={() => setPopupVisible(true)}
          >
            Add New Address
          </button>
        </div>
      ) : (
        <div className="mt-10">
          <h2 className="text-2xl font-semibold text-lime-200 mb-6">
            Your Saved Addresses
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {addresses.map((address) => (
              <div
                key={address.id}
                className="bg-gradient-to-br from-green-700 via-green-500 to-lime-500 p-6 rounded-xl shadow-xl border border-green-400/30 hover:shadow-2xl transform hover:scale-105 transition duration-300"
              >
                <h2 className="text-2xl font-bold mb-3 text-lime-50">
                  {address.name}
                </h2>
                <p className="text-lime-200 mb-2">
                  {address.addressLine}, {address.city}, {address.state} -{" "}
                  {address.zipCode}
                </p>
                <p className="text-lime-200">
                  <span className="font-semibold text-lime-100">Phone:</span>{" "}
                  {address.phone}
                </p>
                <div className="flex gap-4 mt-5">
                  <button
                    className="flex-1 bg-green-600 text-white py-2 rounded-md shadow-md hover:bg-green-700 transition"
                    onClick={() => handleEdit(address)}
                  >
                    Edit
                  </button>
                  <button
                    className="flex-1 bg-red-600 text-white py-2 rounded-md shadow-md hover:bg-red-700 transition"
                    onClick={() => handleDelete(address.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}

            <div className="flex flex-col items-center justify-center bg-gradient-to-br from-lime-600 via-green-500 to-emerald-500 text-white rounded-xl shadow-xl p-6 hover:shadow-2xl transform hover:scale-105 transition duration-300">
              <button
                onClick={() => {
                  setNewAddress({
                    id: null,
                    name: "",
                    addressLine: "",
                    city: "",
                    state: "",
                    zipCode: "",
                    phone: "",
                  });
                  setSelectedAddress(null);
                  setPopupVisible(true);
                }}
                className="flex flex-col items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-14 h-14 mb-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                <span className="text-lg font-bold">Add New Address</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {isPopupVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-gradient-to-br from-lime-500 via-green-600 to-emerald-700 rounded-lg shadow-2xl p-6 max-w-md w-full relative">
            <button
              className="absolute top-3 right-3 text-lime-200 hover:text-white"
              onClick={closePopup}
            >
              <FaTimes size={20} />
            </button>
            <h2 className="text-lime-100 text-xl font-bold mb-5">
              {selectedAddress ? "Edit Address" : "Add New Address"}
            </h2>
            <div className="space-y-4">
              {["name", "addressLine", "city", "state", "zipCode", "phone"].map(
                (field) => (
                  <input
                    key={field}
                    type="text"
                    name={field}
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    value={newAddress[field]}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-green-400 rounded-lg bg-gradient-to-br from-green-800 via-emerald-900 to-green-700 text-lime-200 placeholder-lime-300 focus:outline-none focus:ring-2 focus:ring-lime-500"
                  />
                )
              )}
            </div>
            <div className="flex gap-4 mt-6">
              <button
                className="bg-emerald-600 text-white py-3 px-6 rounded-full hover:bg-emerald-700 transition shadow-lg"
                onClick={handleSave}
              >
                Save
              </button>
              <button
                className="bg-gray-500 text-white py-3 px-6 rounded-full hover:bg-gray-600 transition shadow-lg"
                onClick={closePopup}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
