'use client';
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBuyerOrders, fetchOrderDetail,deleteOrder } from "@/reducers/Order/orderSlice";
import Profile from "@/Components/ProfileCard/ProfileCard";
import { fetchMessages, } from "@/reducers/Chat/chatSlice";
import { AiOutlineClose } from "react-icons/ai";

export default function Orders() {
  const dispatch = useDispatch();
  const { buyerOrders, loading, error } = useSelector((state) => state.orders);
  const userId = useSelector((state) => state.auth.user?.userId);
  const token = useSelector((state) => state.auth.token);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [products, setProducts] = useState({});
  const [isChatVisible, setChatVisible] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [selectedSellerId, setSelectedSellerId] = useState(null);
  const completedOrders = buyerOrders.filter(order => order.orderStatus === "completed");
const activeOrders = buyerOrders.filter(order => order.orderStatus !== "completed");

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
  const [newMessage, setNewMessage] = useState(false);
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
  useEffect(() => {
    if (!userId) return;
  
    console.log("🚀 Initializing WebSocket...");
    let websocket = new WebSocket(`ws://localhost:8081/ws?senderID=${userId}`);
    setWs(websocket);
  
    websocket.onopen = () => console.log("✅ WebSocket Connected");
  
    websocket.onerror = (error) => {
      console.error("❌ WebSocket Error:", error);
      setTimeout(() => {
        console.log("🔄 Retrying WebSocket connection...");
        websocket = new WebSocket(`ws://localhost:8081/ws?senderID=${userId}`);
        setWs(websocket);
      }, 5000); // Retry after 5 seconds
    };
  
    websocket.onclose = () => console.log("🔹 WebSocket Closed");
  
    return () => {
      console.log("🔄 Cleaning up WebSocket...");
      websocket.close();
    };
  }, [userId]);
  


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
  
      websocket.onerror = (error) => {
        console.error("❌ WebSocket Error:", error);
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
      setTimeout(sendMessage, 1000); // Retry after 1 second
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
    } catch (error) {
      console.error("❌ Error sending message:", error);
    }
  };
  
  

 
  
  const allMessages = [...messages, ...localMessages];

  useEffect(() => {
    console.log("Messages from Redux:", messages);
  }, [messages]);
  


  return (
    <div className="bg-gradient-to-br from-green-900 via-emerald-700 to-lime-500 min-h-screen p-6 text-white">
      <Profile />

    <div className="text-center mt-8">
      <h2 className="text-3xl font-bold text-lime-100 mb-6">My Orders</h2>
    </div>

    {activeOrders.length === 0 ? (
      <p className="text-center text-lime-200">Loading orders...</p>
    ) : error ? (
      <p className="text-center text-red-400">Failed to load orders: {error}</p>
    ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
{newMessage && (
        <div className="fixed bottom-10 right-10 bg-red-500 text-white p-3 rounded-lg shadow-md animate-bounce">
          New message received! 📩
        </div>
      )}

    {activeOrders.map((order) => (
          <div
            key={order.id}
            className="bg-gradient-to-br from-green-700 via-emerald-600 to-lime-600 p-6 rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-300"
          >
            <img
              src={`http://localhost:8080/${products[order.id]?.imagepath || "static/images/placeholder.jpg"}`}
              alt={products[order.id]?.name || "Product Image"}
              className="w-full h-40 rounded-lg object-cover mb-4"
            />
            <h3 className="text-lime-100 text-lg font-bold mb-2">
              Order #{order.id} - {order.name}
            </h3>
            <p className="text-lime-200 text-sm mb-2">
              <span className="font-medium">Status:</span>{" "}
              <span
                className={
                  order.orderStatus === "Pending"
                    ? "text-yellow-400"
                    : "text-lime-300"
                }
              >
                {order.orderStatus}
              </span>
            </p>
            <p className="text-lime-200 text-sm mb-2">
              <span className="font-medium">Total Price:</span> $
              {order.checkoutPrice}
            </p>
            <p className="text-lime-200 text-sm mb-2">
              <span className="font-medium">Shipping Address:</span>{" "}
              {order.shippingAddress}, {order.city}, {order.state}, {order.country}
            </p>
            <button
              className="mt-4 w-full bg-lime-600 text-white py-2 rounded-lg hover:bg-lime-700 transition shadow-md"
              onClick={() => handleViewDetails(order.id)}
            >
              View Details
            </button>
            <button
                className="mt-4 w-full bg-lime-600 text-white py-2 rounded-lg hover:bg-lime-700 transition shadow-md"
                onClick={() => handleOpenChat(order.sellerId)}
              >
                Chat with Seller
              </button>
          </div>
        ))}
      </div>
    )}
{isChatVisible && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-green-700 p-6 rounded-lg text-white w-full max-w-lg relative shadow-lg">
      
      <button
        onClick={() => setChatVisible(false)}
        className="absolute top-3 right-3 text-white hover:text-gray-300 text-lg"
      >
        <AiOutlineClose className="w-6 h-6 cursor-pointer" />
      </button>

      <h2 className="text-xl font-semibold text-center mb-4">Chat with Seller</h2>

      {/* Messages Section */}
      <div className="h-72 overflow-y-auto border-b mb-4 p-2 flex flex-col space-y-2 scrollbar-thin scrollbar-thumb-gray-400">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.senderId === userId || msg.user === "buyer" || msg.user ==="Phaninder" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`p-3 px-4 rounded-lg max-w-[75%] shadow ${
                msg.senderId === userId || msg.user === "buyer"|| msg.user ==="Phaninder"
                  ? "bg-green-500 text-white" // Buyer messages (right)
                  : "bg-gray-300 text-black" // Seller messages (left)
              }`}
            >
              <strong className="block text-sm mb-1">
                {msg.user ? msg.user : "Unknown"}
              </strong>
              <span>{msg.content}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Input Field */}
      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 border p-2 rounded-lg text-black outline-none"
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition"
        >
          📩
        </button>
      </div>
    </div>
  </div>
)}





    {isPopupVisible && selectedOrder && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-gradient-to-br from-lime-500 via-green-600 to-emerald-700 rounded-lg shadow-2xl p-6 max-w-md w-full text-white relative">
          <button
            className="absolute top-3 right-3 text-lime-100 hover:text-white"
            onClick={closePopup}
          >
            Close
          </button>
          <h2 className="text-2xl font-bold mb-6">Order Details</h2>
          <p className="text-sm mb-2">
            <span className="font-medium">Order ID:</span> {selectedOrder.id}
          </p>
          <p className="text-sm mb-2">
            <span className="font-medium">Name:</span> {selectedOrder.name}
          </p>
          <p className="text-sm mb-2">
            <span className="font-medium">Email:</span> {selectedOrder.email}
          </p>
          <p className="text-sm mb-2">
            <span className="font-medium">Phone:</span> {selectedOrder.phoneNumber}
          </p>
          <p className="text-sm mb-2">
            <span className="font-medium">Shipping Address:</span>{" "}
            {selectedOrder.shippingAddress}, {selectedOrder.city}, {selectedOrder.state},{" "}
            {selectedOrder.country}
          </p>
          <p className="text-sm mb-2">
            <span className="font-medium">Payment Method:</span>{" "}
            {selectedOrder.paymentMethod}
          </p>
          <p className="text-sm mb-6">
            <span className="font-medium">Product Name:</span>{" "}
            {selectedOrder.Product?.name || "N/A"}
          </p>
          <img
            src={`http://localhost:8080/${selectedOrder.Product?.imagepath || "static/images/placeholder.jpg"}`}
            alt={selectedOrder.Product?.name || "Product Image"}
            className="w-full h-40 rounded-lg object-cover mb-4"
          />
          
          <div className="flex gap-8">
          {selectedOrder.orderStatus === "Pending" && (
                <button
                  className="mt-2 w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition shadow-md"
                  onClick={() => handleDeleteOrder(selectedOrder.id)}
                >
                  Delete Order
                </button>
              )}
          <button
            className="w-full bg-lime-600 text-white py-2 rounded-lg hover:bg-lime-700 transition shadow-md"
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

