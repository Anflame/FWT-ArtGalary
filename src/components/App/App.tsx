import React, { FC, Suspense } from 'react';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { setupStore } from '../../store';
import Preloader from '../../ui/Preloader';
import { AppRouter } from '../AppRouter/AppRouter';

const store = setupStore();

export const App: FC = () => (
  <Provider store={store}>
    <Suspense fallback={<Preloader className="firstLoading" />}>
      <HashRouter>
        <AppRouter />
      </HashRouter>
    </Suspense>
  </Provider>
);
