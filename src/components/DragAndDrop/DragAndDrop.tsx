import React, { FC, useEffect, useState } from 'react';
import cn from 'classnames/bind';

import Toast from '../../ui/Toast';

import { useAddFile } from '../../hooks/useAddFIle';
import { useDragAndDrop } from '../../hooks/useDragAndDrop';

import { ReactComponent as DragAndDropIcon } from '../../assets/images/dragAndDropIcon.svg';

import styles from './styles.module.scss';

const cx = cn.bind(styles);

type DragAndDropProps = {
  setImage: (file: File) => void;
  image: File[] | undefined;
  setPreviewUrl: (url: string) => void;
  previewUrl: string;
};

export const DragAndDrop: FC<DragAndDropProps> = ({
  setImage,
  image,
  setPreviewUrl,
  previewUrl,
}) => {
  const [drag, setDrag] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isError, setIsError] = useState(true);

  const handleAddFile = (
    e: React.ChangeEvent<HTMLInputElement> | React.DragEvent<HTMLDivElement>,
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
    if (!image) {
      setErrorMessage('Выберите изображение');
      setIsError(true);
    } else setIsError(false);
  }, [image]);

  return (
    <>
      <div
        className={cx('dragAndDropWrapp', drag && 'drag')}
        onDrop={(e) => handleAddFile(e)}
        onDragStart={(e) => useDragAndDrop(e, 'over', drag, setDrag)}
        onDragLeave={(e) => useDragAndDrop(e, 'leave', drag, setDrag)}
        onDragOver={(e) => useDragAndDrop(e, 'over', drag, setDrag)}
      >
        <DragAndDropIcon className={cx('dragAndDropIcon')} />
        <label htmlFor="browseImage" className={cx('browseImageLabel')}>
          browse image
        </label>
        <p className={cx('broweImageWrapp')}>
          Drop your image here, or
          <label htmlFor="browseImage" className={cx('browseWrappImageLabel')}>
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

      <Toast
        message={errorMessage}
        isShowToast={isError}
        handleCloseToast={() => setIsError(false)}
      />
    </>
  );
};
