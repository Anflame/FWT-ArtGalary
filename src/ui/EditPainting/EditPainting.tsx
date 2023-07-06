import React, { FC, useContext, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import { yupResolver } from '@hookform/resolvers/yup';
import cn from 'classnames/bind';

import { fetchAddPainting } from '../../store/API/painterProfile';

import DragAndDrop from '../../components/DragAndDrop';
import Button from '../Button';
import Input from '../Input';
import LoadingImage from '../LoadingImage';

import { ErrorContext } from '../../utils/ErrorContext';
import { editPaintingScheme } from '../../utils/yupSchemes';

import { usePressEscape } from '../../hooks/usePressEscape';
import { useAppDispatch } from '../../hooks/useRedux';
import { useThemeContext } from '../../hooks/useThemeContext';

import { modalNode } from '../../constants';

import type { SetIsShow, TAddPaintingData } from '../../comon-types';
import { BtnVariants } from '../../variants';

import { ReactComponent as CloseIcon } from '../../assets/images/closeIcon.svg';
import { ReactComponent as DeleteIcon } from '../../assets/images/deleteIcon.svg';

import styles from './styles.module.scss';

const cx = cn.bind(styles);

type EditPaintingProps = {
  isShowEditPainting: boolean;
  handleChangeShowEditPainting: SetIsShow;
};

type TPaintingData = {
  name: string;
  yearOfCreation: string;
};

const EditPainting: FC<EditPaintingProps> = ({
  isShowEditPainting,
  handleChangeShowEditPainting,
}) => {
  const { theme } = useThemeContext();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      yearOfCreation: '',
    },
    resolver: yupResolver(editPaintingScheme),
  });
  const [image, setImage] = useState<Blob>();
  const [previewUrl, setPreviewUrl] = useState('');
  const { showError } = useContext(ErrorContext);

  const dispatch = useAppDispatch();

  const { painterId } = useParams();

  const editArtist = (data: TPaintingData) => {
    if (!image) {
      showError?.('Выберите изображение');
      return;
    }
    const resultObj: TAddPaintingData = {
      formData: new FormData(),
      id: painterId,
    };
    const { formData } = resultObj;
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key as keyof typeof data] as string);
    });
    resultObj.formData.append('image', image as Blob);
    dispatch(fetchAddPainting(resultObj));
    handleChangeShowEditPainting(false);
  };

  useEffect(() => {
    usePressEscape(handleChangeShowEditPainting, isShowEditPainting);
  }, [isShowEditPainting]);

  return createPortal(
    <>
      {isShowEditPainting && (
        <div
          className={cx('editPaintingWrapp')}
          onClick={() => handleChangeShowEditPainting(false)}
        >
          <form
            className={cx('editPaintingWrappContent')}
            onClick={(e) => e.stopPropagation()}
            onSubmit={handleSubmit(editArtist)}
          >
            <div className={cx('inputsWrapp')}>
              <Input
                label="The name of the picture"
                control={control}
                name="name"
                isError={Boolean(errors.name?.message)}
                errorMessage={errors.name?.message}
              />
              <Input
                control={control}
                name="yearOfCreation"
                label="Year of creation"
                isError={Boolean(errors.yearOfCreation?.message)}
                errorMessage={errors.yearOfCreation?.message}
              />
            </div>
            {!image ? (
              <DragAndDrop
                setImage={setImage}
                setPreviewUrl={setPreviewUrl}
                previewUrl={previewUrl}
              />
            ) : (
              <div className={cx('previewImageWrapp')}>
                <LoadingImage
                  needOptimizing={false}
                  image={previewUrl}
                  alt="preview"
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
            <Button variant={BtnVariants.DEFAULT} type="submit">
              Save
            </Button>
            <CloseIcon
              className={cx('closeIcon')}
              fill={theme === 'dark' ? '#9C9C9C' : '#575757'}
              onClick={() => handleChangeShowEditPainting(false)}
            />
          </form>
        </div>
      )}
    </>,
    modalNode,
  );
};

export default EditPainting;
