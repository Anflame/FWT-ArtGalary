import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { fetchPaintersAuthorizedPerson } from '../API/painters';
import { TPainterAuthorizedPerson, TPainters } from '../types';

type TPaintersState = {
  paintersList: TPainters[];
  isLoading: boolean;
  error: string;
};

const initialState: TPaintersState = {
  paintersList: [],
  isLoading: false,
  error: '',
};

const PaintersAuthorizedPersonSlice = createSlice({
  name: 'painters/authorizedPerson',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchPaintersAuthorizedPerson.fulfilled.type]: (
      state,
      action: PayloadAction<TPainterAuthorizedPerson>,
    ) => {
      state.isLoading = false;
      state.error = '';
      state.paintersList = action.payload.data;
    },
    [fetchPaintersAuthorizedPerson.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchPaintersAuthorizedPerson.rejected.type]: (
      state,
      action: PayloadAction<string>,
    ) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const PaintersAuthorizedPersonReducer =
  PaintersAuthorizedPersonSlice.reducer;
