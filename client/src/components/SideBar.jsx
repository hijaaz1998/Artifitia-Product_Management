import React from 'react';

const SideBar = () => {
  return (
    <div className="sidebar">
      <h2>Categories</h2>
      <div className="dropdown">
        <label htmlFor="category1">Category 1:</label>
        <select id="category1" name="category1">
          <option value="subcategory1">Subcategory 1</option>
          <option value="subcategory2">Subcategory 2</option>
          <option value="subcategory3">Subcategory 3</option>
        </select>
      </div>
      <div className="dropdown">
        <label htmlFor="category2">Category 2:</label>
        <select id="category2" name="category2">
          <option value="subcategory1">Subcategory 1</option>
          <option value="subcategory2">Subcategory 2</option>
          <option value="subcategory3">Subcategory 3</option>
        </select>
      </div>
      <div className="dropdown">
        <label htmlFor="category3">Category 3:</label>
        <select id="category3" name="category3">
          <option value="subcategory1">Subcategory 1</option>
          <option value="subcategory2">Subcategory 2</option>
          <option value="subcategory3">Subcategory 3</option>
        </select>
      </div>
    </div>
  );
}

export default SideBar;
