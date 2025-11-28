import Profile from '@/Components/ProfileCard/ProfileCard';
import RentalTable from '@/Components/RentalsTable/RentalTable';

import React from 'react'

const Rentals = () => {
  return (
    <div
    className="p-2 md:p-8 min-h-screen">
<Profile/>
      <div className='z-20'>      
<RentalTable/>
    </div>
    </div>
  )
}

export default Rentals;