import { InputHTMLAttributes } from 'react';
import { Controller, FieldValues } from 'react-hook-form';
import cn from 'classnames/bind';

import type { InputsProps } from '../../comon-types';

import { ReactComponent as Error } from '../../assets/images/error.svg';
import { ReactComponent as ShowPasswordIcon } from '../../assets/images/showPasswordIcon.svg';

import styles from './styles.module.scss';

const cx = cn.bind(styles);

const Input = <T extends FieldValues>({
  control,
  className,
  label,
  name,
  isError,
  errorMessage,
  handleChangeShowPassword,
  ...args
}: InputsProps<T> & InputHTMLAttributes<HTMLInputElement>) => {
  const { placeholder, id } = args;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => (
        <div className={cx('inputWrapp', className)}>
          <label htmlFor={id} className={cx('inputLabel')}>
            {label}
          </label>
          <div className={cx('inputWrapp')}>
            <input
              className={cx('input', isError && 'inputError')}
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
      )}
    />
  );
};

export default Input;
