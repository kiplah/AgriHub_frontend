import ProductTable from '@/Components/ProductTable/ProductTable';
import Profile from '@/Components/ProfileCard/ProfileCard';
import React from 'react';

const Seeds = () => {
  return (
    <div className="p-2 md:p-8 min-h-screen">
      <Profile />
      <div className="z-20">
        <ProductTable name="Seeds" category="Seeds" />
      </div>
    </div>
  );
};

export default Seeds;
