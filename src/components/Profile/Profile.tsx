import React, { FC, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import cn from 'classnames/bind';
import AddPainting from '../AddPainting';
import Button from '../Button';
import DeleteProfile from '../DeleteProfile';
import EditProfile from '../EditProfile';
import Label from '../Label';
import List from '../List';
import Preloader from '../Preloader';
import Toast from '../Toast';
import { API } from '../../constants';
import { Context } from '../../hooks/Context';
import { useAppDispatch, useAppSelector } from '../../hooks/Redux';
import { fetchPainterProfle } from '../../store/API/painterProfile';
import { Paintings } from '../../store/types';
import { PaintingItem } from '../PaintingItem/PaintingItem';
import { ReactComponent as ArrowBack } from '../../assets/images/arrowBack.svg';
import { ReactComponent as DeleteIcon } from '../../assets/images/deleteIcon.svg';
import { ReactComponent as EditIcon } from '../../assets/images/editIcon.svg';
import { ReactComponent as IconHide } from '../../assets/images/iconHide.svg';
import { ReactComponent as IconShow } from '../../assets/images/iconShow.svg';
import { ReactComponent as PlusIcon } from '../../assets/images/plus.svg';
import { ReactComponent as WithoutPainterPhotoIcon } from '../../assets/images/withoutPainterPhoto.svg';
import styles from './styles.module.scss';

const cx = cn.bind(styles);

type ProfileProps = {
  painterMotherland: string;
};

export const Profile: FC<ProfileProps> = ({ painterMotherland }) => {
  const { theme } = Context();
  const [isShowMoreInfo, setIsShowMoreInfo] = useState(false);
  const [isShowAddPhoto, setIsShowAddPhoto] = useState<boolean>();
  const [isShowEditProfile, setIsShowEditProfile] = useState(false);
  const [isShowDeleteProfile, setIsShowDeleteProfile] = useState(false);
  const [isError, setIsError] = useState(true);
  const {
    error,
    isLoading,
    painterProfileInfo: { description, avatar, name, yearsOfLife, paintings },
  } = useAppSelector(({ painterProfile }) => painterProfile);
  const { accessToken } = useAppSelector(({ auth: { tokens } }) => tokens);
  const dispatch = useAppDispatch();
  const { painterId } = useParams();

  useEffect(() => {
    dispatch(
      fetchPainterProfle({
        url: painterId,
        accessToken,
      }),
    );
  }, []);

  return (
    <>
      {isLoading && <Preloader />}
      {error && (
        <Toast
          message={error}
          isShowToast={isError}
          handleCloseToast={() => setIsError(false)}
        />
      )}
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
            <Link to={'/'} className={cx('backLink', 'backLinkMini')}>
              <ArrowBack
                fill={theme === 'dark' ? '#DEDEDE' : '#575757'}
                className={cx('backIcon')}
              />
            </Link>
            <div className={cx('actionEditWrapp')}>
              <Button
                className="deleteBtn"
                handleClick={() => setIsShowDeleteProfile(true)}
              >
                <DeleteIcon
                  fill={theme === 'dark' ? '#DEDEDE' : '#575757'}
                  width="16px"
                  height="16px"
                />
              </Button>
              <Button
                className="deleteBtn"
                handleClick={() => setIsShowEditProfile(true)}
              >
                <EditIcon
                  fill={theme === 'dark' ? '#DEDEDE' : '#575757'}
                  width="16px"
                  height="16px"
                />
              </Button>
            </div>
          </div>
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
                  <p className={cx('withoutPainterPhotoText')}>
                    No Image uploaded
                  </p>
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
                  className={cx(
                    'painterInfoFooter',
                    'paintingInfoFooterFullSize',
                  )}
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
                      <IconShow
                        fill={theme === 'dark' ? '#DEDEDE' : '#575757'}
                      />
                    ) : (
                      <IconHide
                        fill={theme === 'dark' ? '#DEDEDE' : '#575757'}
                      />
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
        </div>
        <div className={cx('artWorks')}>
          <div className={cx('artWorksHeaderWrapp')}>
            <div className={cx('container')}>
              <h2 className={cx('artWorksHeader')}>Artworks</h2>
              <Button
                className="linkBtn"
                handleClick={() => setIsShowAddPhoto(true)}
              >
                add picture
              </Button>
            </div>
          </div>
          {paintings.length !== 0 ? (
            <List
              items={paintings}
              renderItem={(painting: Paintings) => (
                <PaintingItem painting={painting} key={painting._id} />
              )}
            />
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
        {isShowDeleteProfile && (
          <DeleteProfile
            isShowDeleteProfile={isShowDeleteProfile}
            setIsShowDeleteProfile={() => setIsShowDeleteProfile(false)}
          />
        )}
        {isShowEditProfile && (
          <EditProfile
            isShowEditProfile={isShowEditProfile}
            setIsShowEditProfile={() => setIsShowEditProfile(false)}
          />
        )}
      </section>
    </>
  );
};
