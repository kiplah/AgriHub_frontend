"use client";
import { useCart } from "@/utilities/CartContext";
import React, { useState, useEffect } from "react";
import { FaTruck, FaShippingFast, FaCreditCard, FaPaypal, FaMoneyBillWave, FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { saveOrder } from "@/reducers/Order/orderSlice";
import { useDispatch,useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    paymentMethod: "credit-card",
  });

  const { cartItems } = useCart();
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
    const orderData = {
      buyerId: parseInt(user?.userId || localStorage.getItem("userId"), 10),
      sellerId: parseInt(cartItems[0]?.sellerId, 10),
      productId: parseInt(cartItems[0]?.id, 10),
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
      orderStatus: "Pending",
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
    <div
      className="relative py-20 px-8"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.9)), url('https://static.vecteezy.com/system/resources/previews/001/431/110/non_2x/abstract-green-grass-in-bokeh-background-free-vector.jpg')`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="flex items-center mb-8 cursor-pointer" onClick={() => router.back()}>
        <FaArrowLeft className="text-2xl text-gray-100 hover:text-gray-300 transition-all" />
        <span className="ml-2 text-gray-100 text-lg font-semibold hover:text-gray-300 transition-all">
          Back
        </span>
      </div>
      <div className="max-w-4xl mx-auto bg-gradient-to-br from-green-900 via-emerald-700 to-lime-500 shadow-lg rounded-lg p-8 relative z-10">
        <h1 className="text-4xl font-bold mb-8 text-gray-100 text-center">
          Complete Your Purchase
        </h1>
        <p className="text-gray-200 mb-6 text-center">
          Please fill in the required details to complete your order. We ensure
          a smooth and secure checkout process for your convenience.
        </p>

        <form className="space-y-8">
          <div>
            <h2 className="text-2xl font-semibold text-gray-100 mb-4">
              Personal Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Full Name"
                className="p-4 rounded-lg w-full bg-emerald-50 text-gray-900 border border-emerald-200 focus:ring-emerald-500 focus:ring-2 focus:border-emerald-500 shadow-sm hover:shadow-lg transition-all"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email Address"
                className="p-4 rounded-lg w-full bg-emerald-50 text-gray-900 border border-emerald-200 focus:ring-emerald-500 focus:ring-2 focus:border-emerald-500 shadow-sm hover:shadow-lg transition-all"
              />
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-100 mb-4">
              Shipping Address
            </h2>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Street Address"
              className="p-4 rounded-lg w-full bg-emerald-50 text-gray-900 border border-emerald-200 focus:ring-emerald-500 focus:ring-2 focus:border-emerald-500 shadow-sm hover:shadow-lg transition-all"
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                placeholder="Country"
                className="p-4 rounded-lg w-full bg-emerald-50 text-gray-900 border border-emerald-200 focus:ring-emerald-500 focus:ring-2 focus:border-emerald-500 shadow-sm hover:shadow-lg transition-all"
              />
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                placeholder="State"
                className="p-4 rounded-lg w-full bg-emerald-50 text-gray-900 border border-emerald-200 focus:ring-emerald-500 focus:ring-2 focus:border-emerald-500 shadow-sm hover:shadow-lg transition-all"
              />
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                placeholder="City"
                className="p-4 rounded-lg w-full bg-emerald-50 text-gray-900 border border-emerald-200 focus:ring-emerald-500 focus:ring-2 focus:border-emerald-500 shadow-sm hover:shadow-lg transition-all"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <input
                type="text"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleInputChange}
                placeholder="Postal Code"
                className="p-4 rounded-lg w-full bg-emerald-50 text-gray-900 border border-emerald-200 focus:ring-emerald-500 focus:ring-2 focus:border-emerald-500 shadow-sm hover:shadow-lg transition-all"
              />
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                placeholder="Phone Number"
                className="p-4 rounded-lg w-full bg-emerald-50 text-gray-900 border border-emerald-200 focus:ring-emerald-500 focus:ring-2 focus:border-emerald-500 shadow-sm hover:shadow-lg transition-all"
              />
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-100 mb-4">
              Delivery Method
            </h2>
            <p className="text-gray-200 mb-4">
              Choose your preferred delivery option. Standard delivery is free,
              while express delivery costs an additional $10.
            </p>
            <div className="flex gap-6">
              <div
                className={`p-6 rounded-lg border flex items-center gap-4 ${
                  formData.deliveryMethod === "standard"
                    ? "border-green-700 bg-green-400 shadow-md"
                    : "bg-emerald-200"
                } cursor-pointer transition-all hover:shadow-xl`}
                onClick={() =>
                  setFormData({ ...formData, deliveryMethod: "standard" })
                }
              >
                <FaTruck className="text-xl text-emerald-700" />
                <div>
                  <h4 className="font-bold">Standard</h4>
                  <p className="text-sm">Free Delivery</p>
                </div>
              </div>
              <div
                className={`p-6 rounded-lg border flex items-center gap-4 ${
                  formData.deliveryMethod === "express"
                    ? "border-green-700 bg-green-400 shadow-md"
                    : "bg-emerald-200"
                } cursor-pointer transition-all hover:shadow-xl`}
                onClick={() =>
                  setFormData({ ...formData, deliveryMethod: "express" })
                }
              >
                <FaShippingFast className="text-xl text-emerald-700" />
                <div>
                  <h4 className="font-bold">Express</h4>
                  <p className="text-sm">$10 Extra</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-100 mb-4">
              Payment Method
            </h2>
            <p className="text-gray-200 mb-4">
              Select your payment method. We offer secure payment options for
              your convenience.
            </p>
            <div className="flex gap-6">
              
              <div
                className={`p-6 rounded-lg border flex items-center gap-4 ${
                  formData.paymentMethod === "cash-on-delivery"
                    ? "border-green-700 bg-green-400 shadow-md"
                    : "bg-emerald-200"
                } cursor-pointer transition-all hover:shadow-xl`}
                onClick={() =>
                  setFormData({ ...formData, paymentMethod: "cash-on-delivery" })
                }
              >
                <FaMoneyBillWave className="text-xl text-emerald-700" />
                <div>
                  <h4 className="font-bold">Cash on Delivery</h4>
                </div>
              </div>
            </div>
          </div>
        </form>

        <div className="mt-8 text-gray-100">
          <h3 className="text-lg font-bold mb-4">Order Summary</h3>
          <ul className="space-y-2">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="flex justify-between border-b pb-2"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-lg"
                  />
                  <span>
                    {item.name} (x{item.quantity})
                  </span>
                </div>
                <span>${item.price * item.quantity}</span>
              </li>
            ))}
          </ul>
          <div className="flex justify-between mt-4">
            <span>Subtotal:</span>
            <span>${calculateSubtotal()}</span>
          </div>
          <div className="flex justify-between mt-2">
            <span>Delivery:</span>
            <span>
              {formData.deliveryMethod === "express" ? "$10" : "Free"}
            </span>
          </div>
          <div className="flex justify-between font-bold mt-4">
            <span>Total:</span>
            <span>${calculateTotal()}</span>
          </div>
        </div>
        <button
          className="mt-6 bg-emerald-500 text-white px-6 py-3 rounded-lg w-full hover:bg-emerald-600 shadow-lg"
          onClick={handlePlaceOrder}
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Checkout;
