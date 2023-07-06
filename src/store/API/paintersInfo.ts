import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { BASE_URL } from '../../constants';

import type { TGenre, TResponseError } from '../types';

export const fetchGenres = createAsyncThunk(
  'paintersInfo/fetchGenres',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get<TGenre[]>(`${BASE_URL}/genres/static`);
      return response.data;
    } catch (e) {
      const error = e as TResponseError;
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
);
