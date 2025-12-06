'use client';

import React from 'react';
import { Card } from '../../Components/ui/Card';
import { User, Bell, Lock, Globe, Moon } from 'lucide-react';

export default function Settings() {
    return (
        <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
            <div>
                <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
                <p className="text-gray-600 mt-1">
                    Manage your account preferences and settings.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1 space-y-2">
                    {[
                        { label: 'Profile', icon: User, active: true },
                        { label: 'Notifications', icon: Bell, active: false },
                        { label: 'Security', icon: Lock, active: false },
                        { label: 'Language', icon: Globe, active: false },
                        { label: 'Appearance', icon: Moon, active: false },
                    ].map((item, index) => (
                        <button
                            key={index}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${item.active
                                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                                    : 'text-gray-600 hover:bg-white hover:text-gray-900'
                                }`}
                        >
                            <item.icon size={18} />
                            {item.label}
                        </button>
                    ))}
                </div>

                <div className="lg:col-span-2">
                    <Card>
                        <h2 className="text-lg font-semibold text-gray-900 mb-6">Profile Settings</h2>

                        <div className="flex items-center gap-6 mb-8">
                            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 text-2xl font-bold">
                                JD
                            </div>
                            <div>
                                <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 mr-3">
                                    Change Photo
                                </button>
                                <button className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700">
                                    Remove
                                </button>
                            </div>
                        </div>

                        <form className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                                    <input
                                        type="text"
                                        defaultValue="John"
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                                    <input
                                        type="text"
                                        defaultValue="Doe"
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                <input
                                    type="email"
                                    defaultValue="john.doe@example.com"
                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                                <textarea
                                    rows="4"
                                    defaultValue="Passionate farmer dedicated to sustainable agriculture."
                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                ></textarea>
                            </div>

                            <div className="pt-4 flex justify-end">
                                <button type="submit" className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-medium">
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </Card>
                </div>
            </div>
        </div>
    );
}
