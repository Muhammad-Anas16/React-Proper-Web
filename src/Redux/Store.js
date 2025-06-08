import { configureStore } from '@reduxjs/toolkit'
import productsReducer from './product/ProductSlice';
import themeReducer from './Theme/ThemeSlice'

export const store = configureStore({
    reducer: {
        products: productsReducer,
        theme: themeReducer, 
    },
})