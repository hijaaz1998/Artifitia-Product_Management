import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import NavBar from '../components/Navbar';
import BreadCrumbs from '../components/BreadCrumbs';
import ProductDetails from '../components/ProductDetails';

const ProductDetailsPage = () => {
  const { id } = useParams(); 
  const location = useLocation();
  const { onToggleCartOverlay, onToggleWishlistOverlay } = location.state || {};

  return (
    <div className="flex flex-col h-screen">
      <div className="bg-cyan-200">
        <NavBar 
          onToggleCartOverlay={onToggleCartOverlay}
          onToggleWishlistOverlay={onToggleWishlistOverlay}
        />
      </div>
      <div className="flex-1 mt-10">
        <ProductDetails 
          productId={id} 
        />
      </div>
    </div>
  );
};

export default ProductDetailsPage;
