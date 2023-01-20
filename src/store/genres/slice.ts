import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchGenres } from '../API/paintersInfo';
import { TGenre, TGenresState } from '../types';

const initialState: TGenresState = {
  isLoading: false,
  error: '',
  genres: [],
};

const GenresSlice = createSlice({
  name: 'genres',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchGenres.fulfilled.type]: (state, action: PayloadAction<TGenre[]>) => {
      state.isLoading = false;
      state.error = '';
      state.genres = action.payload;
    },
    [fetchGenres.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchGenres.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const genresReducer = GenresSlice.reducer;
