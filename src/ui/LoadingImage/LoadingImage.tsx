import { FC, useRef, useState } from 'react';
import cn from 'classnames/bind';

import { TImage } from '../../store/types';

import Preloader from '../Preloader';

import { useOnScreen } from '../../hooks/useOnScreen';

import { BASE_URL } from '../../constants';

import styles from './styles.module.scss';

const cx = cn.bind(styles);

type ILoadableImage = {
  image: TImage | string;
  needOptimizing: boolean;
  alt?: string;
  className?: string;
  containerClassName?: string;
};

const LoadingImage: FC<ILoadableImage> = ({
  image,
  needOptimizing,
  alt,
  className,
  containerClassName,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const ref = useRef(null);
  const isVisible = useOnScreen(ref);

  const formatImage = (): {
    src: string;
    srcSet: string | undefined;
  } => {
    const src =
      typeof image === 'object' && origin in image
        ? `${BASE_URL}${image?.original}`
        : (image as string);
    const srcSet =
      typeof image === 'object'
        ? `${BASE_URL}${image.webp} 1024w, ${BASE_URL}${image.webp2x}`
        : undefined;
    return {
      src,
      srcSet,
    };
  };

  return (
    <div className={cx('imageContainer', containerClassName)} ref={ref}>
      <img
        srcSet={(needOptimizing && formatImage().srcSet) || undefined}
        src={formatImage().src}
        alt={alt}
        className={cx([className, 'img', isLoaded && isVisible && 'loaded'])}
        onLoad={() => setIsLoaded(true)}
      />
      {!isLoaded && isVisible && (
        <div className={cx(containerClassName || 'loadingWrapp')}>
          <Preloader />
        </div>
      )}
    </div>
  );
};

export default LoadingImage;
