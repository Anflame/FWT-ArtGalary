import React from 'react';
import cn from 'classnames/bind';
import CardList from '../components/CardList';
import { painters } from '../constants';
import styles from './styles.module.scss';

const cx = cn.bind(styles);

export const PaintersList = () => (
  <main className={cx('main')}>
    <CardList painters={painters} />
  </main>
);
