import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchPainterProfle } from '../API/painterProfile';
import { TPainterProfile } from '../types';

type PainterProfileState = {
  painterProfile: TPainterProfile;
  isLoading: boolean;
  error: string;
};

const initialState: PainterProfileState = {
  painterProfile: {
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
  reducers: {},
  extraReducers: {
    [fetchPainterProfle.fulfilled.type]: (
      state,
      action: PayloadAction<TPainterProfile>,
    ) => {
      state.isLoading = false;
      state.error = '';
      state.painterProfile = action.payload;
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
  },
});

export const painterProfileReducer = painterProfileSlice.reducer;
