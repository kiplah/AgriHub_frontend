"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { fetchProductById } from "@/reducers/product/productSlice";
import { fetchReviewsByProductId, saveReview } from "@/reducers/Review/reviewSlice";
import Navbar from "@/Components/Navbar/Navbar";
import Footer from "@/Components/Footer/Footer";
import Newsletter from "@/Components/NewsLetter/Newsletter";
import { FaStar } from "react-icons/fa";
import { useCart } from "../../../utilities/CartContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ProductDetailsPage = () => {
  const params = useParams();
  const id = params?.id;
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);

  const { product, username, loading: productLoading, error: productError } =
    useSelector((state) => ({
      product: state.product?.product || null,
      username: state.product?.username || null,
      loading: state.product?.loading || false,
      error: state.product?.error || null,
    }));

  const { reviews, stats, loading: reviewLoading, error: reviewError } =
    useSelector((state) => ({
      reviews: state.reviews?.reviews || [],
      stats: state.reviews?.stats || { avgRating: 0, totalReviews: 0 },
      loading: state.reviews?.loading || false,
      error: state.reviews?.error || null,
    }));

  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id));
      dispatch(fetchReviewsByProductId(id));
    }
  }, [dispatch, id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        id: product.id,
        name: product.name,
        image: product.imagepath,
        price: product.price,
        sellerId: product.userId,
        quantity: quantity,
      });
      toast.success(`${quantity} ${product.name}(s) added to cart successfully!`, {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  if (productLoading || reviewLoading) {
    return <p>Loading product details...</p>;
  }

  if (productError || reviewError) {
    return <p>Error: {productError || reviewError}</p>;
  }

  if (!product) {
    return <p>No product found!</p>;
  }

  const imageUrl = product.imagepath
    ? (product.imagepath.startsWith('http') ? product.imagepath : `http://127.0.0.1:8000${product.imagepath}`)
    : "https://via.placeholder.com/600x600?text=No+Image";

  const averageRating = stats.avgRating > 0 ? stats.avgRating.toFixed(1) : "New";
  const totalReviews = stats.totalReviews || 0;

  return (
    <>
      <Navbar bground={true} />
      <div className="min-h-screen bg-gray-50 pt-32 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">

          {/* Breadcrumb / Back Navigation could go here */}

          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-8">

              {/* Product Image Section */}
              <div className="relative h-[400px] sm:h-[500px] lg:h-full min-h-[500px] bg-gray-100 flex items-center justify-center p-8">
                <img
                  src={imageUrl}
                  alt={product.name}
                  className="w-full h-full object-contain mix-blend-multiply hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Product Info Section */}
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <div className="mb-6">
                  <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide text-green-700 bg-green-100 mb-4">
                    {product.categoryName || "Agricultural Product"}
                  </span>
                  <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
                    {product.name}
                  </h1>

                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center text-yellow-400">
                      <FaStar className="text-xl" />
                      <span className="ml-2 text-gray-700 font-bold text-lg">{averageRating}</span>
                    </div>
                    <span className="text-gray-400">|</span>
                    <span className="text-gray-500 text-sm font-medium">{totalReviews} Reviews</span>
                  </div>
                </div>

                <p className="text-gray-600 text-lg leading-relaxed mb-8">
                  {product.description}
                </p>

                <div className="grid grid-cols-2 gap-6 mb-8 border-t border-b border-gray-100 py-6">
                  <div>
                    <p className="text-sm text-gray-500 font-medium uppercase tracking-wider mb-1">Price</p>
                    <p className="text-3xl font-bold text-green-600">${product.price}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium uppercase tracking-wider mb-1">Seller</p>
                    <p className="text-lg font-semibold text-gray-800">{username || "AgroMart User"}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  {/* Quantity */}
                  <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 shadow-inner">
                    <button onClick={handleDecrement} className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-green-600 font-bold text-xl transition-colors">
                      -
                    </button>
                    <span className="w-12 text-center text-xl font-bold text-gray-800">{quantity}</span>
                    <button onClick={handleIncrement} className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-green-600 font-bold text-xl transition-colors">
                      +
                    </button>
                  </div>

                  {/* Add to Cart */}
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 w-full py-4 px-8 bg-green-600 hover:bg-green-700 text-white text-lg font-bold rounded-full shadow-lg hover:shadow-green-500/30 transform hover:-translate-y-1 transition-all duration-300 text-center"
                  >
                    Add to Cart
                  </button>
                </div>

              </div>
            </div>
          </div>

          {/* Existing Reviews Display - Simplified and Cleaned */}
          {reviews && reviews.length > 0 && (
            <div className="mt-16">
              <h3 className="text-2xl font-bold text-gray-900 mb-8 px-2">Customer Reviews</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {reviews.map((review) => (
                  <div key={review.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-700 font-bold">
                          {review.username ? review.username.charAt(0).toUpperCase() : "U"}
                        </div>
                        <p className="font-bold text-gray-900">{review.username}</p>
                      </div>
                      <div className="flex text-yellow-400 text-sm">
                        {[...Array(5)].map((_, i) => (
                          <FaStar key={i} className={i < review.rating ? "text-yellow-400" : "text-gray-200"} />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600 leading-relaxed italic">"{review.review}"</p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
      <Newsletter />
      <Footer />
    </>
  );
};

export default ProductDetailsPage;
