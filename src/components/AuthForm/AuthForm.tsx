import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import cn from 'classnames/bind';

import { fetchAuth } from '../../store/API/auth';
import { clearAuthError } from '../../store/auth/slice';

import Button from '../../ui/Button';
import Input from '../../ui/Input';
import Preloader from '../../ui/Preloader';

import { authSheme } from '../../utils/yupSchemes';

import { useShowError } from '../../hooks/useErrorContext';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';

import { BtnVariants } from '../../variants';

import styles from './styles.module.scss';

const cx = cn.bind(styles);

type AuthFormProps = {
  signUp: boolean;
  goTo: (type: string) => void;
  handleShowAuth: (type?: string | boolean) => void;
};

type SubmitForm = {
  email: string | undefined;
  password: string | undefined;
};

const AuthForm: FC<AuthFormProps> = ({ signUp, goTo, handleShowAuth }) => {
  const dispatch = useAppDispatch();
  const { error, isLoading } = useAppSelector(({ auth }) => auth);

  useShowError(error, clearAuthError);

  const {
    control,
    handleSubmit,
    formState: { errors, isLoading: isAuthorizing },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(authSheme),
  });

  const [isShowPassword, setIsShowPassword] = useState(false);

  const handleClickAuth = (data: SubmitForm) => {
    if (!data.password || !data.email) return;
    const { password, email } = data;
    dispatch(
      fetchAuth({
        type: signUp ? 'register' : 'login',
        auth: {
          fingerprint: 'string',
          username: email,
          password,
        },
      }),
    ).then(({ payload }) => {
      if (!payload) return;
      if (typeof payload !== 'object') return;
      if ('accessToken' in payload && 'refreshToken' in payload) {
        handleShowAuth();
      }
    });
  };

  return (
    <>
      {isLoading && <Preloader />}
      <form
        className={cx('validationForm')}
        onSubmit={handleSubmit(handleClickAuth)}
      >
        <Input
          control={control}
          name="email"
          type="email"
          label="Email"
          isError={!!errors.email?.message}
          errorMessage={errors.email?.message}
        />
        <Input
          name="password"
          control={control}
          id={'passwordInput'}
          type={!isShowPassword ? 'password' : 'text'}
          handleChangeShowPassword={() => setIsShowPassword(!isShowPassword)}
          label="Password"
          isError={!!errors.password?.message}
          errorMessage={errors.password?.message}
        />
        <Button
          variant={BtnVariants.DEFAULT}
          type={'submit'}
          disabled={isAuthorizing}
        >
          {signUp ? 'sign up' : 'log in'}
        </Button>
        <p className={cx('link', 'linkMobile')}>
          {signUp
            ? 'If you already have an account, please '
            : 'If you don"t have an account yet, please '}
          <button
            className={cx('goTo')}
            onClick={() => goTo(signUp ? 'login' : 'signUp')}
          >
            log in
          </button>
        </p>
      </form>
    </>
  );
};

export default AuthForm;
