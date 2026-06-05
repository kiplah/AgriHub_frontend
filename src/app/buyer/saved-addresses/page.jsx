"use client";
import React, { useState, useEffect } from "react";
import { 
  MapPin, 
  Plus, 
  Trash2, 
  Edit2, 
  X, 
  Phone, 
  User, 
  Landmark, 
  Building, 
  Map 
} from "lucide-react";

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

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("saved_addresses");
    if (saved) {
      try {
        setAddresses(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse saved addresses:", e);
      }
    }
  }, []);

  const saveToLocalStorage = (newAddresses) => {
    localStorage.setItem("saved_addresses", JSON.stringify(newAddresses));
  };

  const handleSave = () => {
    let updatedAddresses;
    if (selectedAddress) {
      updatedAddresses = addresses.map((address) =>
        address.id === selectedAddress.id ? { ...newAddress } : address
      );
    } else {
      updatedAddresses = [...addresses, { ...newAddress, id: Date.now() }];
    }
    setAddresses(updatedAddresses);
    saveToLocalStorage(updatedAddresses);
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
    const updatedAddresses = addresses.filter((address) => address.id !== id);
    setAddresses(updatedAddresses);
    saveToLocalStorage(updatedAddresses);
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
    <div className="space-y-6">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <MapPin className="text-emerald-600 w-6 h-6" />
            Saved Addresses
          </h1>
          <p className="text-sm text-gray-500 mt-1">Manage your delivery locations for faster checkout experiences</p>
        </div>

        <button
          onClick={() => setPopupVisible(true)}
          className="flex items-center gap-1.5 px-4 py-2.5 bg-emerald-600 text-white rounded-xl text-sm font-semibold hover:bg-emerald-700 active:scale-95 transition-all shadow-sm"
        >
          <Plus size={16} />
          Add Address
        </button>
      </div>

      {addresses.length === 0 ? (
        /* Empty State */
        <div className="h-64 flex flex-col items-center justify-center text-center bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <MapPin className="w-12 h-12 text-gray-300 mb-4 animate-bounce" />
          <h3 className="text-lg font-semibold text-gray-900">No saved addresses</h3>
          <p className="text-sm text-gray-500 mt-1 mb-6">Create a shipping profile to expedite your marketplace ordering.</p>
          <button
            className="bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 px-5 rounded-xl font-semibold transition active:scale-95 text-sm"
            onClick={() => setPopupVisible(true)}
          >
            Add New Address
          </button>
        </div>
      ) : (
        /* Addresses Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {addresses.map((address) => (
            <div
              key={address.id}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all p-6 flex flex-col justify-between h-full relative group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-emerald-50 text-emerald-700 border border-emerald-100 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                    <Landmark size={12} />
                    {address.name || "Address"}
                  </span>
                </div>

                <div className="space-y-2.5 text-sm text-gray-600">
                  <p className="flex items-start gap-2">
                    <Building size={16} className="text-gray-400 shrink-0 mt-0.5" />
                    <span>{address.addressLine}</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <Map size={16} className="text-gray-400 shrink-0 mt-0.5" />
                    <span>{address.city}, {address.state} {address.zipCode && `- ${address.zipCode}`}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone size={16} className="text-gray-400 shrink-0" />
                    <span>{address.phone}</span>
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-6 border-t pt-4">
                <button
                  className="flex items-center justify-center gap-1 py-2 px-3 border border-gray-200 text-gray-600 hover:text-gray-950 hover:bg-gray-50 rounded-xl text-xs font-semibold transition-all active:scale-[0.98]"
                  onClick={() => handleEdit(address)}
                >
                  <Edit2 size={13} />
                  Edit
                </button>
                <button
                  className="flex items-center justify-center gap-1 py-2 px-3 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl text-xs font-semibold transition-all active:scale-[0.98]"
                  onClick={() => handleDelete(address.id)}
                >
                  <Trash2 size={13} />
                  Delete
                </button>
              </div>
            </div>
          ))}

          {/* Add card layout */}
          <div 
            onClick={() => setPopupVisible(true)}
            className="border-2 border-dashed border-gray-200 bg-gray-50/30 hover:bg-gray-50 hover:border-emerald-300 rounded-2xl p-6 transition-all duration-300 flex flex-col items-center justify-center cursor-pointer min-h-[220px] group"
          >
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-100 group-hover:text-emerald-700 transition-colors">
              <Plus size={24} />
            </div>
            <span className="text-sm font-bold text-gray-600 group-hover:text-gray-900 mt-3">Add New Address</span>
          </div>
        </div>
      )}

      {/* Modal Dialog */}
      {isPopupVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full relative border border-gray-100 animate-in fade-in zoom-in-95 duration-200">
            <button
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
              onClick={closePopup}
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-gray-900 text-lg font-bold mb-1">
              {selectedAddress ? "Edit Saved Address" : "Add New Address"}
            </h2>
            <p className="text-xs text-gray-400 mb-5">Provide accurate delivery details for standard shipping</p>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">Address Nickname</label>
                <input
                  type="text"
                  name="name"
                  placeholder="e.g. Home, Office, Farm"
                  value={newAddress.name}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-50 transition-all text-gray-700"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">Street Address</label>
                <input
                  type="text"
                  name="addressLine"
                  placeholder="Street and house number"
                  value={newAddress.addressLine}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-50 transition-all text-gray-700"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">City</label>
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={newAddress.city}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-50 transition-all text-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">State / Province</label>
                  <input
                    type="text"
                    name="state"
                    placeholder="State"
                    value={newAddress.state}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-50 transition-all text-gray-700"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">Zip / Postal Code</label>
                  <input
                    type="text"
                    name="zipCode"
                    placeholder="Zip code"
                    value={newAddress.zipCode}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-50 transition-all text-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">Phone Contact</label>
                  <input
                    type="text"
                    name="phone"
                    placeholder="Phone number"
                    value={newAddress.phone}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-50 transition-all text-gray-700"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6 border-t pt-5">
              <button
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-semibold transition active:scale-95 shadow-sm"
                onClick={handleSave}
              >
                Save Location
              </button>
              <button
                className="w-full py-2.5 border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-xl text-sm font-semibold transition active:scale-95"
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
