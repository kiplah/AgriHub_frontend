"use client";
import React from "react";

const CategoryCard = ({ name, src, description }) => {
  return (
    <div className="relative bg-gradient-to-b from-green-100 to-white p-6 rounded-3xl shadow-lg hover:shadow-xl hover:scale-105 transform transition-transform duration-300 w-full sm:w-[280px]">
      <div className="relative w-[150px] h-[150px] mx-auto rounded-full overflow-hidden shadow-md border-4 border-green-500">
        <img
          className="w-full h-full object-cover"
          src={src}
          alt={name || "Category"}
        />
      </div>

      <div className="text-center mt-6">
        <h3 className="text-2xl font-bold text-green-700">
          {name || "Category"}
        </h3>
        <p className="text-sm text-gray-600 mt-2">
          {description || "Description goes here."}
        </p>
      </div>

      <div className="flex justify-center items-center mt-4">
        <div className="w-10 h-[2px] bg-green-500"></div>
        <div className="w-6 h-6 bg-green-500 text-white flex items-center justify-center rounded-full mx-2">
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

      <div className="mt-6">
        <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-8 rounded-full shadow-md transition-all duration-300 transform hover:scale-105">
          Explore More
        </button>
      </div>
    </div>
  );
};

export default CategoryCard;
