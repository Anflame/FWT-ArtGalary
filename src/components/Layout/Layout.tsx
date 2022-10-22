import React, { FC, useEffect, useState } from 'react';
import { Outlet } from 'react-router';
import Cookies from 'js-cookie';
import Menu from '../Menu';
import { useAppDispatch } from '../../hooks/useRedux';
import { useUnScroll } from '../../hooks/useUnScroll';
import { fetchPainters } from '../../store/API/painters';
import { defaultContext, ThemeContext } from '../../utils/ThemeContext';

const Auth = React.lazy(() => import('../Auth'));
const Footer = React.lazy(() => import('../Footer'));
const Header = React.lazy(() => import('../Header'));

export const Layout: FC = () => {
  const [theme, setTheme] = useState(defaultContext.theme);
  const dispatch = useAppDispatch();

  const toggleTheme = () => {
    const resultTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(resultTheme);
    Cookies.set('theme', resultTheme);
  };

  const [isShowAuth, setIsShowAuth] = useState({
    logIn: false,
    signUp: false,
  });

  const handleShowAuth = (type?: string | boolean) => {
    setIsShowAuth({
      logIn: type === 'logIn',
      signUp: type === 'signUp',
    });
    useUnScroll(!!type);
  };

  useEffect(() => {
    dispatch(fetchPainters());
  }, [fetchPainters]);

  const [isShow, setIsShow] = useState(false);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <Header
        isShow={isShow}
        setIsShow={setIsShow}
        handleShowAuth={handleShowAuth}
      />
      <Menu
        isShow={isShow}
        setIsShow={setIsShow}
        handleShowAuth={handleShowAuth}
      />
      <Outlet />
      <Footer />
      <Auth isShowAuth={isShowAuth} handleShowAuth={handleShowAuth} />
    </ThemeContext.Provider>
  );
};
