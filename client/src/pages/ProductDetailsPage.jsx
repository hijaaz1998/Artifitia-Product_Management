import React from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../components/Navbar';
import BreadCrumbs from '../components/BreadCrumbs';
import ProductDetails from '../components/ProductDetails';

const ProductDetailsPage = () => {
  const { id } = useParams(); // Extract the product ID from URL params

  return (
    <div className="flex flex-col h-screen">
      <div className="bg-cyan-200">
        <NavBar />
      </div>
      <div className="py-3">
        {/* Breadcrumbs */}
        <BreadCrumbs />
      </div>
      <div className="flex-1">
        {/* Pass the product ID to ProductDetails */}
        <ProductDetails productId={id} />
      </div>
    </div>
  );
};

export default ProductDetailsPage;
