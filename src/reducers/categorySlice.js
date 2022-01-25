import { createSlice } from '@reduxjs/toolkit';

const categorySlice = createSlice({
  name: 'category',

  initialState: {
    categories: [],
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
    CreateCategory(state, action) {
      state.categories.push(action.payload.category);
    },
    UpdateCategory(state, action) {
      state.categories = state.categories.map((el) =>
        el._id !== action.payload.category._id ? el : action.payload.category
      );
    },
    FetchCategories(state, action) {
      state.categories = action.payload.categories;
    },
    DeleteCategory(state, action) {
      state.categories = state.categories.filter((el) => el._id !== action.payload.categoryId);
    }
  },
});

export const categoryActions = categorySlice.actions;
export default categorySlice;
