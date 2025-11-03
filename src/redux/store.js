import { configureStore } from '@reduxjs/toolkit';
import productListReducer from './slices/productListSlice';

export const store = configureStore({
  reducer: {
    productList: productListReducer
  }
})