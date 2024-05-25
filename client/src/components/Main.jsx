import React, { useEffect, useState } from 'react';
import { FiHeart } from 'react-icons/fi';
import axiosInstance from '../axionEndPoint/axiosEndPoint';
import { Link } from 'react-router-dom'; // Import Link from React Router

const Main = () => {
  const [products, setProducts] = useState([]);
  const userId = localStorage.getItem('userId');

  const fetchProducts = async () => {
    try {
      const response = await axiosInstance.get(`/product/getAllProducts/${userId}`);
      console.log(response.data.products);
      setProducts(response.data.products);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="bg-purple-400 h-full p-4">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {products.map(product => (
          <div key={product._id} className="bg-yellow-200 rounded-lg shadow-md p-4 relative mx-16">
            <Link to={`/productDetails/${product._id}`} className="block"> {/* Link to product details */}
              <div className='flex justify-center'>
                <img src={product.images[0]} alt={product.name} className="w-8/12 h-auto rounded-lg" />
              </div>
              <div className="absolute top-4 right-4 border border-black rounded-3xl p-2">
                <FiHeart className="text-red-500 text-xl" />
              </div>
              <div className="text-left mt-2 font-bold">{product.productName}</div>
              <div className="text-left mt-2 text-gray-700">{product.brand}</div>
              <div className="text-left mt-2 text-gray-800 font-semibold">${product.variants[0].price}</div>
            </Link>
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
