import React, { FC, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import cn from 'classnames/bind';
import SliderItem from '../SliderItem';
import { modalNode } from '../../constants';
import { usePressEscape } from '../../hooks/usePressEscape';
import { useUnScroll } from '../../hooks/useUnScroll';
import type { SetIsShow, TemporaryPaintings } from '../../comon-types';
import { ReactComponent as SlideLeftIcon } from '../../assets/images/slideLeftIcon.svg';
import { ReactComponent as SlideRightIcon } from '../../assets/images/slideRightIcon.svg';
import styles from './styles.module.scss';

const cx = cn.bind(styles);

type SliderProps = {
  slides: TemporaryPaintings[];
  isShowSlider: boolean;
  setIsShowSlider: SetIsShow;
};

export const Slider: FC<SliderProps> = ({
  slides,
  isShowSlider,
  setIsShowSlider,
}) => {
  const [isDoCover, setIsDoCover] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [startTouch, setStartTouch] = useState(0);
  const sliderRef = useRef<HTMLUListElement>(null);

  const handleTouchEnd = (e: React.TouchEvent<HTMLElement>) => {
    if (sliderRef.current) {
      const sliderRefStyle = sliderRef.current.style;
      if (sliderRefStyle.transition !== 'transfrom 0.5s')
        sliderRefStyle.transition = 'transform 0.5s';
    }
    if (
      startTouch - (e.changedTouches[0].clientX * 100) / window.innerWidth <=
      -25
    ) {
      if (currentSlide !== 0) setCurrentSlide(currentSlide - 1);
      else setCurrentSlide(slides.length - 1);
    } else if (
      startTouch - (e.changedTouches[0].clientX * 100) / window.innerWidth >=
      25
    ) {
      if (currentSlide + 1 !== slides.length) setCurrentSlide(currentSlide + 1);
      else setCurrentSlide(0);
    } else if (sliderRef.current)
      sliderRef.current.style.transform = `translateX(-${currentSlide * 100}%)`;
    setStartTouch(0);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (sliderRef.current) {
      const sliderRefStyle = sliderRef.current.style;
      if (sliderRefStyle.transition !== 'transfrom 0s')
        sliderRefStyle.transition = 'transform 0s';
      sliderRefStyle.transform = `translateX(${-(
        currentSlide * 100 +
        (startTouch - (e.changedTouches[0].clientX * 100) / window.innerWidth)
      )}%)`;
    }
  };

  useEffect(() => {
    useUnScroll(isShowSlider);
    usePressEscape(setIsShowSlider, isShowSlider);
  }, [isShowSlider]);

  return createPortal(
    <>
      {isShowSlider && (
        <section
          className={cx('sliderWrapp')}
          onClick={() => setIsShowSlider(false)}
        >
          <div
            className={cx('slider')}
            onTouchStart={(e) =>
              setStartTouch(
                (e.changedTouches[0].clientX * 100) / window.innerWidth,
              )
            }
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className={cx('sliderControlWrapp', 'left', isDoCover && 'hide')}
              onClick={() =>
                setCurrentSlide(
                  currentSlide > 0 ? currentSlide - 1 : slides.length - 1,
                )
              }
            >
              <SlideLeftIcon fill="#9C9C9C" className={cx('slideIcon')} />
            </div>
            <div
              className={cx('sliderControlWrapp', 'right', isDoCover && 'hide')}
              onClick={() =>
                setCurrentSlide(
                  currentSlide < slides.length - 1 ? currentSlide + 1 : 0,
                )
              }
            >
              <SlideRightIcon fill="#9C9C9C" className={cx('slideIcon')} />
            </div>
            <ul
              className={cx('sliderList')}
              ref={sliderRef}
              style={{
                transform: `translateX(${`${-currentSlide * 100}%`})`,
              }}
            >
              {slides.map(({ _id, image: { src }, name, yearOfCreation }) => (
                <SliderItem
                  slides={slides}
                  _id={_id}
                  name={name}
                  src={src}
                  yearOfCreation={yearOfCreation}
                  isDoCover={isDoCover}
                  setIsDoCover={setIsDoCover}
                  setIsShowSlider={setIsShowSlider}
                />
              ))}
            </ul>
          </div>
        </section>
      )}
    </>,
    modalNode,
  );
};
