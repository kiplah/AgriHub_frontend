"use client";
import Footer from "@/Components/Footer/Footer";
import Navbar from "@/Components/Navbar/Navbar";
import Newsletter from "@/Components/NewsLetter/Newsletter";
import ProductCard from "@/Components/ProductCard/ProductCard";
import { useState } from "react";

const ProductCatalog = ({ bground }) => {
  const initialProducts = [
    {
      id: 1,
      name: "Fertilizer",
      imageUrl:
        "https://image.made-in-china.com/202f0j00zlprGMCoYkqP/Herbicide-Bensulfuron-Methyl-10-Bentazole-45-Wp-Hot-Sales-Keep-Grass-Products.webp",
      price: 20,
      rating: 4,
      available: true,
      category: "Fertilizer",
    },
    {
      id: 2,
      name: "Pesticide",
      imageUrl:
        "https://image.made-in-china.com/2f0j00RfLqdFvkCgpV/Best-Selling-Agriculture-Pesticides-Emamectin-Benzoate-Abamectin-Insektisida-Abamectin-95-Tc-1-8c.webp",
      price: 50,
      rating: 5,
      available: false,
      category: "Pesticide",
    },
    {
      id: 3,
      name: "Farm Machinery",
      imageUrl:
        "https://image.made-in-china.com/2f0j00gvHqFsQlEhbe/Agricultural-Machine-and-Farm-Equipment-Rice-Wheat-Combine-Harvester.webp",
      price: 30,
      rating: 3,
      available: true,
      category: "Farm Machinery",
    },
    {
      id: 4,
      name: "Seeds",
      imageUrl: "https://i.brecorder.com/large/2024/03/6604aab2bf8c4.jpg",
      price: 25,
      rating: 4,
      available: true,
      category: "Seeds",
    },
    {
      id: 5,
      name: "Fertilizer",
      imageUrl:
        "https://image.made-in-china.com/202f0j00zlprGMCoYkqP/Herbicide-Bensulfuron-Methyl-10-Bentazole-45-Wp-Hot-Sales-Keep-Grass-Products.webp",
      price: 20,
      rating: 4,
      available: true,
      category: "Fertilizer",
    },
    {
      id: 6,
      name: "Pesticide",
      imageUrl:
        "https://image.made-in-china.com/2f0j00RfLqdFvkCgpV/Best-Selling-Agriculture-Pesticides-Emamectin-Benzoate-Abamectin-Insektisida-Abamectin-95-Tc-1-8c.webp",
      price: 50,
      rating: 5,
      available: false,
      category: "Pesticide",
    },
    {
      id: 7,
      name: "Farm Machinery",
      imageUrl:
        "https://image.made-in-china.com/2f0j00gvHqFsQlEhbe/Agricultural-Machine-and-Farm-Equipment-Rice-Wheat-Combine-Harvester.webp",
      price: 30,
      rating: 3,
      available: true,
      category: "Farm Machinery",
    },
    {
      id: 8,
      name: "Seeds",
      imageUrl: "https://i.brecorder.com/large/2024/03/6604aab2bf8c4.jpg",
      price: 25,
      rating: 4,
      available: true,
      category: "Seeds",
    },
    {
      id: 9,
      name: "Seeds",
      imageUrl: "https://i.brecorder.com/large/2024/03/6604aab2bf8c4.jpg",
      price: 25,
      rating: 4,
      available: true,
      category: "Seeds",
    },
    {
      id: 10,
      name: "Fertilizer",
      imageUrl:
        "https://image.made-in-china.com/202f0j00zlprGMCoYkqP/Herbicide-Bensulfuron-Methyl-10-Bentazole-45-Wp-Hot-Sales-Keep-Grass-Products.webp",
      price: 20,
      rating: 4,
      available: true,
      category: "Fertilizer",
    },
    {
      id: 11,
      name: "Pesticide",
      imageUrl:
        "https://image.made-in-china.com/2f0j00RfLqdFvkCgpV/Best-Selling-Agriculture-Pesticides-Emamectin-Benzoate-Abamectin-Insektisida-Abamectin-95-Tc-1-8c.webp",
      price: 50,
      rating: 5,
      available: false,
      category: "Pesticide",
    },
    {
      id: 12,
      name: "Farm Machinery",
      imageUrl:
        "https://image.made-in-china.com/2f0j00gvHqFsQlEhbe/Agricultural-Machine-and-Farm-Equipment-Rice-Wheat-Combine-Harvester.webp",
      price: 30,
      rating: 3,
      available: true,
      category: "Farm Machinery",
    },
    {
      id: 13,
      name: "Seeds",
      imageUrl: "https://i.brecorder.com/large/2024/03/6604aab2bf8c4.jpg",
      price: 25,
      rating: 4,
      available: true,
      category: "Seeds",
    },
  ];

  const categories = [
    "All",
    "Fertilizer",
    "Pesticide",
    "Farm Machinery",
    "Seeds",
  ];

  const [products] = useState(initialProducts);
  const [filteredProducts, setFilteredProducts] = useState(initialProducts);

  const handleFilter = (category) => {
    if (category === "All") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter((product) => product.category === category)
      );
    }
  };

  const handleSort = (sortOption) => {
    const sortedProducts = [...filteredProducts];
    if (sortOption === "price-asc") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (sortOption === "price-desc") {
      sortedProducts.sort((a, b) => b.price - a.price);
    } else if (sortOption === "newest") {
      sortedProducts.sort((a, b) => b.id - a.id);
    }
    setFilteredProducts(sortedProducts);
  };

  return (
    <div>
      <Navbar bground={true} />
      <div
        className="relative overflow-hidden py-20"
        style={{
          backgroundImage: `
      linear-gradient(to bottom, rgba(0, 128, 0, 0.6), rgba(255, 255, 255, 0.8)),
      url('https://t4.ftcdn.net/jpg/08/25/59/35/360_F_825593515_VKsf1azJx0C9OVq6myxRjewTE5J40RFy.jpg')`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          filter: "brightness(1) contrast(1.1)",
        }}
      >
        <div className="absolute top-[-50px] right-[-50px] w-72 h-72 bg-green-200 rounded-full blur-2xl opacity-30"></div>
        <div className="absolute bottom-[-50px] left-[-50px] w-96 h-96 bg-lime-300 rounded-full blur-3xl opacity-40"></div>
        <div className="p-8 pt-36 mx-auto font-sans text-gray-800">
          <div className="w-[90%] mx-auto">
            <h1 className="text-5xl font-extrabold mb-28 text-center text-gray-800">
               Discover the Best{" "}
              <span className="text-green-600">Products</span> <br />for Your Needs 🌱
            </h1>

            <div className="sm:p-10 bg-white flex flex-col md:flex-row justify-between shadow-xl items-center rounded-xl w-[90%] h-[150px] my-8 mx-auto gap-8">
              <div className="flex items-center w-full md:w-[450px] lg:w-[550px]">
                <input
                  type="text"
                  placeholder="🔍 Search for products..."
                  className="w-full p-3 border border-gray-300 rounded-l-full focus:outline-none focus:ring-4 focus:ring-green-500"
                  onChange={(e) => handleSearch(e.target.value)}
                />
                <button className="bg-green-600 text-white px-6 py-3 rounded-r-full hover:bg-green-700 transition-all duration-300">
                  Search
                </button>
              </div>

              <div className="flex flex-col md:flex-row gap-6 w-full md:w-auto justify-center items-center">
                <div className="flex flex-col bg-gray-50 p-4 rounded-lg shadow-sm">
                  <h3 className="text-lg font-semibold mb-4 text-center">
                    Categories
                  </h3>
                  <select
                    onChange={(e) => handleFilter(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-500"
                  >
                    {categories.map((category, index) => (
                      <option key={index} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col bg-gray-50 p-4 rounded-lg shadow-sm">
                  <h3 className="text-lg font-semibold mb-4 text-center">
                    Sort by Price
                  </h3>
                  <select
                    onChange={(e) => handleSort(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-500"
                  >
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="newest">Newest</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 -z-50">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  title={product.name}
                  src={product.imageUrl}
                  price={product.price}
                  rating={product.rating}
                  avai={product.available}
                  cat={product.category}
                />
              ))}
            </div>
          </div>
        </div>
        <Newsletter />
        <Footer />
      </div>
    </div>
  );
};

export default ProductCatalog;
