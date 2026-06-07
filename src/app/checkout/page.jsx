"use client";
import { useCart } from "@/utilities/CartContext";
import React, { useState, useEffect } from "react";
import { FaTruck, FaShippingFast, FaMoneyBillWave, FaArrowLeft, FaShieldAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { saveOrder } from "@/reducers/Order/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "@/axios/config";

const Checkout = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    country: "",
    state: "",
    city: "",
    postalCode: "",
    phoneNumber: "",
    deliveryMethod: "standard",
    paymentMethod: "cash-on-delivery",
  });

  const { cartItems, clearCart } = useCart();
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const storedBuyerId = localStorage.getItem("userId");
    if (storedBuyerId) {
      setFormData((prev) => ({ ...prev, buyerId: parseInt(storedBuyerId, 10) }));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const calculateSubtotal = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const calculateTotal = () =>
    calculateSubtotal() + (formData.deliveryMethod === "express" ? 10 : 0);

  const handlePlaceOrder = async () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty. Please add items to checkout.");
      return;
    }

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.address.trim() ||
      !formData.country.trim() ||
      !formData.state.trim() ||
      !formData.city.trim() ||
      !formData.postalCode.trim() ||
      !formData.phoneNumber.trim()
    ) {
      toast.error("Please fill in all shipping details.");
      return;
    }

    let sellerId = parseInt(cartItems[0]?.sellerId, 10);
    const productId = parseInt(cartItems[0]?.id, 10);

    // Dynamic resolution of sellerId if it is missing or NaN in localStorage (e.g. from an old session)
    if (isNaN(sellerId) && !isNaN(productId)) {
      try {
        console.log(`[Checkout] sellerId is NaN. Resolving product ${productId} details to retrieve seller ID...`);
        const response = await axios.get(`/products/${productId}/`);
        sellerId = parseInt(response.data.user_id, 10);
        console.log(`[Checkout] Successfully resolved seller ID: ${sellerId}`);
      } catch (err) {
        console.error("[Checkout] Failed to fetch fallback product details:", err);
      }
    }

    if (isNaN(sellerId)) {
      toast.error("Could not resolve seller information. Please remove the item and add it back to your cart.");
      return;
    }

    const orderData = {
      buyerId: parseInt(user?.userId || localStorage.getItem("userId"), 10),
      sellerId: sellerId,
      productId: productId,
      name: formData.name,
      email: formData.email,
      shippingAddress: formData.address,
      country: formData.country,
      state: formData.state,
      city: formData.city,
      postalCode: parseInt(formData.postalCode, 10),
      phoneNumber: parseInt(formData.phoneNumber, 10),
      deliveryOption: formData.deliveryMethod,
      checkoutPrice: calculateTotal(),
      orderStatus: "pending",
      paymentMethod: formData.paymentMethod,
      time: Math.floor(Date.now() / 1000),
    };

    console.log("Order Data:", orderData);
    try {
      const response = await dispatch(saveOrder(orderData)).unwrap();
      console.log("Response from server:", response);
      toast.success("Order placed successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
      clearCart();
      setTimeout(() => {
        router.push("/products");
      }, 3000);
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("An error occurred while placing the order. Please try again later.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-50 text-gray-800 font-sans overflow-hidden">
      {/* Background soft ambient accents */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-green-500/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-4 py-12 max-w-7xl relative z-10">
        {/* Back Button */}
        <div
          className="inline-flex items-center gap-2 mb-8 cursor-pointer group text-gray-500 hover:text-green-700 transition-colors duration-200"
          onClick={() => router.back()}
        >
          <FaArrowLeft className="text-sm group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-semibold">Back to shopping</span>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column - Checkout Form */}
          <div className="lg:col-span-7 bg-white border border-gray-150 rounded-3xl p-6 sm:p-8 shadow-xl shadow-gray-200/50">
            <div className="mb-8 border-b border-gray-100 pb-6">
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-gray-900 to-green-700 bg-clip-text text-transparent">
                Secure Checkout
              </h1>
              <p className="text-sm text-gray-500 mt-2">
                Provide your shipping information and options to finalize your order.
              </p>
            </div>

            <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
              {/* Section 1: Personal Details */}
              <div className="space-y-4">
                <h2 className="text-lg font-bold text-green-700 flex items-center gap-2">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-green-600 text-white text-xs font-bold">1</span>
                  Personal Information
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. John Doe"
                      className="p-4 rounded-xl w-full bg-gray-50 text-gray-900 border border-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-600 focus:bg-white transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="e.g. john@example.com"
                      className="p-4 rounded-xl w-full bg-gray-50 text-gray-900 border border-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-600 focus:bg-white transition-all duration-200"
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Shipping Details */}
              <div className="space-y-4 pt-6 border-t border-gray-100">
                <h2 className="text-lg font-bold text-green-700 flex items-center gap-2">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-green-600 text-white text-xs font-bold">2</span>
                  Shipping Address
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">Street Address</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="e.g. 123 Farming Avenue"
                      className="p-4 rounded-xl w-full bg-gray-50 text-gray-900 border border-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-600 focus:bg-white transition-all duration-200"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">Country</label>
                      <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        placeholder="e.g. Kenya"
                        className="p-4 rounded-xl w-full bg-gray-50 text-gray-900 border border-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-600 focus:bg-white transition-all duration-200"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">State / County</label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        placeholder="e.g. Nakuru"
                        className="p-4 rounded-xl w-full bg-gray-50 text-gray-900 border border-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-600 focus:bg-white transition-all duration-200"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">City</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="e.g. Nakuru"
                        className="p-4 rounded-xl w-full bg-gray-50 text-gray-900 border border-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-600 focus:bg-white transition-all duration-200"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">Postal Code</label>
                      <input
                        type="text"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        placeholder="e.g. 20100"
                        className="p-4 rounded-xl w-full bg-gray-50 text-gray-900 border border-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-600 focus:bg-white transition-all duration-200"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">Phone Number</label>
                      <input
                        type="text"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        placeholder="e.g. 0700123456"
                        className="p-4 rounded-xl w-full bg-gray-50 text-gray-900 border border-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-600 focus:bg-white transition-all duration-200"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 3: Delivery Options */}
              <div className="space-y-4 pt-6 border-t border-gray-100">
                <h2 className="text-lg font-bold text-green-700 flex items-center gap-2">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-green-600 text-white text-xs font-bold">3</span>
                  Delivery Method
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div
                    className={`p-5 rounded-2xl border flex items-center gap-4 cursor-pointer transition-all duration-300 ${
                      formData.deliveryMethod === "standard"
                        ? "border-green-600 bg-green-50/50 shadow-[0_0_15px_rgba(22,163,74,0.06)] text-green-950"
                        : "border-gray-200 bg-white text-gray-500 hover:border-gray-300 hover:bg-gray-50/50"
                    }`}
                    onClick={() => setFormData({ ...formData, deliveryMethod: "standard" })}
                  >
                    <div className={`p-3 rounded-xl ${formData.deliveryMethod === "standard" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-400"}`}>
                      <FaTruck className="text-lg" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">Standard Delivery</h4>
                      <p className="text-xs text-gray-500 mt-0.5">Free (3-5 business days)</p>
                    </div>
                  </div>

                  <div
                    className={`p-5 rounded-2xl border flex items-center gap-4 cursor-pointer transition-all duration-300 ${
                      formData.deliveryMethod === "express"
                        ? "border-green-600 bg-green-50/50 shadow-[0_0_15px_rgba(22,163,74,0.06)] text-green-950"
                        : "border-gray-200 bg-white text-gray-500 hover:border-gray-300 hover:bg-gray-50/50"
                    }`}
                    onClick={() => setFormData({ ...formData, deliveryMethod: "express" })}
                  >
                    <div className={`p-3 rounded-xl ${formData.deliveryMethod === "express" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-400"}`}>
                      <FaShippingFast className="text-lg" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">Express Delivery</h4>
                      <p className="text-xs text-gray-500 mt-0.5">Ksh 10 Extra (Next day)</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 4: Payment Options */}
              <div className="space-y-4 pt-6 border-t border-gray-100">
                <h2 className="text-lg font-bold text-green-700 flex items-center gap-2">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-green-600 text-white text-xs font-bold">4</span>
                  Payment Method
                </h2>
                <div
                  className={`p-5 rounded-2xl border flex items-center gap-4 cursor-pointer transition-all duration-300 max-w-sm ${
                    formData.paymentMethod === "cash-on-delivery"
                      ? "border-green-600 bg-green-50/50 shadow-[0_0_15px_rgba(22,163,74,0.06)] text-green-950"
                      : "border-gray-200 bg-white text-gray-500 hover:border-gray-300 hover:bg-gray-50/50"
                  }`}
                  onClick={() => setFormData({ ...formData, paymentMethod: "cash-on-delivery" })}
                >
                  <div className={`p-3 rounded-xl ${formData.paymentMethod === "cash-on-delivery" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-400"}`}>
                    <FaMoneyBillWave className="text-lg" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Cash on Delivery</h4>
                    <p className="text-xs text-gray-500 mt-0.5">Pay with cash upon delivery</p>
                  </div>
                </div>
              </div>
            </form>
          </div>

          {/* Right Column - Sticky Order Summary */}
          <div className="lg:col-span-5 bg-white border border-gray-150 rounded-3xl p-6 sm:p-8 shadow-xl shadow-gray-200/50 lg:sticky lg:top-24">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              Order Summary
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-green-100 border border-green-200 text-green-700 font-semibold">
                {cartItems.reduce((acc, curr) => acc + curr.quantity, 0)} Items
              </span>
            </h3>

            {/* Cart Items List */}
            {cartItems.length > 0 ? (
              <div className="divide-y divide-gray-100 max-h-[350px] overflow-y-auto pr-2 mb-6 space-y-1">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4 py-4 first:pt-0 last:pb-0 items-center">
                    <img
                      src={item.image || "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=2070"}
                      alt={item.name}
                      className="w-16 h-16 rounded-xl object-cover border border-gray-100 bg-gray-50 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-sm text-gray-900 truncate">{item.name}</h4>
                      <p className="text-xs text-gray-500 mt-1">Ksh {item.price} × {item.quantity}</p>
                    </div>
                    <span className="font-bold text-sm text-gray-800 shrink-0">Ksh {item.price * item.quantity}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 text-gray-400">
                <p>Your cart is empty.</p>
              </div>
            )}

            {/* Price Breakdown */}
            <div className="border-t border-gray-100 pt-6 space-y-3 text-sm">
              <div className="flex justify-between text-gray-500">
                <span>Subtotal</span>
                <span className="font-semibold text-gray-900">Ksh {calculateSubtotal().toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Delivery Fee</span>
                <span className="font-semibold text-gray-900">
                  {formData.deliveryMethod === "express" ? "Ksh 10" : "Free"}
                </span>
              </div>
              <div className="border-t border-gray-100 pt-4 flex justify-between items-baseline">
                <span className="text-base font-bold text-gray-900">Total Amount</span>
                <div className="text-right">
                  <span className="text-2xl font-black text-green-700">Ksh {calculateTotal().toLocaleString()}</span>
                  <p className="text-[10px] text-gray-400 mt-0.5">VAT included where applicable</p>
                </div>
              </div>
            </div>

            {/* Safety badge */}
            <div className="mt-6 flex items-center justify-center gap-2 p-3 rounded-xl bg-gray-50 border border-gray-100 text-[11px] text-gray-500">
              <FaShieldAlt className="text-green-600" />
              <span>Safe & Secure checkout transaction.</span>
            </div>

            {/* Place Order CTA */}
            <button
              className="mt-6 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-4 px-6 rounded-2xl w-full shadow-lg shadow-green-600/10 active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer"
              onClick={handlePlaceOrder}
            >
              <span>Complete Order</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Checkout;
