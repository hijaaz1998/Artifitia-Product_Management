import React from 'react';
import { FaTimes } from 'react-icons/fa';

const WishlistSidebar = ({ wishlistItems, onRemoveItem }) => {
  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">Wishlist Items</h2>
      <ul>
        {wishlistItems.map(item => (
          <li key={item.id} className="flex justify-between items-center mb-2">
            <span>{item.name}</span>
            <button onClick={() => onRemoveItem(item.id)} className="text-red-500 hover:text-red-700">
              <FaTimes />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WishlistSidebar;
