import React, { FC } from 'react';
import cn from 'classnames/bind';
import { themeContext } from '../../hooks/themeContext';
import { ReactComponent as LabelDelete } from '../../assets/images/labelDelete.svg';
import styles from './styles.module.scss';

const cx = cn.bind(styles);

type LabelsProps = {
  isDelAllowed: boolean;
  children: string;
  changeSelect?: (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
};

export const Label: FC<LabelsProps> = ({
  isDelAllowed,
  children,
  changeSelect,
}) => {
  const { theme } = themeContext();
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
