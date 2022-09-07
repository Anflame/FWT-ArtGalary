import React, { FC, useState } from 'react';
import cn from 'classnames/bind';
import styles from './styles.module.scss';
import { defaultContext, ThemeContext } from '../utils/ThemeContext';
import { painters } from '../constants';
import Footer from '../Footer';
import Header from '../Header';
import CardList from '../CardList';

const cx = cn.bind(styles);

export const App: FC = () => {
  const [theme, setTheme] = useState(defaultContext.theme);
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
      }}
    >
      <Header />
      <main className={cx('main')}>
        <CardList painters={painters} />
      </main>
      <Footer />
    </ThemeContext.Provider>
  );
};
