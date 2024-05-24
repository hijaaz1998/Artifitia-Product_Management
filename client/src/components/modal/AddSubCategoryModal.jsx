import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axionEndPoint/axiosEndPoint';
import toast from 'react-hot-toast';

const AddSubCategoryModal = ({ onClose }) => {
  const [subCategory, setSubCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const userId = localStorage.getItem('userId');

  const handleAddSubCategory = async (e) => {
    e.preventDefault();
    if (!selectedCategory || !subCategory.trim()) {
      toast.error('Category and Subcategory are required')
      return;
    }

    try {
      const response = await axiosInstance.post('/product/addSubCategory', {
        userId,
        category: selectedCategory,
        subCategoryName: subCategory,
      });
      if(response.data.success){
        toast.success(response.data.message)
        onClose()
      }
    } catch (error) {
      if(error.response && error.response.data){
        toast.error(error.response.data.message)
      } else {
        toast.error(error.message)
      }
    }
  };

  const getCategories = async () => {
    try {
      const response = await axiosInstance.get(`/product/getCategories/${userId}`);
      if(response.data.success){
        setCategories(response.data.categories);
        if(response.data.categories.length === 0){
          toast.error('Add a category first')
        } 
      }
      console.log(response.data.categories);
    } catch (error) {
      toast.error(error.message)
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      {/* Main modal */}
      <div
        id="crud-modal"
        tabIndex={-1}
        aria-hidden="true"
        className="overflow-y-auto overflow-x-hidden w-full h-full flex items-center justify-center"
      >
        <div className="relative p-4 w-full max-w-md max-h-full">
          {/* Modal content */}
          <div className="relative bg-white rounded-lg shadow dark:bg-white">
            {/* Modal header */}
            <div className="flex items-center justify-center p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-lg font-semibold text-black ">
                Add Subcategory
              </h3>
            </div>
            {/* Modal body */}
            <form className="p-4 md:p-5" onSubmit={handleAddSubCategory}>
              <div className="grid gap-4 mb-4 grid-cols-2">
                <div className="col-span-2">
                  <select
                    id="category"
                    name="category"
                    className="border border-gray-300 text-black text-sm rounded-lg block w-full p-2.5 focus:outline-none"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    <option value="" disabled>
                      Select Category
                    </option>
                    {categories.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.categoryName}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-span-2">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="border border-gray-300 text-black text-sm rounded-lg block w-full p-2.5 focus:outline-none"
                    placeholder="Enter Subcategory Name"
                    value={subCategory}
                    onChange={(e) => setSubCategory(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex justify-center space-x-2 mt-4">
                <button
                  type="submit"
                  className="text-white font-medium rounded-lg text-sm px-5 py-2.5 w-24 bg-amber-500"
                >
                  ADD
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="text-gray-700 bg-white border border-gray-300 hover:bg-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 w-24"
                >
                  DISCARD
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSubCategoryModal;
