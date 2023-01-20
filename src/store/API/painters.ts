import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../../constants';
import { TPainters } from '../types';

export const fetchPainters = createAsyncThunk(
  'painters/fetchPainters',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get<TPainters[]>(
        `${BASE_URL}/artists/static`,
      );
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue('Не удалось загрузить художников');
    }
  },
);
