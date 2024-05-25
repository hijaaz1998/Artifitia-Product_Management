import React, { useEffect, useState } from 'react';
import { AiOutlineHeart } from 'react-icons/ai'; // Importing a heart icon from react-icons
import axiosInstance from '../axionEndPoint/axiosEndPoint';
import toast, { Toaster } from 'react-hot-toast';
import EditProductModal from './modal/EditProductModal';

const ProductDetails = ({ productId }) => {
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState({});
  const [mainImage, setMainImage] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // State for controlling the edit modal

  const fetchSingleProductDetails = async () => {
    try {
      const response = await axiosInstance.get(`/product/getSingleProduct/${productId}`);
      setProduct(response.data.product);
      setMainImage(response.data.product.images[0]);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  const handleRAMClick = (variant) => {
    setSelectedVariant(variant);
    setQuantity(1); // Reset quantity when changing variant
  };

  const incrementQuantity = () => {
    if (!selectedVariant) {
      toast.error('Please select a RAM variant first.');
      return;
    }
    if (quantity >= selectedVariant.qty) {
      toast.error('Stock size exceeded.');
      return;
    }
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    setQuantity(quantity > 1 ? quantity - 1 : 1);
  };

  useEffect(() => {
    fetchSingleProductDetails();
  }, [productId]);

  return (
    <div className="flex h-full">
      <Toaster />
      <div className="w-1/2 border-r border-gray-300">
        <div className='flex items-center justify-center pt-5'>
          <img className="w-[440px] object-cover border rounded-lg border-black" src={mainImage} alt="Product" />
        </div>
        <div className="flex justify-center mt-4">
          {product.images && product.images.map((image, index) => (
            <img
              key={index}
              className="w-[100px] h-[100px] object-cover border rounded-lg mr-5 border-black cursor-pointer"
              src={image}
              alt={`Additional Image ${index + 1}`}
              onClick={() => setMainImage(image)}
            />
          ))}
        </div>
      </div>
      <div className="w-1/2 p-4">
        <h2 className="text-xl font-bold mb-2">{product.productName}</h2>
        <p className="mb-2 font-semibold">
          {selectedVariant ? `$${selectedVariant.price.toFixed(2)}` : '$523.99'}
        </p>
        <div className="flex items-center mb-2">
          <span className="text-sm font-semibold">Availability:</span>
          <div className="flex items-center ml-2 text-green-600">
            <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414L8.414 15 4.707 11.293a1 1 0 00-1.414 1.414l4.5 4.5a1 1 0 001.414 0l9-9a1 1 0 00-1.414-1.414z" clipRule="evenodd" />
            </svg>
            <span>In Stock</span>
          </div>
        </div>
        <hr className="border-t-2 border-gray-300 mb-4" />
        <div className="mb-4">
          <div className="flex items-center mb-2">
            <label className="text-sm font-semibold mr-2">RAM:</label>
            <div className="flex space-x-2">
              {product.variants && product.variants.map((variant) => (
                <button
                  key={variant._id}
                  onClick={() => handleRAMClick(variant)}
                  className={`w-20 h-12 flex items-center justify-center border rounded ${selectedVariant && selectedVariant.ram === variant.ram ? 'bg-amber-500 text-white' : 'bg-gray-200 text-black'}`}
                >
                  {variant.ram}GB
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="mb-4">
          <div className="flex items-center mb-2">
            <label className="text-sm font-semibold mr-2">Qty:</label>
            <div className="flex items-center border border-gray-300 rounded">
              <button onClick={decrementQuantity} className="bg-gray-200 text-black px-3 py-1 border-r border-gray-300 rounded-l">-</button>
              <span className="bg-gray-200 text-black px-3 py-1">{quantity}</span>
              <button onClick={incrementQuantity} className="bg-gray-200 text-black px-3 py-1 border-l border-gray-300 rounded-r">+</button>
            </div>
          </div>
        </div>
        <div className="flex">
          <button
            className="bg-amber-500 text-white px-8 py-4 w-40 mr-2 rounded-3xl flex-grow"
            onClick={() => setIsEditModalOpen(true)} // Open the edit modal when clicked
          >
            Edit Product
          </button>
          <button className="bg-amber-500 text-white px-4 py-2 mr-2 rounded-3xl flex-grow">Buy it Now</button>
          <button className="bg-gray-200 text-gray-800 px-4 rounded-full flex items-center justify-center ml-auto">
            <AiOutlineHeart className="w-6 h-6" />
          </button>
        </div>
      </div>
      {/* Edit Product Modal */}
      <EditProductModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        product={product} // Pass the product details to the modal
      />
    </div>
  );
};

export default ProductDetails;
