import React, { FC, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
// import { useParams } from 'react-router';
import cn from 'classnames/bind';
import Toast from '../Toast';
import { SetIsShow } from '../../comon-types';
import EditProFileForm from '../../components/EditProfileForm';
import { modalNode } from '../../constants';
import { useAddFile } from '../../hooks/useAddFIle';
import { useDragAndDrop } from '../../hooks/useDragAndDrop';
import { usePressEscape } from '../../hooks/usePressEscape';
import { useThemeContext } from '../../hooks/useThemeContext';
import { useUnScroll } from '../../hooks/useUnScroll';
import { ReactComponent as CloseIcon } from '../../assets/images/closeIcon.svg';
import { ReactComponent as WithoutPhotoIcon } from '../../assets/images/withoutPhotoIcon.svg';
import styles from './styles.module.scss';

const cx = cn.bind(styles);

type EditProfileProps = {
  isShowEditProfile: boolean;
  setIsShowEditProfile: SetIsShow;
};

export const EditProfile: FC<EditProfileProps> = ({
  isShowEditProfile,
  setIsShowEditProfile,
}) => {
  const { theme } = useThemeContext();
  // const { profileId } = useParams();
  const [drag, setDrag] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');
  const [image, setImage] = useState<File>();
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleDrop = (
    e: React.ChangeEvent<HTMLInputElement> | React.DragEvent<HTMLElement>,
  ) => {
    useAddFile(
      e,
      setImage,
      setPreviewUrl,
      setIsError,
      setDrag,
      setErrorMessage,
    );
    return URL.revokeObjectURL(previewUrl);
  };

  useEffect(() => {
    usePressEscape(setIsShowEditProfile, isShowEditProfile);
    useUnScroll(isShowEditProfile);
    return document.removeEventListener('keydown', () =>
      setIsShowEditProfile(false),
    );
  }, [image, isShowEditProfile]);

  const handleEditProfile = () => {};

  return createPortal(
    <>
      {isShowEditProfile && (
        <section
          className={cx('editProfile')}
          onClick={() => setIsShowEditProfile(false)}
        >
          <div
            className={cx('editProfileContent', drag && 'drag')}
            onClick={(e) => e.stopPropagation()}
            onDragOver={(e) => useDragAndDrop(e, 'over', drag, setDrag)}
            onDragLeave={(e) => useDragAndDrop(e, 'leave', drag, setDrag)}
            onDrop={handleDrop}
          >
            {!drag ? (
              <>
                <div className={cx('photoWrapp')}>
                  <div className={cx('photoIconWrapp', image && 'preview')}>
                    {image ? (
                      <img
                        src={previewUrl}
                        alt="preview"
                        className={cx('previewImg')}
                      />
                    ) : (
                      <WithoutPhotoIcon
                        className={cx('withoutPhotoIcon')}
                        fill={'#9C9C9C'}
                      />
                    )}
                  </div>
                  <label htmlFor={'file'} className={cx('browsePhotoText')}>
                    Browse Profile Photo
                  </label>
                  <input
                    type="file"
                    id="file"
                    className={cx('fileInput')}
                    onChange={handleDrop}
                  />
                </div>
                <EditProFileForm handleEditProfile={handleEditProfile} />
                <CloseIcon
                  className={cx('closeIcon')}
                  fill={theme === 'dark' ? '#9C9C9C' : '#575757'}
                  onClick={() => setIsShowEditProfile(false)}
                />
              </>
            ) : (
              <div className={cx('dropPhotoWrapp', 'drop')}>
                <WithoutPhotoIcon
                  className={cx('withoutPhotoIcon', 'dropPhotoIcon')}
                  fill={'#9C9C9C'}
                />
                <p className={cx('dropPhotoText')}>Drop your image here</p>
                <p className={cx('anotherInfo')}>
                  Upload only .jpg or .png format less than 3 MB{' '}
                </p>
              </div>
            )}
            <Toast
              isShowToast={isError}
              handleCloseToast={() => setIsError(false)}
              message={errorMessage}
            />
          </div>
        </section>
      )}
    </>,
    modalNode,
  );
};
