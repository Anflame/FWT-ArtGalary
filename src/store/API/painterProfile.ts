import { createAsyncThunk } from '@reduxjs/toolkit';

import { TAddPaintingData } from '../../comon-types';
import $api from '../../http';
import {
  PaintersParams,
  TAddPainting,
  TPainterProfile,
  TResponseError,
} from '../types';

export const fetchPainterProfle = createAsyncThunk(
  'painters/fetchPainterProfile',
  async (params: PaintersParams, thunkAPI) => {
    const { url } = params;
    try {
      const response = await $api.get<TPainterProfile[]>(
        `/artists/${url || ''}`,
      );
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue('Не удалось загрузить художника');
    }
  },
);

export const fetchAddPainting = createAsyncThunk(
  'painters/fetchAddPainting',
  async (params: TAddPaintingData, thunkAPI) => {
    try {
      const { id, formData } = params;
      const response = await $api.post<TAddPainting[]>(
        `/artists/${id}/paintings`,
        formData,
      );
      return response.data;
    } catch (e) {
      const error = e as TResponseError;
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
);

export const fetchDeletePainter = createAsyncThunk(
  'painter/delete',
  async (id: string | undefined, thunkAPI) => {
    try {
      const response = await $api.delete<TAddPainting[]>(`/artists/${id}`, {
        params: {
          id,
        },
      });
      return response.data;
    } catch (e) {
      const error = e as TResponseError;
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
);
