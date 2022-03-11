import { createSlice } from '@reduxjs/toolkit';

export const interfaceSlice = createSlice({
  name: 'interface',
  initialState: {
    theme: 'dark-theme'
  },
  reducers: {
    selectTheme: (state, action) => {
      state.theme = action.payload;
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'dark-theme' ? 'light-theme' : 'dark-theme';
    }
  }
});

export const { selectTheme, toggleTheme } = interfaceSlice.actions;

export default interfaceSlice.reducer;