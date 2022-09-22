import { FC, useLayoutEffect } from 'react';
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import cn from 'classnames/bind';
import Button from '../Button';
import { useAppDispatch } from '../../hooks/Redux';
import { toggleTheme } from '../../store/theme/slice';
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
  handleClickLogIn,
  handleClickSignUp,
}) => {
  const dispatch = useAppDispatch();
  const [{ theme }, setCookie] = useCookies(['theme']);
  const toChangeTheme = theme === 'dark' ? 'light' : 'dark';
  const resultTheme = theme || 'dark';

  useLayoutEffect(() => {
    if (!theme) setCookie('theme', toChangeTheme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const changeTheme = () => {
    dispatch(toggleTheme(toChangeTheme));
    setCookie('theme', toChangeTheme);
  };

  return (
    <>
      <header className={cx('header')}>
        <div className={cx('container')}>
          <Link
            children={
              <Logo fill={resultTheme === 'dark' ? '#DEDEDE' : '#575757'} />
            }
            to={'/'}
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
              handleClick={changeTheme}
              className={'themeBtn'}
              children={
                resultTheme === 'dark' ? (
                  <ThemeIcon fill="#DEDEDE" />
                ) : (
                  <ThemeIconLight fill="#575757" />
                )
              }
            />
          </div>
          <MenuIcon
            fill={resultTheme === 'dark' ? '#DEDEDE' : '#575757'}
            className={cx('menuIcon')}
            onClick={() => setIsShow(!isShow)}
          />
        </div>
      </header>
    </>
  );
};
