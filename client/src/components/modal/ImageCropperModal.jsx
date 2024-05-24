// ImageCropperModal.js
import React, { useState, useRef } from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

const ImageCropperModal = ({ isOpen, imageSrc, onCropComplete, onClose }) => {
  const cropperRef = useRef(null);
  const [croppedImage, setCroppedImage] = useState(null);

  const handleCrop = () => {
    const cropper = cropperRef.current.cropper;
    setCroppedImage(cropper.getCroppedCanvas().toDataURL());
  };

  const handleAddCroppedImage = () => {
    onCropComplete(croppedImage);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative p-4 w-full max-w-2xl max-h-full bg-white rounded-lg shadow">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold">Crop Image</h3>
          <button
            type="button"
            className="text-gray-400 hover:text-gray-600"
            onClick={onClose}
          >
            Close
          </button>
        </div>
        <div className="p-4">
          <Cropper
            src={imageSrc}
            style={{ height: 400, width: '100%' }}
            initialAspectRatio={1}
            aspectRatio={1}
            guides={false}
            ref={cropperRef}
            crop={handleCrop}
          />
          <div className="flex justify-end mt-4">
            <button
              type="button"
              className="text-white font-medium rounded-lg text-sm px-5 py-2.5 bg-amber-500"
              onClick={handleAddCroppedImage}
            >
              Add Cropped Image
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageCropperModal;
