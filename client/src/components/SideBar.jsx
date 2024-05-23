import React from 'react';

const SideBar = () => {
  return (
    <div className="h-full w-full p-10 ">
      <h2 className="text-black">Categories</h2>
      <div className="dropdown py-2">
        <select id="category1" name="category1" className="w-full">
          <option value="subcategory1">Subcategory 1</option>
          <option value="subcategory2">Subcategory 2</option>
          <option value="subcategory3">Subcategory 3</option>
        </select>
      </div>
      <div className="dropdown py-2">
        <select id="category2" name="category2" className="w-full">
          <option value="subcategory1">Subcategory 1</option>
          <option value="subcategory2">Subcategory 2</option>
          <option value="subcategory3">Subcategory 3</option>
        </select>
      </div>
      <div className="dropdown py-2">
        <select id="category3" name="category3" className="w-full">
          <option value="subcategory1">Subcategory 1</option>
          <option value="subcategory2">Subcategory 2</option>
          <option value="subcategory3">Subcategory 3</option>
        </select>
      </div>
    </div>
  );
}

export default SideBar;
