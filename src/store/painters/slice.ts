import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchPainters } from '../API/painters';
import { TPainters } from '../types';

type PaintersState = {
  painters: TPainters[];
  error: string;
  isLoading: boolean;
};

const initialState: PaintersState = {
  painters: [],
  error: '',
  isLoading: false,
};

const themeSlice = createSlice({
  name: 'slice',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchPainters.fulfilled.type]: (
      state,
      action: PayloadAction<TPainters[]>,
    ) => {
      state.isLoading = false;
      state.error = '';
      state.painters = action.payload;
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
