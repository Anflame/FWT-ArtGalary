import React, { FC, useEffect, useState } from 'react';
import cn from 'classnames/bind';
import Button from '../Button';
import Input from '../Input';
import Toast from '../Toast';
import { SetIsShow } from '../../comon-types';
import { Context } from '../../hooks/Context';
import { PressEscape } from '../../hooks/PressEscape';
import { Validation } from '../../hooks/Validation';
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
  const handlePressEscape = PressEscape(setIsShowAddPhoto);

  const handleFile = (file: File) => {
    if (
      (file.type === 'image/png' || file.type === 'image/jpeg') &&
      file.size <= 3145728
    ) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      if (isError && /(Некорректное изображение)+/iu.test(errorText)) {
        setIsError(false);
      }
    } else {
      setIsError(true);
      setErrorText('Некорректное изображение');
    }
    return URL.revokeObjectURL(previewUrl);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files.length === 1) {
      handleFile(e.dataTransfer.files[0]);
    } else {
      setIsError(true);
      setErrorText('Некорректное изображение');
    }
  };

  const handleAddFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files?.length === 1) {
      handleFile(e.target.files[0]);
    } else {
      setIsError(true);
      setErrorText('Некорректное изображение');
    }
  };

  const handelSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  useEffect(() => {
    handlePressEscape();

    Validation('name', name, setIsErrorName, setNameMessage);
    Validation('year', year, setIsErrorYear, setYearMessage);

    if (isErrorName || isErrorYear) {
      setErrorText('Исправьте ошибки');
      setIsError(true);
    } else if (!image) {
      setErrorText('Выбирете изображение');
      setIsError(true);
    } else setIsError(false);

    return document.removeEventListener('keydown', () => setIsShowAddPhoto);
  }, [name, year, image]);

  return (
    <>
      {isShowAddPhoto && (
        <div
          className={cx('addPaintingWrapp')}
          onClick={() => setIsShowAddPhoto(false)}
        >
          <form
            className={cx('addPaintingWrappContent')}
            onClick={(e) => e.stopPropagation()}
            onSubmit={handelSubmit}
          >
            <div className={cx('inputsWrapp')}>
              <Input
                label="The name of the picture"
                value={name}
                onChange={(e) => setName(e.target.value)}
                isError={isErrorName}
                errorMessage={nameErrorMessage}
              />
              <Input
                label="Year of creation"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                isError={isErrorYear}
                errorMessage={yearErrorMessage}
              />
            </div>
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
                  onChange={handleAddFile}
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
            <Button
              className="defaultBtn"
              isDisabled={isErrorName || isErrorName || !image}
            >
              Save
            </Button>
            <CloseIcon
              className={cx('closeIcon')}
              fill={theme === 'dark' ? '#9C9C9C' : '#575757'}
              onClick={() => setIsShowAddPhoto(false)}
            />
            <Toast
              message={errorText}
              isShowToast={isError}
              handleCloseToast={() => setIsError(false)}
            />
          </form>
        </div>
      )}
    </>
  );
};
