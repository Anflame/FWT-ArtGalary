import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

import { BASE_URL } from '../../constants';

import $api from '../../http';
import {
  TPainterAuthorizedPerson,
  TPainters,
  TPaintersParams,
  TResponseError,
} from '../types';

export const fetchPainters = createAsyncThunk(
  'painters/fetchPainters',
  async (perPage: number, thunkAPI) => {
    try {
      const response = await axios.get<TPainters[]>(
        `${BASE_URL}/artists/static`,
        {
          params: {
            perPage,
            pageNumber: 1,
          },
        },
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
    try {
      if (!Cookies.get('token')) throw new Error('Пожалуйста авторизуйтесь');

      const { name, genres, sorting, perPage } = userParams;
      const response = await $api.get<TPainterAuthorizedPerson>('/artists', {
        params: {
          name,
          sortBy: sorting?.length && 'name',
          orderBy: sorting?.toString(),
          genres,
          perPage,
          pageNumber: 1,
        },
      });
      return response.data;
    } catch (e) {
      const error = e as Error;
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const fetchAddPainter = createAsyncThunk(
  'painters/add',
  async (formData: FormData, thunkAPI) => {
    try {
      const response = await $api.post('/artists', formData);
      return response.data;
    } catch (e) {
      const error = e as TResponseError;
      return thunkAPI.rejectWithValue(error.response?.data.message);
    }
  },
);
