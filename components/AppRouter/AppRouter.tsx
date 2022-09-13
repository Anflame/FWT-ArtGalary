import React, { FC } from 'react';
import { Route, Routes } from 'react-router';
import { PainterProfile } from '../../pages/PainterProfile';
import { PaintersList } from '../../pages/PaintersList';
import Layout from '../Layout';

export const AppRouter: FC = () => (
  <Routes>
    <Route path={'/'} element={<Layout />}>
      <Route path={''} element={<PaintersList />} />
      <Route path={'profile/:painterId'} element={<PainterProfile />} />
    </Route>
  </Routes>
);
