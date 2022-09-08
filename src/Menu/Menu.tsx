import { FC, useContext } from 'react';
import cn from 'classnames/bind';
import styles from './styles.module.scss';
import { ThemeContext } from '../utils/ThemeContext';
import Button from '../Button';
import { MenuIconClose, ThemeIcon, ThemeIconLight } from '../assets/icons';

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
        {isShow && (
          <MenuIconClose
            width={16}
            height={16}
            fill={theme === 'dark' ? '#DEDEDE' : '#575757'}
            onClick={() => setIsShow(!isShow)}
            className={cx('menuIconClose')}
          />
        )}
        <div className={cx('menuThemeWrapp')} onClick={toggleTheme}>
          <Button
            className={'themeBtn'}
            children={
              theme === 'dark' ? (
                <ThemeIcon width={20} height={20} fill="#DEDEDE" />
              ) : (
                <ThemeIconLight width={18} height={21} fill="#575757" />
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
