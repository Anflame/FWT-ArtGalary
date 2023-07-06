import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
      }
    },
    setTokens(state, action: PayloadAction<TTokens>) {
      state.token = action.payload;
    },
    clearAuthError(state) {
      state.error = '';
    },
  },
  extraReducers: {
    [fetchAuth.fulfilled.type]: (state, action: PayloadAction<TTokens>) => {
      state.isLoading = false;
      state.error = '';
      state.token = action.payload;
      if (action.payload.accessToken && action.payload.refreshToken)
        state.isAuth = true;
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

export const { changeAuth, setTokens, clearAuthError } = authSlice.actions;
export const authReducer = authSlice.reducer;
