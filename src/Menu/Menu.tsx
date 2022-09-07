import { FC, useContext } from 'react';
import cn from 'classnames/bind';
import styles from './styles.module.scss';
import { ThemeContext } from '../utils/ThemeContext';
import menuIconClose from '../assets/images/menuIconClose.svg';
import menuIconCloseLight from '../assets/images/menuIconCloseLight.svg';
import themeIcon from '../assets/images/themeIcon.svg';
import themeIconLight from '../assets/images/themeIconLight.svg';
import Button from '../Button';

const cx = cn.bind(styles);

type MenuProps = {
  isShow: boolean;
  setIsShow: (isShow: boolean) => void;
  handleClickLogIn: () => void;
  handleClickSignUp: () => void;
};

export const Menu: FC<MenuProps> = ({
  isShow,
  setIsShow,
  handleClickLogIn,
  handleClickSignUp,
}) => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className={cx('menu')}>
      <div className={cx('menuPopUpContent')}>
        {isShow && theme === 'dark' && (
          <img
            src={menuIconClose}
            className={cx('menuIconClose')}
            alt="menuIconClose"
            onClick={() => setIsShow(!isShow)}
          />
        )}
        {isShow && theme === 'light' && (
          <img
            src={menuIconCloseLight}
            className={cx('menuIconClose')}
            alt="menuIconCloseLight"
            onClick={() => setIsShow(!isShow)}
          />
        )}
        <div className={cx('menuThemeWrapp')} onClick={toggleTheme}>
          <Button
            className={'themeBtn'}
            children={
              theme === 'dark' ? (
                <img src={themeIcon} alt="theme" />
              ) : (
                <img src={themeIconLight} alt="theme" />
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
