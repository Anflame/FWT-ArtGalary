import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

import { BASE_URL } from '../../constants';

import { AuthParams } from '../../comon-types';
import type { TResponseError, TTokens } from '../types';

export const fetchAuth = createAsyncThunk(
  'auth/fetchAuth',
  async (params: AuthParams, { rejectWithValue }) => {
    const {
      type,
      auth: { username, password, fingerprint },
    } = params;
    try {
      const response = await axios.post<TTokens>(`${BASE_URL}/auth/${type}`, {
        username,
        password,
        fingerprint,
      });
      Cookies.set('token', JSON.stringify(response.data));
      return response.data;
    } catch (e) {
      const error = e as TResponseError;
      return rejectWithValue(error.response.data.message);
    }
  },
);
