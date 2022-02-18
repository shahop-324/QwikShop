import { createSlice } from '@reduxjs/toolkit';

const referralSlice = createSlice({
  name: 'referral',

  initialState: {
    referrals: [],
    purchases: [],
    isCreating: false,
    isUpdating: false,
    isDeleting: false,
  },

  reducers: {
    SetIsCreating(state, action) {
      state.isCreating = action.payload.state;
    },
    SetIsUpdating(state, action) {
      state.isUpdating = action.payload.state;
    },
    SetIsDeleting(state, action) {
      state.isDeleting = action.payload.state;
    },
    CreateReferral(state, action) {
      state.referrals.push(action.payload.referral);
    },
    UpdateReferral(state, action) {
      state.referrals = state.referrals.map((el) =>
        el._id !== action.payload.referral._id ? el : action.payload.referral
      );
    },
    FetchReferrals(state, action) {
      state.referrals = action.payload.referrals;
    },
    FetchReferralPurchases(state, action) {
      state.purchases = action.payload.purchases;
    },
    UpdatePurchase(state, action) {
      state.purchases = state.purchases.map((el) => (el._id !== action.payload.purchase._id ? el : action.payload.purchase));
    },
    DeleteReferral(state, action) {
      state.referrals = state.referrals.filter((el) => el._id !== action.payload.referralId);
    },
    DeleteMultipleReferral(state, action) {
      state.referrals = state.referrals.filter((el) => !action.payload.ids.includes(el._id));
    },
  },
});

export const referralActions = referralSlice.actions;
export default referralSlice;
