"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendContactMessage } from "@/reducers/Contact/contactSlice";
import { 
  LifeBuoy, 
  User, 
  Mail, 
  Phone, 
  MessageSquare, 
  Send, 
  Clock, 
  MapPin, 
  AlertCircle, 
  CheckCircle2, 
  HelpCircle 
} from "lucide-react";
import { toast } from "react-toastify";

export default function ContactUs() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { loading, success, error } = useSelector((state) => state.contact);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    message: "",
  });

  // Pre-fill user data if authenticated
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.username || user.name || "",
        email: user.email || "",
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.number || !formData.message) {
      toast.error("Please fill in all required fields.");
      return;
    }
  
    const formattedData = {
      name: formData.name,
      email: formData.email,
      number: Number(formData.number),
      message: formData.message,
    };
    
    try {
      await dispatch(sendContactMessage(formattedData)).unwrap();
      toast.success("Support message sent successfully.");
      setFormData((prev) => ({
        ...prev,
        number: "",
        message: "",
      }));
    } catch (err) {
      toast.error(err || "Failed to send support message.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header section */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <LifeBuoy className="text-emerald-600 w-6 h-6 animate-pulse" />
          Get Help & Support
        </h1>
        <p className="text-sm text-gray-500 mt-1">Have questions or need assistance? Reach out to the Agro-Mart support team</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Column 1: Contact Form (7/12 cols) */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-6">
            <div>
              <h3 className="font-bold text-gray-950 text-base mb-1">Drop Us a Message</h3>
              <p className="text-xs text-gray-400">Our support coordinators will review and respond to your inquiry</p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Full Name"
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-50 transition-all text-gray-700"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your Email Address"
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-50 transition-all text-gray-700"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">
                  Contact Number <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="number"
                    name="number"
                    required
                    value={formData.number}
                    onChange={handleChange}
                    placeholder="Your Contact Number"
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-50 transition-all text-gray-700"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">
                  Message Description <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <MessageSquare size={16} className="absolute left-3.5 top-3 text-gray-400" />
                  <textarea
                    name="message"
                    required
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe your issue or question in detail..."
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-50 transition-all text-gray-700 resize-none"
                  ></textarea>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-semibold transition active:scale-95 shadow-sm flex items-center justify-center gap-2 disabled:bg-gray-200 disabled:text-gray-400"
              >
                {loading ? (
                  <Loader2 className="animate-spin w-4 h-4" />
                ) : (
                  <>
                    <Send size={15} />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Column 2: Location Map & Contact details (5/12 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Quick Contact Details */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
            <h3 className="font-bold text-gray-950 text-base border-b pb-2">Agro-Mart Head Office</h3>
            
            <div className="space-y-3.5 text-sm text-gray-600">
              <p className="flex items-center gap-2">
                <MapPin size={16} className="text-emerald-600 shrink-0" />
                <span>Nairobi HQ, Harambee Avenue, Kenya</span>
              </p>
              <p className="flex items-center gap-2">
                <Clock size={16} className="text-emerald-600 shrink-0" />
                <span>Mon - Fri: 8:00 AM - 5:00 PM</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail size={16} className="text-emerald-600 shrink-0" />
                <span>support@agromart.co.ke</span>
              </p>
            </div>
          </div>

          {/* Map display */}
          <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-100 h-64 bg-white relative">
            <iframe
              title="AgroMart Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15955.22851458893!2d36.81722365!3d-1.286389!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10d5d5555555%3A0x5555555555555555!2sNairobi%2C%20Kenya!5e0!3m2!1sen!2ske!4v1698313779029!5m2!1sen!2ske"
              width="100%"
              height="100%"
              className="w-full h-full border-none"
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>

          {/* Quick FAQs */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-3">
            <h3 className="font-bold text-gray-950 text-sm flex items-center gap-1.5">
              <HelpCircle size={16} className="text-emerald-600" />
              Frequently Asked Questions
            </h3>
            <div className="space-y-3.5 text-xs pt-2">
              <div>
                <h4 className="font-bold text-gray-800">How long does order verification take?</h4>
                <p className="text-gray-500 mt-1">Orders are generally verified by suppliers within 1-2 hours from the checkout completion timestamp.</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-800">Can I update my shipping coordinates?</h4>
                <p className="text-gray-500 mt-1">Yes, you can edit your addresses directly under the Address profile settings panel.</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}