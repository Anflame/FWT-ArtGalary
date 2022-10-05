import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames/bind';
import Card from '../Card';
import type { TPainters } from '../../comon-types';
import img from '../../assets/images/cardImg.jpg';
import styles from './styles.module.scss';

const cx = cn.bind(styles);

type CardListProps = {
  painters: TPainters[];
};

export const CardList: FC<CardListProps> = ({ painters }) => {
  return (
    <ul className={cx('cardList')}>
      {painters.map(
        ({
          name,
          _id,
          mainPainting: {
            image: { src },
          },
        }) => (
          <li className={cx('cardListes')} key={_id}>
            <Link to={`/profile/${_id}`}>
              <Card title={name} img={src || img} id={_id} />
            </Link>
          </li>
        ),
      )}
    </ul>
  );
};
