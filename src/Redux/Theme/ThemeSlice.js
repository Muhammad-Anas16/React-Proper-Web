import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  mode: 'light',
}

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode == 'light' ? 'dark' : 'light'
    },
    setTheme: (state, action) => {
      state.value + action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { toggleTheme, setTheme } = themeSlice.actions

export default themeSlice.reducer