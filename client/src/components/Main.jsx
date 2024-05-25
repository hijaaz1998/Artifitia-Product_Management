import React, { useState, useEffect } from 'react';
import axiosInstance from '../axionEndPoint/axiosEndPoint';
import { Link } from 'react-router-dom';

const Main = ({ products, setProducts, onToggleCartOverlay, onToggleWishlistOverlay }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); 

  const userId = localStorage.getItem('userId');

  const fetchProducts = async (page) => {
    try {
      const response = await axiosInstance.get(`/product/getAllProducts/${userId}?page=${page}`);
      setProducts(response.data.products);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      toast.error(error,message)
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="h-full p-4 border-l-2 border-l-black">
      {products.length === 0 ? (
        <div className="flex justify-center items-center h-full">
          <h2 className="text-xl font-bold">No products found</h2>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
            {products.map(product => (
              <div key={product._id} className="rounded-lg shadow-md p-4 relative mx-16">
                <Link 
                  to={{
                    pathname: `/productDetails/${product._id}`,
                    state: { 
                      onToggleCartOverlay, 
                      onToggleWishlistOverlay
                    }
                  }} 
                  className="block"
                >
                  <div className='flex justify-center'>
                    <img src={product.images[0]} alt={product.name} className="w-full rounded-lg" />
                  </div>
                </Link>
                <div className="text-left mt-2 font-bold">{product.productName}</div>
                <div className="text-left mt-2 text-gray-700">{product.brand}</div>
                <div className="text-left mt-2 text-gray-800 font-semibold">${product.variants[0].price}</div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-4">
            <button 
              onClick={handlePrevPage} 
              className={`bg-amber-500 text-white px-4 py-2 rounded-md ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <button 
              onClick={handleNextPage} 
              className={`bg-amber-500 text-white px-4 py-2 rounded-md ml-2 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Main;
