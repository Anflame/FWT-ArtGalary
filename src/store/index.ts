import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { authReducer } from './auth/slice';
import { painterProfileReducer } from './painterProfile/slice';
import { paintersReducer } from './painters/slice';

export const rootReducer = combineReducers({
  painters: paintersReducer,
  auth: authReducer,
  painterProfile: painterProfileReducer,
});

export const setupStore = () =>
  configureStore({
    reducer: rootReducer,
  });
