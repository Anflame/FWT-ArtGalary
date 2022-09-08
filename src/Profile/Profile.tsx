import React, { FC, useState } from 'react';
import cn from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './styles.module.scss';
import { Painters } from '../comon-types';
import { Context } from '../hooks/Context';
import iconShow from '../assets/images/multiSelectIcon.svg';
import icon from '../assets/images/multiSelectIconShow.svg';
import iconShowLight from '../assets/images/multiSelectIconLight.svg';
import iconLight from '../assets/images/multiSelectIconShowLight.svg';
import Label from '../Label';
import CardList from '../CardList';
import { painters } from '../constants';
import arrowBack from '../assets/images/arrowBack.svg';
import arrowBackLight from '../assets/images/arrowBackLight.svg';
import painterPhoto from '../assets/images/painterImg.png';

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
          <img src={theme === 'dark' ? arrowBack : arrowBackLight} alt="back" />
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
                {theme === 'dark' ? (
                  <img
                    className={cx('readMoreIcon')}
                    src={isShowMoreInfo ? icon : iconShow}
                    alt="showIcon"
                  />
                ) : (
                  <img
                    className={cx('readMoreIcon')}
                    src={isShowMoreInfo ? iconLight : iconShowLight}
                    alt="showIcon"
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
