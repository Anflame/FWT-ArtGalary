import React, { FC, useState } from 'react';
import { Outlet } from 'react-router';
import Footer from '../Footer';
import Header from '../Header';
import LogIn from '../LogIn';
import Menu from '../Menu';
import SignUp from '../SignUp';

export const Layout: FC = () => {
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
    <>
      <Header
        isShow={isShow}
        setIsShow={setIsShow}
        handleClickLogIn={handleClickLogIn}
        handleClickSignUp={handleClickSignUp}
      />
      <Outlet />
      <Footer />
      <Menu
        isShow={isShow}
        setIsShow={setIsShow}
        handleClickLogIn={handleClickLogIn}
        handleClickSignUp={handleClickSignUp}
      />
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
    </>
  );
};
