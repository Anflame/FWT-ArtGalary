import React, { FC, useState } from 'react';
import cn from 'classnames/bind';
import List from '../components/List';
import PainterItem from '../components/PainterItem';
import Preloader from '../components/Preloader';
import Toast from '../components/Toast';
import { useAppSelector } from '../hooks/Redux';
import { TPainters } from '../store/types';
import styles from './styles.module.scss';

const cx = cn.bind(styles);

export const PaintersList: FC = () => {
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
      <List
        items={painters}
        renderItem={(painter: TPainters) => (
          <PainterItem painter={painter} key={painter._id} />
        )}
      />
    </main>
  );
};
