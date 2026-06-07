'use client';
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBuyerOrders, fetchOrderDetail, deleteOrder } from "@/reducers/Order/orderSlice";
import { fetchMessages } from "@/reducers/Chat/chatSlice";
import { 
  ShoppingBag, 
  MessageSquare, 
  X, 
  MapPin, 
  Phone, 
  Mail, 
  CreditCard, 
  Clock, 
  Calendar, 
  CheckCircle2, 
  AlertCircle, 
  Trash2, 
  Send 
} from "lucide-react";

export default function Orders() {
  const dispatch = useDispatch();
  const { buyerOrders = [], loading, error } = useSelector((state) => state.orders);
  const userId = useSelector((state) => state.auth.user?.userId || state.auth.user?.id);
  const token = useSelector((state) => state.auth.token);
  
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [products, setProducts] = useState({});
  const [isChatVisible, setChatVisible] = useState(false);
  const [selectedSellerId, setSelectedSellerId] = useState(null);
  const [activeTab, setActiveTab] = useState("all");

  const [input, setInput] = useState("");
  const [ws, setWs] = useState(null);
  const [newMessage, setNewMessage] = useState(false);
  const messages = useSelector((state) => state.chat.messages || []);

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  // Helper to safely get clean image path
  const getProductImage = (product) => {
    if (!product || !product.imagepath) {
      return "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=2070&auto=format&fit=crop";
    }
    if (product.imagepath.startsWith("http")) {
      return product.imagepath;
    }
    const cleanPath = product.imagepath.replace(/^\/+/, "");
    return `http://127.0.0.1:8000/${cleanPath}`;
  };

  // Helper to format timestamps nicely
  const formatDate = (timestamp) => {
    if (!timestamp) return "N/A";
    if (!mounted) return "...";
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  // Get active status string
  const getStatusString = (order) => {
    return (order.orderStatus || order.order_status || "Pending").toLowerCase();
  };

  // Filter orders dynamically based on Django model status keys
  const completedOrders = buyerOrders.filter(order => 
    ["completed", "delivered", "cancelled", "returned"].includes(getStatusString(order))
  );
  
  const activeOrders = buyerOrders.filter(order => 
    ["pending", "processing", "shipped"].includes(getStatusString(order))
  );

  const displayedOrders = 
    activeTab === "active" ? activeOrders :
    activeTab === "completed" ? completedOrders :
    buyerOrders;

  // Initial orders fetch
  useEffect(() => {
    if (userId) {
      dispatch(fetchBuyerOrders(userId));
    }
  }, [dispatch, userId]);

  // Fetch product detail for each order
  useEffect(() => {
    const fetchProductDetails = async () => {
      const productData = {};
      for (const order of buyerOrders) {
        try {
          const response = await dispatch(fetchOrderDetail(order.id));
          if (response.meta.requestStatus === "fulfilled") {
            productData[order.id] = response.payload.Product;
          }
        } catch (err) {
          console.error("Failed to fetch product details:", err);
        }
      }
      setProducts(productData);
    };

    if (buyerOrders && buyerOrders.length > 0) {
      fetchProductDetails();
    }
  }, [buyerOrders, dispatch]);

  // Main WebSocket initialization on mount
  useEffect(() => {
    if (!userId) return;
  
    console.log("🚀 Initializing WebSocket...");
    let websocket = new WebSocket(`ws://localhost:8081/ws?senderID=${userId}`);
    setWs(websocket);
  
    websocket.onopen = () => console.log("✅ WebSocket Connected");
  
    websocket.onerror = (err) => {
      console.error("❌ WebSocket Error:", err);
      setTimeout(() => {
        console.log("🔄 Retrying WebSocket connection...");
        websocket = new WebSocket(`ws://localhost:8081/ws?senderID=${userId}`);
        setWs(websocket);
      }, 5000);
    };
  
    websocket.onclose = () => console.log("🔹 WebSocket Closed");
  
    return () => {
      console.log("🔄 Cleaning up WebSocket...");
      websocket.close();
    };
  }, [userId]);

  const handleViewDetails = (orderId) => {
    setSelectedOrder({
      ...buyerOrders.find((order) => order.id === orderId),
      Product: products[orderId],
    });
    setPopupVisible(true);
  };

  const handleDeleteOrder = async (orderId) => {
    await dispatch(deleteOrder(orderId));
    dispatch(fetchBuyerOrders(userId));
    closePopup();
  };

  const closePopup = () => {
    setSelectedOrder(null);
    setPopupVisible(false);
  };

  const handleOpenChat = (sellerId) => {
    if (!token) {
      alert("Unauthorized! Please log in again.");
      return;
    }
  
    setSelectedSellerId(sellerId);
    setChatVisible(true);
    setNewMessage(false);
  
    dispatch(fetchMessages({ receiverId: sellerId }));
  
    if (!ws || ws.readyState !== WebSocket.OPEN) {
      console.log("🔹 Establishing WebSocket connection...");
      const websocket = new WebSocket(
        `ws://localhost:8081/ws?senderID=${userId}&receiverID=${sellerId}`
      );
  
      websocket.onopen = () => {
        console.log("✅ WebSocket Connected in Orders Page");
        setWs(websocket);
      };
  
      websocket.onmessage = (event) => {
        const receivedMessage = JSON.parse(event.data);
        console.log("🔹 Message received:", receivedMessage);
        dispatch({ type: "chat/addMessage", payload: receivedMessage });
  
        if (!isChatVisible) {
          setNewMessage(true);
        }
      };
  
      websocket.onerror = (err) => {
        console.error("❌ WebSocket Error:", err);
      };
  
      websocket.onclose = () => {
        console.log("🔹 WebSocket Closed in Orders Page");
        setWs(null);
      };
    }
  };
  
  const sendMessage = () => {
    if (!ws) {
      console.error("❌ WebSocket is not initialized.");
      return;
    }
  
    if (ws.readyState === WebSocket.CONNECTING) {
      console.warn("⏳ WebSocket is still connecting, retrying...");
      setTimeout(sendMessage, 1000);
      return;
    }
  
    if (ws.readyState !== WebSocket.OPEN) {
      console.error("❌ WebSocket is not connected, cannot send message");
      return;
    }
  
    if (!input.trim()) return;
  
    const messageData = {
      senderId: userId,
      receiverId: selectedSellerId,
      content: input,
    };
  
    try {
      ws.send(JSON.stringify(messageData));
      console.log("📩 Message Sent:", messageData);
      setInput(""); 
    } catch (err) {
      console.error("❌ Error sending message:", err);
    }
  };

  const getStatusBadge = (status) => {
    const s = (status || "").toLowerCase();
    if (["completed", "delivered"].includes(s)) {
      return (
        <span className="bg-emerald-50 text-emerald-700 border border-emerald-100 px-3 py-1 rounded-full text-xs font-semibold inline-flex items-center gap-1.5">
          <CheckCircle2 size={12} className="text-emerald-600" />
          Delivered
        </span>
      );
    }
    if (["cancelled", "returned"].includes(s)) {
      return (
        <span className="bg-red-50 text-red-700 border border-red-100 px-3 py-1 rounded-full text-xs font-semibold inline-flex items-center gap-1.5">
          <AlertCircle size={12} className="text-red-600" />
          {s.charAt(0).toUpperCase() + s.slice(1)}
        </span>
      );
    }
    if (s === "pending") {
      return (
        <span className="bg-amber-50 text-amber-700 border border-amber-100 px-3 py-1 rounded-full text-xs font-semibold inline-flex items-center gap-1.5 animate-pulse">
          <Clock size={12} className="text-amber-600" />
          Pending
        </span>
      );
    }
    return (
      <span className="bg-blue-50 text-blue-700 border border-blue-100 px-3 py-1 rounded-full text-xs font-semibold inline-flex items-center gap-1.5">
        <Clock size={12} className="text-blue-600" />
        {s.charAt(0).toUpperCase() + s.slice(1)}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <ShoppingBag className="text-emerald-600 w-6 h-6" />
            My Orders
          </h1>
          <p className="text-sm text-gray-500 mt-1">Track status, chat with sellers, or review previous purchases</p>
        </div>

        {/* Tab Filters */}
        <div className="flex border border-gray-200 bg-white rounded-xl p-1 shadow-sm gap-1 w-full sm:w-auto overflow-x-auto">
          {[
            { id: "all", label: "All Orders", count: buyerOrders.length },
            { id: "active", label: "Active", count: activeOrders.length },
            { id: "completed", label: "Completed", count: completedOrders.length },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-emerald-50 text-emerald-700 shadow-sm"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
              }`}
            >
              {tab.label}
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                activeTab === tab.id ? "bg-emerald-100 text-emerald-800" : "bg-gray-100 text-gray-600"
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {newMessage && (
        <div className="fixed bottom-10 right-10 bg-red-500 text-white px-5 py-3 rounded-xl shadow-lg animate-bounce z-40 flex items-center gap-2">
          <MessageSquare className="w-4 h-4" />
          <span>New message received!</span>
        </div>
      )}

      {/* Loading & Error cases */}
      {loading && buyerOrders.length === 0 ? (
        <div className="h-64 flex flex-col items-center justify-center bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500 text-sm mt-4">Loading your orders...</p>
        </div>
      ) : error ? (
        <div className="flex items-center justify-center p-8 bg-red-50 text-red-700 border border-red-200 rounded-2xl">
          <AlertCircle className="w-5 h-5 mr-2" />
          <span>Failed to load orders: {error}</span>
        </div>
      ) : displayedOrders.length === 0 ? (
        <div className="h-64 flex flex-col items-center justify-center text-center bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <ShoppingBag className="w-12 h-12 text-gray-300 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900">No orders found</h3>
          <p className="text-sm text-gray-500 mt-1">There are no orders inside the "{activeTab}" filter.</p>
        </div>
      ) : (
        /* Orders list grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedOrders.map((order) => {
            const product = products[order.id];
            const orderStatus = order.orderStatus || order.order_status;
            const checkoutPrice = order.checkoutPrice || order.checkout_price || 0;
            const shippingAddress = order.shippingAddress || order.shipping_address || "N/A";
            
            return (
              <div
                key={order.id}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 p-5 flex flex-col justify-between h-full group"
              >
                <div>
                  <div className="relative h-44 rounded-xl overflow-hidden bg-gray-50 border border-gray-100 mb-4">
                    <img
                      src={getProductImage(product)}
                      alt={product?.name || "Product Image"}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=2070&auto=format&fit=crop"; }}
                    />
                    <div className="absolute top-3 right-3 shadow-sm bg-white/95 backdrop-blur-sm rounded-full p-0.5">
                      {getStatusBadge(orderStatus)}
                    </div>
                  </div>

                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="text-xs text-gray-400 font-medium">Order #ORD-{order.id}</p>
                      <h3 className="font-bold text-gray-900 truncate text-base mt-0.5 group-hover:text-emerald-600 transition-colors">
                        {product?.name || order.name}
                      </h3>
                    </div>
                    <span className="text-lg font-extrabold text-emerald-600">
                      KES {checkoutPrice.toLocaleString()}
                    </span>
                  </div>

                  <div className="space-y-1.5 text-xs text-gray-500 border-t pt-3 mt-3">
                    <p className="flex items-center gap-1.5">
                      <Calendar size={13} className="text-gray-400 shrink-0" />
                      <span>Placed on: <span className="font-semibold text-gray-700">{formatDate(order.time)}</span></span>
                    </p>
                    <p className="flex items-start gap-1.5 truncate">
                      <MapPin size={13} className="text-gray-400 shrink-0 mt-0.5" />
                      <span className="truncate" title={`${shippingAddress}, ${order.city || ""}`}>
                        Ship to: <span className="font-semibold text-gray-700">{shippingAddress}</span>
                      </span>
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-5">
                  <button
                    className="w-full py-2.5 px-3 border border-gray-200 text-gray-700 rounded-xl text-sm font-semibold hover:bg-gray-50 active:scale-[0.98] transition-all"
                    onClick={() => handleViewDetails(order.id)}
                  >
                    View Details
                  </button>
                  <button
                    className="w-full py-2.5 px-3 bg-emerald-600 text-white rounded-xl text-sm font-semibold hover:bg-emerald-700 active:scale-[0.98] transition-all flex items-center justify-center gap-1.5 shadow-sm"
                    onClick={() => handleOpenChat(order.sellerId)}
                  >
                    <MessageSquare size={14} />
                    Chat Seller
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Order Details Modal Overlay */}
      {isPopupVisible && selectedOrder && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-lg w-full relative border border-gray-100 flex flex-col max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
            <button
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
              onClick={closePopup}
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-4">
              <h2 className="text-xl font-bold text-gray-900">Order Details</h2>
              <p className="text-xs text-gray-400 mt-0.5">Summary and delivery specifications</p>
            </div>

            <div className="flex gap-4 p-3 bg-gray-50 rounded-xl border mb-5">
              <img
                src={getProductImage(selectedOrder.Product)}
                alt={selectedOrder.Product?.name || "Product Image"}
                className="w-20 h-20 rounded-lg object-cover bg-gray-200 border"
                onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=2070&auto=format&fit=crop"; }}
              />
              <div className="flex flex-col justify-center min-w-0">
                <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">{selectedOrder.Product?.category_name || "Crops"}</span>
                <h3 className="font-bold text-gray-900 text-base truncate mt-0.5">{selectedOrder.Product?.name || "Product Details"}</h3>
                <p className="text-xs text-gray-400 mt-1">Order #ORD-{selectedOrder.id}</p>
              </div>
            </div>

            <div className="space-y-3.5 text-sm border-b pb-5 mb-5">
              <div className="flex justify-between">
                <span className="text-gray-400">Order Status:</span>
                <div>{getStatusBadge(selectedOrder.orderStatus || selectedOrder.order_status)}</div>
              </div>
              <div className="flex justify-between items-start">
                <span className="text-gray-400 shrink-0">Ship to Address:</span>
                <span className="text-right text-gray-800 font-medium">
                  {selectedOrder.shippingAddress || selectedOrder.shipping_address}, {selectedOrder.city}, {selectedOrder.state}, {selectedOrder.country}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Recipient Name:</span>
                <span className="text-gray-800 font-semibold">{selectedOrder.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Email Contact:</span>
                <span className="text-gray-800 font-medium">{selectedOrder.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Phone Contact:</span>
                <span className="text-gray-800 font-medium">{selectedOrder.phoneNumber || selectedOrder.phone_number}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Payment Option:</span>
                <span className="text-gray-800 font-semibold flex items-center gap-1">
                  <CreditCard size={14} className="text-gray-400" />
                  {selectedOrder.paymentMethod || selectedOrder.payment_method}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Total Charged:</span>
                <span className="text-emerald-600 font-extrabold text-base">
                  KES {(selectedOrder.checkoutPrice || selectedOrder.checkout_price || 0).toLocaleString()}
                </span>
              </div>
            </div>
            
            <div className="flex gap-3">
              {(selectedOrder.orderStatus || selectedOrder.order_status) === "Pending" && (
                <button
                  className="w-full flex items-center justify-center gap-1.5 bg-red-50 text-red-600 border border-red-200 py-3 rounded-xl hover:bg-red-100 transition font-bold"
                  onClick={() => handleDeleteOrder(selectedOrder.id)}
                >
                  <Trash2 size={16} />
                  Delete Order
                </button>
              )}
              <button
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition font-bold shadow-md shadow-emerald-100"
                onClick={closePopup}
              >
                Close details
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Chat with Seller Dialog Overlay */}
      {isChatVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden border border-gray-100 flex flex-col h-[550px] animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="bg-emerald-600 px-6 py-4 flex justify-between items-center text-white">
              <div>
                <h2 className="text-lg font-bold">Chat with Seller</h2>
                <p className="text-xs text-emerald-100 mt-0.5">Discuss details or shipping logistics</p>
              </div>
              <button
                onClick={() => setChatVisible(false)}
                className="p-1.5 hover:bg-white/10 rounded-full text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages Body */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col space-y-3 bg-gray-50/50 scrollbar-thin scrollbar-thumb-gray-200">
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-4">
                  <MessageSquare className="w-10 h-10 text-gray-300 mb-2 animate-bounce" />
                  <p className="text-sm text-gray-400">Send a greeting message to start the conversation.</p>
                </div>
              ) : (
                messages.map((msg, index) => {
                  const isUser = msg.senderId === userId || msg.user === "buyer" || msg.user === "Phaninder";
                  return (
                    <div
                      key={index}
                      className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}
                    >
                      <span className="text-[10px] text-gray-400 mb-0.5 px-1 font-medium">{msg.user || "User"}</span>
                      <div
                        className={`p-3 px-4 rounded-2xl max-w-[78%] shadow-sm ${
                          isUser
                            ? "bg-emerald-600 text-white rounded-tr-none"
                            : "bg-white text-gray-800 border border-gray-150 rounded-tl-none"
                        }`}
                      >
                        <span className="text-sm break-words">{msg.content}</span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Message input footer */}
            <div className="border-t bg-white p-4 flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") sendMessage(); }}
                className="flex-1 border border-gray-200 px-4 py-2.5 rounded-xl text-sm text-gray-700 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-50 transition-all placeholder:text-gray-400"
                placeholder="Type your message here..."
              />
              <button
                onClick={sendMessage}
                className="bg-emerald-600 text-white p-2.5 rounded-xl hover:bg-emerald-700 active:scale-95 transition-all flex items-center justify-center shadow-md shadow-emerald-50"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
