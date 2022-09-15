import cn from 'classnames/bind';
import { FC } from 'react';
import { ReactComponent as Error } from '../../assets/images/error.svg';
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
          {<Error className={cx('errorImg')} fill={'#AE2917'} />}This is an
          error message!
        </p>
      </>
    )}
  </>
);
