import { createSlice } from '@reduxjs/toolkit';

//contains general app state info (user)

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    user: null,
    selectedImage: null
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
    selectImage: (state, action) => {
      state.selectedImage = action.payload;
    },
    resetImage: (state) => {
      state.selectedImage = null;
    }
  },
});

export const { login, logout, selectImage, resetImage } = appSlice.actions;

// holds the user that is logged in, altered by login function
export const selectUser = (state) => state.app.user;

export const selectSelectedImage = (state) => state.app.selectedImage;

export default appSlice.reducer;
