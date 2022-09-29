import { FC, useState } from 'react';
import cn from 'classnames/bind';
import { ReactComponent as Error } from '../../assets/images/error.svg';
import styles from './styles.module.scss';

const cx = cn.bind(styles);

type TextAreaProps = {
  id: string;
};

export const TextArea: FC<TextAreaProps> = ({ id, ...args }) => {
  const [isError, setIsError] = useState(false);
  const [text, setText] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= 255) {
      setText(e.target.value);
      if (isError) setIsError(false);
    } else setIsError(true);
  };

  return (
    <>
      {!isError && (
        <>
          <label htmlFor="deskription" className={cx('textareaLabel')}>
            Description
          </label>
          <textarea
            name="description"
            className={cx('textarea')}
            id={id}
            {...args}
          ></textarea>
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
            onChange={handleChange}
          >
            {text}
          </textarea>
          <p className={cx('errorText')}>
            {<Error className={cx('errorImg')} fill={'#AE2917'} />}This is an
            error message!
          </p>
        </>
      )}
    </>
  );
};
