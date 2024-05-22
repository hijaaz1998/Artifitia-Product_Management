import React from 'react';

const Buttons = ({ onAddCategoryClick, onAddSubcategoryClick, onAddProductClick }) => {
  return (
    <div className="flex justify-around">
      <button 
        className="w-36 py-3 bg-amber-500 text-white rounded-xl" 
        onClick={onAddCategoryClick}
      >
        Add Category
      </button>
      <button 
        className="w-36 py-3 bg-amber-500 text-white rounded-xl" 
        onClick={onAddSubcategoryClick}
      >
        Add Subcategory
      </button>
      <button 
        className="w-36 py-3 bg-amber-500 text-white rounded-xl" 
        onClick={onAddProductClick}
      >
        Add Product
      </button>
    </div>
  );
};

export default Buttons;
