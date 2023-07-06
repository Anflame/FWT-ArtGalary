import React, { FC } from 'react';
import cn from 'classnames/bind';

import { ReactComponent as PreloaderIcon } from '../../assets/images/preloader.svg';

import styles from './styles.module.scss';

const cx = cn.bind(styles);

type PreloaderProps = {
  className?: string;
};

const Preloader: FC<PreloaderProps> = ({ className }) => (
  <div className={cx('preloaderWrapp', className)}>
    <PreloaderIcon className={cx('preloader')} />
    <PreloaderIcon className={cx('preloader')} />
    <PreloaderIcon className={cx('preloader')} />
    <PreloaderIcon className={cx('preloader')} />
  </div>
);

export default Preloader;
