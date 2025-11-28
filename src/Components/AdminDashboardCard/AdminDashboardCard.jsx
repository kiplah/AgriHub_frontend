import Link from 'next/link';
import React from 'react';

const AdminDashboardCard = ({ details = {} }) => {
  const { name, icon: Icon, url } = details;

  return (
    <div className="flex justify-center p-3">
      <div className="bg-green-800 border border-green-600 min-h-[200px] rounded-3xl shadow-lg w-full hover:scale-105 transform transition-all duration-300">
        <div className="block p-6 rounded-lg hover:bg-green-700 transition-all duration-200">
          <div className="flex justify-between items-center space-x-2">
            <div className='w-[70%]'>
              <h3 className="text-xl sm:text-3xl font-semibold text-green-200 mb-2">{name}</h3>
              <p className="text-white text-md md:text-lg">
                A quick overview of agricultural data and operations. Click to learn more.
              </p>
            </div>
            <div>
              <div className="bg-green-700 p-4 rounded-full shadow-lg w-16 h-16 mb-10 flex items-center justify-center">
                <Icon className="text-white text-3xl" />
              </div>

              <div className="mt-6 text-center">
                <Link href={url} className="text-green-200 font-bold text-xlc underline hover:text-green-400">
                  View All
                </Link>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardCard;
