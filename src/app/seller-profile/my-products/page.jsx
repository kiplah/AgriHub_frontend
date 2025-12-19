'use client';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductByUserId, deleteProduct } from '@/reducers/product/productSlice';
import { Card } from '@/Components/ui/Card';
import { Plus, Trash2, Edit, Package } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'react-toastify';

import ProductCard from '@/Components/ProductCard/ProductCard';

export default function MyProducts() {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.product);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user?.id) {
      dispatch(getProductByUserId(user.id));
    }
  }, [dispatch, user]);

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this product?')) {
      try {
        await dispatch(deleteProduct(id)).unwrap();
        toast.success('Product deleted successfully');
      } catch (err) {
        toast.error('Failed to delete product');
      }
    }
  };

  if (loading && products.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  // Helper to format date
  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown Date';
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="p-4 md:p-6 bg-white min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Products</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your listed products and inventory.</p>
        </div>
        <Link href="/seller-profile/add-product">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 shadow-sm shadow-emerald-200 transition-colors font-medium text-sm">
            <Plus size={18} />
            Add New Product
          </button>
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center shadow-sm">
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-600">
            <Package size={32} />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">No products listed yet</h3>
          <p className="text-gray-500 mt-2 mb-6 max-w-sm mx-auto">Start building your inventory by adding your first product to the marketplace.</p>
          <Link href="/seller-profile/add-product">
            <button className="px-6 py-2.5 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 font-medium transition-colors shadow-sm">
              Add Product
            </button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              image={product.imagepath?.startsWith('http') ? product.imagepath : `http://127.0.0.1:8000/${product.imagepath}`}
              category={product.category_name}
              price={product.price}
              location={product.location}
              postedDate={formatDate(product.created_at || new Date().toISOString())}
              priceType="Negotiable"
            >
              <div className="grid grid-cols-2 gap-3">
                <Link href={`/seller-profile/edit-product/${product.id}`} className="block">
                  <button className="w-full flex items-center justify-center gap-2 py-2 bg-gray-50 text-gray-700 rounded-xl hover:bg-white hover:border-gray-200 border border-transparent text-sm font-medium transition-all">
                    <Edit size={16} />
                    Edit
                  </button>
                </Link>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="w-full flex items-center justify-center gap-2 py-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 text-sm font-medium transition-colors"
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </ProductCard>
          ))}
        </div>
      )}
    </div>
  );
}
