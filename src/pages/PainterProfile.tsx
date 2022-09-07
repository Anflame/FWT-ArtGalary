import React from 'react';
import cn from 'classnames/bind';
import { useParams } from 'react-router';
import styles from './styles.module.scss';
import Profile from '../Profile';
import { biography, paintings } from '../constants';

const cx = cn.bind(styles);

export const PainterProfile = () => {
  const { painterId } = useParams();

  return (
    <main className={cx('profile')}>
      <Profile
        paintings={paintings}
        biography={biography}
        painterYearsOfLife={'29 july 1817 – 2 may 1900'}
        painterMotherland={'Feodosia, Russian Empire'}
        painterTitle={'Ivan Aivazovsky'}
      />
    </main>
  );
};
