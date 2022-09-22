import React, { FC } from 'react';
import { useCookies } from 'react-cookie';
import cn from 'classnames/bind';
import { ReactComponent as LabelDelete } from '../../assets/images/labelDelete.svg';
import styles from './styles.module.scss';

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
  const [{ theme }] = useCookies();
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
