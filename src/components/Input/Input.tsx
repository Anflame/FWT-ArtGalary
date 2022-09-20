import { FC } from 'react';
import cn from 'classnames/bind';
import type { InputsProps } from '../../comon-types';
import { ReactComponent as Error } from '../../assets/images/error.svg';
import styles from './styles.module.scss';

const cx = cn.bind(styles);

export const Input: FC<InputsProps> = ({ isError, id, type, className }) => (
  <>
    <input
      className={cx('input', isError && 'inputError', className)}
      placeholder={isError ? 'Wrong Text' : 'Placeholder'}
      id={id}
      type={type}
    />
    {isError && (
      <p className={cx('errorText')}>
        {<Error className={cx('errorImg')} fill={'#AE2917'} />}This is an error
        message!
      </p>
    )}
  </>
);
