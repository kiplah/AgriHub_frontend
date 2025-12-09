'use client';

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProduct, fetchProductById } from '@/reducers/product/productSlice';
import { useRouter, useParams } from 'next/navigation';
import { Card } from '@/Components/ui/Card';
import { Upload, Loader2, CheckCircle, ArrowLeft } from 'lucide-react';
import { toast } from 'react-toastify';

export default function EditProduct() {
    const dispatch = useDispatch();
    const router = useRouter();
    const params = useParams();
    const { id } = params;

    const { loading, product: fetchedProduct } = useSelector((state) => state.product);

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category_name: '',
        image: null,
        stock_quantity: '',
        location: '',
        delivery_options: 'Pickup'
    });

    const [preview, setPreview] = useState(null);
    const [initialFetchDone, setInitialFetchDone] = useState(false);

    useEffect(() => {
        if (id) {
            dispatch(fetchProductById(id));
        }
    }, [dispatch, id]);

    useEffect(() => {
        if (fetchedProduct && !initialFetchDone) {
            setFormData({
                name: fetchedProduct.name || '',
                description: fetchedProduct.description || '',
                price: fetchedProduct.price || '',
                category_name: fetchedProduct.category_name || 'Crops',
                stock_quantity: fetchedProduct.stock_quantity || '',
                location: fetchedProduct.location || '',
                delivery_options: fetchedProduct.delivery_options || 'Pickup',
                image: null
            });
            if (fetchedProduct.imagepath) {
                setPreview(`http://127.0.0.1:8000/${fetchedProduct.imagepath}`);
            }
            setInitialFetchDone(true);
        }
    }, [fetchedProduct, initialFetchDone]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({ ...prev, image: file }));
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.price || !formData.stock_quantity) {
            toast.error("Please fill in all required fields.");
            return;
        }

        const data = new FormData();
        data.append('name', formData.name);
        data.append('description', formData.description);
        data.append('price', formData.price);
        data.append('category_name', formData.category_name);
        data.append('stock_quantity', formData.stock_quantity);
        data.append('location', formData.location);
        data.append('delivery_options', formData.delivery_options);

        if (formData.image) {
            data.append('imagepath', formData.image);
        }

        try {
            const resultAction = await dispatch(updateProduct({ id, formData: data }));
            if (updateProduct.fulfilled.match(resultAction)) {
                toast.success("Product updated successfully!");
                router.push('/seller-profile/my-products');
            } else {
                toast.error(resultAction.payload || "Failed to update product");
            }
        } catch (err) {
            console.error("Failed to update product", err);
            toast.error("An error occurred");
        }
    };

    if (loading && !initialFetchDone) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto p-6">
            <button onClick={() => router.back()} className="flex items-center text-gray-600 hover:text-emerald-600 mb-6 transition-colors">
                <ArrowLeft size={20} className="mr-2" />
                Back to My Products
            </button>
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Edit Product</h1>
                <p className="text-gray-600">Update your product details.</p>
            </div>

            <Card>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                                    placeholder="e.g. Fresh Tomatoes"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                                <select
                                    name="category_name"
                                    value={formData.category_name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                                >
                                    <option value="Crops">Crops</option>
                                    <option value="Livestock">Livestock</option>
                                    <option value="Seeds">Seeds</option>
                                    <option value="Fertilizers">Fertilizers</option>
                                    <option value="Pesticides">Pesticides</option>
                                    <option value="Machinery">Machinery</option>
                                    <option value="Vegetables">Vegetables</option>
                                    <option value="Fruits">Fruits</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Price (KES) *</label>
                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                                    placeholder="0.00"
                                    min="0"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Product Image</label>
                            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:bg-gray-50 transition-colors cursor-pointer relative">
                                <div className="space-y-1 text-center">
                                    {preview ? (
                                        <img src={preview} alt="Preview" className="mx-auto h-48 object-cover rounded-md" />
                                    ) : (
                                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                                    )}
                                    <div className="flex text-sm text-gray-600 justify-center">
                                        <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-emerald-600 hover:text-emerald-500 focus-within:outline-none">
                                            <span>Upload a new file</span>
                                            <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleImageChange} accept="image/*" />
                                        </label>
                                    </div>
                                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity *</label>
                            <input
                                type="number"
                                name="stock_quantity"
                                value={formData.stock_quantity}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                                placeholder="Available quantity"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                            <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                                placeholder="e.g. Nairobi, Kiambu"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Option</label>
                        <select
                            name="delivery_options"
                            value={formData.delivery_options}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                        >
                            <option value="Pickup">Pickup</option>
                            <option value="Delivery">Delivery</option>
                            <option value="Both">Both</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows={4}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                            placeholder="Describe your product..."
                        />
                    </div>

                    <div className="flex justify-end pt-4">
                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="mr-4 px-6 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 font-medium transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex items-center gap-2 px-8 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-medium shadow-md hover:shadow-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="animate-spin" size={20} />
                                    Updating...
                                </>
                            ) : (
                                <>
                                    <CheckCircle size={20} />
                                    Update Product
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </Card>
        </div>
    );
}
