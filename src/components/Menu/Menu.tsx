import { FC } from 'react';
import { createPortal } from 'react-dom';
import cn from 'classnames/bind';
import { modalNode } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { useThemeContext } from '../../hooks/useThemeContext';
import { changeAuth } from '../../store/auth/slice';
import Button from '../../ui/Button';
import type { MenuProps } from '../../comon-types';
import { ReactComponent as IconClose } from '../../assets/images/iconClose.svg';
import { ReactComponent as ThemeIcon } from '../../assets/images/themeIcon.svg';
import { ReactComponent as ThemeIconLight } from '../../assets/images/themeIconLight.svg';
import styles from './styles.module.scss';

const cx = cn.bind(styles);

export const Menu: FC<MenuProps> = ({
  isShow,
  handleChangeShowMenu,
  handleShowAuth,
}) => {
  const { theme, toggleTheme } = useThemeContext();
  const { isAuth } = useAppSelector(({ auth }) => auth);
  const dispatch = useAppDispatch();

  const logOut = () => {
    dispatch(changeAuth(false));
  };

  return createPortal(
    <div
      className={cx('menu', isShow && 'menuShow')}
      onClick={() => handleChangeShowMenu(false)}
    >
      <div
        className={cx('menuPopUpContent', isShow && 'menuPopUpContentShow')}
        onClick={(e) => e.stopPropagation()}
      >
        <IconClose
          fill={theme === 'dark' ? '#DEDEDE' : '#575757'}
          onClick={() => handleChangeShowMenu(!isShow)}
          className={cx('menuIconClose')}
        />
        <div className={cx('menuThemeWrapp')} onClick={toggleTheme}>
          <Button
            className={'themeBtn'}
            children={
              theme === 'dark' ? (
                <ThemeIcon fill="#DEDEDE" />
              ) : (
                <ThemeIconLight fill="#575757" />
              )
            }
          />
          <p className={cx('menuThemeMode')}>
            {theme === 'dark' ? 'light mode' : 'dark mode'}
          </p>
        </div>
        {!isAuth ? (
          <>
            <Button
              handleClick={() => handleShowAuth('logIn')}
              className={'authBtnMobile'}
            >
              {'login'}
            </Button>
            <Button
              handleClick={() => handleShowAuth('signUp')}
              className={'authBtnMobile'}
            >
              {'signUp'}
            </Button>
          </>
        ) : (
          <Button className={'authBtnMobile'} handleClick={logOut}>
            {'logout'}
          </Button>
        )}
      </div>
    </div>,
    modalNode,
  );
};
