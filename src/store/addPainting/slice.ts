import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { fetchAddPainting } from '../API/painterProfile';

import type { TAddPainting } from '../types';

type PainterProfileState = {
  painting: TAddPainting;
  isLoading: boolean;
  error: string;
};

const initialState: PainterProfileState = {
  painting: {
    _id: '',
    name: '',
    yearOfCreation: '',
    image: {
      _id: '',
      src: '',
      webp: '',
      src2x: '',
      webp2x: '',
      original: '',
    },
  },
  isLoading: false,
  error: '',
};

const addPainting = createSlice({
  name: 'addPainting',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchAddPainting.fulfilled.type]: (
      state,
      action: PayloadAction<TAddPainting>,
    ) => {
      state.isLoading = false;
      state.error = '';
      state.painting = action.payload;
    },
    [fetchAddPainting.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchAddPainting.rejected.type]: (
      state,
      action: PayloadAction<string>,
    ) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const addPaintingReducer = addPainting.reducer;
