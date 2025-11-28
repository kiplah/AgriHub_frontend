"use client";
import React from "react";
import { useCart } from "../../utilities/CartContext";
import Link from "next/link";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductCard = ({ title, src, price, description, rating, id, sellerId }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    const product = {
      id,
      name: title,
      image: src,
      sellerId,
      price: parseFloat(price), // Ensure price is numeric
    };
  
    addToCart(product);
  
    // Display a success toast notification
    toast.success(`${title} added to cart!`, {
      position: "top-right", // Use string literal for position
      autoClose: 3000,
    });
  };
  
  return (
    <div className="relative bg-gradient-to-b from-green-50 via-white to-[#baf8cc] p-6 rounded-3xl shadow-lg hover:shadow-2xl hover:scale-105 transform transition-transform duration-300 w-[80%] sm:w-[320px] flex flex-col">
      <Link href={`/Product/${id}`}>
        <div className="absolute top-4 left-4 bg-gradient-to-r from-green-600 to-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
          Bestseller
        </div>

        <div className="relative w-[180px] h-[180px] mx-auto rounded-full overflow-hidden shadow-lg border-4 border-green-500">
          <img
            className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-110"
            src={src}
            alt={title || "Product"}
          />
        </div>
      </Link>
      <Link href={`/Product/${id}`}>
        <div className="text-center mt-6">
          <h3 className="text-xl font-bold text-green-700 truncate">
            {title || "Product Name"}
          </h3>
          <p className="text-sm text-gray-600 mt-2">
            {description || "A short description of the product."}
          </p>
          <p className="text-2xl font-bold text-green-600 mt-4">
            ${price || "0.00"}
          </p>
        </div>
      </Link>
      <div className="flex justify-center items-center mt-4">
        {Array.from({ length: 5 }, (_, index) => (
          <svg
            key={index}
            xmlns="http://www.w3.org/2000/svg"
            className={`h-5 w-5 ${
              index < Math.floor(rating || 4)
                ? "text-yellow-400"
                : "text-gray-300"
            }`}
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 .587l3.668 7.429 8.2 1.196-5.934 5.778 1.399 8.167L12 18.897l-7.333 3.86 1.399-8.167L.132 9.212l8.2-1.196L12 .587z" />
          </svg>
        ))}
      </div>

      <div className="flex justify-center items-center mt-6">
        <div className="w-10 h-[2px] bg-green-500"></div>
        <div className="w-6 h-6 bg-green-500 text-white flex items-center justify-center rounded-full mx-2 shadow-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <div className="w-10 h-[2px] bg-green-500"></div>
      </div>

      <div className="mt-8" onClick={handleAddToCart}>
        <button className="w-full bg-gradient-to-r from-green-600 to-green-500 text-white py-3 px-6 rounded-full font-bold shadow-lg hover:shadow-xl hover:scale-105 transform transition-all duration-300">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
