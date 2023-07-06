import { FC } from 'react';
import cn from 'classnames/bind';

import LoadingImage from '../LoadingImage';

import type { CardProps } from '../../comon-types';

import { ReactComponent as Arrow } from '../../assets/images/arrow.svg';
import { ReactComponent as WithoutPainterPhotoIcon } from '../../assets/images/withoutPainterPhoto.svg';

import styles from './styles.module.scss';

const cx = cn.bind(styles);

const Card: FC<CardProps> = ({ title, handleCLick, image, year }) => {
  return (
    <figure className={cx('card')} onClick={handleCLick}>
      {image ? (
        <LoadingImage
          needOptimizing
          image={image}
          alt={title}
          className={cx('cardImg')}
        />
      ) : (
        <div className={cx('cardImg')}>
          <div className={cx('withoutPhotoWrapp')}>
            <WithoutPainterPhotoIcon
              fill="#DEDEDE"
              className={cx('withoutPhotoIcon')}
            />
          </div>
        </div>
      )}
      <figcaption className={cx('cardInfoWrapp')}>
        <div className={cx('cardInfo')}>
          <h2 className={cx('cardTitle')}>{title}</h2>
          <p className={cx('cardAnotherInfo')}>{year}</p>
        </div>
        <div className={cx('cardInfoAfter')}>
          <Arrow fill={'#DEDEDE'} />
        </div>
      </figcaption>
    </figure>
  );
};

export default Card;
