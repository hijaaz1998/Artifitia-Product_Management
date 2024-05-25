import React, { useState, useEffect } from 'react';
import axiosInstance from '../axionEndPoint/axiosEndPoint';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Cloudinary } from "@cloudinary/url-gen";
import ImageCropperModal from './modal/ImageCropperModal';

const AddProductModal = ({ onClose }) => {
  const userId = localStorage.getItem('userId');
  const UPLOAD_URL = import.meta.env.VITE_CLOUDINARY_URL;

  const [imageSrc, setImageSrc] = useState('');
  const [croppedImages, setCroppedImages] = useState([]);
  const [isCropperOpen, setIsCropperOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [publicId, setPublicId] = useState("");
  const [cloudName] = useState("dpfrbdv8l");
  const [uploadPreset] = useState("BidSphere");

  const [uwConfig] = useState({
    cloudName,
    uploadPreset,
    cropping: true,
  });

  const [subCategory, setSubCategory] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState('');
  const [productName, setProductName] = useState('');
  const [brand, setBrand] = useState('');
  const [productCode, setProductCode] = useState('');
  const [variants, setVariants] = useState([{ ram: '', price: '', qty: 1 }]);
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);

  const fetchSubcategories = async () => {
    try {
      const response = await axiosInstance.get(`/product/fetchSubCategory/${userId}`);
      if (response.data.success) {
        setSubCategory(response.data.subCategories);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchSubcategories();
  }, []);

  const handleVariantChange = (index, field, value) => {
    const newVariants = [...variants];
    newVariants[index][field] = value;
    setVariants(newVariants);
  };

  const addVariant = () => {
    setVariants([...variants, { ram: '', price: '', qty: 1 }]);
  };

  const removeVariant = (index) => {
    const newVariants = variants.filter((_, i) => i !== index);
    setVariants(newVariants);
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    const selectedImages = Array.from(files);
    const totalImages = images.length + selectedImages.length;
  
    if (totalImages > 3) {
      toast.error('You can only upload three images.');
      return;
    }
  
    selectedImages.forEach((file) => {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        const imageElement = new Image();
        const imageUrl = reader.result?.toString() || '';
        imageElement.src = imageUrl;
  
        imageElement.addEventListener('load', (e) => {
          const { naturalWidth, naturalHeight } = e.currentTarget;
          if (naturalHeight < MIN_DIMENSION || naturalWidth < MIN_DIMENSION) {
            toast.error('Image is too small');
            return setImageSrc('');
          }
        });
        setImageSrc(imageUrl);
        setIsCropperOpen(true);
      });
      reader.readAsDataURL(file);
    });
  };  

  const validateForm = () => {
    if (
      !productName.trim() ||
      !brand.trim() ||
      !productCode.trim() ||
      !selectedSubCategory.trim() ||
      !description.trim()
    ) {
      toast.error('All fields are required');
      return false;
    }
  
    if (variants.some((variant) => !variant.ram.trim() || !variant.price.trim())) {
      toast.error('Variant fields cannot be empty.');
      return false;
    }
  
    for (let i = 0; i < variants.length; i++) {
      const variant = variants[i];
      if (isNaN(parseFloat(variant.ram))) {
        toast.error(`Variant ${i + 1} RAM must be a number.`);
        return false;
      }
  
      if (isNaN(parseFloat(variant.price))) {
        toast.error(`Variant ${i + 1} Price must be a number.`);
        return false;
      }
  
      if (variant.qty <= 0) {
        toast.error(`Variant ${i + 1} quantity must be greater than 0.`);
        return false;
      }
    }
  
    if (images.length !== 3) {
      toast.error('Please upload three images.');
      return false;
    }
  
    return true;
  };
  
  const handleImageUpload = async (images) => {
    try {
      const uploadPromises = images.map(async (image) => {
        const formData = new FormData();
        formData.append('file', image);
        formData.append('upload_preset', uploadPreset);
        formData.append('cloud_name', cloudName);
        const response = await axios.post(UPLOAD_URL, formData);
        return response.data.secure_url;
      });

      const imageUrls = await Promise.all(uploadPromises);
      console.log('urllllllll', imageUrls)
      return imageUrls;
    } catch (error) {
      console.log(error);
      throw new Error('Failed to upload one or more images');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const imageUrls = await handleImageUpload(images);
      
      const formData = new FormData();
      formData.append('userId', userId);
      formData.append('productName', productName);
      formData.append('brand', brand);
      formData.append('productCode', productCode);
      formData.append('selectedSubCategory', selectedSubCategory);
      formData.append('description', description);
      formData.append('variants', JSON.stringify(variants));
      formData.append('imageUrls', JSON.stringify(imageUrls));

      const response = await axiosInstance.post('/product/addProduct', formData, {
        headers: {
          "Content-Type": 'multipart/form-data'
        }
      });
      if (response.data.success) {
        toast.success('Product added successfully!');
        onClose();
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false); 
    }
  };

  const cld = new Cloudinary({
    cloud: {
      cloudName
    }
  });

  const myImage = cld.image(publicId);

  const handleAddCroppedImage = (croppedImage) => {
    setCroppedImages([...croppedImages, croppedImage]);
    setImages([...images, croppedImage]);
  };

  // ----------------------------

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        id="crud-modal"
        tabIndex={-1}
        aria-hidden="true"
        className="overflow-y-auto overflow-x-hidden w-full h-full flex items-center justify-center"
      >
        <div className="relative p-4 w-full max-w-2xl max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-white">
            <div className="flex items-center justify-center p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-lg font-semibold text-black">
                Add Product
              </h3>
            </div>
            <form className="p-4 md:p-5" onSubmit={handleSubmit}>
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
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                />
              </div>

              <div className="mb-4 flex items-center">
                <label
                  htmlFor="brand"
                  className="text-sm font-medium text-gray-400 mr-2 w-1/4"
                >
                  Brand:
                </label>
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
                <label
                  htmlFor="productCode"
                  className="text-sm font-medium text-gray-400 mr-2 w-1/4"
                >
                  Product Code:
                </label>
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
                  <label
                    htmlFor={`variants-${index}`}
                    className="text-sm font-medium text-gray-400 mr-2 w-1/4"
                  >
                    Variant {index + 1}:
                  </label>
                  <div className="flex w-3/4 space-x-2">
                    <div className="flex items-center w-1/3">
                      <label
                        htmlFor={`ram-${index}`}
                        className="text-sm font-medium text-gray-400 mr-2"
                      >
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
                      <label
                        htmlFor={`price-${index}`}
                        className="text-sm font-medium text-gray-400 mr-2"
                      >
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
                      <label
                        htmlFor={`qty-${index}`}
                        className="text-sm font-medium text-gray-400 mr-2"
                      >
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
                    {variants.length > 1 && (
                      <button
                        type="button"
                        className="border border-gray-300 text-black text-sm rounded-lg p-2.5 focus:outline-none"
                        onClick={() => removeVariant(index)}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              ))}

              <div className="mb-4 flex items-center">
                <div className="w-1/4"></div>
                <button
                  type="button"
                  className="text-white font-medium rounded-lg text-sm px-5 py-2.5 ml-12 w-full bg-amber-500 mb-4"
                  onClick={addVariant}
                >
                  Add Variant
                </button>
              </div>

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
                    value={selectedSubCategory}
                    onChange={(e) => setSelectedSubCategory(e.target.value)}
                  >
                    <option value=''>Select subcategory</option>
                    {subCategory.map((category) => (
                      <option value={category._id} key={category._id}>
                        {category.subCategoryName} ({category.categoryId.categoryName})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mb-4 flex items-center">
                <label
                  htmlFor="description"
                  className="text-sm font-medium text-gray-400 mr-2 w-1/4"
                >
                  Description:
                </label>
                <input
                  type="text"
                  id="description"
                  className="border border-gray-300 text-black text-sm rounded-lg block w-3/4 p-2.5 focus:outline-none"
                  placeholder="Enter Product Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>


              <div className="mb-4 flex items-center">
                <label
                  htmlFor="images"
                  className="text-sm font-medium text-gray-400 mr-2 w-1/4"
                >
                  Upload Images:
                </label>
                <div className="flex flex-col w-3/4 space-y-2">
                  {/* Three input fields for selecting images */}
                  <div className="flex space-x-2">
                    <input
                      type="file"
                      id="image1"
                      name="image1"
                      className="border border-gray-300 text-black text-sm rounded-lg p-2.5 focus:outline-none"
                      onChange={handleFileChange}
                    />
                  </div>
                  {/* Preview section for each input field */}
                  <div className="flex space-x-4">
                    <img
                      src={croppedImages[0] || "https://via.placeholder.com/150"}
                      alt="Image 1"
                      className="w-32 h-32 object-cover border border-gray-300 rounded"
                    />
                    <img
                      src={croppedImages[1] || "https://via.placeholder.com/150"}
                      alt="Image 2"
                      className="w-32 h-32 object-cover border border-gray-300 rounded"
                    />
                    <img
                      src={croppedImages[2] || "https://via.placeholder.com/150"}
                      alt="Image 3"
                      className="w-32 h-32 object-cover border border-gray-300 rounded"
                    />
                  </div>
                </div>
              </div>


              <div className="flex justify-end space-x-2 mt-4">
                <button
                  type="submit"
                  className="text-white font-medium rounded-lg text-sm px-5 py-2.5 w-24 bg-amber-500"
                  disabled={isLoading}
                >
                  {isLoading ? 'Submitting...' : 'ADD'}
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

      {/* Image Cropper Modal */}
      <ImageCropperModal
        isOpen={isCropperOpen}
        imageSrc={imageSrc}
        onCropComplete={handleAddCroppedImage}
        onClose={() => setIsCropperOpen(false)}
      />
    </div>
  );
};

export default AddProductModal;
