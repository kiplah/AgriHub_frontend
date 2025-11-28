import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { FiMessageCircle, FiSend, FiX } from 'react-icons/fi';
import { motion } from 'framer-motion';

function Chatbot() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null); // For auto-scrolling
    const [userName, setUserName] = useState('You'); // Default username

    useEffect(() => {
        if (isChatOpen && messages.length === 0) {
            setMessages([{ role: 'bot', content: '👋 Hi! I am Support. How can I assist you today?' }]);
        }
    }, [isChatOpen]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = async () => {
        if (!input.trim()) return;

        const userMessage = { role: 'user', senderName: userName, content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsTyping(true);

        try {
            const response = await axios.post('http://localhost:8080/api/chatbot', { message: input });
            const botMessage = { role: 'bot', senderName: 'Support', content: response.data.reply };
            setTimeout(() => {
                setMessages(prev => [...prev, botMessage]);
                setIsTyping(false);
            }, 1000);
        } catch (error) {
            setMessages(prev => [...prev, { role: 'bot', senderName: 'Support', content: '⚠️ Error getting response. Please try again.' }]);
            setIsTyping(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {/* Floating Chat Icon (Changes on Click) */}
            <motion.button
                onClick={() => setIsChatOpen(!isChatOpen)}
                className="bg-green-600 text-white p-4 rounded-full shadow-lg hover:scale-105 transition flex items-center justify-center w-16 h-16"
                whileTap={{ scale: 0.9 }}
            >
                {isChatOpen ? <FiX size={28} /> : <FiMessageCircle size={28} />}
            </motion.button>

            {/* Chatbot Window */}
            {isChatOpen && (
                <motion.div 
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    className="fixed bottom-20 right-4 w-[90%] sm:w-96 max-h-[80vh] bg-white bg-opacity-90 backdrop-blur-lg border border-gray-300 rounded-3xl shadow-2xl flex flex-col z-40 overflow-hidden"
                >
                    {/* Header */}
                    <div className="bg-green-600 text-white p-4 flex justify-between items-center rounded-t-3xl">
                    <span className="font-bold text-lg">🌿 Agro Mart Chatbot</span>
                        <button onClick={() => setIsChatOpen(false)} className="text-white font-bold cursor-pointer">
                            <FiX size={20} />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 p-4 overflow-y-auto space-y-4 scrollbar-hide max-h-[60vh]">
                        {messages.map((msg, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div className={`rounded-xl px-4 py-3 text-sm max-w-[75%] shadow-md flex flex-col space-y-1 
                                    ${msg.role === 'user' ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-900'}`}>
                                    <span className="text-xs font-semibold">
                                        {msg.role === 'user' ? userName : 'Support'}
                                    </span>
                                    <span>{msg.content}</span>
                                </div>
                            </motion.div>
                        ))}
                        {isTyping && (
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ repeat: Infinity, duration: 0.5 }}
                                className="flex justify-start"
                            >
                                <div className="bg-gray-200 text-gray-900 px-4 py-2 rounded-xl text-sm">🤖 Support is typing...</div>
                            </motion.div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="p-3 border-t border-gray-200 flex items-center gap-2 bg-white">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                            placeholder="Type a message..."
                            className="flex-1 p-3 border rounded-2xl outline-none text-sm bg-gray-100 focus:ring focus:ring-green-300 shadow-md"
                        />
                        <button
                            onClick={handleSendMessage}
                            className="bg-green-500 text-white p-3 rounded-2xl flex items-center justify-center hover:scale-105 transition w-12 h-12 shadow-md"
                        >
                            <FiSend size={20} />
                        </button>
                    </div>
                </motion.div>
            )}
        </div>
    );
}

export default Chatbot;
