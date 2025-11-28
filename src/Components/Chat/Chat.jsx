'use client';
import React, { useState } from "react";

export default function ChatComponent() {
  const [isChatOpen, setIsChatOpen] = useState(false); 
  const [messages, setMessages] = useState([]); 
  const [message, setMessage] = useState(""); 

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const handleSendMessage = () => {
    if (message.trim() === "") return; 

    const newMessage = { sender: "You", text: message };
    setMessages((prev) => [...prev, newMessage]); 
    setMessage(""); 

    setTimeout(() => {
      const autoReply = {
        sender: "Agro Mart",
        text: "Hello! Thank you for reaching out to Agro Mart. How can we assist you today?",
      };
      setMessages((prev) => [...prev, autoReply]); 
    }, 1000); 
  };

  return (
    <div>
      <button
        onClick={toggleChat}
        className="fixed bottom-4 right-4 p-4 bg-green-700 text-white rounded-full shadow-lg hover:bg-green-600"
      >
        Chat
      </button>

      {isChatOpen && (
        <div className="fixed bottom-16 right-4 bg-white w-96 h-[30rem] p-4 shadow-lg rounded-lg">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-green-700">Agro Mart Chat</h3>
            <button
              onClick={toggleChat}
              className="text-gray-500 hover:text-green-600"
            >
              X
            </button>
          </div>
          <div className="mt-4 h-[22rem] overflow-y-auto border-b border-gray-300 pb-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.sender === "Agro Mart" ? "justify-start" : "justify-end"
                } mb-2`}
              >
                <div
                  className={`p-2 rounded-lg ${
                    msg.sender === "Agro Mart"
                      ? "bg-green-100 text-green-700"
                      : "bg-green-700 text-white"
                  }`}
                >
                  <span className="font-semibold">{msg.sender}: </span>
                  <span>{msg.text}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="flex mt-4">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
            <button
              onClick={handleSendMessage}
              className="ml-2 p-2 bg-green-700 text-white rounded-lg hover:bg-green-600"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
