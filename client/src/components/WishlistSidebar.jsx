import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

const WishlistSidebar = ({ wishlistItems, onRemoveItem, close }) => {
  const [showModal, setShowModal] = useState(true);

  const handleRemoveItem = (itemId) => {
    onRemoveItem(itemId);
    if (wishlistItems.length === 1) {
      close();
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">Wishlist Items</h2>
      <ul>
        {wishlistItems.map(item => (
          <li key={item.id} className="flex mb-4 border p-2 rounded">
            <div className="w-1/4 flex-shrink-0">
              {/* Replace the image source with your actual image source */}
              <img src='/Business Management Daily.jpeg' alt={item.name} className="w-full h-auto object-cover" />
            </div>
            <div className="flex-grow pl-4 flex flex-col justify-between">
              <div className=''>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-md font-semibold mt-8">{item.name}</h3>
                  <button 
                    onClick={() => handleRemoveItem(item.id)} 
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTimes />
                  </button>
                </div>
                {/* Adjust the price display as needed */}
                <p className="text-sm mt-10 text-gray-600">${item.price}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
      {showModal && wishlistItems.length === 0 && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="bg-white p-8 rounded shadow-md">
            <p>No items in the wishlist.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WishlistSidebar;
