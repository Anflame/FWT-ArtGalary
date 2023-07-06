import React, { FC } from 'react';
import cn from 'classnames/bind';

import { useThemeContext } from '../../hooks/useThemeContext';

import { ReactComponent as LabelDelete } from '../../assets/images/labelDelete.svg';

import styles from './styles.module.scss';

const cx = cn.bind(styles);

type LabelsProps = {
  isDelAllowed: boolean;
  children: string;
  changeSelect?:
    | ((e: React.MouseEvent<HTMLLIElement, MouseEvent>) => void)
    | ((event: React.ChangeEvent<Element>) => void);
};

const Label: FC<LabelsProps> = ({ isDelAllowed, children, changeSelect }) => {
  const { theme } = useThemeContext();
  return (
    <>
      {!isDelAllowed && <div className={cx('label')}>{children}</div>}
      {isDelAllowed && (
        <div className={cx('label')}>
          {children}
          <LabelDelete
            fill={theme === 'dark' ? '#DEDEDE' : '#575757'}
            onClick={changeSelect}
            title={children}
            className={cx('labelDelete')}
          />
        </div>
      )}
    </>
  );
};

export default Label;
