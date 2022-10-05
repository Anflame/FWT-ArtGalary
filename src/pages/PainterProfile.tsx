import React from 'react';
import cn from 'classnames/bind';
import Profile from '../components/Profile';
import { biography } from '../constants';
import painterPhoto from '../assets/images/painterImg.png';
import styles from './styles.module.scss';

const cx = cn.bind(styles);

export const PainterProfile = () => (
  <main className={cx('profile')}>
    <Profile
      painterImage={painterPhoto}
      paintings={false}
      biography={biography}
      painterYearsOfLife={'29 july 1817 – 2 may 1900'}
      painterMotherland={'Feodosia, Russian Empire'}
      painterTitle={'Ivan Aivazovsky'}
    />
  </main>
);
