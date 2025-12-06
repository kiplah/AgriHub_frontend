'use client';

import React from 'react';
import { Card } from '../../Components/ui/Card';
import { FlaskConical, Droplets, Thermometer, Activity } from 'lucide-react';

export default function SoilAnalysis() {
    return (
        <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
            <div>
                <h1 className="text-2xl font-semibold text-gray-900">Soil Analysis</h1>
                <p className="text-gray-600 mt-1">
                    Detailed breakdown of soil composition and health.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-gray-500 font-medium">Nitrogen (N)</h3>
                        <FlaskConical className="text-blue-500" size={20} />
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-2">Medium</div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-gray-500 font-medium">Phosphorus (P)</h3>
                        <FlaskConical className="text-purple-500" size={20} />
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-2">High</div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                        <div className="bg-purple-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-gray-500 font-medium">Potassium (K)</h3>
                        <FlaskConical className="text-orange-500" size={20} />
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-2">Low</div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                        <div className="bg-orange-500 h-2 rounded-full" style={{ width: '30%' }}></div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-gray-500 font-medium">pH Level</h3>
                        <Activity className="text-green-500" size={20} />
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-2">6.5</div>
                    <p className="text-xs text-green-600 font-medium">Optimal for most crops</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Soil Moisture Map</h2>
                    <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200">
                        <p className="text-gray-400">Interactive Map Placeholder</p>
                    </div>
                </Card>

                <Card>
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Recommendations</h2>
                    <div className="space-y-4">
                        <div className="p-4 bg-orange-50 border border-orange-100 rounded-lg">
                            <h3 className="font-bold text-orange-800 mb-1">Add Potassium Fertilizer</h3>
                            <p className="text-orange-700 text-sm">Potassium levels are low. Consider adding potash to improve root strength.</p>
                        </div>
                        <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg">
                            <h3 className="font-bold text-blue-800 mb-1">Maintain Watering Schedule</h3>
                            <p className="text-blue-700 text-sm">Moisture levels are adequate. Continue current irrigation plan.</p>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}
