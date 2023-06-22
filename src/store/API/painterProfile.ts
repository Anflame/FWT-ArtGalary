import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import $api from '../../http';
import {
  PaintersParams,
  TAddPainting,
  TAddPaintingParams,
  TPainterProfile,
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
  async (params: TAddPaintingParams, thunkAPI) => {
    const { id, accessToken, imageInfo } = params;
    try {
      const formData = new FormData();
      formData.append('file', imageInfo.image);
      const response = await axios.post<TAddPainting[]>(
        `https://internship-front.framework.team/artists/${id}/paintings`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          data: {
            name: 'Moonlight',
            yearOfCreation: '1234',
            image: {
              size: 0,
              buffer: {},
              encoding: 'string',
              mimetype: 'string',
              fieldname: 'string',
              originalname: 'string',
            },
          },
        },
      );
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue('Не удалось добвить Картину');
    }
  },
);
