import React, { FC } from 'react';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { setupStore } from '../../store';
import { AppRouter } from '../AppRouter/AppRouter';

const store = setupStore();

export const App: FC = () => (
  <Provider store={store}>
    <HashRouter>
      <AppRouter />
    </HashRouter>
  </Provider>
);
