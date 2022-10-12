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
import { addFile } from '../../hooks/addFIle';
import { dragAndDrop } from '../../hooks/dragAndDrop';
import { overflowHidden } from '../../hooks/overFlowHidden';
import { pressEscape } from '../../hooks/pressEscape';
import { themeContext } from '../../hooks/themeContext';
import { validation } from '../../hooks/validation';
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
  const { theme } = themeContext();
  // const { profileId } = useParams();
  const [selectList, setSelectList] = useState(selectListArray);
  const [width, setWidth] = useState<number>(window.innerWidth);
  const [name, setName] = useState('');
  const [drag, setDrag] = useState(false);
  const [dragStart, setDragStart] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');
  const [image, setImage] = useState<File>();
  const [isErrorName, setErrorName] = useState(true);
  const [errorNameMessage, setErrorNameMessage] = useState('Заполните поле');
  const [isError, setIsError] = useState(true);
  const [errorMessage, setErrorMessage] = useState(
    'Выбирете минимум один жанр',
  );
  // const [year, setYear] = useState();
  // const [location, setLocation] = useState();
  // const [description, setDescription] = useState();

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

  const handleDrop = (
    e: React.ChangeEvent<HTMLInputElement> | React.DragEvent<HTMLElement>,
  ) => {
    const file = addFile(e);
    if (file) {
      setImage(file);
      setDrag(false);
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setIsError(true);
      setDrag(false);
      setErrorMessage('Некорректное изображение');
    }
    return URL.revokeObjectURL(previewUrl);
  };

  useEffect(() => {
    pressEscape(setIsShowEditProfile);
    overflowHidden(isShowEditProfile);
    window.addEventListener('resize', () => setWidth(window.innerWidth));

    validation('name', name, setErrorName, setErrorNameMessage);
    if (selectListArray.filter((el) => el.isChecked).length === 0) {
      setIsError(true);
      setErrorMessage('Выбирете минимум один жанр');
    } else setIsError(false);

    return () => {
      document.removeEventListener('keydown', () =>
        setIsShowEditProfile(false),
      );
      document.removeEventListener('resize', () => setWidth(window.innerWidth));
    };
  }, [window.innerWidth, name, width, image, dragStart, changeSelect]);

  const handleEditProfile = () => {};

  return (
    <>
      {isShowEditProfile && (
        <section
          className={cx('editProfile')}
          onClick={() => setIsShowEditProfile(false)}
          onDragStart={() => setDragStart(true)}
        >
          <div
            className={cx('editProfileContent', drag && 'drag')}
            onClick={(e) => e.stopPropagation()}
            onDragOver={(e) => dragAndDrop(e, 'over', setDrag)}
            onDragLeave={(e) => dragAndDrop(e, 'leave', setDrag)}
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
                    readOnly={drag}
                  />
                  <Input
                    id={'yearsOfLife'}
                    label={'Years of life'}
                    readOnly={drag}
                  />
                  <Input id={'location'} label={'Location'} readOnly={drag} />
                  <TextArea id={'description'} />
                  <MultiSelect
                    label={'Genres*'}
                    selectList={selectList}
                    changeSelect={changeSelect}
                  />
                  <Button
                    className={'defaultBtn'}
                    disabled={isError || isErrorName}
                  >
                    save
                  </Button>
                </form>
                <CloseIcon
                  className={cx('closeIcon')}
                  fill={theme === 'dark' ? '#9C9C9C' : '#575757'}
                  onClick={() => setIsShowEditProfile(false)}
                />
              </>
            ) : (
              <div
                className={cx('dropPhotoWrapp', 'drop')}
                onDragOver={(e) => dragAndDrop(e, 'over', setDrag)}
                onDragLeave={(e) => dragAndDrop(e, 'leave', setDrag)}
              >
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
    </>
  );
};
