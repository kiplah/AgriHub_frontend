import ProductTable from '@/Components/CategoryTable/ProductTable';
import React from 'react'

const Categories = () => {
  return (
    <div className="p-2 md:p-8 min-h-screen bg-gray-50/30">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Category Management</h1>
        <p className="text-sm text-gray-500 mt-1">Manage categories shown on the platform</p>
      </div>
      <div className='z-20'>
        <ProductTable name="Categories" category={true}/>      
      </div>
    </div>
  )
}

export default Categories;