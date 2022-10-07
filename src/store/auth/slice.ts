import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchAuth } from '../API/auth';
import { TAuth } from '../types';

type AuthState = {
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
  isLoading: boolean;
  error: string;
  isAuth: boolean;
};

const initialState: AuthState = {
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

export const { changeAuth } = authSlice.actions;
export const authReducer = authSlice.reducer;
