import { createSlice } from '@reduxjs/toolkit';

const storeSlice = createSlice({
  name: 'store',

  initialState: {
    store: {},
    error: false,
    isSubmittingStoreSetup: false,
    isUpdatingPaymentSettings: false,
    isUpdatingFavicon: false,
    isUpdatingStoreSEO: false,
    isUpdatingSelfDeliveryZone: false,
    isUpdatingManageCharges: false,
    isUpdatingStoreTimings: false,
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
    },
    SetIsUpdatingFavicon(state, action) {
      state.isUpadtingFavicon = action.payload.state;
    },
    SetIsUpdatingStoreSEO(state, action) {
      state.isUpdatingStoreSEO = action.payload.state;
    },
    SetIsUpdatingSelfDeliveryZone(state, action){
      state.isUpadtingSelfDeliveryZone = action.payload.state;
    },
    SetIsUpdatingManageCharges(state, action) {
      state.isUpdatingManageCharges = action.payload.state;
    },
    SetIsUpdatingStoreTimings(state, action) {
      state.isUpdatingStoreTimings = action.payload.state;
    } 
  },
});

export const storeActions = storeSlice.actions;
export default storeSlice;