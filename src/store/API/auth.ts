import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { AuthParams } from '../../comon-types';
import { BASE_URL } from '../../constants';
import { TTokens } from '../types';

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
      return response.data;
    } catch (e) {
      return rejectWithValue(`Не удачная авторизация ${e}`);
    }
  },
);
