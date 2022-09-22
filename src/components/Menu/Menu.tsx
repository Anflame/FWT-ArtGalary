import { FC } from 'react';
import { useCookies } from 'react-cookie';
import cn from 'classnames/bind';
import Button from '../Button';
import { useAppDispatch } from '../../hooks/Redux';
import { toggleTheme } from '../../store/theme/slice';
import type { MenuProps } from '../../comon-types';
import { ReactComponent as MenuIconClose } from '../../assets/images/menuIconClose.svg';
import { ReactComponent as ThemeIcon } from '../../assets/images/themeIcon.svg';
import { ReactComponent as ThemeIconLight } from '../../assets/images/themeIconLight.svg';
import styles from './styles.module.scss';

const cx = cn.bind(styles);

export const Menu: FC<MenuProps> = ({
  isShow,
  setIsShow,
  handleClickLogIn,
  handleClickSignUp,
}) => {
  const [{ theme }, setCookie] = useCookies();
  const toChangeTheme = theme === 'dark' ? 'light' : 'dark';
  const dispatch = useAppDispatch();
  const changeTheme = () => {
    dispatch(toggleTheme(toChangeTheme));
    setCookie('theme', toChangeTheme);
  };

  return (
    <div className={cx('menu', isShow && 'menuShow')}>
      <div className={cx('menuPopUpContent', isShow && 'menuPopUpContentShow')}>
        <MenuIconClose
          fill={theme === 'dark' ? '#DEDEDE' : '#575757'}
          onClick={() => setIsShow(!isShow)}
          className={cx('menuIconClose')}
        />
        <div className={cx('menuThemeWrapp')} onClick={changeTheme}>
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

        <Button
          handleClick={handleClickLogIn}
          className={'authBtnMobile'}
          children={'login'}
        ></Button>
        <Button
          handleClick={handleClickSignUp}
          className={'authBtnMobile'}
          children={'signUp'}
        ></Button>
      </div>
    </div>
  );
};
