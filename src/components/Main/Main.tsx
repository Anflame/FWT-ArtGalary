import { FC, useEffect, useState } from 'react';
import cn from 'classnames/bind';
import Cookies from 'js-cookie';

import { fetchPaintersAuthorizedPerson } from '../../store/API/painters';
import { clearPaintersError } from '../../store/painters/slice';
import { TPainters } from '../../store/types';

import Button from '../../ui/Button';
import EditProfile from '../../ui/EditProfile';
import List from '../../ui/List';
import Preloader from '../../ui/Preloader';
import Search from '../../ui/Search';
import Filter from '../FIlter';
import PainterItem from '../PainterItem';

import { useShowError } from '../../hooks/useErrorContext';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { useSortFilter } from '../../hooks/useSortFilter';
import { useThemeContext } from '../../hooks/useThemeContext';
import { useUnScroll } from '../../hooks/useUnScroll';

import { BtnVariants } from '../../variants';

import { ReactComponent as FilterIcon } from '../../assets/images/filterIcon.svg';

import styles from './styles.module.scss';

const cx = cn.bind(styles);

const Main: FC = () => {
  const { theme } = useThemeContext();

  const {
    painterList,
    meta: { count, perPage, pageNumber },
    isLoading,
    error,
  } = useAppSelector(({ painters }) => painters);

  const { isAuth: stateAuth } = useAppSelector(({ auth }) => auth);
  const dispatch = useAppDispatch();

  const [isShowAddProfile, setIsShowAddProfile] = useState(false);

  const cookieTokens = Cookies.get('token');
  const isAuth = stateAuth && cookieTokens;

  useShowError(error, clearPaintersError);

  const {
    genresList,
    sortList,
    handleSubmitFilter,
    handleClearFilter,
    handleSubmitSearch,
    isShowFilter,
    setIsShowFilter,
    handleChangeChecked,
  } = useSortFilter();

  useEffect(() => {
    useUnScroll(isShowFilter || isShowAddProfile);
  }, [isShowFilter, isShowAddProfile]);

  const loadMore = () => {
    dispatch(
      fetchPaintersAuthorizedPerson({
        perPage: perPage + 6 < count ? perPage + 6 : count,
      }),
    );
  };

  return (
    <>
      {isAuth && (
        <div className={cx('editWrapp')}>
          <Button
            variant={BtnVariants.LINK}
            handleClick={() => setIsShowAddProfile(true)}
          >
            add artist
          </Button>
          <div className={cx('searchWrapp')}>
            <Search
              handleSubmitForm={handleSubmitSearch}
              handleClear={handleClearFilter}
            />
            <FilterIcon
              fill={theme === 'dark' ? '#DEDEDE' : '#575757'}
              onClick={() => setIsShowFilter(!isShowFilter)}
              className={cx('filterIcon')}
            />
          </div>
        </div>
      )}
      {isLoading && <Preloader />}
      {painterList && (
        <List
          items={painterList}
          renderItem={(painter: TPainters) => (
            <PainterItem painter={painter} key={painter._id} />
          )}
        />
      )}
      {perPage * pageNumber < count && isAuth && (
        <div className={cx('loadMoreWrapp')}>
          <button className={cx('loadMoreBtn')} onClick={loadMore}>
            load more
          </button>
        </div>
      )}
      <EditProfile
        isShowEditProfile={isShowAddProfile}
        handleChangeShowEditProfile={() => setIsShowAddProfile(false)}
      />
      <Filter
        isShowFilter={isShowFilter}
        handleChangeShowFilter={() => setIsShowFilter(false)}
        sortList={sortList}
        genresList={genresList}
        handleSubmitFilter={handleSubmitFilter}
        handleClearFilter={handleClearFilter}
        handleChangeChecked={handleChangeChecked}
      />
    </>
  );
};

export default Main;
