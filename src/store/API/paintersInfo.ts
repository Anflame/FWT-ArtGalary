import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API } from '../../constants';
import { TGenre } from '../types';

export const fetchGenres = createAsyncThunk(
  'paintersInfo/fetchGenres',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get<TGenre[]>(`${API}/genres/static`);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue('Не удалось загрузить жанры');
    }
  },
);
