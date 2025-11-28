"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts} from "@/reducers/product/productSlice";
import Navbar from "@/Components/Navbar/Navbar";
import Footer from "@/Components/Footer/Footer";
import MachineCard from "@/Components/ProductCard/ProductCard";
import Newsletter from "@/Components/NewsLetter/Newsletter";

export default function RentalMachines() {
  const dispatch = useDispatch();
    const { products, loading, error } = useSelector((state) => state.product);
  
 useEffect(() => {
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

        <div className="relative mt-[160px] md:mt-48 sm:mt-48 z-20 flex flex-col items-center justify-center text-center px-6 space-y-6 sm:space-y-12">
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-green-400 animate-fade-in">
            Let's Cultivate Productivity 🌱
          </h2>
          <h1 className="text-[35px] sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-wide drop-shadow-2xl animate-slide-in">
            Connect with{" "}
            <span className="text-green-400 underline decoration-wavy">
              AgroMart
            </span>
          </h1>
          <h1 className="text-[28px] sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-wide drop-shadow-2xl animate-slide-in">
            for Your Rental Equipments
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-200 max-w-3xl sm:max-w-4xl leading-relaxed drop-shadow-md animate-fade-in-delayed">
            Whether you're looking to rent agricultural machinery, a farmer in
            need of support, or a potential partner, we’re here to help.
          </p>
          <div className="flex flex-wrap justify-center items-center space-x-4">
            <div className="w-16 h-1 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-green-400 font-bold text-sm sm:text-lg tracking-wider uppercase animate-bounce">
              Need a Rental? Let’s Talk Equipment Solutions!
            </span>
            <div className="w-16 h-1 bg-green-500 rounded-full animate-pulse"></div>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-8 mt-6 pb-8">
            <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-4 px-16 rounded-full shadow-2xl transition-transform transform hover:scale-110 hover:shadow-green-500/50 animate-fade-up">
              Browse Equipment
            </button>
            <button className="bg-transparent border-2 border-green-600 text-green-400 hover:bg-green-600 hover:text-white font-semibold py-4 px-16 rounded-full shadow-xl transition-transform transform hover:scale-110 hover:shadow-green-600/50 animate-fade-up-delayed">
              Learn More
            </button>
          </div>
        </div>
      </div>

      <div className="py-16 bg-white">
        <div className="w-[85%] mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#2c6e49] mb-4">
            Our Rental Equipment
          </h2>
          <p className="text-md md:text-xl text-[#4f8c69] mb-10">
            Browse our diverse selection of high-performance agricultural machines available for rent.
          </p>

          {products.length > 0 ? (
            <div className="flex flex-wrap gap-10 justify-center">
              {products.map((machine) => (
                <MachineCard
                  key={machine.id}
                  id={machine.id}
                  src={`http://localhost:8080/${machine.imagepath}`}
                  title={machine.name}
                  category={machine.categoryName}
                  price={machine.price}
                  availability={machine.availability}
                />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No rental machines available.</p>
          )}
        </div>
      </div>

      <Newsletter />
      <Footer />
    </>
  );
}
