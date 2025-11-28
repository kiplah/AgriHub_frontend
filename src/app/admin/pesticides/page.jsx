import ProductTable from '@/Components/ProductTable/ProductTable';
import Profile from '@/Components/ProfileCard/ProfileCard';
import React from 'react';

const Pesticides = () => {
  return (
    <div className="p-2 md:p-8 min-h-screen">
      <Profile />
      <div className="z-20">
        <ProductTable name="Pesticides" category="Pesticides" />
      </div>
    </div>
  );
};

export default Pesticides;
