import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',

  initialState: {
    isSignedIn: false,
    isSubmittingRegister: false,
    isSubmittingLogin: false,
    isSubmittingVerify: false,
    token: null,
    error: false,
  },

  reducers: {
    SignIn(state, action) {
      state.token = action.payload.token;
      state.isSignedIn = true;
    },
    SignOut(state) {
      console.log("Sign out was triggered");
      state.token = null;
      state.isSignedIn = false;
    },
    SetIsSubmittingRegister(state, action) {
      state.isSubmittingRegister = action.payload.isSubmitting;
    },
    SetIsSubmittingLogin(state, action){
      state.isSubmittingLogin = action.payload.isSubmitting;
    },
    SetIsSubmittingVerify(state, action) {
      state.isSubmittingVerify = action.payload.isSubmitting;
    }
  },
});

export const authActions = authSlice.actions;
export default authSlice;
