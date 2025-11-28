"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "@/reducers/Category/categorySlice";
import CategoryCard from "@/Components/CategoryCard/CategoryCard";
import Navbar from "@/Components/Navbar/Navbar";
import Footer from "@/Components/Footer/Footer";
import Newsletter from "@/Components/NewsLetter/Newsletter";
import { FaSearch } from "react-icons/fa";
import { GiBarbedSpear } from "react-icons/gi";

export default function CategoriesPage() {
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector((state) => state.category);

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    setFilteredCategories(categories);
  }, [categories]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    const filtered = categories.filter((category) =>
      category.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredCategories(filtered);

    const suggestedNames = categories
      .map((category) => category.name)
      .filter((name) => name.toLowerCase().includes(value.toLowerCase()));
    setSuggestions(suggestedNames);
  };

  return (
    <div >
    <div className="min-h-screen relative overflow-hidden font-sans">
  <div
    className="absolute inset-0 bg-cover bg-center bg-fixed filter brightness-50"
    style={{
      backgroundImage:
        "url('https://images6.alphacoders.com/134/thumb-1920-1347850.png')",
    }}
  ></div>

  <div className="absolute inset-0 z-10">
    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-800/30 to-black opacity-80"></div>
    <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 to-transparent opacity-40 animate-gradient-x"></div>
    <div className="absolute top-0 left-0 w-96 h-96 bg-green-500 rounded-full blur-3xl opacity-20 animate-bounce-slow"></div>
    <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-400 rounded-full blur-3xl opacity-20 animate-bounce-slow-reverse"></div>
  </div>

  <div className="relative z-30">
    <Navbar />
  </div>

  <div className="relative mt-[160px] md:mt-[230px] z-20 flex flex-col items-center justify-center h-full text-center px-6 space-y-8 md:space-y-12">
    <div className="absolute top-10 left-10 w-12 h-12 bg-green-400 rounded-full blur-lg opacity-50 animate-ping"></div>
    <div className="absolute bottom-20 right-20 w-16 h-16 bg-green-500 rounded-full blur-lg opacity-30 animate-pulse"></div>

    <div className="flex items-center justify-center space-x-6">
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-green-400 animate-fade-in">
        Explore Our Farming Categories 🌾
      </h2>
    </div>

    <h1 className="text-[40px] sm:text-7xl lg:text-8xl font-extrabold text-white leading-tight tracking-wide drop-shadow-2xl animate-slide-in">
      Discover{" "}
      <span className="text-green-400 underline decoration-wavy">
        AgroMart Categories
      </span>
    </h1>

    <p className="text-lg sm:text-xl lg:text-2xl text-gray-200 max-w-4xl leading-relaxed drop-shadow-md animate-fade-in-delayed">
      Browse through a diverse range of agricultural categories, designed to meet every farmer's needs — from eco-friendly fertilizers to advanced machinery and sustainable solutions.
    </p>

    <div className="flex items-center space-x-6">
      <div className="w-16 h-1 bg-green-500 rounded-full animate-pulse"></div>
      <span className="text-green-400 font-bold text-md md:text-lg tracking-wider uppercase animate-bounce">
        Find the Perfect Tools for Your Farm
      </span>
      <div className="w-16 h-1 bg-green-500 rounded-full animate-pulse"></div>
    </div>

    <div className="flex flex-col sm:flex-row items-center gap-8 mt-6 pb-8">
      <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-4 px-16 rounded-full shadow-2xl transition-transform transform hover:scale-110 hover:shadow-green-500/50 animate-fade-up">
        Browse Categories
      </button>
      <button className="bg-transparent border-2 border-green-600 text-green-400 hover:bg-green-600 hover:text-white font-semibold py-4 px-16 rounded-full shadow-xl transition-transform transform hover:scale-110 hover:shadow-green-600/50 animate-fade-up-delayed">
        Learn More
      </button>
    </div>
  </div>

  <div className="absolute top-0 w-full h-64 bg-gradient-to-b from-black to-transparent"></div>
  <div className="absolute bottom-0 w-full h-64 bg-gradient-to-t from-black to-transparent"></div>
</div>

      <div className="relative z-10 py-16  w-[85%]mx-auto text-center">
        <h2 className="text-2xl md:text-5xl font-extrabold text-green-800 mb-4 drop-shadow-md">
          Discover Our Farming Categories
        </h2>
        <p className="text-md md:text-xl text-green-700 mb-10 max-w-2xl mx-auto">
          Explore a wide range of categories designed to meet every farmer’s needs. From eco-friendly fertilizers to advanced farming tools, we have it all!
        </p>

        {/* Search bar with suggestions */}
        <div className="relative w-full max-w-lg mx-auto mb-6">
          <input
            type="text"
            placeholder="Search Categories..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full p-4 rounded-full border border-green-400 bg-white text-gray-800 focus:ring-2 focus:ring-green-500 focus:outline-none shadow-md"
          />
          <FaSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-green-500" size={20} />
          {searchTerm && suggestions.length > 0 && (
            <ul className="absolute left-0 text-left w-full bg-white shadow-lg rounded-md mt-2 max-h-40 overflow-y-auto border border-gray-300 z-50">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="p-2 hover:bg-green-100 cursor-pointer"
                  onClick={() => {
                    setSearchTerm(suggestion);
                    setTimeout(() => {
                      handleSearch({ target: { value: suggestion } });
                      setSuggestions([]);
                    }, 100);
                  }}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Decorative spear section */}
        <div className="flex items-center mt-16 justify-center gap-4 mb-12">
          <div className="w-16 h-1 bg-green-600 rounded-full"></div>
          <GiBarbedSpear
            size={40}
            className="animate-pulse"
            style={{ transform: "rotate(45deg)", color: "#2c6e49" }}
          />
          <div className="w-16 h-1 bg-green-600 rounded-full"></div>
        </div>

        {/* Categories grid */}
        <div className="mt-6 pt-8">
          {loading ? (
            <p className="text-center text-green-800">Loading categories...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : (
            <div className="flex flex-wrap gap-8 justify-center">
              {filteredCategories.map((category) => (
                <CategoryCard
                  key={category.id}
                  name={category.name}
                  src={`http://localhost:8080/${category.imagepath}`}
                  description={category.description}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Newsletter & Footer */}
      <div className="relative z-10 mt-16">
        <Newsletter />
        <Footer />
      </div>
    </div>
  );
}
