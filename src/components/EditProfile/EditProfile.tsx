import React, { FC, useEffect, useState } from 'react';
// import { useParams } from 'react-router';
import cn from 'classnames/bind';
import Button from '../Button';
import Input from '../Input';
import MultiSelect from '../MultiSelect';
import TextArea from '../TextArea';
import Toast from '../Toast';
import { SetIsShow } from '../../comon-types';
import { selectListArray } from '../../constants';
import { Context } from '../../hooks/Context';
import { overflowHidden } from '../../hooks/OverFlowHidden';
import { PressEscape } from '../../hooks/PressEscape';
import { Validation } from '../../hooks/Validation';
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
  const { theme } = Context();
  // const { profileId } = useParams();
  const [isShowBrowsePhoto, setIsShowBrowsePhoto] = useState(false);
  const [selectList, setSelectList] = useState(selectListArray);
  const [height, setHeight] = useState<number>(window.innerWidth);
  const [name, setName] = useState('');
  const [isErrorName, setErrorName] = useState(true);
  const [errorNameMessage, setErrorNameMessage] = useState('Заполните поле');
  const [isErrorGender, setIsErrorGender] = useState(true);
  const [errorGenresMessage, setErrorGenresMessage] = useState(
    'Выбирете минимум один жанр',
  );
  // const [year, setYear] = useState();
  // const [location, setLocation] = useState();
  // const [description, setDescription] = useState();
  const handlePressEscape = PressEscape(setIsShowEditProfile);

  const changeSelect = (e: React.MouseEvent<HTMLLIElement>) => {
    e.preventDefault();
    setSelectList(
      selectList.map((el) => {
        if (el.title === e.currentTarget.textContent)
          el.isChecked = !el.isChecked;
        return el;
      }),
    );
  };

  useEffect(() => {
    handlePressEscape();
    overflowHidden(isShowEditProfile);
    window.addEventListener('resize', () => setHeight(window.innerWidth));

    Validation('name', name, setErrorName, setErrorNameMessage);
    if (selectListArray.filter((el) => el.isChecked).length === 0) {
      setIsErrorGender(true);
      setErrorGenresMessage('Выбирете минимум один жанр');
    } else setIsErrorGender(false);

    return () => {
      document.removeEventListener('keydown', () =>
        setIsShowEditProfile(false),
      );
      document.removeEventListener('resize', () =>
        setHeight(window.innerWidth),
      );
    };
  }, [window.innerWidth, name, changeSelect]);

  const handleEditProfile = () => {};

  const handleDropPhoto = () => {
    if (height && height > 1024) setIsShowBrowsePhoto(true);
  };

  return (
    <>
      {isShowEditProfile && (
        <section
          className={cx('editProfile')}
          onClick={() => setIsShowEditProfile(false)}
        >
          <div
            className={cx('editProfileContent')}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={cx('photoWrapp')}>
              <div className={cx('photoIconWrapp')}>
                <WithoutPhotoIcon
                  className={cx('withoutPhotoIcon')}
                  fill={'#9C9C9C'}
                />
              </div>
              <label
                htmlFor={'file'}
                className={cx('browsePhotoText')}
                onClick={handleDropPhoto}
              >
                Browse Profile Photo
              </label>
              <input type="file" id="file" className={cx('fileInput')} />
            </div>
            <form
              className={cx('editProfileForm')}
              onSubmit={handleEditProfile}
            >
              <Input
                id={'name'}
                placeholder={'Ivan Aivazovky'}
                label={'Name*'}
                errorMessage={errorNameMessage}
                isError={isErrorName}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Input id={'yearsOfLife'} label={'Years of life'} />
              <Input id={'location'} label={'Location'} />
              <TextArea id={'description'} />
              <MultiSelect
                label={'Genres*'}
                selectList={selectList}
                changeSelect={changeSelect}
              />
              <Button
                className={'defaultBtn'}
                isDisabled={isErrorGender || isErrorName}
              >
                save
              </Button>
            </form>
            <CloseIcon
              className={cx('closeIcon')}
              fill={theme === 'dark' ? '#9C9C9C' : '#575757'}
              onClick={() => setIsShowEditProfile(false)}
            />
            {isShowBrowsePhoto && (
              <div className={cx('dropPhotoWrapp')}>
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
              isShowToast={isErrorGender}
              handleCloseToast={() => setIsErrorGender(false)}
              message={errorGenresMessage}
            />
          </div>
        </section>
      )}
    </>
  );
};
