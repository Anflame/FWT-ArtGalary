import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { addPaintingReducer } from './addPainting/slice';
import { authReducer } from './auth/slice';
import { genresReducer } from './genres/slice';
import { painterProfileReducer } from './painterProfile/slice';
import { paintersReducer } from './painters/slice';
import { PaintersAuthorizedPersonReducer } from './paintersAuthorizedPerson/slice';

export const rootReducer = combineReducers({
  painters: paintersReducer,
  paintersAuthorizedPerson: PaintersAuthorizedPersonReducer,
  auth: authReducer,
  painterProfile: painterProfileReducer,
  addPaintng: addPaintingReducer,
  genresState: genresReducer,
});

export const setupStore = () =>
  configureStore({
    reducer: rootReducer,
  });
