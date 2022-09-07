import { FC, useContext, useLayoutEffect, useState } from 'react';
import cn from 'classnames/bind';
import { ThemeContext } from '../utils/ThemeContext';
import styles from './styles.module.scss';
import themeIcon from '../assets/images/themeIcon.svg';
import themeIconLight from '../assets/images/themeIconLight.svg';
import logoImg from '../assets/images/logo.svg';
import logoImgLight from '../assets/images/logoLight.svg';
import menuIcon from '../assets/images/menuIcon.svg';
import menuIconLight from '../assets/images/menuIconLight.svg';
import Menu from '../Menu';
import Button from '../Button';
import Links from '../Links';

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
    <header className={cx('header')}>
      <div className={cx('container')}>
        <Links
          children={
            <img
              src={theme === 'dark' ? logoImg : logoImgLight}
              alt="logo"
              className={cx('logo')}
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
                <img src={themeIcon} alt="theme" />
              ) : (
                <img src={themeIconLight} alt="theme" />
              )
            }
          />
        </div>
        {!isShow ? (
          <img
            src={theme === 'dark' ? menuIcon : menuIconLight}
            alt="menuIcon"
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
  );
};
