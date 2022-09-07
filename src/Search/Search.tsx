import { FC, useContext, useState } from 'react';
import cn from 'classnames/bind';
import styles from './styles.module.scss';
import searchBtnImg from '../assets/images/searchBtnImg.svg';
import searchBtnImgLigth from '../assets/images/searchBtnImgLigth.svg';
import cleanSearchBtn from '../assets/images/cleanSearchBtn.svg';
import cleanSearchBtnLight from '../assets/images/cleanSearchBtnLight.svg';
import { ThemeContext } from '../utils/ThemeContext';
import { InputsProps } from '../comon-types';

const cx = cn.bind(styles);

type SearchProps = {
  handleSubmitForm: () => void;
} & InputsProps;

export const Search: FC<SearchProps> = ({ handleSubmitForm, isError }) => {
  const { theme } = useContext(ThemeContext);
  const [blurSearch, setBlurSearch] = useState(false);
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
            blurSearch && 'blurSearch'
          )}
          value={value}
          placeholder="placeholder"
          onBlur={() => setBlurSearch(true)}
          onFocus={() => setBlurSearch(false)}
          onChange={handleChange}
        />
        <button className={cx('searchBtn')}>
          <img
            className={cx('searchBtnImg')}
            src={theme === 'dark' ? searchBtnImg : searchBtnImgLigth}
          />
        </button>
        {blurSearch && (
          <button onClick={handeDelete}>
            <img
              className={cx('cleanSearchBtn')}
              src={theme === 'dark' ? cleanSearchBtn : cleanSearchBtnLight}
            />
          </button>
        )}
        {isError && (
          <p className={cx('errorText')}>This is an error message!</p>
        )}
      </>
    </form>
  );
};
