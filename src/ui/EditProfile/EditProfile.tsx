import React, { FC, useContext, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
// import { useParams } from 'react-router';
import cn from 'classnames/bind';

import { fetchAddPainter } from '../../store/API/painters';

import EditProfileForm from '../../components/EditProfileForm';

import { ErrorContext } from '../../utils/ErrorContext';

import { useAddFile } from '../../hooks/useAddFIle';
import { useDragAndDrop } from '../../hooks/useDragAndDrop';
import { usePressEscape } from '../../hooks/usePressEscape';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { useThemeContext } from '../../hooks/useThemeContext';

import { modalNode } from '../../constants';

import type { EditProfileFormData, Listes, SetIsShow } from '../../comon-types';

import { ReactComponent as CloseIcon } from '../../assets/images/closeIcon.svg';
import { ReactComponent as WithoutPhotoIcon } from '../../assets/images/withoutPhotoIcon.svg';

import styles from './styles.module.scss';

const cx = cn.bind(styles);

type EditProfileProps = {
  isShowEditProfile: boolean;
  handleChangeShowEditProfile: SetIsShow;
};

const EditProfile: FC<EditProfileProps> = ({
  isShowEditProfile,
  handleChangeShowEditProfile,
}) => {
  const { genres } = useAppSelector(({ genresState }) => genresState);
  const [list, setList] = useState<Listes[]>([]);
  const { theme } = useThemeContext();
  const [drag, setDrag] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');
  const [image, setImage] = useState<File>();
  const dispatch = useAppDispatch();
  const { showError } = useContext(ErrorContext);

  useEffect(() => {
    setList(genres.map((el) => ({ ...el, isChecked: false })));
  }, [genres]);

  const handleDrop = (
    e: React.ChangeEvent<HTMLInputElement> | React.DragEvent<HTMLElement>,
  ) => {
    useAddFile(e, setImage, setPreviewUrl, setDrag, showError);
    return URL.revokeObjectURL(previewUrl);
  };

  useEffect(() => {
    usePressEscape(handleChangeShowEditProfile, isShowEditProfile);
    return document.removeEventListener('keydown', () =>
      handleChangeShowEditProfile(false),
    );
  }, [image]);

  const handleEditProfile = (data: EditProfileFormData) => {
    const formData = new FormData();
    if (data.genres) {
      formData.append(
        'genres',
        JSON.stringify(
          data.genres
            .map((el) => ({
              _id: el._id,
            }))
            .reduce((acc, curr) => {
              acc.push(curr._id as never);
              return acc;
            }, []),
        ),
      );
    }

    Object.keys(data).forEach((key) => {
      if (
        data[key as keyof EditProfileFormData] &&
        key !== 'location' &&
        key !== 'genres'
      )
        formData.append(key, data[key as keyof EditProfileFormData] as string);
    });
    if (image) formData.append('avatar', image);
    dispatch(fetchAddPainter(formData));
  };

  return createPortal(
    <>
      {isShowEditProfile && (
        <section
          className={cx('editProfile')}
          onClick={() => handleChangeShowEditProfile(false)}
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
                <EditProfileForm
                  handleEditProfile={handleEditProfile}
                  list={list}
                  setList={setList}
                />
                <CloseIcon
                  className={cx('closeIcon')}
                  fill={theme === 'dark' ? '#9C9C9C' : '#575757'}
                  onClick={() => handleChangeShowEditProfile(false)}
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
          </div>
        </section>
      )}
    </>,
    modalNode,
  );
};

export default EditProfile;
