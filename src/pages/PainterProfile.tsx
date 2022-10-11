import React from 'react';
import cn from 'classnames/bind';
import Profile from '../components/Profile';
import styles from './styles.module.scss';

const cx = cn.bind(styles);

export const PainterProfile = () => (
  <main className={cx('profile')}>
    <Profile painterMotherland={'Feodosia, Russian Empire'} />
  </main>
);
