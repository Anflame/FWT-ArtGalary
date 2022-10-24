import React, { FC, useEffect, useState } from 'react';
import cn from 'classnames/bind';
import Filter from '../components/FIlter';
import PainterItem from '../components/PainterItem';
import { genres, sort } from '../constants';
import { useAppSelector } from '../hooks/useRedux';
import { useThemeContext } from '../hooks/useThemeContext';
import { useUnScroll } from '../hooks/useUnScroll';
import { TPainters } from '../store/types';
import Button from '../ui/Button';
import EditProfile from '../ui/EditProfile';
import List from '../ui/List';
import Preloader from '../ui/Preloader';
import Search from '../ui/Search';
import Toast from '../ui/Toast';
import { ReactComponent as FilterIcon } from '../assets/images/filterIcon.svg';
import styles from './styles.module.scss';

const cx = cn.bind(styles);

export const MainPage: FC = () => {
  const { theme } = useThemeContext();
  const { painterList, isLoading, error } = useAppSelector(
    ({ painters }) => painters,
  );
  const [isShow, setIsShow] = useState(!error);
  const [isShowAddProfile, setIsShowAddProfile] = useState(false);
  const [isShowFilter, setIsShowFilter] = useState(false);
  const [genresList, setGenresList] = useState(genres);
  const [sortList, setSortList] = useState(sort);

  const handleCloseToast = () => {
    setIsShow(false);
  };

  useEffect(() => {
    useUnScroll(isShowFilter || isShowAddProfile);
  }, [isShowFilter, isShowAddProfile]);

  const handleSubmitForm = () => {};

  const handleSumbitFilter = () => {};
  const handleClearFilter = () => {
    setGenresList(
      genresList.map((el) => {
        if (el.isChecked) el.isChecked = false;
        return el;
      }),
    );
    setSortList(
      sortList.map((el) => {
        if (el.isChecked) el.isChecked = false;
        return el;
      }),
    );
  };

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
        handleChangeShowEditProfile={() => setIsShowAddProfile(false)}
      />
      <Filter
        isShowFilter={isShowFilter}
        handleChangeShowFilter={() => setIsShowFilter(false)}
        handleSumbitFilter={handleSumbitFilter}
        handleClearFilter={handleClearFilter}
        sortList={sortList}
        setSortList={setSortList}
        genresList={genresList}
        setGenresList={setGenresList}
      />
    </main>
  );
};
