import React, { FC, useState } from 'react';
import { Outlet } from 'react-router';
import Cookies from 'js-cookie';
import Footer from '../Footer';
import Header from '../Header';
import LogIn from '../LogIn';
import Menu from '../Menu';
import SignUp from '../SignUp';
import { defaultContext, ThemeContext } from '../../utils/ThemeContext';

export const Layout: FC = () => {
  const [theme, setTheme] = useState(defaultContext.theme);
  const toggleTheme = () => {
    const resultTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(resultTheme);
    Cookies.set('theme', resultTheme, { expires: 7 });
  };

  const [isShowLogIn, setIsShowLogIn] = useState(false);
  const [isShowSignUp, setIsShowSignUp] = useState(false);
  const handleClickLogIn = () => {
    setIsShowLogIn(true);
  };
  const handleClickSignUp = () => {
    setIsShowSignUp(true);
  };

  const handleLogIn = () => {};

  const handleSignUp = () => {};

  const [isShow, setIsShow] = useState(false);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <Header
        isShow={isShow}
        setIsShow={setIsShow}
        handleClickLogIn={handleClickLogIn}
        handleClickSignUp={handleClickSignUp}
      />
      <Menu
        isShow={isShow}
        setIsShow={setIsShow}
        handleClickLogIn={handleClickLogIn}
        handleClickSignUp={handleClickSignUp}
      />
      <Outlet />
      <Footer />
      <LogIn
        isShowLogIn={isShowLogIn}
        setIsShowLogIn={setIsShowLogIn}
        setIsShowSignUp={setIsShowSignUp}
        handleLogIn={handleLogIn}
      />
      <SignUp
        isShowSignUp={isShowSignUp}
        setIsShowSignUp={setIsShowSignUp}
        setIsShowLogIn={setIsShowLogIn}
        handleSignUp={handleSignUp}
      />
    </ThemeContext.Provider>
  );
};
