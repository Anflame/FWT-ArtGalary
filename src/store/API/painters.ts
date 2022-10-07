import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { TPainters } from '../../comon-types';

export const fetchPainters = createAsyncThunk(
  'painters/fetchPainter',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get<TPainters[]>(
        'https://internship-front.framework.team/artists/static',
      );
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue('Не удалось загрузить пользователей');
    }
  },
);
