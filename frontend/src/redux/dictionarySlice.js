import { createSlice } from "@reduxjs/toolkit";

export const dictionarySlice = createSlice({
  name: "dictionary",
  initialState: {
    selectedWord: null,
    translation: "",
    translations: {}
  },
  reducers: {
    setSelectedWord: (state, action) => {
      state.selectedWord = action.payload;
    },
    setTranslation: (state, action) => {
      state.translation = action.payload;
    },
    setTranslations: (state, action) => {
      state.translations = action.payload;
    },
    resetEntry: (state) => {
      state.selectedWord = null;
      state.translation = "";
      state.translations = {};
    }
  }
});

export const { setSelectedWord, setTranslation, setTranslations, resetEntry } =
  dictionarySlice.actions;

export default dictionarySlice.reducer;
