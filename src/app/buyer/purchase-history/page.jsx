'use client';
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBuyerOrders, fetchOrderDetail, deleteOrder } from "@/reducers/Order/orderSlice";
import { fetchMessages, } from "@/reducers/Chat/chatSlice";
import { AiOutlineClose } from "react-icons/ai";
import { ShoppingBag } from "lucide-react";
import { API_BASE_URL, WS_BASE_URL } from "@/axios/config";

export default function Orders() {
  const dispatch = useDispatch();
  const { buyerOrders, loading, error } = useSelector((state) => state.orders);
  const userId = useSelector((state) => state.auth.user?.userId || state.auth.user?.id);
  const token = useSelector((state) => state.auth.token);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [products, setProducts] = useState({});
  const [isChatVisible, setChatVisible] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [selectedSellerId, setSelectedSellerId] = useState(null);
  const getOrderStatus = (order) => {
    if (!order) return "";
    const status = order.orderStatus || order.order_status || "pending";
    return status.toLowerCase();
  };
  const completedOrders = buyerOrders.filter(order => getOrderStatus(order) === "completed" || getOrderStatus(order) === "delivered");
  const activeOrders = buyerOrders.filter(order => getOrderStatus(order) !== "completed" && getOrderStatus(order) !== "delivered");

  useEffect(() => {
    if (userId) {
      dispatch(fetchBuyerOrders(userId));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    const fetchProductDetails = async () => {
      const productData = {};
      for (const order of buyerOrders) {
        try {
          const response = await dispatch(fetchOrderDetail(order.id));
          if (response.meta.requestStatus === "fulfilled") {
            productData[order.id] = response.payload.Product;
          }
        } catch (error) {
          console.error("Failed to fetch product details:", error);
        }
      }
      setProducts(productData);
    };

    if (buyerOrders.length > 0) fetchProductDetails();
  }, [buyerOrders, dispatch]);

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
  const loadingMessages = useSelector((state) => state.chat.loading);
  const [localMessages, setLocalMessages] = useState([]);
  const [input, setInput] = useState("");
  const [ws, setWs] = useState(null);
  const messages = useSelector((state) => state.chat.messages);
const setMessages = (newMessages) => {
  console.warn("setMessages is not used. Messages are managed via Redux.");
};

  useEffect(() => {
    if (userId) {
      dispatch(fetchBuyerOrders(userId));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    const fetchProductDetails = async () => {
      const productData = {};
      for (const order of buyerOrders) {
        try {
          const response = await dispatch(fetchOrderDetail(order.id));
          if (response.meta.requestStatus === "fulfilled") {
            productData[order.id] = response.payload.Product;
          }
        } catch (error) {
          console.error("Failed to fetch product details:", error);
        }
      }
      setProducts(productData);
    };

    if (buyerOrders.length > 0) fetchProductDetails();
  }, [buyerOrders, dispatch]);


  const handleOpenChat = (sellerId) => {
    if (!token) {
      alert("Unauthorized! Please log in again.");
      return;
    }

    setSelectedSellerId(sellerId);
    setChatVisible(true);

    dispatch(fetchMessages({ receiverId: sellerId }));

    const websocket = new WebSocket(
      `${WS_BASE_URL}/ws?senderID=${userId}&receiverID=${sellerId}`
    );
    setWs(websocket);

    websocket.onmessage = (event) => {
      const receivedMessage = JSON.parse(event.data);
      dispatch({ type: "chat/addMessage", payload: receivedMessage });
    };

    websocket.onclose = () => setWs(null);
  };

   
  const sendMessage = () => {
    if (!ws || !input.trim()) return;

    const messageData = { senderId: userId, receiverId: selectedSellerId, content: input };
    ws.send(JSON.stringify(messageData));
    setInput("");
  };

 
  
  const allMessages = [...messages, ...localMessages];

  useEffect(() => {
    console.log("Messages from Redux:", messages);
  }, [messages]);
  


  return (
    <div className="space-y-6">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <ShoppingBag className="text-emerald-600 w-6 h-6" />
            Purchase History
          </h1>
          <p className="text-sm text-gray-500 mt-1">A record of your completed and delivered purchases</p>
        </div>
      </div>

      {completedOrders.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center shadow-sm">
          <p className="text-gray-500">No completed orders found.</p>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-100 text-red-700 p-4 rounded-xl text-center">
          Failed to load orders: {error}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {completedOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-all duration-300"
            >
              <div>
                <img
                  src={products[order.id]?.imagepath?.startsWith('http') ? products[order.id].imagepath : `${API_BASE_URL}/${products[order.id]?.imagepath || "static/images/placeholder.jpg"}`}
                  alt={products[order.id]?.name || "Product Image"}
                  className="w-full h-44 rounded-xl object-cover mb-4 bg-gray-50"
                  onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=2070&auto=format&fit=crop"; }}
                />
                <h3 className="text-gray-900 text-lg font-bold mb-2 truncate">
                  Order #{order.id} - {order.name}
                </h3>
                <div className="space-y-1.5 text-sm text-gray-600 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-400">Status:</span>
                    <span className="bg-emerald-50 text-emerald-700 border border-emerald-100 px-2.5 py-0.5 rounded-full text-xs font-semibold">
                      {getOrderStatus(order).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-400">Total Price:</span>
                    <span className="font-bold text-gray-900">KES {order.checkoutPrice}</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                    <span className="font-medium">Shipping Address:</span> {order.shippingAddress}, {order.city}
                  </p>
                </div>
              </div>
              <div className="space-y-2 pt-2 border-t border-gray-50">
                <button
                  className="w-full bg-emerald-600 text-white py-2.5 rounded-xl font-medium hover:bg-emerald-700 transition shadow-sm active:scale-98"
                  onClick={() => handleViewDetails(order.id)}
                >
                  View Details
                </button>
                <button
                  className="w-full border border-emerald-200 text-emerald-700 py-2.5 rounded-xl font-medium hover:bg-emerald-50 transition active:scale-98 flex items-center justify-center gap-1.5"
                  onClick={() => handleOpenChat(order.sellerId)}
                >
                  <span>💬</span> Chat with Seller
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Chat Dialog */}
      {isChatVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
          <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-lg relative border border-gray-100 mx-4">
            <button
              onClick={() => setChatVisible(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <AiOutlineClose className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-bold text-gray-900 mb-4 text-center">Chat with Seller</h2>
            
            <div className="h-72 overflow-y-auto border border-gray-100 rounded-xl p-4 bg-gray-50 mb-4 space-y-3">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.senderId === userId || msg.user === "Seller" ? "justify-start" : "justify-end"}`}
                >
                  <div
                    className={`p-3 rounded-2xl max-w-[80%] text-sm ${
                      msg.senderId === userId || msg.user === "Seller"
                        ? "bg-white border text-gray-700 rounded-bl-none shadow-sm"
                        : "bg-emerald-600 text-white rounded-br-none shadow-sm"
                    }`}
                  >
                    <strong className="block text-xs mb-1 opacity-75">
                      {msg.senderId === userId || msg.user === "Seller" ? "Seller" : "Me"}
                    </strong>
                    <span>{msg.content}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 border border-gray-200 p-2.5 rounded-xl text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                placeholder="Type a message..."
              />
              <button
                onClick={sendMessage}
                className="bg-emerald-600 text-white p-3 rounded-xl hover:bg-emerald-700 transition shadow-sm active:scale-95"
              >
                📩
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Details Dialog */}
      {isPopupVisible && selectedOrder && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
          <div className="bg-white rounded-2xl shadow-xl p-6 max-w-md w-full text-gray-900 relative border border-gray-100 mx-4">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              onClick={closePopup}
            >
              <AiOutlineClose className="w-5 h-5" />
            </button>
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Order Details</h2>
            
            <div className="space-y-3 text-sm text-gray-600 border-b pb-4 mb-4">
              <div className="flex justify-between">
                <span className="font-medium text-gray-400">Order ID:</span>
                <span className="font-semibold text-gray-900">#{selectedOrder.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-400">Recipient Name:</span>
                <span className="font-medium text-gray-900">{selectedOrder.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-400">Email:</span>
                <span className="text-gray-900">{selectedOrder.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-400">Phone:</span>
                <span className="text-gray-900">{selectedOrder.phoneNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-400">Shipping Address:</span>
                <span className="text-gray-900 text-right max-w-[200px]">
                  {selectedOrder.shippingAddress}, {selectedOrder.city}, {selectedOrder.state}, {selectedOrder.country}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-400">Payment Method:</span>
                <span className="text-gray-900">{selectedOrder.paymentMethod}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-400">Product Name:</span>
                <span className="font-semibold text-gray-900">{selectedOrder.Product?.name || "N/A"}</span>
              </div>
            </div>
            
            <img
              src={selectedOrder.Product?.imagepath?.startsWith('http') ? selectedOrder.Product.imagepath : `${API_BASE_URL}/${selectedOrder.Product?.imagepath || "static/images/placeholder.jpg"}`}
              alt={selectedOrder.Product?.name || "Product Image"}
              className="w-full h-40 rounded-xl object-cover mb-6 bg-gray-50 border border-gray-100"
              onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=2070&auto=format&fit=crop"; }}
            />
            
            <div className="flex gap-4">
              {getOrderStatus(selectedOrder) === "pending" && (
                <button
                  className="w-full bg-red-600 text-white py-2.5 rounded-xl font-semibold hover:bg-red-700 transition shadow-sm active:scale-95"
                  onClick={() => handleDeleteOrder(selectedOrder.id)}
                >
                  Delete Order
                </button>
              )}
              <button
                className="w-full bg-gray-100 text-gray-700 py-2.5 rounded-xl font-semibold hover:bg-gray-200 transition active:scale-95"
                onClick={closePopup}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

