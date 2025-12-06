'use client';

import React from 'react';
import { Card } from '../../Components/ui/Card';
import { mockLivestock } from '../../utils/mockData';
import { Plus, MoreVertical, Heart, Activity, Weight } from 'lucide-react';

export default function Livestock() {
    return (
        <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">Livestock Management</h1>
                    <p className="text-gray-600 mt-1">
                        Monitor health and productivity of your animals
                    </p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 shadow-sm transition-colors">
                    <Plus size={20} />
                    Add Livestock
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockLivestock.map((animal, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                        <div className="relative h-48 bg-gray-100">
                            <img
                                src={animal.image || "https://images.unsplash.com/photo-1546445317-29f4545e9d53?q=80&w=2002&auto=format&fit=crop"}
                                alt={animal.name}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute top-3 right-3">
                                <button className="p-1.5 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white text-gray-700">
                                    <MoreVertical size={16} />
                                </button>
                            </div>
                            <div className="absolute bottom-3 left-3 bg-emerald-500 text-white text-xs font-bold px-2 py-1 rounded-md">
                                Healthy
                            </div>
                        </div>
                        <div className="p-5">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="font-semibold text-gray-900 text-lg">{animal.name}</h3>
                                <span className="text-emerald-600 font-bold">{animal.price}</span>
                            </div>
                            <p className="text-gray-500 text-sm mb-4 line-clamp-2">{animal.description}</p>

                            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-100">
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <Activity size={16} className="text-blue-500" />
                                    <span>Age: 2 yrs</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <Weight size={16} className="text-orange-500" />
                                    <span>Weight: 450kg</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
