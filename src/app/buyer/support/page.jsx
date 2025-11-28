"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendContactMessage, resetState } from "@/reducers/Contact/contactSlice";
import Profile from "@/Components/ProfileCard/ProfileCard";

const ContactUs = () => {
  
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.contact);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formattedData = {
      name: formData.name,
      email: formData.email,
      number: Number(formData.number),
      message: formData.message,
    };
    
    console.log("Sending data:", formattedData);
    dispatch(sendContactMessage(formattedData));
  };

  return (
    <div
      className="relative  overflow-auto p-6"
      style={{
        backgroundImage:
          "url('https://png.pngtree.com/thumb_back/fh260/background/20241115/pngtree-happy-vietnamese-farmers-planting-rice-paddy-in-lush-green-field-image_16603887.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative z-10 text-white">
        <Profile />
        <div className="py-12">
          <div className="container mx-auto px-6 lg:px-20 text-center mb-12">
            <h1 className="text-5xl font-extrabold text-green-300 mb-4 drop-shadow-lg">
              Contact Us
            </h1>
            <p className="text-lg text-green-200 mb-10 max-w-2xl mx-auto">
              Have questions, need support, or want to collaborate? Reach out to us!
              Use the form below to send us a message, or find our location on the map.
            </p>
          </div>
          <div className="container mx-auto px-6 lg:px-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="bg-black/40 shadow-lg rounded-xl p-8">
                <h2 className="text-3xl font-bold mb-6 text-green-300">Drop Us a Message</h2>
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div>
                    <label className="block text-green-200 font-medium mb-1">Name <span className="text-red-400">*</span></label>
                    <input
                      type="text"
                      name="name"
                      className="w-full border-b-2 bg-transparent border-green-300 focus:border-green-500 text-white py-3 px-1"
                      placeholder="Your Full Name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block text-green-200 font-medium mb-1">Email <span className="text-red-400">*</span></label>
                    <input
                      type="email"
                      name="email"
                      className="w-full border-b-2 bg-transparent border-green-300 focus:border-green-500 text-white py-3 px-1"
                      placeholder="Your Email Address"
                      required
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block text-green-200 font-medium mb-1">Number <span className="text-red-400">*</span></label>
                    <input
                      type="number"
                      name="number"
                      className="w-full border-b-2 bg-transparent border-green-300 focus:border-green-500 text-white py-3 px-1"
                      placeholder="Your Contact Number"
                      required
                      value={formData.number}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block text-green-200 font-medium mb-1">Message <span className="text-red-400">*</span></label>
                    <textarea
                      name="message"
                      rows="4"
                      className="w-full border-b-2 bg-transparent border-green-300 focus:border-green-500 text-white py-3 px-1"
                      placeholder="Write your message here..."
                      required
                      value={formData.message}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-xl shadow-lg transition-all hover:scale-105"
                    disabled={loading}
                  >
                    {loading ? "Sending..." : "Send Message"}
                  </button>
                  {success && <p className="text-green-400 text-center mt-4">Message sent successfully!</p>}
                  {error && <p className="text-red-400 text-center mt-4">Error: {error}</p>}
                </form>
              </div>
              <div className="rounded-lg overflow-hidden shadow-lg">
                <iframe
                  title="AgroMart Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.835434509586!2d-122.42189568468104!3d37.77492967975925!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858103c8f9c7c5%3A0x59d7d8d5635a5ba9!2sSan%20Francisco%2C%20CA%2C%20USA!5e0!3m2!1sen!2sin!4v1698313779029!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  className="w-full h-full min-h-[450px]"
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;