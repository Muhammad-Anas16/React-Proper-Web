import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  customProducts: [],
};

const customProductsSlice = createSlice({
  name: "customProducts",
  initialState,
  reducers: {
    setCustomProducts: (state, action) => {
      state.customProducts = action.payload;
    },
  },
});

export const { setCustomProducts } = customProductsSlice.actions;
export default customProductsSlice.reducer;
