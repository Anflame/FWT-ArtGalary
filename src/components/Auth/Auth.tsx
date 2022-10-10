import React, { FC, useEffect, useState } from 'react';
import cn from 'classnames/bind';
import Button from '../Button';
import Input from '../Input';
import Toast from '../Toast';
import { Context } from '../../hooks/Context';
import { overflowHidden } from '../../hooks/OverFlowHidden';
import { PressEscape } from '../../hooks/PressEscape';
import { useAppDispatch, useAppSelector } from '../../hooks/Redux';
import { fetchAuth } from '../../store/API/auth';
import { changeAuth } from '../../store/auth/slice';
import { ReactComponent as CloseIcon } from '../../assets/images/closeIcon.svg';
import logInImg from '../../assets/images/logInImg.jpg';
import signUpImg from '../../assets/images/signUpImg.jpg';
import styles from './styles.module.scss';

const cx = cn.bind(styles);

export type AuthProps = {
  isShowAuth: {
    logIn: boolean;
    signUp: boolean;
  };
  handleShowAuth: (type?: string | boolean) => void;
  userEmail: string;
  userPassword: string;
  setUserEmail: (userEmail: string) => void;
  setUserPassword: (userPassword: string) => void;
};

export const Auth: FC<AuthProps> = ({
  isShowAuth,
  handleShowAuth,
  userEmail,
  userPassword,
  setUserEmail,
  setUserPassword,
}) => {
  const { theme } = Context();
  const handlePressEscape = PressEscape(() => handleShowAuth(false));
  const isShow = isShowAuth.logIn || isShowAuth.signUp || false;
  const [isErrorAuth, setIsErrorAuth] = useState(false);
  const [isErrorEmail, setErrorEmail] = useState<boolean>(true);
  const [errorEmailText, setIsErrorEmailText] = useState('Заполните поле');
  const [isErrorPassword, setIsErrorPassword] = useState<boolean>(true);
  const [errorPasswordText, setErrorPasswordText] = useState('Заполните поле');
  const [isShowPassword, setIsShowPassword] = useState(false);
  const { error } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const goTo = (e: React.MouseEvent<HTMLButtonElement>, type: string) => {
    e.preventDefault();
    handleShowAuth(type);
  };

  const handleClickAuth = (
    type: string,
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    if (type === 'logIn') {
      dispatch(
        fetchAuth({
          type: 'login',
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
        }
      });
    } else {
      dispatch(
        fetchAuth({
          type: 'register',
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
        }
      });
    }
  };

  useEffect(() => {
    handlePressEscape();
    overflowHidden(isShow);

    if (!userEmail || !/^.+@.+\..+$/i.test(userEmail)) {
      setErrorEmail(true);
      setIsErrorEmailText('Не корректный email');
    } else {
      setErrorEmail(false);
    }

    if (!userPassword) {
      setIsErrorPassword(true);
      setErrorPasswordText('Заполните поле');
    } else if (userPassword.length > 25) {
      setIsErrorPassword(true);
      setErrorPasswordText('Пароль не должен привышать 25 симоволов');
    } else if (
      !/(?=.*[0-9])(?=.*[\W])(?=.*[a-z])(?=.*[A-Z]){8,}/g.test(userPassword)
    ) {
      setIsErrorPassword(true);
      setErrorPasswordText(
        'Пароль должен иметь больше 8 символов, заглавную букву, цифру и спец. символ',
      );
    } else {
      setIsErrorPassword(false);
    }

    return document.removeEventListener('keydown', () => handleShowAuth);
  }, [isShow, userEmail, userPassword]);

  return (
    <>
      {(isShowAuth.logIn || isShowAuth.signUp) && (
        <>
          <section className={cx('auth')} onClick={() => handleShowAuth(false)}>
            <div
              className={cx('authContent')}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={isShowAuth.signUp ? signUpImg : logInImg}
                alt="authBackGround"
                className={cx('signUpBackgroundImg')}
              />
              <div className={cx('validationWrapp')}>
                <h2 className={cx('validationHeading')}>
                  {isShowAuth.signUp ? 'Create your profile' : 'Welcome Back'}
                </h2>
                <p className={cx('link')}>
                  {isShowAuth.signUp
                    ? 'If you already have an account, please '
                    : 'If you don"t have an account yet, please '}
                  <button
                    className={cx('goTo')}
                    onClick={
                      isShowAuth.signUp
                        ? (e) => goTo(e, 'logIn')
                        : (e) => goTo(e, 'signUp')
                    }
                  >
                    {isShowAuth.signUp ? 'log in' : 'sign up'}
                  </button>
                </p>
                <form
                  className={cx('validationForm')}
                  onSubmit={
                    isShowAuth.signUp
                      ? (e) => handleClickAuth('signUp', e)
                      : (e) => handleClickAuth('logIn', e)
                  }
                >
                  <Input
                    id={'emailInput'}
                    type={'email'}
                    className={'validation'}
                    label={'Email'}
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    isError={isErrorEmail}
                    errorMessage={errorEmailText}
                  />
                  <Input
                    id={'passwordInput'}
                    type={isShowPassword ? 'text' : 'password'}
                    className={'validation'}
                    label={'Password'}
                    value={userPassword}
                    onChange={(e) => setUserPassword(e.target.value)}
                    isError={isErrorPassword}
                    errorMessage={errorPasswordText}
                  />
                  <Button
                    className={'defaultBtn'}
                    isDisabled={isErrorEmail || isErrorPassword}
                  >
                    {isShowAuth.signUp ? 'sign up' : 'log in'}
                  </Button>
                  <p className={cx('link', 'linkMobile')}>
                    {isShowAuth.signUp
                      ? 'If you already have an account, please '
                      : 'If you don"t have an account yet, please '}
                    <button
                      className={cx('goToLogIn')}
                      onClick={
                        isShowAuth.signUp
                          ? (e) => goTo(e, 'logIn')
                          : (e) => goTo(e, 'signUp')
                      }
                    >
                      log in
                    </button>
                  </p>
                </form>
                <CloseIcon
                  onClick={() => handleShowAuth(false)}
                  fill={theme === 'dark' ? '#575757' : '#9C9C9C'}
                  className={cx('closeIcon')}
                />
              </div>
            </div>
            <Toast
              isShowToast={isErrorAuth}
              handleCloseToast={() => setIsErrorAuth(false)}
              message={error}
            />
          </section>
        </>
      )}
    </>
  );
};
