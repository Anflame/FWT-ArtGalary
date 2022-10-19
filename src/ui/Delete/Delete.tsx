import React, { FC, useEffect } from 'react';
import { createPortal } from 'react-dom';
import cn from 'classnames/bind';
import Button from '../Button';
import { modalNode } from '../../constants';
import { usePressEscape } from '../../hooks/usePressEscape';
import { useThemeContext } from '../../hooks/useThemeContext';
import { useUnScroll } from '../../hooks/useUnScroll';
import type { SetIsShow } from '../../comon-types';
import { ReactComponent as CloseIcon } from '../../assets/images/closeIcon.svg';
import { ReactComponent as DeleteIcon } from '../../assets/images/deleteIcon.svg';
import styles from './styles.module.scss';

const cx = cn.bind(styles);

type DeleteProps = {
  isShowDelete: boolean;
  setIsShowDelete: SetIsShow;
};

export const Delete: FC<DeleteProps> = ({ isShowDelete, setIsShowDelete }) => {
  const { theme } = useThemeContext();

  const handleDeleteProfile = () => {};

  useEffect(() => {
    useUnScroll(isShowDelete);
    usePressEscape(setIsShowDelete, isShowDelete);
    return document.removeEventListener('keydown', () =>
      setIsShowDelete(false),
    );
  }, [isShowDelete]);

  return createPortal(
    <>
      {isShowDelete && (
        <section
          className={cx('deleteProfile')}
          onClick={() => setIsShowDelete(false)}
        >
          <div
            className={cx('deleteProfileContent')}
            onClick={(e) => e.stopPropagation()}
          >
            <DeleteIcon
              className={cx('deleteProfileIcon')}
              fill={theme === 'dark' ? '#9C9C9C' : '#575757'}
              width="40px"
              height="40px"
            />
            <h3 className={cx('deleteProfileHeading')}>
              Do you want to delete this artist profile?
            </h3>
            <p className={cx('deleteProfileText')}>
              You will not be able to recover this profile afterwards.
            </p>
            <Button handleClick={handleDeleteProfile} className={'defaultBtn'}>
              delete
            </Button>
            <p
              className={cx('deleteProfileCancel')}
              onClick={() => setIsShowDelete(false)}
            >
              cancel
            </p>
            <CloseIcon
              onClick={() => setIsShowDelete(false)}
              fill={theme === 'dark' ? '#9C9C9C' : '#575757'}
              className={cx('closeIcon')}
            />
          </div>
        </section>
      )}
    </>,
    modalNode,
  );
};
