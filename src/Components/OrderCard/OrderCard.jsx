import React, { useState } from "react";

const OrderCard = ({ name, status, date, total }) => {
  const [currentStatus, setCurrentStatus] = useState(status);

  const statusStyles = {
    Shipped: "bg-blue-100 text-blue-800",
    Processing: "bg-yellow-100 text-yellow-800",
    Delivered: "bg-green-100 text-green-800",
  };

  const handleStatusChange = (e) => {
    setCurrentStatus(e.target.value);
  };

  return (
    <li className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center border border-gray-200">
      <div>
        <h3 className="text-lg font-semibold text-green-800">{name}</h3>
        <p className="text-sm text-gray-500">Date: {date}</p>
        {total && (
          <p className="text-sm text-gray-500">Total: ${total.toFixed(2)}</p>
        )}
      </div>

      <select
        value={currentStatus}
        onChange={handleStatusChange}
        className={`px-4 py-2 rounded-full text-sm font-medium ${
          statusStyles[currentStatus] || "bg-gray-100 text-gray-800"
        }`}
      >
        <option value="Shipped" className="bg-white">Shipped</option>
        <option value="Processing" className="bg-white">Processing</option>
        <option value="Delivered" className="bg-white">Delivered</option>
      </select>
    </li>
  );
};

export default OrderCard;
