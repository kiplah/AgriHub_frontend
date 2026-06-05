'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts } from '@/reducers/product/productSlice';
import { Search, ShoppingBag, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

function MarketplaceContent() {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.product);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const searchParams = useSearchParams();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  // Sync search input with URL search parameters
  useEffect(() => {
    const search = searchParams?.get("search") || "";
    setSearchTerm(search);
  }, [searchParams]);

  // Extract unique categories dynamically from products
  const categories = [
    "All",
    ...Array.from(
      new Set(
        products
          .map((p) => p.category_details?.name || p.category_name)
          .filter(Boolean)
      )
    )
  ];

  // Filter products based on search term and category
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const catName = product.category_details?.name || product.category_name || "Uncategorized";
    const matchesCategory = activeCategory === "All" || catName === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  const getProductImage = (product) => {
    if (!product.imagepath) {
      return "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=2070&auto=format&fit=crop";
    }
    if (product.imagepath.startsWith("http")) {
      return product.imagepath;
    }
    const cleanPath = product.imagepath.replace(/^\/+/, "");
    return `http://127.0.0.1:8000/${cleanPath}`;
  };

  return (
    <div className="space-y-6">
      {/* Subheader and Search Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Agro-Mart Marketplace</h1>
          <p className="text-sm text-gray-500 mt-1">Browse quality agricultural crops and items listed by verified sellers</p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-grow sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white text-gray-700 shadow-sm"
            />
          </div>
        </div>
      </div>

      {/* Category Pills Navigation */}
      <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 border ${
              activeCategory === cat
                ? "bg-emerald-600 border-emerald-600 text-white shadow-sm"
                : "bg-white border-gray-200 text-gray-600 hover:bg-emerald-50/50 hover:text-emerald-700"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Products list */}
      <div className="min-h-[400px]">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 animate-pulse">
                <div className="h-44 bg-gray-200 rounded-xl mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                <div className="h-10 bg-gray-200 rounded-lg"></div>
              </div>
            ))}
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-40 bg-gray-50 overflow-hidden">
                    <img
                      src={getProductImage(product)}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.target.src = "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=2070&auto=format&fit=crop";
                      }}
                    />
                    <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-2.5 py-0.5 rounded-full text-[10px] font-bold text-emerald-700 shadow-sm capitalize">
                      {product.category_details?.name || product.category_name || "Crop"}
                    </div>
                  </div>
                  <div className="p-4 space-y-1.5">
                    <div className="flex items-center justify-between text-[11px] text-gray-400">
                      <span>📍 {product.location || "Kenya"}</span>
                      {product.stock_quantity && (
                        <span className="font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                          Qty: {product.stock_quantity} {product.unit || "kg"}
                        </span>
                      )}
                    </div>
                    <h3 className="font-bold text-gray-950 group-hover:text-emerald-700 transition-colors text-sm truncate">
                      {product.name}
                    </h3>
                    <p className="text-gray-500 text-xs line-clamp-2 min-h-[32px]">
                      {product.description || "High quality fresh agricultural produce directly from verified farms."}
                    </p>
                  </div>
                </div>

                <div className="p-4 pt-0">
                  <div className="flex items-center justify-between border-t border-gray-100 pt-4 mt-2">
                    <div className="flex flex-col">
                      <span className="text-[9px] text-gray-400 uppercase tracking-wider font-semibold">Price</span>
                      <span className="text-emerald-700 font-extrabold text-sm">KES {product.price}</span>
                    </div>
                    <Link href={`/Product/${product.id}`}>
                      <button className="flex items-center gap-1 px-3 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold rounded-xl text-[11px] transition-all transform hover:scale-105 active:scale-95">
                        Buy Now
                        <ArrowRight size={12} />
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-16 text-center bg-white border rounded-2xl shadow-sm border-gray-100 max-w-md mx-auto mt-6">
            <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
              <ShoppingBag className="w-8 h-8 text-emerald-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-800">No products found</h3>
            <p className="text-gray-500 mt-2 text-xs max-w-xs mx-auto">
              We couldn't find any products matching "{searchTerm}" in category "{activeCategory}".
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setActiveCategory("All");
              }}
              className="mt-5 px-5 py-2 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 shadow-sm text-xs transition-all"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function BuyerMarketplace() {
  return (
    <Suspense fallback={<div className="text-center py-8">Loading Marketplace...</div>}>
      <MarketplaceContent />
    </Suspense>
  );
}
