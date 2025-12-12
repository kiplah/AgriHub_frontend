'use client';
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSellerOrders, fetchOrderDetail, updateOrderStatus } from "@/reducers/Order/orderSlice";
import Profile from "@/Components/ProfileCard/ProfileCard";
import { fetchMessages } from "@/reducers/Chat/chatSlice";
import { AiOutlineClose } from "react-icons/ai";

export default function Orders() {
  const dispatch = useDispatch();
  const { sellerOrders, loading, error } = useSelector((state) => state.orders);
  const userId = useSelector((state) => state.auth.user?.userId);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [products, setProducts] = useState({});
  const [input, setInput] = useState("");
  const [ws, setWs] = useState(null);
  const messages = useSelector((state) => state.chat.messages);
  const setMessages = (newMessages) => {
    console.warn("setMessages is not used. Messages are managed via Redux.");
  }; // Dummy function to avoid errors

  const loadingMessages = useSelector((state) => state.chat.loading);

  const token = useSelector((state) => state.auth.token);
  const [isChatVisible, setChatVisible] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [selectedBuyerId, setSelectedBuyerId] = useState(null);
  useEffect(() => {
    if (userId) {
      dispatch(fetchSellerOrders(userId));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    const fetchProductDetails = async () => {
      const productData = {};
      for (const order of sellerOrders) {
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

    if (sellerOrders.length > 0) fetchProductDetails();
  }, [sellerOrders, dispatch]);

  const handleViewDetails = (orderId) => {
    setSelectedOrder({
      ...sellerOrders.find((order) => order.id === orderId),
      Product: products[orderId],
    });
    setPopupVisible(true);
  };
  const handleUpdateStatus = async (orderId, newStatus) => {
    await dispatch(updateOrderStatus({ id: orderId, orderStatus: newStatus })); // ✅ Correct key "orderStatus"
    dispatch(fetchSellerOrders(userId));
    closePopup();
  };

  const closePopup = () => {
    setSelectedOrder(null);
    setPopupVisible(false);
  };

  const handleOpenChat = (buyerId) => {
    if (!token) {
      alert("Unauthorized! Please log in again.");
      return;
    }

    setSelectedBuyerId(buyerId);
    setChatVisible(true);

    dispatch(fetchMessages({ receiverId: buyerId }));

    const websocket = new WebSocket(
      `ws://localhost:8081/ws?senderID=${userId}&receiverID=${buyerId}`
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

    const messageData = { senderId: userId, receiverId: selectedBuyerId, content: input };
    console.log("🔹 Sending Message:", messageData);

    ws.send(JSON.stringify(messageData)); // Send the message as a JSON string

    setMessages((prev) => [...prev, messageData]); // Add message directly to state
    setInput(""); // Clear input field

  };


  return (
    <div className="p-4 md:p-6 bg-white min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
          <p className="text-sm text-gray-500 mt-1">Manage and track your customer orders.</p>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-10">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-600 mx-auto"></div>
          <p className="text-gray-500 mt-4">Loading orders...</p>
        </div>
      ) : error ? (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg text-center">
          Failed to load orders: {error}
        </div>
      ) : (
        <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-xs uppercase text-gray-500 font-medium">
              <tr>
                <th className="px-6 py-4">Order ID</th>
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Total</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {sellerOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">#{order.id}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={`http://localhost:8080/${products[order.id]?.imagepath || "static/images/placeholder.jpg"}`}
                        alt={products[order.id]?.name}
                        className="w-10 h-10 rounded-lg object-cover bg-gray-100"
                      />
                      <span className="text-gray-700 font-medium">{order.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    <div>{order.email}</div>
                    <div className="text-xs text-gray-400">{order.shippingAddress}</div>
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900">KES {order.checkoutPrice}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${order.orderStatus === "Pending" ? "bg-yellow-50 text-yellow-700" :
                      order.orderStatus === "Completed" ? "bg-emerald-50 text-emerald-700" :
                        order.orderStatus === "Cancelled" ? "bg-red-50 text-red-700" :
                          "bg-blue-50 text-blue-700"
                      }`}>
                      {order.orderStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex items-center gap-2">
                    <button
                      onClick={() => handleViewDetails(order.id)}
                      className="px-3 py-1.5 text-sm font-medium text-emerald-600 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors"
                    >
                      Details
                    </button>
                    <button
                      onClick={() => handleOpenChat(order.buyerId)}
                      className="p-2 text-gray-400 hover:text-emerald-600 transition-colors"
                      title="Chat with Buyer"
                    >
                      <span className="text-xl">💬</span>
                    </button>
                    {/* Simplified Status Dropdown for quick action */}
                    <select
                      className="text-sm border-gray-200 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
                      onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
                      value={order.orderStatus}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {sellerOrders.length === 0 && (
            <div className="p-10 text-center text-gray-500">
              No orders found.
            </div>
          )}
        </div>
      )}

      {/* Popups (Chat & Details) kept functional but could be restyled later if needed. 
          Assuming they render on top via portals or fixed position. 
      */}
      {isChatVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
          {/* ... Keep existing chat logic but wrap in cleaner container ... */}
          <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-lg relative border border-gray-100">
            <button
              onClick={() => setChatVisible(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <AiOutlineClose className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-bold text-gray-900 mb-4 text-center">Chat with Buyer</h2>

            <div className="h-80 overflow-y-auto border border-gray-100 rounded-lg p-4 bg-gray-50 mb-4 space-y-3">
              {messages.map((msg, index) => (
                <div key={index} className={`flex ${msg.senderId === userId || msg.user === "Seller" ? "justify-end" : "justify-start"}`}>
                  <div className={`p-3 rounded-2xl max-w-[80%] text-sm ${msg.senderId === userId || msg.user === "Seller" ? "bg-emerald-600 text-white rounded-br-none" : "bg-white border text-gray-700 rounded-bl-none shadow-sm"}`}>
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                placeholder="Type a message..."
              />
              <button onClick={sendMessage} className="bg-emerald-600 text-white p-2.5 rounded-xl hover:bg-emerald-700 transition shadow-sm">
                ➤
              </button>
            </div>
          </div>
        </div>
      )}

      {isPopupVisible && selectedOrder && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
          <div className="bg-white rounded-2xl shadow-xl p-6 max-w-md w-full relative border border-gray-100">
            <button onClick={closePopup} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"><AiOutlineClose /></button>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Order #{selectedOrder.id}</h2>

            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex justify-between border-b pb-2">
                <span>Product:</span>
                <span className="font-medium text-gray-900">{selectedOrder.Product?.name || selectedOrder.name}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span>Buyer:</span>
                <span className="font-medium text-gray-900">{selectedOrder.name} ({selectedOrder.email})</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span>Amount:</span>
                <span className="font-medium text-emerald-600">${selectedOrder.checkoutPrice}</span>
              </div>
              <div className="flex justify-between">
                <span>Address:</span>
                <span className="text-right max-w-[200px]">{selectedOrder.shippingAddress}, {selectedOrder.city}</span>
              </div>
            </div>

            <button onClick={closePopup} className="w-full mt-6 bg-gray-100 text-gray-700 py-2.5 rounded-xl font-medium hover:bg-gray-200 transition">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

