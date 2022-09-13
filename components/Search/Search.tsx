import { FC, useState } from 'react';
import cn from 'classnames/bind';
import styles from './styles.module.scss';
import type { InputsProps } from '../../comon-types';
import { Context } from '../../hooks/Context';
import { CleanSearchBtn, Error, SearchBtnImg } from '../../assets/icons';

const cx = cn.bind(styles);

type SearchProps = {
  handleSubmitForm: () => void;
} & InputsProps;

export const Search: FC<SearchProps> = ({ handleSubmitForm, isError }) => {
  const { theme } = Context();
  const [isblurSearch, setIsBlurSearch] = useState(false);
  const [value, setValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handeDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setValue('');
  };

  return (
    <form className={cx('search')} onSubmit={handleSubmitForm}>
      <>
        <input
          type="text"
          className={cx(
            'searchIput',
            isError && 'searchError',
            isblurSearch && 'blurSearch',
          )}
          value={value}
          placeholder="placeholder"
          onBlur={() => setIsBlurSearch(true)}
          onFocus={() => setIsBlurSearch(false)}
          onChange={handleChange}
        />
        <SearchBtnImg
          className={cx('searchBtn')}
          width={16}
          height={16}
          fill={theme === 'dark' ? '#575757' : '#DEDEDE'}
        />
        {isblurSearch && (
          <CleanSearchBtn
            onClick={handeDelete}
            className={cx('cleanSearchBtn')}
            width={8}
            height={8}
            fill={theme === 'dark' ? '#575757' : '#DEDEDE'}
          />
        )}
        {isError && (
          <p className={cx('errorText')}>
            {<Error width={16} height={16} className={cx('errorImg')} />}This is
            an error message!
          </p>
        )}
      </>
    </form>
  );
};
