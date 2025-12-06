'use client';

import React from 'react';
import { Card } from '../../Components/ui/Card';
import { TrendingUp, Calendar, Sun, CloudRain } from 'lucide-react';

export default function GrowthPrediction() {
    return (
        <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
            <div>
                <h1 className="text-2xl font-semibold text-gray-900">Growth Prediction</h1>
                <p className="text-gray-600 mt-1">
                    AI-powered growth timeline and harvest estimation.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <Card>
                        <h2 className="text-lg font-semibold text-gray-900 mb-6">Growth Timeline</h2>
                        <div className="relative pl-8 border-l-2 border-emerald-100 space-y-8">
                            {[
                                { stage: 'Germination', date: 'Sep 15', status: 'Completed', color: 'bg-emerald-500' },
                                { stage: 'Vegetative Growth', date: 'Oct 01', status: 'Current Stage', color: 'bg-blue-500' },
                                { stage: 'Flowering', date: 'Oct 20', status: 'Predicted', color: 'bg-gray-300' },
                                { stage: 'Harvest', date: 'Nov 15', status: 'Predicted', color: 'bg-gray-300' },
                            ].map((item, index) => (
                                <div key={index} className="relative">
                                    <div className={`absolute -left-[41px] w-5 h-5 rounded-full border-4 border-white ${item.color}`}></div>
                                    <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
                                        <div className="flex justify-between items-center mb-1">
                                            <h3 className="font-semibold text-gray-900">{item.stage}</h3>
                                            <span className="text-xs font-medium text-gray-500">{item.status}</span>
                                        </div>
                                        <p className="text-sm text-gray-500 flex items-center gap-2">
                                            <Calendar size={14} />
                                            {item.date}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card>
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Environmental Factors</h2>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-yellow-100 text-yellow-600 rounded-lg">
                                        <Sun size={20} />
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">Sunlight</p>
                                        <p className="text-xs text-gray-500">Optimal</p>
                                    </div>
                                </div>
                                <span className="font-bold text-gray-700">8 hrs</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                                        <CloudRain size={20} />
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">Rainfall</p>
                                        <p className="text-xs text-gray-500">Below Average</p>
                                    </div>
                                </div>
                                <span className="font-bold text-gray-700">12 mm</span>
                            </div>
                        </div>
                    </Card>

                    <div className="bg-emerald-600 rounded-xl p-6 text-white">
                        <h3 className="font-semibold text-lg mb-2">Harvest Estimate</h3>
                        <div className="text-4xl font-bold mb-1">Nov 15</div>
                        <p className="text-emerald-100 text-sm">Predicted with 85% accuracy based on current growth rate.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
