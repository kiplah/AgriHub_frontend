"use client";
import React from "react";
import { Card } from "@/Components/ui/Card";
import { Star, User, ThumbsUp } from "lucide-react";
import Profile from "@/Components/ProfileCard/ProfileCard";

const reviewsUtils = [
    {
        id: 1,
        customer: "Alice Johnson",
        rating: 5,
        date: "2024-11-15",
        product: "Fresh Organic Tomatoes",
        comment: "Excellent quality tomatoes! Delivered fresh and on time. Will definitely order again.",
        likes: 12
    },
    {
        id: 2,
        customer: "Mark Spencer",
        rating: 4,
        date: "2024-11-10",
        product: "Dairy Cow - Friesian",
        comment: "The cow looks healthy, but the pickup process was a bit confusing. Otherwise good transaction.",
        likes: 3
    },
    {
        id: 3,
        customer: "Sarah Williams",
        rating: 5,
        date: "2024-11-05",
        product: "Bag of Fertilizer (50kg)",
        comment: "Great price and fast delivery. My crops are loving it!",
        likes: 8
    },
    {
        id: 4,
        customer: "David Brown",
        rating: 2,
        date: "2024-10-28",
        product: "Mixed Vegetable Basket",
        comment: "Some of the spinach was wilted. Not the best quality I've seen.",
        likes: 0
    },
];

const ReviewsPage = () => {
    return (
        <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
            <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Customer Reviews</h1>
                    <p className="text-gray-600 mt-1">
                        See what your customers are saying about your products.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="col-span-1 md:col-span-2 space-y-4">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Latest Reviews</h2>
                    {reviewsUtils.map((review) => (
                        <div key={review.id} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 font-bold">
                                        {review.customer.charAt(0)}
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900">{review.customer}</h4>
                                        <p className="text-xs text-gray-500">{review.date}</p>
                                    </div>
                                </div>
                                <div className="flex bg-yellow-50 px-2 py-1 rounded text-yellow-600 text-xs font-bold items-center gap-1">
                                    <Star size={12} fill="currentColor" />
                                    {review.rating}.0
                                </div>
                            </div>
                            <div className="mt-3">
                                <p className="text-sm text-gray-800 italic">"{review.product}"</p>
                                <p className="text-gray-600 mt-2 text-sm leading-relaxed">{review.comment}</p>
                            </div>
                            <div className="mt-3 flex items-center text-gray-400 text-sm gap-4">
                                <button className="flex items-center gap-1 hover:text-emerald-600 transition-colors">
                                    <ThumbsUp size={14} />
                                    Helpful ({review.likes})
                                </button>
                            </div>
                        </div>
                    ))}
                </Card>

                <div className="space-y-6">
                    <Card>
                        <div className="text-center py-6">
                            <h3 className="text-lg font-semibold text-gray-900">Overall Rating</h3>
                            <div className="text-5xl font-bold text-emerald-600 mt-4 mb-2">4.8</div>
                            <div className="flex justify-center text-yellow-400 mb-2 gap-1">
                                <Star fill="currentColor" size={24} />
                                <Star fill="currentColor" size={24} />
                                <Star fill="currentColor" size={24} />
                                <Star fill="currentColor" size={24} />
                                <Star fill="currentColor" size={24} />
                            </div>
                            <p className="text-sm text-gray-500">Based on 124 reviews</p>
                        </div>
                    </Card>

                    <Card>
                        <h3 className="font-semibold text-gray-900 mb-4">Rating Breakdown</h3>
                        <div className="space-y-3">
                            {[5, 4, 3, 2, 1].map((star) => (
                                <div key={star} className="flex items-center gap-2 text-sm">
                                    <span className="w-3 font-medium">{star}</span>
                                    <Star size={12} className="text-gray-400" />
                                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-emerald-500 rounded-full"
                                            style={{ width: star === 5 ? '70%' : star === 4 ? '20%' : star === 3 ? '5%' : '2%' }}
                                        ></div>
                                    </div>
                                    <span className="w-8 text-right text-gray-500">{star === 5 ? '70%' : star === 4 ? '20%' : star === 3 ? '5%' : '<5%'}</span>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default ReviewsPage;
