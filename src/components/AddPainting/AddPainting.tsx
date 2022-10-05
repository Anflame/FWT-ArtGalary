import React, { FC, useEffect, useState } from 'react';
import cn from 'classnames/bind';
import Button from '../Button';
import Input from '../Input';
import Toast from '../Toast';
import { SetIsShow } from '../../comon-types';
import { Context } from '../../hooks/Context';
import { ReactComponent as CloseIcon } from '../../assets/images/closeIcon.svg';
import { ReactComponent as DragAndDropIcon } from '../../assets/images/dragAndDropIcon.svg';
import styles from './styles.module.scss';

const cx = cn.bind(styles);

type AddPaintingProps = {
  isShowAddPhoto: boolean;
  setIsShowAddPhoto: SetIsShow;
};

export const AddPainting: FC<AddPaintingProps> = ({
  isShowAddPhoto,
  setIsShowAddPhoto,
}) => {
  const { theme } = Context();
  const [image, setImage] = useState<File>();
  const [previewUrl, setPreviewUrl] = useState('');
  const [isError, setIsError] = useState(true);
  const [errorText, setErrorText] = useState('');
  const [name, setName] = useState('');
  const [year, setYear] = useState('');
  const [isErrorName, setIsErrorName] = useState(true);
  const [isErrorYear, setIsErrorYear] = useState(true);
  const [nameErrorMessage, setNameMessage] = useState('');
  const [yearErrorMessage, setYearMessage] = useState('');

  const handeChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const handeChangeYear = (e: React.ChangeEvent<HTMLInputElement>) => {
    setYear(e.target.value);
  };

  const handleFile = (file: File) => {
    setImage(file);
    setPreviewUrl(URL.createObjectURL(file));
    return URL.revokeObjectURL(previewUrl);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files.length === 1) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handelSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (!name) {
      setIsErrorName(true);
      setNameMessage('Заполните все поля');
    } else if (name.length > 25) {
      setIsErrorName(true);
      setNameMessage('Длина поля Имя должно быть меньше 25');
    } else {
      setIsErrorName(false);
    }
    if (!year) {
      setIsErrorYear(true);
      setYearMessage('Заполните все поля');
    } else if (!/^(\d)+(-)?$/.test(String(year))) {
      setIsErrorYear(true);
      setYearMessage('Не корректная дата');
    } else {
      setIsErrorYear(false);
    }

    if (isErrorName || isErrorYear) {
      setErrorText('Исправьте ошибки');
      setIsError(true);
    } else if (!image) {
      setErrorText('Выбирете изображение');
      setIsError(true);
    } else setIsError(false);
  }, [name, year, image]);

  return (
    <>
      {isShowAddPhoto && (
        <div className={cx('addPaintingWrapp')}>
          <form
            className={cx('addPaintingWrappContent')}
            onSubmit={handelSubmit}
          >
            <Input
              label="The name of the picture"
              value={name}
              onChange={handeChangeName}
              isError={isErrorName}
              errorMessage={nameErrorMessage}
            />
            <Input
              label="Year of creation"
              value={year}
              onChange={handeChangeYear}
              isError={isErrorYear}
              errorMessage={yearErrorMessage}
            />
            {!image ? (
              <div
                className={cx('dragAndDropWrapp')}
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
              >
                <DragAndDropIcon className={cx('dragAndDropIcon')} />
                <label htmlFor="browseImage" className={cx('browseImageLabel')}>
                  browse image
                </label>
                <p className={cx('broweImageWrapp')}>
                  Drop your image here, or
                  <label
                    htmlFor="browseImage"
                    className={cx('browseWrappImageLabel')}
                  >
                    browse
                  </label>
                </p>
                <input
                  type="file"
                  id="browseImage"
                  className={cx('browseImage')}
                />
                <p className={cx('dragAndDropText')}>
                  Upload only .jpg or .png format less than 3 MB
                </p>
              </div>
            ) : (
              <div className={cx('previewImageWrapp')}>
                <img
                  src={previewUrl}
                  alt="preview"
                  className={cx('previewImage')}
                />
              </div>
            )}
            <Button className="defaultBtn" isDisabled={isError}>
              Save
            </Button>
            <CloseIcon
              className={cx('closeIcon')}
              fill={theme === 'dark' ? '#9C9C9C' : '#575757'}
              onClick={() => setIsShowAddPhoto(false)}
            />
          </form>
          <Toast
            message={errorText}
            isShowToast={isError}
            handleCloseToast={() => setIsError(false)}
          />
        </div>
      )}
    </>
  );
};
