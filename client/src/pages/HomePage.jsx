import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import axiosInstance from '../axionEndPoint/axiosEndPoint';
import toast from 'react-hot-toast';
import { addItem, clearCart } from '../slices/cartSlice'; 

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState([]);
  const dispatch = useDispatch();

  const userId = localStorage.getItem('userId');
  const wishlist = useSelector((state) => state.wishlist.wishlist)
  const cart = useSelector((state) => state.cart.cart);

  const [isCartOverlayOpen, setIsCartOverlayOpen] = useState(false);
  const [isWishlistOverlayOpen, setIsWishlistOverlayOpen] = useState(false);
  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);
  const [isAddSubcategoryModalOpen, setIsAddSubcategoryModalOpen] = useState(false);
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [wishlistItems, setWishlistItems] = useState(wishlist);

  useEffect(() => {
    const fetchFilteredProducts = async () => {
      try {
        const response = await axiosInstance.get('/product/filter', {
          params: { filter },
        });
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching filtered products:', error);
      }
    };

    fetchFilteredProducts();
  }, [filter]);

  const handleToggleCartOverlay = () => {
    setIsCartOverlayOpen(!isCartOverlayOpen);
  };

  const handleToggleWishlistOverlay = () => {
    setIsWishlistOverlayOpen(!isWishlistOverlayOpen);
  };

  const handleRemoveCartItem = async (itemId) => {
    try {
      const response = await axiosInstance.delete(`/product/removeFromCart?userId=${userId}&productId=${itemId}`)
      if(response.data.success){
        toast.success(response.data.message)
        response.data.newCart.array.forEach(element => {
          dispatch(addItem(element))
        });
      }
    } catch (error) {
      if(error.response && error.response.data){
        toast.error(error.response.data.message)
      } else {
        console.log(error)
      }
    }
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
    <div className="relative h-screen flex flex-col z-50">
      <div className="bg-cyan-200 w-full fixed z-10">
        <NavBar
          onToggleCartOverlay={handleToggleCartOverlay}
          onToggleWishlistOverlay={handleToggleWishlistOverlay}
          cartCount={cart.length}
          wishlistCount={wishlist.length}
          products={products}
          setProducts={setProducts}
        />
      </div>
      <div className="sticky top-16 z-10 flex w-full bg-white py-3 shadow">
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
      <div className=" mt-16 grid grid-cols-10 h-full">
        <div className="col-span-2 flex flex-col">
          <div className="w-72 fixed h-full">
            <SideBar setFilter={setFilter} setProducts={setProducts} />
          </div>
        </div>
        <div className=" col-span-8 flex flex-col">
          <div className="flex-grow">
            <Main
              products={products}
              setProducts={setProducts}
              onToggleCartOverlay={handleToggleCartOverlay}
              onToggleWishlistOverlay={handleToggleWishlistOverlay}
            />
          </div>
        </div>
      </div>

      {isCartOverlayOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-end z-20">
          <div className="w-3/10 bg-white h-full">
            <button className="p-2" onClick={handleToggleCartOverlay}>Close</button>
            <CartSidebar onRemoveItem={handleRemoveCartItem} close={handleToggleCartOverlay} />
          </div>
        </div>
      )}
      {isWishlistOverlayOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-end z-20">
          <div className="w-3/10 bg-white h-full">
            <button className="p-2" onClick={handleToggleWishlistOverlay}>Close</button>
            <WishlistSidebar  onRemoveItem={handleRemoveWishlistItem} close={handleToggleWishlistOverlay} />
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
