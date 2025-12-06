'use client';

import React from 'react';
import { Card } from '../../Components/ui/Card';
import { CloudSun, TrendingUp, DollarSign, BarChart } from 'lucide-react';

export default function YieldForecast() {
    return (
        <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
            <div>
                <h1 className="text-2xl font-semibold text-gray-900">Yield Forecast</h1>
                <p className="text-gray-600 mt-1">
                    Predict crop yields and estimated revenue.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-xl p-6 text-white shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-medium text-emerald-100">Predicted Yield</h3>
                        <BarChart className="text-emerald-200" size={24} />
                    </div>
                    <div className="text-4xl font-bold mb-1">45 Tons</div>
                    <p className="text-sm text-emerald-100">+12% vs last season</p>
                </div>
                <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-medium text-gray-500">Estimated Revenue</h3>
                        <DollarSign className="text-green-600" size={24} />
                    </div>
                    <div className="text-4xl font-bold text-gray-900 mb-1">KES 1.2M</div>
                    <p className="text-sm text-green-600 font-medium">Based on current market prices</p>
                </div>
                <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-medium text-gray-500">Confidence Score</h3>
                        <TrendingUp className="text-blue-600" size={24} />
                    </div>
                    <div className="text-4xl font-bold text-gray-900 mb-1">88%</div>
                    <p className="text-sm text-gray-500">High confidence</p>
                </div>
            </div>

            <Card>
                <h2 className="text-lg font-semibold text-gray-900 mb-6">Yield Projection Graph</h2>
                <div className="h-80 flex items-end justify-between gap-4 px-4 pb-4 border-b border-gray-200">
                    {[30, 45, 35, 50, 45, 60].map((height, index) => (
                        <div key={index} className="w-full flex flex-col items-center gap-2">
                            <div
                                className="w-full bg-emerald-100 hover:bg-emerald-200 transition-colors rounded-t-lg relative group"
                                style={{ height: `${height}%` }}
                            >
                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                    {height} Tons
                                </div>
                            </div>
                            <span className="text-xs text-gray-500 font-medium">202{index}</span>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
}
