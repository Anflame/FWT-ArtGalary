import { FC } from 'react';
import cn from 'classnames/bind';
import styles from './styles.module.scss';
import { socNetworks } from '../constants';
import Links from '../Links';
import SocNetWorks from '../SocNetWorks';

const cx = cn.bind(styles);

export const Footer: FC = () => (
  <footer className={cx('footer')}>
    <div className={cx('container')}>
      <div className={cx('projectInfoSignature')}>
        <p className={cx('projectInfo')}>
          Проект реализован в рамках стажировки для Frontend-разработчиков от
          компании{' '}
          <Links href={'https://framework.team'} children={'FrameWork Team'} />
        </p>
        <p className={cx('projectSignature')}>Сидоров Денис 2022</p>
      </div>

      <ul className={cx('socNetWorksList')}>
        {socNetworks.map(({ href, title, id }) => (
          <li className={cx('socNetWorksListes')} key={id}>
            <SocNetWorks href={href} title={title} />
          </li>
        ))}
      </ul>
    </div>
  </footer>
);
