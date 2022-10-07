import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames/bind';
import Card from '../Card';
import { API } from '../../constants';
import { Paintings, TPainterProfile, TPainters } from '../../store/types';
import styles from './styles.module.scss';

const cx = cn.bind(styles);

type CardListProps = {
  listes: Paintings[] | TPainters[];
};

export const CardList: FC<CardListProps> = ({ listes }) => {
  return (
    <ul className={cx('cardList')}>
      {listes.map(
        ({
          name,
          _id,
          mainPainting: {
            image: { src },
          },
          yearsOfLife,
        }) => (
          <li className={cx('cardListes')} key={_id}>
            <Link to={`/profile/${_id}`}>
              <Card title={name} img={API + src} id={_id} year={yearsOfLife} />
            </Link>
          </li>
        ),
      )}
    </ul>
  );
};
