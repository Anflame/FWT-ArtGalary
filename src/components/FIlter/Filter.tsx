import React, { FC, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import cn from 'classnames/bind';

import Button from '../../ui/Button';

import { usePressEscape } from '../../hooks/usePressEscape';
import { useAppSelector } from '../../hooks/useRedux';
import { useThemeContext } from '../../hooks/useThemeContext';

import { modalNode } from '../../constants';

import type { Listes } from '../../comon-types';
import { BtnVariants } from '../../variants';

import { ReactComponent as IconClose } from '../../assets/images/iconClose.svg';

import styles from './styles.module.scss';

const cx = cn.bind(styles);

type FilterProps = {
  isShowFilter: boolean;
  handleChangeShowFilter: (isShowFilter: boolean) => void;
  sortList: Listes[];
  genresList: Listes[];
  handleSubmitFilter: () => void;
  handleClearFilter: () => void;
  handleChangeChecked: (event: string, type: string) => void;
};

const Filter: FC<FilterProps> = ({
  isShowFilter,
  handleChangeShowFilter,
  sortList,
  genresList,
  handleSubmitFilter,
  handleClearFilter,
  handleChangeChecked,
}) => {
  const [isShowGenres, setIsShowGenres] = useState(false);
  const [isShowSortList, setIsShowSortList] = useState(false);
  const { theme } = useThemeContext();
  const { isLoading, error } = useAppSelector(({ genresState }) => genresState);

  useEffect(() => {
    usePressEscape(handleChangeShowFilter, isShowFilter);
  }, []);

  return createPortal(
    <div
      className={cx('filterWrapp', isShowFilter && 'showFilterWrapp')}
      onClick={() => handleChangeShowFilter(false)}
    >
      <div
        className={cx(
          'filterWrappContent',
          isShowFilter && 'showFilterWrappContent',
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={cx('filterItemsWrapp')}>
          <div
            className={cx('headingWrapp')}
            onClick={() => setIsShowGenres(!isShowGenres)}
          >
            <h4 className={cx('filterHeading')}>Genres</h4>
            <p className={cx('showIcon')}>{!isShowGenres ? '+' : '-'}</p>
          </div>
          {!isLoading && !error && isShowGenres && (
            <ul className={cx('list')}>
              {genresList.map(({ _id, isChecked, name }) => (
                <li
                  className={cx(
                    'listes',
                    'genresListes',
                    isChecked && 'checked',
                  )}
                  key={_id}
                  title={`${name}`}
                  onClick={() => handleChangeChecked(_id, 'genres')}
                >
                  {name}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className={cx('filterItemsWrapp')}>
          <div
            className={cx('headingWrapp')}
            onClick={() => setIsShowSortList(!isShowSortList)}
          >
            <h4 className={cx('filterHeading')}>Sort by</h4>
            <p className={cx('showIcon')}>{!isShowSortList ? '+' : '-'}</p>
          </div>
          {isShowSortList && (
            <ul className={cx('list', 'sortList')}>
              {sortList.map(({ _id, name, isChecked }) => (
                <li
                  className={cx('listes', isChecked && 'checked')}
                  key={_id}
                  title={`${name}`}
                  onClick={() => handleChangeChecked(_id, 'sort')}
                >
                  {name}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className={cx('submitWrapp')}>
          <Button variant={BtnVariants.LINK} onClick={handleSubmitFilter}>
            show the result
          </Button>
          <Button variant={BtnVariants.LINK} onClick={handleClearFilter}>
            clear
          </Button>
        </div>
        <IconClose
          fill={theme === 'dark' ? '#DEDEDE' : '#575757'}
          onClick={() => handleChangeShowFilter(false)}
          className={cx('iconClose')}
        />
      </div>
    </div>,
    modalNode,
  );
};

export default Filter;
