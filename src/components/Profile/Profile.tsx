import React, { FC, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import cn from 'classnames/bind';
import PainterArtWorks from '../PainterArtworks';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { useThemeContext } from '../../hooks/useThemeContext';
import { useUnScroll } from '../../hooks/useUnScroll';
import { fetchPainterProfle } from '../../store/API/painterProfile';
import Button from '../../ui/Button';
import DeleteProfile from '../../ui/Delete';
import EditProfile from '../../ui/EditProfile';
import Preloader from '../../ui/Preloader';
import Toast from '../../ui/Toast';
import { ReactComponent as ArrowBack } from '../../assets/images/arrowBack.svg';
import { ReactComponent as DeleteIcon } from '../../assets/images/deleteIcon.svg';
import { ReactComponent as EditIcon } from '../../assets/images/editIcon.svg';
import styles from './styles.module.scss';

const PainterInfo = React.lazy(() => import('../PainterInfo'));

const cx = cn.bind(styles);

type ProfileProps = {
  painterMotherland: string;
};

export const Profile: FC<ProfileProps> = ({ painterMotherland }) => {
  const { theme } = useThemeContext();
  const [isShowEditProfile, setIsShowEditProfile] = useState(false);
  const [isShowDelete, setIsShowDelete] = useState(false);
  const [isError, setIsError] = useState(false);
  const { error, isLoading } = useAppSelector(
    ({ painterProfile }) => painterProfile,
  );
  const { accessToken } = useAppSelector(({ auth: { tokens } }) => tokens);
  const dispatch = useAppDispatch();
  const { painterId } = useParams();

  const handleChangeShowDelete = () => {
    setIsShowDelete(!isShowDelete);
    useUnScroll(!isShowDelete);
  };

  const handleChangeShowEditProfile = () => {
    setIsShowEditProfile(!isShowEditProfile);
    useUnScroll(!isShowEditProfile);
  };

  useEffect(() => {
    if (accessToken) {
      dispatch(
        fetchPainterProfle({
          url: painterId,
          accessToken,
        }),
      );
    } else console.log('токен');
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
              <span className={cx('backLinkMini')}>back</span>
            </Link>
            <div className={cx('actionEditWrapp')}>
              <Button
                className="deleteBtn"
                handleClick={() => handleChangeShowDelete()}
              >
                <DeleteIcon
                  fill={theme === 'dark' ? '#DEDEDE' : '#575757'}
                  width="16px"
                  height="16px"
                />
              </Button>
              <Button
                className="deleteBtn"
                handleClick={() => handleChangeShowEditProfile()}
              >
                <EditIcon
                  fill={theme === 'dark' ? '#DEDEDE' : '#575757'}
                  width="16px"
                  height="16px"
                />
              </Button>
            </div>
          </div>
          <PainterInfo painterMotherland={painterMotherland} />
        </div>
        <PainterArtWorks />
        <DeleteProfile
          isShowDelete={isShowDelete}
          handleChangeShowDelete={handleChangeShowDelete}
        />
        <EditProfile
          isShowEditProfile={isShowEditProfile}
          handleChangeShowEditProfile={handleChangeShowEditProfile}
        />
      </section>
    </>
  );
};
