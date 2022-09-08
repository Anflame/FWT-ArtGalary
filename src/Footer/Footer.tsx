import { FC, useContext } from 'react';
import cn from 'classnames/bind';
import styles from './styles.module.scss';
import Links from '../Links';
import { Facebook, Instagram, Vk } from '../assets/icons';
import { ThemeContext } from '../utils/ThemeContext';

const cx = cn.bind(styles);

export const Footer: FC = () => {
  const { theme } = useContext(ThemeContext);

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
              <Facebook
                fill={theme === 'dark' ? '#DEDEDE' : '#575757'}
                width={24}
                height={24}
              />
            }
            href="https://facebook.com/frameworkteam"
          />
          <Links
            children={
              <Vk
                fill={theme === 'dark' ? '#DEDEDE' : '#575757'}
                width={24}
                height={24}
              />
            }
            href="https://vk.com/frameworkteam"
          />
          <Links
            children={
              <Instagram
                fill={theme === 'dark' ? '#DEDEDE' : '#575757'}
                width={24}
                height={24}
              />
            }
            href="https://instagram.com/frameworkteam"
          />
        </div>
      </div>
    </footer>
  );
};
