import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from '../slices/userSlice';

const persistUserConfig = {
    key: 'user',
    storage
} 

const persistedUserReducer = persistReducer(persistUserConfig, userReducer);

export const store = configureStore({
    reducer: {
        user: persistedUserReducer
    }
})

export const persistedStore = persistStore(store)