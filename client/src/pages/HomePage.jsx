import React, { useState } from 'react';
import NavBar from '../components/Navbar';
import BreadCrumbs from '../components/BreadCrumbs';
import Buttons from '../components/Buttons';
import SideBar from '../components/SideBar';
import Main from '../components/Main';
import CartSidebar from '../components/CartSidebar';
import WishlistSidebar from '../components/WishlistSidebar';
import AddCategoryModal from '../components/modal/AddCategoryModal';
import AddSubCategoryModal from '../components/modal/AddSubCategoryModal';
import AddProductModal from '../components/modal/AddProductModal';

const HomePage = () => {
  const [isCartOverlayOpen, setIsCartOverlayOpen] = useState(false);
  const [isWishlistOverlayOpen, setIsWishlistOverlayOpen] = useState(false);
  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false); // State for add category modal
  const [isAddSubcategoryModalOpen, setIsAddSubcategoryModalOpen] = useState(false); // State for add subcategory modal
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Item 1', price: 10 },
    { id: 2, name: 'Item 2', price: 20 },
  ]);
  const [wishlistItems, setWishlistItems] = useState([
    { id: 1, name: 'Item A' },
    { id: 2, name: 'Item B' },
    { id: 3, name: 'Item C' },
  ]);

  const handleToggleCartOverlay = () => {
    setIsCartOverlayOpen(!isCartOverlayOpen);
  };

  const handleToggleWishlistOverlay = () => {
    setIsWishlistOverlayOpen(!isWishlistOverlayOpen);
  };

  const handleRemoveCartItem = (itemId) => {
    setCartItems(cartItems.filter(item => item.id !== itemId));
  };

  const handleRemoveWishlistItem = (itemId) => {
    setWishlistItems(wishlistItems.filter(item => item.id !== itemId));
  };

  // Function to toggle add category modal
  const toggleAddCategoryModal = () => {
    setIsAddCategoryModalOpen(!isAddCategoryModalOpen);
  };

  // Function to toggle add subcategory modal
  const toggleAddSubcategoryModal = () => {
    setIsAddSubcategoryModalOpen(!isAddSubcategoryModalOpen);
  };

  // Function to toggle add product modal
  const toggleAddProductModal = () => {
    setIsAddProductModalOpen(!isAddProductModalOpen);
  };

  return (
    <div className="relative h-screen flex flex-col b">
      <div className="bg-cyan-200">
        <NavBar 
          onToggleCartOverlay={handleToggleCartOverlay} 
          onToggleWishlistOverlay={handleToggleWishlistOverlay} 
          cartCount={cartItems.length} 
          wishlistCount={wishlistItems.length} 
        />
      </div>
      <div className="flex py-3">
        <div className="w-1/2 flex items-center">
          <BreadCrumbs />
        </div>
        <div className="w-1/2 ">
          <Buttons 
            onAddCategoryClick={toggleAddCategoryModal} // Pass functions to toggle modals as props
            onAddSubcategoryClick={toggleAddSubcategoryModal}
            onAddProductClick={toggleAddProductModal}
          />
        </div>
      </div>
      <div className="flex flex-1">
        <div className="w-3/10 bg-emerald-600">
          <SideBar />
        </div>
        <div className="flex-1 bg-orange-300">
          <Main />
        </div>
      </div>
      {isCartOverlayOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-end">
          <div className="w-3/10 bg-white h-full">
            <button className="p-2" onClick={handleToggleCartOverlay}>Close</button>
            <CartSidebar cartItems={cartItems} onRemoveItem={handleRemoveCartItem} />
          </div>
        </div>
      )}
      {isWishlistOverlayOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-end">
          <div className="w-3/10 bg-white h-full">
            <button className="p-2" onClick={handleToggleWishlistOverlay}>Close</button>
            <WishlistSidebar wishlistItems={wishlistItems} onRemoveItem={handleRemoveWishlistItem} />
          </div>
        </div>
      )}
      {isAddCategoryModalOpen && <AddCategoryModal onClose={toggleAddCategoryModal} />}
      {isAddSubcategoryModalOpen && <AddSubCategoryModal onClose={toggleAddSubcategoryModal} />}
      {isAddProductModalOpen && <AddProductModal onClose={toggleAddProductModal} />}
    </div>
  );
};

export default HomePage;
