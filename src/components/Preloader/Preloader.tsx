import React, { FC } from 'react';
import cn from 'classnames/bind';
import styles from './styles.module.scss';

const cx = cn.bind(styles);

export const Preloader: FC = () => (
  <div className={cx('preloaderWrapp')}>
    <div className={cx('loader')}></div>
  </div>
);
