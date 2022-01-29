import { createSlice } from '@reduxjs/toolkit';

const storeSlice = createSlice({
  name: 'store',

  initialState: {
    store: {},
    error: false,
    isSubmittingStoreSetup: false,
    isUpdatingPaymentSettings: false,
  },

  reducers: {
    FetchStore(state, action) {
      state.store = action.payload.store;
    },
    UpdateStore(state, action) {
      state.store = action.payload.store;
    },
    SetIsUpdatingPaymentSettings(state, action){
      state.isUpdatingPaymentSettings = action.payload.state;
    },
    SetIsSubmittingSteup(state, action){
      state.isSubmittingStoreSetup = action.payload.isSubmitting;
    }
  },
});

export const storeActions = storeSlice.actions;
export default storeSlice;