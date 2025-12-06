'use client';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductByUserId, deleteProduct } from '@/reducers/product/productSlice';
import { Card } from '@/Components/ui/Card';
import { Plus, Trash2, Edit, Package } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'react-toastify';

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

  return (
    <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">My Products</h1>
          <p className="text-gray-600 mt-1">
            Manage your listed products and inventory.
          </p>
        </div>
        <Link href="/seller-profile/add-product">
          <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 shadow-sm transition-colors">
            <Plus size={20} />
            Add New Product
          </button>
        </Link>
      </div>

      {products.length === 0 ? (
        <Card>
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
              <Package size={32} />
            </div>
            <h3 className="text-lg font-medium text-gray-900">No products listed yet</h3>
            <p className="text-gray-500 mt-2 mb-6">Start selling by adding your first product.</p>
            <Link href="/seller-profile/add-product">
              <button className="px-6 py-2 border-2 border-emerald-600 text-emerald-600 rounded-lg hover:bg-emerald-50 font-medium transition-colors">
                Add Product
              </button>
            </Link>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow group">
              <div className="relative h-48 bg-gray-100">
                <img
                  src={`http://127.0.0.1:8000/${product.imagepath}`}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=2070&auto=format&fit=crop"; }}
                />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-semibold text-emerald-700">
                  {product.category_name}
                </div>
              </div>
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-gray-900 text-lg line-clamp-1">{product.name}</h3>
                  <span className="text-emerald-600 font-bold">KES {product.price}</span>
                </div>
                <p className="text-gray-500 text-sm mb-4 line-clamp-2">{product.description}</p>

                <div className="flex gap-2 pt-3 border-t border-gray-100">
                  <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 text-sm font-medium transition-colors">
                    <Edit size={16} />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="flex-1 flex items-center justify-center gap-2 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 text-sm font-medium transition-colors"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
