import React, { FC, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { defaultContext, ThemeContext } from '../utils/ThemeContext';
import Header from '../Header';
import { PaintersList } from '../pages/PaintersList';
import { PainterProfile } from '../pages/PainterProfile';

export const App: FC = () => {
  const [theme, setTheme] = useState(defaultContext.theme);
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path={'/'} element={<Header />}>
            <Route path={''} element={<PaintersList />} />
            <Route path={'profile/:painterId'} element={<PainterProfile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeContext.Provider>
  );
};
