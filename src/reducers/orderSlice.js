import { createSlice } from '@reduxjs/toolkit';

const orderSlice = createSlice({
  name: 'order',

  initialState: {
    orders: [],
    recentOrders: [],
    error: false,
  },

  reducers: {
    FetchOrders(state, action) {
      state.orders = action.payload.orders;
    },
    FetchRecentOrders(state, action) {
      state.recentOrders = action.payload.recentOrders;
    },
  },
});

export const orderActions = orderSlice.actions;
export default orderSlice;
