import React, { FC, useEffect, useState } from 'react';
import cn from 'classnames/bind';
import Cookies from 'js-cookie';
import Filter from '../components/FIlter';
import PainterItem from '../components/PainterItem';
import { sort } from '../constants';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { useThemeContext } from '../hooks/useThemeContext';
import { useUnScroll } from '../hooks/useUnScroll';
import {
  fetchPainters,
  fetchPaintersAuthorizedPerson,
} from '../store/API/painters';
import { fetchGenres } from '../store/API/paintersInfo';
import { TPainters } from '../store/types';
import Button from '../ui/Button';
import EditProfile from '../ui/EditProfile';
import List from '../ui/List';
import Preloader from '../ui/Preloader';
import Search from '../ui/Search';
import Toast from '../ui/Toast';
import type { Listes } from '../comon-types';
import { ReactComponent as FilterIcon } from '../assets/images/filterIcon.svg';
import styles from './styles.module.scss';

const cx = cn.bind(styles);

export const MainPage: FC = () => {
  const { theme } = useThemeContext();
  const { painterList, isLoading, error } = useAppSelector(
    ({ painters }) => painters,
  );
  const { genres } = useAppSelector(({ genresState }) => genresState);
  const [isShow, setIsShow] = useState(!error);
  const [isShowAddProfile, setIsShowAddProfile] = useState(false);
  const [isShowFilter, setIsShowFilter] = useState(false);
  const [genresList, setGenresList] = useState<Listes[]>([]);
  const [sortList, setSortList] = useState(sort);
  const [isFiltered, setIsFiltered] = useState(false);
  const dispatch = useAppDispatch();
  const {
    paintersList: painterAuthList,
    isLoading: isLoadingAuth,
    error: errorAuth,
  } = useAppSelector(
    ({ paintersAuthorizedPerson }) => paintersAuthorizedPerson,
  );

  const handleCloseToast = () => {
    setIsShow(false);
  };

  useEffect(() => {
    setGenresList(
      genres.map((el) => ({
        ...el,
        isChecked: false,
      })),
    );
  }, [genres]);

  useEffect(() => {
    if (!isFiltered) dispatch(fetchPainters());
    useUnScroll(isShowFilter || isShowAddProfile);
  }, [isShowFilter, isShowAddProfile]);

  const handleSubmitFilter = () => {
    const filteredGenres = genresList
      .filter((el) => el.isChecked !== false)
      .reduce((acc, curr) => {
        acc.push(curr.name);
        return acc;
      }, [] as string[]);
    const checkedSorting = sortList
      .filter((el) => el.isChecked !== false)
      .reduce((acc, curr) => {
        if (curr.name === 'Z-A') acc.push('desc');
        else acc.push('asc');
        return acc;
      }, [] as string[]);
    dispatch(
      fetchPaintersAuthorizedPerson({
        genres: filteredGenres,
        sorting: checkedSorting,
      }),
    );
    setIsFiltered(true);
  };

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
    setIsFiltered(false);
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
      {(isLoading || isLoadingAuth) && <Preloader />}
      {(error || errorAuth) && (
        <Toast
          message={error || errorAuth}
          handleCloseToast={handleCloseToast}
          isShowToast={isShow}
        />
      )}
      {painterAuthList && isFiltered && (
        <List
          items={painterAuthList}
          renderItem={(painter: TPainters) => (
            <PainterItem painter={painter} key={painter._id} />
          )}
        />
      )}
      {painterList && !isFiltered && (
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
        sortList={sortList}
        setSortList={setSortList}
        genresList={genresList}
        setGenresList={setGenresList}
        handleSubmitFilter={handleSubmitFilter}
        handleClearFilter={handleClearFilter}
      />
    </main>
  );
};
