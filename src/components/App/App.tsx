import { FC, Suspense } from 'react';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';

import { setupStore } from '../../store';

import Preloader from '../../ui/Preloader';
import { AppRouter } from '../AppRouter';

const store = setupStore();

const App: FC = () => (
  <Provider store={store}>
    <Suspense fallback={<Preloader className="firstLoading" />}>
      <HashRouter>
        <AppRouter />
      </HashRouter>
    </Suspense>
  </Provider>
);

export default App;
