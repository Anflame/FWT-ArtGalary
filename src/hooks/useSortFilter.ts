import { FormEvent, useEffect, useState } from 'react';
import Cookies from 'js-cookie';

import {
  fetchPainters,
  fetchPaintersAuthorizedPerson,
} from '../store/API/painters';

import { useAppDispatch, useAppSelector } from './useRedux';
import { useSort } from './useSort';

import { COUNT_PAINTERS_MAIN_PAGE, sortParams } from '../constants';

import { Listes } from '../comon-types';

export const useSortFilter = () => {
  const [genresList, setGenresList] = useState<Listes[]>([]);
  const [sortList, setSortList] = useState(sortParams);
  const [isShowFilter, setIsShowFilter] = useState(false);
  const { genres } = useAppSelector(({ genresState }) => genresState);
  const {
    meta: { perPage },
  } = useAppSelector(({ painters }) => painters);
  const { isAuth: authState } = useAppSelector(({ auth }) => auth);
  const dispatch = useAppDispatch();
  const isAuth = authState && Cookies.get('token');

  const filteredFilter = () =>
    genresList
      .filter(({ isChecked }) => isChecked)
      .reduce((acc, curr) => {
        acc.push(curr._id);
        return acc;
      }, [] as string[]);

  const filteredSort = () =>
    sortList
      .filter(({ isChecked }) => isChecked)
      .reduce((acc, curr) => {
        if (curr.name === 'Z-A') acc.push('desc');
        else acc.push('asc');
        return acc;
      }, [] as string[]);

  const clearFilters = () => {
    setGenresList(
      genresList.map((el) => ({
        ...el,
        isChecked: false,
      })),
    );
    setSortList(
      sortList.map((el) => ({
        ...el,
        isChecked: false,
      })),
    );
  };

  const handleSubmitSearch = (value: string, e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      fetchPaintersAuthorizedPerson({
        genres: filteredFilter(),
        sorting: filteredSort(),
        perPage: perPage || COUNT_PAINTERS_MAIN_PAGE,
        name: value,
      }),
    );
  };

  const handleSubmitFilter = () => {
    dispatch(
      fetchPaintersAuthorizedPerson({
        genres: filteredFilter(),
        sorting: filteredSort(),
        perPage: perPage || COUNT_PAINTERS_MAIN_PAGE,
      }),
    );
  };

  const handleChangeChecked = (id: string, type: string) => {
    if (type === 'sort') {
      setSortList(useSort(sortList, id, true));
    }
    if (type === 'genres') {
      setGenresList(useSort(genresList, id));
    }
  };

  const fetchPaintersBy = () => {
    if (!Cookies.get('token'))
      dispatch(fetchPainters(COUNT_PAINTERS_MAIN_PAGE));
    else
      dispatch(
        fetchPaintersAuthorizedPerson({
          perPage: perPage || COUNT_PAINTERS_MAIN_PAGE,
          genres: filteredFilter(),
          sorting: filteredSort(),
        }),
      );
  };

  const handleClearFilter = () => {
    clearFilters();
    fetchPaintersBy();
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
    fetchPaintersBy();
  }, [isAuth]);

  return {
    genresList,
    sortList,
    handleSubmitSearch,
    handleSubmitFilter,
    handleClearFilter,
    isShowFilter,
    setIsShowFilter,
    handleChangeChecked,
  };
};
