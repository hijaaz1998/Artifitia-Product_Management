import React from 'react';

const ProductDetails = () => {
  return (
    <div className="flex bg-cyan-200 h-full">
      <div className="w-1/2 bg-yellow-100">
        {/* Product image */}
        <div className='flex items-center justify-center bg-purple-300'>
            <img className="w-[440px] object-cover border rounded-lg border-black" src="/Business Management Daily.jpeg" alt="Product" />
        </div>
        <div>
            <img src="" alt="" />
            <img src="" alt="" />
        </div>
      </div>
      <div className="w-1/2 p-4">
        {/* Product details */}
        <h2 className="text-xl font-bold mb-2">Product Name</h2>
        <p className="mb-2">$XX.XX</p>
        <div className="mb-4">
          {/* RAM options */}
          <input type="radio" id="ram-option-1" name="ram" value="4GB" className="mr-1" />
          <label htmlFor="ram-option-1" className="mr-4">4GB RAM</label>
          <input type="radio" id="ram-option-2" name="ram" value="8GB" className="mr-1" />
          <label htmlFor="ram-option-2" className="mr-4">8GB RAM</label>
          <input type="radio" id="ram-option-3" name="ram" value="16GB" className="mr-1" />
          <label htmlFor="ram-option-3">16GB RAM</label>
        </div>
        <div className="flex items-center mb-4">
          {/* Quantity */}
          <button className="bg-gray-200 px-3 py-1 rounded-l">-</button>
          <span className="px-3">1</span>
          <button className="bg-gray-200 px-3 py-1 rounded-r">+</button>
        </div>
        <div className="flex">
          {/* Action buttons */}
          <button className="bg-blue-500 text-white px-4 py-2 mr-2">Edit Product</button>
          <button className="bg-green-500 text-white px-4 py-2 mr-2">Buy it Now</button>
          <button className="bg-gray-500 text-white px-4 py-2">Wishlist</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
