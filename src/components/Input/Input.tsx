import { FC, useState } from 'react';
import cn from 'classnames/bind';
import type { InputsProps } from '../../comon-types';
import { ReactComponent as Error } from '../../assets/images/error.svg';
import styles from './styles.module.scss';

const cx = cn.bind(styles);

export const Input: FC<InputsProps> = ({
  id,
  type,
  className,
  placeholder,
  label,
  ...args
}) => {
  const [isError] = useState(false);
  const [value, setValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <div>
      <label htmlFor={id} className={cx('inputLabel')}>
        {label}
      </label>
      <input
        className={cx('input', isError && 'inputError', className)}
        id={id}
        type={type || 'text'}
        {...args}
        placeholder={isError ? 'Wrong Text' : placeholder || ''}
        value={value}
        onChange={handleChange}
      />
      {isError && (
        <p className={cx('errorText')}>
          {<Error className={cx('errorImg')} fill={'#AE2917'} />}This is an
          error message!
        </p>
      )}
    </div>
  );
};
