// ImageCropper.js
import React, { useState, useEffect, useCallback } from 'react';
import ReactCrop, { centerCrop, makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

const MIN_DIMENSION = 150;
const ASPECT_RATIO = 1;

const ImageCropper = ({ imageSrc, onCropComplete }) => {
  const [crop, setCrop] = useState();

  const onImageLoad = useCallback((e) => {
    const { width, height } = e.currentTarget;
    const cropWidthInPercent = (MIN_DIMENSION / width) * 100;

    const crop = makeAspectCrop(
      {
        unit: '%',
        width: cropWidthInPercent,
      },
      ASPECT_RATIO,
      width,
      height
    );
    const centeredCrop = centerCrop(crop, width, height);
    setCrop(centeredCrop);
  }, []);

  const getCroppedImg = useCallback((image, crop) => {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        resolve(URL.createObjectURL(blob));
      }, 'image/jpeg');
    });
  }, []);

  const handleCropComplete = useCallback(async (crop) => {
    if (!crop || !crop.width || !crop.height) return;
    const image = document.querySelector('.ReactCrop__image');
    const croppedImageUrl = await getCroppedImg(image, crop);
    onCropComplete(croppedImageUrl);
  }, [getCroppedImg, onCropComplete]);

  return (
    <div className="flex flex-col items-center">
      {imageSrc && (
        <ReactCrop
          crop={crop}
          onChange={(newCrop) => setCrop(newCrop)}
          onComplete={handleCropComplete}
          aspect={ASPECT_RATIO}
          minWidth={MIN_DIMENSION}
        >
          <img src={imageSrc} alt="Upload" onLoad={onImageLoad} />
        </ReactCrop>
      )}
    </div>
  );
};

export default ImageCropper;
