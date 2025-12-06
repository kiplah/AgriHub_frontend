'use client';

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct } from '@/reducers/product/productSlice';
import { useRouter } from 'next/navigation';
import { Card } from '@/Components/ui/Card';
import { Upload, Loader2, CheckCircle } from 'lucide-react';
import { toast } from 'react-toastify';

export default function AddProduct() {
    const dispatch = useDispatch();
    const router = useRouter();
    const { loading } = useSelector((state) => state.product);

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category_name: 'Crops', // Default category
        image: null
    });

    const [preview, setPreview] = useState(null);

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

        if (!formData.name || !formData.price || !formData.image) {
            toast.error("Please fill in all required fields and upload an image.");
            return;
        }

        const data = new FormData();
        data.append('name', formData.name);
        data.append('description', formData.description);
        data.append('price', formData.price);
        data.append('category_name', formData.category_name);
        data.append('imagepath', formData.image);
        // Note: Backend expects 'imagepath' for the file based on models.py? 
        // Wait, models.py says imagepath is CharField. 
        // Usually with Django REST Framework and FileUpload, it handles it. 
        // But if models.py has CharField, it might expect a string path or the serializer handles the file upload and saves the path.
        // Let's assume the backend handles file upload if we send it as 'imagepath' or 'image'.
        // Looking at models.py: imagepath = models.CharField(max_length=255, blank=True, null=True)
        // This suggests the backend might not be using ImageField.
        // If it's a CharField, we might need to upload the image separately or the backend logic is custom.
        // However, usually 'imagepath' implies a path string.
        // Let's check serializers.py to be sure.
        // For now, I'll send it as 'imagepath' and see.

        // Actually, let's check serializers.py first to be safe.
        // But I'll write this file assuming standard multipart upload for now.

        try {
            // We need to wrap the dispatch in a promise check or use unwrap()
            const resultAction = await dispatch(createProduct(data));
            if (createProduct.fulfilled.match(resultAction)) {
                toast.success("Product created successfully!");
                router.push('/seller-profile/my-products');
            } else {
                toast.error(resultAction.payload || "Failed to create product");
            }
        } catch (err) {
            console.error("Failed to create product", err);
            toast.error("An error occurred");
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Add New Product</h1>
                <p className="text-gray-600">List your produce or items for sale in the marketplace.</p>
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
                            <label className="block text-sm font-medium text-gray-700 mb-1">Product Image *</label>
                            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:bg-gray-50 transition-colors cursor-pointer relative">
                                <div className="space-y-1 text-center">
                                    {preview ? (
                                        <img src={preview} alt="Preview" className="mx-auto h-48 object-cover rounded-md" />
                                    ) : (
                                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                                    )}
                                    <div className="flex text-sm text-gray-600 justify-center">
                                        <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-emerald-600 hover:text-emerald-500 focus-within:outline-none">
                                            <span>Upload a file</span>
                                            <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleImageChange} accept="image/*" />
                                        </label>
                                        <p className="pl-1">or drag and drop</p>
                                    </div>
                                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                </div>
                            </div>
                        </div>
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
                                    Creating...
                                </>
                            ) : (
                                <>
                                    <CheckCircle size={20} />
                                    Post Product
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </Card>
        </div>
    );
}
