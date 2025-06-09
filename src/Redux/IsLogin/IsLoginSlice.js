import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  IsLogin: false,
  // IsLogin
};

const IsLoginSlice = createSlice({
  name: "IsLogin",
  initialState,
  reducers: {
    setIsLogin: (state, action) => {
      state.IsLogin = action.payload;
    },
  },
});

export const { setIsLogin } = IsLoginSlice.actions;

export default IsLoginSlice.reducer;
