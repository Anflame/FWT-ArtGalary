import React, { FC, useEffect, useState } from 'react';
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
  const [isDoContain, setIsDoContain] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [startTouch, setStartTouch] = useState(0);
  const [touchMove, setTouchMove] = useState(0);

  const handleTouchEnd = (e: React.TouchEvent<HTMLElement>) => {
    if (
      startTouch - (e.changedTouches[0].clientX * 100) / window.innerWidth <=
      -30
    ) {
      setTouchMove(0);
      if (currentSlide !== 0) setCurrentSlide(currentSlide - 1);
      else setCurrentSlide(slides.length - 1);
    } else if (
      startTouch - (e.changedTouches[0].clientX * 100) / window.innerWidth >=
      30
    ) {
      setTouchMove(0);
      if (currentSlide + 1 !== slides.length) setCurrentSlide(currentSlide + 1);
      else setCurrentSlide(0);
    } else setTouchMove(0);
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
            onTouchMove={(e) =>
              setTouchMove(
                (e.changedTouches[0].clientX * 100) / window.innerWidth,
              )
            }
            onTouchEnd={handleTouchEnd}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className={cx('sliderControlWrapp', 'left')}
              onClick={() =>
                setCurrentSlide(
                  currentSlide > 0 ? currentSlide - 1 : slides.length - 1,
                )
              }
            >
              <SlideLeftIcon fill="#9C9C9C" className={cx('slideIcon')} />
            </div>
            <div
              className={cx('sliderControlWrapp', 'right')}
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
              style={{
                transform: `translateX(${
                  touchMove !== 0
                    ? `${-(currentSlide * 100 + (startTouch - touchMove))}%`
                    : `${-currentSlide * 100}%`
                })`,
              }}
            >
              {slides.map(({ _id, image: { src }, name, yearOfCreation }) => (
                <SliderItem
                  slides={slides}
                  _id={_id}
                  name={name}
                  src={src}
                  yearOfCreation={yearOfCreation}
                  isDoContain={isDoContain}
                  setIsDoContain={setIsDoContain}
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
