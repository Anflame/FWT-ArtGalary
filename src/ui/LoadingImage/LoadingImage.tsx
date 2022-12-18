import React, { FC, useRef } from 'react';
import cn from 'classnames/bind';
import Preloader from '../Preloader';
import { useOnScreen } from '../../hooks/useOnScreen';
import styles from './styles.module.scss';

const cx = cn.bind(styles);

type ILoadableImage = {
  src: string;
  alt?: string;
  className?: string;
  containerClassName?: string;
};

export const LoadingImage: FC<ILoadableImage> = ({
  src,
  alt,
  className,
  containerClassName,
}) => {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isVisible = useOnScreen(containerRef);

  return (
    <div
      className={cx('imageContainer', containerClassName)}
      ref={containerRef}
    >
      <img
        className={cx('img', className, isLoaded && isVisible && 'loaded')}
        src={src}
        alt={alt}
        onLoad={() => setIsLoaded(true)}
      />
      {(!isLoaded || !isVisible) && <Preloader />}
    </div>
  );
};
