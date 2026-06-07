import RentalTable from '@/Components/RentalsTable/RentalTable';
import React from 'react'

const Rentals = () => {
  return (
    <div className="p-2 md:p-8 min-h-screen bg-gray-50/30">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Rental Bookings</h1>
        <p className="text-sm text-gray-500 mt-1">Manage and track farm machinery rentals</p>
      </div>
      <div className='z-20'>      
        <RentalTable/>
      </div>
    </div>
  )
}

export default Rentals;