import { FC } from 'react';
import cn from 'classnames/bind';
import Card from '../Card';
import type { CardProps } from '../../comon-types';
import styles from './styles.module.scss';

const cx = cn.bind(styles);

type CardListProps = {
  painters: CardProps[];
};

export const CardList: FC<CardListProps> = ({ painters }) => (
  <ul className={cx('cardList')}>
    {painters.map(({ title, id, img }) => (
      <li className={cx('cardListes')} key={id}>
        <Card title={title} img={img} id={id} />
      </li>
    ))}
  </ul>
);
