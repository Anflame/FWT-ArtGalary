import cn from 'classnames/bind';
import { FC } from 'react';
import { Error } from '../../assets/icons';
import styles from './styles.module.scss';

const cx = cn.bind(styles);

type TextAreaProps = {
  isError: boolean;
};

export const TextArea: FC<TextAreaProps> = ({ isError }) => (
  <>
    {!isError && (
      <>
        <label htmlFor="deskription" className={cx('textareaLabel')}>
          Description
        </label>
        <textarea name="description" className={cx('textarea')}></textarea>
      </>
    )}
    {isError && (
      <>
        <label htmlFor="deskription" className={cx('textareaLabel')}>
          Description
        </label>
        <textarea
          className={cx('textarea', 'textAreaError')}
          placeholder="Wrong Text"
        ></textarea>
        <p className={cx('errorText')}>
          {<Error width={16} height={16} className={cx('errorImg')} />}This is
          an error message!
        </p>
      </>
    )}
  </>
);
