import { createSlice } from "@reduxjs/toolkit";

export const interfaceSlice = createSlice({
  name: "interface",
  initialState: {
    theme: "dark-theme",
    drawerOpen: false,
    drawerWidth: 240
  },
  reducers: {
    selectTheme: (state, action) => {
      state.theme = action.payload;
    },
    toggleTheme: (state) => {
      state.theme = state.theme === "dark-theme" ? "light-theme" : "dark-theme";
    },

    setDrawerOpen: (state, action) => {
      state.drawerOpen = action.payload;
    },
    toggleDrawer: (state) => {
      state.drawerOpen = !state.drawerOpen;
    },
    setDrawerWidth: (state, action) => {
      state.drawerWidth = action.payload;
    }
  }
});

export const { selectTheme, toggleTheme } = interfaceSlice.actions;
export const { setDrawerOpen, toggleDrawer, setDrawerWidth } =
  interfaceSlice.actions;

export default interfaceSlice.reducer;
