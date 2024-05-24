import React from 'react';
import { FiHeart } from 'react-icons/fi';

const Main = () => {
  // Dummy product data for demonstration
  const products = [
    { id: 1, name: 'Product 1', image: 'image1.jpg', brandName: 'Brand A', price: '100' },
    { id: 2, name: 'Product 2', image: 'image2.jpg', brandName: 'Brand B', price: '200' },
    { id: 3, name: 'Product 3', image: 'image3.jpg', brandName: 'Brand C', price: '300' },
    { id: 4, name: 'Product 4', image: 'image4.jpg', brandName: 'Brand D', price: '400' },
    { id: 5, name: 'Product 5', image: 'image5.jpg', brandName: 'Brand E', price: '500' },
    { id: 6, name: 'Product 6', image: 'image6.jpg', brandName: 'Brand F', price: '600' }
  ];

  return (
    <div className="bg-purple-400 h-full p-4">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {products.map(product => (
          <div key={product.id} className="bg-yellow-200 rounded-lg shadow-md p-4 relative">
            <div className='flex justify-center'>
              <img src='/Business Management Daily.jpeg' alt={product.name} className="w-8/12 h-auto rounded-lg" />
            </div>
            <div className="absolute top-4 right-4 border border-black rounded-3xl p-2">
              <FiHeart className="text-red-500 text-xl" />
            </div>
            <div className="text-left mt-2 font-bold">{product.name}</div>
            <div className="text-left mt-2 text-gray-700">{product.brandName}</div>
            <div className="text-left mt-2 text-gray-800 font-semibold">${product.price}</div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Previous</button>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md ml-2">Next</button>
      </div>
    </div>
  );
}

export default Main;
