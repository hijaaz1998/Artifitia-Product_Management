import React from 'react'
import NavBar from '../components/Navbar'
import BreadCrumbs from '../components/BreadCrumbs'
import ProductDetails from '../components/ProductDetails'


const ProductDetailsPage = () => {
  return (
    <div className="flex flex-col h-screen">
      <div className="bg-cyan-200">
        <NavBar />
      </div>
      <div className="py-3">
        {/* Breadcrumbs */}
        <BreadCrumbs />
      </div>
      <div className="flex-1 bg-orange-300">
        {/* Product Details */}
        <ProductDetails />
      </div>
    </div>
  )
}

export default ProductDetailsPage