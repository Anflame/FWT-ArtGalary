import { FC, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames/bind';
import Button from '../Button';
import { Context } from '../../hooks/Context';
import type { MenuProps } from '../../comon-types';
import { ReactComponent as Logo } from '../../assets/images/logo.svg';
import { ReactComponent as MenuIcon } from '../../assets/images/menuIcon.svg';
import { ReactComponent as ThemeIcon } from '../../assets/images/themeIcon.svg';
import { ReactComponent as ThemeIconLight } from '../../assets/images/themeIconLight.svg';
import styles from './styles.module.scss';

const cx = cn.bind(styles);

export const Header: FC<MenuProps> = ({
  isShow,
  setIsShow,
  handleShowAuth,
}) => {
  const { theme, toggleTheme } = Context();
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
              <Button
                handleClick={() => handleShowAuth('logIn')}
                className={'authBtn'}
                children={'login'}
              ></Button>
              <Button
                handleClick={() => handleShowAuth('signUp')}
                className={'authBtn'}
                children={'signUp'}
              ></Button>
            </div>
            <Button
              handleClick={toggleTheme}
              className={'themeBtn'}
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
            onClick={() => setIsShow(!isShow)}
          />
        </div>
      </header>
    </>
  );
};
