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
export default function Page() {
  const dispatch = useDispatch();
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

        <div className="relative mt-[160px] md:mt-[230px] z-20 flex flex-col items-center justify-center h-full text-center px-6 space-y-8 md:space-y-12">
          <div className="absolute top-10 left-10 w-12 h-12 bg-green-400 rounded-full blur-lg opacity-50 animate-ping"></div>
          <div className="absolute bottom-20 right-20 w-16 h-16 bg-green-500 rounded-full blur-lg opacity-30 animate-pulse"></div>
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

          <div className="flex flex-col sm:flex-row items-center gap-8 mt-6 pb-8 ">
            <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-4 px-16 rounded-full shadow-2xl transition-transform transform hover:scale-110 hover:shadow-green-500/50 animate-fade-up">
              Shop Products
            </button>
            <button className="bg-transparent border-2 border-green-600 text-green-400 hover:bg-green-600 hover:text-white font-semibold py-4 px-16 rounded-full shadow-xl transition-transform transform hover:scale-110 hover:shadow-green-600/50 animate-fade-up-delayed">
              Learn More
            </button>
          </div>
        </div>

        <div className="absolute top-0 w-full h-64 bg-gradient-to-b from-black to-transparent"></div>
        <div className="absolute bottom-0 w-full h-64 bg-gradient-to-t from-black to-transparent"></div>
      </div>
      <div className="py-16 relative bg-white overflow-hidden">
        <div className="absolute top-[-50px] right-[-50px] w-72 h-72 bg-[#f3fdf5] rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-[-50px] left-[-50px] w-96 h-96 bg-[#e2f9e9] rounded-full blur-3xl opacity-40"></div>
        <div className="relative z-10 w-[85%] mx-auto text-center">
          <h2 className="text-2xl md:text-5xl font-extrabold text-[#2c6e49] mb-4 drop-shadow-md">
            Discover Our Farming Categories
          </h2>
          <p className="text-md md:text-xl text-[#4f8c69] mb-10 max-w-2xl mx-auto">
            Explore a wide range of categories designed to meet every farmer’s
            needs. From eco-friendly fertilizers to advanced farming tools, we
            have it all!
          </p>
          <div className="flex items-center justify-center gap-4 mb-12">
            <div className="w-16 h-1 bg-[#47b881] rounded-full"></div>
            <GiBarbedSpear
              size={40}
              className="animate-pulse"
              style={{ transform: "rotate(45deg)", color: "#3a9149" }}
            />
            <div className="w-16 h-1 bg-[#47b881] rounded-full"></div>
          </div>
          {categoriesLoading ? (
            <p>Loading categories...</p>
          ) : categoriesError ? (
            <p className="text-red-500">{categoriesError}</p>
          ) : (
            <div className="flex flex-wrap gap-10 justify-center">
              {categories && categories.length > 0 ? (
                categories.map((category) => (
                  <CategoryCard
                    key={category.id}
                    name={category.name}
                    src={`http://localhost:8080/${category.imagepath}`}
                    description={category.description}
                  />
                ))
              ) : (
                <p className="text-gray-500">No categories found</p>
              )}
            </div>
          )}
          <div className="mt-16">
            <button 
              onClick={() => window.location.href = '/categories'}
            className="bg-[#47b881] hover:bg-[#3a9149] text-white font-bold py-4 px-14 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 hover:shadow-[#66bb6a]/50">
              View All Categories
            </button>
          </div>
        </div>
      </div>
      <div className="py-16 relative bg-white overflow-hidden">
        <div className="absolute top-[-50px] right-[-50px] w-72 h-72 bg-[#e9f7ef] rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-[-50px] left-[-50px] w-96 h-96 bg-[#d1f2dc] rounded-full blur-3xl opacity-40"></div>
        <div className="relative z-10 w-[85%] mx-auto text-center">
          <h2 className="text-2xl md:text-5xl font-extrabold text-[#2c6e49] mb-4 drop-shadow-md">
            Explore Our Featured Products
          </h2>
          <p className="text-md md:text-xl text-[#4f8c69] mb-10 max-w-2xl mx-auto">
            Discover our handpicked, sustainable tools and products designed to
            enhance your farming journey with innovation and care.
          </p>
          <div className="flex items-center justify-center gap-4 mb-12">
            <div className="w-16 h-1 bg-[#47b881] rounded-full"></div>
            <GiBarbedSpear
              size={40}
              className="animate-pulse"
              style={{ transform: "rotate(45deg)", color: "#3a9149" }}
            />
            <div className="w-16 h-1 bg-[#47b881] rounded-full"></div>
          </div>
          <div className="flex flex-wrap gap-10 justify-center">
          {productsLoading ? (
          <p>Loading products...</p>
        ) :  productsError ? (
          <p className="text-red-500">{ productsError}</p>
        ) : (
          <div className="flex flex-wrap gap-10 justify-center">
            {products && products.length > 0 ? (
              products.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  src={`http://localhost:8080/${product.imagepath}`}
                  title={product.name}
                  cat={product.category}
                  price={product.price}
                  description={product.description}
                  rating={product.rating}
                  sellerId={product.userId}
                />
              ))
            ) : (
              <p className="text-gray-500">No products found</p>
            )}
          </div>
        )}
          </div>
          <div className="mt-16">
            <button 
            onClick={() => window.location.href = '/products'}
            className="bg-[#47b881] hover:bg-[#3a9149] text-white font-bold py-4 px-8 md:px-14 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 hover:shadow-[#66bb6a]/50">
              View All Products
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
