import React, { useState } from 'react';
import cn from 'classnames/bind';
import CardList from '../components/CardList';
import Preloader from '../components/Preloader';
import Toast from '../components/Toast';
import { useAppSelector } from '../hooks/Redux';
import styles from './styles.module.scss';

const cx = cn.bind(styles);

export const PaintersList = () => {
  const { painters, isLoading, error } = useAppSelector(
    (state) => state.painters,
  );
  const [isShow, setIsShow] = useState(!error);

  const handleCloseToast = () => {
    setIsShow(false);
  };

  return (
    <main className={cx('main')}>
      {isLoading && <Preloader />}
      {error && (
        <Toast
          message={error}
          handleCloseToast={handleCloseToast}
          isShowToast={isShow}
        />
      )}
      <CardList painters={painters} />
    </main>
  );
};
