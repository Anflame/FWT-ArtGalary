import React, { FC, useState } from 'react';
import cn from 'classnames/bind';
import { API } from '../../constants';
import { useAppSelector } from '../../hooks/useRedux';
import { useThemeContext } from '../../hooks/useThemeContext';
import Label from '../../ui/Label';
import { ReactComponent as IconHide } from '../../assets/images/iconHide.svg';
import { ReactComponent as IconShow } from '../../assets/images/iconShow.svg';
import { ReactComponent as WithoutPainterPhotoIcon } from '../../assets/images/withoutPainterPhoto.svg';
import styles from './styles.module.scss';

const cx = cn.bind(styles);

type PainterInfoProps = {
  painterMotherland: string;
};

export const PainterInfo: FC<PainterInfoProps> = ({ painterMotherland }) => {
  const { theme } = useThemeContext();
  const [isShowMoreInfo, setIsShowMoreInfo] = useState(false);
  const { avatar, yearsOfLife, description, paintings, name, genres } =
    useAppSelector(
      ({ painterProfile: { painterProfileInfo } }) => painterProfileInfo,
    );

  return (
    <div className={cx('painter')}>
      <div className={cx('painterInfo')}>
        {avatar.src ? (
          <img
            src={API + avatar.src}
            alt="painterPhoto"
            className={cx('painterImg')}
          />
        ) : (
          <div className={cx('painterImg', 'withoutPainterPhotoWrapp')}>
            <WithoutPainterPhotoIcon
              fill="#DEDEDE"
              className={cx('withoutPainterPhotoIcon')}
            />
            <p className={cx('withoutPainterPhotoText')}>No Image uploaded</p>
          </div>
        )}
        <div className={cx('painterInfoHeader')}>
          <p className={cx('painterLabelList', 'painterLabelLeft')}>
            {yearsOfLife}
          </p>
          <p className={cx('painterLabelList', 'painterLabelRight')}>
            {painterMotherland}
          </p>
          <h2 className={cx('painterHeading')}>{name}</h2>

          <div
            className={cx('painterInfoFooter', 'paintingInfoFooterFullSize')}
          >
            <div className={cx('painterBiography')}>
              {!isShowMoreInfo && description.length < 265
                ? description
                : `${description.substring(0, 265)}...`}
              {isShowMoreInfo && description}
            </div>
            <div
              className={cx('readMoreWrapp')}
              onClick={() => setIsShowMoreInfo(!isShowMoreInfo)}
            >
              <button className={cx('readMoreBtn')}>read more</button>
              {isShowMoreInfo ? (
                <IconShow fill={theme === 'dark' ? '#DEDEDE' : '#575757'} />
              ) : (
                <IconHide fill={theme === 'dark' ? '#DEDEDE' : '#575757'} />
              )}
            </div>
            <ul className={cx('paintingsList')}>
              {genres.map(({ _id, name: painingName }) => (
                <li key={_id} className={cx('paintingsListes')}>
                  <Label children={painingName} isDelAllowed={false} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className={cx('painterInfoFooter')}>
        <div className={cx('painterBiography')}>
          {!isShowMoreInfo && description.length < 265
            ? description
            : `${description.substring(0, 265)}...`}
          {isShowMoreInfo && description}
        </div>
        <div
          className={cx('readMoreWrapp')}
          onClick={() => setIsShowMoreInfo(!isShowMoreInfo)}
        >
          <button className={cx('readMoreBtn')}>read more</button>
          {isShowMoreInfo ? (
            <IconShow fill={theme === 'dark' ? '#DEDEDE' : '#575757'} />
          ) : (
            <IconHide fill={theme === 'dark' ? '#DEDEDE' : '#575757'} />
          )}
        </div>
        <ul className={cx('paintingsList')}>
          {paintings &&
            typeof paintings !== 'boolean' &&
            paintings.map(({ _id, name: painingName }) => (
              <li key={_id} className={cx('paintingsListes')}>
                <Label children={painingName} isDelAllowed={false} />
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};
