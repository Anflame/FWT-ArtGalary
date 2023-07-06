import { FC, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames/bind';
import Cookies from 'js-cookie';

import { changeAuth } from '../../store/auth/slice';

import Button from '../../ui/Button';

import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { useThemeContext } from '../../hooks/useThemeContext';

import type { MenuProps } from '../../comon-types';
import { BtnVariants } from '../../variants';

import { ReactComponent as Logo } from '../../assets/images/logo.svg';
import { ReactComponent as MenuIcon } from '../../assets/images/menuIcon.svg';
import { ReactComponent as ThemeIcon } from '../../assets/images/themeIcon.svg';
import { ReactComponent as ThemeIconLight } from '../../assets/images/themeIconLight.svg';

import styles from './styles.module.scss';

const cx = cn.bind(styles);

export const Header: FC<MenuProps> = ({
  handleChangeShowMenu,
  handleShowAuth,
}) => {
  const { theme, toggleTheme } = useThemeContext();
  const { isAuth } = useAppSelector(({ auth }) => auth);
  const dispatch = useAppDispatch();

  const logOut = () => {
    dispatch(changeAuth(false));
    Cookies.remove('token');
  };

  useLayoutEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <>
      <header className={cx('header')}>
        <div className={cx('container')}>
          <Link
            children={<Logo fill={theme === 'dark' ? '#DEDEDE' : '#575757'} />}
            to={'/'}
          />

          <div className={cx('authAndChangeThemeWrapp')}>
            <div className={cx('authWrapp')}>
              {!isAuth ? (
                <>
                  <Button
                    handleClick={() => handleShowAuth('login')}
                    variant={BtnVariants.AUTH}
                  >
                    {'login'}
                  </Button>
                  <Button
                    handleClick={() => handleShowAuth('signUp')}
                    variant={BtnVariants.AUTH}
                  >
                    {'signUp'}
                  </Button>
                </>
              ) : (
                <Button handleClick={logOut} variant={BtnVariants.AUTH}>
                  {'logout'}
                </Button>
              )}
            </div>
            <Button
              handleClick={toggleTheme}
              variant={BtnVariants.THEME}
              children={
                theme === 'dark' ? (
                  <ThemeIcon fill="#DEDEDE" />
                ) : (
                  <ThemeIconLight fill="#575757" />
                )
              }
            />
          </div>
          <MenuIcon
            fill={theme === 'dark' ? '#DEDEDE' : '#575757'}
            className={cx('menuIcon')}
            onClick={handleChangeShowMenu}
          />
        </div>
      </header>
    </>
  );
};
