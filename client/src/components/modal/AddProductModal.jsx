import React from 'react';

const AddProductModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      {/* Main modal */}
      <div
        id="crud-modal"
        tabIndex={-1}
        aria-hidden="true"
        className="overflow-y-auto overflow-x-hidden w-full h-full flex items-center justify-center"
      >
        <div className="relative p-4 w-full max-w-2xl max-h-full">
          {/* Modal content */}
          <div className="relative bg-white rounded-lg shadow dark:bg-white">
            {/* Modal header */}
            <div className="flex items-center justify-center p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-lg font-semibold text-black">
                Add Product
              </h3>
            </div>
            {/* Modal body */}
            <form className="p-4 md:p-5">
              {/* Product Name */}
              <div className="mb-4 flex items-center">
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-gray-400 mr-2 w-1/4"
                >
                  Product Name:
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="border border-gray-300 text-black text-sm rounded-lg block w-3/4 p-2.5 focus:outline-none"
                  placeholder="Enter Product Name"
                  required
                />
              </div>

              <div className="mb-4 flex items-center">
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-gray-400 mr-2 w-1/4"
                >
                  Brand:
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="border border-gray-300 text-black text-sm rounded-lg block w-3/4 p-2.5 focus:outline-none"
                  placeholder="Enter Brand Name"
                  required
                />
              </div>

              <div className="mb-4 flex items-center">
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-gray-400 mr-2 w-1/4"
                >
                Product Code:
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="border border-gray-300 text-black text-sm rounded-lg block w-3/4 p-2.5 focus:outline-none"
                  placeholder="Enter Product Code"
                  required
                />
              </div>
              
              {/* Variants */}
              <div className="mb-4 flex items-center">
                <label
                  htmlFor="variants"
                  className="text-sm font-medium text-gray-400 mr-2 w-1/4"
                >
                  Variants:
                </label>
                <div className="flex w-3/4 space-x-2">
                  <div className="flex items-center w-1/3">
                    <label
                      htmlFor="ram"
                      className="text-sm font-medium text-gray-400 mr-2"
                    >
                      RAM:
                    </label>
                    <input
                      type="text"
                      id="ram"
                      name="ram"
                      className="border border-gray-300 text-black text-sm rounded-lg p-2.5 focus:outline-none w-full"
                      placeholder="Enter RAM"
                    />
                  </div>
                  <div className="flex items-center w-1/3">
                    <label
                      htmlFor="price"
                      className="text-sm font-medium text-gray-400 mr-2"
                    >
                      Price:
                    </label>
                    <input
                      type="text"
                      id="price"
                      name="price"
                      className="border border-gray-300 text-black text-sm rounded-lg p-2.5 focus:outline-none w-full"
                      placeholder="Enter Price"
                    />
                  </div>
                  <div className="flex items-center w-1/3">
                    <label
                      htmlFor="qty"
                      className="text-sm font-medium text-gray-400 mr-2"
                    >
                      Qty:
                    </label>
                    <div className="flex items-center">
                        <button
                        type="button"
                        className="border border-gray-300 text-black text-sm rounded-l-lg p-2 focus:outline-none"
                        >
                        -
                        </button>
                        <input
                        type="text"
                        id="qty2"
                        name="qty2"
                        className="border border-gray-300 text-black text-sm rounded-r-lg p-2.5 focus:outline-none w-16 text-center"
                        value="1"
                        readOnly
                        />
                        <button
                        type="button"
                        className="border border-gray-300 text-black text-sm rounded-r-lg p-2 focus:outline-none"
                        >
                        +
                        </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Second Row for RAM, Price, and Qty */}
              <div className="mb-4 flex items-center">
                <div className="flex w-3/4 ml-auto space-x-2">
                  <div className="flex items-center w-1/3">
                    <label
                      htmlFor="ram2"
                      className="text-sm font-medium text-gray-400 mr-2"
                    >
                      RAM:
                    </label>
                    <input
                      type="text"
                      id="ram2"
                      name="ram2"
                      className="border border-gray-300 text-black text-sm rounded-lg p-2.5 focus:outline-none w-full"
                      placeholder="Enter RAM"
                    />
                  </div>
                  <div className="flex items-center w-1/3">
                    <label
                      htmlFor="price2"
                      className="text-sm font-medium text-gray-400 mr-2"
                    >
                      Price:
                    </label>
                    <input
                      type="text"
                      id="price2"
                      name="price2"
                      className="border border-gray-300 text-black text-sm rounded-lg p-2.5 focus:outline-none w-full"
                      placeholder="Enter Price"
                    />
                  </div>
                  <div className="flex items-center w-1/3">
                    <label
                      htmlFor="qty2"
                      className="text-sm font-medium text-gray-400 mr-2"
                    >
                      Qty:
                    </label>
                    <div className="flex items-center">
                        <button
                        type="button"
                        className="border border-gray-300 text-black text-sm rounded-l-lg p-2 focus:outline-none"
                        >
                        -
                        </button>
                        <input
                        type="text"
                        id="qty2"
                        name="qty2"
                        className="border border-gray-300 text-black text-sm rounded-r-lg p-2.5 focus:outline-none w-16 text-center"
                        value="1"
                        readOnly
                        />
                        <button
                        type="button"
                        className="border border-gray-300 text-black text-sm rounded-r-lg p-2 focus:outline-none"
                        >
                        +
                        </button>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Subcategory */}
              <div className="mb-4 flex items-center">
                <label
                  htmlFor="subcategory"
                  className="text-sm font-medium text-gray-400 mr-2 w-1/4"
                >
                  Subcategory:
                </label>
                <div className="flex items-center w-3/4">
                  <select
                    id="subcategory"
                    className="border border-gray-300 text-gray-400 text-sm rounded-lg block p-2.5 focus:outline-none flex-grow"
                  >
                    <option selected="">Select subcategory</option>
                    <option value="LED">LED</option>
                    <option value="OLED">OLED</option>
                    <option value="QLED">QLED</option>
                    <option value="LCD">LCD</option>
                  </select>
                </div>
              </div>
              
              {/* Description */}
              <div className="mb-4 flex items-center">
                <label
                  htmlFor="description"
                  className="text-sm font-medium text-gray-400 mr-2 w-1/4"
                >
                  Description:
                </label>
                <textarea
                  id="description"
                  rows={4}
                  className="border border-gray-300 text-black text-sm rounded-lg block w-3/4 p-2.5 focus:outline-none"
                  placeholder="Enter Product Description"
                />
              </div>

              {/* Upload Images */}
              <div className="mb-4 flex items-center">
                <label
                  htmlFor="images"
                  className="text-sm font-medium text-gray-400 mr-2 w-1/4"
                >
                  Upload Images:
                </label>
                <div className="flex w-3/4 space-x-2">
                  <input
                    type="file"
                    id="image1"
                    name="image1"
                    className="border border-gray-300 text-black text-sm rounded-lg p-2.5 focus:outline-none"
                  />
                  <input
                    type="file"
                    id="image2"
                    name="image2"
                    className="border border-gray-300 text-black text-sm rounded-lg p-2.5 focus:outline-none"
                  />
                  <input
                    type="file"
                    id="image3"
                    name="image3"
                    className="border border-gray-300 text-black text-sm rounded-lg p-2.5 focus:outline-none"
                  />
                </div>
              </div>
              
              {/* Buttons */}
              <div className="flex justify-end space-x-2 mt-4">
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

export default AddProductModal;
