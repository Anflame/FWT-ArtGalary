import { FC, FormEvent, useState } from 'react';
import cn from 'classnames/bind';

import Button from '../Button/Button';

import { useThemeContext } from '../../hooks/useThemeContext';

import { BtnVariants } from '../../variants';

import { ReactComponent as CleanSearchIcon } from '../../assets/images/cleanSearchIcon.svg';
import { ReactComponent as Error } from '../../assets/images/error.svg';
import { ReactComponent as SearchIcon } from '../../assets/images/searchIcon.svg';

import styles from './styles.module.scss';

const cx = cn.bind(styles);

type SearchProps = {
  handleSubmitForm: (value: string, e: FormEvent<HTMLFormElement>) => void;
  handleClear: () => void;
};

const Search: FC<SearchProps> = ({ handleSubmitForm, handleClear }) => {
  const { theme } = useThemeContext();
  const [isblurSearch, setIsBlurSearch] = useState(false);
  const [value, setValue] = useState('');
  const [isError] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handeDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setValue('');
    handleClear();
  };

  return (
    <form className={cx('search')} onSubmit={(e) => handleSubmitForm(value, e)}>
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
        <button type="submit" style={{ background: 'none', border: 'none' }}>
          <SearchIcon
            className={cx('searchBtn')}
            fill={theme === 'dark' ? '#575757' : '#DEDEDE'}
          />
        </button>
        {isblurSearch && (
          <CleanSearchIcon
            onClick={handeDelete}
            className={cx('cleanSearchBtn')}
            fill={theme === 'dark' ? '#575757' : '#DEDEDE'}
          />
        )}
        {isError && (
          <p className={cx('errorText')}>
            {<Error className={cx('errorImg')} fill={'#AE2917'} />}This is an
            error message!
          </p>
        )}
      </>
    </form>
  );
};

export default Search;
