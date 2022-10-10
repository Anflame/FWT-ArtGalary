import { FC, useState } from 'react';
import cn from 'classnames/bind';
import type { InputsProps } from '../../comon-types';
import { ReactComponent as Error } from '../../assets/images/error.svg';
import { ReactComponent as ShowPasswordIcon } from '../../assets/images/showPasswordIcon.svg';
import styles from './styles.module.scss';

const cx = cn.bind(styles);

export const Input: FC<InputsProps> = ({
  id,
  type,
  className,
  placeholder,
  onChange,
  value,
  label,
  isError,
  errorMessage,
  ...args
}) => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  return (
    <div className={cx('inputWrapp', className)}>
      <label htmlFor={id} className={cx('inputLabel')}>
        {label}
      </label>
      <div className={cx('inputWrapp')}>
        <input
          className={cx('input', isError && 'inputError')}
          id={id}
          type={type === 'password' && isShowPassword ? 'text' : type}
          {...args}
          placeholder={isError ? 'Wrong Text' : placeholder || ''}
          value={value}
          onChange={onChange}
        />
        {type === 'password' && (
          <ShowPasswordIcon
            className={cx('passwordShowIcon')}
            onClick={() => setIsShowPassword(!isShowPassword)}
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
