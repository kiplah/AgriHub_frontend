"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductByUserId } from "@/reducers/product/productSlice";
import Link from "next/link";
import { Edit, Trash2, AlertTriangle, CheckCircle, Search, Filter } from "lucide-react";
import { Card } from "@/Components/ui/Card";
import { toast } from "react-toastify";

// Simple UI Components
const Badge = ({ children, color }) => (
    <span className={`px-2 py-1 text-xs font-semibold rounded-full bg-${color}-100 text-${color}-800`}>
        {children}
    </span>
);

export default function InventoryPage() {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { products, loading } = useSelector((state) => state.product);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");

    useEffect(() => {
        if (user?.userId) {
            dispatch(getProductByUserId(user.userId));
        }
    }, [dispatch, user?.userId]);

    const filteredProducts = products ? products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === "all" || product.status === filterStatus;
        return matchesSearch && matchesStatus;
    }) : [];

    if (loading) return <div className="p-8 text-center">Loading inventory...</div>;

    return (
        <div className="p-6 bg-gray-50 min-h-screen space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Inventory Management</h1>
                    <p className="text-gray-600">Track stock levels and product status.</p>
                </div>
                <Link href="/seller-profile/add-product" className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-medium">
                    Add New Product
                </Link>
            </div>

            <Card className="p-4">
                {/* Toolbar */}
                <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <Filter className="text-gray-400" size={20} />
                        <select
                            className="border border-gray-200 rounded-lg px-3 py-2 outline-none"
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                        >
                            <option value="all">All Status</option>
                            <option value="active">Active</option>
                            <option value="pending">Pending</option>
                            <option value="rejected">Rejected</option>
                        </select>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-gray-100 text-sm text-gray-500 uppercase">
                                <th className="p-4 font-medium">Product</th>
                                <th className="p-4 font-medium">Category</th>
                                <th className="p-4 font-medium">Price</th>
                                <th className="p-4 font-medium">Stock</th>
                                <th className="p-4 font-medium">Status</th>
                                <th className="p-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filteredProducts.length > 0 ? (
                                filteredProducts.map((product) => (
                                    <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                {product.imagepath ? (
                                                    <img
                                                        src={`http://127.0.0.1:8000${product.imagepath}`}
                                                        alt={product.name}
                                                        className="w-10 h-10 rounded-md object-cover bg-gray-100"
                                                    />
                                                ) : (
                                                    <div className="w-10 h-10 rounded-md bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold">
                                                        {product.name.charAt(0)}
                                                    </div>
                                                )}

                                                <span className="font-medium text-gray-900">{product.name}</span>
                                            </div>
                                        </td>
                                        <td className="p-4 text-gray-600">
                                            {product.category_details?.name || product.category_name || "N/A"}
                                        </td>
                                        <td className="p-4 font-medium text-gray-900">
                                            KES {Number(product.price).toLocaleString()}
                                        </td>
                                        <td className="p-4">
                                            {product.stock_quantity <= (product.low_stock_threshold || 10) ? (
                                                <div className="flex items-center gap-2 text-red-600 font-medium">
                                                    <AlertTriangle size={16} />
                                                    {product.stock_quantity} (Low)
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-2 text-green-600">
                                                    <CheckCircle size={16} />
                                                    {product.stock_quantity}
                                                </div>
                                            )}
                                        </td>
                                        <td className="p-4">
                                            {product.status === 'active' && <Badge color="green">Active</Badge>}
                                            {product.status === 'pending' && <Badge color="yellow">Pending</Badge>}
                                            {product.status === 'rejected' && <Badge color="red">Rejected</Badge>}
                                            {!product.status && <Badge color="gray">Unknown</Badge>}
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                <Link href={`/seller-profile/edit-product/${product.id}`} className="p-2 text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors">
                                                    <Edit size={18} />
                                                </Link>
                                                {/* Delete button logic would go here */}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="p-8 text-center text-gray-500">
                                        No products found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
}
