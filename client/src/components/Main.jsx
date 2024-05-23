import React, { useState } from 'react';
import { FaHeart } from 'react-icons/fa'; // Import the heart icon from react-icons
import image from '/background.jpeg'; // Example image import

const products = [
  { id: 1, name: 'Product 1', price: '$10', inWishlist: false },
  { id: 2, name: 'Product 2', price: '$20', inWishlist: false },
  { id: 3, name: 'Product 3', price: '$30', inWishlist: false },
  { id: 4, name: 'Product 4', price: '$40', inWishlist: false },
  { id: 5, name: 'Product 5', price: '$50', inWishlist: false },
  { id: 6, name: 'Product 6', price: '$60', inWishlist: false },
];

const Main = () => {
  const [wishlist, setWishlist] = useState([]);

  const toggleWishlist = (productId) => {
    setWishlist(prevState => {
      if (prevState.includes(productId)) {
        return prevState.filter(id => id !== productId);
      } else {
        return [...prevState, productId];
      }
    });
  };

  return (
    <div className="flex flex-wrap justify-center pl-4">
      {products.map(product => (
        <div key={product.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2">
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 overflow-hidden">
            <a href="#">
              <img
                className="p-2 rounded-t-lg"
                src="/Business Management Daily.jpeg"
                alt="product image"
              />
            </a>
            <div className="px-2 pb-2">
              <a href="#">
                <h5 className="text-base font-semibold tracking-tight text-gray-900 dark:text-white">
                  {product.name}
                </h5>
              </a>
              <div className="flex items-center justify-between mt-1 mb-1">
                <span className="text-yellow-500 text-xs">★★★★★</span>
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-1 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">5.0</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-base font-bold text-gray-900 dark:text-white">
                  {product.price}
                </span>
                <a
                  href="#"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-xs px-2 py-1 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Add
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Main;
