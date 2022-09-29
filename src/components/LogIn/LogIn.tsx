import React, { FC, useEffect } from 'react';
import cn from 'classnames/bind';
import Button from '../Button';
import Input from '../Input';
import { ClickEscape } from '../../hooks/ClickEscape';
import { Context } from '../../hooks/Context';
import type { AuthProps } from '../../comon-types';
import { ReactComponent as CloseIcon } from '../../assets/images/closeIcon.svg';
import logInImg from '../../assets/images/logInImg.jpg';
import styles from './styles.module.scss';

const cx = cn.bind(styles);

export const LogIn: FC<AuthProps> = ({
  isShowLogIn,
  setIsShowLogIn,
  setIsShowSignUp,
  handleLogIn,
}) => {
  const { theme } = Context();
  const goToSignUp = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setIsShowSignUp(true);
    setIsShowLogIn(false);
  };
  const handleClickEscape = ClickEscape(setIsShowLogIn);

  useEffect(() => {
    handleClickEscape();
    return document.removeEventListener('keydown', () => setIsShowLogIn(false));
  }, []);

  return (
    <>
      {isShowLogIn && (
        <>
          <section
            className={cx('logIn')}
            onClick={() => setIsShowLogIn(false)}
          >
            <div
              className={cx('logInPopUpContent')}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={logInImg}
                alt="logInBackground"
                className={cx('logInBackgroundImg')}
              />
              <div className={cx('validationWrapp')}>
                <h2 className={cx('validationHeading')}>Welcome Back</h2>
                <p className={cx('signUp')}>
                  If you don't have an account yet, please{' '}
                  <button className={cx('goToSignUp')} onClick={goToSignUp}>
                    sign up
                  </button>
                </p>
                <form className={cx('validationForm')} onSubmit={handleLogIn}>
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
                  <Button className={'defaultBtn'} children={'log in'} />
                  <p className={cx('signUp', 'signUpMobile')}>
                    If you don't have an account yet, please{' '}
                    <button className={cx('goToSignUp')} onClick={goToSignUp}>
                      sign up
                    </button>
                  </p>
                </form>
                <CloseIcon
                  onClick={() => setIsShowLogIn(false)}
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
