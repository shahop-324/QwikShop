import { createSlice } from '@reduxjs/toolkit';

const transactionSlice = createSlice({
  name: 'transaction',

  initialState: {
    transactions: [],
  },

  reducers: {
    FetchTransactions(state, action) {
      state.transactions = action.payload.transactions;
    },
  },
});

export const transactionActions = transactionSlice.actions;
export default transactionSlice;
