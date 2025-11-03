import { store } from '../redux/store';
import { Action, ThunkAction } from '@reduxjs/toolkit';

export interface ProductItem {
  id: string;
  imgUrl: string;
  name: string;
  liked: boolean;
}

export interface ProductListState {
  items: ProductItem[];
  filterStatus: boolean;
}

export interface RootState {
  productList: ProductListState;
}

export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;