import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const CartSidebar = ({ onRemoveItem, close }) => {
  const [showModal, setShowModal] = useState(true);
  const cart = useSelector((state) => state.cart.cart);

  useEffect(() => {
    // Prevent scrolling of outer elements when scrolling inside the sidebar
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'visible';
    };
  }, []);

  const handleRemoveItem = (itemId) => {
    onRemoveItem(itemId);
    if (cart.length === 1) {
      close();
    }
  };

  return (
    <div className="p-4 max-w-xs overflow-y-auto h-full bg-white shadow-lg fixed right-0 top-0 bottom-0 z-50">
      <h2 className="text-lg font-bold mb-4">Cart Items</h2>
      {cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full">
          <p>No items in the cart.</p>
          <button
            onClick={close}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Close
          </button>
        </div>
      ) : (
        <ul>
          {cart.map(item => (
            <li key={item.product._id} className="flex mb-4 border p-2 rounded">
              <div className="w-1/4 flex-shrink-0 flex items-center">
                <img src={item.product.images[0]} alt={item.product.productName} className="w-full h-auto object-cover" />
              </div>
              <div className="flex-grow pl-4 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-md font-semibold mt-8">{item.product.productName}</h3>
                    <button
                      onClick={() => handleRemoveItem(item.product._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTimes />
                    </button>
                  </div>
                  <p className="text-sm mt-10 text-gray-600">${item.price}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CartSidebar;
