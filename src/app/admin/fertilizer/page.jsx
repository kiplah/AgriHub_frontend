import ProductTable from '@/Components/ProductTable/ProductTable';
import React from 'react';

const Fertilizers = () => {
  return (
    <div className="p-2 md:p-8 min-h-screen bg-gray-50/30">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Fertilizer Management</h1>
        <p className="text-sm text-gray-500 mt-1">Manage fertilizer listings and inventory</p>
      </div>
      <div className="z-20">
        <ProductTable name="Fertilizers" category="Fertilizers" />
      </div>
    </div>
  );
};

export default Fertilizers;
