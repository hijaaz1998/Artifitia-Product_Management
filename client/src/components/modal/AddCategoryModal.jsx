import React from 'react';

const AddCategoryModal = ({ onClose }) => {
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
                Add Category
              </h3>
            </div>
            {/* Modal body */}
            <form className="p-4 md:p-5">
              <div className="grid gap-4 mb-4 grid-cols-2">
                <div className="col-span-2">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className=" border border-gray-300 text-black text-sm rounded-lg  block w-full p-2.5 focus:outline-none"
                    placeholder="Enter Category Name"
                    required=""
                  />
                </div>
              </div>
              <div className="flex justify-center space-x-2 mt-4">
                <button
                  type="submit"
                  className="text-white   font-medium rounded-lg text-sm px-5 py-2.5 w-24 bg-amber-500"
                >
                  ADD
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="text-gray-700 bg-white border border-gray-300 hover:bg-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 w-24 "
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

export default AddCategoryModal;
