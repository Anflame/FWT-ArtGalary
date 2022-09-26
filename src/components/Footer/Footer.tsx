import { FC } from 'react';
import cn from 'classnames/bind';
import Links from '../Links';
import { Context } from '../../hooks/Context';
import { ReactComponent as Facebook } from '../../assets/images/facebook.svg';
import { ReactComponent as Instagram } from '../../assets/images/instagram.svg';
import { ReactComponent as Vk } from '../../assets/images/vk.svg';
import styles from './styles.module.scss';

const cx = cn.bind(styles);

export const Footer: FC = () => {
  const { theme } = Context();

  return (
    <footer className={cx('footer')}>
      <div className={cx('container')}>
        <div className={cx('projectInfoSignature')}>
          <p className={cx('projectInfo')}>
            Проект реализован в рамках стажировки для Frontend-разработчиков от
            компании{' '}
            <Links
              href={'https://framework.team'}
              children={'FrameWork Team'}
            />
          </p>
          <p className={cx('projectSignature')}>Сидоров Денис 2022</p>
        </div>

        <div className={cx('socNetWorksList')}>
          <Links
            children={
              <Facebook fill={theme === 'dark' ? '#DEDEDE' : '#575757'} />
            }
            href="https://facebook.com/frameworkteam"
          />
          <Links
            children={<Vk fill={theme === 'dark' ? '#DEDEDE' : '#575757'} />}
            href="https://vk.com/frameworkteam"
          />
          <Links
            children={
              <Instagram fill={theme === 'dark' ? '#DEDEDE' : '#575757'} />
            }
            href="https://instagram.com/frameworkteam"
          />
        </div>
      </div>
    </footer>
  );
};
