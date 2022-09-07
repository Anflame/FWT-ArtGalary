import React, { FC, useContext } from 'react';
import cn from 'classnames/bind';
import styles from './styles.module.scss';
import labelDeleteImg from '../assets/images/labelDelete.svg';
import labelDeleteImgLight from '../assets/images/labelDeleteLight.svg';
import { ThemeContext } from '../utils/ThemeContext';

const cx = cn.bind(styles);

type LabelsProps = {
  isDelAllowed: boolean;
  children: string;
  changeSelect?: () => void;
};

export const Label: FC<LabelsProps> = ({
  isDelAllowed,
  children,
  changeSelect,
}) => {
  const { theme } = useContext(ThemeContext);
  return (
    <>
      {!isDelAllowed && <div className={cx('label')}>{children}</div>}
      {isDelAllowed && (
        <button className={cx('label', 'delAllowed')}>
          {children}
          <img
            className={cx('labelDeleteImg')}
            alt="delete label"
            src={theme === 'dark' ? labelDeleteImg : labelDeleteImgLight}
            onClick={changeSelect}
          />
        </button>
      )}
    </>
  );
};
