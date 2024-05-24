import React, { useState, useEffect } from 'react';
import axiosInstance from '../axionEndPoint/axiosEndPoint';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import './Sidebar.css';

const SideBar = () => {
  const userId = localStorage.getItem('userId');
  
  const [selector1Open, setSelector1Open] = useState(false);
  const [categoriesWithSub, setCategoriesWithSub] = useState([]);

  const fetchCategoriesWithSubCategories = async () => {
    try {
      const response = await axiosInstance.get(`/product/getCategoriesWithSub/${userId}`);
      setCategoriesWithSub(response.data.categoriesWithSub);
    } catch (error) {
      console.error('Error fetching categories and subcategories:', error);
    }
  };

  useEffect(() => {
    fetchCategoriesWithSubCategories();
  }, []);

  return (
    <div className='bg-blue-300 h-full p-4'>
      <div className="text-lg font-bold mb-2">Categories</div>
      {categoriesWithSub.map((category, index) => (
        <div key={category._id} className="mb-4">
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => setSelector1Open(selector1Open === index ? false : index)}
          >
            <div>{category._doc.categoryName}</div>
            <div>
              {selector1Open === index ? <FiChevronUp /> : <FiChevronDown />}
            </div>
          </div>
          {selector1Open === index && (
            <div className="ml-4">
              {category.subCategories.map((subCategory) => (
                <div key={subCategory._id} className="flex items-center mt-3">
                  <input
                    type="checkbox"
                    id={subCategory._id}
                    name={subCategory.subCategoryName}
                    className="custom-checkbox"
                  />
                  <label htmlFor={subCategory._id} className="custom-checkbox-label">
                    {subCategory.subCategoryName}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default SideBar;
