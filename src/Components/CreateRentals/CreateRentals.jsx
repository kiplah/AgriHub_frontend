import React from 'react';

const CreateRentals = ({ showAddRental, setShowAddRental }) => {
    if (!showAddRental) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg">
                <h2 className="text-xl font-bold mb-4">Add Rental</h2>
                <p>Placeholder for CreateRentals component.</p>
                <button
                    className="mt-4 bg-gray-500 text-white px-4 py-2 rounded"
                    onClick={() => setShowAddRental(false)}
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default CreateRentals;
