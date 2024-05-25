import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    wishlist: []
}

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        addWishlist: (state, action) => {
            state.wishlist = [...state.wishlist, action.payload]; // Creating a new array instead of mutating the existing one
        },
        removeWishlist: (state, action) => {
            state.wishlist = state.wishlist.filter(item => item.id !== action.payload.id);
        },
        clearWishlist: (state) => {
            state.wishlist = [];
        }
    }
})

export const { addWishlist, removeWishlist, clearWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;
