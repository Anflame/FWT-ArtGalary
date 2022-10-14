import React, { FC, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import cn from 'classnames/bind';
import { genres, modalNode, sort } from '../../constants';
import { usePressEscape } from '../../hooks/usePressEscape';
import { useUnScroll } from '../../hooks/useScroll';
import { useThemeContext } from '../../hooks/useThemeContext';
import { ReactComponent as IconClose } from '../../assets/images/iconClose.svg';
import { ReactComponent as MinusIcon } from '../../assets/images/minus.svg';
import { ReactComponent as PlusIcon } from '../../assets/images/plus.svg';
import styles from './styles.module.scss';

const cx = cn.bind(styles);

type FilterProps = {
  isShowFilter: boolean;
  setIsShowFilter: (isShowFilter: boolean) => void;
};

export const Filter: FC<FilterProps> = ({ isShowFilter, setIsShowFilter }) => {
  const [isShowGenres, setIsShowGenres] = useState(false);
  const [isShowSortList, setIsShowSortList] = useState(false);
  const [genresList, setGenresList] = useState(genres);
  const [sortList, setSortList] = useState(sort);
  const { theme } = useThemeContext();

  const handleChangeChecked = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
    type: string,
  ) => {
    if (type === 'sort') {
      setSortList(
        sortList.map((el) => {
          if (el.id === +e.currentTarget.title) el.isChecked = !el.isChecked;
          else if (el.isChecked) el.isChecked = !el.isChecked;
          return el;
        }),
      );
    }
    if (type === 'genres') {
      setGenresList(
        genresList.map((el) => {
          if (el.id === +e.currentTarget.title) el.isChecked = !el.isChecked;
          return el;
        }),
      );
    }
  };

  useEffect(() => {
    useUnScroll(isShowFilter);
    usePressEscape(setIsShowFilter, isShowFilter);
  }, [isShowFilter]);

  return createPortal(
    <div
      className={cx('filterWrapp', isShowFilter && 'showFilterWrapp')}
      onClick={() => setIsShowFilter(false)}
    >
      <div
        className={cx(
          'filterWrappContent',
          isShowFilter && 'showFilterWrappContent',
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={cx('genresWrapp')}>
          <div className={cx('headingWrapp')}>
            <h4 className={cx('filterHeading')}>Genres</h4>
            {!isShowGenres ? (
              <PlusIcon
                className={cx('showIcon')}
                onClick={() => setIsShowGenres(true)}
                fill={theme === 'dark' ? '#DEDEDE' : '#575757'}
              />
            ) : (
              <MinusIcon
                className={cx('showIcon')}
                onClick={() => setIsShowGenres(false)}
                fill={theme === 'dark' ? '#DEDEDE' : '#575757'}
              />
            )}
          </div>
          {isShowGenres && (
            <ul className={cx('list')}>
              {genresList.map(({ id, isChecked, name }) => (
                <li
                  className={cx('listes', isChecked && 'checked')}
                  key={id}
                  title={`${id}`}
                  onClick={(e) => handleChangeChecked(e, 'genres')}
                >
                  {name}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className={cx('sortWrapp')}>
          <div className={cx('headingWrapp')}>
            <h4 className={cx('filterHeading')}>Sort by</h4>
            {!isShowSortList ? (
              <PlusIcon
                className={cx('showIcon')}
                onClick={() => setIsShowSortList(true)}
                fill={theme === 'dark' ? '#DEDEDE' : '#575757'}
              />
            ) : (
              <MinusIcon
                className={cx('showIcon')}
                onClick={() => setIsShowSortList(false)}
                fill={theme === 'dark' ? '#DEDEDE' : '#575757'}
              />
            )}
          </div>
          {isShowSortList && (
            <ul className={cx('list')}>
              {sortList.map(({ id, name, isChecked }) => (
                <li
                  className={cx('listes', isChecked && 'checked')}
                  key={id}
                  title={`${id}`}
                  onClick={(e) => handleChangeChecked(e, 'sort')}
                >
                  {name}
                </li>
              ))}
            </ul>
          )}
        </div>
        <IconClose
          fill={theme === 'dark' ? '#DEDEDE' : '#575757'}
          onClick={() => setIsShowFilter(false)}
          className={cx('iconClose')}
        />
      </div>
    </div>,
    modalNode,
  );
};
