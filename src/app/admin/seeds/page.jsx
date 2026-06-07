import ProductTable from '@/Components/ProductTable/ProductTable';
import React from 'react';

const Seeds = () => {
  return (
    <div className="p-2 md:p-8 min-h-screen bg-gray-50/30">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Seed Management</h1>
        <p className="text-sm text-gray-500 mt-1">Manage seed varieties and crop categories</p>
      </div>
      <div className="z-20">
        <ProductTable name="Seeds" category="Seeds" />
      </div>
    </div>
  );
};

export default Seeds;
