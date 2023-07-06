import React, { FC, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import cn from 'classnames/bind';
import Cookies from 'js-cookie';

import {
  fetchDeletePainter,
  fetchPainterProfle,
} from '../../store/API/painterProfile';
import { clearPainterProfileError } from '../../store/painterProfile/slice';

import Button from '../../ui/Button';
import DeleteProfile from '../../ui/Delete';
import EditProfile from '../../ui/EditProfile';
import Preloader from '../../ui/Preloader';
import PainterArtWorks from '../PainterArtworks';

import { useShowError } from '../../hooks/useErrorContext';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { useThemeContext } from '../../hooks/useThemeContext';
import { useUnScroll } from '../../hooks/useUnScroll';

import { BtnVariants } from '../../variants';

import { ReactComponent as ArrowBack } from '../../assets/images/arrowBack.svg';
import { ReactComponent as DeleteIcon } from '../../assets/images/deleteIcon.svg';
import { ReactComponent as EditIcon } from '../../assets/images/editIcon.svg';

import styles from './styles.module.scss';

const PainterInfo = React.lazy(() => import('../PainterInfo'));

const cx = cn.bind(styles);

type ProfileProps = {
  painterMotherland: string;
};

const Profile: FC<ProfileProps> = ({ painterMotherland }) => {
  const { theme } = useThemeContext();
  const [isShowEditProfile, setIsShowEditProfile] = useState(false);
  const [isShowDelete, setIsShowDelete] = useState(false);
  const { error, isLoading } = useAppSelector(
    ({ painterProfile }) => painterProfile,
  );
  const { accessToken } = useAppSelector(({ auth: { token } }) => token);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { painterId } = useParams();

  useShowError(error, clearPainterProfileError);

  const handleChangeShowDelete = () => {
    setIsShowDelete(!isShowDelete);
    useUnScroll(!isShowDelete);
  };

  const handleChangeShowEditProfile = () => {
    setIsShowEditProfile(!isShowEditProfile);
    useUnScroll(!isShowEditProfile);
  };

  const handleDeleteProfile = async () => {
    const response = await dispatch(fetchDeletePainter(painterId));
    if (response.payload) {
      navigate('/');
    }
  };

  useEffect(() => {
    if (!Cookies.get('token')) navigate('/');
    dispatch(
      fetchPainterProfle({
        url: painterId,
        accessToken:
          accessToken || JSON.parse(Cookies.get('token') as string).accessToken,
      }),
    );
  }, [Cookies.get('token'), dispatch]);

  return (
    <>
      {isLoading && <Preloader />}
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
                variant={BtnVariants.DELETE}
                handleClick={() => handleChangeShowDelete()}
              >
                <DeleteIcon
                  fill={theme === 'dark' ? '#DEDEDE' : '#575757'}
                  width="16px"
                  height="16px"
                />
              </Button>
              <Button
                variant={BtnVariants.DELETE}
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
          handleDelete={handleDeleteProfile}
          title="Do you want to delete this artist profile?"
          subTitle="You will not be able to recover this profile afterwards."
        />
        <EditProfile
          isShowEditProfile={isShowEditProfile}
          handleChangeShowEditProfile={handleChangeShowEditProfile}
        />
      </section>
    </>
  );
};

export default Profile;
