import React, { FC } from 'react';
import cn from 'classnames/bind';
import styles from './styles.module.scss';
import { LabelDelete } from '../assets/icons';
import { Context } from '../hooks/Context';

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
  const { theme } = Context();
  return (
    <>
      {!isDelAllowed && <div className={cx('label')}>{children}</div>}
      {isDelAllowed && (
        <button className={cx('label', 'delAllowed')}>
          {children}
          <LabelDelete
            width={8}
            height={9}
            fill={theme === 'dark' ? '#DEDEDE' : '#575757'}
            onClick={changeSelect}
          />
        </button>
      )}
    </>
  );
};
