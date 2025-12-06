'use client';

import React from 'react';
import { Card } from '../../Components/ui/Card';
import { mockOrders } from '../../utils/mockData';
import { Package, Truck, CheckCircle, Clock } from 'lucide-react';

export default function Orders() {
    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'delivered': return 'text-green-600 bg-green-50 border-green-200';
            case 'processing': return 'text-blue-600 bg-blue-50 border-blue-200';
            case 'shipped': return 'text-purple-600 bg-purple-50 border-purple-200';
            default: return 'text-gray-600 bg-gray-50 border-gray-200';
        }
    };

    const getStatusIcon = (status) => {
        switch (status.toLowerCase()) {
            case 'delivered': return <CheckCircle size={16} />;
            case 'processing': return <Clock size={16} />;
            case 'shipped': return <Truck size={16} />;
            default: return <Package size={16} />;
        }
    };

    return (
        <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
            <div>
                <h1 className="text-2xl font-semibold text-gray-900">My Orders</h1>
                <p className="text-gray-600 mt-1">
                    Track and manage your purchases
                </p>
            </div>

            <div className="space-y-4">
                {mockOrders.map((order) => (
                    <div key={order.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-4">
                            <div>
                                <div className="flex items-center gap-3">
                                    <h3 className="font-semibold text-gray-900 text-lg">{order.product}</h3>
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center gap-1.5 ${getStatusColor(order.status)}`}>
                                        {getStatusIcon(order.status)}
                                        {order.status}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-500 mt-1">Order ID: #{order.id} • Placed on {order.date}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-xl font-bold text-emerald-600">{order.total}</p>
                                <p className="text-sm text-gray-500">{order.items} items</p>
                            </div>
                        </div>

                        <div className="border-t border-gray-100 pt-4 flex justify-between items-center">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Truck size={16} className="text-gray-400" />
                                <span>Estimated Delivery: <span className="font-medium text-gray-900">Oct 24, 2023</span></span>
                            </div>
                            <button className="text-emerald-600 font-medium text-sm hover:text-emerald-700 hover:underline">
                                View Details
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
