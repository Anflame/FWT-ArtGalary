import React, { FC, useEffect, useState } from 'react';
import cn from 'classnames/bind';
import { selectListArray } from '../../constants';
import { useValidation } from '../../hooks/useValidation';
import Button from '../../ui/Button';
import Input from '../../ui/Input';
import MultiSelect from '../../ui/MultiSelect';
import TextArea from '../../ui/TextArea';
import Toast from '../../ui/Toast';
import styles from './styles.module.scss';

const cx = cn.bind(styles);

type EditProfileFormProps = {
  handleEditProfile: () => void;
};

export const EditProFileForm: FC<EditProfileFormProps> = ({
  handleEditProfile,
}) => {
  const [name, setName] = useState('');
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isErrorName, setErrorName] = useState(true);
  const [errorNameMessage, setErrorNameMessage] = useState('Заполните поле');
  const [year, setYear] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [selectList, setSelectList] = useState(selectListArray);

  const changeSelect = (e: React.MouseEvent<HTMLLIElement>) => {
    e.preventDefault();
    setSelectList(
      selectList.map((el) => {
        if (el.name === e.currentTarget.textContent)
          el.isChecked = !el.isChecked;
        return el;
      }),
    );
  };

  useEffect(() => {
    useValidation('name', name, setErrorName, setErrorNameMessage);
    if (selectList.filter((el) => el.isChecked).length === 0) {
      setIsError(true);
      setErrorMessage('Выбирете минимум один жанр');
    } else if (!/^Не корректное изображение$/.test(errorMessage))
      setIsError(false);
  }, [selectList]);

  return (
    <form className={cx('editProfileForm')} onSubmit={handleEditProfile}>
      <Input
        id={'name'}
        placeholder={'Ivan Aivazovky'}
        label={'Name*'}
        errorMessage={errorNameMessage}
        isError={isErrorName}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        id={'yearsOfLife'}
        label={'Years of life'}
        value={year}
        onChange={(e) => setYear(e.target.value)}
      />
      <Input
        id={'location'}
        label={'Location'}
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <TextArea
        id={'description'}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <MultiSelect
        label={'Genres*'}
        selectList={selectList}
        changeSelect={changeSelect}
      />
      <Button className={'defaultBtn'} disabled={isError || isErrorName}>
        save
      </Button>

      <Toast
        isShowToast={isError}
        handleCloseToast={() => setIsError(false)}
        message={errorMessage}
      />
    </form>
  );
};
