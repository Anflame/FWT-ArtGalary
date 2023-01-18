import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { AuthParams } from '../../comon-types';
import { API } from '../../constants';
import { TAuth } from '../types';

export const fetchAuth = createAsyncThunk(
  'auth/fetchAuth',
  async (params: AuthParams, { rejectWithValue }) => {
    const {
      type,
      auth: { username, password, fingerprint },
    } = params;
    try {
      const response = await axios.post<TAuth>(`${API}/auth/${type}`, {
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
