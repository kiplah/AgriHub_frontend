"use client";

import React, { useEffect } from "react";
import { Provider } from "react-redux";
import store from "../store/store";
import Authentication from "../Components/Authentication";
import { CartProvider } from "../utilities/CartContext";
import { ToastContainer } from "react-toastify";
import LiveChatbot from "@/Components/LiveChat/LiveChat";

export default function ClientProviders({ children }) {
    // Title rotation logic
    useEffect(() => {
        const titles = [
            "Agro Mart - Revolutionizing Farming",
            "Agro Mart - Empowering Farmers",
            "Agro Mart - Sustainable Agriculture",
        ];

        const descriptions = [
            "Revolutionizing agriculture with cutting-edge AI and smart tools.",
            "Empowering farmers with innovative technology and logistics.",
            "Leading the way in sustainable and smart farming practices.",
        ];

        let index = 0;

        const interval = setInterval(() => {
            document.title = titles[index];
            // Note: Updating meta description dynamically in client might not affect SEO crawlers
            // but keeps the visual effect for users.
            const metaDescription = document.querySelector("meta[name='description']");
            if (metaDescription) {
                metaDescription.setAttribute("content", descriptions[index]);
            }
            index = (index + 1) % titles.length;
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <ToastContainer />
            <Provider store={store}>
                <CartProvider>
                    <Authentication>
                        {children}
                        <LiveChatbot />
                    </Authentication>
                </CartProvider>
            </Provider>
        </>
    );
}
