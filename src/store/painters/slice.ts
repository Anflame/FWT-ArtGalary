import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { fetchPainters } from '../API/painters';
import { TPainters } from '../types';

type PaintersState = {
  painterList: TPainters[];
  error: string;
  isLoading: boolean;
};

const initialState: PaintersState = {
  painterList: [],
  error: '',
  isLoading: false,
};

const themeSlice = createSlice({
  name: 'painters',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchPainters.fulfilled.type]: (
      state,
      action: PayloadAction<TPainters[]>,
    ) => {
      state.isLoading = false;
      state.error = '';
      state.painterList = action.payload;
    },
    [fetchPainters.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchPainters.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const paintersReducer = themeSlice.reducer;
