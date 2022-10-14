import React, { FC, useState } from 'react';
import cn from 'classnames/bind';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { useValidation } from '../../hooks/useValidation';
import { fetchAuth } from '../../store/API/auth';
import { changeAuth } from '../../store/auth/slice';
import Button from '../../ui/Button';
import Input from '../../ui/Input';
import Toast from '../../ui/Toast';
import styles from './styles.module.scss';

const cx = cn.bind(styles);

type AuthFormProps = {
  signUp: boolean;
  goTo: (e: React.MouseEvent<HTMLButtonElement>, type: string) => void;
  handleShowAuth: (type?: string | boolean) => void;
};

export const AuthForm: FC<AuthFormProps> = ({
  signUp,
  goTo,
  handleShowAuth,
}) => {
  const dispatch = useAppDispatch();
  const { error } = useAppSelector(({ auth }) => auth);

  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [isErrorAuth, setIsErrorAuth] = useState(false);
  const [isErrorEmail, setIsErrorEmail] = useState(true);
  const [errorEmailMessage, setErrorEmailMessage] = useState('Заполните поле');
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isErrorPassword, setIsErrorPassword] = useState(true);
  const [errorPasswordMessage, setErrorPasswordMessage] =
    useState('Заполните поле');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: string,
  ) => {
    if (type === 'email') {
      setUserEmail(e.target.value);
      useValidation(
        'email',
        e.target.value,
        setIsErrorEmail,
        setErrorEmailMessage,
      );
    }
    if (type === 'password') {
      setUserPassword(e.target.value);
      useValidation(
        'password',
        e.target.value,
        setIsErrorPassword,
        setErrorPasswordMessage,
      );
    }
  };

  const handleClickAuth = (
    type: string,
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    dispatch(
      fetchAuth({
        type,
        auth: {
          fingerprint: 'string',
          username: userEmail,
          password: userPassword,
        },
      }),
    ).then((data) => {
      if (data.meta.requestStatus === 'fulfilled') {
        dispatch(changeAuth(true));
        handleShowAuth(false);
      } else {
        setIsErrorAuth(true);
      }
    });
  };

  return (
    <>
      <form
        className={cx('validationForm')}
        onSubmit={
          signUp
            ? (e) => handleClickAuth('register', e)
            : (e) => handleClickAuth('login', e)
        }
      >
        <Input
          id={'emailInput'}
          type={'email'}
          label={'Email'}
          value={userEmail}
          onChange={(e) => handleChange(e, 'email')}
          isError={isErrorEmail}
          errorMessage={errorEmailMessage}
        />
        <Input
          id={'passwordInput'}
          type={!isShowPassword ? 'password' : 'text'}
          handleChangeShowPassword={() => setIsShowPassword(!isShowPassword)}
          label={'Password'}
          value={userPassword}
          onChange={(e) => handleChange(e, 'password')}
          isError={isErrorPassword}
          errorMessage={errorPasswordMessage}
        />
        <Button
          className={'defaultBtn'}
          disabled={isErrorEmail || isErrorPassword}
        >
          {signUp ? 'sign up' : 'log in'}
        </Button>
        <p className={cx('link', 'linkMobile')}>
          {signUp
            ? 'If you already have an account, please '
            : 'If you don"t have an account yet, please '}
          <button
            className={cx('goTo')}
            onClick={
              signUp ? (e) => goTo(e, 'logIn') : (e) => goTo(e, 'signUp')
            }
          >
            log in
          </button>
        </p>
      </form>
      <Toast
        isShowToast={isErrorAuth}
        handleCloseToast={() => setIsErrorAuth(false)}
        message={error}
      />
    </>
  );
};
