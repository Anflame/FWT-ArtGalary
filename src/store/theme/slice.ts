import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ThemeState = {
  theme: string;
};

const initialState: ThemeState = {
  theme: 'dark',
};

const themeSlice = createSlice({
  name: 'slice',
  initialState,
  reducers: {
    toggleTheme(state, action: PayloadAction<string>) {
      state.theme = action.payload;
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export const themeReducer = themeSlice.reducer;
