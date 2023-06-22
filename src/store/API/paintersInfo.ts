import { createAsyncThunk } from '@reduxjs/toolkit';

import $api from '../../http';
import { TGenre } from '../types';

export const fetchGenres = createAsyncThunk(
  'paintersInfo/fetchGenres',
  async (_, thunkAPI) => {
    try {
      const response = await $api.get<TGenre[]>('/genres/static');
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue('Не удалось загрузить жанры');
    }
  },
);
