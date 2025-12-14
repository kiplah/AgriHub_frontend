"use client"

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "@/reducers/Category/categorySlice";
import { getProducts } from "@/reducers/product/productSlice";
import Navbar from "@/Components/Navbar/Navbar";
import Footer from "@/Components/Footer/Footer";
import Newsletter from "@/Components/NewsLetter/Newsletter";
import ProductCard from "@/Components/ProductCard/ProductCard";
import CategoryCard from "@/Components/CategoryCard/CategoryCard";
import Benifits from "@/Components/Benifites/Benifits";
import Testimonial from "@/Components/Testimonial/Testimonial";
import { GiBarbedSpear } from "react-icons/gi";
import { FaSearch } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useState } from "react";
export default function Page() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

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

        <div className="relative mt-[120px] md:mt-[160px] z-20 container mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start h-full pb-20">

          {/* Left Sidebar - Categories (Hidden on mobile) */}
          <div className="hidden lg:block col-span-3 bg-green-900/60 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-2xl h-full max-h-[600px] overflow-y-auto custom-scrollbar">
            <h3 className="text-white font-bold text-xl mb-6 flex items-center gap-2 border-b border-white/10 pb-4">
              <span className="text-green-400">☰</span> Categories
            </h3>
            <ul className="space-y-2">
              {categories && categories.length > 0 ? categories.map((cat) => (
                <li key={cat.id}>
                  <a href={`/products?category=${cat.id}`} className="block text-gray-100 hover:text-white hover:bg-white/10 px-4 py-3 rounded-xl transition-all duration-200 font-medium flex items-center justify-between group">
                    {cat.name}
                    <span className="text-green-400 opacity-0 group-hover:opacity-100 transition-opacity">›</span>
                  </a>
                </li>
              )) : (
                <p className="text-gray-300 italic px-4">Loading categories...</p>
              )}
            </ul>
          </div>

          {/* Main Hero Content (Span 9) */}
          <div className="col-span-1 lg:col-span-9 flex flex-col items-center lg:items-start text-center lg:text-left space-y-8 pt-4 lg:pt-10">

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="relative w-full max-w-3xl mb-4 animate-fade-in-down z-30">
              <div className="relative group">
                <input
                  type="text"
                  placeholder="🔍 Search crops, animals, fertilizers, tools..."
                  className="w-full py-4 pl-6 pr-14 bg-white/95 backdrop-blur-md border border-green-200 rounded-full text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-green-400/50 shadow-2xl text-lg transition-all duration-300"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-green-600 hover:bg-green-700 text-white p-3 rounded-full transition-all duration-300 shadow-lg hover:scale-105"
                >
                  <FaSearch />
                </button>
              </div>
            </form>

            <div className="space-y-6">
              <div className="inline-block bg-green-500/20 backdrop-blur-sm border border-green-400/30 rounded-full px-4 py-1">
                <h2 className="text-sm md:text-base font-bold text-green-300 animate-fade-in uppercase tracking-wider">
                  Revolutionizing Agriculture 🌱
                </h2>
              </div>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-tight drop-shadow-2xl animate-slide-in">
                Welcome to <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-emerald-500 underline decoration-emerald-500/50 decoration-wavy">AgroMart</span>
              </h1>

              <p className="text-lg md:text-xl text-gray-100 max-w-2xl leading-relaxed drop-shadow-lg animate-fade-in-delayed font-light">
                Your one-stop marketplace for premium agricultural tools, seeds, and produce.
                Empowering farmers with sustainable solutions for a better tomorrow.
              </p>
            </div>

            <div className="flex flex-wrap justify-center lg:justify-start gap-4 mt-6">
              <button onClick={() => router.push('/products')} className="bg-green-600 hover:bg-green-500 text-white font-bold py-4 px-10 rounded-full shadow-lg shadow-green-900/20 transition-all transform hover:scale-105 flex items-center gap-2">
                Shop Now <span className="text-xl">→</span>
              </button>
              <button className="bg-white/10 border border-white/30 hover:bg-white/20 text-white font-semibold py-4 px-10 rounded-full shadow-lg transition-all transform hover:scale-105 backdrop-blur-sm">
                Learn More
              </button>
            </div>

            {/* Quick Stats or Trust Indicators could go here */}
            <div className="grid grid-cols-3 gap-6 pt-8 w-full max-w-2xl border-t border-white/10 mt-4">
              <div>
                <p className="text-2xl font-bold text-white">1k+</p>
                <p className="text-xs text-green-200 uppercase tracking-wide">Products</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">500+</p>
                <p className="text-xs text-green-200 uppercase tracking-wide">Farmers</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">24/7</p>
                <p className="text-xs text-green-200 uppercase tracking-wide">Support</p>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute top-0 w-full h-64 bg-gradient-to-b from-black to-transparent"></div>
        <div className="absolute bottom-0 w-full h-64 bg-gradient-to-t from-black to-transparent"></div>
      </div>
      <div className="bg-[#f9fafb] py-16">
        <div className="container mx-auto px-6 space-y-20">

          {/* Categories Section */}
          <section>
            <div className="flex justify-between items-end mb-8 border-b border-gray-200 pb-4">
              <div>
                <h2 className="text-3xl font-extrabold text-[#2c6e49]">Shop by Category</h2>
                <p className="text-gray-500 mt-2">Find everything you need for your farm</p>
              </div>
              <a href="/categories" className="hidden md:inline-flex items-center gap-2 text-[#47b881] font-bold hover:text-[#2c6e49] transition-colors">
                View All Categories <span className="text-xl">→</span>
              </a>
            </div>

            {categoriesLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map(i => <div key={i} className="h-64 bg-gray-200 rounded-2xl animate-pulse"></div>)}
              </div>
            ) : categoriesError ? (
              <p className="text-red-500">{categoriesError}</p>
            ) : (
              <div className="space-y-12">
                {categories && categories.length > 0 ? (
                  categories.map((mainCategory) => (
                    <div key={mainCategory.id}>
                      <h3 className="text-xl font-bold text-gray-700 mb-6 flex items-center gap-2">
                        <span className="w-2 h-8 bg-green-500 rounded-full inline-block"></span>
                        {mainCategory.name}
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {mainCategory.subcategories && mainCategory.subcategories.length > 0 ? (
                          mainCategory.subcategories.map((sub) => (
                            <div key={sub.id} className="transform transition-all duration-300 hover:-translate-y-2">
                              <CategoryCard
                                name={sub.name}
                                src={sub.imagepath?.startsWith('http') ? sub.imagepath : sub.imagepath ? `http://127.0.0.1:8000/${sub.imagepath}` : "/placeholder.jpg"}
                                description={sub.description}
                                link={`/products?category=${sub.id}`}
                              />
                            </div>
                          ))
                        ) : (
                          <p className="text-gray-400 italic col-span-full">No subcategories available.</p>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No categories found.</p>
                )}
              </div>
            )}

            <div className="mt-8 md:hidden text-center">
              <a href="/categories" className="text-[#47b881] font-bold">View All Categories →</a>
            </div>
          </section>

          {/* Featured Products Section */}
          <section>
            <div className="flex justify-between items-end mb-8 border-b border-gray-200 pb-4">
              <div>
                <h2 className="text-3xl font-extrabold text-[#2c6e49]">Featured Products</h2>
                <p className="text-gray-500 mt-2">Top picks from our marketplace</p>
              </div>
              <a href="/products" className="hidden md:inline-flex items-center gap-2 text-[#47b881] font-bold hover:text-[#2c6e49] transition-colors">
                View All Products <span className="text-xl">→</span>
              </a>
            </div>

            {productsLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {[1, 2, 3, 4].map(i => <div key={i} className="h-80 bg-gray-200 rounded-3xl animate-pulse"></div>)}
              </div>
            ) : productsError ? (
              <p className="text-red-500">{productsError}</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
                {products && products.length > 0 ? (
                  products.slice(0, 8).map((product) => (
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
                  <p className="text-gray-500 col-span-full text-center">No products found</p>
                )}
              </div>
            )}

            <div className="mt-12 text-center md:hidden">
              <button
                onClick={() => window.location.href = '/products'}
                className="bg-[#47b881] hover:bg-[#3a9149] text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all"
              >
                View All Products
              </button>
            </div>
          </section>

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
