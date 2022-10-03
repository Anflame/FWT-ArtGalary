import React, { FC, useEffect } from 'react';
import cn from 'classnames/bind';
import Button from '../Button';
import Input from '../Input';
import { ClickEscape } from '../../hooks/ClickEscape';
import { Context } from '../../hooks/Context';
import { overflowHidden } from '../../hooks/OverFlowHidden';
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
  handleClickAuth: () => void;
};

export const Auth: FC<AuthProps> = ({
  isShowAuth,
  handleShowAuth,
  handleClickAuth,
}) => {
  const { theme } = Context();
  const goTo = (e: React.MouseEvent<HTMLButtonElement>, type: string) => {
    e.preventDefault();
    handleShowAuth(type);
  };
  const handleClickEscape = ClickEscape(() => handleShowAuth(false));
  const isShow = isShowAuth.logIn || isShowAuth.signUp || false;

  useEffect(() => {
    handleClickEscape();
    overflowHidden(isShow);
    return document.removeEventListener('keydown', () => handleShowAuth);
  }, [isShow]);

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
                  onSubmit={handleClickAuth}
                >
                  <Input
                    id={'emailInput'}
                    type={'email'}
                    className={'validation'}
                    label={'Email'}
                  />
                  <Input
                    id={'passwordInput'}
                    type={'password'}
                    className={'validation'}
                    label={'Password'}
                  />
                  <Button className={'defaultBtn'} isDisabled>
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
          </section>
        </>
      )}
    </>
  );
};
