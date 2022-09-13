import { FC } from 'react';
import cn from 'classnames/bind';
import styles from './styles.module.scss';
import Card from '../Card';
import type { CardProps } from '../../comon-types';

const cx = cn.bind(styles);

type CardListProps = {
  painters: CardProps[];
};

export const CardList: FC<CardListProps> = ({ painters }) => (
  <ul className={cx('cardList')}>
    {painters.map(({ name, title, id, img }) => (
      <li className={cx('cardListes')} key={id}>
        <Card title={title} name={name} img={img} id={id} />
      </li>
    ))}
  </ul>
);
