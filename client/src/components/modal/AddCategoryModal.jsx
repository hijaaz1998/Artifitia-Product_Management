import React,{useState} from 'react';
import toast from 'react-hot-toast';
import axiosInstance from '../../axionEndPoint/axiosEndPoint';

const AddCategoryModal = ({ onClose }) => {

  const [category, setCategory] = useState('')
  const userId = localStorage.getItem('userId')

  const handleAddCategory = async (e) => {
    e.preventDefault();

    if(!category.trim()){
      toast.error('Field Cannot Be Empty');
      return
    }

    try {
      const response = await axiosInstance.post('/product/addCategory', {category, userId})

      if(response.data.success){
        toast.success(response.data.message)
        onClose();
      }
      
    } catch (error) {
      if(error.response && error.response.data){
        toast.error(error.response.data.message)
      } else {
        toast.error(error.message)
      }
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        id="crud-modal"
        tabIndex={-1}
        aria-hidden="true"
        className="overflow-y-auto overflow-x-hidden w-full h-full flex items-center justify-center"
      >
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-white">
            <div className="flex items-center justify-center p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-lg font-semibold text-black ">
                Add Category
              </h3>
            </div>
            <form className="p-4 md:p-5">
              <div className="grid gap-4 mb-4 grid-cols-2">
                <div className="col-span-2">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className=" border border-gray-300 text-black text-sm rounded-lg  block w-full p-2.5 focus:outline-none"
                    placeholder="Enter Category Name"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex justify-center space-x-2 mt-4">
                <button
                  type="submit"
                  className="text-white font-medium rounded-lg text-sm px-5 py-2.5 w-24 bg-amber-500"
                  onClick={handleAddCategory}
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
