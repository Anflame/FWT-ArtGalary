import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

import { fetchAuth } from '../API/auth';
import { TTokens } from '../types';
import { TAuthState } from './types';

const initialState: TAuthState = {
  token: {
    accessToken: '',
    refreshToken: '',
  },
  isLoading: false,
  error: '',
  isAuth: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    changeAuth(state, action: PayloadAction<boolean>) {
      state.isAuth = action.payload;
      if (action.payload === false) {
        state.token.accessToken = ' ';
        state.token.refreshToken = ' ';
        Cookies.remove('token');
      }
    },
    setTokens(state, action: PayloadAction<TTokens>) {
      state.token = action.payload;
    },
  },
  extraReducers: {
    [fetchAuth.fulfilled.type]: (state, action: PayloadAction<TTokens>) => {
      state.isLoading = false;
      state.error = '';
      state.token = action.payload;
      Cookies.set('token', JSON.stringify(action.payload));
    },
    [fetchAuth.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchAuth.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { changeAuth, setTokens } = authSlice.actions;
export const authReducer = authSlice.reducer;
