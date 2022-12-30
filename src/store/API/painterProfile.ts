import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { PaintersParams, TPainterProfile } from '../types';

export const fetchPainterProfle = createAsyncThunk(
  'painters/fetchPainterProfile',
  async (params: PaintersParams, thunkAPI) => {
    const { url, accessToken } = params;
    try {
      const response = await axios.get<TPainterProfile[]>(
        `https://internship-front.framework.team/artists/${url || ''}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue('Не удалось загрузить художника');
    }
  },
);

export const fetchAddPainting = createAsyncThunk(
  'painters/fetchAddPainting',
  async (params: PaintersParams, thunkAPI) => {
    const { url, accessToken } = params;
    try {
      const response = await axios.get<TPainterProfile[]>(
        `https://internship-front.framework.team/artists/${url || ''}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue('Не удалось загрузить художника');
    }
  },
);
