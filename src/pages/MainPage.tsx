import { FC } from 'react';
import classNames from 'classnames/bind';

import Main from '../components/Main/Main';

import styles from './styles.module.scss';

const cx = classNames.bind(styles);

const MainPage: FC = () => (
  <main className={cx('main')}>
    <Main />
  </main>
);

export default MainPage;
