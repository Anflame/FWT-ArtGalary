import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { authReducer } from './auth/slice';
import { painterProfileReducer } from './painterProfile/slice.';
import { paintersReducer } from './painters/slice';

const rootReducer = combineReducers({
  painters: paintersReducer,
  auth: authReducer,
  painterProfile: painterProfileReducer,
});

export const setupStore = () =>
  configureStore({
    reducer: rootReducer,
  });

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
