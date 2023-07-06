import { FC, useEffect } from 'react';
import { createPortal } from 'react-dom';
import cn from 'classnames/bind';

import Button from '../Button';

import { usePressEscape } from '../../hooks/usePressEscape';
import { useThemeContext } from '../../hooks/useThemeContext';

import { modalNode } from '../../constants';

import type { SetIsShow } from '../../comon-types';
import { BtnVariants } from '../../variants';

import { ReactComponent as CloseIcon } from '../../assets/images/closeIcon.svg';
import { ReactComponent as DeleteIcon } from '../../assets/images/deleteIcon.svg';

import styles from './styles.module.scss';

const cx = cn.bind(styles);

type DeleteProps = {
  isShowDelete: boolean;
  handleChangeShowDelete: SetIsShow;
  handleDelete: () => void;
  title: string;
  subTitle: string;
};

const Delete: FC<DeleteProps> = ({
  isShowDelete,
  handleChangeShowDelete,
  handleDelete,
  title,
  subTitle,
}) => {
  const { theme } = useThemeContext();

  useEffect(() => {
    usePressEscape(handleChangeShowDelete, isShowDelete);
    return document.removeEventListener('keydown', () =>
      handleChangeShowDelete(false),
    );
  }, [isShowDelete]);

  return createPortal(
    <>
      {isShowDelete && (
        <section
          className={cx('deleteProfile')}
          onClick={() => handleChangeShowDelete(false)}
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
            <h3 className={cx('deleteProfileHeading')}>{title}</h3>
            <p className={cx('deleteProfileText')}>{subTitle}</p>
            <Button handleClick={handleDelete} variant={BtnVariants.DEFAULT}>
              delete
            </Button>
            <p
              className={cx('deleteProfileCancel')}
              onClick={() => handleChangeShowDelete(false)}
            >
              cancel
            </p>
            <CloseIcon
              onClick={() => handleChangeShowDelete(false)}
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

export default Delete;
