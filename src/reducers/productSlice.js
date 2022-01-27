import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'product',

  initialState: {
    products: [],
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
    CreateProduct(state, action) {
      state.products.push(action.payload.product);
    },
    UpdateProduct(state, action) {
      state.products = state.products.map((el) =>
        el._id !== action.payload.product._id ? el : action.payload.product
      );
    },
    FetchProducts(state, action) {
      state.products = action.payload.products;
    },
    DeleteProduct(state, action) {
      state.products = state.products.filter((el) => el._id !== action.payload.productId);
    },
    DeleteMultipleProduct(state, action) {
        state.products = state.products.filter((el) => !action.payload.ids.includes(el._id));
    }
  },
});

export const productActions = productSlice.actions;
export default productSlice;
