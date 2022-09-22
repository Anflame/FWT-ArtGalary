import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { paintersReducer } from './painters/slice';
import { themeReducer } from './theme/slice';

const rootReducer = combineReducers({
  theme: themeReducer,
  painters: paintersReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
