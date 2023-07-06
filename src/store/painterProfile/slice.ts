import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { fetchAddPainting, fetchPainterProfle } from '../API/painterProfile';

import { Paintings, TPainterProfile } from '../types';

type PainterProfileState = {
  painterProfileInfo: TPainterProfile;
  isLoading: boolean;
  error: string;
};

const initialState: PainterProfileState = {
  painterProfileInfo: {
    paintings: [],
    genres: [],
    _id: '',
    name: '',
    description: '',
    yearsOfLife: '',
    avatar: {
      _id: '',
      src: '',
      webp: '',
      src2x: '',
      webp2x: '',
      original: '',
    },
    __v: 0,
    mainPainting: {
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
      artist: '',
    },
  },
  isLoading: false,
  error: '',
};

const painterProfileSlice = createSlice({
  name: 'painterProfile',
  initialState,
  reducers: {
    clearPainterProfileError(state) {
      state.error = '';
    },
  },
  extraReducers: {
    [fetchPainterProfle.fulfilled.type]: (
      state,
      action: PayloadAction<TPainterProfile>,
    ) => {
      state.isLoading = false;
      state.error = '';
      state.painterProfileInfo = action.payload;
    },
    [fetchPainterProfle.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchPainterProfle.rejected.type]: (
      state,
      action: PayloadAction<string>,
    ) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    [fetchAddPainting.fulfilled.type]: (
      state,
      action: PayloadAction<Paintings>,
    ) => {
      state.isLoading = false;
      state.error = '';
      state.painterProfileInfo.paintings.push(action.payload);
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

export const { clearPainterProfileError } = painterProfileSlice.actions;
export const painterProfileReducer = painterProfileSlice.reducer;
