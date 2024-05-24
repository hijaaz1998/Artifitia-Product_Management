import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import NavBar from '../components/Navbar';
import BreadCrumbs from '../components/BreadCrumbs';
import Buttons from '../components/Buttons';
import SideBar from '../components/SideBar';
import Main from '../components/Main';
import CartSidebar from '../components/CartSidebar';
import WishlistSidebar from '../components/WishlistSidebar';
import AddCategoryModal from '../components/modal/AddCategoryModal';
import AddSubCategoryModal from '../components/modal/AddSubCategoryModal';
import AddProductModal from '../components/AddProductModal';

const HomePage = () => {

  const [isCartOverlayOpen, setIsCartOverlayOpen] = useState(false);
  const [isWishlistOverlayOpen, setIsWishlistOverlayOpen] = useState(false);
  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);
  const [isAddSubcategoryModalOpen, setIsAddSubcategoryModalOpen] = useState(false);
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

  const toggleAddCategoryModal = () => {
    setIsAddCategoryModalOpen(!isAddCategoryModalOpen);
  };

  const toggleAddSubcategoryModal = () => {
    setIsAddSubcategoryModalOpen(!isAddSubcategoryModalOpen);
  };

  const toggleAddProductModal = () => {
    setIsAddProductModalOpen(!isAddProductModalOpen);
  };

  return (
    <div className="relative h-screen flex flex-col">
      <div className="bg-cyan-200 w-full fixed z-10">
        <NavBar 
          onToggleCartOverlay={handleToggleCartOverlay} 
          onToggleWishlistOverlay={handleToggleWishlistOverlay} 
          cartCount={cartItems.length} 
          wishlistCount={wishlistItems.length} 
        />
      </div>
      <div className="flex py-3 w-full fixed top-[70px] z-10 bg-purple-300">
        <div className="w-1/2 flex items-center">
          <BreadCrumbs />
        </div>
        <div className="w-1/2">
          <Buttons 
            onAddCategoryClick={toggleAddCategoryModal} 
            onAddSubcategoryClick={toggleAddSubcategoryModal}
            onAddProductClick={toggleAddProductModal}
          />
        </div>

      </div>
      <div className="bg-violet-800 mt-36 grid grid-cols-10 h-full">
        <div className="bg-yellow-200 col-span-2 flex flex-col">
          <div className="w-72 fixed h-full">
            <SideBar />
          </div>
        </div>
        <div className="bg-orange-300 col-span-8 flex flex-col">
          <div className="flex-grow">
            <Main />
          </div>
        </div>
      </div>


      {isCartOverlayOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-end z-20">
          <div className="w-3/10 bg-white h-full">
            <button className="p-2" onClick={handleToggleCartOverlay}>Close</button>
            <CartSidebar cartItems={cartItems} onRemoveItem={handleRemoveCartItem} close={handleToggleCartOverlay} />
          </div>
        </div>
      )}
      {isWishlistOverlayOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-end z-20">
          <div className="w-3/10 bg-white h-full">
            <button className="p-2" onClick={handleToggleWishlistOverlay}>Close</button>
            <WishlistSidebar wishlistItems={wishlistItems} onRemoveItem={handleRemoveWishlistItem} close={handleToggleWishlistOverlay} />
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
