import React, { FC, useState } from 'react';
import cn from 'classnames/bind';
import { useThemeContext } from '../../hooks/useThemeContext';
import Button from '../../ui/Button';
import Delete from '../../ui/Delete';
import EditPainting from '../../ui/EditPainting';
import LoadingImage from '../../ui/LoadingImage';
import type { SetIsShow, TemporaryPaintings } from '../../comon-types';
import { ReactComponent as CloseIcon } from '../../assets/images/closeIcon.svg';
import { ReactComponent as DeleteIcon } from '../../assets/images/deleteIcon.svg';
import { ReactComponent as EditIcon } from '../../assets/images/editIcon.svg';
import { ReactComponent as ImageIcon } from '../../assets/images/imageIcon.svg';
import styles from './styles.module.scss';

const cx = cn.bind(styles);

type SliderItemProps = {
  slides: TemporaryPaintings[];
  _id: string;
  src: string;
  name: string;
  yearOfCreation: string;
  isDoCover: boolean;
  setIsDoCover: SetIsShow;
  setIsShowSlider: SetIsShow;
};

export const SliderItem: FC<SliderItemProps> = ({
  slides,
  _id,
  src,
  name,
  yearOfCreation,
  isDoCover,
  setIsDoCover,
  setIsShowSlider,
}) => {
  const { theme } = useThemeContext();
  const [isShowDelete, setIsShowDelete] = useState(false);
  const [isShowEditPaiting, setIsShowEditPainting] = useState(false);

  return (
    <li key={_id} className={cx('sliderListes')}>
      <LoadingImage src={src} alt={name} className={cx('sliderListesImg')} />
      <div className={cx('infoWrapp', isDoCover && 'hide')}>
        <div className={cx('textWrapp')}>
          <p className={cx('infoYearsOfCreation')}>{yearOfCreation}</p>
          <p className={cx('infoName')}>{name}</p>
        </div>
        <div className={cx('actionWrapp', isDoCover)}>
          <Button className="deleteBtn" onClick={() => setIsShowDelete(true)}>
            <DeleteIcon
              fill={theme === 'dark' ? '#DEDEDE' : '#575757'}
              width="16px"
              height="16px"
            />
          </Button>
          <Button
            className="deleteBtn"
            onClick={() => setIsShowEditPainting(true)}
          >
            <EditIcon
              fill={theme === 'dark' ? '#DEDEDE' : '#575757'}
              width="16px"
              height="16px"
            />
          </Button>
        </div>
      </div>
      <div className={cx('actionWrappMobile', isDoCover && 'hide')}>
        <Button className="deleteBtn" onClick={() => setIsShowDelete(true)}>
          <DeleteIcon
            fill={theme === 'dark' ? '#DEDEDE' : '#575757'}
            width="16px"
            height="16px"
          />
        </Button>
        <Button
          className="deleteBtn"
          onClick={() => setIsShowEditPainting(true)}
        >
          <EditIcon
            fill={theme === 'dark' ? '#DEDEDE' : '#575757'}
            width="16px"
            height="16px"
          />
        </Button>
      </div>
      <h4 className={cx('currentSlide', isDoCover && 'hide')}>
        {_id}/{slides.length}
      </h4>
      <div
        className={cx('makeTheCoverWrapp')}
        onClick={() => setIsDoCover(!isDoCover)}
      >
        <div className={cx('makeTheCoverImgWrapp')}>
          <ImageIcon />
        </div>
        <p className={cx('makeTheCoverText')}>
          {isDoCover ? 'remove the cover' : 'Make the cover'}
        </p>
      </div>
      <CloseIcon
        className={cx('closeIcon', isDoCover && 'hide')}
        fill="#DEDEDE"
        onClick={() => setIsShowSlider(false)}
      />

      <EditPainting
        isShowEditPainting={isShowEditPaiting}
        setIsShowEditPaintings={setIsShowEditPainting}
      />
      <Delete isShowDelete={isShowDelete} setIsShowDelete={setIsShowDelete} />
    </li>
  );
};
