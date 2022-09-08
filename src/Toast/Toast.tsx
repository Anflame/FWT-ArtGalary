import { FC } from 'react';
import cn from 'classnames/bind';
import styles from './styles.module.scss';
import closeIcon from '../assets/images/closeIcon.svg';
import closeIconLight from '../assets/images/closeIconLight.svg';
import { Context } from '../hooks/Context';
import { Error } from '../assets/icons';

const cx = cn.bind(styles);

type ToastProps = {
  message: string;
  handleCloseToast: () => void;
  isShowToast: boolean;
};

export const Toast: FC<ToastProps> = ({
  message,
  handleCloseToast,
  isShowToast,
}) => {
  const { theme } = Context();

  return (
    <div className={cx('toast', !isShowToast && 'showToast')}>
      <h3 className={cx('toastHeading')}>
        {<Error width={16} height={16} className={cx('errorImg')} />}
        Error!
      </h3>
      <p className={cx('toastText')}>
        {<Error width={16} height={16} className={cx('errorImg')} />}
        {message}
      </p>
      <img
        className={cx('toastCloseIcon')}
        src={theme === 'dark' ? closeIcon : closeIconLight}
        onClick={handleCloseToast}
      />
    </div>
  );
};
