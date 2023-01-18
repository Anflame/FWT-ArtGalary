import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API } from '../../constants';
import { TPainters } from '../types';

export const fetchPainters = createAsyncThunk(
  'painters/fetchPainters',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get<TPainters[]>(`${API}/artists/static`);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue('Не удалось загрузить художников');
    }
  },
);
