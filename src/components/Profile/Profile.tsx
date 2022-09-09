import React, { FC, useState } from 'react';
import cn from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './styles.module.scss';
import Label from '../Label';
import CardList from '../CardList';
import painterPhoto from '../../assets/images/painterImg.png';
import type { Painters } from '../../comon-types';
import { Context } from '../../hooks/Context';
import {
  ArrowBack,
  MultiSelectIcon,
  MultiSelectIconShow,
} from '../../assets/icons';
import { painters } from '../../constants';

const cx = cn.bind(styles);

type ProfileProps = {
  biography: string;
  paintings: Painters[];
  painterTitle: string;
  painterYearsOfLife: string;
  painterMotherland: string;
};

export const Profile: FC<ProfileProps> = ({
  biography,
  paintings,
  painterTitle,
  painterYearsOfLife,
  painterMotherland,
}) => {
  const { theme } = Context();
  const [isShowMoreInfo, setIsShowMoreInfo] = useState(false);

  return (
    <section className={cx('profile')}>
      <div className={cx('container')}>
        <div className={cx('turnBack')}>
          <ArrowBack
            width={16}
            height={10}
            fill={theme === 'dark' ? '#DEDEDE' : '#575757'}
          />
          <Link to={'/'} className={cx('backLink')}>
            {'back'}
          </Link>
        </div>
        <div className={cx('painter')}>
          <div className={cx('painterInfo')}>
            <img
              src={cx(painterPhoto)}
              alt="painterPhoto"
              className={cx('painterImg')}
            />
            <div className={cx('painterInfoHeader')}>
              <p className={cx('painterLabelList', 'painterLabelLeft')}>
                {painterYearsOfLife}
              </p>
              <p className={cx('painterLabelList', 'painterLabelRight')}>
                {painterMotherland}
              </p>
              <h2 className={cx('painterHeading')}>{painterTitle}</h2>
            </div>
            <div className={cx('painterInfoFooter')}>
              <div className={cx('painterBiography')}>
                {!isShowMoreInfo && biography.length < 265
                  ? biography
                  : `${biography.substring(0, 265)}...`}
                {isShowMoreInfo && biography}
              </div>
              <div
                className={cx('readMoreWrapp')}
                onClick={() => setIsShowMoreInfo(!isShowMoreInfo)}
              >
                <button className={cx('readMoreBtn')}>read more</button>
                {isShowMoreInfo ? (
                  <MultiSelectIconShow
                    width={12}
                    height={6}
                    fill={theme === 'dark' ? '#DEDEDE' : '#575757'}
                  />
                ) : (
                  <MultiSelectIcon
                    width={12}
                    height={6}
                    fill={theme === 'dark' ? '#DEDEDE' : '#575757'}
                  />
                )}
              </div>
              <ul className={cx('paintingsList')}>
                {paintings.map(({ id, title }) => (
                  <li key={id} className={cx('paintingsListes')}>
                    <Label children={title} isDelAllowed={false} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className={cx('artWorks')}>
        <h2 className={cx('artWorksHeader')}>Artworks</h2>
        <CardList painters={painters} />
      </div>
    </section>
  );
};
