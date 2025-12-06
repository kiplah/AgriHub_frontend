'use client';

import React from 'react';
import { Card } from '../../Components/ui/Card';
import { StatCard } from '../../Components/ui/StatCard';
import { Search, Filter, ShoppingCart } from 'lucide-react';
import { mockCrops, mockLivestock } from '../../utils/mockData';
import Image from 'next/image';

export default function Marketplace() {
    const allProducts = [...mockCrops, ...mockLivestock];

    return (
        <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">Marketplace</h1>
                    <p className="text-gray-600 mt-1">
                        Browse and buy quality agricultural products
                    </p>
                </div>
                <div className="flex gap-4">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50">
                        <Filter size={20} />
                        Filter
                    </button>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 w-64"
                        />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {allProducts.map((product, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group">
                        <div className="relative h-48 w-full bg-gray-100">
                            {/* Placeholder for product image if actual image fails to load */}
                            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                                <ShoppingBagIcon size={48} />
                            </div>
                            {/* Use a generic agriculture image if specific one is missing */}
                            <img
                                src={product.image || "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=2070&auto=format&fit=crop"}
                                alt={product.name}
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-semibold text-emerald-700">
                                {product.type === 'crop' ? 'Crop' : 'Livestock'}
                            </div>
                        </div>
                        <div className="p-4">
                            <h3 className="font-semibold text-gray-900 text-lg mb-1">{product.name}</h3>
                            <p className="text-gray-500 text-sm mb-3 line-clamp-2">{product.description || "High quality agricultural product directly from the farm."}</p>
                            <div className="flex items-center justify-between mt-4">
                                <span className="text-emerald-600 font-bold text-lg">{product.price}</span>
                                <button className="p-2 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100 transition-colors">
                                    <ShoppingCart size={20} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function ShoppingBagIcon({ size }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
            <path d="M3 6h18" />
            <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
    )
}
