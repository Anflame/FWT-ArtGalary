import { FC, ReactNode } from 'react';
import cn from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './styles.module.scss';

const cx = cn.bind(styles);

interface LinksProps {
  href: string;
  children: ReactNode;
  args?: HTMLAnchorElement;
}

export const Links: FC<LinksProps> = ({ href, children, ...args }) => (
  <Link className={cx('link')} to={href} {...args}>
    {children}
  </Link>
);
