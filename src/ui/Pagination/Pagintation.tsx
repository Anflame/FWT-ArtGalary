import { FC } from 'react';
import cn from 'classnames/bind';

import { useThemeContext } from '../../hooks/useThemeContext';

import { pages } from '../../constants';

import { ReactComponent as ArrowLeft } from '../../assets/images/arrowLeft.svg';
import { ReactComponent as ArrowRight } from '../../assets/images/arrowRight.svg';

import styles from './styles.module.scss';

const cx = cn.bind(styles);

export type PaginationProps = {
  currentPage: number;
  maxPages: number;
  setCurrentPage: (page: number) => void;
};

const Pagination: FC<PaginationProps> = ({
  currentPage,
  maxPages,
  setCurrentPage,
}) => {
  const { theme } = useThemeContext();

  if (pages.length !== 0) {
    pages.splice(0);
  }
  for (let i = 1; i <= maxPages; i += 1) {
    pages.push(i);
  }

  return (
    <ul className={cx('pages')}>
      <ArrowLeft
        fill={theme === 'dark' ? '#DEDEDE' : '#575757'}
        onClick={() => setCurrentPage(currentPage - 1)}
        key={pages.length + 1}
      />
      {pages.map((page, id) =>
        pages.length <= 4 ? (
          <li
            className={cx('page', currentPage === id + 1 && 'currentPage')}
            key={id}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </li>
        ) : (
          <>
            {((page === currentPage - 2 && currentPage - 2 > 1) ||
              (currentPage === maxPages && page === currentPage - 2)) && (
              <li className={cx('page', 'ellipsis', 'first')} key={page}>
                ...
              </li>
            )}
            {(page === currentPage ||
              page === currentPage - 1 ||
              page === currentPage + 1 ||
              page === maxPages ||
              page === 1 ||
              (currentPage === 1 && page <= currentPage + 2) ||
              (currentPage === maxPages && page >= currentPage - 2)) && (
              <li
                className={cx('page', currentPage === id + 1 && 'currentPage')}
                key={id}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </li>
            )}
            {((currentPage === 1 && page === currentPage + 2) ||
              (currentPage !== 1 &&
                currentPage !== maxPages &&
                currentPage + 2 < maxPages &&
                page === currentPage + 2)) && (
              <li className={cx('page', 'ellipsis', 'second')} key={page}>
                ...
              </li>
            )}
          </>
        ),
      )}
      <ArrowRight
        fill={theme === 'dark' ? '#DEDEDE' : '#575757'}
        onClick={() => setCurrentPage(currentPage + 1)}
        key={pages.length + 3}
      />
    </ul>
  );
};

export default Pagination;
