"use client";
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchConversations, fetchMessages, sendMessage, addMessage } from "@/reducers/Chat/chatSlice";
import { fetchBuyerStats } from "@/reducers/Order/orderSlice";
import { API_BASE_URL, WS_BASE_URL } from "@/axios/config";
import { 
  Loader2, 
  Send, 
  Paperclip, 
  Search, 
  MoreVertical, 
  Phone, 
  Video,
  MessageSquare,
  Clock,
  UserCheck
} from "lucide-react";
import { toast } from 'react-toastify';

export default function ChatPage() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { conversations = [], messages = [], loading } = useSelector((state) => state.chat);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newMsgContent, setNewMsgContent] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [ws, setWs] = useState(null);
  const messagesEndRef = useRef(null);

  // Fetch conversations on load
  useEffect(() => {
    dispatch(fetchConversations());
  }, [dispatch]);

  // Fetch messages thread & poll fallback
  useEffect(() => {
    if (selectedUser) {
      dispatch(fetchMessages(selectedUser.id));
      dispatch(fetchConversations());
      if (user?.userId) {
        dispatch(fetchBuyerStats(user.userId));
      }
      
      // Fallback polling every 5 seconds
      const interval = setInterval(() => {
        dispatch(fetchMessages(selectedUser.id));
      }, 5000);
      
      return () => clearInterval(interval);
    }
  }, [dispatch, selectedUser, user?.userId]);

  // Auto-scroll to bottom of chat thread
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // WebSocket real-time receiver sync
  useEffect(() => {
    if (!user?.userId) return;
  
    console.log("🚀 Initializing Chat WebSocket...");
    const websocket = new WebSocket(`${WS_BASE_URL}/ws?senderID=${user.userId}`);
    setWs(websocket);
  
    websocket.onmessage = (event) => {
      try {
        const receivedMessage = JSON.parse(event.data);
        console.log("📩 WebSocket message received:", receivedMessage);
        
        // Add message dynamically if it belongs to currently selected conversation thread
        const senderId = receivedMessage.senderId || receivedMessage.sender;
        if (selectedUser && senderId === selectedUser.id) {
          dispatch(addMessage(receivedMessage));
        }
      } catch (err) {
        console.error("Error parsing WebSocket message:", err);
      }
    };
  
    return () => {
      console.log("🔄 Cleaning up Chat WebSocket...");
      websocket.close();
    };
  }, [user?.userId, selectedUser, dispatch]);

  const handleSend = async () => {
    if (!newMsgContent.trim() || !selectedUser) return;

    // Build immediate message payload for WebSocket dispatch
    const rawContent = newMsgContent.trim();
    setNewMsgContent("");

    // 1. Dispatch through Redux thunk (HTTP save)
    try {
      await dispatch(sendMessage({ receiver: selectedUser.id, content: rawContent })).unwrap();
      dispatch(fetchMessages(selectedUser.id));
    } catch (err) {
      toast.error("Failed to send message: " + err);
      return;
    }

    // 2. Broadcast via WebSocket if active
    if (ws && ws.readyState === WebSocket.OPEN) {
      const messageData = {
        senderId: user.userId,
        receiverId: selectedUser.id,
        content: rawContent,
      };
      try {
        ws.send(JSON.stringify(messageData));
      } catch (err) {
        console.error("Failed to broadcast message via WebSocket:", err);
      }
    }
  };

  // Filter conversation list based on search bar
  const filteredConversations = conversations.filter((conv) =>
    conv.username?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-[calc(100vh-140px)] flex bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
      
      {/* Sidebar List of Users */}
      <div className="w-full md:w-80 bg-gray-50/50 border-r border-gray-100 flex flex-col shrink-0">
        
        {/* Search header */}
        <div className="p-4 border-b border-gray-100 bg-white">
          <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-emerald-600" />
            Messages
          </h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search contacts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-gray-100 border-none rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-xs text-gray-700 placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* User list */}
        <div className="flex-1 overflow-y-auto divide-y divide-gray-50 scrollbar-thin">
          {filteredConversations.length > 0 ? (
            filteredConversations.map((conv) => {
              const isActive = selectedUser?.id === conv.id;
              return (
                <div
                  key={conv.id}
                  onClick={() => setSelectedUser(conv)}
                  className={`p-4 flex items-center gap-3 cursor-pointer transition-colors hover:bg-emerald-50/50 ${
                    isActive ? 'bg-emerald-50 border-r-4 border-emerald-600' : ''
                  }`}
                >
                  <div className="relative shrink-0">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-base border border-emerald-200">
                      {conv.username?.charAt(0).toUpperCase()}
                    </div>
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="font-semibold text-gray-900 text-sm truncate">{conv.username}</h3>
                      {conv.unread_count > 0 ? (
                        <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full animate-pulse">
                          {conv.unread_count}
                        </span>
                      ) : (
                        <span className="text-[10px] text-gray-400">Active</span>
                      )}
                    </div>
                    <p className="text-xs text-gray-400 truncate">
                      {conv.unread_count > 0 ? "New messages" : "Click to view conversation"}
                    </p>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="p-8 text-center text-gray-500">
              {loading ? (
                <Loader2 className="animate-spin mx-auto text-emerald-600 w-6 h-6" />
              ) : (
                <span className="text-xs text-gray-400">No conversations found</span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Main Chat Thread Area */}
      <div className={`flex-1 flex flex-col bg-gray-50/20 ${!selectedUser ? "hidden md:flex" : "flex"}`}>
        {selectedUser ? (
          <>
            {/* Header info */}
            <div className="p-4 border-b border-gray-100 bg-white flex justify-between items-center shadow-sm">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-sm shrink-0">
                  {selectedUser.username?.charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold text-gray-950 text-sm truncate">{selectedUser.username}</h3>
                  <div className="flex items-center gap-1.5 text-[10px] text-green-600 font-semibold">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                    Online
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3.5 text-gray-400 shrink-0">
                <Phone className="cursor-pointer hover:text-emerald-600 transition-colors" size={18} />
                <Video className="cursor-pointer hover:text-emerald-600 transition-colors" size={18} />
                <MoreVertical className="cursor-pointer hover:text-gray-600 transition-colors" size={18} />
              </div>
            </div>

            {/* Message Thread Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-gray-50/50 scrollbar-thin">
              {messages.map((msg, index) => {
                const isMe = msg.sender === user?.userId || msg.sender === user?.id;
                return (
                  <div key={index} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                    <span className="text-[9px] text-gray-400 mb-0.5 px-1 font-semibold">
                      {isMe ? "You" : msg.sender_username || selectedUser.username}
                    </span>
                    <div 
                      className={`max-w-[78%] p-3 rounded-2xl shadow-sm relative ${
                        isMe 
                          ? 'bg-emerald-600 text-white rounded-tr-none' 
                          : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'
                      }`}
                    >
                      <p className="text-sm break-words leading-relaxed">{msg.content}</p>
                      <div className={`text-[9px] mt-1 text-right font-medium ${isMe ? 'text-emerald-100' : 'text-gray-400'}`}>
                        {msg.timestamp ? new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ""}
                      </div>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Footer Input */}
            <div className="p-4 bg-white border-t border-gray-100">
              <div className="flex items-center gap-2 bg-gray-100 rounded-xl px-4 py-2">
                <Paperclip className="text-gray-400 cursor-pointer hover:text-gray-600" size={18} />
                <input
                  type="text"
                  value={newMsgContent}
                  onChange={(e) => setNewMsgContent(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') handleSend(); }}
                  placeholder="Type a message..."
                  className="flex-1 bg-transparent border-none focus:ring-0 outline-none text-sm text-gray-700 placeholder-gray-500"
                />
                <button
                  onClick={handleSend}
                  className="bg-emerald-600 p-2 rounded-xl text-white hover:bg-emerald-700 active:scale-95 transition-all shadow-sm"
                >
                  <Send size={15} />
                </button>
              </div>
            </div>
          </>
        ) : (
          /* Unselected State */
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8 bg-gray-50/20">
            <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mb-4 text-emerald-600 animate-pulse border border-emerald-100">
              <MessageSquare size={32} />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Select a Conversation</h3>
            <p className="text-sm text-gray-500 mt-1.5 max-w-sm">Choose a seller from the contact list to start your real-time conversation thread.</p>
          </div>
        )}
      </div>
    </div>
  );
}