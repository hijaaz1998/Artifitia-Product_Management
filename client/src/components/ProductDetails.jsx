import React, { useEffect, useState } from 'react';
import { AiOutlineHeart } from 'react-icons/ai';
import axiosInstance from '../axionEndPoint/axiosEndPoint';
import toast, { Toaster } from 'react-hot-toast';
import EditProductModal from './modal/EditProductModal';

const ProductDetails = ({ productId }) => {
  const userId = localStorage.getItem('userId');

  const [selectedVariantIndex, setSelectedVariantIndex] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState({});
  const [mainImage, setMainImage] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);

  const fetchSingleProductDetails = async () => {
    try {
      const response = await axiosInstance.get(`/product/getSingleProduct/${productId}`);
      setProduct(response.data.product);
      setMainImage(response.data.product.images[0]);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  const handleRAMClick = (index) => {
    setSelectedVariantIndex(index);
    setQuantity(1);
    calculateTotalAmount(product.variants[index].price, 1);
  };

  const incrementQuantity = () => {
    if (selectedVariantIndex === null) {
      toast.error('Please select a RAM variant first.');
      return;
    }
    const selectedVariant = product.variants[selectedVariantIndex];
    if (quantity >= selectedVariant.qty) {
      toast.error('Insufficient stock.');
      return;
    }
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    calculateTotalAmount(selectedVariant.price, newQuantity);
  };

  const decrementQuantity = () => {
    const newQuantity = quantity > 1 ? quantity - 1 : 1;
    setQuantity(newQuantity);
    if (selectedVariantIndex !== null) {
      calculateTotalAmount(product.variants[selectedVariantIndex].price, newQuantity);
    }
  };

  const calculateTotalAmount = (price, quantity) => {
    setTotalAmount(price * quantity);
  };

  const handleBuyNow = async () => {
    if (selectedVariantIndex === null) {
      toast.error('Please select a RAM variant first.');
      return;
    }

    const selectedVariant = product.variants[selectedVariantIndex];

    try {
      const response = await axiosInstance.post('/product/addToCart', {
        userId,
        productId: productId,
        variant: selectedVariant,
        quantity: quantity,
        amount: Number(selectedVariant.price.toFixed(2)),
        totalAmount: totalAmount
      });

      if(response.data.success){
        toast.success('Product added to cart successfully!');
        setProduct(response.data.updatedProduct)
      }
    } catch (error) {
      if(error.response && error.response.data){
        toast.error(error.response.data.message)
      } else {
        console.log(error)
        toast.error('Failed to add product to cart.');
      }
    }
  };

  const handleWishlist = async(productId) => {
    try {
      const response = await axiosInstance.post('/product/addToWishlist',{userId, productId});
      if(response.data.success){
        toast.success('Item added to wishlist')
      }
    } catch (error) {
      if(error.response && error.response.data) {
        toast.error(error.response.data.message)
      } else {
        console.log(error)
        toast.error(error.message)
      }
    }
  }

  useEffect(() => {
    fetchSingleProductDetails();
  }, [productId]);

  return (
    <>
    <div className="flex h-full">
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
      <div className="w-1/2 p-4 flex flex-col">
        <div className="border-b-2 border-gray-300 mb-4">
          <h2 className="text-xl font-bold mb-2">{product.productName}</h2>
          <p className="mb-2 font-semibold">
            {selectedVariantIndex !== null ? `$${product.variants[selectedVariantIndex].price.toFixed(2)}` : 'Select a variant to see the price'}
          </p>
          <p className='mb-2 font-semibold'>{product.description}</p>
          <div className="flex items-center mb-2">
            <span className="text-sm font-semibold">Availability:</span>
            <div className="flex items-center ml-2 text-green-600">
              <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414L8.414 15 4.707 11.293a1 1 0 00-1.414 1.414l4.5 4.5a1 1 0 001.414 0l9-9a1 1 0 00-1.414-1.414z" clipRule="evenodd" />
              </svg>
              <span>In Stock</span>
            </div>
          </div>
        </div>
        <div className="flex-grow">
          <hr className="border-t-2 border-gray-300 mb-4" />
          <div className="mb-4">
            <div className="flex items-center mb-2">
              <label className="text-sm font-semibold mr-2">RAM:</label>
              <div className="flex space-x-2">
                {product.variants && product.variants.map((variant, index) => (
                  <button
                    key={index}
                    onClick={() => handleRAMClick(index)}
                    className={`w-20 h-12 flex items-center justify-center border rounded ${selectedVariantIndex === index ? 'bg-amber-500 text-white' : 'bg-gray-200 text-black'}`}
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
          <p className="text-sm font-bold my-3">Total: ${totalAmount.toFixed(2)}</p>
          <div className="flex">
            <button
              className="bg-amber-500 text-white px-8 py-4 w-40 mr-2 rounded-3xl flex-grow"
              onClick={() => setIsEditModalOpen(true)}
            >
              Edit Product
            </button>
            <button
              className="bg-amber-500 text-white px-4 py-2 mr-2 rounded-3xl flex-grow"
              onClick={handleBuyNow}
            >
              Buy it Now
            </button>
            
            <button className="bg-gray-200 text-gray-800 px-4 rounded-full flex items-center justify-center ml-auto">
              <AiOutlineHeart onClick={() => handleWishlist(product._id)} className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  
    <EditProductModal
      isOpen={isEditModalOpen}
      onClose={() => setIsEditModalOpen(false)}
      product={product}
      fetchSingleProductDetails={fetchSingleProductDetails}
    />
    </>
  );
  
};

export default ProductDetails;
