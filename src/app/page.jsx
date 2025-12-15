"use client"

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "@/reducers/Category/categorySlice";
import { getProducts } from "@/reducers/product/productSlice";
import Navbar from "@/Components/Navbar/Navbar";
import Footer from "@/Components/Footer/Footer";
import Newsletter from "@/Components/NewsLetter/Newsletter";
import ProductCard from "@/Components/ProductCard/ProductCard";
import Benifits from "@/Components/Benifites/Benifits";
import Testimonial from "@/Components/Testimonial/Testimonial";
import { FaSearch, FaFilter } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function Page() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
    }
  };
  
  const { categories, loading: categoriesLoading, error: categoriesError } = useSelector(
    (state) => state.category
  );
  const { products, loading: productsLoading, error: productsError } = useSelector(
    (state) => state.product
  );
  
  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(getProducts());
  }, [dispatch]);

  // Filter Logic
  const filteredProducts = activeCategory === "All" 
    ? products 
    : products.filter(p => p.category === activeCategory || p.category_details?.name === activeCategory);

  return (
    <>
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
          {/* Hero Section Content - Kept Original */}
          <div className="absolute top-10 left-10 w-12 h-12 bg-green-400 rounded-full blur-lg opacity-50 animate-ping"></div>
          <div className="absolute bottom-20 right-20 w-16 h-16 bg-green-500 rounded-full blur-lg opacity-30 animate-pulse"></div>

          {/* Search Bar - Kept for Hero Context */}
          <form onSubmit={handleSearch} className="relative w-full max-w-xl mb-4 animate-fade-in-down z-50">
            <div className="relative group">
              <input
                type="text"
                placeholder="🔍 Search crops, animals, fertilizers, tools..."
                className="w-full py-4 pl-6 pr-14 bg-white/20 backdrop-blur-md border border-white/30 rounded-full text-white placeholder-green-100 focus:outline-none focus:ring-4 focus:ring-green-400/50 shadow-2xl text-lg transition-all duration-300 group-hover:bg-white/30"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-green-500 hover:bg-green-600 text-white p-3 rounded-full transition-all duration-300 shadow-lg hover:scale-110"
              >
                <FaSearch />
              </button>
            </div>
          </form>

          <div className="flex items-center justify-center space-x-6">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-green-400 animate-fade-in">
              Revolutionizing Agriculture 🌱
            </h2>
          </div>

          <h1 className="text-[40px] sm:text-7xl lg:text-8xl font-extrabold text-white leading-tight tracking-wide drop-shadow-2xl animate-slide-in">
            Welcome to{" "}
            <span className="text-green-400 underline decoration-wavy">
              AgroMart
            </span>
          </h1>

          <p className="text-lg sm:text-xl lg:text-2xl text-gray-200 max-w-4xl leading-relaxed drop-shadow-md animate-fade-in-delayed">
            Revolutionizing agriculture with innovative solutions, premium
            tools, and sustainable practices. Let’s cultivate a thriving future
            for farmers and the planet.
          </p>

          <div className="flex items-center space-x-6">
            <div className="w-16 h-1 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-green-400 font-bold text-md md:text-lg tracking-wider uppercase animate-bounce">
              Empowering Farmers Globally
            </span>
            <div className="w-16 h-1 bg-green-500 rounded-full animate-pulse"></div>
          </div>
          
          {/* Scroll Down Indicator */}
          <div className="pt-10 animate-bounce">
             <span className="text-white/50 text-sm">Scroll to Explore</span>
             <div className="w-0.5 h-12 bg-white/30 mx-auto mt-2"></div>
          </div>

        </div>
        <div className="absolute top-0 w-full h-64 bg-gradient-to-b from-black to-transparent"></div>
        <div className="absolute bottom-0 w-full h-64 bg-gradient-to-t from-black to-transparent"></div>
      </div>

      {/* Modern Product Exploration Section (Replaces Old Category + Product Grids) */}
      <div className="bg-gray-50 py-16 min-h-screen">
         <div className="container mx-auto px-4 md:px-8">
            
            {/* Header + Search + Filter Row */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-8">
               <div className="max-w-xl">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                    Browse and purchase agricultural products
                  </h2>
                  <p className="text-gray-500">Find the best seeds, fertilizers, and tools for your farm.</p>
               </div>
               
               <div className="flex gap-3 w-full md:w-auto">
                   <div className="relative flex-1 md:w-80">
                      <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input 
                        type="text" 
                        placeholder="Search products..." 
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 bg-white shadow-sm"
                        // Note: This local search filters the current list or could route to main search
                        // For this section, visually matching the mockup request
                      />
                   </div>
                   <button className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-lg font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 shadow-sm transition-all whitespace-nowrap">
                      <FaFilter className="text-gray-500" />
                      Filters
                   </button>
               </div>
            </div>

            {/* Category Pills Navigation */}
            <div className="flex gap-3 overflow-x-auto pb-6 mb-8 custom-scrollbar">
               <button 
                 onClick={() => setActiveCategory("All")}
                 className={`px-6 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${activeCategory === "All" ? "bg-green-600 text-white shadow-md shadow-green-200" : "bg-white text-gray-600 hover:bg-green-50 border border-gray-200"}`}
               >
                 All
               </button>
               {categories && categories.map(cat => (
                 <button 
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.name)} // Assuming product.category matches name or we map ID
                    className={`px-6 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${activeCategory === cat.name ? "bg-green-600 text-white shadow-md shadow-green-200" : "bg-white text-gray-600 hover:bg-green-50 border border-gray-200"}`}
                 >
                    {cat.name}
                 </button>
               ))}
               {/* Fixed Pills for visual match if categories fail */}
               {!categories && ["Seeds", "Fertilizers", "Pesticides", "Equipment"].map(cat => (
                  <button key={cat} className="px-6 py-2 rounded-lg font-medium whitespace-nowrap bg-white text-gray-600 hover:bg-green-50 border border-gray-200">
                     {cat}
                  </button>
               ))}
            </div>

            {/* Filtered Product Grid */}
            <div className="min-h-[400px]">
               {productsLoading ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                     {[1,2,3,4,5,6,7,8].map(i => <div key={i} className="h-80 bg-gray-200 rounded-3xl animate-pulse"></div>)}
                  </div>
               ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                     {filteredProducts && filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                          <ProductCard
                            key={product.id}
                            id={product.id}
                            src={product.imagepath?.startsWith('http') ? product.imagepath : `http://127.0.0.1:8000/${product.imagepath}`}
                            title={product.name}
                            cat={product.category}
                            price={product.price}
                            description={product.description}
                            rating={product.rating}
                            sellerId={product.userId}
                          />
                        ))
                     ) : (
                        <div className="col-span-full py-20 text-center">
                           <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                              <span className="text-4xl">🌱</span>
                           </div>
                           <h3 className="text-xl font-bold text-gray-800">No products found in this category</h3>
                           <p className="text-gray-500 mt-2">Try selecting "All" or browse other categories.</p>
                           <button onClick={() => setActiveCategory("All")} className="mt-6 text-green-600 font-bold hover:underline">Clear Filters</button>
                        </div>
                     )}
                  </div>
               )}
            </div>

            <div className="mt-16 text-center">
                <button onClick={() => router.push('/products')} className="px-8 py-3 border border-green-600 text-green-700 font-bold rounded-lg hover:bg-green-50 transition-colors">
                   View Full Marketplace
                </button>
            </div>

         </div>
      </div>

      <div>
        <Benifits />
      </div>

      <div>
        <Testimonial />
      </div>

      <div className="w-full">
        <Newsletter />
      </div>

      <div className="w-full">
        <Footer />
      </div>
    </>
  );
}
