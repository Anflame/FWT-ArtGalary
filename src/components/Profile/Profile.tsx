import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames/bind';
import AddPainting from '../AddPainting';
import Button from '../Button';
import CardList from '../CardList';
import Label from '../Label';
import { Context } from '../../hooks/Context';
import { useAppSelector } from '../../hooks/Redux';
import type { TPainters } from '../../comon-types';
import { ReactComponent as ArrowBack } from '../../assets/images/arrowBack.svg';
import { ReactComponent as IconHide } from '../../assets/images/iconHide.svg';
import { ReactComponent as IconShow } from '../../assets/images/iconShow.svg';
import { ReactComponent as PlusIcon } from '../../assets/images/plus.svg';
import { ReactComponent as WithoutPainterPhotoIcon } from '../../assets/images/withoutPainterPhoto.svg';
import styles from './styles.module.scss';

const cx = cn.bind(styles);

type ProfileProps = {
  painterImage: string;
  biography: string;
  paintings: TPainters[] | boolean;
  painterTitle: string;
  painterYearsOfLife: string;
  painterMotherland: string;
};

export const Profile: FC<ProfileProps> = ({
  painterImage,
  biography,
  paintings,
  painterTitle,
  painterYearsOfLife,
  painterMotherland,
}) => {
  const { theme } = Context();
  const [isShowMoreInfo, setIsShowMoreInfo] = useState(false);
  const { painters } = useAppSelector((state) => state.painters);
  const [isShowAddPhoto, setIsShowAddPhoto] = useState<boolean>();

  return (
    <section className={cx('profile')}>
      <div className={cx('container')}>
        <div className={cx('actionWrapp')}>
          <Link to={'/'} className={cx('backLink')}>
            <ArrowBack
              fill={theme === 'dark' ? '#DEDEDE' : '#575757'}
              className={cx('backIcon')}
            />
            {'back'}
          </Link>
        </div>
        <div className={cx('painter')}>
          <div className={cx('painterInfo')}>
            {painterImage ? (
              <img
                src={painterImage}
                alt="painterPhoto"
                className={cx('painterImg')}
              />
            ) : (
              <div className={cx('painterImg', 'withoutPainterPhotoWrapp')}>
                <WithoutPainterPhotoIcon
                  fill="#DEDEDE"
                  className={cx('withoutPainterPhotoIcon')}
                />
                <p className={cx('withoutPainterPhotoText')}>
                  No Image uploaded
                </p>
              </div>
            )}
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
                  <IconShow fill={theme === 'dark' ? '#DEDEDE' : '#575757'} />
                ) : (
                  <IconHide fill={theme === 'dark' ? '#DEDEDE' : '#575757'} />
                )}
              </div>
              <ul className={cx('paintingsList')}>
                {paintings &&
                  typeof paintings !== 'boolean' &&
                  paintings.map(({ mainPainting: { _id, name } }) => (
                    <li key={_id} className={cx('paintingsListes')}>
                      <Label children={name} isDelAllowed={false} />
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className={cx('artWorks')}>
        <div className={cx('artWorksHeaderWrapp')}>
          <h2 className={cx('artWorksHeader')}>Artworks</h2>
          {paintings && (
            <Button
              className="linkBtn"
              handleClick={() => setIsShowAddPhoto(true)}
            >
              add picture
            </Button>
          )}
        </div>
        {paintings ? (
          <CardList painters={painters} />
        ) : (
          <div className={cx('withoutPaintingsWrapp')}>
            <div className={cx('container')}>
              <div className={cx('addPainting')}>
                <WithoutPainterPhotoIcon
                  fill="#DEDEDE"
                  className={cx('addPhotoIcon')}
                />
                <button
                  className={cx('addPaintingBtn')}
                  onClick={() => setIsShowAddPhoto(true)}
                >
                  <PlusIcon fill="#DEDEDE" />
                </button>
              </div>
              <h3 className={cx('withOutPainingsText')}>
                The paintings of this artist have not been uploaded yet.
              </h3>
            </div>
          </div>
        )}
      </div>
      {isShowAddPhoto && (
        <AddPainting
          isShowAddPhoto={isShowAddPhoto}
          setIsShowAddPhoto={setIsShowAddPhoto}
        />
      )}
    </section>
  );
};
