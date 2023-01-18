import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import cn from 'classnames/bind';
import Profile from '../components/Profile';
import { useAppSelector } from '../hooks/useRedux';
import styles from './styles.module.scss';

const cx = cn.bind(styles);

export const ProfilePage = () => {
  const { isAuth } = useAppSelector(({ auth }) => auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) navigate('/');
  }, [isAuth]);

  return (
    <main className={cx('profile')}>
      <Profile painterMotherland={'Feodosia, Russian Empire'} />
    </main>
  );
};
