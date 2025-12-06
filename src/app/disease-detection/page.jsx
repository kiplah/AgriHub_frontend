'use client';

import React, { useState } from 'react';
import { Card } from '../../Components/ui/Card';
import { Upload, AlertTriangle, CheckCircle, Activity } from 'lucide-react';

export default function DiseaseDetection() {
    const [analyzing, setAnalyzing] = useState(false);
    const [result, setResult] = useState(null);

    const handleUpload = () => {
        setAnalyzing(true);
        // Simulate AI analysis
        setTimeout(() => {
            setAnalyzing(false);
            setResult({
                disease: 'Early Blight',
                confidence: '92%',
                recommendation: 'Apply fungicide containing chlorothalonil or copper. Ensure proper spacing between plants to improve air circulation.',
                severity: 'Moderate'
            });
        }, 2000);
    };

    return (
        <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
            <div>
                <h1 className="text-2xl font-semibold text-gray-900">Disease Detection</h1>
                <p className="text-gray-600 mt-1">
                    Upload a photo of your crop to detect diseases instantly using AI.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:bg-gray-50 transition-colors cursor-pointer" onClick={handleUpload}>
                        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Upload size={32} />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900">Upload Crop Image</h3>
                        <p className="text-gray-500 mt-2">Drag and drop or click to select</p>
                        <button className="mt-6 px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
                            Select Image
                        </button>
                    </div>
                </Card>

                <Card>
                    <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <Activity className="text-emerald-600" size={20} />
                        Analysis Result
                    </h2>

                    {analyzing ? (
                        <div className="flex flex-col items-center justify-center h-64">
                            <div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mb-4"></div>
                            <p className="text-gray-600 animate-pulse">Analyzing image...</p>
                        </div>
                    ) : result ? (
                        <div className="space-y-4">
                            <div className="p-4 bg-red-50 border border-red-100 rounded-lg flex items-start gap-3">
                                <AlertTriangle className="text-red-500 mt-1" size={24} />
                                <div>
                                    <h3 className="font-bold text-red-700 text-lg">{result.disease} Detected</h3>
                                    <p className="text-red-600 text-sm">Confidence: {result.confidence} • Severity: {result.severity}</p>
                                </div>
                            </div>

                            <div>
                                <h4 className="font-medium text-gray-900 mb-2">Recommendation:</h4>
                                <p className="text-gray-600 bg-gray-50 p-4 rounded-lg border border-gray-100">
                                    {result.recommendation}
                                </p>
                            </div>

                            <button className="w-full py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 mt-4">
                                Save Report
                            </button>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                            <CheckCircle size={48} className="mb-2 opacity-20" />
                            <p>No analysis yet. Upload an image to start.</p>
                        </div>
                    )}
                </Card>
            </div>
        </div>
    );
}
