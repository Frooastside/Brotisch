import { createSlice } from '@reduxjs/toolkit';

export const socialSlice = createSlice({
  name: 'social',
  initialState: {
    profile: undefined,
  },
  reducers: {
    setProfile: (state, action) => {
      state.profile = action.payload;
    }
  }
});

export const { setProfile } = socialSlice.actions;

export default socialSlice.reducer;