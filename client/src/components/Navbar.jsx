import React, { useState } from 'react';
import { FaHeart, FaShoppingCart, FaSignOutAlt } from 'react-icons/fa';
import LogoImage from '/Business Management Daily.jpeg'; 
import { logout } from '../slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axiosInstance from '../axionEndPoint/axiosEndPoint';

const NavBar = ({ onToggleCartOverlay, onToggleWishlistOverlay, wishlistCount, product, setProducts }) => {

  const userId = localStorage.getItem('userId')
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [search, setSearch] = useState('')

  const cart = useSelector((state) => state.cart.cart);
  const cartItemCount = cart.reduce((count, item) => count + item.qty, 0);

  const wishlist = useSelector((state) => state.wishlist.wishlist)
  const wishlistItems = wishlist.length;
  console.log("----------",wishlistItems)

  const handleSearch = async () => {
    try {
      const response = await axiosInstance.get(`/product/searchItems?text=${search}&userId=${userId}`);
      if(response.data.success){
        navigate('/home')
        setProducts(response.data.results)
        console.log("results",response.data.results)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const logoutHandler = () => {
    dispatch(logout());
    navigate('/')
  }
  
  return (
    <div className="p-4 flex justify-between items-center bg-sky-950">
      <div className="flex items-center">
        <Link to={'/home'}>
          <img src={LogoImage} alt="Logo" className="h-10 w-auto mr-4 rounded-xl" />
        </Link>
      </div>

      <div className="flex items-center bg-green-300 rounded-2xl w-96">
        <input 
          type="text" 
          placeholder="Search..." 
          className="p-2 rounded-l-2xl w-full focus:outline-none"
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="p-2 bg-amber-500 text-white rounded-r-2xl px-6" onClick={handleSearch}>
          Search
        </button>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative">
          <button onClick={onToggleWishlistOverlay} className="p-2 text-amber-500 hover:text-white border-blue-500">
            <FaHeart size={24} className="bg-transparent" />
          </button>
          {wishlistCount > 0 && (
            <span className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full px-1">
              {wishlistCount}
            </span>
          )}
        </div>
        <div className="relative">
          <button onClick={
            onToggleCartOverlay
            } className="p-2 text-amber-500 hover:text-white border-blue-500">
            <FaShoppingCart size={24} className="bg-transparent" />
          </button>
          {cartItemCount > 0 && (
            <span className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full px-1">
              {cartItemCount}
            </span>
          )}
        </div>
        <button className="p-2 text-amber-500 hover:text-white border-blue-500">
          <FaSignOutAlt size={24} className="bg-transparent" onClick={logoutHandler} />
        </button>
      </div>
    </div>
  );
};

export default NavBar;
