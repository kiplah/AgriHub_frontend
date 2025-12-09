"use client";
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { fetchConversations, fetchMessages, sendMessage } from "@/reducers/Chat/chatSlice";
import { Loader2, Send, Paperclip, Search, MoreVertical, Phone, Video } from "lucide-react";
import { toast } from 'react-toastify';

const ChatPage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { conversations, messages, loading } = useSelector((state) => state.chat);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  // Fetch conversations on load
  useEffect(() => {
    dispatch(fetchConversations());
  }, [dispatch]);

  // Fetch messages when user selected
  useEffect(() => {
    if (selectedUser) {
      dispatch(fetchMessages(selectedUser.id));
      // Poll for new messages every 5 seconds (temporary solution for real-time)
      const interval = setInterval(() => {
        dispatch(fetchMessages(selectedUser.id));
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [dispatch, selectedUser]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!newMessage.trim() || !selectedUser) return;

    try {
      await dispatch(sendMessage({ receiver: selectedUser.id, content: newMessage })).unwrap();
      setNewMessage("");
      dispatch(fetchMessages(selectedUser.id)); // Refresh messages
    } catch (error) {
      toast.error("Failed to send message: " + error);
    }
  };

  return (
    <div className="h-[calc(100vh-2rem)] flex bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
      {/* Sidebar / User List */}
      <div className="w-1/3 bg-gray-50 border-r border-gray-100 flex flex-col hidden md:flex">
        <div className="p-4 border-b border-gray-100 bg-white">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Messages</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 bg-gray-100 border-none rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-sm"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {conversations && conversations.length > 0 ? (
            conversations.map((conv) => (
              <div
                key={conv.id}
                onClick={() => setSelectedUser(conv)}
                className={`p-4 flex items-center gap-3 cursor-pointer transition-colors hover:bg-emerald-50 ${selectedUser?.id === conv.id ? 'bg-emerald-50 border-r-4 border-emerald-500' : ''}`}
              >
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-emerald-200 flex items-center justify-center text-emerald-700 font-bold text-lg">
                    {conv.username.charAt(0).toUpperCase()}
                  </div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-semibold text-gray-800 truncate">{conv.username}</h3>
                    <span className="text-xs text-gray-500">Just now</span>
                  </div>
                  <p className="text-sm text-gray-500 truncate">Tap to view chat</p>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-gray-500">
              {loading ? <Loader2 className="animate-spin mx-auto text-emerald-600" /> : "No conversations found."}
            </div>
          )}
        </div>
      </div>

      {/* Chat Area */}
      <div className={`flex-1 flex flex-col bg-[#FDFDFD] ${!selectedUser && 'hidden md:flex'}`}>
        {selectedUser ? (
          <>
            <div className="p-4 border-b border-gray-100 bg-white flex justify-between items-center shadow-sm z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-200 flex items-center justify-center text-emerald-700 font-bold">
                  {selectedUser.username.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">{selectedUser.username}</h3>
                  <div className="flex items-center gap-2 text-xs text-green-600">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    Online
                  </div>
                </div>
              </div>
              <div className="flex gap-4 text-gray-400">
                <Phone className="cursor-pointer hover:text-emerald-600 transition-colors" size={20} />
                <Video className="cursor-pointer hover:text-emerald-600 transition-colors" size={20} />
                <MoreVertical className="cursor-pointer hover:text-gray-600 transition-colors" size={20} />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50 bg-[url('https://camo.githubusercontent.com/c1dcb74ca2158888bcec88dc36c84a44b9d07010f443851726a455a01f544520/68747470733a2f2f7765622e77686174736170702e636f6d2f696d672f62672d636861742d74696c652d6461726b5f61346265353132653731393562366237333364393131303234303838396634342e706e67')] bg-repeat opacity-90">
              {messages.map((msg, index) => {
                const isMe = msg.sender === user?.userId || msg.sender === user?.id; // Robust check
                return (
                  <div key={index} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[75%] p-3 rounded-2xl shadow-sm relative ${isMe ? 'bg-emerald-600 text-white rounded-tr-none' : 'bg-white text-gray-800 rounded-tl-none border border-gray-100'}`}>
                      <p className="text-sm leading-relaxed">{msg.content}</p>
                      <div className={`text-[10px] mt-1 text-right ${isMe ? 'text-emerald-100' : 'text-gray-400'}`}>
                        {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 bg-white border-t border-gray-100">
              <div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2">
                <Paperclip className="text-gray-400 cursor-pointer hover:text-gray-600" size={20} />
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Type a message..."
                  className="flex-1 bg-transparent border-none focus:ring-0 outline-none text-gray-700 placeholder-gray-500"
                />
                <button
                  onClick={handleSend}
                  className="bg-emerald-600 p-2 rounded-full text-white hover:bg-emerald-700 transition-transform hover:scale-105 active:scale-95 shadow-md"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8 bg-gray-50">
            <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mb-4 text-emerald-500 animate-pulse">
              <Send size={48} />
            </div>
            <h3 className="text-xl font-bold text-gray-800">Select a Conversation</h3>
            <p className="text-gray-500 mt-2 max-w-md">Choose a buyer or supplier from the list to start chatting.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
