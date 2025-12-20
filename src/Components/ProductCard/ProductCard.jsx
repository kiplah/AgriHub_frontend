"use client";
import React from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { MapPin, Heart, Star } from "lucide-react";

export default function ProductCard({
  id,
  image,
  name,
  category,
  price,
  location,
  postedDate,
  priceType = "Negotiable",
  children
}) {
  const { token } = useSelector((state) => state.auth);

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!token) {
      toast.error("You are not logged in");
      return;
    }

    toast.success("Added to favorites!");
  };
  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col h-full group">
      {/* Image Container */}
      <div className="relative aspect-[4/3] bg-gray-50 overflow-hidden">
        {/* Featured Badge */}
        <div className="absolute top-0 left-0 z-10">
          <div className="bg-red-600 text-white p-2 rounded-br-2xl shadow-sm">
            <Star className="w-4 h-4 fill-current" />
          </div>
        </div>

        {/* Favorite Button */}
        {/* Favorite Button */}
        <div className="absolute top-3 right-3 z-10 group/btn">
          <button
            onClick={handleFavoriteClick}
            className="bg-white/80 backdrop-blur-sm p-1.5 rounded-full text-gray-400 hover:text-red-500 hover:bg-white transition-colors relative"
          >
            <Heart className="w-5 h-5" />
          </button>
          {/* Tooltip */}
          <div className="absolute top-full right-0 mt-2 w-max px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover/btn:opacity-100 transition-opacity pointer-events-none z-20 whitespace-nowrap">
            Click to make it favourite
            {/* Tiny arrow */}
            <div className="absolute bottom-full right-2 border-4 border-transparent border-b-gray-900"></div>
          </div>
        </div>

        <Link href={`/Product/${id}`}>
          <img
            src={image || "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=2070&auto=format&fit=crop"}
            alt={name || "Product"}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=2070&auto=format&fit=crop";
            }}
          />
        </Link>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="mb-1">
          <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
            {category || "Uncategorized"}
          </span>
        </div>

        <Link href={`/Product/${id}`}>
          <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-emerald-600 transition-colors">
            {name}
          </h3>
        </Link>

        <div className="flex items-center gap-1.5 text-gray-500 mb-2">
          <MapPin className="w-4 h-4 shrink-0 text-gray-400" />
          <span className="text-sm line-clamp-1">{location || "Location not specified"}</span>
        </div>

        <div className="text-xs text-gray-400 mb-4">
          Posted on {postedDate}
        </div>

        <div className="mt-auto pt-3 border-t border-gray-50">
          <div className="flex items-baseline gap-2">
            <span className="text-emerald-600 font-bold text-lg">
              Ksh{price}
            </span>
            <span className="text-xs text-gray-500 font-medium">
              ({priceType})
            </span>
          </div>
        </div>

        {/* Optional Children (e.g. Action Buttons) */}
        {children && (
          <div className="mt-4 pt-3 border-t border-gray-100">
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
