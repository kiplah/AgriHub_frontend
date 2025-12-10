"use client";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSellerProfile, updateSellerProfile } from '@/reducers/Auth/authSlice';
import { Card } from '@/Components/ui/Card';
// import { Button } from '@/Components/ui/Button'; // Removed as it does not exist
import { Loader2, Upload, Camera, Store } from 'lucide-react';
import { toast } from 'react-toastify';

export default function StoreProfile() {
    const dispatch = useDispatch();
    const { user, sellerProfile, loading } = useSelector((state) => state.auth);

    const [formData, setFormData] = useState({
        store_name: '',
        bio: '',
        phone_contact: '',
        location: '',
        logo: null,
        banner: null
    });

    const [logoPreview, setLogoPreview] = useState(null);
    const [bannerPreview, setBannerPreview] = useState(null);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (user?.userId) {
            dispatch(fetchSellerProfile(user.userId));
        }
    }, [dispatch, user?.userId]);

    useEffect(() => {
        if (sellerProfile) {
            setFormData({
                store_name: sellerProfile.store_name || '',
                bio: sellerProfile.bio || '',
                phone_contact: sellerProfile.phone_contact || '',
                location: sellerProfile.location || '',
                logo: null,
                banner: null
            });

            if (sellerProfile.logo) setLogoPreview(sellerProfile.logo.startsWith('http') ? sellerProfile.logo : `http://127.0.0.1:8000${sellerProfile.logo}`);
            if (sellerProfile.banner) setBannerPreview(sellerProfile.banner.startsWith('http') ? sellerProfile.banner : `http://127.0.0.1:8000${sellerProfile.banner}`);
        }
    }, [sellerProfile]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e, field) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({ ...prev, [field]: file }));
            const previewUrl = URL.createObjectURL(file);
            if (field === 'logo') setLogoPreview(previewUrl);
            if (field === 'banner') setBannerPreview(previewUrl);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSaving(true);

        const data = new FormData();
        data.append('store_name', formData.store_name);
        data.append('bio', formData.bio);
        data.append('phone_contact', formData.phone_contact);
        data.append('location', formData.location);
        if (formData.logo) data.append('logo', formData.logo);
        if (formData.banner) data.append('banner', formData.banner);

        try {
            await dispatch(updateSellerProfile({ id: sellerProfile?.id, formData: data })).unwrap();
            toast.success("Store profile updated successfully!");
        } catch (err) {
            console.error(err);
            toast.error("Failed to update profile.");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-6">
            <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-emerald-100 rounded-full text-emerald-600">
                    <Store size={32} />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Store Profile</h1>
                    <p className="text-gray-600">Manage your store's branding and information.</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Banner & Logo Section */}
                <Card className="p-0 overflow-hidden relative group">
                    {/* Banner */}
                    <div className="h-48 w-full bg-gray-200 relative">
                        {bannerPreview ? (
                            <img src={bannerPreview} alt="Banner" className="w-full h-full object-cover" />
                        ) : (
                            <div className="flex items-center justify-center h-full text-gray-400">
                                <Upload size={48} className="opacity-50" />
                            </div>
                        )}
                        <label className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                            <span className="text-white font-medium flex items-center gap-2">
                                <Camera size={20} /> Change Banner
                            </span>
                            <input type="file" className="hidden" onChange={(e) => handleFileChange(e, 'banner')} accept="image/*" />
                        </label>
                    </div>

                    {/* Logo */}
                    <div className="absolute -bottom-12 left-8">
                        <div className="w-32 h-32 rounded-full border-4 border-white bg-white shadow-lg overflow-hidden relative group/logo">
                            {logoPreview ? (
                                <img src={logoPreview} alt="Logo" className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full bg-emerald-100 flex items-center justify-center text-emerald-600 text-3xl font-bold">
                                    {formData.store_name?.charAt(0) || 'S'}
                                </div>
                            )}
                            <label className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover/logo:opacity-100 transition-opacity cursor-pointer rounded-full">
                                <Camera size={20} className="text-white" />
                                <input type="file" className="hidden" onChange={(e) => handleFileChange(e, 'logo')} accept="image/*" />
                            </label>
                        </div>
                    </div>
                    <div className="h-16 bg-white"></div> {/* Spacer for logo overlap */}
                </Card>

                <Card className="p-6 mt-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="col-span-1 md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Store Name</label>
                            <input
                                type="text"
                                name="store_name"
                                value={formData.store_name}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                                placeholder="Your Awesome Farm"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Contact</label>
                            <input
                                type="text"
                                name="phone_contact"
                                value={formData.phone_contact}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                                placeholder="+254 700 000 000"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Location / Address</label>
                            <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                                placeholder="e.g. Kiambu, Kenya"
                            />
                        </div>

                        <div className="col-span-1 md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">About / Bio</label>
                            <textarea
                                name="bio"
                                value={formData.bio}
                                onChange={handleChange}
                                rows={4}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                                placeholder="Tell customers about your farm and values..."
                            />
                        </div>
                    </div>

                    <div className="mt-6 flex justify-end">
                        <button
                            type="submit"
                            disabled={isSaving}
                            className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isSaving && <Loader2 className="animate-spin" size={18} />}
                            {isSaving ? 'Saving Changes...' : 'Save Profile'}
                        </button>
                    </div>
                </Card>
            </form>
        </div>
    );
}
