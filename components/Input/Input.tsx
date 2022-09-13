import cn from 'classnames/bind';
import { FC } from 'react';
import { Error } from '../../assets/icons';
import type { InputsProps } from '../../comon-types';
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
        {<Error width={16} height={16} className={cx('errorImg')} />}This is an
        error message!
      </p>
    )}
  </>
);
