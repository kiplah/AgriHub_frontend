import React from "react";

const Newsletter = () => {
  return (
    <div className="relative text-white pt-16 pb-24 px-6 sm:px-12 z-0">
      <div className="absolute inset-0 bg-black bg-opacity-60 bg-blend-multiply bg-[url('https://images3.alphacoders.com/211/thumb-440-211667.webp')] bg-cover bg-center"></div>
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <h2 className="text-2xl md:text-5xl  font-extrabold mb-6 leading-snug">
          Stay Connected with <br />
          <span className="text-green-400 underline decoration-green-500 decoration-4 underline-offset-4">
            Agro Mart
          </span>
        </h2>

        <p className="text-sm md:text-lg font-light mb-10 text-gray-300">
          Join our community to receive the latest updates, exclusive deals, and
          expert insights on sustainable farming, innovative tools, and market
          trends—delivered straight to your inbox.
        </p>

        <form className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <input
            type="email"
            placeholder="Enter your email address"
            className="px-6 py-3 w-full sm:w-auto flex-1 text-gray-800 rounded-full border border-green-400 focus:outline-none focus:ring-4 focus:ring-green-500 shadow-md transition-all duration-300 placeholder-gray-500"
            required
          />

          <button
            type="submit"
            className="bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white font-semibold px-10 py-3 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-500"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default Newsletter;
