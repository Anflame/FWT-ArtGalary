import React, { FC, useEffect, useState } from 'react';
import cn from 'classnames/bind';
import { overflowHidden } from '../../hooks/overFlowHidden';
import { pressEscape } from '../../hooks/pressEscape';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { themeContext } from '../../hooks/themeContext';
import { validation } from '../../hooks/validation';
import { fetchAuth } from '../../store/API/auth';
import { changeAuth } from '../../store/auth/slice';
import Button from '../../ui/Button';
import Input from '../../ui/Input';
import Toast from '../../ui/Toast';
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
};

export const Auth: FC<AuthProps> = ({ isShowAuth, handleShowAuth }) => {
  const { theme } = themeContext();
  const isShow = isShowAuth.logIn || isShowAuth.signUp || false;
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [isErrorAuth, setIsErrorAuth] = useState(false);
  const [isErrorEmail, setErrorEmail] = useState<boolean>(true);
  const [errorEmailMessage, setIsErrorEmailMessage] =
    useState('Заполните поле');
  const [isErrorPassword, setIsErrorPassword] = useState<boolean>(true);
  const [errorPasswordMessage, setErrorPasswordMessage] =
    useState('Заполните поле');
  const { error } = useAppSelector(({ auth }) => auth);
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

  useEffect(() => {
    pressEscape(() => handleShowAuth(false));
    overflowHidden(isShow);

    validation('email', userEmail, setErrorEmail, setIsErrorEmailMessage);
    validation(
      'password',
      userPassword,
      setIsErrorPassword,
      setErrorPasswordMessage,
    );

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
                      ? (e) => handleClickAuth('register', e)
                      : (e) => handleClickAuth('login', e)
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
                    errorMessage={errorEmailMessage}
                  />
                  <Input
                    id={'passwordInput'}
                    type={'password'}
                    className={'validation'}
                    label={'Password'}
                    value={userPassword}
                    onChange={(e) => setUserPassword(e.target.value)}
                    isError={isErrorPassword}
                    errorMessage={errorPasswordMessage}
                  />
                  <Button
                    className={'defaultBtn'}
                    disabled={isErrorEmail || isErrorPassword}
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
              <Toast
                isShowToast={isErrorAuth}
                handleCloseToast={() => setIsErrorAuth(false)}
                message={error}
              />
            </div>
          </section>
        </>
      )}
    </>
  );
};
