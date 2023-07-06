import React, { FC, useState } from 'react';
import cn from 'classnames/bind';

import { useAddFile } from '../../hooks/useAddFIle';
import { useDragAndDrop } from '../../hooks/useDragAndDrop';
import { useShowError } from '../../hooks/useErrorContext';

import { ReactComponent as DragAndDropIcon } from '../../assets/images/dragAndDropIcon.svg';

import styles from './styles.module.scss';

const cx = cn.bind(styles);

type DragAndDropProps = {
  setImage: (file: File) => void;
  setPreviewUrl: (url: string) => void;
  previewUrl: string;
};

const DragAndDrop: FC<DragAndDropProps> = ({
  setImage,
  setPreviewUrl,
  previewUrl,
}) => {
  const [drag, setDrag] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useShowError(errorMessage);

  const handleAddFile = (
    e: React.ChangeEvent<HTMLInputElement> | React.DragEvent<HTMLDivElement>,
  ) => {
    useAddFile(e, setImage, setPreviewUrl, setDrag, setErrorMessage);
    return URL.revokeObjectURL(previewUrl);
  };

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
    </>
  );
};

export default DragAndDrop;
