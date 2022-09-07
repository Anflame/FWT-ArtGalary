import { FC } from 'react';
import cn from 'classnames/bind';
import styles from './styles.module.scss';
import arrowLeft from '../assets/images/arrowLeft.svg';
import arrowLeftLight from '../assets/images/arrowLeftLight.svg';
import arrowRight from '../assets/images/arrowRight.svg';
import arrowRightLight from '../assets/images/arrowRightLight.svg';
import { pages } from '../constants';
import { Context } from '../hooks/Context';

const cx = cn.bind(styles);

export type PaginationProps = {
  currentPage: number;
  maxPages: number;
  setCurrentPage: (page: number) => void;
};

export const Pagination: FC<PaginationProps> = ({
  currentPage,
  maxPages,
  setCurrentPage,
}) => {
  const { theme } = Context();

  if (pages.length !== 0) {
    pages.splice(0, 9);
  }
  for (let i = 1; i <= maxPages; i += 1) {
    pages.push(i);
  }

  return (
    <ul className={cx('pages')}>
      <img
        className={cx('arrow')}
        src={theme === 'dark' ? arrowLeft : arrowLeftLight}
        alt="arrowLeft"
        onClick={() => setCurrentPage(currentPage - 1)}
        key={10}
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
        )
      )}
      <img
        src={theme === 'dark' ? arrowRight : arrowRightLight}
        alt="arrowRight"
        className={cx('arrow')}
        onClick={() => setCurrentPage(currentPage + 1)}
        key={12}
      />
    </ul>
  );
};
