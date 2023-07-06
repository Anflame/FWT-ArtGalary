import { array, boolean, object, string } from 'yup';

export const EditProfileScheme = object().shape({
  name: string().required(),
  yearsOfLife: string().matches(
    /^(\d{3,4})-+(\d{3,4})?$/,
    'Не верный формат даты',
  ),
  location: string(),
  description: string().max(255),
  genres: array()
    .min(1, 'Выберите как минимум 1 жанр')
    .of(
      object().shape({
        _id: string().required(),
        name: string().required(),
        isChecked: boolean().required(),
      }),
    ),
});

export const authSheme = object().shape({
  email: string().email().required(),
  password: string()
    .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,32}$/)
    .required(),
});

export const editPaintingScheme = object().shape({
  name: string().required(),
  yearOfCreation: string()
    .required()
    .matches(/^\d{3,}$/),
});
