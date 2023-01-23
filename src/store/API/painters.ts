import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../../constants';
import $api from '../../http';
import { TPainterAuthorizedPerson, TPainters, TPaintersParams } from '../types';

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

export const fetchPaintersAuthorizedPerson = createAsyncThunk(
  'painters/fetchPaintersauthorizedPerson',
  async (userParams: TPaintersParams, thunkAPI) => {
    const { genres, sorting } = userParams;
    const urlserachparams = new URLSearchParams();
    if (genres.length) urlserachparams.append('genres', genres.toString());
    if (sorting.length) urlserachparams.append('orderBy', sorting.toString());

    try {
      const response = await $api.get<TPainterAuthorizedPerson>('/artists', {
        params: urlserachparams,
      });
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue('Не удалось загрузить художников');
    }
  },
);
