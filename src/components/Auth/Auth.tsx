import React, { FC, useEffect } from 'react';
import { createPortal } from 'react-dom';
import cn from 'classnames/bind';

import { AuthForm } from '../AuthForm/AuthForm';

import { usePressEscape } from '../../hooks/usePressEscape';
import { useThemeContext } from '../../hooks/useThemeContext';

import { modalNode } from '../../constants';

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
  const { theme } = useThemeContext();
  const { logIn, signUp } = isShowAuth;

  const goTo = (e: React.MouseEvent<HTMLButtonElement>, type: string) => {
    e.preventDefault();
    handleShowAuth(type);
  };
  useEffect(() => {
    usePressEscape(handleShowAuth, logIn || signUp);
  }, [isShowAuth]);

  return createPortal(
    <>
      {(logIn || signUp) && (
        <>
          <section className={cx('auth')} onClick={() => handleShowAuth(false)}>
            <div
              className={cx('authContent')}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={signUp ? signUpImg : logInImg}
                alt="authBackGround"
                className={cx('signUpBackgroundImg')}
              />
              <div className={cx('validationWrapp')}>
                <h2 className={cx('validationHeading')}>
                  {signUp ? 'Create your profile' : 'Welcome Back'}
                </h2>
                <p className={cx('link')}>
                  {signUp
                    ? 'If you already have an account, please '
                    : 'If you don"t have an account yet, please '}
                  <button
                    className={cx('goTo')}
                    onClick={
                      signUp
                        ? (e) => goTo(e, 'logIn')
                        : (e) => goTo(e, 'signUp')
                    }
                  >
                    {signUp ? 'log in' : 'sign up'}
                  </button>
                </p>
                <AuthForm
                  signUp={signUp}
                  goTo={goTo}
                  handleShowAuth={handleShowAuth}
                />
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
    </>,
    modalNode,
  );
};
