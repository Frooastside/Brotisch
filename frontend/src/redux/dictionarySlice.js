import { createSlice } from "@reduxjs/toolkit";

export const dictionarySlice = createSlice({
  name: "dictionary",
  initialState: {
    selectedWord: null
  },
  reducers: {
    setSelectedWord: (state, action) => {
      state.selectedWord = action.payload;
    },
    resetEntry: (state) => {
      state.selectedWord = null;
    }
  }
});

export const { setSelectedWord, resetEntry } = dictionarySlice.actions;

export default dictionarySlice.reducer;
