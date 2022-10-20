import React, { FC, useRef } from 'react';
import cn from 'classnames/bind';
import Preloader from '../Preloader';
import { useOnScreen } from '../../hooks/useOnScreen';
import styles from './styles.module.scss';

const cx = cn.bind(styles);

type ILoadableImage = {
  src: string;
  alt?: string;
  className: string;
};

export const LoadingImage: FC<ILoadableImage> = ({ src, alt, className }) => {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isVisible = useOnScreen(containerRef);

  React.useEffect(() => {
    if (!isVisible || isLoaded) {
      return;
    }
    if (imageRef.current) {
      imageRef.current.onload = () => {
        setIsLoaded(true);
      };
    }
  }, [isVisible, isLoaded]);

  return (
    <div ref={containerRef} className={cx('imageContainer')}>
      {isVisible || isLoaded ? (
        <img ref={imageRef} className={cx(className)} src={src} alt={alt} />
      ) : (
        <Preloader />
      )}
    </div>
  );
};
