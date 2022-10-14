import React, { FC, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import cn from 'classnames/bind';
import DragAndDrop from '../DragAndDrop';
import { SetIsShow } from '../../comon-types';
import { modalNode } from '../../constants';
import { usePressEscape } from '../../hooks/usePressEscape';
import { useUnScroll } from '../../hooks/useScroll';
import { useThemeContext } from '../../hooks/useThemeContext';
import { useValidation } from '../../hooks/useValidation';
import Button from '../../ui/Button';
import Input from '../../ui/Input';
import { ReactComponent as CloseIcon } from '../../assets/images/closeIcon.svg';
import { ReactComponent as DeleteIcon } from '../../assets/images/deleteIcon.svg';
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
  const { theme } = useThemeContext();
  const [image, setImage] = useState<File>();
  const [previewUrl, setPreviewUrl] = useState('');
  const [name, setName] = useState('');
  const [year, setYear] = useState('');
  const [isErrorName, setIsErrorName] = useState(true);
  const [isErrorYear, setIsErrorYear] = useState(true);
  const [nameErrorMessage, setNameMessage] = useState('');
  const [yearErrorMessage, setYearMessage] = useState('');

  const handelSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  useEffect(() => {
    usePressEscape(setIsShowAddPhoto, isShowAddPhoto);
    useUnScroll(isShowAddPhoto);
    useValidation('name', name, setIsErrorName, setNameMessage);
    useValidation('year', year, setIsErrorYear, setYearMessage);
  }, [name, year, image, isShowAddPhoto]);

  return createPortal(
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
              <DragAndDrop
                setImage={setImage}
                image={image}
                setPreviewUrl={setPreviewUrl}
                previewUrl={previewUrl}
              />
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
          </form>
        </div>
      )}
    </>,
    modalNode,
  );
};
