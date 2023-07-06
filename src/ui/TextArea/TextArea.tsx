import { TextareaHTMLAttributes } from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import cn from 'classnames/bind';

import { ReactComponent as Error } from '../../assets/images/error.svg';

import styles from './styles.module.scss';

const cx = cn.bind(styles);

type TextAreaProps<T extends FieldValues> = {
  id: string;
  control: Control<T>;
  name: Path<T>;
  isError: boolean;
  errorMessage: string | undefined;
};

const TextArea = <T extends FieldValues>({
  id,
  control,
  name,
  isError,
  errorMessage,
  ...args
}: TextAreaProps<T> & TextareaHTMLAttributes<HTMLTextAreaElement>) => (
  <Controller
    control={control}
    name={name}
    render={({ field: { value, onChange } }) => (
      <div className={cx('textAreaWrapp')}>
        <label htmlFor={id} className={cx('textareaLabel')}>
          {name.charAt(0).toUpperCase() + name.slice(1)}
        </label>
        <textarea
          name="description"
          className={cx('textarea', isError && 'textAreaError')}
          id={id}
          {...args}
          onChange={onChange}
          value={value}
        ></textarea>
        {isError && (
          <p className={cx('errorText')}>
            {<Error className={cx('errorImg')} fill={'#AE2917'} />}
            {errorMessage}
          </p>
        )}
      </div>
    )}
  />
);

export default TextArea;
