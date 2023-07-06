import React from 'react';
import cn from 'classnames/bind';

import styles from './styles.module.scss';

const cx = cn.bind(styles);

type ListProps<T> = {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
};

const List = <T,>(props: ListProps<T>) => {
  return <ul className={cx('list')}>{props.items.map(props.renderItem)}</ul>;
};

export default List;
