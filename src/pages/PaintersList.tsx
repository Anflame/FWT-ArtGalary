import React, { FC, useState } from 'react';
import cn from 'classnames/bind';
import PainterItem from '../components/PainterItem';
import { useAppSelector } from '../hooks/useRedux';
import { useThemeContext } from '../hooks/useThemeContext';
import { TPainters } from '../store/types';
import Button from '../ui/Button';
import EditProfile from '../ui/EditProfile';
import Filter from '../ui/FIlter';
import List from '../ui/List';
import Preloader from '../ui/Preloader';
import Search from '../ui/Search';
import Toast from '../ui/Toast';
import { ReactComponent as FilterIcon } from '../assets/images/filterIcon.svg';
import styles from './styles.module.scss';

const cx = cn.bind(styles);

export const PaintersList: FC = () => {
  const { theme } = useThemeContext();
  const { painterList, isLoading, error } = useAppSelector(
    ({ painters }) => painters,
  );
  const [isShow, setIsShow] = useState(!error);
  const [isShowAddProfile, setIsShowAddProfile] = useState(false);
  const [isShowFilter, setIsShowFilter] = useState(false);

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
          <FilterIcon
            fill={theme === 'dark' ? '#DEDEDE' : '#575757'}
            onClick={() => setIsShowFilter(!isShowFilter)}
            className={cx('filterIcon')}
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
      <Filter isShowFilter={isShowFilter} setIsShowFilter={setIsShowFilter} />
    </main>
  );
};
