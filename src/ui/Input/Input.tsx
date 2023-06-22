import { FC, InputHTMLAttributes } from 'react';
import cn from 'classnames/bind';

import type { InputsProps } from '../../comon-types';

import { ReactComponent as Error } from '../../assets/images/error.svg';
import { ReactComponent as ShowPasswordIcon } from '../../assets/images/showPasswordIcon.svg';

import styles from './styles.module.scss';

const cx = cn.bind(styles);

export const Input: FC<InputsProps & InputHTMLAttributes<HTMLInputElement>> = ({
  className,
  onChange,
  label,
  isError,
  errorMessage,
  handleChangeShowPassword,
  ...args
}) => {
  const { placeholder, value, id, type } = args;

  return (
    <div className={cx('inputWrapp', className)}>
      <label htmlFor={id} className={cx('inputLabel')}>
        {label}
      </label>
      <div className={cx('inputWrapp')}>
        <input
          className={cx('input', isError && 'inputError')}
          type={type}
          placeholder={isError ? 'Wrong Text' : placeholder || ''}
          value={value}
          onChange={onChange}
          {...args}
        />
        {label === 'Password' && (
          <ShowPasswordIcon
            className={cx('passwordShowIcon')}
            onClick={
              label === 'Password' ? handleChangeShowPassword : undefined
            }
          />
        )}
      </div>
      {isError && (
        <div className={cx('errorText')}>
          {<Error className={cx('errorImg')} fill={'#AE2917'} />}
          <p>{errorMessage}</p>
        </div>
      )}
    </div>
  );
};
