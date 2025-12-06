import React from 'react';
import { ArrowUpIcon, ArrowDownIcon } from 'lucide-react';

export function StatCard({ title, value, icon: Icon, trend }) {
    return (
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-500">{title}</p>
                    <p className="text-2xl font-semibold text-gray-900 mt-2">{value}</p>
                </div>
                <div className="p-3 bg-emerald-50 rounded-lg">
                    <Icon className="w-6 h-6 text-emerald-600" />
                </div>
            </div>
            {trend && (
                <div className="mt-4 flex items-center text-sm">
                    {trend.isPositive ? (
                        <ArrowUpIcon className="w-4 h-4 text-green-500 mr-1" />
                    ) : (
                        <ArrowDownIcon className="w-4 h-4 text-red-500 mr-1" />
                    )}
                    <span
                        className={`font-medium ${trend.isPositive ? 'text-green-600' : 'text-red-600'
                            }`}
                    >
                        {trend.value}%
                    </span>
                    <span className="text-gray-500 ml-1">vs last month</span>
                </div>
            )}
        </div>
    );
}
