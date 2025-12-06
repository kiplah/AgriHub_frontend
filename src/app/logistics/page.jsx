'use client';

import React from 'react';
import { Card } from '../../Components/ui/Card';
import { StatCard } from '../../Components/ui/StatCard';
import { Truck, MapPin, Package, Clock, CheckCircle } from 'lucide-react';

export default function Logistics() {
    const mockShipments = [
        { id: 'TRK-001', destination: 'Nairobi Market', status: 'In Transit', eta: '2 hrs', cargo: 'Fresh Vegetables' },
        { id: 'TRK-002', destination: 'Mombasa Port', status: 'Loading', eta: '5 hrs', cargo: 'Grain Sacks' },
        { id: 'TRK-003', destination: 'Kisumu Depot', status: 'Delivered', eta: '-', cargo: 'Fertilizer' },
    ];

    const mockVehicles = [
        { id: 'KBA 123A', type: 'Truck', capacity: '10 Tons', status: 'Active' },
        { id: 'KCD 456B', type: 'Van', capacity: '2 Tons', status: 'Maintenance' },
    ];

    return (
        <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
            <div>
                <h1 className="text-2xl font-semibold text-gray-900">Logistics & Transport</h1>
                <p className="text-gray-600 mt-1">
                    Manage fleet and track shipments
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                    title="Active Shipments"
                    value="2"
                    icon={Truck}
                    trend={{ value: 1, isPositive: true }}
                />
                <StatCard
                    title="Fleet Status"
                    value="1 Active"
                    icon={CheckCircle}
                />
                <StatCard
                    title="Deliveries Today"
                    value="5"
                    icon={Package}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <Truck className="text-emerald-600" size={20} />
                        Active Shipments
                    </h2>
                    <div className="space-y-4">
                        {mockShipments.map((shipment, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                                <div>
                                    <p className="font-medium text-gray-900">{shipment.destination}</p>
                                    <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                                        <Package size={14} />
                                        <span>{shipment.cargo}</span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${shipment.status === 'In Transit' ? 'bg-blue-100 text-blue-700' :
                                            shipment.status === 'Loading' ? 'bg-yellow-100 text-yellow-700' :
                                                'bg-green-100 text-green-700'
                                        }`}>
                                        {shipment.status}
                                    </span>
                                    <p className="text-xs text-gray-500 mt-1">ETA: {shipment.eta}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                <Card>
                    <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <MapPin className="text-emerald-600" size={20} />
                        Fleet Management
                    </h2>
                    <div className="space-y-4">
                        {mockVehicles.map((vehicle, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border border-gray-200">
                                        <Truck size={20} className="text-gray-500" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">{vehicle.id}</p>
                                        <p className="text-sm text-gray-500">{vehicle.type} • {vehicle.capacity}</p>
                                    </div>
                                </div>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${vehicle.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                    }`}>
                                    {vehicle.status}
                                </span>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    );
}
