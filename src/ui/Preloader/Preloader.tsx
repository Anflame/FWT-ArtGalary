import React, { FC } from 'react';
import cn from 'classnames/bind';
import { ReactComponent as PreloaderIcon } from '../../assets/images/preloader.svg';
import styles from './styles.module.scss';

const cx = cn.bind(styles);

export const Preloader: FC = () => (
  <div className={cx('preloaderWrapp')}>
    <PreloaderIcon className={cx('preloader')} />
    <PreloaderIcon className={cx('preloader')} />
    <PreloaderIcon className={cx('preloader')} />
    <PreloaderIcon className={cx('preloader')} />
  </div>
);
