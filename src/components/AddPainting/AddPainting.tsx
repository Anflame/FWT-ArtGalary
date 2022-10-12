import React, { FC, useEffect, useState } from 'react';
import cn from 'classnames/bind';
import { SetIsShow } from '../../comon-types';
import { addFile } from '../../hooks/addFIle';
import { dragAndDrop } from '../../hooks/dragAndDrop';
import { pressEscape } from '../../hooks/pressEscape';
import { themeContext } from '../../hooks/themeContext';
import { validation } from '../../hooks/validation';
import Button from '../../ui/Button';
import Input from '../../ui/Input';
import Toast from '../../ui/Toast';
import { ReactComponent as CloseIcon } from '../../assets/images/closeIcon.svg';
import { ReactComponent as DeleteIcon } from '../../assets/images/deleteIcon.svg';
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
  const { theme } = themeContext();
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
  const [drag, setDrag] = useState(false);

  const handleAddFile = (
    e: React.ChangeEvent<HTMLInputElement> | React.DragEvent<HTMLDivElement>,
  ) => {
    const file = addFile(e);
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setIsError(true);
      setDrag(false);
      setErrorText('Некорректное изображение');
    }
    return URL.revokeObjectURL(previewUrl);
  };

  const handelSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  useEffect(() => {
    pressEscape(setIsShowAddPhoto);
    validation('name', name, setIsErrorName, setNameMessage);
    validation('year', year, setIsErrorYear, setYearMessage);

    if (isErrorName || isErrorYear) {
      setErrorText('Исправьте ошибки');
      setIsError(true);
    } else if (!image) {
      setErrorText('Выберите изображение');
      setIsError(true);
    } else setIsError(false);

    return document.removeEventListener('keydown', () => setIsShowAddPhoto);
  }, [name, year, image, drag]);

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
                className={cx('dragAndDropWrapp', drag && 'drag')}
                onDrop={(e) => handleAddFile(e)}
                onDragStart={(e) => dragAndDrop(e, 'over', setDrag)}
                onDragLeave={(e) => dragAndDrop(e, 'leave', setDrag)}
                onDragOver={(e) => dragAndDrop(e, 'over', setDrag)}
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
                <DeleteIcon
                  width="16px"
                  height="16px"
                  fill="#DEDEDE"
                  className={cx('deleteIcon')}
                  onClick={() => setImage(undefined)}
                />
              </div>
            )}
            <Button
              className="defaultBtn"
              disabled={isErrorName || isErrorName || !image}
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
