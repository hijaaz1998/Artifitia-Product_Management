import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    wishlist: []
}

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        addItem: (state, action) => {
            state.cart.push(action.payload);
        },
        removeItem: (state, action) => {
            state.cart = state.cart.filter(item => item.id !== action.payload.id);
        }
    }
})

export const { addItem, removeItem } = wishlistSlice.actions;

export default wishlistSlice.reducer;
