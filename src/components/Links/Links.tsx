import { FC, ReactNode } from 'react';
import cn from 'classnames/bind';
import styles from './styles.module.scss';

const cx = cn.bind(styles);

type LinksProps = {
  href: string;
  children: ReactNode;
  args?: HTMLAnchorElement;
};

export const Links: FC<LinksProps> = ({ href, children, ...args }) => (
  <a className={cx('link')} href={href} {...args}>
    {children}
  </a>
);
