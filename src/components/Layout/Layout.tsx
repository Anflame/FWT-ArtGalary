import React, { FC, useEffect, useState } from 'react';
import { Outlet } from 'react-router';
import { ActionCreatorWithoutPayload } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

import { fetchGenres } from '../../store/API/paintersInfo';

import Toast from '../../ui/Toast';
import Menu from '../Menu';

import { defaultErrorContext, ErrorContext } from '../../utils/ErrorContext';
import { defaultContext, ThemeContext } from '../../utils/ThemeContext';

import { useCheckAuth } from '../../hooks/useCheckAuth';
import { useAppDispatch } from '../../hooks/useRedux';
import { useUnScroll } from '../../hooks/useUnScroll';

const Auth = React.lazy(() => import('../Auth'));
const Footer = React.lazy(() => import('../Footer'));
const Header = React.lazy(() => import('../Header'));

const Layout: FC = () => {
  useCheckAuth();
  const [isShow, setIsShow] = useState(false);
  const [theme, setTheme] = useState(defaultContext.theme);
  const [message, setMessage] = useState(defaultErrorContext.message);
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
  const [func, setFunc] = useState<ActionCreatorWithoutPayload<string>>();

  const handleShowAuth = (type?: string | boolean) => {
    setIsShowAuth({
      logIn: type === 'login',
      signUp: type === 'signUp',
    });
    useUnScroll(!!type);
  };

  const showError = (
    newMessage: string,
    newFunc?: ActionCreatorWithoutPayload<string>,
  ) => {
    setMessage(newMessage);
    if (newFunc) setFunc(newFunc);
  };

  const closeToast = () => {
    if (func && typeof func !== 'function') dispatch(func);
    setMessage('');
  };

  const handleChangeShowMenu = () => {
    setIsShow(!isShow);
    useUnScroll(!isShow);
  };

  useEffect(() => {
    dispatch(fetchGenres());
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <ErrorContext.Provider value={{ message, showError }}>
        <Header
          handleChangeShowMenu={handleChangeShowMenu}
          handleShowAuth={handleShowAuth}
        />
        <Menu
          isShow={isShow}
          handleChangeShowMenu={handleChangeShowMenu}
          handleShowAuth={handleShowAuth}
        />
        <Outlet />
        <Footer />
        <Auth isShowAuth={isShowAuth} handleShowAuth={handleShowAuth} />
        <Toast
          message={message}
          isShowToast={Boolean(message)}
          handleCloseToast={closeToast}
        />
      </ErrorContext.Provider>
    </ThemeContext.Provider>
  );
};

export default Layout;
