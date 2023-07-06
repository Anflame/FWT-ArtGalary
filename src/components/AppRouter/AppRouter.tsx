import { FC } from 'react';
import { Route, Routes } from 'react-router';

import MainPage from '../../pages/MainPage';
import { ProfilePage } from '../../pages/ProfilePage';
import { Layout } from '../Layout';

const AppRouter: FC = () => (
  <Routes>
    <Route path={'/'} element={<Layout />}>
      <Route index element={<MainPage />} />
      <Route path={'profile/:painterId/*'} element={<ProfilePage />} />
    </Route>
    <Route path="*" element={<h2>404 page</h2>} />
  </Routes>
);

export default AppRouter;
