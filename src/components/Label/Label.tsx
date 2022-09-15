import React, { FC } from 'react';
import cn from 'classnames/bind';
import styles from './styles.module.scss';
import { Context } from '../../hooks/Context';
import { ReactComponent as LabelDelete } from '../../assets/images/labelDelete.svg';

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
        <button className={cx('label')}>
          {children}
          <LabelDelete
            fill={theme === 'dark' ? '#DEDEDE' : '#575757'}
            onClick={changeSelect}
            className={cx('labelDelete')}
          />
        </button>
      )}
    </>
  );
};
