import React, { FC, useState } from 'react';
import cn from 'classnames/bind';
import type { TemporaryPaintings } from '../../comon-types';
import { ReactComponent as SlideLeftIcon } from '../../assets/images/slideLeftIcon.svg';
import { ReactComponent as SlideRightIcon } from '../../assets/images/slideRightIcon.svg';
import styles from './styles.module.scss';

const cx = cn.bind(styles);

type SliderProps = {
  slides: TemporaryPaintings[];
};

export const Slider: FC<SliderProps> = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handlePrev = () => {
    setCurrentSlide(currentSlide > 0 ? currentSlide - 1 : slides.length - 1);
  };

  const handleNext = () => {
    setCurrentSlide(currentSlide < slides.length - 1 ? currentSlide + 1 : 0);
  };

  return (
    <section className={cx('slider')}>
      <div className={cx('sliderControlWrapp', 'left')} onClick={handlePrev}>
        <SlideLeftIcon fill="#9C9C9C" className={cx('slideIcon')} />
      </div>
      <div className={cx('sliderControlWrapp', 'right')} onClick={handleNext}>
        <SlideRightIcon fill="#9C9C9C" className={cx('slideIcon')} />
      </div>
      <ul
        className={cx('sliderList')}
        style={{ transform: `translateX(${-currentSlide * 100}%)` }}
      >
        {slides.map(({ _id, image: { src }, name, yearOfCreation }) => (
          <li key={_id} className={cx('sliderListes')}>
            <img src={src} alt={name} className={cx('sliderListesImg')} />
            <div className={cx('infoWrapp')}>
              <p className={cx('infoYearsOfCreation')}>{yearOfCreation}</p>
              <p className={cx('infoName')}>{name}</p>
              <h4 className={cx('currenSlide')}>
                {_id}/{slides.length}
              </h4>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};
