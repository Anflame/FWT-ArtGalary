import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { fetchDeletePainter } from '../API/painterProfile';

import {
  fetchAddPainter,
  fetchPainters,
  fetchPaintersAuthorizedPerson,
} from '../API/painters';
import { TAddPainter, TPainterAuthorizedPerson, TPainters } from '../types';

type PaintersState = {
  painterList: TPainters[];
  meta: {
    count: number;
    perPage: number;
    pageNumber: number;
  };
  error: string;
  isLoading: boolean;
};

const initialState: PaintersState = {
  painterList: [],
  meta: {
    count: 0,
    perPage: 0,
    pageNumber: 0,
  },
  error: '',
  isLoading: false,
};

const paintersSlice = createSlice({
  name: 'painters',
  initialState,
  reducers: {
    clearPaintersError(state) {
      state.error = '';
    },
  },
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

    [fetchPaintersAuthorizedPerson.fulfilled.type]: (
      state,
      action: PayloadAction<TPainterAuthorizedPerson>,
    ) => {
      state.isLoading = false;
      state.error = '';
      state.painterList = action.payload.data;
      state.meta = action.payload.meta;
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

    [fetchAddPainter.fulfilled.type]: (
      state,
      action: PayloadAction<TAddPainter>,
    ) => {
      state.isLoading = false;
      state.error = '';
      state.painterList.push(action.payload.data);
    },
    [fetchAddPainter.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchAddPainter.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    [fetchDeletePainter.fulfilled.type]: (state) => {
      state.isLoading = false;
      state.error = '';
    },
    [fetchDeletePainter.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchDeletePainter.rejected.type]: (
      state,
      action: PayloadAction<string>,
    ) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { clearPaintersError } = paintersSlice.actions;
export const paintersReducer = paintersSlice.reducer;
