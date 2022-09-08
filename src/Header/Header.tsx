import { FC, useContext, useLayoutEffect, useState } from 'react';
import cn from 'classnames/bind';
import { Outlet } from 'react-router';
import { ThemeContext } from '../utils/ThemeContext';
import styles from './styles.module.scss';
import Menu from '../Menu';
import Button from '../Button';
import Links from '../Links';
import { Logo, MenuIcon, ThemeIcon, ThemeIconLight } from '../assets/icons';
import Footer from '../Footer';

const cx = cn.bind(styles);

export const Header: FC = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  useLayoutEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const handleClickLogIn = () => {};
  const handleClickSignUp = () => {};

  const [isShow, setIsShow] = useState(false);

  return (
    <>
      <header className={cx('header')}>
        <div className={cx('container')}>
          <Links
            children={
              <Logo
                fill={theme === 'dark' ? '#DEDEDE' : '#575757'}
                width={39}
                height={15}
              />
            }
            href={'/'}
          />

          <div className={cx('authAndChangeThemeWrapp')}>
            <div className={cx('authWrapp')}>
              <Button
                handleClick={handleClickLogIn}
                className={'authBtn'}
                children={'login'}
              ></Button>
              <Button
                handleClick={handleClickSignUp}
                className={'authBtn'}
                children={'signUp'}
              ></Button>
            </div>
            <Button
              handleClick={toggleTheme}
              className={'themeBtn'}
              children={
                theme === 'dark' ? (
                  <ThemeIcon width={20} height={20} fill="#DEDEDE" />
                ) : (
                  <ThemeIconLight width={18} height={21} fill="#575757" />
                )
              }
            />
          </div>
          {!isShow ? (
            <MenuIcon
              width={24}
              height={18}
              fill={theme === 'dark' ? '#DEDEDE' : '#575757'}
              className={cx('menuIcon')}
              onClick={() => setIsShow(!isShow)}
            />
          ) : (
            <Menu
              isShow={isShow}
              setIsShow={setIsShow}
              handleClickLogIn={handleClickLogIn}
              handleClickSignUp={handleClickSignUp}
            />
          )}
        </div>
      </header>
      <Outlet />
      <Footer />
    </>
  );
};
