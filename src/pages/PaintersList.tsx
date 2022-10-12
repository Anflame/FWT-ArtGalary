import React, { FC, useState } from 'react';
import cn from 'classnames/bind';
import PainterItem from '../components/PainterItem';
import { useAppSelector } from '../hooks/redux';
import { themeContext } from '../hooks/themeContext';
import { TPainters } from '../store/types';
import Button from '../ui/Button';
import EditProfile from '../ui/EditProfile';
import List from '../ui/List';
import Preloader from '../ui/Preloader';
import Search from '../ui/Search';
import Toast from '../ui/Toast';
import { ReactComponent as SearchParamsShowIcon } from '../assets/images/searchParamsShowIcon.svg';
import styles from './styles.module.scss';

const cx = cn.bind(styles);

export const PaintersList: FC = () => {
  const { theme } = themeContext();
  const { painterList, isLoading, error } = useAppSelector(
    ({ painters }) => painters,
  );
  const [isShow, setIsShow] = useState(!error);
  const [isShowAddProfile, setIsShowAddProfile] = useState(false);
  const [isShowSearchParams, setIsShowSearchParams] = useState(false);

  const handleCloseToast = () => {
    setIsShow(false);
  };

  const handleSubmitForm = () => {};

  return (
    <main className={cx('main')}>
      <div className={cx('editWrapp')}>
        <Button
          className="linkBtn"
          handleClick={() => setIsShowAddProfile(true)}
        >
          add artist
        </Button>
        <div className={cx('searchWrapp')}>
          <Search handleSubmitForm={handleSubmitForm} />
          <SearchParamsShowIcon
            fill={theme === 'dark' ? '#DEDEDE' : '#575757'}
            onClick={() => setIsShowSearchParams(!isShowSearchParams)}
          />
        </div>
      </div>
      {isLoading && <Preloader />}
      {error && (
        <Toast
          message={error}
          handleCloseToast={handleCloseToast}
          isShowToast={isShow}
        />
      )}
      {painterList && (
        <List
          items={painterList}
          renderItem={(painter: TPainters) => (
            <PainterItem painter={painter} key={painter._id} />
          )}
        />
      )}
      <EditProfile
        isShowEditProfile={isShowAddProfile}
        setIsShowEditProfile={() => setIsShowAddProfile(false)}
      />
    </main>
  );
};
