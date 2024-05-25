import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axionEndPoint/axiosEndPoint';
import { toast } from 'react-hot-toast';

const EditProductModal = ({ isOpen, onClose, product }) => {
  const [productName, setProductName] = useState('');
  const [brand, setBrand] = useState('');
  const [productCode, setProductCode] = useState('');
  const [description, setDescription] = useState('');
  const [variants, setVariants] = useState([{ ram: '', price: '', qty: 1 }]);

  useEffect(() => {
    if (product) {
      setProductName(product.productName);
      setBrand(product.brand);
      setProductCode(product.productCode);
      setDescription(product.description);
      setVariants(product.variants || [{ ram: '', price: '', qty: 1 }]);
    }
  }, [product]);

  const handleVariantChange = (index, field, value) => {
    const newVariants = [...variants];
    newVariants[index][field] = value;
    setVariants(newVariants);
  };

  const handleEditProduct = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.put(`/product/updateProduct/${product._id}`, {
        productName,
        brand,
        productCode,
        description,
        variants,
      });
      if (response.data.success) {
        toast.success('Product updated successfully!');
        onClose();
      }
    } catch (error) {
        console.log(error)
      toast.error('Failed to update product. Please try again.');
    }
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center ${isOpen ? '' : 'hidden'}`}>
      <div
        id="crud-modal"
        tabIndex={-1}
        aria-hidden="true"
        className="overflow-y-auto overflow-x-hidden w-full h-full flex items-center justify-center"
      >
        <div className="relative p-4 w-full max-w-2xl max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-white">
            <div className="flex items-center justify-center p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-lg font-semibold text-black">Edit Product</h3>
            </div>
            <form className="p-4 md:p-5" onSubmit={handleEditProduct}>
              <div className="mb-4 flex items-center">
                <label htmlFor="name" className="text-sm font-medium text-gray-400 mr-2 w-1/4">Product Name:</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="border border-gray-300 text-black text-sm rounded-lg block w-3/4 p-2.5 focus:outline-none"
                  placeholder="Enter Product Name"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                />
              </div>

              <div className="mb-4 flex items-center">
                <label htmlFor="brand" className="text-sm font-medium text-gray-400 mr-2 w-1/4">Brand:</label>
                <input
                  type="text"
                  name="brand"
                  id="brand"
                  className="border border-gray-300 text-black text-sm rounded-lg block w-3/4 p-2.5 focus:outline-none"
                  placeholder="Enter Brand Name"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                />
              </div>

              <div className="mb-4 flex items-center">
                <label htmlFor="productCode" className="text-sm font-medium text-gray-400 mr-2 w-1/4">Product Code:</label>
                <input
                  type="text"
                  name="productCode"
                  id="productCode"
                  className="border border-gray-300 text-black text-sm rounded-lg block w-3/4 p-2.5 focus:outline-none"
                  placeholder="Enter Product Code"
                  value={productCode}
                  onChange={(e) => setProductCode(e.target.value)}
                />
              </div>

              {variants.map((variant, index) => (
                <div key={index} className="mb-4 flex items-center">
                  <label htmlFor={`variants-${index}`} className="text-sm font-medium text-gray-400 mr-2 w-1/4">
                    Variant {index + 1}:
                  </label>
                  <div className="flex w-3/4 space-x-2">
                    <div className="flex items-center w-1/3">
                      <label htmlFor={`ram-${index}`} className="text-sm font-medium text-gray-400 mr-2">
                        RAM:
                      </label>
                      <input
                        type="text"
                        id={`ram-${index}`}
                        name={`ram-${index}`}
                        className="border border-gray-300 text-black text-sm rounded-lg p-2.5 focus:outline-none w-full"
                        placeholder="Enter RAM"
                        value={variant.ram}
                        onChange={(e) => handleVariantChange(index, 'ram', e.target.value)}
                      />
                    </div>
                    <div className="flex items-center w-1/3">
                      <label htmlFor={`price-${index}`} className="text-sm font-medium text-gray-400 mr-2">
                        Price:
                      </label>
                      <input
                        type="text"
                        id={`price-${index}`}
                        name={`price-${index}`}
                        className="border border-gray-300 text-black text-sm rounded-lg p-2.5 focus:outline-none w-full"
                        placeholder="Enter Price"
                        value={variant.price}
                        onChange={(e) => handleVariantChange(index, 'price', e.target.value)}
                      />
                    </div>
                    <div className="flex items-center w-1/3">
                      <label htmlFor={`qty-${index}`} className="text-sm font-medium text-gray-400 mr-2">
                        Qty:
                      </label>
                      <div className="flex items-center">
                        <button
                          type="button"
                          className="border border-gray-300 text-black text-sm rounded-l-lg p-2 focus:outline-none"
                          onClick={() => handleVariantChange(index, 'qty', Math.max(1, variant.qty - 1))}
                        >
                          -
                        </button>
                        <input
                          type="text"
                          id={`qty-${index}`}
                          name={`qty-${index}`}
                          className="border border-gray-300 text-black text-sm rounded-none p-2.5 focus:outline-none w-16 text-center"
                          value={variant.qty}
                          readOnly
                        />
                        <button
                          type="button"
                          className="border border-gray-300 text-black text-sm rounded-r-lg p-2 focus:outline-none"
                          onClick={() => handleVariantChange(index, 'qty', variant.qty + 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <div className="mb-4 flex items-center">
                <label htmlFor="description" className="text-sm font-medium text-gray-400 mr-2 w-1/4">Description:</label>
                <input
                  type="text"
                  id="description"
                  className="border border-gray-300 text-black text-sm rounded-lg block w-3/4 p-2.5 focus:outline-none"
                  placeholder="Enter Product Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="flex justify-end space-x-2 mt-4">
                <button
                  type="submit"
                  className="text-white font-medium rounded-lg text-sm px-5 py-2.5 w-24 bg-amber-500"
                >
                  UPDATE
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="text-gray-700 bg-white border border-gray-300 hover:bg-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 w-24"
                >
                  CANCEL
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProductModal;
