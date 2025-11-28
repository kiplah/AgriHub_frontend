import React from 'react';
import { FaTrashAlt } from "react-icons/fa";

const CartCard = ({ name = "Product Name", price = 100, quantity = 1, onIncrement, onDecrement, onRemove }) => {

    return (
        <div className="flex justify-between items-center rounded-md border border-gray-300 m-2 p-3 shadow-md bg-green-100">

            <div className='flex items-center'>
                <div className='mr-4'>
                    <img 
                        src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8fDA%3D" 
                        alt={name}
                        width="70"
                        className="rounded-md object-cover"
                    />
                </div>
                <div>
                    <p className="font-semibold text-gray-700 text-lg">{name}</p>
                    <div className="flex items-center mt-2">
                        <button
                            className="bg-black text-white text-lg px-3 py-1 rounded-md hover:bg-gray-800"
                            onClick={onDecrement}
                        >
                            -
                        </button>
                        <span className="mx-4 text-lg font-medium text-black">{quantity}</span>
                        <button
                            className="bg-black text-white text-lg px-3 py-1 rounded-md hover:bg-gray-800"
                            onClick={onIncrement}
                        >
                            +
                        </button>
                    </div>
                </div>
            </div>

            <div className="text-right">
                <div className="mb-4">
                    <FaTrashAlt 
                        style={{ fontSize: '25px', color: 'red', cursor: 'pointer' }} 
                    />
                </div>
                <div className="text-lg font-semibold text-gray-800">
                    ${price.toFixed(2)}
                </div>
            </div>
        </div>
    );
};

export default CartCard;
