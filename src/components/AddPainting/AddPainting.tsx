import React, { FC } from 'react';
import cn from 'classnames/bind';
import Button from '../Button';
import Input from '../Input';
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
  return (
    <>
      {isShowAddPhoto && (
        <div className={cx('addPaintingWrapp')}>
          <div className={cx('addPaintingWrappContent')}>
            <Input label="The name of the picture" />
            <Input label="Year of creation" />
            <div className={cx('dragAndDropWrapp')}>
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
            <Button className="defaultBtn">Save</Button>
            <CloseIcon
              className={cx('closeIcon')}
              fill={theme === 'dark' ? '#9C9C9C' : '#575757'}
              onClick={() => setIsShowAddPhoto(false)}
            />
          </div>
        </div>
      )}
    </>
  );
};
