import { Control, FieldValues, Path, UseFormReset } from 'react-hook-form';

import { TImage } from './store/types';

export type SetIsShow = (isShow: boolean) => void;

export type CardProps = {
  id: string;
  title: string;
  handleCLick?: () => void;
  image: TImage | string;
  year: string;
  isPrimary?: boolean;
};

export type AuthParams = {
  type: string;
  auth: {
    username: string;
    password: string;
    fingerprint: string;
  };
};

export type MenuProps = {
  isShow?: boolean;
  handleChangeShowMenu: (isShow: boolean) => void;
  handleShowAuth: (type?: string | boolean) => void;
};

export type InputsProps<T extends FieldValues> = {
  className?: string;
  isError?: boolean;
  errorMessage?: string;
  control?: Control<T>;
  name: Path<T>;
  label: string;
  handleChangeShowPassword?: () => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export type EditProfileFormData = {
  name: string;
  yearsOfLife?: string;
  location?: string;
  description?: string;
  genres: Listes[] | Array<Pick<Listes, '_id'>> | undefined;
};

export type Listes = {
  _id: string;
  name: string;
  isChecked: boolean;
};

export type TemporaryPaintings = {
  _id: string;
  image: TImage | string;
  name: string;
  yearOfCreation: string;
};

export type TResetEditProfile = UseFormReset<{
  name: string;
  yearsOfLife: string;
  location: string;
  description: string;
  genres:
    | {
        name: string;
        _id: string;
        isChecked: NonNullable<boolean | undefined>;
      }[]
    | undefined;
}>;

export type TAddPaintingData = {
  formData: FormData;
  id: string | undefined;
};
