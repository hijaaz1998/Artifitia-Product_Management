import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from '../slices/userSlice';
import cartReducer from '../slices/cartSlice';
import wishlistReducer from '../slices/wishlistSlice'

const persistUserConfig = {
    key: 'user',
    storage
};

const persistCartConfig = {
    key: 'cart',
    storage
};

const persistWishlistConfig = {
    key: 'wishlist',
    storage
};

const persistedUserReducer = persistReducer(persistUserConfig, userReducer);
const persistedCartReducer = persistReducer(persistCartConfig, cartReducer);
const persistedWishlistReducer = persistReducer(persistWishlistConfig, wishlistReducer);

export const store = configureStore({
    reducer: {
        user: persistedUserReducer,
        cart: persistedCartReducer,
        wishlist: persistedWishlistReducer
    }
});

export const persistedStore = persistStore(store);
