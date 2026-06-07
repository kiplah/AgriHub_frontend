import ProductTable from '@/Components/ProductTable/ProductTable';
import React from 'react';

const Pesticides = () => {
  return (
    <div className="p-2 md:p-8 min-h-screen bg-gray-50/30">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Pesticide Management</h1>
        <p className="text-sm text-gray-500 mt-1">Manage pesticide listings and controls</p>
      </div>
      <div className="z-20">
        <ProductTable name="Pesticides" category="Pesticides" />
      </div>
    </div>
  );
};

export default Pesticides;
