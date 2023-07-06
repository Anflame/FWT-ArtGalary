import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import cn from 'classnames/bind';

import Button from '../../ui/Button';
import Input from '../../ui/Input';
import MultiSelect from '../../ui/MultiSelect';
import TextArea from '../../ui/TextArea';

import { EditProfileScheme } from '../../utils/yupSchemes';

import type { EditProfileFormData, Listes } from '../../comon-types';
import { BtnVariants } from '../../variants';

import styles from './styles.module.scss';

const cx = cn.bind(styles);

type EditProfileFormProps = {
  handleEditProfile: (data: EditProfileFormData) => void;
  list: Listes[];
  setList: (list: Listes[]) => void;
};

const EditProfileForm: FC<EditProfileFormProps> = ({
  handleEditProfile,
  list,
  setList,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      yearsOfLife: '',
      location: '',
      description: '',
      genres: [],
    },
    resolver: yupResolver(EditProfileScheme),
  });

  return (
    <form
      className={cx('editProfileForm')}
      onSubmit={handleSubmit((data) => {
        handleEditProfile(data);
      })}
    >
      <Input
        control={control}
        name="name"
        id={'name'}
        placeholder={'Ivan Aivazovky'}
        label={'Name*'}
        errorMessage={errors.name?.message}
        isError={Boolean(errors.name?.message)}
      />
      <Input
        id={'year'}
        name="yearsOfLife"
        control={control}
        label={'Years of life'}
        errorMessage={errors.yearsOfLife?.message}
        isError={Boolean(errors.yearsOfLife?.message)}
      />
      <Input
        name="location"
        control={control}
        id={'location'}
        label={'Location'}
        errorMessage={errors.location?.message}
        isError={Boolean(errors.location?.message)}
      />
      <TextArea
        id={'description'}
        control={control}
        name="description"
        isError={Boolean(errors.description?.message)}
        errorMessage={errors.description?.message}
      />
      <MultiSelect
        label={'Genres*'}
        name="genres"
        control={control}
        list={list}
        setList={setList}
        errorMessage={errors.genres?.message}
      />

      <Button variant={BtnVariants.DEFAULT} children="save" />
    </form>
  );
};

export default EditProfileForm;
