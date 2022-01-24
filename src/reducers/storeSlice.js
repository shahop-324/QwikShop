import { createSlice } from '@reduxjs/toolkit';

const storeSlice = createSlice({
  name: 'store',

  initialState: {
    store: {},
    error: false,
    isSubmittingStoreSetup: false,
  },

  reducers: {
    FetchStore(state, action) {
      state.store = action.payload.store;
    },
    UpdateStore(state, action) {
      state.store = action.payload.store;
    },
    SetIsSubmittingSteup(state, action){
      state.isSubmittingStoreSetup = action.payload.isSubmitting;
    }
  },
});

export const storeActions = storeSlice.actions;
export default storeSlice;