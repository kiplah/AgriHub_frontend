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
  const [selectedRating, setSelectedRating] = useState(0);
  const [newReviewText, setNewReviewText] = useState("");

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
      sellerId:product.userId,
      });
      toast.success(`${product.name} added to cart successfully!`, {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const handleSubmitReview = async () => {
    if (!newReviewText.trim() || selectedRating === 0) {
      toast.error("Please provide a valid review and rating.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    if (!user) {
      toast.error("You need to be logged in to submit a review.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    const newReview = {
      productId: parseInt(id, 10),
      rating: selectedRating,
      review: newReviewText,
      userId: user.id,
      userName: user.username,
    };

    try {
      await dispatch(saveReview(newReview)).unwrap();
      toast.success("Review submitted successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
      setNewReviewText("");
      setSelectedRating(0);
      dispatch(fetchReviewsByProductId(id)); // Refresh reviews
    } catch (err) {
      console.error("Error saving review:", err);
      toast.error("Failed to submit review. Please try again later.", {
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
    ? `http://localhost:8080/${product.imagepath}`
    : "path/to/default-image.jpg"; // Fallback image

    const averageRating = stats.avgRating > 0 ? stats.avgRating.toFixed(1) : "No ratings yet";
    const totalReviews = stats.totalReviews || 0;
    
    
    
  return (
    <>
      <Navbar bground={true} />
      <div
        className="relative overflow-hidden py-20"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0, 128, 0, 0.6), rgba(255, 255, 255, 0.8)),
        url('https://static.vecteezy.com/system/resources/previews/001/431/110/non_2x/abstract-green-grass-in-bokeh-background-free-vector.jpg')`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <section className="container mx-auto px-6">
          <div className="container mx-auto mt-28 p-10 bg-gradient-to-r from-green-100 to-white shadow-2xl rounded-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center min-h-[600px]">
              <div className="flex justify-center items-center">
                <img
                  src={imageUrl}
                  alt={product.name}
                  className="w-[90%] max-h-[500px] object-cover rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="flex flex-col justify-between space-y-10 p-6">
                <h1 className="text-2xl md:text-5xl font-bold">{product.name}</h1>
                <p className="text-gray-600">{product.description}</p>
                <p className="text-gray-800 text-lg font-medium">
  Average Rating: {averageRating} ({totalReviews} reviews)
</p>
               
               
<div className="flex flex-col space-y-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-medium text-gray-800">
                      Category:
                    </span>
                    <span className="text-lg font-bold text-green-600">
                      {product.categoryName}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-medium text-gray-800">
                      Posted By:
                    </span>
                    <span className="text-lg font-bold text-green-600">
                      {username || "Unknown"}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-medium text-gray-800">
                      Price:
                    </span>
                    <span className="text-3xl font-extrabold text-green-600">
                      ${product.price}
                    </span>
                  </div>
                </div>
                <button
                  onClick={handleAddToCart}
                  className="w-full py-2 md:py-4 bg-green-600 text-white text-lg md:text-xl font-semibold rounded-lg hover:bg-green-700 shadow-xl hover:shadow-green-500/50 transition-transform hover:scale-105"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
          <section className="mt-10 py-12 px-6 bg-gradient-to-br from-green-100 to-green-50 rounded-lg shadow-2xl">
            <h2 className="text-2xl md:text-5xl font-extrabold text-green-700 mb-10 text-center">
              Customer Reviews
            </h2>
          
            <div className="mt-10">
              <h3 className="text-xl font-bold mb-4">Add Your Review</h3>
              <div className="flex items-center mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar
                    key={star}
                    className={`cursor-pointer text-2xl ${
                      star <= selectedRating ? "text-yellow-500" : "text-gray-300"
                    }`}
                    onClick={() => setSelectedRating(star)}
                  />
                ))}
              </div>
              <textarea
                value={newReviewText}
                onChange={(e) => setNewReviewText(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md"
                placeholder="Write your review here..."
              ></textarea>
              <button
                onClick={handleSubmitReview}
                className="mt-4 px-6 py-2 bg-green-600 text-white font-semibold rounded-lg"
              >
                Submit Review
              </button>
            </div>
          <div className="mt-8">
          {reviews.map((review) => (
              <div key={review.id} className="p-6 bg-white rounded-xl shadow-lg mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-lg font-bold text-gray-800">{review.username}</span>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={i < review.rating ? "text-yellow-500" : "text-gray-300"}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-gray-600">{review.review}</p>
              </div>
            ))}
          </div>
          </section>
        </section>
      </div>
      <Newsletter />
      <Footer />
    </>
  );
};

export default ProductDetailsPage;
