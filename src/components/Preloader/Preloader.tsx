import React, { FC } from 'react';
import cn from 'classnames/bind';
import styles from './styles.module.scss';
import { PreLoaderIcon } from '../../assets/icons';

const cx = cn.bind(styles);

export const Preloader: FC = () => (
  <div className={cx('preloaderWrapp')}>
    <div className={cx('preloader')}></div>
  </div>
);
