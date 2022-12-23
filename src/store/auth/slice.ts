import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchAuth } from '../API/auth';
import { TAuth } from '../types';
import { TAuthState, TTokens } from './types';

const initialState: TAuthState = {
  tokens: {
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
        state.tokens.accessToken = '';
        state.tokens.refreshToken = '';
      }
    },
    setTokens(state, action: PayloadAction<TTokens>) {
      state.tokens = action.payload;
    },
  },
  extraReducers: {
    [fetchAuth.fulfilled.type]: (state, action: PayloadAction<TAuth>) => {
      state.isLoading = false;
      state.error = '';
      state.tokens = action.payload;
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
